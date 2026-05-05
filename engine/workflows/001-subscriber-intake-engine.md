# Playbook 001 — Subscriber Intake Engine

## Purpose

The Subscriber Intake Engine captures audience signals from newsletter subscriptions and converts them into structured records inside the GTM system.

This playbook describes how subscriber data flows from the website into the marketing data layer.

## Marketing Context

Audience ownership is one of the most important assets in modern GTM systems.

However, subscriber data is often trapped inside newsletter platforms and not integrated into the broader marketing system.

The Subscriber Intake Engine solves this by automatically capturing and structuring subscriber information.

## System Flow

The system connects the following components:

Website → Beehiiv → n8n → Airtable

Where:

- The website captures the subscriber
- Beehiiv manages the newsletter subscription
- n8n orchestrates the automation workflow
- Airtable stores the structured audience record

## Architecture Layers

Activation  
Newsletter signup via website.

Orchestration  
Automation workflow triggered when a new subscriber is created.

Data  
Subscriber information stored and structured inside Airtable.

Feedback  
Subscriber growth signals captured as part of the system feedback loop.

## Initial Implementation

Tools used in version 0.1:

- Next.js + Vercel (website — see [`site/`](../../site/))
- Beehiiv (newsletter platform + subscribe-form embed)
- n8n Cloud (automation)
- Airtable (audience data store)

## Next Steps

## Future Intake Extensions

The Subscriber Intake Engine represents the first signal capture point for the GTM system. 

Over time, additional intake pathways may feed the same audience data layer.

Potential extensions include:

### Content Access & Visitor Profiling

Capturing signals when visitors access gated content, guides, or playbooks.

These signals could help build a richer understanding of visitor interests and learning intent.

Possible future components:

- content access tracking
- topic interest tagging
- visitor behaviour profiling

### Vendor Advertising Intake

Providing structured intake forms for vendors interested in sponsoring content, events, or placements within the GTMStack ecosystem.

These records could feed a vendor pipeline inside the system.

Possible signals:

- vendor category
- product focus
- sponsorship interest

### Job Opportunity Intake

Allowing companies to submit job opportunities related to modern GTM engineering roles.

These submissions could become part of a curated job board or opportunity stream.

Possible signals:

- company
- role type
- location
- GTM stack requirements

### Community Member Profiles

Allow visitors to create a lightweight profile within the GTMStack ecosystem.

This could capture information such as:

- role
- company stage
- GTM tools used
- areas of interest

## Status

Version: v0.1  
Implementation: Planned  
Last Updated: 08.03.2026
