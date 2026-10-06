/* Intro de marque (~8 s, jamais plus de 10 s) : visuel + jingle synthétisé (aucun fichier audio).
   Le son ne peut démarrer qu'après un clic (règle des navigateurs) : on l'accroche
   au bouton « Oui, j'ai 18 ans » ; si la vérification d'âge est déjà validée,
   l'intro joue sans son.

   Pour les téléphones, le jingle est d'abord « fabriqué » à l'avance (rendu hors-ligne, pendant que le visiteur
   lit la vérification d'âge) puis joué comme un vrai fichier son via <audio> : c'est la méthode la plus fiable
   (volume média, mode silencieux iPhone, navigateurs intégrés). Si ce rendu n'est pas prêt, on joue en direct. */
(() => {
  const root = document.documentElement;
  const intro = document.getElementById('intro');
  if (!intro) return;
  if (root.hasAttribute('data-intro-done')) return;

  let started = false, ctx = null, timers = [];
  let audioEl = null, audioReady = false;
  const TOTAL = 7800;   // + 650 ms de fondu de sortie : ~8,5 s au total, sous les 10 s

  /* Programme tout le jingle dans `ac` (contexte réel OU hors-ligne), branché sur `out`, à partir de t0. */
  function build(ac, out, t0) {
    const master = ac.createGain();
    master.gain.value = 0.6;
    master.connect(out);

    // 1) dés qui roulent : petits claquements de bruit filtré
    const len = Math.floor(ac.sampleRate * 0.09);
    const buf = ac.createBuffer(1, len, ac.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    // (calés sur la chute du dé : il entre vers 5,6 s et se loge vers 6,4 s)
    [[5.78, 2400, 0.9], [5.98, 3100, 0.7], [6.16, 2000, 0.8], [6.30, 3400, 0.5], [6.38, 2600, 0.7]].forEach(([t, f, g]) => {
      const src = ac.createBufferSource(); src.buffer = buf;
      const bp = ac.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = f; bp.Q.value = 2.2;
      const gn = ac.createGain();
      gn.gain.setValueAtTime(g, t0 + t);
      gn.gain.exponentialRampToValueAtTime(0.001, t0 + t + 0.08);
      src.connect(bp); bp.connect(gn); gn.connect(master);
      src.start(t0 + t);
    });

    // 2) nappe qui monte (accord de ré majeur ajouté d'une neuvième)
    const pad = ac.createGain();
    const lp = ac.createBiquadFilter(); lp.type = 'lowpass';
    lp.frequency.setValueAtTime(400, t0 + 1.0);
    lp.frequency.exponentialRampToValueAtTime(3200, t0 + 6.4);
    pad.gain.setValueAtTime(0.0001, t0 + 1.0);
    pad.gain.exponentialRampToValueAtTime(0.5, t0 + 5.6);
    pad.gain.exponentialRampToValueAtTime(0.0001, t0 + 7.7);
    pad.connect(lp); lp.connect(master);
    [73.42, 146.83, 220.0, 293.66, 369.99, 440.0, 659.26].forEach((f, i) => {
      const o = ac.createOscillator(); o.type = i < 2 ? 'triangle' : 'sine';
      o.frequency.value = f; o.detune.value = (i % 2 ? 4 : -4);
      const og = ac.createGain(); og.gain.value = i < 2 ? 0.55 : 0.28;
      o.connect(og); og.connect(pad);
      o.start(t0 + 1.0); o.stop(t0 + 7.8);
    });

    // 3) barre de chargement : 10 petits bips qui montent (un par bloc)
    [440, 494, 554, 659, 740, 880, 988, 1109, 1319, 1480].forEach((f, k) => {
      const t = t0 + 3.6 + k * 0.2;
      const o = ac.createOscillator(); o.type = 'triangle'; o.frequency.value = f;
      const og = ac.createGain();
      og.gain.setValueAtTime(0.0001, t);
      og.gain.exponentialRampToValueAtTime(0.16, t + 0.01);
      og.gain.exponentialRampToValueAtTime(0.0001, t + 0.13);
      o.connect(og); og.connect(master);
      o.start(t); o.stop(t + 0.15);
    });

    // 4) tintement final (cloche) quand la partie est « chargée »
    [[1174.66, 0.5], [1760.0, 0.25], [2349.32, 0.22], [3236.0, 0.12]].forEach(([f, g]) => {
      const o = ac.createOscillator(); o.type = 'sine'; o.frequency.value = f;
      const og = ac.createGain();
      og.gain.setValueAtTime(0.0001, t0 + 6.4);
      og.gain.exponentialRampToValueAtTime(g, t0 + 6.44);
      og.gain.exponentialRampToValueAtTime(0.0001, t0 + 7.9);
      o.connect(og); og.connect(master);
      o.start(t0 + 6.4); o.stop(t0 + 8.0);
    });
  }

  function limiterFor(ac) {
    const lim = ac.createDynamicsCompressor();   // évite la saturation à ce volume
    lim.threshold.value = -10; lim.ratio.value = 12; lim.attack.value = 0.003; lim.release.value = 0.2;
    lim.connect(ac.destination);
    return lim;
  }

  /* Lecture en direct (Web Audio) : utilisée si le fichier son n'est pas prêt. */
  function jingle() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    try {
      // iPhone : sans ça, l'interrupteur « silencieux » coupe tout son Web Audio.
      try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch (e) {}
      ctx = new AC();
      ctx.resume && ctx.resume();
      build(ctx, limiterFor(ctx), ctx.currentTime + 0.05);
    } catch (e) { ctx = null; }
  }

  /* Fabrique le jingle à l'avance, en fichier WAV, sans qu'aucun son ne sorte. */
  function prerender() {
    const OAC = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    if (!OAC) return;
    try {
      const rate = 44100, secs = 8.6;
      const oc = new OAC(1, Math.ceil(rate * secs), rate);
      build(oc, limiterFor(oc), 0);
      const done = (rendered) => {
        const data = rendered.getChannelData(0);
        let peak = 0;
        for (let i = 0; i < data.length; i++) { const v = Math.abs(data[i]); if (v > peak) peak = v; }
        const gain = peak > 0 ? 0.95 / peak : 1;      // on remonte le volume au maximum propre (haut-parleurs de téléphone)
        const pcm = new DataView(new ArrayBuffer(44 + data.length * 2));
        const w = (o, s) => { for (let i = 0; i < s.length; i++) pcm.setUint8(o + i, s.charCodeAt(i)); };
        w(0, 'RIFF'); pcm.setUint32(4, 36 + data.length * 2, true); w(8, 'WAVE'); w(12, 'fmt ');
        pcm.setUint32(16, 16, true); pcm.setUint16(20, 1, true); pcm.setUint16(22, 1, true);
        pcm.setUint32(24, rate, true); pcm.setUint32(28, rate * 2, true); pcm.setUint16(32, 2, true); pcm.setUint16(34, 16, true);
        w(36, 'data'); pcm.setUint32(40, data.length * 2, true);
        for (let i = 0; i < data.length; i++) pcm.setInt16(44 + i * 2, Math.max(-1, Math.min(1, data[i] * gain)) * 32767, true);
        audioEl = new Audio(URL.createObjectURL(new Blob([pcm], { type: 'audio/wav' })));
        audioEl.preload = 'auto';
        audioReady = true;
      };
      const p = oc.startRendering();
      if (p && p.then) p.then(done).catch(() => {}); else oc.oncomplete = (e) => done(e.renderedBuffer);
    } catch (e) {}
  }

  function playSound() {
    if (audioReady && audioEl) {
      try {
        audioEl.currentTime = 0;
        root.setAttribute('data-intro-sound', 'file');
        const p = audioEl.play();
        if (p && p.catch) p.catch(() => { root.setAttribute('data-intro-sound', 'live'); jingle(); });   // refusé : on retente en direct
        return;
      } catch (e) {}
    }
    root.setAttribute('data-intro-sound', 'live');
    jingle();
  }
  window.__introAudio = () => ({ ready: audioReady, paused: audioEl ? audioEl.paused : null, t: audioEl ? audioEl.currentTime : null, dur: audioEl ? audioEl.duration : null });

  function finish() {
    timers.forEach(clearTimeout);
    try { sessionStorage.setItem('bar_du_joueur_intro', '1'); } catch (e) {}
    intro.classList.add('out');
    if (audioEl) { try { audioEl.pause(); } catch (e) {} }
    setTimeout(() => {
      root.setAttribute('data-intro-done', '1');
      if (ctx) { try { ctx.close(); } catch (e) {} }
    }, 650);
  }

  function start(withSound) {
    if (started) return;
    started = true;
    if (withSound) playSound();
    intro.classList.add('play');
    timers.push(setTimeout(finish, TOTAL));
  }

  document.getElementById('introSkip').addEventListener('click', finish);

  const yes = document.getElementById('ageGateYes');
  if (root.hasAttribute('data-age-ok')) {
    start(false);                                   // déjà majeur validé : pas de clic, donc sans son
  } else if (yes) {
    setTimeout(prerender, 150);                     // pendant que le visiteur lit la vérification d'âge
    yes.addEventListener('click', () => start(true)); // le clic autorise le son
  }
})();
