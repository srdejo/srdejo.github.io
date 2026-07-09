(function () {
  'use strict';

  var root = document.documentElement;
  var themeToggle = document.querySelector('[data-theme-toggle]');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (e) {}
  }

  function initTheme() {
    var stored = null;
    try { stored = localStorage.getItem('theme'); } catch (e) {}
    if (stored === 'dark' || stored === 'light') {
      applyTheme(stored);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      applyTheme('dark');
    } else {
      applyTheme('light');
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  initTheme();

  // Smooth scroll for in-page nav links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var id = this.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      var y = target.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  // Scroll-spy on nav links
  var navLinks = document.querySelectorAll('.nav-link[data-section]');
  var sections = document.querySelectorAll('[data-section-id]');

  if ('IntersectionObserver' in window && sections.length && navLinks.length) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.dataset.sectionId;
          navLinks.forEach(function (link) {
            link.classList.toggle('active', link.dataset.section === id);
          });
        }
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

    sections.forEach(function (section) { sectionObserver.observe(section); });
  }

  // Reveal-on-scroll animation
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Contact form
  var form = document.querySelector('[data-contact-form]');
  var successPanel = document.querySelector('[data-contact-success]');
  var successNameEl = document.querySelector('[data-success-name]');
  var resetBtn = document.querySelector('[data-reset]');
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setFeedback(el, text, color) {
    el.textContent = text;
    el.style.color = color;
  }

  if (form && successPanel) {
    var submitBtn = form.querySelector('[data-submit]');
    var feedback = form.querySelector('[data-feedback]');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (submitBtn.disabled) return;

      var name = form.elements['name'].value.trim();
      var email = form.elements['email'].value.trim();
      var message = form.elements['message'].value.trim();

      if (!name || !email || !message) {
        setFeedback(feedback, 'Todos los campos son obligatorios.', '#E0776B');
        return;
      }
      if (!emailRe.test(email)) {
        setFeedback(feedback, 'Ingresa un correo válido.', '#E0776B');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando…';
      form.classList.add('is-loading');
      setFeedback(feedback, '', '#8FA8B7');

      fetch('https://micasachurch.co/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, email: email, message: message })
      })
        .then(function (res) {
          if (!res.ok) throw new Error('bad status');
          form.classList.remove('is-loading');
          successNameEl.textContent = name;
          form.hidden = true;
          successPanel.hidden = false;
        })
        .catch(function () {
          form.classList.remove('is-loading');
          submitBtn.disabled = false;
          submitBtn.textContent = 'Enviar correo';
          setFeedback(feedback, 'No se pudo enviar. Intenta de nuevo o escribe por WhatsApp.', '#E0776B');
        });
    });
  }

  if (resetBtn && form && successPanel) {
    resetBtn.addEventListener('click', function () {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar correo';
      setFeedback(form.querySelector('[data-feedback]'), '', '#8FA8B7');
      successPanel.hidden = true;
      form.hidden = false;
    });
  }
})();
