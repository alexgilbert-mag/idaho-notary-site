(function () {
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var body = document.body;

  if (toggle) {
    toggle.addEventListener("click", function () {
      body.classList.toggle("nav-open");
      var open = body.classList.contains("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  document.addEventListener("click", function (e) {
    if (!body.classList.contains("nav-open")) return;
    if (e.target.closest(".site-header")) return;
    body.classList.remove("nav-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  });

  function onScroll() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Footer year
  var yr = document.querySelectorAll(".js-year");
  for (var i = 0; i < yr.length; i++) yr[i].textContent = String(new Date().getFullYear());

  // Lazy-load decorative background images (elements with data-bg)
  var bgs = document.querySelectorAll(".lazy-bg[data-bg]");
  function loadBg(el) { el.style.backgroundImage = "url('" + el.getAttribute("data-bg") + "')"; el.removeAttribute("data-bg"); }
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { loadBg(en.target); io.unobserve(en.target); } });
    }, { rootMargin: "400px 0px" });
    for (var j = 0; j < bgs.length; j++) io.observe(bgs[j]);
  } else {
    for (var k = 0; k < bgs.length; k++) loadBg(bgs[k]);
  }

  // Contact form posts to FormSubmit (https://formsubmit.co), which emails
  // admin@mag-idaho.com and redirects back here with ?sent=1.
  var form = document.getElementById("contact-form");
  if (form && /[?&]sent=1\b/.test(window.location.search)) {
    var ok = form.querySelector(".form-success");
    if (ok) {
      ok.textContent = "Thanks! Your message was sent. We'll get back to you as soon as possible.";
      ok.classList.add("is-visible");
    }
  }
})();
