// =========================================================
//   ÉLÉMENTS DU DOM
// =========================================================
const carteContainer    = document.getElementById('carteContainer');
const ficheDetail       = document.getElementById('ficheDetail');
const searchInput       = document.getElementById('searchPrefecture');
const ryūkyūLayer      = document.getElementById('ryūkyūLayer');
const btnRyūkyū        = document.querySelector('[data-super-ile-btn="Ryūkyū"]');
const hoverLabel        = document.getElementById('prefecture-hover-label');
const searchSuggestions = document.getElementById('search-suggestions');


// =========================================================
//   ÉTAT
// =========================================================
const ordrePrefectures = Object.keys(prefecture_INFOS);
let indexActuel        = null;
let indexSuggestion    = -1;

const ordreRegions = [
  'region-Hokkaidō',
  'region-Tōhoku',
  'region-Kantō',
  'region-Chūbu',
  'region-Kansai',
  'region-Chūgoku',
  'region-Shikoku',
  'region-Kyūshū'
];
let indexRegionActuel = null;
let navigationBloquee = false;

// =========================================================
//   UTILITAIRES
// =========================================================

function setFicheMode(actif, modeRegion = false) {
  document.body.classList.toggle('fiche-mode', actif);
  document.body.classList.toggle('region-active-mode', actif && modeRegion);
  document.documentElement.style.overflowY = actif ? 'auto' : '';
  document.body.style.overflowY             = actif ? 'auto' : '';
}


function nettoyerTouteLaCarte() {
  document.querySelectorAll('.prefecture').forEach(p => {
    p.classList.remove('selected', 'superile-highlight', 'illumine', 'active-prefecture', 'deselecting');
  });
  document.querySelectorAll('.big-btn, .region-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.region-svg-group').forEach(g => g.classList.remove('is-active-region'));
  carteContainer.classList.remove('ryūkyū-zoom');
}

// =========================================================
//   FICHE PRÉFECTURE
// =========================================================

function ouvrirFiche(prefectureId) {
  const info = prefecture_INFOS[prefectureId];
  if (!info) return;

  nettoyerTouteLaCarte();
  indexActuel = ordrePrefectures.indexOf(prefectureId);
  document.querySelectorAll(`.prefecture[data-prefecture="${prefectureId}"]`)
    .forEach(p => p.classList.add('active-prefecture'));

  document.getElementById('ficheTitre').textContent = `${info.kanji} — ${info.romaji}`;
  document.getElementById('ficheTexte').textContent = info.desc;

  const elemCap = document.getElementById('ficheCapitale');
  if (elemCap) {
    elemCap.previousElementSibling.textContent = 'CAPITALE';
    elemCap.textContent = info.capitale || 'N/A';
  }

  document.getElementById('fichePop').textContent = info.population || 'N/A';

  const villesListe = document.getElementById('ficheVilles');
  const villesBloc  = document.getElementById('ficheVillesBloc');
  if (villesListe) {
    if (info.villes?.length) {
      villesListe.innerHTML = info.villes.map(v => `<li class="ville-item">${v}</li>`).join('');
      if (villesBloc) villesBloc.style.display = 'block';
    } else {
      villesListe.innerHTML = '';
      if (villesBloc) villesBloc.style.display = 'none';
    }
  }

  const stats = document.querySelector('.stats-grid');
  if (stats) stats.style.display = 'grid';

  const imgDrapeau = document.getElementById('prefecture-drapeau');
  imgDrapeau.src = `flags/${prefectureId}.svg`;
  imgDrapeau.style.display = 'block';

  setFicheMode(true);
  carteContainer.classList.add('minimized');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =========================================================
//   FICHE RÉGION
// =========================================================

function remplirFicheRegion(idRegion) {
  nettoyerTouteLaCarte();

  const info = region_INFOS[idRegion];
  if (!info) return;

  indexRegionActuel = ordreRegions.indexOf(idRegion);

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

  const villesBloc = document.getElementById('ficheVillesBloc');
  if (villesBloc) villesBloc.style.display = 'none';

  const drapeau = document.querySelector('#prefecture-drapeau');
  if (drapeau) drapeau.style.display = 'none';

  setFicheMode(true, true);
  carteContainer.classList.add('minimized');
}

function activerRegion(idRegion) {
  const group = document.getElementById(idRegion)
    || document.querySelector(`.region-svg-group[data-region-romaji="${idRegion}"]`);
  if (!group) { console.error('Région SVG introuvable :', idRegion); return; }

  const regionNom = group.getAttribute('data-region-romaji') || idRegion;
  const cleanNom  = regionNom.replace('region-', '');

  remplirFicheRegion(group.id);

  group.classList.add('is-active-region');
  document.querySelectorAll(`.prefecture[data-region="${cleanNom}"]`)
    .forEach(p => p.classList.add('selected'));

  const dockBtn = document.querySelector(`.region-btn[data-region-btn="${cleanNom}"]`);
  if (dockBtn) dockBtn.classList.add('active');
}

// =========================================================
//   TRANSITIONS ANIMÉES
// =========================================================

function transitionVersFiche(nouvelIndex) {
  if (navigationBloquee) return;
  navigationBloquee = true;

  const elementsAAnimer = document.querySelectorAll(
    '#ficheTitre, #prefecture-drapeau, .stats-grid, #ficheTexte, #pref-portrait-container, #ficheVillesBloc'
  );

  elementsAAnimer.forEach(el => el.classList.add('fiche-transition-out'));

  setTimeout(() => {
    ouvrirFiche(ordrePrefectures[nouvelIndex]);
    elementsAAnimer.forEach(el => {
      el.style.animation = 'none';
      el.offsetHeight; // reflow
      el.style.animation = null;
      el.classList.remove('fiche-transition-out');
    });
    navigationBloquee = false;
  }, 200);
}

function transitionVersRegion(nouvelIndex) {
  if (navigationBloquee) return;
  navigationBloquee = true;

  const elementsAAnimer = document.querySelectorAll(
    '#ficheTitre, .stats-grid, #ficheTexte'
  );

  elementsAAnimer.forEach(el => el.classList.add('fiche-transition-out'));

  setTimeout(() => {
    activerRegion(ordreRegions[nouvelIndex]);
    elementsAAnimer.forEach(el => {
      el.style.animation = 'none';
      el.offsetHeight; // reflow
      el.style.animation = null;
      el.classList.remove('fiche-transition-out');
    });
    navigationBloquee = false;
  }, 200);
}

// =========================================================
//   NAVIGATION CLAVIER — flèches + Escape
//   Séparé : mode fiche-préfecture vs mode région
// =========================================================

document.addEventListener('keydown', e => {
  if (!document.body.classList.contains('fiche-mode')) return;
  if (document.activeElement === searchInput) return;

  const isRegionMode = document.body.classList.contains('region-active-mode');

  if (e.key === 'Escape') {
    e.preventDefault();
    document.getElementById('retourCarte').click();
    return;
  }

  if (isRegionMode) {
    // Navigation entre régions
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (indexRegionActuel > 0) transitionVersRegion(indexRegionActuel - 1);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      if (indexRegionActuel < ordreRegions.length - 1) transitionVersRegion(indexRegionActuel + 1);
    }
  } else {
    // Navigation entre préfectures
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (indexActuel > 0) transitionVersFiche(indexActuel - 1);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      if (indexActuel < ordrePrefectures.length - 1) transitionVersFiche(indexActuel + 1);
    }
  }
});

