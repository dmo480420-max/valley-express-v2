# Valley Express Transport - Visual & Logic Engine (v1.3)

## 🎨 Branding System: Amber-Slate Ecosystem
The design focuses on premium, high-visibility, and cinematic quality, reflecting the Phoenix desert landscape at sunset (Amber) and professional urban logistics (Slate).

### Color Palette
- **Primary (Amber)**: `#FFBF00` - Represents urgency, visibility, and sunrise/sunset over-the-road operations.
- **Secondary (Slate)**: `#2F4F4F` - Professionalism, reliability, and night-time logistics.
- **Accent (Sand)**: `#F5DEB3` - Secondary accents for readability and desert vibes.
- **Success (Emerald)**: `#10B981` - For delivered status and profitability.
- **Danger (Crimson)**: `#EF4444` - For delayed runs or vehicle failures.

### Typography
- **Headings**: *Outfit* (Google Fonts) - Geometric and modern.
- **Body**: *Inter* (Google Fonts) - High legibility for drivers on the move.

### UI Components (Vanilla CSS Tokens)
- **Glassmorphism**: `.glass-card { background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); }`
- **Magnetic Buttons**: High hover scaling (`scale(1.05)`) with amber glows.
- **Status Pills**: Vibrant status-coded borders.

## 🧠 Logic Engine (Marketplace flow)
- **Customer Intake**: Lead via Next.js form -> n8n -> Notion (Database 6).
- **Public Dispatch**: Notion (Database 2) -> Live Feed -> Driver Portal.
- **Bidding**: Driver Portal -> n8n -> Notion (Database 5).
- **Match Notification**: Notion Update -> n8n Trigger -> Twilio/Gmail (Instant).
- **Compliance**: Drivers must be HIPAA flagged in Database 4 to see medical jobs.

## 🚀 SEO Strategy
- **Target Keywords**: "Phoenix medical courier", "Same-day delivery AZ", "1099 driver gigs Phoenix".
- **Semantic Structure**: Proper H1-H3 hierarchy with role-based meta-descriptions.
