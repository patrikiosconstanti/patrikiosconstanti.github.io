/* =====================================================================
   render.js — builds the pages from site-content.js.
   It contains no facts. Sections whose content is null are skipped.
   All text is inserted with textContent / text nodes (never innerHTML).
   ===================================================================== */
(function () {
  "use strict";

  if (typeof siteContent === "undefined") { return; }

  var C = siteContent;
  var PUBLISH = !!(C.settings && C.settings.publishMode);
  var MARK_SPLIT = /(\[(?:NEEDS USER INFORMATION|VERIFY|APPROVE)[^\]]*\])/;
  var MARK_START = /^\[(?:NEEDS USER INFORMATION|VERIFY|APPROVE)/;
  var NEEDS_ALL = /\[NEEDS USER INFORMATION[^\]]*\]/g;
  var root = document.body.getAttribute("data-root") || "";
  var page = document.body.getAttribute("data-page");
  var markerCount = 0;

  var STATUS_LABEL = { "completed": "Completed", "in-progress": "In progress", "planned": "Planned" };

  var SECTION_ORDER = [
    ["overview", "Project overview"],
    ["question", "The question"],
    ["design", "Design"],
    ["theory", "Theory and calculations"],
    ["cad", "CAD and modeling"],
    ["manufacturing", "Manufacturing and prototyping"],
    ["experimentalSetup", "Experimental setup"],
    ["testing", "Testing"],
    ["results", "Results"],
    ["problems", "Problems and failed attempts"],
    ["iteration", "Iteration"],
    ["learned", "What I learned"],
    ["nextSteps", "Next steps"]
  ];

  /* ---------- helpers ---------- */

  // Returns the string to display, or null if it should be hidden.
  function S(v) {
    if (v === null || v === undefined) { return null; }
    var s = String(v);
    if (PUBLISH) { s = s.replace(NEEDS_ALL, "").replace(/\s{2,}/g, " ").trim(); }
    return s === "" ? null : s;
  }

  function addText(node, str) {
    String(str).split(MARK_SPLIT).forEach(function (part) {
      if (!part) { return; }
      if (MARK_START.test(part)) {
        var m = document.createElement("mark");
        m.className = "ph";
        m.textContent = part;
        node.appendChild(m);
        markerCount += 1;
      } else {
        node.appendChild(document.createTextNode(part));
      }
    });
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) { n.className = cls; }
    if (text !== undefined && text !== null) { addText(n, text); }
    return n;
  }

  // Element with text, or null when the text is hidden.
  function txt(tag, cls, value) {
    var s = S(value);
    return s ? el(tag, cls, s) : null;
  }

  function add(parent) {
    for (var i = 1; i < arguments.length; i++) {
      if (arguments[i]) { parent.appendChild(arguments[i]); }
    }
    return parent;
  }

  function link(href, text, cls) {
    var a = el("a", cls, text);
    a.href = /^(https?:|mailto:)/.test(href) ? href : root + href;
    return a;
  }

  function badge(status, showUnknown) {
    if (status && STATUS_LABEL[status]) {
      return el("span", "badge badge-" + status, STATUS_LABEL[status]);
    }
    if (showUnknown && !PUBLISH) {
      return el("span", "badge-unknown", "[NEEDS USER INFORMATION: status]");
    }
    return null;
  }

  function statusLine(status) {
    var b = badge(status, false);
    if (!b) { return null; }
    var p = el("p", "status-line");
    p.appendChild(el("span", "sr-only", "Status: "));
    p.appendChild(b);
    return p;
  }

  function tagList(tags) {
    var items = (tags || []).map(function (t) { return txt("li", null, t); }).filter(Boolean);
    if (!items.length) { return null; }
    var ul = el("ul", "tags");
    items.forEach(function (li) { ul.appendChild(li); });
    return ul;
  }

  function defList(items, cls) {
    var rows = (items || []).map(function (it) {
      var v = S(it.value);
      return v ? [S(it.label), v] : null;
    }).filter(Boolean);
    if (!rows.length) { return null; }
    var dl = el("dl", cls);
    rows.forEach(function (r) {
      var row = el("div");
      add(row, el("dt", null, r[0]), el("dd", null, r[1]));
      dl.appendChild(row);
    });
    return dl;
  }

  // image: path string or null. Shows a labelled placeholder in draft view.
  function figure(f) {
    if (!f) { return null; }
    var src = S(f.image);
    var fig = el("figure", "figure" + (f.wide ? " figure-wide" : ""));
    if (src) {
      var img = document.createElement("img");
      img.src = root + src;
      img.alt = f.alt || f.imageAlt || "";
      if (!img.alt && window.console) { console.warn("Image is missing alt text: " + src); }
      img.loading = "lazy";
      img.decoding = "async";
      fig.appendChild(img);
    } else {
      if (PUBLISH) { return null; }
      var ph = el("div", "figure-ph");
      ph.appendChild(el("span", "figure-ph-label", "Image placeholder"));
      if (f.placeholder) { ph.appendChild(el("span", null, f.placeholder)); }
      fig.appendChild(ph);
    }
    add(fig, txt("figcaption", null, f.caption));
    return fig;
  }

  function section(id, heading, cls) {
    var sec = el("section", "section" + (cls ? " " + cls : ""));
    sec.id = id;
    var h2 = el("h2", null, heading);
    h2.id = id + "-heading";
    sec.setAttribute("aria-labelledby", h2.id);
    var inner = el("div", "wrap");
    inner.appendChild(h2);
    sec.appendChild(inner);
    return { sec: sec, inner: inner };
  }

  /* ---------- home sections ---------- */

  function renderHero() {
    var P = C.personal;
    var hero = el("section", "hero");
    hero.setAttribute("aria-labelledby", "name");
    var wrap = el("div", "wrap");
    var h1 = el("h1", null, P.name);
    h1.id = "name";
    add(wrap, h1, txt("p", "headline", P.headline));
    var intro = el("div", "intro");
    (P.intro || []).forEach(function (p) { add(intro, txt("p", null, p)); });
    if (intro.childNodes.length) { wrap.appendChild(intro); }
    hero.appendChild(wrap);
    return hero;
  }

  function renderFeatured() {
    var list = (C.featuredProjects || []).filter(Boolean);
    if (!list.length) { return null; }
    var s = section("work", "Featured work");

    list.forEach(function (p) {
      var primary = p.layout === "primary";
      var art = el("article", "feature " + (primary ? "feature-primary" : "feature-compact"));

      var fig = figure({ image: p.image, alt: p.imageAlt, caption: p.imageCaption, placeholder: p.imagePlaceholder });

      var head = el("div", "feature-head");
      var h3 = el("h3");
      if (p.href) { h3.appendChild(link(p.href, p.title)); } else { addText(h3, p.title); }
      add(head, h3, txt("p", "category", p.category), statusLine(p.status));

      var text = el("div", "feature-text");
      add(text, txt("p", "summary", p.summary), tagList(p.tags));
      if (p.href) {
        var more = el("p", "more");
        more.appendChild(link(p.href, p.linkLabel || "View project"));
        text.appendChild(more);
      }
      var hl = defList(p.highlights, "highlights");

      if (primary) {
        add(art, fig, head);
        var body = el("div", "feature-body");
        add(body, text, hl);
        art.appendChild(body);
      } else {
        var left = el("div", "feature-text-col");
        add(left, head, text, hl);
        add(art, left, fig);
      }
      s.inner.appendChild(art);
    });
    return s.sec;
  }

  function renderTimeline() {
    var items = (C.timeline || []).filter(Boolean);
    if (!items.length) { return null; }
    var s = section("timeline", "Engineering timeline");
    var ol = el("ol", "timeline");

    items.forEach(function (t) {
      var li = el("li", "tl-item tl-" + (t.type === "major" ? "major" : "mini"));

      var when = el("div", "tl-when");
      add(when, txt("span", "tl-grade", t.grade), txt("span", "tl-year", t.year));

      var body = el("div", "tl-body");
      var h3 = el("h3");
      if (t.type === "major" && t.href) { h3.appendChild(link(t.href, t.title)); } else { addText(h3, t.title); }
      add(body, h3, txt("p", "tl-cat", t.category), statusLine(t.status), txt("p", "summary", t.summary));

      var tlFigs = (t.figures || []).map(figure).filter(Boolean);
      if (tlFigs.length) {
        var tlGrid = el("div", "figure-grid");
        tlFigs.forEach(function (f) { tlGrid.appendChild(f); });
        body.appendChild(tlGrid);
      } else {
        add(body, figure({ image: t.image, alt: t.imageAlt, caption: t.imageCaption, placeholder: t.imagePlaceholder }));
      }
      add(body, defList(t.details, "details"));
      add(body, tagList(t.tags));

      if (t.type === "major" && t.href) {
        var more = el("p", "more");
        more.appendChild(link(t.href, t.linkLabel || "View project"));
        body.appendChild(more);
      }

      add(li, when, body);
      ol.appendChild(li);
    });

    s.inner.appendChild(ol);
    return s.sec;
  }

  function renderLeadership() {
    var list = (C.leadership || []).filter(Boolean);
    if (!list.length) { return null; }
    var s = section("leadership", "Leadership and STEM outreach");
    var wrap = el("div", "roles");
    list.forEach(function (r) {
      var row = el("article", "role");
      var head = el("div");
      add(head, txt("h3", null, r.role), txt("p", "org", r.org), txt("p", "dates", r.dates));
      var bullets = (r.bullets || []).map(function (b) { return txt("li", null, b); }).filter(Boolean);
      row.appendChild(head);
      if (bullets.length) {
        var ul = el("ul");
        bullets.forEach(function (li) { ul.appendChild(li); });
        row.appendChild(ul);
      }
      wrap.appendChild(row);
    });
    s.inner.appendChild(wrap);
    return s.sec;
  }

  function renderAbout() {
    var paras = ((C.personal && C.personal.about) || []).map(function (p) { return txt("p", null, p); }).filter(Boolean);
    if (!paras.length) { return null; }
    var s = section("about", "About");
    var box = el("div", "about-text");
    paras.forEach(function (p) { box.appendChild(p); });
    s.inner.appendChild(box);
    return s.sec;
  }

  function renderContact() {
    var P = C.personal || {};
    var resumeFile = P.resume && S(P.resume.file);
    var email = S(P.email);
    if (!resumeFile && !email) { return null; }
    var s = section("contact", "Résumé and contact");
    var ul = el("ul", "contact-list");
    if (resumeFile) {
      var a = el("a", null, P.resume.label || "Résumé (PDF)");
      a.href = root + resumeFile;
      var li = el("li");
      li.appendChild(a);
      ul.appendChild(li);
    }
    if (email) {
      var m = el("a", null, email);
      m.href = "mailto:" + email;
      var li2 = el("li");
      li2.appendChild(m);
      ul.appendChild(li2);
    }
    s.inner.appendChild(ul);
    return s.sec;
  }

  /* ---------- project pages ---------- */

  function statusTable(rows) {
    rows = (rows || []).filter(function (r) { return S(r.stage) && !(PUBLISH && !r.status); });
    if (!rows.length) { return null; }
    var table = el("table", "status-table");
    table.appendChild(el("caption", "sr-only", "Project stages and current status"));
    var thead = el("thead");
    var hr = el("tr");
    ["Stage", "Status", "Notes"].forEach(function (h) {
      var th = el("th", null, h);
      th.scope = "col";
      hr.appendChild(th);
    });
    thead.appendChild(hr);
    table.appendChild(thead);

    var tbody = el("tbody");
    rows.forEach(function (r) {
      var tr = el("tr");
      var th = el("th", null, S(r.stage));
      th.scope = "row";
      var st = el("td", "s");
      st.appendChild(badge(r.status, true) || document.createTextNode(""));
      var note = el("td", "n");
      addText(note, S(r.note) || "");
      add(tr, th, st, note);
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    return table;
  }

  function projectSection(id, heading, d) {
    var body = el("div", "prose");
    var count = 0;

    (d.paragraphs || []).forEach(function (p) {
      var n = txt("p", null, p);
      if (n) { body.appendChild(n); count += 1; }
    });

    var specs = defList(d.specs, "specs");
    if (specs) { body.appendChild(specs); count += 1; }

    var items = (d.items || []).map(function (i) { return txt("li", null, i); }).filter(Boolean);
    if (items.length) {
      var ul = el("ul");
      items.forEach(function (li) { ul.appendChild(li); });
      body.appendChild(ul);
      count += 1;
    }

    var figs = (d.figures || []).map(figure).filter(Boolean);
    if (figs.length) {
      var grid = el("div", "figure-grid");
      figs.forEach(function (f) { grid.appendChild(f); });
      body.appendChild(grid);
      count += 1;
    }

    if (!count) { return null; }
    var sec = el("section", "p-section");
    sec.id = id;
    var h2 = el("h2", null, d.heading || heading);
    h2.id = id + "-heading";
    sec.setAttribute("aria-labelledby", h2.id);
    add(sec, h2, body);
    return { node: sec, id: id, label: d.heading || heading };
  }

  function renderProject(main) {
    var key = document.body.getAttribute("data-project");
    var P = C.projects && C.projects[key];
    if (!P) {
      var err = el("div", "wrap");
      err.appendChild(el("p", null, "Project not found."));
      main.appendChild(err);
      return;
    }
    document.title = P.title + " — " + C.personal.name;

    var head = el("header", "project-head");
    var wrap = el("div", "wrap");
    var back = el("p", "back");
    back.appendChild(link("index.html#work", "← Back to portfolio"));
    add(wrap, back, el("h1", null, P.title), txt("p", "category", P.category), statusLine(P.status), txt("p", "summary", P.summary), defList(P.facts, "facts"));
    head.appendChild(wrap);
    main.appendChild(head);

    var secs = [];

    var table = statusTable(P.statusTable);
    if (table) {
      var ssec = el("section", "p-section");
      ssec.id = "status";
      var sh = el("h2", null, "Where the project stands");
      sh.id = "status-heading";
      ssec.setAttribute("aria-labelledby", sh.id);
      add(ssec, sh, table);
      secs.push({ node: ssec, id: "status", label: "Where the project stands" });
    }

    SECTION_ORDER.forEach(function (pair) {
      var d = P.sections && P.sections[pair[0]];
      if (!d) { return; }
      var built = projectSection(pair[0], pair[1], d);
      if (built) { secs.push(built); }
    });

    if (secs.length > 1) {
      var toc = el("nav", "toc");
      toc.setAttribute("aria-label", "On this page");
      var tw = el("div", "wrap");
      tw.appendChild(el("p", "label", "On this page"));
      var ul = el("ul");
      secs.forEach(function (s) {
        var li = el("li");
        var a = el("a", null, s.label);
        a.href = "#" + s.id;
        li.appendChild(a);
        ul.appendChild(li);
      });
      tw.appendChild(ul);
      toc.appendChild(tw);
      main.appendChild(toc);
    }

    var body = el("div", "wrap");
    secs.forEach(function (s) { body.appendChild(s.node); });
    main.appendChild(body);
  }

  /* ---------- page chrome ---------- */

  function renderHeader(navLinks, draftBar) {
    var header = document.getElementById("site-header");
    if (!header) { return; }
    if (draftBar) { header.appendChild(draftBar); }
    var row = el("div", "wrap header-row");
    var brand = el("a", "brand", C.personal.name);
    brand.href = root + "index.html";
    row.appendChild(brand);

    var nav = el("nav");
    nav.setAttribute("aria-label", "Primary");
    var ul = el("ul", "nav-list");
    navLinks.forEach(function (n) {
      var li = el("li");
      var a = el("a", null, n.label);
      a.href = (page === "home" ? "" : root + "index.html") + "#" + n.id;
      li.appendChild(a);
      ul.appendChild(li);
    });
    nav.appendChild(ul);
    row.appendChild(nav);
    header.appendChild(row);
  }

  function renderFooter() {
    var footer = document.getElementById("site-footer");
    if (!footer) { return; }
    var wrap = el("div", "wrap");
    wrap.appendChild(el("p", null, C.personal.name));
    footer.appendChild(wrap);
  }

  /* ---------- run ---------- */

  var main = document.getElementById("main");
  var navLinks = [];

  if (page === "home") {
    document.title = C.personal.name + " — " + (C.personal.headline || "Portfolio");
    main.appendChild(renderHero());
    [
      ["work", "Featured work", renderFeatured],
      ["timeline", "Timeline", renderTimeline],
      ["leadership", "Leadership", renderLeadership],
      ["about", "About", renderAbout],
      ["contact", "Résumé / Contact", renderContact]
    ].forEach(function (s) {
      var node = s[2]();
      if (node) {
        main.appendChild(node);
        navLinks.push({ id: s[0], label: s[1] });
      }
    });
  } else if (page === "project") {
    renderProject(main);
    navLinks = [
      { id: "work", label: "Work" },
      { id: "timeline", label: "Timeline" },
      { id: "leadership", label: "Leadership" }
    ];
  }

  renderFooter();

  var bar = null;
  if (!PUBLISH) {
    bar = el("div", "draft-bar");
    bar.setAttribute("role", "note");
    bar.textContent = "DRAFT VIEW: highlighted text marks missing, unverified, or unapproved information (" + markerCount +
      " items). Set publishMode to true in site-content.js when ready to publish.";
  }
  renderHeader(navLinks, bar);
}());
