# Alok Ramteke — Portfolio

This is a plain HTML/CSS/JS export of the original React portfolio component.
No design, layout, colors, spacing, typography, animations, or content have
been changed — this is the same site, restructured to run without a React
build step so it can be opened directly or served with VS Code's Live Server.

## 1. Folder Structure

```
portfolio-website/
│
├── index.html              → All page markup (Nav, Hero, About, Timeline,
│                              Skills, Projects, Contact, Footer)
├── style.css                → All styling (copied 1:1 from the component's
│                              original inline <style> block)
├── script.js                 → All interactivity (scroll spy, reveal-on-scroll
│                              animations, mobile menu, scroll-to-top, copy email)
│
├── assets/
│   ├── images/              → (reserved for any future images)
│   ├── icons/                → (reserved — icons are currently inline SVG,
│                              see note below)
│   └── profile/
│       └── profile.jpg      → Your profile photo, extracted from the
│                              original embedded base64 image
│
├── fonts/                   → (empty — see Fonts note below)
├── favicon.ico               → Generated from your profile photo
└── README.md                 → This file
```

## 2. Which file controls styling

**`style.css`** controls all visual styling — colors, spacing, layout, card
styles, typography sizing, gradients, borders, and responsive breakpoints.
All the original CSS custom properties (`--bg`, `--accent`, `--text`, etc.)
live at the top of the file inside `.portfolio-root`.

## 3. Which file controls animations

**`style.css`** defines the animation/transition rules themselves (e.g. the
`.reveal` / `.reveal-visible` fade-and-slide-in classes, hover transitions,
the scroll-to-top button's show/hide transition).

**`script.js`** controls *when* those animations trigger — it uses
`IntersectionObserver` to add the `reveal-visible` class to each `.reveal`
block as it scrolls into view, exactly like the original React `Reveal`
component did.

## 4. Which file controls scrolling

**`script.js`** — it handles:
- Smooth scrolling to a section when a nav link or button is clicked
  (`scrollToId`, wired up via `data-scroll` attributes)
- The scroll-spy behavior that highlights the current section in the navbar
- Showing/hiding the "scroll to top" button based on scroll position

## 5. Which file controls navigation

**`index.html`** contains the nav markup (desktop nav links + mobile menu),
each tagged with a `data-scroll="section-id"` attribute.
**`script.js`** wires up the click handlers and the mobile menu toggle.

## 6. Which file controls contact links

**`index.html`** contains the actual email/phone/LinkedIn/GitHub links (in
the Hero section's social icons and the Contact section's contact card).
**`script.js`** controls the "Copy Email" button behavior (copies to
clipboard and briefly shows a "Copied!" confirmation).

To change your email, phone, or social links, search `index.html` for:
- `alokramteke.work@gmail.com`
- `+91 8591622553` / `tel:+918591622553`
- the LinkedIn and GitHub URLs

and update every place with your new value (the same value appears in the
Hero social icons and the Contact card).

## 7. Which files you should edit in the future

- **Content changes** (text, project details, timeline entries, skills,
  links): edit **`index.html`**.
- **Visual changes** (colors, spacing, fonts, layout): edit **`style.css`**.
- **Behavior changes** (animations, scroll behavior, new interactivity):
  edit **`script.js`**.
- **Profile photo**: replace `assets/profile/profile.jpg` with a new image
  of the same filename (or update the `src` in `index.html` if you rename
  it).

## Notes

- **Fonts**: The site loads Space Grotesk, Inter, and JetBrains Mono from
  Google Fonts via a CSS `@import` at the top of `style.css` (this matches
  the original component, which also loaded fonts this way). An internet
  connection is required for the fonts to load; the `fonts/` folder is kept
  empty and reserved in case you want to self-host them later.
- **Icons**: The original used the `lucide-react` icon library. Since this
  export has no build step, each icon has been converted to an equivalent
  inline SVG directly in `index.html`, so no external icon library or
  network request is needed for icons.
- **Running locally**: Simply open `index.html` in a browser, or right-click
  it in VS Code and choose "Open with Live Server" for auto-reload while
  editing.
