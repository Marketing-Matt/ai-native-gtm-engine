# CRM Schema v0

## Purpose

This document defines the first CRM schema for the AI-Native GTM Engine.

The CRM is designed to support audience ownership across newsletter subscriptions, content access, future vendor intake, job opportunity intake, and broader ecosystem signals.

Version 0 is intentionally lightweight but structured to expand over time.

## Design Principles

The CRM should:

- preserve marketing-owned audience data
- separate people, companies, and signals
- support future enrichment and segmentation
- allow additional intake pathways over time
- remain simple enough to implement in Airtable v0

## Core Tables

Version 0 includes three core tables:

1. People
2. Companies
3. Signals

## Table 1 — People

The People table stores individual audience and contact records.

Initial fields may include:

- person_id
- email
- first_name
- last_name
- role
- learning_interest
- company_id
- signup_source
- signup_timestamp
- status
- notes

## Table 2 — Companies

The Companies table stores organisations associated with people, vendors, sponsors, or job posters.

Initial fields may include:

- company_id
- company_name
- website
- company_stage
- industry
- country
- notes

## Table 3 — Signals

The Signals table stores activity and event records linked to people and companies.

Initial fields may include:

- signal_id
- signal_type
- person_id
- company_id
- source
- timestamp
- related_asset
- notes

## Example Signal Types

Examples of signal_type may include:

- newsletter_signup
- content_access
- vendor_interest
- job_submission
- referral
- event_registration

## Relationships

The initial CRM model is designed around the following relationships:

- one person may belong to one company
- one company may be linked to many people
- one person may generate many signals
- one company may generate many signals

## Notes on Version 0

Version 0 is designed for:

- Airtable as the initial data store
- n8n as the workflow orchestration layer
- future migration to a more custom CRM if required

## Status

Version: v0.1  
Implementation: Planned  
Last Updated: 08/03/2026
