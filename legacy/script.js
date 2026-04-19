// ═══════════════════════════════════════
// DoubleHub — Script
// ═══════════════════════════════════════

// ── Theme Toggle ──
(function () {
  const toggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;

  let theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', theme);

  function updateIcon() {
    if (!toggle) return;
    toggle.innerHTML = theme === 'dark'
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    toggle.setAttribute('aria-label', theme === 'dark' ? 'ライトモードに切り替え' : 'ダークモードに切り替え');
  }

  updateIcon();

  if (toggle) {
    toggle.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', theme);
      updateIcon();
    });
  }
})();

// ── Header scroll state ──
(function () {
  const header = document.getElementById('header');
  if (!header) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        header.classList.toggle('header--scrolled', window.scrollY > 20);
        ticking = false;
      });
      ticking = true;
    }
  });
})();

// ── Mobile menu ──
(function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (!menuToggle || !nav) return;

  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.textContent = isOpen ? '閉じる' : 'メニュー';
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = 'メニュー';
    });
  });
})();

// ── Ecosystem tabs (desktop + mobile select) ──
(function () {
  const tabs = Array.from(document.querySelectorAll('.ecosystem__tab'));
  const panels = Array.from(document.querySelectorAll('.ecosystem__panel'));
  const select = document.querySelector('.ecosystem__select');
  if (panels.length === 0) return;

  function activate(target) {
    tabs.forEach(tab => {
      const isActive = tab.dataset.target === target;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
    });
    panels.forEach(panel => {
      panel.classList.toggle('is-active', panel.dataset.panel === target);
    });
    if (select) select.value = target;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      if (tab.dataset.target) activate(tab.dataset.target);
    });
  });

  if (select) {
    select.addEventListener('change', () => {
      activate(select.value);
    });
  }
})();

// ── Scroll Reveal (IntersectionObserver) ──
(function () {
  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  els.forEach((el) => observer.observe(el));
})();

// ── Product Dropdown ──
(function () {
  const trigger = document.querySelector('.nav__dropdown-trigger');
  const menu = document.querySelector('.nav__dropdown-menu');
  if (!trigger || !menu) return;

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = menu.classList.toggle('is-open');
    trigger.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', (e) => {
    if (!trigger.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      menu.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    }
  });
})();

// ── Newsletter form (MailerLite 埋め込み) ──
(function () {
  const MAILERLITE_ENDPOINT = 'https://assets.mailerlite.com/jsonp/2223697/forms/183005205234714071/takel';

  const form = document.getElementById('newsletter-form');
  const note = document.getElementById('form-note');
  const btn  = form ? form.querySelector('button[type="submit"]') : null;
  if (!(form instanceof HTMLFormElement) || !note || !btn) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = String(new FormData(form).get('fields[email]') || '').trim();
    if (!email) {
      note.textContent = 'メールアドレスを入力してください。';
      return;
    }

    btn.disabled = true;
    note.textContent = '送信中...';

    const body = new FormData();
    body.append('fields[email]', email);
    body.append('ml-submit', '1');
    body.append('anticsrf', 'true');

    try {
      await fetch(MAILERLITE_ENDPOINT, { method: 'POST', body });
      note.textContent = '登録ありがとうございます！確認メールをお送りしました。';
      form.reset();
    } catch {
      note.textContent = '通信エラーが発生しました。インターネット接続をご確認ください。';
    } finally {
      btn.disabled = false;
    }
  });
})();
