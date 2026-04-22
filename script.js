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
      
      // 1. On applique le zoom spécifique si c'est Ryūkyū
      if (ile === 'Ryūkyū') {
        carteContainer.classList.add('ryūkyū-zoom');
      } 
      
      // 2. On allume TOUTES les îles (y compris Okinawa pour Ryūkyū)
      document.querySelectorAll(`.prefecture[data-main-ile="${ile}"]`)
        .forEach(p => p.classList.add('superile-highlight'));
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

// =========================================================
//   GALERIE DES PRÉFECTURES ET FILTRES
// =========================================================

// On récupère les éléments (sans planter s'ils n'existent pas encore)
const galleryModal = document.getElementById('galleryModal');
const galleryGrid = document.getElementById('galleryGrid');
const btnOuvrirGalerie = document.getElementById('btnOuvrirGalerie');
const closeGalleryBtn = document.getElementById('closeGallery');
const sortSelect = document.getElementById('sortGallery');

// 1. Fonction magique pour transformer "7,5 millions" en vrai nombre (7500000)
function extraireNombrePopulation(popString) {
  if (!popString) return 0;
  let str = String(popString).toLowerCase().replace(/\s/g, '');
  let estEnMillions = str.includes('million') || str.includes('m');
  
  let numStr = str.replace(/[^0-9.,]/g, '').replace(',', '.');
  let num = parseFloat(numStr);
  
  if (isNaN(num)) return 0;
  return estEnMillions ? num * 1000000 : num;
}

// 2. Générer les cartes
function genererGalerie(listeIds = ordrePrefectures) {
  if (!galleryGrid) return; // Sécurité
  galleryGrid.innerHTML = ''; 
  
  listeIds.forEach(id => {
    const info = prefecture_INFOS[id]; 
    if (!info) return; // Sécurité si l'ID n'existe pas dans les infos

    const card = document.createElement('div');
    card.className = 'gallery-card';
    
    card.innerHTML = `
      <img src="flags/${id}.svg" alt="Drapeau ${info.nom}" class="gallery-flag" onerror="this.src='flags/default.svg'">
      <div class="gallery-name">${id}</div>
      <div class="gallery-pop">👥 ${info.population || 'Inconnue'}</div>
      <button class="gallery-btn" onclick="voirDepuisGalerie('${id}')">Voir sur la carte</button>
    `;
    galleryGrid.appendChild(card);
  });
}

// 3. Trier les données (CORRIGÉ)
function trierGalerie() {
  if (!sortSelect) {
    genererGalerie(ordrePrefectures); 
    return;
  }

  const critere = sortSelect.value;
  let listeTriee = [...ordrePrefectures];

  if (critere === 'az') {
    // On trie directement avec les clés a et b (qui sont les noms)
    listeTriee.sort((a, b) => a.localeCompare(b));
  } 
  else if (critere === 'za') {
    // Inversement
    listeTriee.sort((a, b) => b.localeCompare(a));
  } 
  else if (critere === 'pop-desc') {
    // Sécurité : on vérifie que la population existe bien pour éviter les crashs
    listeTriee.sort((a, b) => {
      let popA = prefecture_INFOS[a].population || '0';
      let popB = prefecture_INFOS[b].population || '0';
      return extraireNombrePopulation(popB) - extraireNombrePopulation(popA);
    });
  } 
  else if (critere === 'pop-asc') {
    listeTriee.sort((a, b) => {
      let popA = prefecture_INFOS[a].population || '0';
      let popB = prefecture_INFOS[b].population || '0';
      return extraireNombrePopulation(popA) - extraireNombrePopulation(popB);
    });
  }

  genererGalerie(listeTriee);
}

// 4. Écouteurs d'événements avec sécurités
if (sortSelect) {
  sortSelect.addEventListener('change', trierGalerie);
}

if (btnOuvrirGalerie && galleryModal) {
  btnOuvrirGalerie.addEventListener('click', () => {
    trierGalerie(); 
    galleryModal.classList.add('active');
  });
}

if (closeGalleryBtn && galleryModal) {
  closeGalleryBtn.addEventListener('click', () => {
    galleryModal.classList.remove('active');
  });
}

if (galleryModal) {
  galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) {
      galleryModal.classList.remove('active');
    }
  });
}

// Fonction globale appelée par le bouton "Voir sur la carte"
window.voirDepuisGalerie = function(id) {
  if (galleryModal) galleryModal.classList.remove('active');
  if (typeof ouvrirFiche === 'function') ouvrirFiche(id);
};
