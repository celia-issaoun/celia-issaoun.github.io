
/* =====================================
   NAVIGATION PAR ONGLETS
   PORTFOLIO CELIA ISSAOUN
===================================== */

document.addEventListener("DOMContentLoaded", () => {

  const panels = document.querySelectorAll(".tab-panel");

  const links = document.querySelectorAll(
    "[data-tab-link]"
  );

  const defaultTab = "accueil";

  function showTab(tabId) {

    const target = document.getElementById(tabId);

    if (!target || !target.classList.contains("tab-panel")) {
      return false;
    }

    // Masquer tous les onglets
    panels.forEach(panel => {
      const isActive = panel.id === tabId;

      panel.classList.toggle("active", isActive);
      panel.hidden = !isActive;
    });

    // Mettre à jour la navigation
    links.forEach(link => {
      const isActive = link.dataset.tabLink === tabId;

      link.classList.toggle("active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    // Revenir en haut de page
    window.scrollTo({
      top: 0,
      behavior: "instant"
    });

    return true;
  }

  // Gérer les clics sur les onglets
  links.forEach(link => {
    link.addEventListener("click", event => {

      const tabId = link.dataset.tabLink;

      if (!document.getElementById(tabId)) {
        return;
      }

      event.preventDefault();

      if (showTab(tabId)) {
        history.pushState(null, "", "#" + tabId);
      }
    });
  });

  // Gérer les boutons précédent et suivant
  window.addEventListener("popstate", () => {
    const tabId = window.location.hash.substring(1);
    showTab(tabId) || showTab(defaultTab);
  });

  // Ouvrir l'onglet indiqué dans l'URL
  const initialTab = window.location.hash.substring(1);

  if (!showTab(initialTab)) {
    showTab(defaultTab);
  }

});
