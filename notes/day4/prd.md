# LeadFlow AI

## Product Requirements Document

**Document Title:** LeadFlow AI — Product Requirements Document
**Version:** 1.0
**Prepared By:** Anuja (AI Engineering Intern)
**Date:** July 13, 2026

---

## Table of Contents

1. Project Overview
2. Problem Statement
3. Product Vision
4. Goals
5. Target Users
6. Scope
7. Functional Requirements
8. Non-Functional Requirements
9. User Personas
10. User Stories
11. Acceptance Criteria
12. Value Proposition
13. Competitor Analysis
14. MVP Definition
15. MoSCoW Prioritization
16. Missing Requirements & Edge Cases
17. Risks
18. Success Metrics
19. Requirements Traceability Matrix
20. Future Scope
21. Release Plan
22. Conclusion

---

## 1. Project Overview

LeadFlow AI is an AI-powered CRM built for small businesses and startups. It helps users organize customer information, manage leads, schedule follow-ups, maintain a history of customer interactions, upload relevant documents, and receive AI-assisted suggestions for staying in touch with customers.

It is being built because most small businesses currently manage customers using a mix of Excel sheets, WhatsApp chats, phone calls, and notebooks — none of which are designed to remind anyone when a follow-up is due. As customer volume grows, this manual approach breaks down, and follow-ups get missed.

The primary users are small business owners, startups, sales executives, and sales managers who need a simple, focused tool to stay on top of customer relationships without the complexity of enterprise CRM platforms.

This idea originated from personal experience as a Training & Placement Coordinator, where the core challenge was never the record-keeping itself, but remembering which student needed a follow-up and tracking what was last discussed. Small businesses face the same underlying problem with their customers, which is what LeadFlow AI is designed to solve.

---

## 2. Problem Statement

**Small businesses lose customers and sales opportunities because follow-ups are tracked manually and are easy to forget.**

**Current Workflow**
Small businesses typically record customer details in Excel sheets, communicate through WhatsApp, and rely on memory or handwritten notes to track who needs to be contacted next. There is no single, structured system tying customer information, conversation history, and follow-up scheduling together.

**Current Challenges**
Customer information is scattered across multiple tools. There are no automated reminders for pending follow-ups. Conversation history is not centrally recorded, so context is often lost between interactions. When a different team member handles a customer, they have no easy way to see what was previously discussed.

**Business Impact**
Missed follow-ups translate directly into lost sales opportunities and weaker customer relationships. Businesses often only realize a lead has gone cold after it is too late to recover. Over time, this also makes it difficult to measure how well the sales process is actually performing.

**Why Manual Methods Break Down as Data Grows**
Excel sheets require manual updates and do not send reminders. WhatsApp chats become difficult to search as conversation volume increases. Notebooks are not shareable across a team and are easily lost or left inconsistent. As the number of customers and leads grows beyond a handful, these methods become unreliable and time-consuming to maintain.

---

## 3. Product Vision

LeadFlow AI aims to become the go-to lightweight CRM for small businesses that need a dependable way to manage customer follow-ups, without the setup complexity or cost of enterprise CRM platforms. The long-term vision is to keep the product simple and focused — helping small teams never lose track of a customer conversation — while gradually adding practical AI assistance that reduces manual effort rather than adding more screens to manage.

---

## 4. Goals

**Business Goals**
- Deliver a working MVP within the internship timeline that demonstrates clear product value.
- Build a product that is realistically adoptable by small businesses with minimal onboarding effort.
- Establish LeadFlow AI as a focused alternative to manual tracking methods, not a competitor to enterprise CRMs.

**User Goals**
- Reduce the number of missed customer follow-ups.
- Have a single place to view customer information, notes, and pending actions.
- Spend less time manually reviewing spreadsheets or chat history to determine who needs attention.

**Project Goals**
- Ship a functional, testable MVP covering the core CRM workflow: customers, leads, follow-ups, notes, documents, and basic AI assistance.
- Ensure every requirement is traceable to a user story and screen, so the scope stays controlled and reviewable.
- Keep the system architecture simple enough to extend in future versions without a redesign.

---

## 5. Target Users

**Small Business Owners** — Manage day-to-day operations and customer relationships directly, often without dedicated sales staff. Need a simple system to avoid losing track of customers.

**Sales Executives** — Handle outreach and follow-ups with leads and customers on a daily basis. Need a clear, prioritized view of who to contact next.

**Sales Managers** — Oversee a small sales team's performance and pipeline. Need visibility into team-wide follow-up activity and lead status without checking individual spreadsheets.

