/* Intro de marque (~8 s, jamais plus de 10 s) : visuel + jingle synthétisé (aucun fichier audio).
   Le son ne peut démarrer qu'après un clic (règle des navigateurs) : on l'accroche
   au bouton « Oui, j'ai 18 ans » ; si la vérification d'âge est déjà validée,
   l'intro joue sans son. */
(() => {
  const root = document.documentElement;
  const intro = document.getElementById('intro');
  if (!intro) return;
  if (root.hasAttribute('data-intro-done')) return;

  let started = false, ctx = null, timers = [];
  const TOTAL = 7800;   // + 650 ms de fondu de sortie : ~8,5 s au total, sous les 10 s

  function jingle() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    try {
      ctx = new AC();
      ctx.resume && ctx.resume();
      const t0 = ctx.currentTime + 0.05;
      const master = ctx.createGain();
      master.gain.value = 0.32;
      master.connect(ctx.destination);

      // 1) dés qui roulent : petits claquements de bruit filtré
      const len = Math.floor(ctx.sampleRate * 0.09);
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
      // (calés sur la chute du dé : il entre vers 5,6 s et se loge vers 6,4 s)
      [[5.78, 2400, 0.9], [5.98, 3100, 0.7], [6.16, 2000, 0.8], [6.30, 3400, 0.5], [6.38, 2600, 0.7]].forEach(([t, f, g]) => {
        const src = ctx.createBufferSource(); src.buffer = buf;
        const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = f; bp.Q.value = 2.2;
        const gn = ctx.createGain();
        gn.gain.setValueAtTime(g, t0 + t);
        gn.gain.exponentialRampToValueAtTime(0.001, t0 + t + 0.08);
        src.connect(bp); bp.connect(gn); gn.connect(master);
        src.start(t0 + t);
      });

      // 2) nappe qui monte (accord de ré majeur ajouté d'une neuvième)
      const pad = ctx.createGain();
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass';
      lp.frequency.setValueAtTime(400, t0 + 1.0);
      lp.frequency.exponentialRampToValueAtTime(3200, t0 + 6.4);
      pad.gain.setValueAtTime(0.0001, t0 + 1.0);
      pad.gain.exponentialRampToValueAtTime(0.5, t0 + 5.6);
      pad.gain.exponentialRampToValueAtTime(0.0001, t0 + 7.7);
      pad.connect(lp); lp.connect(master);
      [73.42, 146.83, 220.0, 293.66, 369.99, 440.0, 659.26].forEach((f, i) => {
        const o = ctx.createOscillator(); o.type = i < 2 ? 'triangle' : 'sine';
        o.frequency.value = f; o.detune.value = (i % 2 ? 4 : -4);
        const og = ctx.createGain(); og.gain.value = i < 2 ? 0.55 : 0.28;
        o.connect(og); og.connect(pad);
        o.start(t0 + 1.0); o.stop(t0 + 7.8);
      });

      // 3) barre de chargement : 10 petits bips qui montent (un par bloc)
      [440, 494, 554, 659, 740, 880, 988, 1109, 1319, 1480].forEach((f, k) => {
        const t = t0 + 3.6 + k * 0.2;
        const o = ctx.createOscillator(); o.type = 'triangle'; o.frequency.value = f;
        const og = ctx.createGain();
        og.gain.setValueAtTime(0.0001, t);
        og.gain.exponentialRampToValueAtTime(0.16, t + 0.01);
        og.gain.exponentialRampToValueAtTime(0.0001, t + 0.13);
        o.connect(og); og.connect(master);
        o.start(t); o.stop(t + 0.15);
      });

      // 4) tintement final (cloche) quand la partie est « chargée »
      [[1174.66, 0.5], [1760.0, 0.25], [2349.32, 0.22], [3236.0, 0.12]].forEach(([f, g]) => {
        const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = f;
        const og = ctx.createGain();
        og.gain.setValueAtTime(0.0001, t0 + 6.4);
        og.gain.exponentialRampToValueAtTime(g, t0 + 6.44);
        og.gain.exponentialRampToValueAtTime(0.0001, t0 + 7.9);
        o.connect(og); og.connect(master);
        o.start(t0 + 6.4); o.stop(t0 + 8.0);
      });
    } catch (e) { ctx = null; }
  }

  function finish() {
    timers.forEach(clearTimeout);
    try { sessionStorage.setItem('bar_du_joueur_intro', '1'); } catch (e) {}
    intro.classList.add('out');
    setTimeout(() => {
      root.setAttribute('data-intro-done', '1');
      if (ctx) { try { ctx.close(); } catch (e) {} }
    }, 650);
  }

  function start(withSound) {
    if (started) return;
    started = true;
    if (withSound) jingle();
    intro.classList.add('play');
    timers.push(setTimeout(finish, TOTAL));
  }

  document.getElementById('introSkip').addEventListener('click', finish);

  const yes = document.getElementById('ageGateYes');
  if (root.hasAttribute('data-age-ok')) {
    start(false);                                   // déjà majeur validé : pas de clic, donc sans son
  } else if (yes) {
    yes.addEventListener('click', () => start(true)); // le clic autorise le son
  }
})();
