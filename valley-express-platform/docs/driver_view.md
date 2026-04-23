# Valley Express Driver: Gig Detail & Load Specs
## Role: Last-Mile / Medical Courier Professional

### 1. INTERFACE OBJECTIVES
- **Operational Clarity:** Show exactly what is required to move the load.
- **Financial Transparency:** Clearly highlight the pay rate and mileage.
- **Ease of Use:** Large, "thumb-friendly" buttons for drivers on the road.

### 2. DATA MAPPING (DRIVER VIEW)
When a Driver clicks a lead, the system MUST fetch and display these operational fields:
- **Pay Rate:** `pay_rate` (Highlighted in Bold Green or Gold)
- **Destination:** `destination_city` & `destination_zip`
- **Load Weight:** `weight_lbs` (Crucial for van capacity verification)
- **Special Instructions:** `special_instructions` (e.g., "Requires HIPAA certification," "Medical Specimen," "Gate Code: 1234")
- **Equipment Needed:** `vehicle_type` (Cargo Van, Sprinter, etc.)

### 3. INTERACTIVE ACTIONS
- **CLICK ACTION:** Clicking a lead opens a full-screen Detail View.
- **"OFFER RATE" BUTTON:** Opens a numeric keypad to submit a custom bid if the pay isn't fixed.
- **"ACCEPT GIG" BUTTON:** A large Maroon (#8C1D40) button at the bottom of the screen.

### 4. VISUAL CONFIGURATION
- **Background:** Clean White (#FFFFFF).
- **Primary Action:** ASU Maroon (#8C1D40) with White Text.
- **Constraint:** Hide all Broker/Dispatcher contact info to prevent direct back-solicitation.