// =========================================================
//   RETOUR CARTE
// =========================================================

document.getElementById('retourCarte').addEventListener('click', () => {
  const prefActive = document.querySelector('.prefecture.active-prefecture');
  if (prefActive) {
    prefActive.classList.add('deselecting');
    prefActive.classList.remove('active-prefecture');
    prefActive.addEventListener('animationend', () => {
      prefActive.classList.remove('deselecting');
    }, { once: true });
  }

  setFicheMode(false);
  carteContainer.classList.remove('minimized', 'ryūkyū-zoom');
  btnRyūkyū.classList.remove('active');
  nettoyerTouteLaCarte();
  indexActuel = null;
  indexRegionActuel = null;
});

// =========================================================
//   BOUTONS RÉGIONS (dock droit)
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
//   BOUTONS ÎLES (dock droit)
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
        carteContainer.classList.add('ryūkyū-zoom');
        document.querySelector('#ryūkyū').classList.add('superile-highlight');
      } else {
        document.querySelectorAll(`.prefecture[data-main-ile="${ile}"]`)
          .forEach(p => p.classList.add('superile-highlight'));
      }
    }
  });
});

// =========================================================
//   CLIC SUR GROUPE RÉGION (carte SVG)
// =========================================================

document.querySelectorAll('.region-svg-group').forEach(group => {
  group.addEventListener('click', e => {
    if (!group.classList.contains('is-active-region')) return;
    e.stopPropagation();
    remplirFicheRegion(group.id);
  });
});

// =========================================================
//   PRÉFECTURES (carte SVG)
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
//   CLIC EXTÉRIEUR (désélection)
// =========================================================

document.addEventListener('click', e => {
  if (document.body.classList.contains('fiche-mode')) return;
  if (!e.target.closest('.dock-navigation-carte, .mobile-bottom-bar, svg, .navbar')) {
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
        <img src="flags/${id}.svg" alt="Drapeau ${info.romaji}" class="sugg-flag">
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
    (indexSuggestion > -1 ? items[indexSuggestion] : items[0])?.click();
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


// =========================================================
//   HEURE LOCALE DU JAPON (JST = UTC+9)
// =========================================================

function mettreAJourHeureJapon() {
  const el = document.getElementById('heureJapon');
  if (!el) return;
  el.textContent = new Date().toLocaleTimeString('fr-FR', {
    timeZone: 'Asia/Tokyo',
    hour: '2-digit',
    minute: '2-digit',
  });
}

setInterval(mettreAJourHeureJapon, 1000);
mettreAJourHeureJapon();
