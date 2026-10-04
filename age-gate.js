/* ═══════════════════════════════════════════════════════════
   VÉRIFICATION D'ÂGE — loi Évin (art. L3323-2 du Code de la
   santé publique, extension aux sites internet). Indépendant du
   moteur de scroll : ne touche à rien d'autre qu'à sa propre boîte.
   ═══════════════════════════════════════════════════════════ */
(() => {
  const KEY = 'bar_du_joueur_age_ok';
  const yes = document.getElementById('ageGateYes');
  const no = document.getElementById('ageGateNo');
  if (!yes || !no) return;

  yes.addEventListener('click', () => {
    try { localStorage.setItem(KEY, '1'); } catch (e) {}
    document.documentElement.setAttribute('data-age-ok', '1');
  });

  no.addEventListener('click', () => {
    window.location.href = 'https://www.service-public.fr/';
  });
})();