**Startups** — Early-stage teams acquiring their first customers. Need an affordable, easy-to-adopt CRM that doesn't require dedicated CRM administration.

---

## 6. Scope

### In Scope (Version 1 / MVP)
- User authentication (login, registration, password reset, logout)
- Customer management (add, view, edit, search)
- Lead management (add, update status, convert to customer)
- Follow-up scheduling and tracking
- Customer notes and interaction history
- Document upload per customer
- Dashboard with a daily follow-up summary
- Basic AI-assisted follow-up suggestions, draft messages, and interaction summaries
- Basic account settings

### Out of Scope (Version 1)
- WhatsApp or email integration
- Automated email/SMS campaigns
- Advanced analytics and reporting dashboards
- Role-based access control with granular permissions
- Multi-currency or invoicing/billing features
- Mobile native applications (MVP will be a responsive web app)
- Third-party CRM data migration tools
- AI lead scoring or prioritization algorithms

---

## 7. Functional Requirements

### Authentication

| Requirement ID | Requirement Name | Description | Priority | Reason |
|---|---|---|---|---|
| FR-001 | User Login | Users shall log in using a registered email and password. | High | Required entry point to access any account data. |
| FR-002 | User Registration | New users shall be able to create an account with name, email, and business name. | High | Necessary for onboarding new businesses. |
| FR-003 | Password Reset | Users shall reset a forgotten password via an emailed verification link. | Medium | Prevents users from being permanently locked out. |
| FR-004 | Logout | Users shall be able to securely end their session. | Medium | Protects account data, especially on shared devices. |

### Dashboard

| Requirement ID | Requirement Name | Description | Priority | Reason |
|---|---|---|---|---|
| FR-005 | Dashboard Overview | The system shall display a summary of today's follow-ups, total customers, and total leads. | High | Gives users an immediate, actionable snapshot on login. |
| FR-006 | Recent Activity Feed | The dashboard shall show recently added leads and completed follow-ups. | Low | Improves visibility but is not essential to core workflow. |

### Customer Management

| Requirement ID | Requirement Name | Description | Priority | Reason |
|---|---|---|---|---|
| FR-007 | Add Customer | Users shall add a new customer with name, phone, email, and business context. | High | Core function; the CRM cannot operate without customer records. |
| FR-008 | View Customer List | Users shall view a list of all customers linked to their account. | High | Provides a central view of all managed customers. |
| FR-009 | View Customer Profile | Users shall open a customer's profile to see full details, notes, and history. | High | Provides context before any follow-up or interaction. |
| FR-010 | Edit Customer | Users shall update existing customer details. | High | Customer information changes and must remain accurate. |
| FR-011 | Search Customer | Users shall search customers by name, phone, or email. | High | Prevents manual scrolling as the customer list grows. |

### Lead Management

| Requirement ID | Requirement Name | Description | Priority | Reason |
|---|---|---|---|---|
| FR-012 | Add Lead | Users shall add a new lead separate from existing customer records. | High | Leads must be tracked distinctly from confirmed customers. |
| FR-013 | Update Lead Status | Users shall update a lead's status (New, Contacted, Follow-up Needed, Converted, Lost). | High | Enables visibility into where each lead stands. |
| FR-014 | Convert Lead to Customer | Users shall convert a qualified lead into a full customer record. | Medium | Avoids duplicate data entry and preserves history. |
| FR-015 | View Lead List | Users shall view all leads, filterable by status. | High | Helps users prioritize which leads need attention. |

### Follow-up Management

| Requirement ID | Requirement Name | Description | Priority | Reason |
|---|---|---|---|---|
| FR-016 | Set Follow-up Reminder | Users shall set a follow-up date and time for a customer or lead. | High | This is the central problem LeadFlow AI is built to solve. |
| FR-017 | View Pending Follow-ups | Users shall view upcoming and overdue follow-ups in one list. | High | Gives users a clear, actionable daily task list. |
| FR-018 | Mark Follow-up Complete | Users shall mark a follow-up as completed. | High | Keeps the pending list accurate and prevents repeat reminders. |
| FR-019 | Reschedule Follow-up | Users shall change the date/time of an existing follow-up. | Medium | Follow-up plans often shift based on customer availability. |

### Customer Notes

| Requirement ID | Requirement Name | Description | Priority | Reason |
|---|---|---|---|---|
| FR-020 | Add Customer Note | Users shall add a text note to a customer or lead after an interaction. | High | Preserves conversation context instead of relying on memory. |
| FR-021 | View Note History | Users shall view a chronological list of all notes on a customer. | High | Allows quick review before the next interaction. |

