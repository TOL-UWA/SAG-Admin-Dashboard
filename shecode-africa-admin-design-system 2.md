# SheCode Africa Admin Dashboard --- Design System

------------------------------------------------------------------------

## 1. Design Principles

### Clear and task-focused

Prioritize the information administrators need to scan quickly:
navigation, page context, filters, data, status, and actions.

### Calm and professional

Use a mostly neutral interface with SheCode Africa's magenta as the
primary accent. Reserve stronger colors for meaningful states such as
success, warning, and error.

### Consistent hierarchy

Use predictable spacing, typography, button styles, table patterns, and
interaction states throughout the admin experience.

### Efficient administration

Common actions such as search, filtering, creating, viewing, and editing
should be easy to discover without overwhelming the page.

------------------------------------------------------------------------

# 2. Foundations

## 2.1 Color

### Brand / Primary

  -----------------------------------------------------------------------
  Token                   Value                   Usage
  ----------------------- ----------------------- -----------------------
  `color-primary`         `#C6006F` approx.       Primary buttons,
                                                  selected navigation,
                                                  active borders, accents

  `color-primary-dark`    `#B70569`               Darker brand accent /
                                                  hover states

  `color-primary-soft`    `#FCE4F1` approx.       Selected navigation
                                                  backgrounds, soft
                                                  highlights

  `color-primary-tint`    `#FFF3F8` approx.       Very light brand
                                                  surfaces
  -----------------------------------------------------------------------

> **Note:** `#B70569` is the established SheCode Africa magenta
> reference and should be preferred where the brand color must be exact.

### Neutrals

  ------------------------------------------------------------------------
  Token                    Value                   Usage
  ------------------------ ----------------------- -----------------------
  `color-background`       `#F3F6FA` approx.       Main application
                                                   background

  `color-surface`          `#FFFFFF`               Cards, panels, tables,
                                                   sidebar

  `color-surface-subtle`   `#F8FAFC` approx.       Inputs, table rows,
                                                   subtle containers

  `color-border`           `#DDE3EA` approx.       Borders and dividers

  `color-border-strong`    `#C9D2DC` approx.       Stronger component
                                                   boundaries

  `color-text-primary`     `#111827` approx.       Headings and primary
                                                   content

  `color-text-secondary`   `#526173` approx.       Supporting text and
                                                   descriptions

  `color-text-muted`       `#7A8797` approx.       Placeholder, metadata,
                                                   disabled text

  `color-white`            `#FFFFFF`               Text on primary buttons
                                                   and dark surfaces
  ------------------------------------------------------------------------

### Semantic colors

  Token                  Value               Usage
  ---------------------- ------------------- ----------------------------
  `color-success`        `#08A84F` approx.   Published/success states
  `color-success-soft`   `#E8F8EF` approx.   Success backgrounds
  `color-warning`        `#D98A00` approx.   Warnings
  `color-warning-soft`   `#FFF4DB` approx.   Warning backgrounds
  `color-error`          `#D92D20` approx.   Errors/destructive actions
  `color-error-soft`     `#FDECEC` approx.   Error backgrounds
  `color-info`           `#2563EB` approx.   Informational states

### Color usage rules

-   Use magenta for **primary actions and navigation context**, not for
    every interactive element.
-   Use green only when the UI communicates a meaningful
    success/published state.
-   Keep body text dark enough to meet WCAG contrast requirements.
-   Do not use color alone to communicate an important state; pair it
    with text, an icon, or another visual indicator.

------------------------------------------------------------------------

# 3. Typography

The screenshot uses a clean modern sans-serif style. **Inter** or a
similar system sans-serif is recommended.

## Type scale

  Token              Size     Weight Usage
  ---------------- ------ ---------- -------------------------------
  `display-sm`       28px        700 Large page titles when needed
  `heading-lg`       24px        700 Main page heading
  `heading-md`       18px   600--700 Section headings
  `heading-sm`       16px        600 Component headings
  `body-lg`          16px        400 Prominent body copy
  `body-md`          14px        400 Default UI text
  `body-sm`          13px        400 Supporting information
  `caption`          12px   400--500 Metadata, labels
  `button`           14px        600 Button labels
  `table-header`     13px        600 Table column headings

### Typography rules

-   Use sentence case for most UI labels.
-   Use concise labels: `Add Course`, `Filters`, `Search`.
-   Avoid unnecessary capitalization.
-   Keep descriptions short and truncate long table content where
    appropriate.
-   Use `font-weight: 600` for interactive labels and table headers
    rather than excessive bold text.

------------------------------------------------------------------------

# 4. Spacing

