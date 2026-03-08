# Resume Generator

Parameterized DOCX resume generator with variant support. One codebase, multiple tailored resumes.

## Setup

```bash
just install
```

Requires [Node.js](https://nodejs.org/) and [just](https://github.com/casey/just) (`brew install just`).

PDF conversion requires [LibreOffice](https://www.libreoffice.org/) (`brew install --cask libreoffice`). Optional — you can open the `.docx` files directly if you prefer.

## Usage

```bash
just build              # Build all variants (docx + pdf)
just build base         # Build base resume only
just build founding     # Build founding engineer variant only
just docx founding      # Docx only, skip pdf
just clean              # Remove generated files
```

## Variants

| Variant    | Output File                              | Audience |
|------------|------------------------------------------|----------|
| `base`     | `NicholasFerguson_Resume.docx`           | General — platform eng, DevEx, build/release roles |
| `founding` | `NicholasFerguson_Resume_Founding.docx`  | Founding engineer roles at seed-stage companies with non-technical founders |

### What changes between variants

- **Profile section** — base leads with the A10 story; founding leads with "first infrastructure hire, built from scratch, twice" and includes the hospitality→engineering transition
- **Bullet emphasis** — founding trims technical detail (kernel drivers, EV signing specifics) in favor of business-outcome framing
- **Skills ordering** — founding moves "customer-facing delivery" to the front of the "Also" line
- **Projects intro** — founding uses "Tools I built because they needed to exist"
- **ThreatX/Vispero** — founding compresses lower-priority bullets for space

### What stays the same

Header, contact info, skills (Languages/Infrastructure/Data), education, projects, and all layout/design tokens are shared. Content accuracy rules (platform counts, AI Firewall story, tone) apply to all variants.

## Adding a new variant

1. In `resume.js`, add entries to each content map keyed by your variant name: `profiles`, `skillsAlso`, `projectsIntro`, `a10Bullets`, `threatxBullets`, `visperoBullets`
2. Add the output filename to the `filenames` map
3. Add the variant name to `VARIANTS` array
4. In `justfile`, add the name to the `variants` list and add a case to the `pdf` recipe

## File structure

```
resume.js          — Single parameterized generator (node resume.js <variant>)
justfile           — Build orchestration
package.json       — Dependencies (docx)
index.html         — Portfolio site (nickcrew.github.io/resume)
process.html       — "How I Job Search" page
```

## Design system

All variants share the same visual identity:

- **Font:** Arial throughout
- **Name:** 28pt, spaced out
- **Section headings:** 22pt bold, dark navy (#1e3a5f), bottom border
- **Body:** 19pt (9.5pt), #444444
- **Bold leads:** 19pt bold, #1A1A1A — always impact-first, never task-first
- **Links:** #2563EB with underline
- **Page:** US Letter, 720 top/bottom margins, 900 left/right