### Document Upload

| Requirement ID | Requirement Name | Description | Priority | Reason |
|---|---|---|---|---|
| FR-022 | Upload Document | Users shall upload files (e.g., quotations, agreements) to a customer's profile. | Medium | Keeps customer-related files in one place. |
| FR-023 | View/Download Document | Users shall view or download documents attached to a customer's profile. | Medium | Enables quick retrieval during customer interactions. |

### AI Features

| Requirement ID | Requirement Name | Description | Priority | Reason |
|---|---|---|---|---|
| FR-024 | AI Follow-up Suggestions | The system shall analyze note and follow-up history to suggest which customers need attention. | High | Core AI differentiator; reduces manual review effort. |
| FR-025 | AI-generated Follow-up Message | The system shall draft a follow-up message based on a customer's notes and last interaction. | Medium | Saves time compared to writing messages manually. |
| FR-026 | AI Customer Interaction Summary | The system shall generate a short summary of a customer's full note history on request. | Medium | Helps users regain context quickly, especially for long histories. |

### Settings

| Requirement ID | Requirement Name | Description | Priority | Reason |
|---|---|---|---|---|
| FR-027 | Update Profile Settings | Users shall update their name, business name, and contact details. | Low | Supports basic account maintenance. |
| FR-028 | Manage Notification Preferences | Users shall enable or disable follow-up reminder notifications. | Low | Gives users control over how they are reminded. |

---

## 8. Non-Functional Requirements

**Performance** — Dashboard and customer list views shall load within 2 seconds for accounts with up to 500 customer records; AI-generated responses shall return within 5 seconds. This is important because slow load times reduce daily usability for time-pressed small business users.

**Availability** — The system shall target 99% uptime during business hours (9 AM–9 PM IST). Reliable availability is important since follow-up reminders are time-sensitive and downtime directly risks missed customer contact.

**Security** — Passwords shall be stored using industry-standard hashing, and all data shall be transmitted over HTTPS. This is important to protect sensitive customer and business data from unauthorized access.

**Reliability** — Saved notes and follow-up reminders shall not be lost due to system errors, and the system shall handle invalid input gracefully. This is important because losing a note or reminder directly undermines the product's core value.

**Maintainability** — The codebase shall be modular, separating customer, lead, follow-up, notes, document, and AI logic. This is important so future features can be added without reworking unrelated modules.

**Scalability** — The system shall be able to support growth from a handful of pilot accounts to several hundred concurrent business accounts without a redesign of the core data model. This is important for the product to remain viable beyond the pilot stage.

**Accessibility** — The interface shall use readable font sizes and sufficient color contrast, with clearly labeled form fields. This is important to keep the product usable for a broad range of small business owners, including those less comfortable with technology.

**Browser Compatibility** — The system shall support the latest stable versions of Chrome, Firefox, and Edge. This is important because small businesses use a variety of everyday browsers rather than standardized enterprise environments.

**Responsiveness** — The interface shall be usable on both desktop and mobile browsers. This is important since business owners frequently manage operations from their phones.

**Usability** — Core actions (adding a customer, setting a follow-up, adding a note) shall be completable in no more than 3 clicks from the dashboard. This is important because the target users are non-technical and will abandon a tool that feels complicated.

**Data Privacy** — Each business account's data shall be logically isolated so no business can access another's customer records. This is important to maintain user trust, since customer data is sensitive business information.

---

## 9. User Personas

### Persona 1: Rohan Deshmukh
- **Age:** 29
- **Occupation:** Owner of a small furniture manufacturing business
- **Background:** Runs a family business with 8 employees and handles most customer communication himself, using WhatsApp and a notebook.
- **Daily Workflow:** Responds to inquiries on WhatsApp, notes order details on paper, and calls customers for follow-ups when he remembers to.
- **Goals:** Ensure no customer inquiry is forgotten and follow-ups happen on time.
- **Pain Points:** Loses track of who he's already contacted; has no organized record of past conversations.
- **Needs:** A simple system to log customers, set reminders, and view conversation history at a glance.

### Persona 2: Ananya Iyer
- **Age:** 24
- **Occupation:** Sales Executive at an early-stage SaaS startup
- **Background:** Manages 60–80 active leads using a shared Excel sheet with her team.
- **Daily Workflow:** Reviews the sheet each morning to identify who needs follow-up, updates status after calls, and checks WhatsApp for prior context.
- **Goals:** Get a clear daily task list of leads to contact without searching across tools.
- **Pain Points:** The shared sheet gets overwritten by teammates; there is no reminder mechanism.
- **Needs:** A dashboard showing daily pending follow-ups and a simple way to log call notes.

