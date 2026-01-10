# Financial UI Designer - Claude Skill

A comprehensive Claude skill for designing professional financial application UIs based on the fin_coach trading simulator project.

## Overview

This skill transforms Claude into an expert UI/UX designer specializing in:
- Financial trading platforms
- Investment dashboards
- AI-powered analytics interfaces
- Data-heavy applications
- Real-time monitoring systems

## Installation

### Method 1: Manual Installation (Recommended)

1. **Locate your Claude Code skills directory:**
   - Windows: `%USERPROFILE%\.claude\skills\`
   - macOS/Linux: `~/.claude/skills/`

2. **Copy the skill file:**
   ```bash
   # Create skills directory if it doesn't exist
   mkdir -p ~/.claude/skills/

   # Copy the skill file
   cp fin-ui-designer.json ~/.claude/skills/
   ```

3. **Verify installation:**
   ```bash
   # In Claude Code, run:
   /skills

   # You should see "fin-ui-designer" in the list
   ```

### Method 2: Direct Path (Alternative)

If you prefer to keep the skill in your project folder:

```bash
# In Claude Code
/skill add D:\AI Projects\DS\fin-ui-designer.json
```

## Usage

### Activating the Skill

In Claude Code, use the skill by invoking it:

```bash
/skill fin-ui-designer
```

Once activated, Claude will operate as a specialized financial UI designer.

### Example Prompts

#### 1. Portfolio Dashboard
```
Design a portfolio dashboard with:
- Total value, cash, and P&L metrics
- Holdings visualization (donut chart)
- Recent trades table
```

#### 2. Trade Form
```
Create a trade execution form with:
- Stock symbol search with autocomplete
- Quantity and price inputs
- Buy/Sell toggle
- Live total calculation
- Validation for insufficient funds
```

#### 3. AI Chat Interface
```
Design a chat interface for AI trading coach with:
- Message bubbles (user vs AI)
- Trade suggestion cards
- One-click trade execution
```

#### 4. Holdings Table
```
Create a responsive holdings table showing:
- Symbol, quantity, avg price, current price
- Gain/loss with color coding
- Quick buy/sell buttons
- Sort and filter options
```

#### 5. Price Alert Component
```
Design a price alert card that:
- Shows stock symbol and target price
- Has color-coded status (active/triggered)
- Includes edit and delete actions
```

## Design System Features

### Color Palette

**Primary Colors:**
- Primary: `#1f2937` (gray-900)
- Background: `#ffffff` (white)
- Success: `#059669` (green-600)
- Error: `#dc2626` (red-600)

**Chart Colors (16-color palette):**
Perfect for portfolio visualizations with multiple holdings.

### Typography
- Font: **DM Sans** (Google Fonts)
- Weights: 300 (light), 400 (normal), 700 (bold)
- Primary weight: 300 (light) for modern, clean look

### Components Included

1. **Form Elements**
   - Borderless inputs with bottom border
   - Focus states with smooth transitions
   - Select dropdowns
   - Textareas

2. **Buttons**
   - Primary, secondary, danger variants
   - Icon buttons
   - Loading states
   - Disabled states

3. **Navigation**
   - Tab navigation with underline indicator
   - Active/inactive states
   - Smooth transitions

4. **Data Display**
   - Stat cards with metrics
   - Responsive tables
   - Donut charts (Recharts)
   - Color-coded gain/loss

5. **AI Components**
   - Chat message bubbles
   - Trade suggestion cards
   - Feedback displays

6. **Feedback**
   - Success/error/info alerts
   - Loading spinners
   - Skeleton loaders
   - Toast notifications

7. **Layout**
   - Page layouts
   - Dashboard grids
   - Two-column layouts
   - Responsive breakpoints

## Best Practices Provided

### Number Formatting
```javascript
// Currency
formatCurrency(1234.56) // → "$1,234.56"

// Percentage
formatPercentage(12.34) // → "+12.34%"

// Large numbers
formatLargeNumber(1234567) // → "$1.23M"
```

### Color Coding
- Positive values: Green (`#059669`)
- Negative values: Red (`#dc2626`)
- Neutral/Cash: Gray (`#6b7280`)

### Responsive Design
- Mobile-first approach
- Breakpoints: `sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px`
- Grid systems for layouts
- Touch-friendly interactions

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Focus states
- Color contrast ratios

## Advanced Features

### 1. Quick Trade Actions
Pre-fill trade forms from holding rows with buy/sell buttons.

### 2. Autocomplete Search
Real-time stock symbol search with dropdown results.

### 3. Live Calculations
Real-time total calculation in trade forms (quantity × price).

### 4. Price Updates with Animation
Flash background on price changes (green for up, red for down).

### 5. Confirmation Modals
User-friendly confirmation dialogs for critical actions.

### 6. Empty States
Helpful empty state designs when no data is available.

## Tech Stack Compatibility

Designed for:
- **Frontend:** React 18+ with Hooks
- **Styling:** Tailwind CSS v3+
- **Charts:** Recharts
- **Icons:** React Icons or Heroicons
- **Build Tool:** Vite or Create React App

