// =========================================================
//   ÉLÉMENTS DU DOM
// =========================================================
const carteContainer    = document.getElementById('carteContainer');
const ficheDetail       = document.getElementById('ficheDetail');
const searchInput       = document.getElementById('searchPrefecture');
const okinawaLayer      = document.getElementById('okinawaLayer');
const btnOkinawa        = document.querySelector('[data-super-ile-btn="Ryūkyū"]');
const hoverLabel        = document.getElementById('prefecture-hover-label');
const searchSuggestions = document.getElementById('search-suggestions');
const navFiche          = document.querySelector('.fiche-navbar');
const btnPrev           = document.getElementById('fiche-prev');
const btnNext           = document.getElementById('fiche-next');

const ordrePrefectures = Object.keys(prefecture_INFOS);
let indexActuel = null;
let indexSuggestion = -1;

// =========================================================
//   UTILITAIRES
// =========================================================

/** Active/désactive le mode fiche sur le body. */
function setFicheMode(actif, modeRegion = false) {
  document.body.classList.toggle('fiche-mode', actif);
  document.body.classList.toggle('region-active-mode', actif && modeRegion);
  navFiche.style.display = (actif && !modeRegion) ? 'flex' : 'none';
  document.documentElement.style.overflowY = actif ? 'auto' : '';
  document.body.style.overflowY             = actif ? 'auto' : '';
}

/** Remet la carte dans son état initial (aucune sélection). */
function nettoyerTouteLaCarte() {
  document.querySelectorAll('.prefecture').forEach(p => {
    // On préserve "deselecting" si l'animation est en cours
    if (!p.classList.contains('deselecting')) {
      p.classList.remove('selected', 'superile-highlight', 'illumine', 'active-prefecture');
    }
  });
  document.querySelectorAll('.big-btn, .region-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.region-svg-group').forEach(g => g.classList.remove('is-active-region'));
  carteContainer.classList.remove('okinawa-zoom');
  okinawaLayer.classList.remove('okinawa-visible');
}

// =========================================================
//   FICHE PRÉFECTURE
// =========================================================

function ouvrirFiche(prefectureId) {
  const info = prefecture_INFOS[prefectureId];
  if (!info) return;

  nettoyerTouteLaCarte();
  indexActuel = ordrePrefectures.indexOf(prefectureId);

  // Allumer la préfecture sur la mini-carte
  document.querySelectorAll(`.prefecture[data-prefecture="${prefectureId}"]`)
    .forEach(p => p.classList.add('active-prefecture'));

  // Remplir les champs de la fiche
  document.getElementById('ficheTitre').textContent = `${info.kanji} — ${info.romaji}`;
  document.getElementById('ficheTexte').textContent = info.desc;

  const elemCap = document.getElementById('ficheCapitale');
  if (elemCap) {
    elemCap.previousElementSibling.textContent = 'CAPITALE';
    elemCap.textContent = info.capitale || 'N/A';
  }
  document.getElementById('fichePop').textContent = info.population || 'N/A';

  const stats = document.querySelector('.stats-grid');
  if (stats) stats.style.display = 'grid';

  const imgDrapeau = document.getElementById('prefecture-drapeau');
  imgDrapeau.src = `../drapeaux/${prefectureId}.svg`;
  imgDrapeau.style.display = 'block';

  // Navigation
  document.getElementById('compteur-actuel').textContent = indexActuel + 1;
  document.getElementById('compteur-total').textContent  = ordrePrefectures.length;
  btnPrev.disabled = indexActuel === 0;
  btnNext.disabled = indexActuel === ordrePrefectures.length - 1;

  // Passer en mode fiche
  setFicheMode(true);
  carteContainer.classList.add('minimized');
  okinawaLayer.classList.add('okinawa-visible');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =========================================================
//   FICHE RÉGION
// =========================================================

function remplirFicheRegion(idRegion) {
  nettoyerTouteLaCarte();

  const info = region_INFOS[idRegion];
  if (!info) return;

  document.getElementById('ficheTitre').textContent = `${info.nomKanji} — ${info.nomRomaji}`;
  document.getElementById('ficheTexte').textContent = info.desc;

  const stats = document.querySelector('.stats-grid');
  if (stats) stats.style.display = 'grid';

  const elemCap = document.getElementById('ficheCapitale');
  if (elemCap) {
    elemCap.previousElementSibling.textContent = 'VILLE PRINCIPALE';
    elemCap.textContent = info.cap;
  }

  const elemPop = document.getElementById('fichePop');
  if (elemPop) elemPop.textContent = info.pop;

  const drapeau = document.querySelector('#prefecture-drapeau');
  if (drapeau) drapeau.style.display = 'none';

  // Activer le bon bouton dans la barre haute
  document.querySelectorAll('.top-region-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-target-region') === idRegion);
  });

  setFicheMode(true, true);
  carteContainer.classList.add('minimized');
  okinawaLayer.classList.add('okinawa-visible');
}