### Persona 3: Vikram Chauhan
- **Age:** 34
- **Occupation:** Co-founder and Sales Manager at a two-person home services startup
- **Background:** Manages both operations and customer acquisition, and increasingly oversees a small outsourced sales team as the business grows.
- **Daily Workflow:** Checks in on his team's follow-up progress, occasionally jumps in on calls himself, and reviews which leads have gone quiet.
- **Goals:** Retain existing customers through repeat business and keep visibility into his team's follow-up activity without micromanaging.
- **Pain Points:** No way to see which customers haven't been contacted recently or how his team's follow-ups are trending.
- **Needs:** A lightweight tool with minimal setup that clearly surfaces which customers and leads need attention.

---

## 10. User Stories

**Authentication**

US-001: As a Business Owner, I want to log in with my email and password, so that I can securely access my business's customer data.

US-002: As an Administrator, I want to register a new business account, so that my team can start using LeadFlow AI.

US-003: As a Sales Executive, I want to reset my password if I forget it, so that I don't lose access to my leads and follow-ups.

US-004: As a Business Owner, I want to securely log out of my account, so that my data stays protected on shared devices.

**Dashboard**

US-005: As a Business Owner, I want to see a dashboard summary of today's follow-ups, customers, and leads, so that I know what needs attention without opening multiple screens.

US-006: As a Sales Manager, I want to see recent activity across the team, so that I stay updated without asking for individual status updates.

**Customer Management**

US-007: As a Business Owner, I want to add a new customer with their contact details, so that I have a record of everyone I do business with.

US-008: As a Sales Executive, I want to search for a customer by name or phone number, so that I can quickly find their details during a call.

US-009: As a Customer Support agent, I want to view a customer's full profile and history, so that I can assist them without asking repetitive questions.

US-010: As a Business Owner, I want to edit a customer's contact information, so that their details stay accurate over time.

**Lead Management**

US-011: As a Sales Executive, I want to add a new lead as soon as I get an inquiry, so that I don't forget to track a potential customer.

US-012: As a Sales Executive, I want to update a lead's status as it progresses, so that my manager knows where each deal stands.

US-013: As a Sales Manager, I want to filter leads by status, so that I can focus on the ones that need urgent attention.

US-014: As a Sales Executive, I want to convert a qualified lead into a customer, so that I don't have to re-enter their details manually.

**Follow-up Management**

US-015: As a Sales Executive, I want to set a follow-up reminder for a customer, so that I don't forget to contact them on time.

US-016: As a Business Owner, I want to view all pending follow-ups for the day, so that I know exactly who needs attention today.

US-017: As a Sales Executive, I want to mark a follow-up as completed, so that my pending list stays accurate.

US-018: As a Sales Manager, I want to see overdue follow-ups across the team, so that I can flag deals at risk of being neglected.

US-019: As a Sales Executive, I want to reschedule a follow-up, so that I can adjust plans when a customer isn't available.

**AI Features**

US-020: As a Sales Executive, I want the system to suggest which customers need follow-up, so that I don't have to manually review every record each day.

US-021: As a Sales Executive, I want an AI-generated draft follow-up message, so that I can save time writing messages from scratch.

US-022: As a Customer Support agent, I want an AI summary of a customer's long note history, so that I can quickly get context before responding to them.

**Document Upload**

US-023: As a Sales Executive, I want to upload a quotation to a customer's profile, so that it's easy to find later without searching my email.

US-024: As a Customer Support agent, I want to view documents attached to a customer's profile, so that I can reference agreements when resolving queries.

**Settings**

US-025: As a Business Owner, I want to update my profile and business details, so that my account information stays current.

US-026: As a Business Owner, I want to enable or disable follow-up notifications, so that I control how I am reminded.

**Additional Customer Management**

US-027: As an Administrator, I want to add new team members to the account, so that my sales team can start managing their own leads.

US-028: As an Administrator, I want to remove a team member's access, so that former employees can no longer view customer data.

---

## 11. Acceptance Criteria

**US-001 — Login**
Given a registered user is on the login screen, when they enter a valid email and password, then they shall be redirected to the dashboard.
Given a registered user enters an incorrect password, when they submit the login form, then the system shall display an error message without revealing whether the email exists.

