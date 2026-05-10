#!/usr/bin/env bash
# build-log-mix.sh
#
# Mix the gtmstack.ai "build logs" intro/music bed with a voice narration.
#
# Layout:
#   0s  -> 4s   : intro at full volume ("you're listening to build logs on
#                 gtmstack.ai" + music)
#   4s  -> 5s   : 1-second crossfade — music ducks linearly from 1.0 to
#                 0.18 (~-15 dB), narration fades in from 0 to 1.0
#   5s  -> end  : narration at full volume, music sits as bed at 0.18
#   end -> +2s  : 2-second fade out on the music tail
#
# Usage:
#   scripts/build-log-mix.sh <voice.mp3> <output.mp3>
#
# Requires: ffmpeg + ffprobe on PATH (brew install ffmpeg).

set -euo pipefail

VOICE="${1:-}"
OUTPUT="${2:-}"
INTRO="${INTRO:-brand/audio/build-log-intro.mp3}"

if [[ -z "$VOICE" || -z "$OUTPUT" ]]; then
  echo "Usage: $0 <voice.mp3> <output.mp3>" >&2
  exit 1
fi

for f in "$INTRO" "$VOICE"; do
  [[ -f "$f" ]] || { echo "Missing input: $f" >&2; exit 1; }
done

command -v ffmpeg  >/dev/null || { echo "ffmpeg not found — brew install ffmpeg" >&2; exit 1; }
command -v ffprobe >/dev/null || { echo "ffprobe not found — brew install ffmpeg" >&2; exit 1; }

VOICE_DUR=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$VOICE")
TOTAL_DUR=$(awk -v v="$VOICE_DUR" 'BEGIN{ printf "%.3f", 4 + v + 2 }')
FADE_START=$(awk -v t="$TOTAL_DUR" 'BEGIN{ printf "%.3f", t - 2 }')

echo "voice duration: ${VOICE_DUR}s"
echo "output length:  ${TOTAL_DUR}s"
echo "fade out from:  ${FADE_START}s"

# Filter graph:
#   [0:a] intro/music ducked with a 1-second linear ramp at 4s -> 5s
#         (1.0 -> 0.18, computed inline as 1.0 - (t-4)*0.82)
#   [1:a] narration delayed 4s, then 1-second fade in starting at t=4s
#         so the voice ramps up while the music ramps down — true crossfade
#   amix the two; cap to TOTAL_DUR; fade out final 2s
ffmpeg -y -hide_banner -loglevel warning \
  -i "$INTRO" \
  -i "$VOICE" \
  -filter_complex "
    [0:a]volume=volume='if(lt(t,4),1.0, if(lt(t,5), 1.0 - (t-4)*0.82, 0.18))':eval=frame[ducked];
    [1:a]adelay=4000|4000,afade=t=in:st=4:d=1[delayed];
    [ducked][delayed]amix=inputs=2:duration=first:dropout_transition=0:normalize=0[mixed];
    [mixed]afade=t=out:st=${FADE_START}:d=2[out]
  " \
  -map "[out]" \
  -t "$TOTAL_DUR" \
  -c:a libmp3lame -b:a 128k -ar 44100 -ac 2 \
  "$OUTPUT"

echo "wrote: $OUTPUT"
ls -l "$OUTPUT"
