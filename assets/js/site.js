// Tabs: About / Research / Experience / Teaching, addressable as #about, #research, ...
(function () {
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".tab[data-tab]"));
  var panels = Array.prototype.slice.call(document.querySelectorAll(".panel"));
  var bar = document.querySelector(".ink-bar");
  if (!tabs.length) return;

  function current() {
    for (var i = 0; i < tabs.length; i++) if (tabs[i].getAttribute("aria-current") === "page") return tabs[i];
    return tabs[0];
  }

  function moveBar(t) {
    if (!bar || !t) return;
    bar.style.left = t.offsetLeft + 10 + "px";
    bar.style.width = t.offsetWidth - 20 + "px";
  }

  function show(name) {
    var t = tabs.filter(function (x) { return x.dataset.tab === name; })[0] || tabs[0];
    tabs.forEach(function (x) {
      if (x === t) x.setAttribute("aria-current", "page"); else x.removeAttribute("aria-current");
    });
    panels.forEach(function (p) { p.classList.toggle("active", p.id === t.dataset.tab); });
    moveBar(t);
    document.title = t.dataset.tab === "about" ? "Manuel Quintero Coronel" : t.textContent + " · Manuel Quintero Coronel";
  }

  function fromHash() { show((location.hash || "#about").slice(1)); }

  tabs.forEach(function (t) {
    t.addEventListener("click", function (e) {
      e.preventDefault();
      var name = t.dataset.tab;
      if (("#" + name) !== location.hash) history.pushState(null, "", name === "about" ? location.pathname : "#" + name);
      show(name);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  var brand = document.querySelector(".brand");
  if (brand) brand.addEventListener("click", function (e) {
    e.preventDefault();
    history.pushState(null, "", location.pathname);
    show("about");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("popstate", fromHash);
  window.addEventListener("hashchange", fromHash);
  window.addEventListener("resize", function () { moveBar(current()); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { moveBar(current()); });

  fromHash();
  if (location.hash) window.scrollTo(0, 0);
})();
