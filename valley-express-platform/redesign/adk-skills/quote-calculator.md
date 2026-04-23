# Quote Calculator Agent

## Inputs
- **pickup_zone** (PHX|TUC|FLG)
- **dropoff_zone** (PHX|TUC|FLG)
- **vehicle** (sedan|sprinter|box)
- **medical_flag** (true|false)
- **urgency** (asap|scheduled)

## Logic
1. **Base rate** = lookup from `rate-cards/az-rates.csv`.
2. **If medical_flag = true**:
   - Add $25 compliance fee (covers TWIC/Hazmat driver premium).
   - Validate that a certified driver exists (if not, return error).
3. **If urgency = asap**: multiply by 1.5.
4. **Apply backhaul discount** if dropoff zone has known deadhead (e.g., FLG→PHX cheaper).

## Output
- Markdown: `quote_{timestamp}.md` saved to `quotes/`.
- Also return JSON for frontend display.
