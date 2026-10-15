# Portfolio site

A static site (HTML, CSS, vanilla JavaScript). No build step, no npm, no frameworks.

## 1. Folder structure

```
portfolio/
├── index.html                  Home page (intro, featured work, timeline, leadership, about)
├── site-content.js             ALL facts and wording live here
├── projects/
│   ├── mars-rotorcraft.html    Project page (reads projects.marsRotorcraft)
│   └── moxie.html              Project page (reads projects.moxie)
├── assets/
│   ├── css/styles.css          Layout, colors, typography
│   ├── js/render.js            Builds pages from site-content.js (contains no facts)
│   └── img/                    Put images here
├── README.md
└── FACT_CHECK.md               Checklist to complete before publishing
```

## 2. Preview locally

Double-click `index.html`. It works without a server because content loads through a normal `<script>` tag.
Optional: run `python3 -m http.server` in this folder and open http://localhost:8000.

## 3. Where factual content is stored

Only in `site-content.js`. The HTML files are empty shells. Markers inside text strings:

| Marker | Meaning |
|---|---|
| `null` | Hidden automatically (field, section, or nav link) |
| `[NEEDS USER INFORMATION: ...]` | Missing information. Highlighted in draft view; removed in publish mode |
| `[VERIFY ...]` | A value or wording to confirm. Stays visible until you delete the marker |
| `[APPROVE ...]` | Wording to approve. Same rule as VERIFY |

**Draft vs publish:** `settings.publishMode` is `false` while you work (highlights and a draft bar appear).
Set it to `true` to publish: all `[NEEDS USER INFORMATION]` pieces and empty image placeholders disappear.
`[VERIFY]` and `[APPROVE]` markers are never removed automatically. Confirm each fact, then delete the marker text yourself.

## 4. Edit timeline entries

Edit the `timeline` array in `site-content.js`. Entries appear in the order listed (oldest first).
Fields: `year`, `grade`, `title`, `category`, `type` ("mini" or "major"), `status`, `summary`, `details`, `tags`, `image`, `imageAlt`, `href`.
Set any field to `null` to hide it.

## 5. Add a mini project

Add an object to `timeline` with `type: "mini"`, a title, category, a 2–4 sentence `summary`, and optional `details`:

```js
{
  year: "2024", grade: "10th Grade", title: "…", category: "…", type: "mini", status: null,
  summary: "…",
  details: [{ label: "What I learned", value: "…" }],
  image: null, imageAlt: "", imagePlaceholder: "Photo of …"
}
```

## 6. Add a major project

1. In `site-content.js`, add an entry under `projects` (copy `moxie` as a starting point), e.g. `projects.myProject`.
2. Copy `projects/moxie.html` to `projects/my-project.html` and change `data-project="moxie"` to `data-project="myProject"` and the `<title>`.
3. Add a timeline entry with `type: "major"` and `href: "projects/my-project.html"`.
4. Optionally add it to `featuredProjects`.

Project sections available (shown only when not `null`): `overview`, `question`, `design`, `theory`, `cad`, `manufacturing`, `experimentalSetup`, `testing`, `results`, `problems`, `iteration`, `learned`, `nextSteps`. Each can hold `paragraphs`, `specs`, `items`, and `figures`. Add `heading: "…"` to rename a section on one page.
`statusTable` rows use `status: "completed" | "in-progress" | "planned"`; `null` means not yet provided.

## 7. Replace images

1. Copy the file into `assets/img/`.
2. Set `image: "assets/img/your-file.png"` and a real `imageAlt` (describe what the image shows). For figures inside project pages use `alt`; add `caption` when useful.
3. Never use stock or generated images as evidence.

## 8. Replace the résumé

Put the PDF at `assets/resume.pdf`, then set `personal.resume.file: "assets/resume.pdf"` in `site-content.js`.
The "Résumé / Contact" section and nav link appear automatically. Do the same with `personal.email` if you want an email shown. Leave both `null` to keep the section hidden.

## 9. Change colors

Edit the variables in the `:root` block at the top of `assets/css/styles.css` (`--blue`, `--red`, `--bg`, `--ink`, …).
Check that text keeps enough contrast against the background.

## 10. Deploy with GitHub Pages

1. Create a GitHub repository and upload the contents of this folder (so `index.html` is at the top level).
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then Save.
4. After a minute the site appears at `https://<username>.github.io/<repository>/`.
5. Before publishing: finish `FACT_CHECK.md`, remove the `[VERIFY]`/`[APPROVE]` markers you have confirmed, and set `publishMode: true`.

## Notes

- Page content is built by JavaScript, so it needs JavaScript enabled.
- No logos from NASA, Queensborough Community College, or any other organization are used.
