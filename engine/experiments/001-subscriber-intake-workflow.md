# Experiment 001 — Subscriber Intake Workflow

## Purpose

This experiment defines the first working intake workflow for the AI-Native GTM Engine.

The goal is to capture subscriber data at the point of entry, route it through an automation layer, store it in the audience data layer, and then subscribe the user to the newsletter platform.

## Hypothesis

If subscriber intake begins at the website layer rather than the newsletter platform, marketing retains stronger ownership over data capture, workflow logic, and future segmentation.

## Workflow Design

Initial system flow:

Next.js (Beehiiv embed) → Beehiiv → n8n (sync) → Airtable

## Why This Flow

This architecture gives the GTM system control over intake before data is passed into the distribution platform.

It allows:

- structured data capture at the source
- CRM-first audience ownership
- future enrichment and scoring
- more flexible branching logic

## Initial Workflow Steps

1. Visitor submits the Beehiiv subscribe-form embed on gtmstack.ai
2. Beehiiv creates the subscriber record (source of truth for newsletter)
3. n8n is triggered by a Beehiiv webhook (or polls Beehiiv on a schedule)
4. n8n validates, normalises, and enriches the subscriber payload
5. n8n upserts the subscriber into Airtable as the CRM record
6. Workflow result is logged for future analysis

> **Note:** v0.1 originally had a custom website form posting to n8n first, then
> fanning out to Airtable + Beehiiv. With the move to Next.js + Vercel and the
> native Beehiiv embed, Beehiiv now owns the capture step. n8n becomes a sync
> layer that mirrors Beehiiv → Airtable rather than the entry point.

## v0.1 Form Payload

The initial intake form will capture the following fields:

- email
- first_name
- last_name
- role
- learning_interest
- company_name_normalized
- signup_source
- signup_timestamp

Required fields:

- email
- first_name
- role
- learning_interest

Optional fields:

- last_name
- company_name_raw

Future versions may extend this with:

- company_stage
- content_intent
- visitor_profile_signals
- captcha_protection
- bot_filtering
- spam_detection

## Risks

- duplicate record handling
- partial workflow failure between Airtable and Beehiiv
- too many input fields reducing conversion
- Beehiiv embed styling drift vs the rest of the Next.js site

## Success Criteria

The workflow is successful if:

- a subscriber can be submitted from the site
- the record is stored in Airtable
- the same subscriber is added to Beehiiv
- the flow can be repeated reliably

## v0.1 Workflow Nodes

1. Webhook trigger
2. Validate required fields
3. Normalize company name
4. Search People table
5. Search Companies table
6. Create or update Company
7. Create or update Person
8. Create Signal
9. Send subscriber to Beehiiv
10. Return success / log failure

## Related Playbook

Playbook 001 — Subscriber Intake Engine

## Status

Version: v0.1  
Implementation: Planned  
Last Updated: 08/03/2026
