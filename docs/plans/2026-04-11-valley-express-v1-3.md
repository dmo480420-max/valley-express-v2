# Valley Express Transport Platform (v1.3) - Implementation Plan

## Overview
This plan outlines the expansion of the Phoenix Logistics OS into a full-scale, multi-sided marketplace: **Valley Express Transport**. The platform will provide a public landing page, role-based dashboards for Customers and Drivers, and a unified Admin War Room, all powered by a Notion-n8n-Next.js stack.

## Phase 1: Brand & Infrastructure Setup 🏗️
- [ ] Initialize Next.js project in `./valley-express-platform`
- [ ] Configure `index.css` with **Amber-Slate** (vibrant amber / sleek slate) design system.
- [ ] Implement role-based routing middleware.
- [ ] Create `DESIGN.md` for consistent branding components.

## Phase 2: Public-Facing Website 🌐
- [ ] **Home Page**: Hero section with "Book a Ride" CTA + cinematic Phoenix visuals.
- [ ] **Services Page**: Detailed cards for Medical Courier, Same-Day, Moving, Van Routes.
- [ ] **Drivers Page**: Onboarding flow and "Join" form.
- [ ] **Pricing Page**: Dynamic estimator component.
- [ ] **Lead Intake**: Connect public forms to n8n webhooks.

## Phase 3: Marketplace Intelligence (Notion + n8n) 🧠
- [ ] Update `notion_db_schemas.md` with:
    - **Users Database** (Driver/Customer/Admin roles)
    - **Bids Database** (Price/ETA/Status)
    - **Lead Intake Database** (Hospital/Pharmacy source)
- [ ] Create `driver_bidding_workflow.json` in n8n.
- [ ] Create `customer_booking_workflow.json` in n8n.
- [ ] Link Scraper output directly to the "Available Gigs" state.

## Phase 4: Role-Based Dashboards 📱
- [ ] **Driver Portal**: live feed of gigs, quick bidding UI, earnings tracker.
- [ ] **Customer Portal**: active job tracking, booking history, invoice portal.
- [ ] **Admin War Room**: Observability panel for all gigs, driver performance, and scraper health.

## Phase 5: Polish & Deployment 🚀
- [ ] Integrate Twilio and Gmail notifications for status changes.
- [ ] SEO optimization and performance audit.
- [ ] Final documentation for Stripe payout configuration.

## Success Criteria
1. Public can request a quote; leads populate Notion immediately.
2. Drivers can view scraped gigs and place "bids" that update Notion.
3. Admins (you) have a central "War Room" reflecting all platform activity.
