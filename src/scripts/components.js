/**
 * Components — Vanilla JS render functions
 * Each function reads from siteData and targets a DOM container.
 */

const Components = {
  /* ── Navigation ── */
  renderNav(data) {
    const nav = document.querySelector(".site-nav");
    if (!nav) return;
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

    const { hero } = data;
    container.innerHTML = `
      <div class="hero__text">
        <p class="eyebrow">${hero.title}</p>
        <h1>${hero.name}</h1>
        <p class="lead">${hero.tagline}</p>

        <div class="hero__exploring">
          <span class="exploring__label">Currently exploring:</span>
          <ul class="exploring__list">
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

      <div class="hero__card card-flip">
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
            <ul class="tags" aria-label="Core skills">
              <li>Design System</li>
              <li>SaaS</li>
              <li>Architecture</li>
            </ul>
          </div>
          <div class="card-flip__back">
            <img src="${hero.photo}" alt="${hero.name}">
            <p class="card-flip__name">${hero.name}</p>
            <p class="card-flip__role">Software Engineer</p>
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
      <article class="project-card card">
        <h3>${project.title}</h3>
        <div class="project-card__detail">
          <span class="project-card__label">Problem:</span>
          <p>${project.problem}</p>
        </div>
        <div class="project-card__detail">
          <span class="project-card__label">Solution:</span>
          <p>${project.solution}</p>
        </div>
        <div class="stack-tags">
          ${project.stack.map((tech) => `<span class="stack-tag">${tech}</span>`).join("")}
        </div>
        ${
          project.link
            ? `<a href="${project.link}" class="text-link" aria-label="Details about ${project.title}">Request details</a>`
            : ""
        }
      </article>`
      )
      .join("");
  },

  /* ── Technologies ── */
  renderTechnologies(data) {
    const container = document.getElementById("technologies-content");
    if (!container) return;

    container.innerHTML = data.technologies
      .map(
        (cat) => `
      <article class="tech-card">
        <div class="tech-card__header">
          <span class="tech-card__icon">${cat.icon}</span>
          <h3 class="tech-card__title">${cat.category}</h3>
        </div>
        <ul class="tech-card__list">
          ${cat.items.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </article>`
      )
      .join("");
  },

  /* ── Engineering Notes ── */
  renderNotes(data) {
    const container = document.getElementById("notes-content");
    if (!container) return;

    container.innerHTML = data.notes
      .map(
        (note) => `
      <article class="note-card">
        <div class="note-card__header">
          <time class="note-card__date">${note.date}</time>
        </div>
        <h3 class="note-card__title">${note.title}</h3>
        <p class="note-card__excerpt">${note.excerpt}</p>
      </article>`
      )
      .join("");
  },

  /* ── Reading (Books + Courses) ── */
  renderReading(data) {
    const container = document.getElementById("reading-content");
    if (!container) return;

    const { books, courses } = data.reading;

    const booksHtml = `
      <div class="reading__group">
        <h3 class="reading__subtitle">📚 Books</h3>
        <div class="reading__items">
          ${books
            .map(
              (book) => `
            <article class="book-card">
              <h4 class="book-card__title">${book.title}</h4>
              <p class="book-card__idea">Key idea: ${book.keyIdea}</p>
              ${book.notesUrl ? `<a href="${book.notesUrl}" class="text-link">My notes</a>` : ""}
            </article>`
            )
            .join("")}
        </div>
      </div>
    `;

    const coursesHtml = `
      <div class="reading__group">
        <h3 class="reading__subtitle">🎓 Courses</h3>
        <div class="reading__items">
          ${courses
            .map(
              (course) => `
            <article class="course-card">
              <h4 class="course-card__title">${course.title}</h4>
              ${course.notesUrl ? `<a href="${course.notesUrl}" class="text-link">Notes</a>` : ""}
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
        <ul class="list" aria-label="Career highlights">
          ${about.highlights.map((h) => `<li>${h}</li>`).join("")}
        </ul>
      </div>
      <div class="about__skills">
        <h3>Skills & Tools</h3>
        <ul class="tags" aria-label="Technical skills">
          ${about.skills.map((s) => `<li>${s}</li>`).join("")}
        </ul>
      </div>
    `;
  },

  /* ── Contact ── */
  renderContact(data) {
    const container = document.getElementById("contact-content");
    if (!container) return;

    const { contact } = data;
    container.innerHTML = `
      <div>
        <p class="eyebrow">Contact</p>
        <p class="contact__heading">${contact.heading}</p>
        <p>${contact.description}</p>
      </div>
      <div class="cta__actions">
        <a class="btn primary" href="mailto:${contact.email}">
          <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
            <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm0 2v.2l8 5.2 8-5.2V7H4zm16 10V9.5l-7.4 4.8a1 1 0 0 1-1.2 0L4 9.5V17h16z" />
          </svg>
          Send email
        </a>
        <a class="btn ghost" href="${contact.linkedin}" target="_blank" rel="noopener noreferrer">
          <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
            <path d="M6.94 8.5H3.5V20h3.44V8.5zM5.22 7.12a1.99 1.99 0 1 0 0-3.98 1.99 1.99 0 0 0 0 3.98zM20.5 13.16c0-3.38-1.8-4.95-4.2-4.95-1.94 0-2.8 1.06-3.28 1.8V8.5h-3.3c.04.99 0 11.5 0 11.5h3.3v-6.42c0-.34.02-.68.12-.92.26-.68.86-1.38 1.86-1.38 1.32 0 1.84 1 1.84 2.48V20h3.36v-6.84z" />
          </svg>
          LinkedIn
        </a>
        ${contact.resumeUrl ? `
        <a class="btn ghost" href="${contact.resumeUrl}" target="_blank" rel="noopener noreferrer">
          <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
          </svg>
          Resume
        </a>` : ""}
      </div>
    `;
  },

  /* ── Footer ── */
  renderFooter(data) {
    const container = document.getElementById("footer-content");
    if (!container) return;

    const { footer } = data;
    container.innerHTML = `
      <p>${footer.copyright}</p>
      <div class="footer__links">
        ${footer.links
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
