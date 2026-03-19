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
const navFiche          = document.querySelector('.fiche-navbar');
const btnPrev           = document.getElementById('fiche-prev');
const btnNext           = document.getElementById('fiche-next');

const ordrePrefectures = Object.keys(prefecture_INFOS);
let indexActuel    = null;
let indexSuggestion = -1;

// =========================================================
//   UTILITAIRES
// =========================================================

function setFicheMode(actif, modeRegion = false) {
  document.body.classList.toggle('fiche-mode', actif);
  document.body.classList.toggle('region-active-mode', actif && modeRegion);
  navFiche.style.display = (actif && !modeRegion) ? 'flex' : 'none';
  document.documentElement.style.overflowY = actif ? 'auto' : '';
  document.body.style.overflowY             = actif ? 'auto' : '';
}

function nettoyerTouteLaCarte() {
  // Pas de protection deselecting — on nettoie tout sans condition
  document.querySelectorAll('.prefecture').forEach(p => {
    p.classList.remove('selected', 'superile-highlight', 'illumine', 'active-prefecture', 'deselecting');
  });
  document.querySelectorAll('.big-btn, .region-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.region-svg-group').forEach(g => g.classList.remove('is-active-region'));
  carteContainer.classList.remove('ryūkyū-zoom');
  // Ryūkyū reste toujours visible
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

  // Remplir les champs
  document.getElementById('ficheTitre').textContent = `${info.kanji} — ${info.romaji}`;
  document.getElementById('ficheTexte').textContent = info.desc;

  const elemCap = document.getElementById('ficheCapitale');
  if (elemCap) {
    elemCap.previousElementSibling.textContent = 'CAPITALE';
    elemCap.textContent = info.capitale || 'N/A';
  }
  document.getElementById('fichePop').textContent = info.population || 'N/A';

  // Villes principales
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
  imgDrapeau.src = `../drapeaux/${prefectureId}.svg`;
  imgDrapeau.style.display = 'block';

  // Compteur navigation
  document.getElementById('compteur-actuel').textContent = indexActuel + 1;
  document.getElementById('compteur-total').textContent  = ordrePrefectures.length;
  btnPrev.disabled = indexActuel === 0;
  btnNext.disabled = indexActuel === ordrePrefectures.length - 1;

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

  // Pas de villes ni drapeau en mode région
  const villesBloc = document.getElementById('ficheVillesBloc');
  if (villesBloc) villesBloc.style.display = 'none';

  const drapeau = document.querySelector('#prefecture-drapeau');
  if (drapeau) drapeau.style.display = 'none';

  document.querySelectorAll('.top-region-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-target-region') === idRegion);
  });

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
//   NAVIGATION ENTRE FICHES (avec animation villes)
// =========================================================

function transitionVersFiche(nouvelIndex) {
  const elementsAAnimer = document.querySelectorAll(
    '#ficheTitre, #prefecture-drapeau, .stats-grid, #ficheTexte, #pref-portrait-container, #ficheVillesBloc'
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
  if      (e.key === 'ArrowLeft'  && indexActuel > 0)                              transitionVersFiche(indexActuel - 1);
  else if (e.key === 'ArrowRight' && indexActuel < ordrePrefectures.length - 1)    transitionVersFiche(indexActuel + 1);
  else if (e.key === 'Escape')  document.getElementById('retourCarte').click();
});

// =========================================================
//   ÉVÉNEMENTS — RETOUR CARTE
// =========================================================

document.getElementById('retourCarte').addEventListener('click', () => {
  // Animation de déselection sur la préfecture active
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
//   ÉVÉNEMENTS — BARRE HAUTE DES RÉGIONS
// =========================================================

document.querySelectorAll('.top-region-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    activerRegion(btn.getAttribute('data-target-region'));
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
//   Sélecteurs corrigés : .dock-navigation-carte au lieu de
//   .boutons-iles / .boutons-regions qui n'existent pas
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
