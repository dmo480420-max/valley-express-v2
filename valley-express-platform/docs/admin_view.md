# Valley Express Admin: Lead Manager & Broker Contact
## Role: Logistics Coordinator / Dispatch Auditor

### 1. INTERFACE OBJECTIVES
- **Lead Integrity:** Enable high-level oversight of all scraped leads from Firebase.
- **Broker Communication:** Surface direct contact data to allow for rapid bidding and rate negotiation.
- **Branding:** Maintain ASU Sun Devils aesthetic (Gold accents for primary actions).

### 2. DATA MAPPING (ADMIN VIEW)
When a Lead is clicked, the system MUST fetch and display the following from the Firestore `leads` collection:
- **Broker Name:** `origin_contact_name`
- **Direct Email:** `origin_email` (Render as a clickable `mailto:` link)
- **Direct Phone:** `origin_phone` (Render as a clickable `tel:` link)
- **Source URL:** `source_link` (To verify the original posting)
- **Post Date:** `timestamp`

### 3. INTERACTIVE ACTIONS
- **CLICK ACTION:** Clicking a lead in the list opens a slide-over panel (Right Side).
- **"LOG CALL" BUTTON:** A Maroon button that saves a timestamped note to the lead record.
- **"BID SUBMITTED" TOGGLE:** Moves the lead from "New" to "Pending" status.

### 4. VISUAL CONFIGURATION
- **Header:** White background with 4px Gold bottom border.
- **Text:** Black (#000000) for readability.
- **Icons:** Use Lucide-React or Material icons for Phone and Email actions.
