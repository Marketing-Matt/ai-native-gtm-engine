'use client';

import {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './PreviewAudio.module.css';

interface Props {
  src: string;
  label?: string;
  title: string;
  note?: string;
  className?: string;
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const total = Math.floor(seconds);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function PreviewAudio({
  src,
  label = '>_ build summary',
  title,
  note,
  className,
}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoaded = () => setDuration(audio.duration);
    const handleTime = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('loadedmetadata', handleLoaded);
    audio.addEventListener('timeupdate', handleTime);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoaded);
      audio.removeEventListener('timeupdate', handleTime);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      void audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, []);

  const handleSeek = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const value = Number(event.target.value);
    audio.currentTime = (value / 100) * (audio.duration || 0);
    setCurrentTime(audio.currentTime);
  }, []);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const rootClass = className
    ? `${styles.root} ${className}`
    : styles.root;

  return (
    <div className={rootClass} role="region" aria-label="Build summary audio">
      <span className={styles.label}>{label}</span>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.row}>
        <button
          type="button"
          className={`${styles.button} ${
            isPlaying ? styles.buttonPlaying : ''
          }`}
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause build summary' : 'Play build summary'}
          aria-pressed={isPlaying}
        >
          {isPlaying ? '[ pause ]' : '[ play ]'}
        </button>

        <div className={styles.scrubber}>
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={progress}
            onChange={handleSeek}
            className={styles.scrubberRange}
            aria-label="Seek build summary audio"
          />
          <div className={styles.scrubberTrack}>
            <div
              className={styles.scrubberFill}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <span className={styles.time}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>

      {note ? <p className={styles.note}>{note}</p> : null}

      <audio ref={audioRef} src={src} preload="metadata" />
    </div>
  );
}

PreviewAudio.displayName = 'PreviewAudio';

export default PreviewAudio;
