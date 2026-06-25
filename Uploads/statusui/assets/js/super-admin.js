document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    window.lucide.createIcons({
      attrs: {
        "stroke-width": 1.75,
        "aria-hidden": "true",
      },
    });
  }

  const touch = (control) => {
    control.classList.add("is-touched");
    window.setTimeout(() => control.classList.remove("is-touched"), 300);
  };

  document.querySelectorAll("[data-confirm]").forEach((control) => {
    control.addEventListener("click", (event) => {
      event.preventDefault();
      if (window.confirm(control.dataset.confirm)) {
        touch(control);
      }
    });
  });

  document.querySelectorAll("[data-noop]").forEach((control) => {
    control.addEventListener("click", (event) => {
      event.preventDefault();
      touch(control);
    });
  });

  document.querySelectorAll('[data-ui-toggle="collapse"]').forEach((trigger) => {
    const target = document.querySelector(trigger.dataset.uiTarget);
    if (!target) return;

    trigger.addEventListener("click", () => {
      const isDesktop = window.matchMedia("(min-width: 992px)").matches;
      if (isDesktop) {
        const shell = trigger.closest(".shell");
        const isCollapsed = shell?.classList.toggle("sidebar-collapsed") ?? false;
        trigger.setAttribute("aria-expanded", String(!isCollapsed));
        return;
      }

      const isOpen = target.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", String(isOpen));
    });
  });

  document.querySelectorAll('[data-ui-toggle="dropdown"]').forEach((trigger) => {
    const menu = trigger.closest(".dropdown")?.querySelector(".account-menu-list");
    if (!menu) return;

    trigger.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = menu.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", String(isOpen));
    });
  });

  const backdrop = document.createElement("div");
  backdrop.className = "sheet-backdrop";
  document.body.appendChild(backdrop);

  const closeSheets = () => {
    document.querySelectorAll(".sheet.is-open").forEach((sheet) => {
      sheet.classList.remove("is-open");
    });
    backdrop.classList.remove("is-open");
  };

  document.querySelectorAll('[data-ui-toggle="sheet"]').forEach((trigger) => {
    const sheet = document.querySelector(trigger.dataset.uiTarget);
    if (!sheet) return;

    trigger.addEventListener("click", () => {
      sheet.classList.add("is-open");
      backdrop.classList.add("is-open");
    });
  });

  document.querySelectorAll('[data-ui-dismiss="sheet"]').forEach((trigger) => {
    trigger.addEventListener("click", closeSheets);
  });

  backdrop.addEventListener("click", closeSheets);

  document.addEventListener("click", (event) => {
    document.querySelectorAll(".account-menu-list.is-open").forEach((menu) => {
      if (!menu.closest(".dropdown")?.contains(event.target)) {
        menu.classList.remove("is-open");
        menu.closest(".dropdown")?.querySelector('[data-ui-toggle="dropdown"]')?.setAttribute("aria-expanded", "false");
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSheets();
      document.querySelectorAll(".account-menu-list.is-open").forEach((menu) => menu.classList.remove("is-open"));
    }
  });

  const projectButtons = Array.from(document.querySelectorAll(".project-list-item[data-project-id]"));
  const projectSummary = document.querySelector("[data-project-summary-text]");
  const projectLatestBadge = document.querySelector("[data-project-latest-badge]");
  const projectTables = Array.from(document.querySelectorAll("[data-project-table]"));

  const activateProject = (button) => {
    const projectId = button.dataset.projectId;

    projectButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    projectTables.forEach((table) => {
      table.hidden = table.dataset.projectTable !== projectId;
    });

    if (projectSummary) {
      projectSummary.textContent = button.dataset.projectSummary || "";
    }

    if (projectLatestBadge) {
      projectLatestBadge.textContent = button.dataset.projectLatest || "";
      projectLatestBadge.className = "badge success";
      if (button.dataset.projectId === "p200") {
        projectLatestBadge.className = "badge warning";
      }
    }
  };

  projectButtons.forEach((button) => {
    button.addEventListener("click", () => activateProject(button));
  });

  if (projectButtons[0]) {
    activateProject(projectButtons[0]);
  }
});
