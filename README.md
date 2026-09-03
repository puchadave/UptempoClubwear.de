# UPTEMPO CLUBWEAR // CORE

Static GitHub Pages foundation for the UPTEMPO CLUBWEAR web presence.

## Architecture

```text
.
├── index.html     # Complete responsive application shell
└── README.md      # Project documentation
```

The project intentionally uses no build system. The current deployment is a self-contained HTML5 application with:

- Tailwind CSS loaded through CDN
- Inter for interface and editorial text
- JetBrains Mono for metrics and system labels
- Mobile-first responsive grid layout
- Strict dark UI based on Slate-950 and Slate-900
- Cyan and Emerald status accents
- Accessible semantic HTML structure
- Interactive JavaScript terminal mockup

## Local development

No installation step is required. Clone the repository and open `index.html` in a modern browser.

```bash
git clone https://github.com/puchadave/UptempoClubwear.de.git
cd UptempoClubwear.de
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## GitHub Pages deployment

GitHub Pages can publish this repository without a build step.

1. Open **Repository Settings → Pages**.
2. Select **Deploy from a branch**.
3. Select branch `main` and folder `/(root)`.
4. Save the configuration.

GitHub will then publish the current `index.html` as the site entry point.

## Custom domain

When a custom domain is configured, GitHub Pages requires the corresponding DNS records at the DNS provider. Add a `CNAME` file only after the exact production domain has been confirmed.

## Design system

| Layer | Value |
|---|---|
| Background | `#020617` / Slate-950 |
| Surface | Slate-900 |
| Primary signal | Cyan-400 |
| Status signal | Emerald-400 |
| Interface font | Inter |
| System font | JetBrains Mono |

## Operating principle

This repository is intentionally static and dependency-light. That reduces attack surface, eliminates a server runtime and keeps GitHub Pages deployment simple. Additional commerce, analytics or API functionality should be integrated through isolated modules rather than turning the static core into an accidental framework experiment.
