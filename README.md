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
just docx base      # Docx only, skip pdf
just clean              # Remove generated files
```

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
