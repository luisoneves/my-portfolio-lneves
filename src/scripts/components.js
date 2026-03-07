/**
 * Components — Vanilla JS render functions
 * Each function reads from locale-resolved data and targets a DOM container.
 * Data shape: { nav, hero, projects, technologies, notes, reading, about, contact, sections, shared }
 */

export const Components = {
  /* ── Navigation ── */
  renderNav(data) {
    const nav = document.querySelector(".site-nav");
    if (!nav) return;
    nav.setAttribute("role", "navigation");
    nav.innerHTML = data.nav
      .map(
        (item) => `<a href="${item.href}">${item.label}</a>`
      )
      .join("");
  },

  /* ── Hero ── */
  renderHero(data) {
    const container = document.getElementById("hero-content");
    if (!container) return;

    const { hero, shared } = data;
    container.innerHTML = `
      <div class="hero__text">
        <p class="eyebrow">${hero.title}</p>
        <h1>${hero.name}</h1>
        <p class="lead">${hero.tagline}</p>
        <p class="hero__desc" style="margin-top: 1rem; max-width: 60ch; color: var(--text-secondary);">${hero.description}</p>

        <div class="hero__exploring">
          <span class="exploring__label">${hero.exploringLabel}</span>
          <ul class="exploring__list" role="list">
            ${hero.exploring.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </div>

        <div class="hero__actions">
          ${hero.ctas
            .map(
              (cta) =>
                `<a class="btn ${cta.style}" href="${cta.href}">${cta.label}</a>`
            )
            .join("")}
        </div>
      </div>

      <div class="hero__card card-flip" tabindex="0" aria-label="${hero.name}">
        <div class="card-flip__inner">
          <div class="card-flip__front">
            ${hero.stats
              .map(
                (s) => `
              <div class="stat">
                <span class="stat__value">${s.value}</span>
                <span class="stat__label">${s.label}</span>
              </div>`
              )
              .join("")}
            <ul class="tags" role="list" aria-label="Core skills">
              ${hero.cardTags.map((t) => `<li>${t}</li>`).join("")}
            </ul>
          </div>
          <div class="card-flip__back">
            <div class="profile-avatar">
              <img src="${shared.photo}" alt="${hero.name}" width="460" height="260" loading="lazy">
            </div>
            <p class="card-flip__name">${hero.name}</p>
            <p class="card-flip__role">${hero.cardRole}</p>
          </div>
        </div>
      </div>
    `;
  },

  /* ── Projects ── */
  renderProjects(data) {
    const container = document.getElementById("projects-content");
    if (!container) return;

    container.innerHTML = data.projects
      .map(
        (project) => `
      <article class="project-card card" style="--project-img: url('${project.image}')" tabindex="0" role="button" aria-expanded="false" aria-label="View ${project.title}">
        <div class="project-card__image-container" aria-hidden="true"></div>
        <div class="project-card__header">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <h3>${project.title}</h3>
            ${project.status === 'development' ? `<span class="badge badge--dev" aria-label="Status">${data.ui.badgeDev}</span>` : ""}
          </div>
          ${project.subtitle ? `<span class="project-card__subtitle">${project.subtitle}</span>` : ""}
        </div>
        <div class="project-card__detail">
          <span class="project-card__label">${project.problemLabel}</span>
          <p>${project.problem}</p>
        </div>
        <div class="project-card__detail">
          <span class="project-card__label">${project.solutionLabel}</span>
          <p>${project.solution}</p>
        </div>
        <div class="stack-tags" role="list" aria-label="Tech stack">
          ${project.stack.map((tech) => `<span class="stack-tag" role="listitem">${tech}</span>`).join("")}
        </div>
        ${
          project.link
            ? `<a href="${project.link}" class="text-link" aria-label="${project.linkText} — ${project.title}">${project.linkText}</a>`
            : ""
        }
      </article>`
      )
      .join("");

    // Interactive Expanding Grid Logic (Click-based for mobile support)
    const cards = container.querySelectorAll(".project-card");
    cards.forEach((card) => {
      card.addEventListener("click", (e) => {
        // Prevent interfering with actual links inside the card
        if (e.target.closest("a") || e.target.tagName.toLowerCase() === "a") return;

        const isAlreadyHero = card.classList.contains("is-hero");

        // Reset all cards first
        cards.forEach((c) => {
          c.classList.remove("is-hero");
          c.setAttribute("aria-expanded", "false");
        });
        container.classList.remove("has-hero");

        // If clicking the same card, it just collapses. Otherwise, expand the new one.
        if (!isAlreadyHero) {
          container.classList.add("has-hero");
          card.classList.add("is-hero");
          card.setAttribute("aria-expanded", "true");
        }
      });

      // Accessibility: Allow keyboard to trigger click
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          card.click();
        }
      });
    });
  },

  /* ── Technologies ── */
  renderTechnologies(data) {
    const container = document.getElementById("technologies-content");
    if (!container) return;

    container.innerHTML = data.technologies
      .map(
        (tech) => `
      <div class="skill">
        <div class="skill-header">
          <span>${tech.name}</span>
          <span class="percent">${tech.percent}%</span>
        </div>
        <div class="skill-bar" aria-label="${tech.name} proficiency" aria-valuenow="${tech.percent}" aria-valuemin="0" aria-valuemax="100" role="progressbar">
          <div class="skill-progress" data-progress="${tech.percent}"></div>
        </div>
      </div>`
      )
      .join("");

    // Animate skill bars on scroll
    const bars = container.querySelectorAll(".skill-progress");
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const value = entry.target.dataset.progress;
          entry.target.style.width = value + "%";

          // Add visible class to the parent .skill for the fade-in transform
          entry.target.closest('.skill').classList.add('visible');

          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    bars.forEach((bar) => observer.observe(bar));
  },

  /* ── Engineering Notes ── */
  renderNotes(data) {
    const container = document.getElementById("notes-content");
    if (!container) return;

    container.innerHTML = data.notes
      .map(
        (note) => `
      <article class="note-card card">
        <div class="note-card__header">
          <time class="note-card__date" datetime="${note.date}">${note.date}</time>
          <span class="note-card__readtime">${note.readTime}</span>
        </div>
        <h3 class="note-card__title">${note.title}</h3>
        <p class="note-card__excerpt">${note.excerpt}</p>
        <div class="note-tags" role="list" aria-label="Note tags">
          ${note.tags.map((tag) => `<span class="note-tag" role="listitem">#${tag}</span>`).join("")}
        </div>
      </article>`
      )
      .join("");
  },

  /* ── Reading (Books + Courses) ── */
  renderReading(data) {
    const container = document.getElementById("reading-content");
    if (!container) return;

    const { books, courses, booksTitle, coursesTitle, keyIdeaLabel, notesLabel, authorLabel, statusLabel } = data.reading;

    const booksHtml = `
      <div class="reading__group">
        <h3 class="reading__subtitle">${booksTitle}</h3>
        <div class="reading__items" role="list">
          ${books
            .map(
              (book) => `
            <article class="book-card card" role="listitem">
              <div class="book-card__header">
                 <h4 class="book-card__title">${book.title}</h4>
                 <span class="book-card__status status-${book.status}">${statusLabel} ${book.status}</span>
              </div>
              <p class="book-card__author">${authorLabel} ${book.author}</p>
              <p class="book-card__idea"><strong>${keyIdeaLabel}</strong> ${book.keyIdea}</p>
              ${book.notesUrl ? `<a href="${book.notesUrl}" class="text-link">${notesLabel}</a>` : ""}
            </article>`
            )
            .join("")}
        </div>
      </div>
    `;

    const coursesHtml = `
      <div class="reading__group">
        <h3 class="reading__subtitle">${coursesTitle}</h3>
        <div class="reading__items" role="list">
          ${courses
            .map(
              (course) => `
            <article class="course-card card" role="listitem">
              <h4 class="course-card__title">${course.title}</h4>
              ${course.notesUrl ? `<a href="${course.notesUrl}" class="text-link">${notesLabel}</a>` : ""}
            </article>`
            )
            .join("")}
        </div>
      </div>
    `;

    container.innerHTML = booksHtml + coursesHtml;
  },

  /* ── About ── */
  renderAbout(data) {
    const container = document.getElementById("about-content");
    if (!container) return;

    const { about } = data;
    container.innerHTML = `
      <div class="about__text">
        <p>${about.bio}</p>
        <ul class="list" role="list" aria-label="Career highlights">
          ${about.highlights.map((h) => `<li>${h}</li>`).join("")}
        </ul>
      </div>
      <div class="about__skills">
        <h3>${about.skillsTitle}</h3>
        <ul class="tags" role="list" aria-label="Technical skills">
          ${about.skills.map((s) => `<li>${s}</li>`).join("")}
        </ul>
      </div>
    `;
  },

  /* ── Contact ── */
  renderContact(data) {
    const container = document.getElementById("contact-content");
    if (!container) return;

    const { contact, shared, sections } = data;
    container.innerHTML = `
      <div>
        <p class="eyebrow">${sections.contact.eyebrow}</p>
        <p class="contact__heading">${contact.heading}</p>
        <p>${contact.description}</p>
      </div>
      <div class="cta__actions">
        <a class="btn primary" href="mailto:${shared.email}">
          <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false" width="18" height="18">
            <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm0 2v.2l8 5.2 8-5.2V7H4zm16 10V9.5l-7.4 4.8a1 1 0 0 1-1.2 0L4 9.5V17h16z" />
          </svg>
          ${contact.emailLabel}
        </a>
        <a class="btn ghost" href="${shared.linkedin}" target="_blank" rel="noopener noreferrer">
          <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false" width="18" height="18">
            <path d="M6.94 8.5H3.5V20h3.44V8.5zM5.22 7.12a1.99 1.99 0 1 0 0-3.98 1.99 1.99 0 0 0 0 3.98zM20.5 13.16c0-3.38-1.8-4.95-4.2-4.95-1.94 0-2.8 1.06-3.28 1.8V8.5h-3.3c.04.99 0 11.5 0 11.5h3.3v-6.42c0-.34.02-.68.12-.92.26-.68.86-1.38 1.86-1.38 1.32 0 1.84 1 1.84 2.48V20h3.36v-6.84z" />
          </svg>
          LinkedIn
        </a>
        ${shared.resumeUrl ? `
        <a class="btn ghost" href="${shared.resumeUrl}" target="_blank" rel="noopener noreferrer">
          <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false" width="18" height="18">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
          </svg>
          ${contact.resumeLabel}
        </a>` : ""}
      </div>
    `;
  },

  /* ── Footer ── */
  renderFooter(data) {
    const container = document.getElementById("footer-content");
    if (!container) return;

    const year = new Date().getFullYear();
    container.innerHTML = `
      <p>© ${year} Luis Neves.</p>
      <div class="footer__links">
        ${data.shared.footerLinks
          .map(
            (link) =>
              `<a href="${link.href}" target="_blank" rel="noopener noreferrer">${link.label}</a>`
          )
          .join("")}
      </div>
    `;
  },

  /* ── Render All ── */
  init(data) {
    this.renderNav(data);
    this.renderHero(data);
    this.renderProjects(data);
    this.renderTechnologies(data);
    this.renderNotes(data);
    this.renderReading(data);
    this.renderAbout(data);
    this.renderContact(data);
    this.renderFooter(data);
  },
};