**US-002 — Registration**
Given a new user is on the registration screen, when they submit a valid name, email, and business name, then an account shall be created and the user shall be redirected to the dashboard.
Given a user enters an email already registered, when they submit the form, then the system shall display a duplicate-account error.

**US-003 — Password Reset**
Given a user is on the forgot password screen, when they submit a registered email, then a reset link shall be sent to that email.
Given a user clicks an expired reset link, when the reset page loads, then the system shall display an expired-link message.

**US-004 — Logout**
Given a logged-in user clicks logout, when the action is confirmed, then their session shall end and they shall be redirected to the login screen.

**US-005 — Dashboard Overview**
Given a user logs in, when the dashboard loads, then it shall display counts of today's follow-ups, total customers, and total leads within 2 seconds.

**US-006 — Recent Activity Feed**
Given a Sales Manager opens the dashboard, when recent team activity exists, then it shall be listed in chronological order with the most recent item first.

**US-007 — Add Customer**
Given a user is on the Add Customer screen, when they submit a valid name and at least one contact method, then the customer shall be saved and appear in the customer list.
Given required fields are missing, when the user submits the form, then the system shall display a validation error.

**US-008 — Search Customer**
Given a user enters a name, phone number, or email in the search bar, when results match, then matching customers shall be displayed; when no match exists, then a "no results found" message shall be shown.

**US-009 — View Customer Profile**
Given a user selects a customer from the list, when the profile page loads, then it shall display contact details, notes, follow-up history, and documents.

**US-010 — Edit Customer**
Given a user edits a customer's details, when they save valid changes, then the updated information shall be reflected immediately on the profile.

**US-011 — Add Lead**
Given a user is on the Add Lead screen, when they submit valid lead details, then the lead shall be saved with a default status of "New."

**US-012 — Update Lead Status**
Given a user selects a lead, when they change its status, then the new status shall be saved and reflected in the lead list immediately.

**US-013 — Filter Leads by Status**
Given a user is on the lead list screen, when they select a status filter, then only leads matching that status shall be displayed.

**US-014 — Convert Lead to Customer**
Given a user selects a qualified lead, when they choose "Convert to Customer," then a new customer record shall be created using the lead's existing details, and the lead shall be marked as converted.

**US-015 — Set Follow-up Reminder**
Given a user is on a customer or lead profile, when they set a valid future date and time, then the follow-up shall be saved and appear in the pending follow-ups list.

**US-016 — View Pending Follow-ups**
Given a user opens the dashboard, when pending follow-ups exist, then they shall be listed sorted by due date, with overdue items visually flagged.

**US-017 — Mark Follow-up Complete**
Given a user marks a follow-up as complete, when the action is confirmed, then it shall be removed from the pending list and logged in the customer's history.

**US-018 — View Overdue Follow-ups (Team)**
Given a Sales Manager opens the team follow-up view, when overdue follow-ups exist across the team, then they shall be listed with the assigned executive's name.

**US-019 — Reschedule Follow-up**
Given a user selects an existing follow-up, when they choose a new valid date and time, then the follow-up shall be updated and reflected in the pending list.

**US-020 — AI Follow-up Suggestions**
Given a user opens the dashboard, when AI suggestions are generated, then a ranked list of customers likely needing follow-up shall be displayed within 5 seconds.

**US-021 — AI-generated Follow-up Message**
Given a user requests a draft message for a customer, when the AI generates a response, then a message referencing recent notes shall be displayed within 5 seconds, editable before sending.

**US-022 — AI Customer Interaction Summary**
Given a user requests a summary for a customer with note history, when the AI processes the request, then a concise summary shall be displayed within 5 seconds.

**US-023 — Upload Document**
Given a user is on a customer profile, when they upload a supported file type within the size limit, then the document shall be saved and listed under that customer.
Given an unsupported file type is uploaded, when the user submits it, then the system shall display an error message.

**US-024 — View/Download Document**
Given a user is on a customer profile with attached documents, when they select a document, then it shall open or download successfully.

**US-025 — Update Profile Settings**
Given a user is on the settings screen, when they update and save valid profile details, then the changes shall be reflected across the account.

**US-026 — Manage Notification Preferences**
Given a user is on the settings screen, when they toggle follow-up notifications off, then no further reminder notifications shall be sent until re-enabled.

**US-027 — Add Team Member**
Given an Administrator is on the team management screen, when they invite a new member with a valid email, then an invitation shall be sent and the member shall appear as "Pending" until accepted.

**US-028 — Remove Team Member**
Given an Administrator selects an active team member, when they revoke access, then that member shall no longer be able to log in to the account.

---

## 12. Value Proposition

