# Kwame Mensah — personal academic homepage

A responsive static website with an introduction, research interests, project
pages, downloadable code, and research notes.

Website: https://km1120-code.github.io/
Source: https://github.com/km1120-code/km1120-code.github.io

## Research interests

Machine learning theory and **Information Extraction (IE)**, including
generalization, optimization, named entity recognition, and relation extraction.

## Preview

```bash
python -m http.server 8765 --bind 127.0.0.1
```

Open `http://localhost:8765/`. Assets and fonts are served locally. The site has
no analytics, external scripts, or required build system.

## Edit

- `index.html`: introduction, research interests, projects, notes, and contact.
- `assets/data/profile.json`: profile text and background details.
- `assets/css/style.css`: appearance and responsive layout.
- `assets/js/site.js`: theme, navigation, and interactive extraction example.
- `projects/`: code and experiment pages.
- `notes/`: explanatory research notes.
- `assets/img/`: portrait and project figures.
- `downloads/`: complete educational example source archives.

The introduction includes the provided origin, Rwanda. Age, school, department,
position, and OpenReview URL can be added when supplied.

## Educational projects

The example repositories use synthetic data, publish their assumptions, and
include runnable code, tests, and results. Their pages distinguish educational
experiments from research benchmarks.

## GitHub Pages

The website is published from the root of the `main` branch. `.nojekyll` enables
plain static hosting. Internal links are relative, and no custom domain is set.

## License and credits

Original implementation: MIT (`LICENSE`). Layout reference: Minimal Light by
Yaoyao Liu (CC0). Font and template credits are in `THIRD_PARTY_NOTICES.md`.
DM Sans and Lora are distributed under the SIL Open Font License.