Use a **4px base spacing unit**.

  Token          Value Typical usage
  ------------ ------- -----------------------------
  `space-1`        4px Icon/text gaps
  `space-2`        8px Small component gaps
  `space-3`       12px Compact padding
  `space-4`       16px Standard component padding
  `space-5`       20px Medium spacing
  `space-6`       24px Card padding / section gaps
  `space-8`       32px Major section spacing
  `space-10`      40px Large layout spacing
  `space-12`      48px Page-level spacing
  `space-16`      64px Large vertical separation

### Recommended defaults

-   Page content horizontal padding: **24--32px**
-   Card padding: **24px**
-   Table cell horizontal padding: **12--16px**
-   Button horizontal padding: **16px**
-   Form field height: **40px**
-   Compact control height: **36px**

------------------------------------------------------------------------

# 5. Layout

## Application shell

The dashboard uses a two-column application shell:

``` text
┌─────────────────────────────────────────────────────────────┐
│ Sidebar              │ Top bar / Header                     │
│                      ├───────────────────────────────────────┤
│ Navigation            │                                     │
│                      │ Main content                         │
│                      │                                     │
│                      │                                     │
└──────────────────────┴───────────────────────────────────────┘
```

### Sidebar

-   Approximate width: **260px**
-   Fixed or sticky on desktop
-   White surface
-   Subtle right border
-   Logo positioned at the top
-   Navigation grouped into primary sections
-   Active navigation uses a soft magenta background and magenta
    indicator/text

### Top bar

-   Height: approximately **56--64px**
-   White surface
-   Bottom border
-   Page/product context on the left
-   Utility controls on the right
-   Keep the top bar visually quiet so the content area remains dominant

### Main content

-   Background: light neutral
-   Content should be centered within a responsive max-width when
    appropriate
-   Primary dashboard panels use white surfaces with subtle
    borders/shadows

------------------------------------------------------------------------

# 6. Elevation, Borders & Radius

## Border radius

  Token             Value Usage
  --------------- ------- ------------------------
  `radius-sm`         6px Small controls, badges
  `radius-md`         8px Inputs, buttons
  `radius-lg`        12px Cards and panels
  `radius-xl`        16px Large containers
  `radius-pill`     999px Status badges / pills

The screenshot primarily uses **8--12px rounded corners**.

## Shadows

Use shadows sparingly.

### Card shadow

``` css
box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
```

### Elevated popover

``` css
box-shadow: 0 8px 24px rgba(15, 23, 42, 0.12);
```

Prefer borders over heavy shadows for large dashboard panels.

------------------------------------------------------------------------

# 7. Components

## 7.1 Buttons

### Primary

Used for the most important action on a page.

**Example:** `Add Course`

-   Background: primary magenta
-   Text: white
-   Weight: 600
-   Height: 40px
-   Horizontal padding: 16px
-   Radius: 8px

States:

  State      Behavior
  ---------- ----------------------------------
  Default    Primary magenta
  Hover      Darker magenta
  Focus      Visible focus ring
  Active     Slightly darker/pressed
  Disabled   Reduced contrast and interaction

### Secondary

Used for supporting actions.

**Example:** `Filters`

-   White/light neutral background
-   Dark text
-   Neutral border
-   Same height and radius as primary buttons

### Icon button

Used for compact actions such as view, edit, settings, or profile.

-   Minimum touch target: **40 × 40px**
-   Icon centered
-   Tooltip for unfamiliar icons
-   Visible hover/focus state

------------------------------------------------------------------------

# 8. Form Controls

## Search field

The course page uses a prominent search field.

Recommended:

-   Height: 40px
-   Width: responsive, approximately 300--340px on desktop
-   White background
-   Neutral border
-   8px radius
-   Search icon optional
-   Placeholder text in muted gray

Placeholder example:

`Search title, description, or activity...`

### Focus

Use a visible focus ring:

``` css
outline: 2px solid rgba(183, 5, 105, 0.25);
border-color: #B70569;
```

## Filter control

Filters should appear visually adjacent to search.

Recommended behavior:

-   Button opens a popover/drawer
-   Selected filters should be visible
-   Provide `Clear filters` when filters are active
-   Do not hide important filtering context

------------------------------------------------------------------------

# 9. Navigation

## Navigation item

Default:

-   Icon + label
-   40--44px minimum height
-   Comfortable horizontal padding
-   Neutral text

### Hover

Use a subtle neutral or brand-tinted background.

### Active

The screenshot uses a strong active treatment:

-   Soft magenta background
-   Magenta label/icon
-   Border or accent indicator
-   Medium/semibold text weight

### Expandable navigation

Sections such as `Volunteers`, `Chapters`, and `Stem a Girl` can
expand/collapse.