For **small business owners and sales teams**
who **struggle to track customer follow-ups using spreadsheets, WhatsApp, and notebooks**,
LeadFlow AI **provides a simple, centralized system for managing customers, leads, and follow-ups with AI-assisted suggestions**.
Unlike **enterprise CRMs such as Salesforce or HubSpot**,
LeadFlow AI **stays lightweight and focused entirely on follow-up management, requiring minimal setup and no dedicated CRM administrator**.

In short, LeadFlow AI does not attempt to replace full-scale CRM platforms. It targets the specific, everyday problem of forgotten follow-ups, and solves it with a tool small teams can start using on day one.

---

## 13. Competitor Analysis

| Product | Strengths | Weaknesses | Opportunity for LeadFlow AI |
|---|---|---|---|
| Salesforce | Extremely feature-rich, highly customizable, strong enterprise adoption | Steep learning curve, expensive, overkill for small businesses | Offer a lightweight, low-cost alternative focused only on follow-up tracking |
| HubSpot CRM | Free tier available, strong marketing tool integration, user-friendly interface | Advanced features locked behind paid tiers, can feel heavy for very small teams | Provide a simpler experience without multiple modules to navigate |
| Zoho CRM | Affordable pricing, wide range of integrations, suited to small-to-mid businesses | Interface can feel dated, requires configuration effort during setup | Deliver a more modern, ready-to-use experience with minimal setup |
| Freshsales | Clean interface, built-in phone and email tracking | Still has more features than very small businesses typically need | Focus purely on follow-up management with AI assistance as the core differentiator |

**Fact Verification**
The following facts should be verified against each vendor's official website before any competitive claims are finalized or shared externally:
1. Current pricing tiers and what specific features (e.g., AI tools, integrations) are included at each tier for Salesforce, HubSpot, Zoho, and Freshsales, as pricing and feature bundling change frequently.
2. Whether each competitor currently offers a free tier or free trial, and its exact limitations, since free-tier availability is a common but frequently updated marketing detail.

---

## 14. MVP Definition

The MVP is scoped to include only the features directly required to solve the core problem: businesses forgetting to follow up with customers and leads. Authentication and customer/lead management form the data foundation. Follow-up scheduling and the dashboard directly address the missed-follow-up problem. Notes and document upload preserve context so that any team member can pick up a conversation without starting over. AI follow-up suggestions, draft messages, and summaries reduce the manual effort of reviewing records, which is the layer that differentiates LeadFlow AI from a plain spreadsheet. Settings are included only at a basic level to support account usability, not administration at scale.

Every included feature maps directly back to either capturing customer/lead data, scheduling and tracking follow-ups, or reducing the manual effort involved in doing so. Nothing in the MVP addresses reporting, marketing automation, or team performance analytics, since those are not required to solve the primary problem.

---

## 15. MoSCoW Prioritization

**Must Have**
- User Login, Registration (FR-001, FR-002) — without these, no user can access the system.
- Add/View/Edit Customer (FR-007, FR-008, FR-009, FR-010) — core data the entire product depends on.
- Add Lead, Update Lead Status (FR-012, FR-013) — required to track the sales pipeline.
- Set Follow-up Reminder, View Pending Follow-ups, Mark Complete (FR-016, FR-017, FR-018) — this is the core problem the product solves.
- Add Customer Note, View Note History (FR-020, FR-021) — required to preserve interaction context.
- Dashboard Overview (FR-005) — needed to give users a daily actionable view.
- AI Follow-up Suggestions (FR-024) — the primary AI differentiator that justifies the product's positioning.

**Should Have**
- Search Customer (FR-011) — significantly improves usability as data grows, though not blocking for a small initial dataset.
- Convert Lead to Customer, View Lead List (FR-014, FR-015) — improves workflow efficiency but can be worked around manually in early use.
- Reschedule Follow-up (FR-019) — important for realistic use but not required for the very first release.
- Document Upload, View/Download (FR-022, FR-023) — valuable but not essential to solving the follow-up problem itself.
- AI-generated Follow-up Message, AI Interaction Summary (FR-025, FR-026) — enhances the AI value proposition but is secondary to the core suggestion feature.

**Could Have**
- Password Reset (FR-003) — important long-term, but for a small pilot user base this can initially be handled manually.
- Recent Activity Feed (FR-006) — a nice-to-have visibility feature, not core to task completion.
- Update Profile Settings, Notification Preferences (FR-027, FR-028) — improves account experience but does not affect core CRM functionality.

