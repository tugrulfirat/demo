// Shared left navigation for all static Figma prototype pages.
const style = document.createElement("style");
style.textContent = `
  .nav-details,
  .admin-details { display:block; width:100%; }
  .nav-summary,
  .admin-summary {
    display:flex !important; justify-content:space-between; align-items:center;
    cursor:pointer; margin:14px 9px 7px; color:rgba(255,255,255,.58);
    font-size:12px; font-weight:700; letter-spacing:.12em; text-transform:uppercase;
    list-style:none; user-select:none; outline:none; transition:color .15s ease;
  }
  .nav-summary::-webkit-details-marker,
  .admin-summary::-webkit-details-marker { display:none; }
  .nav-summary:hover,
  .admin-summary:hover { color:rgba(255,255,255,.72); }
  .nav-summary .chevron,
  .admin-summary .chevron { width:12px; height:12px; transition:transform .2s ease; opacity:.65; }
  details[open] .nav-summary .chevron,
  details[open] .admin-summary .chevron { transform:rotate(180deg); }
  .nav-details-items,
  .admin-details-items { display:flex; flex-direction:column; gap:2px; margin-top:4px; padding-left:0; }
  .brand { gap:14px; }
  .brand-sub { margin-top:10px; color:#e9f54f; }
  .nav { padding:10px 12px; }
  .nav-label { margin:12px 9px 6px; color:rgba(255,255,255,.58); font-size:12px; letter-spacing:.12em; }
  .nav-item { min-height:38px; margin-bottom:3px; padding:8px 10px; border-radius:10px; }
  .ui-arrow-icon {
    display:inline-flex; width:18px; height:18px; flex:0 0 18px;
    align-items:center; justify-content:center; color:currentColor;
    vertical-align:middle;
  }
  .ui-arrow-icon svg { display:block; width:18px; height:18px; stroke-width:2.4; }
  .ui-arrow-left { margin-right:6px; }
  .ui-arrow-right { margin-left:6px; }
  .arrow,
  .board-nav-button,
  .pager button.ui-arrow-only {
    display:inline-flex !important; align-items:center !important; justify-content:center !important;
    min-width:44px !important; min-height:44px !important;
    font-size:0 !important; line-height:1 !important;
  }
  .arrow .ui-arrow-icon,
  .board-nav-button .ui-arrow-icon,
  .pager button.ui-arrow-only .ui-arrow-icon,
  .send-btn .ui-arrow-icon {
    width:20px; height:20px; margin:0;
  }
  .arrow .ui-arrow-icon svg,
  .board-nav-button .ui-arrow-icon svg,
  .pager button.ui-arrow-only .ui-arrow-icon svg,
  .send-btn .ui-arrow-icon svg {
    width:20px; height:20px; stroke-width:2.5;
  }
  .link,
  .focus-link,
  .role-card button {
    display:inline-flex; align-items:center; gap:6px;
  }
`;
document.head.appendChild(style);

