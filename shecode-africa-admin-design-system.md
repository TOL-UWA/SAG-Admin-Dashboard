# SheCode Africa Admin — Design System


## Colors

| Token | Hex | Usage |
|---|---|---|
| Brand Magenta | `#C1127A` | Primary buttons, links, active nav state, icon accents |
| Ink | `#111317` | Headings, primary body text |
| Secondary text | `#6B7280` | Subtitles, table secondary text, dates |
| Muted text | `#9CA3AF` | Placeholder text, disabled labels, section eyebrows |
| Border | `#E5E7EB` | Card borders, table dividers, input borders |
| Active surface | `#FDF2F8` | Active sidebar item background, status pill background |
| App background | `#F7F8FA` | Page background |
| Surface / card | `#FFFFFF` | Cards, table, sidebar, topbar |

### Semantic colors

| Token | Hex | Usage |
|---|---|---|
| Success | `#16A34A` | "Published" status badge background |
| Success text (on white) | `#16A34A` | Positive state labels |
| Icon badge background | `#F3E8F6` | Circular icon chip background (course rows) |
| Icon badge accent | `#C1127A` | Icon glyph color inside icon badges |
| Sidebar icon (default) | `#6B7280` | Inactive nav icon color |
| Sidebar icon (active) | `#C1127A` | Active nav icon color |

## Typography

Font family: `Inter, system-ui, -apple-system, sans-serif`

| Style | Size / Weight | Example |
|---|---|---|
| Page title | 28px / 700 | "Outreach" |
| Section header | 20px / 600 | "SheCode Africa Admin" topbar |
| Table header label | 15px / 600 | Column headers (State, Description…) |
| Body text | 15px / 400 | Table rows, descriptions |
| Secondary / muted text | 14px / 400 | Subtitles, dates |

## Shape & Spacing

| Radius | Usage |
|---|---|
| 8px | Buttons, inputs |
| 14px | Cards, panels |
| Full (999px) | Pills, status badges, avatars |

## Components

### Buttons
- **Primary** — `#C1127A` background, white text, 10px radius, 12px/22px padding, 14px/600 weight (e.g. "Add Outreach")
- **Secondary / outline** — white background, `#111317` text, 1px `#E5E7EB` border, 10px radius (e.g. "Filters")
- **Pagination** — `#F3F4F6` background, 8px radius, disabled state uses `#9CA3AF` text

### Navigation items
- **Active** — `#FDF2F8` background, `#C1127A` text/dot, 600 weight
- **Default** — transparent background, `#374151` text, `#D1D5DB` dot, 500 weight

### Form fields
- Label: 13px/600, `#374151`
- Input: 1px `#E5E7EB` border, 10px radius, 12px/16px padding, 14px text

### Data table
- Header row: `#6B7280` 13px/600 labels, bottom border `#E5E7EB`
- Rows: 15px/400 primary text, `#F3F4F6` row dividers, 16px/20px cell padding
- Row icon badge: 36px circle, `#F3E8F6` background, `#C1127A` glyph — used as a leading thumbnail for named items (courses, outreach entries)

### Status pills
- **Published / success** — full radius, solid `#16A34A` background, white text, 12px/600
- **Active** — full radius, `#FDF2F8` bg, `#C1127A` text, 12px/600
- **Draft / neutral** — full radius, `#F3F4F6` bg, `#6B7280` text, 12px/600