**Won't Have (this version)**
- WhatsApp/Email integration — significant technical overhead not feasible within MVP timeline.
- Role-based access control — team accounts in MVP will have simple, undifferentiated access.
- Advanced analytics/reporting dashboard — not required to solve the immediate follow-up problem.
- AI lead prioritization/scoring — a meaningful future enhancement, but requires more historical data than an MVP will have.

---

## 16. Missing Requirements & Edge Cases

**Missing Requirements**
- No requirement currently defines what happens when a business account has multiple team members viewing/editing the same customer simultaneously.
- No requirement defines data export (e.g., exporting customer lists), which businesses may expect even at MVP stage.
- No requirement defines account/business deletion or data retention policy after a user cancels.

**Ambiguous Requirements**
- FR-024 (AI Follow-up Suggestions) does not define the specific signals used to rank customers (e.g., days since last contact vs. note sentiment); this should be clarified with the development team before implementation.
- FR-002 (Registration) does not specify whether email verification is required before first login.

**Edge Cases**
- A follow-up reminder set for a date in the past should be rejected or flagged, not silently accepted.
- A customer with no notes or history should show an appropriate empty state rather than an error when AI summary is requested.
- Converting a lead that has already been converted should be prevented with a clear message.
- Deleting a customer who has pending follow-ups should prompt a confirmation warning, not silently remove the follow-ups.

**Validation Rules**
- Customer must have at least one valid contact method (phone or email) before saving.
- Follow-up date/time must be in the future at the time of creation.
- Uploaded documents should be restricted to common file types (e.g., PDF, JPG, PNG, DOCX) and a defined size limit (e.g., 10MB).

**Security Risks**
- Without account-level data isolation, there is a risk of one business account inadvertently accessing another's data; this must be enforced at the database query level, not just the UI.
- Password reset links must expire after a short window to prevent misuse.

**Business Risks**
- If the AI suggestion feature produces low-quality or irrelevant recommendations early on, users may lose trust in the feature and stop using it, undermining the core differentiator.

**Failure Scenarios**
- If the AI service is unavailable, the system should degrade gracefully (e.g., show the manual follow-up list without AI suggestions) rather than blocking core functionality.
- If a document upload fails mid-transfer, the user should see a clear retry option rather than an unclear error.

**Error Handling**
- All form submissions should provide field-level validation messages rather than generic failure messages.
- API/network failures should show a user-friendly message with a retry option instead of technical error codes.

**Suggested Improvements**
- Define a lightweight audit trail (who added/edited a customer or note) even at MVP stage, since multiple team members may access the same records.
- Clarify email verification requirements during registration before development begins.

---

## 17. Risks

| Risk Category | Risk | Impact | Likelihood | Mitigation Strategy |
|---|---|---|---|---|
| Business | Users may not see enough value to switch from free tools like WhatsApp/Excel | High | Medium | Focus MVP tightly on the follow-up problem and validate with pilot users early |
| Technical | AI suggestion/summary features may be slow or inconsistent in quality | Medium | Medium | Set clear performance targets (FR-024–026) and test with realistic sample data before release |
| Operational | Small internship team may face scope creep within the 14-day timeline | Medium | High | Strictly follow MoSCoW prioritization and defer "Should/Could Have" items if needed |
| AI | AI-generated follow-up messages may sound generic or miss important context | Medium | Medium | Keep AI messages editable before sending; treat AI output as a draft, not a final message |
| Data | Loss of customer/follow-up data due to bugs or failed saves would directly break user trust | High | Low | Implement basic data validation and error handling before any AI or advanced features |

---

## 18. Success Metrics

- **Reduced missed follow-ups** — measured by comparing the number of overdue, uncontacted follow-ups before and after adoption.
- **Improved response rate** — measured by tracking how quickly leads are contacted after being added to the system.
- **Reduced manual work** — measured qualitatively through pilot user feedback on time spent tracking customers before vs. after using LeadFlow AI.
- **Higher lead conversion** — measured by tracking the percentage of leads that reach "Converted" status over a defined period.
- **Improved customer engagement** — measured by the frequency and consistency of logged follow-ups per customer over time.

---

## 19. Requirements Traceability Matrix