const navGroups = [
  {
    label: "Overview",
    items: [
      { name: "Dashboard", href: "dashboard.html", icon: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>' },
      { name: "Sales", href: "sales.html", icon: '<path d="m3 17 6-6 4 4 8-8"/><path d="M15 7h6v6"/>' }
    ]
  },
  {
    label: "Staff",
    items: [
      { name: "Team", href: "team.html", icon: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>' },
      { name: "Rota", href: "rota.html", icon: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>' },
      { name: "Availability", href: "availability.html", icon: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>' }
    ]
  },
  {
    label: "Operations",
    items: [
      { name: "Procedures", href: "procedures.html", icon: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/>' },
      { name: "Checks & Tasks", href: "checks-tasks.html", icon: '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>' },
      { name: "Assets", href: "assets.html", icon: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>' },
      { name: "Issues & Incidents", href: "issues.html", icon: '<path d="m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3Z"/><path d="M12 9v4M12 17h.01"/>' },
      { name: "Evidence", href: "evidence.html", icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>' }
    ]
  }
];

const adminItems = [
  { name: "Emails", href: "emails.html", icon: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>' },
  { name: "Reviews", href: "reviews.html", icon: '<path d="M11.5 3.2a.6.6 0 0 1 1 0l2.3 4.6 5 .8a.6.6 0 0 1 .3 1l-3.6 3.5.9 5a.6.6 0 0 1-.9.6L12 16.4l-4.5 2.3a.6.6 0 0 1-.9-.6l.9-5-3.6-3.5a.6.6 0 0 1 .3-1l5-.8 2.3-4.6Z"/>' },
  { name: "Sandbox", href: "sandbox.html", icon: '<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.8 8.8 0 0 1-3.8-.9L3 20.5l1.6-4.8A8.3 8.3 0 0 1 3.5 12 8.5 8.5 0 1 1 21 11.5Z"/>' },
  { name: "Automations", href: "automations.html", icon: '<path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/>' },
  { name: "Settings", href: "settings.html", icon: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a2 2 0 0 0 .4 2.2l.1.1-2.6 2.6-.1-.1a2 2 0 0 0-2.2-.4 2 2 0 0 0-1.2 1.8V21h-3.6v-.2A2 2 0 0 0 9 19a2 2 0 0 0-2.2.4l-.1.1-2.6-2.6.1-.1A2 2 0 0 0 4.6 15a2 2 0 0 0-1.8-1.2H2v-3.6h.8A2 2 0 0 0 4.6 9a2 2 0 0 0-.4-2.2l-.1-.1 2.6-2.6.1.1A2 2 0 0 0 9 4.6a2 2 0 0 0 1.2-1.8V2h3.6v.8A2 2 0 0 0 15 4.6a2 2 0 0 0 2.2-.4l.1-.1 2.6 2.6-.1.1A2 2 0 0 0 19.4 9a2 2 0 0 0 1.8 1.2H22v3.6h-.8A2 2 0 0 0 19.4 15Z"/>' }
];

const currentPage = (window.location.pathname.split("/").pop() || "dashboard.html").toLowerCase();
const isActive = item => currentPage === item.href.toLowerCase();
const itemHtml = item => `<a class="nav-item${isActive(item) ? " active" : ""}" href="${item.href}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${item.icon}</svg>${item.name}</a>`;

document.querySelectorAll(".nav").forEach(nav => {
  const adminOpen = adminItems.some(isActive);
  const groupHtml = group => {
    const groupOpen = group.items.some(isActive) || group.label !== "Admin";
    return `<details class="nav-details"${groupOpen ? " open" : ""}><summary class="nav-summary"><span>${group.label}</span><svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg></summary><div class="nav-details-items">${group.items.map(itemHtml).join("")}</div></details>`;
  };
  nav.innerHTML = [
    ...navGroups.map(groupHtml),
    `<details class="admin-details"${adminOpen ? " open" : ""}><summary class="admin-summary"><span>Admin</span><svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg></summary><div class="admin-details-items">${adminItems.map(itemHtml).join("")}</div></details>`
  ].join("");
});

const today = new Date();
const dateText = today.toLocaleDateString("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric"
});
document.querySelectorAll(".date-pill").forEach(date => {
  date.textContent = dateText;
});

const dayName = today.toLocaleDateString("en-GB", { weekday: "long" });
document.querySelectorAll(".eyebrow").forEach(label => {
  if (/monday operations overview/i.test(label.textContent)) {
    label.textContent = `${dayName} operations overview`;
  }
});

const arrowIcon = direction => {
  const path = direction === "left"
    ? '<path d="M19 12H5"/><path d="m12 5-7 7 7 7"/>'
    : '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>';
  return `<span class="ui-arrow-icon ui-arrow-${direction}" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">${path}</svg></span>`;
};

const setDirectionalIcon = (element, direction, fallbackLabel) => {
  const label = element.getAttribute("aria-label") || fallbackLabel;
  element.setAttribute("aria-label", label);
  element.classList.add("ui-arrow-only");
  element.innerHTML = arrowIcon(direction);
};

document.querySelectorAll(".arrow, .board-nav-button").forEach(button => {
  const label = `${button.getAttribute("aria-label") || ""} ${button.textContent || ""}`.toLowerCase();
  setDirectionalIcon(button, /previous|prev|left|←|<-/.test(label) ? "left" : "right", "Navigate");
});

document.querySelectorAll(".pager button").forEach(button => {
  const text = button.textContent.trim();
  if (text === "‹" || text === "←") setDirectionalIcon(button, "left", "Previous page");
  if (text === "›" || text === "→") setDirectionalIcon(button, "right", "Next page");
});

document.querySelectorAll(".send-btn").forEach(button => {
  setDirectionalIcon(button, "right", button.getAttribute("aria-label") || "Send");
});

document.querySelectorAll("a, button").forEach(element => {
  if (element.querySelector("svg, .ui-arrow-icon") || element.classList.contains("nav-item")) return;
  const text = element.textContent.replace(/\s+/g, " ").trim();
  if (/^(←|<-)\s+/.test(text)) {
    element.textContent = text.replace(/^(←|<-)\s+/, "");
    element.insertAdjacentHTML("afterbegin", arrowIcon("left"));
  } else if (/\s+(→|->)$/.test(text)) {
    element.textContent = text.replace(/\s+(→|->)$/, "");
    element.insertAdjacentHTML("beforeend", arrowIcon("right"));
  }
});
