/* Affichage du site (v2). Le CONTENU se modifie dans data.js et games.js. */
(() => {
  const S = window.SITE || {};
  const B = S.brand || {};
  const $ = (s) => document.querySelector(s);
  const set = (sel, txt) => { const el = $(sel); if (el) el.textContent = txt; };
  const put = (sel, h) => { const el = $(sel); if (el) el.innerHTML = h; };

  const fullAddress = `${B.address}, ${B.city}`;
  const socialsHTML = (B.socials || []).map((s) => `<a href="${s.url}" target="_blank" rel="noopener">${s.label} ↗</a>`).join(' · ');

  // ── Accueil + infos clés ──
  set('#brandName', B.name);
  set('#heroKicker', `${B.tagline} — ANICHE`.toUpperCase());
  set('#heroLead', B.lead);
  set('#statusLabel', (S.status || {}).label || '');
  set('#kiAddress', fullAddress);
  const route = $('#kiRoute');
  if (route) route.href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(fullAddress);
  set('#kiStatus', (S.status || {}).label || '');
  set('#kiStatusNote', (S.status || {}).note || '');
  [['#kiMail', B.email], ['#fMail', B.email]].forEach(([sel, mail]) => {
    const a = $(sel); if (a) { a.href = 'mailto:' + mail; a.textContent = mail; }
  });
  put('#kiSocials', socialsHTML);
  put('#fSocials', socialsHTML);
  set('#fAddress', fullAddress);
  const cta = $('#topCta'); if (cta) cta.href = 'mailto:' + B.email;

  // ── Chiffres clés ──
  put('#stats', (S.stats || []).map((s) =>
    `<div class="stat"><p class="stat-big">${s.big}</p><p class="stat-label">${s.label}</p></div>`).join(''));

  // ── Formules ──
  const ICONS = {
    cup: '<path d="M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5V9z"/><path d="M16 10h2a2 2 0 0 1 0 4h-2"/><path d="M8 3v3M12 3v3"/>',
    die: '<rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="8.5" cy="8.5" r=".9"/><circle cx="15.5" cy="8.5" r=".9"/><circle cx="12" cy="12" r=".9"/><circle cx="8.5" cy="15.5" r=".9"/><circle cx="15.5" cy="15.5" r=".9"/>',
    crown: '<path d="M4 18h16l1-10-5 4-4-7-4 7-5-4z"/>'
  };
  put('#formulesGrid', (S.formules || []).map((f) => {
    const todo = (t) => /^À COMPLÉTER/i.test(t);
    return `<article class="formule${f.featured ? ' featured' : ''}">
      ${f.featured ? '<span class="formule-badge mono">LA PLUS COMPLÈTE</span>' : ''}
      ${ICONS[f.icon] ? `<span class="formule-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICONS[f.icon]}</svg></span>` : ''}
      <h3>${f.name}</h3>
      <p class="formule-tagline">${f.tagline || ''}</p>
      <p class="formule-price${todo(f.price) ? ' todo' : ''}">${f.price || ''}</p>
      ${f.priceNote ? `<p class="formule-pricenote">${f.priceNote}</p>` : ''}
      ${f.extra ? `<p class="formule-extra">${f.extra}</p>` : ''}
      ${(f.bonuses || []).length ? `<ul>${f.bonuses.map((b) => `<li${todo(b) ? ' class="todo"' : ''}>${b}</li>`).join('')}</ul>` : ''}
    </article>`;
  }).join(''));

  set('#formulesNote', S.formulesNote || '');

  // ── Planning ──
  const P = S.planning || {};
  const TIME = /^(\d{1,2}h(?:\d{2})?(?:\s*[–-]\s*\d{1,2}h(?:\d{2})?)?)\s+(.+)$/i;
  const days = (P.week || '').split('\n').map((l) => l.trim()).filter(Boolean).map((line) => {
    const [day = '', rest = ''] = line.split('|').map((p) => p.trim());
    const events = rest.split(';').map((e) => e.trim()).filter(Boolean).map((e) => {
      const m = e.match(TIME);
      return m ? { time: m[1], label: m[2] } : { time: '', label: e };
    });
    return { day, events, off: /^fermé/i.test(rest) };
  });
  const ABBR = { lundi: 'Lun', mardi: 'Mar', mercredi: 'Mer', jeudi: 'Jeu', vendredi: 'Ven', samedi: 'Sam', dimanche: 'Dim' };
  const todayName = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'][new Date().getDay()];
  const openDays = days.filter((d) => !d.off);
  const closedDays = days.filter((d) => d.off);
  set('#kiDays', openDays.map((d) => ABBR[d.day.toLowerCase()] || d.day).join(' · ') || 'À annoncer');
  set('#kiClosed', closedDays.length ? `Fermé : ${closedDays.map((d) => d.day.toLowerCase()).join(', ')} (prévisionnel)` : 'Programme prévisionnel');
  set('#planningNote', P.note || '');
  // Fiche d'une animation (clic) : description, PAF, prestataire, réservation
  const norm = (s) => (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const attr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  const infoFor = (label) => (S.evenements || []).find((ev) => ev.match && norm(label).includes(norm(ev.match)));
  const DAYNUM = { dimanche: 0, lundi: 1, mardi: 2, mercredi: 3, jeudi: 4, vendredi: 5, samedi: 6 };
  const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const nextDateOf = (dayName) => {
    const d = new Date(); d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + ((DAYNUM[norm(dayName)] - d.getDay() + 7) % 7));
    return d;
  };
  const RES = S.reservation || {};
  const reservationHTML = (day, info) => info.complet
    ? `<p class="res-full"><strong>Complet</strong> — toutes les places sont prises pour cette animation. Écrivez-nous pour vous inscrire sur liste d'attente.</p>`
    : `
    <button type="button" class="btn btn-primary res-open">Réserver ma place</button>
    <form class="res-form" hidden>
      <label>Date souhaitée<input type="date" name="date" required min="${iso(new Date())}" value="${iso(nextDateOf(day))}"></label>
      <label>Nom et prénom<input type="text" name="nom" required autocomplete="name"></label>
      <label>Téléphone ou e-mail<input type="text" name="contact" required autocomplete="email"></label>
      <label>Nombre de personnes<input type="number" name="nb" required min="1" max="${Math.min(RES.maxPersonnes || 8, info.places || 99)}" value="1"></label>
      <label class="res-wide">Message (facultatif)<textarea name="msg" rows="2"></textarea></label>
      <button type="submit" class="btn btn-primary">Envoyer ma demande</button>
      <p class="res-legal">Ces informations servent uniquement à traiter votre réservation.</p>
      <p class="res-status" role="status"></p>
    </form>`;
  const eventHTML = (d, e) => {
    const head = `<span class="plan-time mono">${e.time}</span><span class="plan-title">${e.label}</span>`;
    const info = infoFor(e.label);
    if (!info) return `<p class="plan-ev">${head}</p>`;
    const p = info.provider;
    return `<details class="plan-ev plan-ev-d" data-day="${attr(d.day)}" data-event="${attr((e.time + ' ' + e.label).trim())}">
      <summary>${head}<span class="plan-more mono${info.complet ? ' full' : ''}">${info.complet ? 'COMPLET' : info.reservation ? 'INFOS & RÉSERVATION' : 'INFOS'}</span><span class="chev" aria-hidden="true"></span></summary>
      <div class="plan-body">
        ${info.desc ? `<p class="game-desc">${info.desc}</p>` : ''}
        ${info.paf || info.places ? `<p class="plan-paf">${info.paf ? `<span class="mono">PAF</span><strong>${info.paf}</strong><span>participation aux frais</span>` : ''}${info.places ? `<span class="plan-places mono${info.complet ? ' full' : ''}">${info.complet ? 'COMPLET' : info.places + ' PLACES'}</span>` : ''}</p>` : ''}
        ${p ? `<div class="plan-provider"><p class="mono plan-provider-k">ORGANISÉ AVEC</p><p class="plan-provider-name">${p.name}</p>${p.text ? `<p class="plan-provider-text">${p.text}</p>` : ''}${p.url ? `<a class="game-video mono" href="${p.url}" target="_blank" rel="noopener">Site de ${p.name} ↗</a>` : ''}</div>` : ''}
        ${info.reservation ? reservationHTML(d.day, info) : ''}
      </div>
    </details>`;
  };
  put('#planningList', days.map((d) => {
    const isToday = d.day.toLowerCase() === todayName;
    return `<div class="plan-row${d.off ? ' off' : ''}${isToday ? ' today' : ''}">
      <span class="plan-day mono">${d.day}${isToday ? '<em>AUJOURD\'HUI</em>' : ''}</span>
      <div class="plan-events">${d.events.map((e) => eventHTML(d, e)).join('')}</div>
    </div>`;
  }).join(''));

  // Réservation : bouton → formulaire → envoi (formulaire distant si `endpoint`, sinon e-mail)
  const planList = $('#planningList');
  if (planList) {
    planList.addEventListener('click', (ev) => {
      const open = ev.target.closest('.res-open');
      if (!open) return;
      const form = open.parentElement.querySelector('.res-form');
      form.hidden = !form.hidden;
      open.textContent = form.hidden ? 'Réserver ma place' : 'Fermer le formulaire';
    });
    planList.addEventListener('submit', async (ev) => {
      const form = ev.target.closest('.res-form');
      if (!form) return;
      ev.preventDefault();
      const box = form.closest('.plan-ev-d');
      const f = new FormData(form);
      const status = form.querySelector('.res-status');
      const when = new Date(f.get('date') + 'T00:00:00');
      if (DAYNUM[norm(box.dataset.day)] !== when.getDay()) {
        status.textContent = `Cette animation a lieu le ${box.dataset.day.toLowerCase()} : choisissez une date correspondante.`;
        return;
      }
      const dateFr = when.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      const lines = [`Animation : ${box.dataset.event}`, `Date : ${dateFr}`, `Nom : ${f.get('nom')}`, `Contact : ${f.get('contact')}`,
        `Nombre de personnes : ${f.get('nb')}`, f.get('msg') ? `Message : ${f.get('msg')}` : ''].filter(Boolean);
      if (RES.endpoint) {
        status.textContent = 'Envoi en cours…';
        try {
          const r = await fetch(RES.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({ animation: box.dataset.event, date: dateFr, nom: f.get('nom'), contact: f.get('contact'), personnes: f.get('nb'), message: f.get('msg') || '' }) });
          if (!r.ok) throw new Error('http ' + r.status);
          status.textContent = 'Merci ! Votre demande est bien envoyée. Nous vous confirmons votre place très vite.';
          form.reset();
        } catch (err) { status.textContent = `L'envoi a échoué. Écrivez-nous directement à ${B.email}.`; }
      } else {
        status.textContent = 'Votre application e-mail va s\'ouvrir : envoyez le message pour finaliser. Nous confirmerons votre place par retour.';
        location.href = `mailto:${B.email}?subject=${encodeURIComponent('Réservation — ' + box.dataset.event)}&body=${encodeURIComponent(lines.join('\n'))}`;
      }
    });
  }

  // ── Actus ──
  put('#newsList', (S.news || []).map((n) => `<article class="news-item">
    <p class="news-date mono">${n.date || ''}</p>
    <div><h3>${n.title || ''}</h3><p>${n.desc || ''}</p>
    ${Array.isArray(n.images) && n.images.length ? `<div class="mosaic">${n.images.map((s) => `<img src="${s}" alt="" loading="lazy">`).join('')}</div>` : ''}</div>
  </article>`).join(''));

  // ── La carte (texte : "# Catégorie" puis "Nom | précisions | prix") ──
  const C = S.carte || {};
  set('#carteNote', C.note || '');
  const cats = [];
  (C.text || '').split('\n').map((l) => l.trim()).filter(Boolean).forEach((line) => {
    if (line.startsWith('#')) { cats.push({ title: line.replace(/^#+\s*/, ''), items: [] }); return; }
    if (!cats.length) cats.push({ title: '', items: [] });
    const [name = '', desc = '', price = ''] = line.split('|').map((p) => p.trim());
    cats[cats.length - 1].items.push({ name, desc, price });
  });
  put('#carteGrid', cats.map((c) => `<section class="carte-cat">
    ${c.title ? `<h3 class="mono">${c.title}</h3>` : ''}
    ${c.items.map((i) => `<div class="carte-item"><div><p class="carte-name">${i.name}</p>${i.desc ? `<p class="carte-desc">${i.desc}</p>` : ''}</div><p class="carte-price">${i.price}</p></div>`).join('')}
  </section>`).join(''));

  // ── Onglets : Nouveautés · Planning · Jeux · La carte ──
  const tabBtns = [...document.querySelectorAll('.tab-btn')];
  const tabPanels = [...document.querySelectorAll('.tab-panel')];
  const openTab = (key) => {
    tabBtns.forEach((b) => { const on = b.dataset.tab === key; b.classList.toggle('active', on); b.setAttribute('aria-selected', on ? 'true' : 'false'); });
    tabPanels.forEach((p) => p.classList.toggle('active', p.dataset.panel === key));
  };
  tabBtns.forEach((b) => b.addEventListener('click', () => openTab(b.dataset.tab)));
  document.querySelectorAll('a[data-tab]').forEach((a) => a.addEventListener('click', () => openTab(a.dataset.tab)));

  // ── Jeux : liste filtrable (âge / catégorie / recherche) ──
  set('#jeuxNote', S.jeuxNote || '');
  const games = window.SITE_GAMES || [];
  const panel = $('#gamesPanel');
  if (!panel) return;
  if (!games.length) { panel.innerHTML = '<p class="empty">Catalogue à venir.</p>'; return; }

  const BRACKETS = [
    { key: '3', label: 'Dès 3 ans', max: 5 }, { key: '6', label: 'Dès 6 ans', max: 7 },
    { key: '8', label: 'Dès 8 ans', max: 9 }, { key: '10', label: 'Dès 10 ans', max: 11 },
    { key: '12', label: 'Dès 12 ans', max: 13 }, { key: '14', label: 'Dès 14 ans', max: Infinity }
  ];
  const bracketOf = (age) => (age == null || isNaN(age)) ? null : (BRACKETS.find((b) => age <= b.max) || BRACKETS[BRACKETS.length - 1]);
  const categories = [...new Set(games.map((g) => g.category).filter(Boolean))];
  const pills = (key, all, items) => `<div class="pills" data-filter="${key}"><button class="pill active" data-value="all">${all}</button>` +
    items.map((i) => `<button class="pill" data-value="${i.value}">${i.label}</button>`).join('') + `</div>`;

  panel.innerHTML = `
    <div class="filters">
      <div class="filter-group"><span class="label mono">ÂGE</span>${pills('age', 'Tous', BRACKETS.map((b) => ({ value: b.key, label: b.label })))}</div>
      <div class="filter-group"><span class="label mono">CATÉGORIE</span>${pills('cat', 'Toutes', categories.map((c) => ({ value: c, label: c })))}</div>
      <input type="search" class="search" id="gamesSearch" placeholder="Rechercher un jeu…" autocomplete="off">
    </div>
    <p class="count mono" id="gamesCount"></p>
    <div class="games" id="gamesListEl"></div>`;

  const listEl = $('#gamesListEl'), countEl = $('#gamesCount');
  const row = (g) => {
    const meta = [g.players, g.age != null ? `${g.age} ans et +` : '', g.duration].filter(Boolean).join(' — ').toUpperCase();
    return `<details class="game">
      <summary>
        ${g.img ? `<img class="game-thumb" src="${g.img}" alt="" loading="lazy">` : '<span class="game-thumb"></span>'}
        <span class="game-text"><span class="game-name">${g.name || ''}</span>${meta ? `<span class="game-meta mono">${meta}</span>` : ''}</span>
        <span class="chev" aria-hidden="true"></span>
      </summary>
      <div class="game-body">
        ${g.img ? `<div class="game-media"><img src="${g.img}" alt="${g.name || ''}" loading="lazy"></div>` : ''}
        <div>
          ${g.desc ? `<p class="game-desc">${g.desc}</p>` : ''}
          ${Array.isArray(g.comments) && g.comments.length ? `<ul class="game-comments">${g.comments.map((c) => `<li>${c}</li>`).join('')}</ul>` : ''}
          ${g.video ? `<a class="game-video mono" href="${g.video}" target="_blank" rel="noopener">Voir la vidéo des règles ↗</a>` : ''}
        </div>
      </div>
    </details>`;
  };

  const state = { age: 'all', cat: 'all', q: '' };
  const render = () => {
    const q = state.q.trim().toLowerCase();
    const list = games.filter((g) => {
      if (state.age !== 'all') { const b = bracketOf(g.age); if (!b || b.key !== state.age) return false; }
      if (state.cat !== 'all' && g.category !== state.cat) return false;
      if (q && !(g.name || '').toLowerCase().includes(q)) return false;
      return true;
    });
    listEl.innerHTML = list.length ? list.map(row).join('') : '<p class="empty">Aucun jeu ne correspond à ces filtres.</p>';
    countEl.textContent = list.length === games.length ? `${games.length} JEUX` : `${list.length} JEU${list.length > 1 ? 'X' : ''} SUR ${games.length}`;
  };
  panel.querySelectorAll('.pills').forEach((group) => group.addEventListener('click', (e) => {
    const btn = e.target.closest('.pill'); if (!btn) return;
    group.querySelectorAll('.pill').forEach((b) => b.classList.toggle('active', b === btn));
    state[group.dataset.filter] = btn.dataset.value;
    render();
  }));
  const search = $('#gamesSearch');
  if (search) search.addEventListener('input', () => { state.q = search.value; render(); });
  render();
})();