Use:

-   Chevron indicator
-   Clear indentation for nested links
-   Active child item styling
-   Preserve expanded state during navigation where possible

------------------------------------------------------------------------

# 10. Tables

The course list is the primary data-display component.

## Table structure

``` text
Course | Description | Difficulty | Est. Hours | Activity | Featured | State | Updated | Action
```

### Table header

-   13px text
-   Semibold
-   Muted/dark gray
-   White or very light background
-   Clear column separation through spacing rather than heavy borders

### Table row

-   Minimum height: approximately **50px**
-   Vertical alignment: center
-   Subtle bottom border
-   Avoid excessive row shading

### Course identity

Use:

``` text
[Course icon]  Course name
```

-   Icon: approximately 32px
-   Course name: semibold
-   Keep the identity visually stronger than the description

### Long descriptions

Use one-line truncation:

``` css
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
```

Provide the complete value on hover/focus or in the course detail view.

------------------------------------------------------------------------

# 11. Status Badge

The `Published` state is represented by a compact pill.

### Published

-   Background: success green
-   Text: white
-   Font size: 12--13px
-   Weight: 600
-   Radius: pill
-   Horizontal padding: 10--12px
-   Vertical padding: 4--5px

Example:

`Published`

### Additional states

Recommended system:

-   `Published` --- green
-   `Draft` --- neutral gray
-   `Pending review` --- amber
-   `Archived` --- muted gray
-   `Rejected` --- red

Do not rely only on color; the state label must remain explicit.

------------------------------------------------------------------------

# 12. Icons

Use one consistent icon family throughout the dashboard.

Recommended style:

-   Outline/linear icons
-   Approximately 18--20px for navigation
-   Approximately 18px for table actions
-   Consistent stroke weight

Examples visible in the screenshot:

-   Team / users
-   Heart / volunteers
-   User search / talent request
-   Help / enquiries
-   Message / testimonials
-   Report/document
-   Calendar / events
-   Chapters
-   Graduation / STEM
-   Home/academy
-   Initiatives
-   Partners
-   Jobs
-   Logout
-   Eye / view
-   Pencil / edit
-   Chevron
-   Sun/theme
-   User/profile

Avoid mixing filled and outlined icon families unless the difference has
a deliberate semantic purpose.

------------------------------------------------------------------------

# 13. Table Actions

The screenshot uses compact icon actions at the end of each row.

### View

Use an eye icon.

-   Tooltip: `View course`
-   Opens course details

### Edit

Use a pencil icon.

-   Tooltip: `Edit course`
-   Opens course editing flow

### Interaction rules

-   Keep actions grouped in the final column
-   Maintain at least 8px between icons
-   Provide 40px touch targets even if the visible icon is smaller
-   Do not rely on icon shape alone for accessibility; provide
    accessible labels/tooltips

------------------------------------------------------------------------

# 14. Pagination

The course table includes:

``` text
Prev    Page 1 of 1    Next
```

### Rules

-   Disabled controls should remain readable but visibly inactive
-   Current page indicator should be easy to scan
-   Use consistent button height with other controls
-   On a single page, disable both navigation buttons

For larger datasets, consider:

``` text
Rows per page: 25
1–25 of 120
Prev  1  2  3  ...  5  Next
```

------------------------------------------------------------------------

# 15. Cards & Panels

The main content container is a white rounded panel.

### Card

-   Background: white
-   Radius: 12px
-   Border: 1px neutral
-   Optional subtle shadow
-   Padding: 24px

### Page heading area

Recommended hierarchy:

``` text
Courses
Manage Stem-a-Girl courses.

[Search...] [Filters] [Add Course]
```

The item count should sit at the top-right:

`3 course(s)`

Use muted text so it does not compete with the page title.

------------------------------------------------------------------------

# 16. Responsive Behavior

### Desktop

-   Persistent sidebar
-   Full table
-   Search and filters inline
-   Action buttons visible

### Tablet

-   Sidebar can collapse
-   Table may horizontally scroll
-   Maintain minimum readable column widths
-   Keep primary action visible

### Mobile

Convert dense tables into cards or a responsive stacked layout.

Example:

``` text
Coding With Scratch
Beginner to Advanced
5 hours
Published

[View] [Edit]
```

Do not force users to read a highly compressed desktop table on a narrow
screen.

------------------------------------------------------------------------

# 17. Interaction States

Every interactive component should define:

1.  Default
2.  Hover
3.  Focus
4.  Active/pressed
5.  Disabled
6.  Loading, where applicable
7.  Error, where applicable

### Focus

Keyboard focus must always be visible.

Recommended:

``` css
box-shadow: 0 0 0 3px rgba(183, 5, 105, 0.20);
```

Never remove the browser focus indicator without replacing it with an
equally visible custom state.

------------------------------------------------------------------------

# 18. Accessibility

Target **WCAG 2.2 AA**.

### Requirements

-   Minimum text contrast: 4.5:1 for normal text
-   Minimum large-text contrast: 3:1
-   Interactive targets: at least 40--44px where practical
-   Full keyboard navigation
-   Visible focus states
-   Semantic HTML for tables, navigation, headings, and buttons
-   Accessible names for icon-only controls
-   Do not communicate state through color alone
-   Form controls must have accessible labels
-   Tooltips should supplement, not replace, accessible labels

------------------------------------------------------------------------

# 19. Content Guidelines

Use short, direct interface copy.

### Preferred

-   `Add Course`
-   `Filters`
-   `View course`
-   `Edit course`
-   `Published`
-   `Search title, description, or activity...`

### Avoid

-   Long button labels
-   Technical language when a simpler term works
-   Redundant helper text
-   Inconsistent capitalization

Use **sentence case** across labels and navigation.

------------------------------------------------------------------------

# 20. Design Tokens --- Starter CSS

``` css
:root {
  /* Brand */
  --color-primary: #B70569;
  --color-primary-dark: #8F0453;
  --color-primary-soft: #FCE4F1;

  /* Surfaces */
  --color-background: #F3F6FA;
  --color-surface: #FFFFFF;
  --color-surface-subtle: #F8FAFC;

  /* Borders */
  --color-border: #DDE3EA;
  --color-border-strong: #C9D2DC;

  /* Text */
  --color-text-primary: #111827;
  --color-text-secondary: #526173;
  --color-text-muted: #7A8797;

  /* Semantic */
  --color-success: #08A84F;
  --color-warning: #D98A00;
  --color-error: #D92D20;
  --color-info: #2563EB;

  /* Radius */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-pill: 999px;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;

  /* Typography */
  --font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
```

------------------------------------------------------------------------

# 21. Component Inventory

The initial design system should include:

### Navigation

-   Sidebar
-   Navigation item
-   Nested navigation item
-   Expand/collapse navigation group
-   Top bar
-   Profile button
-   Theme toggle

### Data

-   Table
-   Table header
-   Table row
-   Status badge
-   Pagination
-   Empty state

### Forms

-   Search input
-   Text input
-   Select
-   Checkbox
-   Radio
-   Filter button
-   Filter popover
-   Form validation

### Actions

-   Primary button
-   Secondary button
-   Ghost button
-   Icon button
-   Button group

### Feedback

-   Toast
-   Alert
-   Confirmation modal
-   Loading state
-   Skeleton
-   Error state

### Content

-   Page header
-   Card
-   Stat card
-   Avatar/course thumbnail
-   Tooltip
-   Dropdown menu

------------------------------------------------------------------------

# 22. Suggested Naming Convention

Use semantic names rather than visual names.

### Good

-   `PrimaryButton`
-   `SidebarNavItem`
-   `StatusBadge`
-   `DataTable`
-   `FilterButton`
-   `PageHeader`

### Avoid

-   `PinkButton`
-   `GreyBox`
-   `RoundThing`
-   `BigText`
-   `LeftMenu`

This keeps the design system maintainable if the visual design changes
later.

------------------------------------------------------------------------

# 23. Design System Governance

When extending the system:

1.  Check whether an existing component already solves the problem.
2.  Reuse existing spacing, typography, color, and radius tokens.
3.  Avoid creating one-off styles for individual pages.
4.  Add new components only when the pattern is reusable.
5.  Document new component states.
6.  Test keyboard and responsive behavior.
7.  Validate accessibility before release.

------------------------------------------------------------------------

## Quick Reference

  Area                      Standard
  ------------------------- ---------------------------------
  Primary brand             `#B70569`
  Main background           Light neutral `#F3F6FA` approx.
  Surface                   `#FFFFFF`
  Primary text              `#111827` approx.
  Body text                 `#526173` approx.
  Primary button            Magenta
  Success state             Green
  Base spacing              4px
  Standard control height   40px
  Card radius               12px
  Button/input radius       8px
  Status radius             Pill
  Icon style                Consistent outline/linear
  Font                      Inter / system sans-serif
  Accessibility target      WCAG 2.2 AA

------------------------------------------------------------------------

## Implementation Note

This document describes the **visual system inferred from the supplied
screenshot**, not a full specification of the underlying product. Before
implementation, validate exact colors, font family, spacing, component
dimensions, responsive breakpoints, and interaction behavior against the
production design files or coded application.