/** Active une région : remplit la fiche + colorie les préfectures sur la carte. */
function activerRegion(idRegion) {
  const group = document.getElementById(idRegion) || document.querySelector(`.region-svg-group[data-region-romaji="${idRegion}"]`);
  if (!group) {
    console.error('Région SVG introuvable :', idRegion);
    return;
  }

  const regionNom = group.getAttribute('data-region-romaji') || idRegion;
  const cleanNom  = regionNom.replace('region-', '');

  remplirFicheRegion(group.id);

  group.classList.add('is-active-region');
  document.querySelectorAll(`.prefecture[data-region="${cleanNom}"]`)
    .forEach(p => p.classList.add('selected'));

  // Synchroniser le bouton du dock de droite
  const dockBtn = document.querySelector(`.region-btn[data-region-btn="${cleanNom}"]`);
  if (dockBtn) dockBtn.classList.add('active');
}

// =========================================================
//   NAVIGATION ENTRE FICHES
// =========================================================

function transitionVersFiche(nouvelIndex) {
  const elementsAAnimer = document.querySelectorAll(
    '#ficheTitre, #prefecture-drapeau, .stats-grid, #ficheTexte, #pref-portrait-container'
  );

  btnPrev.style.pointerEvents = 'none';
  btnNext.style.pointerEvents = 'none';
  elementsAAnimer.forEach(el => el.classList.add('fiche-transition-out'));

  setTimeout(() => {
    ouvrirFiche(ordrePrefectures[nouvelIndex]);
    elementsAAnimer.forEach(el => {
      el.style.animation = 'none';
      el.offsetHeight; // reflow
      el.style.animation = null;
      el.classList.remove('fiche-transition-out');
    });
    btnPrev.style.pointerEvents = 'auto';
    btnNext.style.pointerEvents = 'auto';
  }, 200);
}

// =========================================================
//   ÉVÉNEMENTS — NAVIGATION FICHES
// =========================================================

btnPrev.addEventListener('click', e => {
  e.stopPropagation();
  if (indexActuel > 0) transitionVersFiche(indexActuel - 1);
});

btnNext.addEventListener('click', e => {
  e.stopPropagation();
  if (indexActuel < ordrePrefectures.length - 1) transitionVersFiche(indexActuel + 1);
});

document.addEventListener('keydown', e => {
  if (!document.body.classList.contains('fiche-mode')) return;
  if (e.key === 'ArrowLeft'  && indexActuel > 0)                         transitionVersFiche(indexActuel - 1);
  else if (e.key === 'ArrowRight' && indexActuel < ordrePrefectures.length - 1) transitionVersFiche(indexActuel + 1);
  else if (e.key === 'Escape') document.getElementById('retourCarte').click();
});

// =========================================================
//   ÉVÉNEMENTS — RETOUR CARTE
// =========================================================

document.getElementById('retourCarte').addEventListener('click', () => {
  // Animer la préfecture active avant de nettoyer
  const prefActive = document.querySelector('.prefecture.active-prefecture');
  if (prefActive) {
    prefActive.classList.add('deselecting');
    prefActive.classList.remove('active-prefecture');
    prefActive.addEventListener('animationend', () => {
      prefActive.classList.remove('deselecting');
    }, { once: true });
  }

  setFicheMode(false);
  carteContainer.classList.remove('minimized', 'okinawa-zoom');
  btnOkinawa.classList.remove('active');
  nettoyerTouteLaCarte();
});

// =========================================================
//   ÉVÉNEMENTS — BOUTONS RÉGIONS (dock droit)
// =========================================================

document.querySelectorAll('.region-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const regionNom = btn.getAttribute('data-region-btn');
    const group = document.querySelector(`.region-svg-group[data-region-romaji="${regionNom}"]`);
    if (group) activerRegion(group.id);
    else console.error('Groupe SVG introuvable pour la région :', regionNom);
  });
});

// =========================================================
//   ÉVÉNEMENTS — BOUTONS ÎLES (dock droit)
// =========================================================

document.querySelectorAll('.big-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    if (document.body.classList.contains('fiche-mode')) return;

    const ile       = btn.getAttribute('data-super-ile-btn');
    const wasActive = btn.classList.contains('active');

    nettoyerTouteLaCarte();

    if (!wasActive) {
      btn.classList.add('active');
      if (ile === 'Ryūkyū') {
        okinawaLayer.classList.add('okinawa-visible');
        carteContainer.classList.add('okinawa-zoom');
        document.querySelector('#Okinawa').classList.add('superile-highlight');
      } else {
        document.querySelectorAll(`.prefecture[data-main-ile="${ile}"]`)
          .forEach(p => p.classList.add('superile-highlight'));
      }
    }
  });
});