| Requirement ID | Requirement | Related User Story | Related Screen | Priority | Status |
|---|---|---|---|---|---|
| FR-001 | User Login | US-001 | Login Screen | High | Planned |
| FR-002 | User Registration | US-002 | Registration Screen | High | Planned |
| FR-003 | Password Reset | US-003 | Forgot Password Screen | Medium | Planned |
| FR-004 | Logout | US-004 | Dashboard (Header) | Medium | Planned |
| FR-005 | Dashboard Overview | US-005 | Dashboard Screen | High | Planned |
| FR-006 | Recent Activity Feed | US-006 | Dashboard Screen | Low | Planned |
| FR-007 | Add Customer | US-007 | Add Customer Screen | High | Planned |
| FR-008 | View Customer List | US-007 | Customer List Screen | High | Planned |
| FR-009 | View Customer Profile | US-009 | Customer Profile Screen | High | Planned |
| FR-010 | Edit Customer | US-010 | Edit Customer Screen | High | Planned |
| FR-011 | Search Customer | US-008 | Customer List Screen | High | Planned |
| FR-012 | Add Lead | US-011 | Add Lead Screen | High | Planned |
| FR-013 | Update Lead Status | US-012 | Lead List Screen | High | Planned |
| FR-014 | Convert Lead to Customer | US-014 | Lead Profile Screen | Medium | Planned |
| FR-015 | View Lead List | US-013 | Lead List Screen | High | Planned |
| FR-016 | Set Follow-up Reminder | US-015 | Customer/Lead Profile Screen | High | Planned |
| FR-017 | View Pending Follow-ups | US-016 | Dashboard / Follow-up List Screen | High | Planned |
| FR-018 | Mark Follow-up Complete | US-017 | Follow-up List Screen | High | Planned |
| FR-019 | Reschedule Follow-up | US-019 | Follow-up List Screen | Medium | Planned |
| FR-020 | Add Customer Note | US-020 (note context) | Customer Profile Screen (Notes Tab) | High | Planned |
| FR-021 | View Note History | US-009 | Customer Profile Screen (Notes Tab) | High | Planned |
| FR-022 | Upload Document | US-023 | Customer Profile Screen (Documents Tab) | Medium | Planned |
| FR-023 | View/Download Document | US-024 | Customer Profile Screen (Documents Tab) | Medium | Planned |
| FR-024 | AI Follow-up Suggestions | US-020 | Dashboard (AI Panel) | High | Planned |
| FR-025 | AI-generated Follow-up Message | US-021 | Customer Profile Screen (AI Panel) | Medium | Planned |
| FR-026 | AI Customer Interaction Summary | US-022 | Customer Profile Screen (AI Panel) | Medium | Planned |
| FR-027 | Update Profile Settings | US-025 | Settings Screen | Low | Planned |
| FR-028 | Manage Notification Preferences | US-026 | Settings Screen | Low | Planned |

*Note: Team management (US-027, US-028) is planned as a basic account-level capability supporting FR-002 (Registration) and is tracked under the Settings/Team screen; it is not assigned a separate FR ID in this version as full role-based access control is Out of Scope (Section 6).*

---

## 20. Future Scope

- **WhatsApp Integration** — Sync conversations directly from WhatsApp into a customer's profile.
- **Email Automation** — Send basic follow-up emails automatically based on defined triggers.
- **AI-generated Meeting Summary** — Automatically summarize call or meeting notes into short, readable points.
- **AI Lead Prioritization** — Rank leads by likelihood to convert, based on historical interaction patterns.
- **Analytics Dashboard** — Deeper reporting on conversion rates, follow-up response times, and team performance.
- **Role-Based Access Control** — Granular permissions distinguishing Business Owner, Sales Manager, and Sales Executive access levels.

---

## 21. Release Plan

**Version 1 (MVP)**
Authentication, customer and lead management, follow-up scheduling, notes, document upload, dashboard overview, and core AI follow-up suggestions, as defined in Section 7.

**Version 2**
Introduces Should Have and Could Have items not fully covered in MVP polish (e.g., refined AI-generated messages, notification preferences), plus early versions of WhatsApp integration and basic analytics.

**Version 3**
Introduces Role-Based Access Control, AI lead prioritization, email automation, and a fuller analytics dashboard, as the product matures beyond its initial pilot phase.

---

## 22. Conclusion

LeadFlow AI is a focused, lightweight CRM designed to solve one clear problem: small businesses and startups missing customer follow-ups due to scattered, manual tracking methods. By scoping the MVP tightly around customer and lead management, follow-up scheduling, and practical AI assistance, the product avoids the complexity of enterprise CRM platforms while still delivering meaningful value to its target users. Every requirement in this document is tied to a user story, acceptance criteria, and a screen, keeping the scope realistic and reviewable ahead of development. If successful, LeadFlow AI can meaningfully reduce missed follow-ups and manual effort for small teams, with a clear, realistic path toward richer functionality in future versions.