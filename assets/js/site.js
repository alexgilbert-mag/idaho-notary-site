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

  // Leadpages form replacement: there is no public email or phone on the
  // original site, and idaho-notary.com has no MX records. The contact form
  // and "Let's talk" CTAs therefore open the existing Calendly scheduler
  // (https://calendly.com/mag-idaho) with name and email prefilled when known.
  // To email submissions instead, set CONTACT_EMAIL below.
  var CONTACT_EMAIL = "";
  var CALENDLY = "https://calendly.com/mag-idaho";

  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var err = form.querySelector(".form-error");
      var ok = form.querySelector(".form-success");
      if (err) err.classList.remove("is-visible");
      if (ok) ok.classList.remove("is-visible");

      var name = (form.elements.full_name || form.elements.first_name || {}).value || "";
      var email = (form.elements.email || {}).value || "";
      var comment = (form.elements.comment || {}).value || "";
      var phone = (form.elements.phone_number || {}).value || "";
      name = name.trim();
      email = email.trim();

      if (!email) {
        if (err) {
          err.textContent = "Please enter your Email";
          err.classList.add("is-visible");
        }
        return;
      }

      if (CONTACT_EMAIL) {
        var bodyLines = [
          "Name: " + name,
          "Email: " + email,
          "Phone: " + phone,
          "",
          comment
        ];
        var mailto =
          "mailto:" + encodeURIComponent(CONTACT_EMAIL) +
          "?subject=" + encodeURIComponent("Idaho Notary inquiry from " + (name || email)) +
          "&body=" + encodeURIComponent(bodyLines.join("\n"));
        window.location.href = mailto;
      } else {
        var url = CALENDLY + "?name=" + encodeURIComponent(name) + "&email=" + encodeURIComponent(email);
        window.open(url, "_blank", "noopener");
      }

      if (ok) {
        ok.textContent = CONTACT_EMAIL
          ? "Thanks! Your email app should open with the message ready to send."
          : "Thanks! A scheduling window is opening so we can get you on the calendar.";
        ok.classList.add("is-visible");
      }
      form.reset();
    });
  }
})();