// =========================================================
//   ÉVÉNEMENTS — BARRE HAUTE DES RÉGIONS
// =========================================================

document.querySelectorAll('.top-region-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const regionId = btn.getAttribute('data-target-region');
    activerRegion(regionId);
  });
});

// =========================================================
//   ÉVÉNEMENTS — CLIC SUR GROUPE RÉGION (carte SVG)
// =========================================================

document.querySelectorAll('.region-svg-group').forEach(group => {
  group.addEventListener('click', e => {
    if (!group.classList.contains('is-active-region')) return;
    e.stopPropagation();
    remplirFicheRegion(group.id);
  });
});

// =========================================================
//   ÉVÉNEMENTS — PRÉFECTURES (carte SVG)
// =========================================================

document.querySelectorAll('.prefecture').forEach(el => {

  el.addEventListener('click', e => {
    const regionParent = el.closest('.region-svg-group');
    if (regionParent?.classList.contains('is-active-region')) return;
    e.stopPropagation();
    ouvrirFiche(el.getAttribute('data-prefecture'));
  });

  el.addEventListener('mouseenter', () => {
    const regionParent = el.closest('.region-svg-group');
    if (regionParent?.classList.contains('is-active-region')) return;
    if (document.body.classList.contains('fiche-mode')) return;

    const id   = el.getAttribute('data-prefecture');
    const info = prefecture_INFOS[id];
    el.classList.add('illumine');
    if (info) {
      hoverLabel.textContent   = `${info.kanji} – ${info.romaji}`;
      hoverLabel.style.display = 'block';
    }
  });

  el.addEventListener('mouseleave', () => {
    const regionParent = el.closest('.region-svg-group');
    if (regionParent?.classList.contains('is-active-region')) return;
    el.classList.remove('illumine');
    hoverLabel.style.display = 'none';
  });
});

// =========================================================
//   ÉVÉNEMENTS — CLIC EXTÉRIEUR (désélection)
// =========================================================

document.addEventListener('click', e => {
  if (document.body.classList.contains('fiche-mode')) return;
  if (!e.target.closest('.boutons-iles, .boutons-regions, svg, .navbar')) {
    nettoyerTouteLaCarte();
  }
});

// =========================================================
//   RECHERCHE
// =========================================================

searchInput.addEventListener('input', e => {
  const valeur = e.target.value.toLowerCase().trim();
  searchSuggestions.innerHTML = '';
  indexSuggestion = -1;

  if (!valeur) {
    searchSuggestions.classList.remove('active');
    return;
  }

  const resultats = ordrePrefectures.filter(id => {
    const romaji = prefecture_INFOS[id].romaji.toLowerCase();
    return romaji.startsWith(valeur) || id.toLowerCase().startsWith(valeur);
  });

  if (resultats.length > 0) {
    resultats.forEach(id => {
      const info = prefecture_INFOS[id];
      const li   = document.createElement('li');
      li.classList.add('suggestion-item');
      li.innerHTML = `
        <img src="../drapeaux/${id}.svg" alt="Drapeau ${info.romaji}" class="sugg-flag">
        <span>${info.romaji}</span>
      `;
      li.addEventListener('click', () => {
        ouvrirFiche(id);
        searchInput.value = '';
        searchSuggestions.classList.remove('active');
      });
      searchSuggestions.appendChild(li);
    });
    searchSuggestions.classList.add('active');
  } else {
    searchSuggestions.classList.remove('active');
  }
});

searchInput.addEventListener('keydown', e => {
  const items = searchSuggestions.querySelectorAll('.suggestion-item');
  if (!searchSuggestions.classList.contains('active') || !items.length) return;

  if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
    e.preventDefault();
    indexSuggestion = (indexSuggestion + 1) % items.length;
    mettreEnValeurListe(items);
  } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
    e.preventDefault();
    indexSuggestion = (indexSuggestion - 1 + items.length) % items.length;
    mettreEnValeurListe(items);
  } else if (e.key === 'Enter') {
    e.preventDefault();
    const cible = indexSuggestion > -1 ? items[indexSuggestion] : items[0];
    cible?.click();
  } else if (e.key === 'Escape') {
    searchSuggestions.classList.remove('active');
    searchInput.blur();
  }
});

function mettreEnValeurListe(items) {
  items.forEach(item => item.classList.remove('keyboard-focus'));
  if (indexSuggestion >= 0 && indexSuggestion < items.length) {
    const itemActuel = items[indexSuggestion];
    itemActuel.classList.add('keyboard-focus');
    itemActuel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

document.addEventListener('click', e => {
  if (!e.target.closest('.search-group')) {
    searchSuggestions.classList.remove('active');
  }
});

// =========================================================
//   THÈME SOMBRE
// =========================================================

document.getElementById('nightModeToggle').addEventListener('change', () => {
  document.body.classList.toggle('dark-theme');
});