## Use Cases

### Perfect For:
- Trading platforms
- Investment portfolio managers
- Financial dashboards
- AI-powered analytics
- Banking applications
- Crypto trading apps
- Stock market simulators
- Personal finance tools

### Not Ideal For:
- Marketing websites
- E-commerce stores
- Social media platforms
- Gaming interfaces
- Creative portfolios

## Example Workflow

1. **Activate the skill:**
   ```
   /skill fin-ui-designer
   ```

2. **Describe your needs:**
   ```
   I need to design a portfolio page that shows:
   - User's total account value at the top
   - A pie chart of their holdings
   - A table listing all stocks they own
   - Quick buttons to buy more or sell
   ```

3. **Receive complete code:**
   The skill will provide:
   - Full React component code
   - Tailwind CSS styling
   - Proper state management
   - Responsive design
   - Accessibility features
   - Code comments explaining design decisions

4. **Iterate and refine:**
   ```
   Can you make the chart bigger and add a legend?
   ```

   ```
   Add a refresh button to update all prices
   ```

## Customization

While the skill follows a strict design system, you can request variations:

```
Use this design but with:
- Blue as the primary color instead of gray
- Roboto font instead of DM Sans
- Larger spacing throughout
```

The skill will adapt while maintaining design consistency.

## Tips for Best Results

1. **Be specific about data structure:**
   ```
   The holdings array contains: symbol, quantity, avgPrice, currentPrice
   ```

2. **Mention responsive requirements:**
   ```
   This should work well on mobile phones
   ```

3. **Specify interactions:**
   ```
   When clicking a row, navigate to detail page
   ```

4. **Request accessibility features:**
   ```
   Make sure this is keyboard navigable
   ```

5. **Ask for explanations:**
   ```
   Why did you use a donut chart instead of a bar chart?
   ```

## Advanced Usage Examples

### Custom Dashboard with Multiple Sections

```
Create a full dashboard page with:

1. Top metrics bar:
   - Total portfolio value
   - Today's gain/loss
   - Cash available

2. Main content area (2-column):
   - Left: Portfolio donut chart with legend
   - Right: Recent trades list (last 5)

3. Bottom section:
   - Full holdings table with sort/filter
   - Pagination for 10 items per page

Make it responsive for tablet and mobile.
```

### AI Integration Patterns

```
Design an AI coach section with:
- Chat history on the left (scrollable)
- User messages right-aligned, blue background
- AI messages left-aligned, gray background
- Trade suggestions as cards below AI messages
- Each suggestion card has: symbol, type (buy/sell), quantity, price, reason
- "Execute" button on each card that pre-fills the trade form
```

### Real-Time Updates

```
Create a live price ticker component that:
- Shows current price in large text
- Flashes green background when price goes up
- Flashes red background when price goes down
- Shows 24h change percentage next to price
- Updates smoothly without jarring the user
```

## Troubleshooting

### Issue: Skill not showing in /skills list
**Solution:** Verify the JSON file is in the correct directory and has valid JSON syntax.

### Issue: Design doesn't match examples
**Solution:** Make sure you've activated the skill with `/skill fin-ui-designer` before asking design questions.

### Issue: Code uses custom CSS instead of Tailwind
**Solution:** Explicitly request: "Use only Tailwind CSS classes, no custom CSS"

### Issue: Colors don't match the palette
**Solution:** Reference specific colors: "Use the exact gray-900 (#1f2937) from the design system"

## Support & Feedback

This skill is based on the **fin_coach** trading simulator project, which demonstrates production-ready patterns for financial UIs.

For questions or improvements:
1. Review the source project documentation
2. Ask Claude for clarification on specific patterns
3. Request variations or customizations

## Version History

**v1.0.0** - Initial release
- Complete design system from fin_coach project
- 11 component categories
- Financial UI best practices
- Responsive design patterns
- Accessibility guidelines
- Advanced interaction patterns

## License

Based on the fin_coach project. Use freely for your own projects.

---

## Quick Reference Card

### Activate Skill
```
/skill fin-ui-designer
```

### Common Requests
| What You Want | What to Say |
|--------------|-------------|
| Portfolio stats | "Design portfolio metrics dashboard" |
| Trade form | "Create trade execution form" |
| Holdings list | "Design holdings table with actions" |
| Price chart | "Create portfolio donut chart" |
| AI chat | "Design AI coach chat interface" |
| Alerts | "Create success/error alert components" |

### Key Design Values
| Element | Value |
|---------|-------|
| Primary Color | #1f2937 (gray-900) |
| Font | DM Sans, weight 300 |
| Border Radius | 0.5rem (8px) |
| Spacing | 4px increments |
| Success Color | #059669 (green-600) |
| Error Color | #dc2626 (red-600) |

### Component Checklist
- ✅ Responsive (mobile, tablet, desktop)
- ✅ Accessible (keyboard nav, screen readers)
- ✅ Loading states
- ✅ Error handling
- ✅ Empty states
- ✅ Hover/focus states

---

**Ready to build beautiful financial UIs!** Activate the skill and start designing.
