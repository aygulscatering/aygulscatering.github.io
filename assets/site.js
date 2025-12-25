(() => {
  const setYear = () => {
    const year = String(new Date().getFullYear());
    document.querySelectorAll("[data-year]").forEach((el) => {
      el.textContent = year;
    });
  };

  const setToday = () => {
    const today = new Date();
    const text = today.toISOString().slice(0, 10);
    document.querySelectorAll("[data-today]").forEach((el) => {
      el.textContent = text;
    });
  };

  const setupNav = () => {
    const toggle = document.querySelector("[data-nav-toggle]");
    const nav = document.querySelector("[data-site-nav]");
    if (!toggle || !nav) return;

    const close = () => {
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    const open = () => {
      document.body.classList.add("nav-open");
      toggle.setAttribute("aria-expanded", "true");
    };

    toggle.addEventListener("click", () => {
      const isOpen = document.body.classList.contains("nav-open");
      if (isOpen) close();
      else open();
    });

    nav.addEventListener("click", (e) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;
      if (target.tagName.toLowerCase() !== "a") return;
      close();
    });
  };

  const setupActiveNav = () => {
    const links = Array.from(document.querySelectorAll("[data-site-nav] a"));
    if (links.length === 0) return;

    const normalize = (value) => {
      const clean = value.split("?")[0].split("#")[0];
      const parts = clean.split("/").filter(Boolean);
      const last = parts[parts.length - 1] ?? "index.html";
      return last === "" ? "index.html" : last;
    };

    const current = normalize(window.location.pathname);
    links.forEach((link) => {
      const href = link.getAttribute("href") || "";
      const target = normalize(href);
      if (target === current || (current === "" && target === "index.html")) {
        link.classList.add("is-active");
      }
    });
  };

  const setupMailtoForm = () => {
    const form = document.querySelector("[data-mailto-form]");
    if (!(form instanceof HTMLFormElement)) return;

    const to = "hello@aygucatering.example";
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(form);

      const name = String(fd.get("name") || "").trim();
      const email = String(fd.get("email") || "").trim();
      const date = String(fd.get("date") || "").trim();
      const headcount = String(fd.get("headcount") || "").trim();
      const style = String(fd.get("style") || "").trim();
      const message = String(fd.get("message") || "").trim();

      const subjectParts = ["Catering request"];
      if (date) subjectParts.push(date);
      const subject = subjectParts.join(" - ");

      const lines = [
        `Name: ${name}`,
        `Email: ${email}`,
        date ? `Event date: ${date}` : null,
        headcount ? `Headcount: ${headcount}` : null,
        style ? `Service style: ${style}` : null,
        "",
        "Details:",
        message || "(none provided)",
      ].filter(Boolean);

      const body = lines.join("\n");
      const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
    });
  };

  setYear();
  setToday();
  setupNav();
  setupActiveNav();
  setupMailtoForm();
})();

