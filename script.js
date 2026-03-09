// --- Éléments du DOM ---
const carteContainer = document.getElementById('carteContainer');
const ficheDetail = document.getElementById('ficheDetail');
const searchInput = document.getElementById('searchPrefecture');
const okinawaLayer = document.getElementById("okinawaLayer");
const btnOkinawa = document.querySelector('[data-super-ile-btn="Okinawa"]');
const hoverLabel = document.getElementById('prefecture-hover-label');

const ordrePrefectures = Object.keys(prefecture_INFOS);
let indexActuel = null;

// --- FONCTIONS DE NETTOYAGE ---
function nettoyerTouteLaCarte() {
  document.querySelectorAll('.prefecture').forEach(p => {
    p.classList.remove('selected', 'superile-highlight', 'illumine', 'active-prefecture');
  });
  document.querySelectorAll('.big-btn, .region-btn').forEach(btn => btn.classList.remove('active'));
  carteContainer.classList.remove('okinawa-zoom');
  okinawaLayer.classList.remove("okinawa-visible");
}

// --- OUVRIR FICHE ---
function ouvrirFiche(prefectureId) {
  const info = prefecture_INFOS[prefectureId];
  if (!info) return;

  // Avant d'ouvrir, on nettoie tout pour que la mini-carte soit propre
  nettoyerTouteLaCarte();
  indexActuel = ordrePrefectures.indexOf(prefectureId);

  // Allumer la préfecture sur la mini-carte (en haut à droite)
  document.querySelectorAll(`.prefecture[data-prefecture="${prefectureId}"]`).forEach(p => {
    p.classList.add('active-prefecture');
  });


  // Textes et UI
  document.getElementById('ficheTitre').textContent = `${info.kanji} — ${info.romaji}`;
  document.getElementById('ficheTexte').textContent = info.desc;
  document.getElementById('ficheCapitale').textContent = info.capitale || "N/A";
  document.getElementById('fichePop').textContent = info.population || "N/A";

  const imgDrapeau = document.getElementById('prefecture-drapeau');
  imgDrapeau.src = `../drapeaux/${prefectureId}.svg`;
  imgDrapeau.style.display = "block";

  // Navigation
  document.getElementById('compteur-actuel').textContent = indexActuel + 1;
  document.getElementById('compteur-total').textContent = ordrePrefectures.length;

  // Activation Mode Fiche
  document.body.classList.add('fiche-mode');
  carteContainer.classList.add('minimized');
  okinawaLayer.classList.add("okinawa-visible");
  
  document.documentElement.style.overflowY = 'auto'; 
  document.body.style.overflowY = 'auto';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- BOUTONS RÉGIONS (SÉLECTION MULTIPLE) ---
document.querySelectorAll('.region-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (document.body.classList.contains('fiche-mode')) return;

    const region = btn.getAttribute('data-region-btn');
    
    // Désactive les îles pour éviter les conflits de couleurs
    document.querySelectorAll('.big-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.prefecture').forEach(p => p.classList.remove('superile-highlight'));
    carteContainer.classList.remove('okinawa-zoom');
    okinawaLayer.classList.remove("okinawa-visible");

    // Toggle de la région
    const isActive = btn.classList.toggle('active');
    document.querySelectorAll(`.prefecture[data-region="${region}"]`).forEach(p => {
      p.classList.toggle('selected', isActive);
    });
  });
});

// --- BOUTONS ÎLES (SÉLECTION UNIQUE) ---
document.querySelectorAll('.big-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (document.body.classList.contains('fiche-mode')) return;

    const ile = btn.getAttribute('data-super-ile-btn');
    const wasActive = btn.classList.contains('active');

    nettoyerTouteLaCarte();

    if (!wasActive) {
      btn.classList.add('active');
      if (ile === "Okinawa") {
        okinawaLayer.classList.add("okinawa-visible");
        carteContainer.classList.add("okinawa-zoom");
        document.querySelector('#Okinawa').classList.add('superile-highlight');
      } else {
        document.querySelectorAll(`.prefecture[data-main-ile="${ile}"]`).forEach(p => p.classList.add('superile-highlight'));
      }
    }
  });
});

// --- CLIC EXTÉRIEUR ---
document.addEventListener('click', (e) => {
  if (!document.body.classList.contains('fiche-mode')) {
    if (!e.target.closest('.boutons-iles') && 
        !e.target.closest('.boutons-regions') && 
        !e.target.closest('svg') && 
        !e.target.closest('.navbar')) {
      nettoyerTouteLaCarte();
    }
  }
});

// --- RETOUR CARTE ---
document.getElementById('retourCarte').addEventListener('click', () => {
  document.body.classList.remove('fiche-mode');
  carteContainer.classList.remove('minimized', 'okinawa-zoom');
  
  okinawaLayer.classList.remove("okinawa-visible");
  btnOkinawa.classList.remove("active");

  document.documentElement.style.overflowY = 'hidden';
  document.body.style.overflowY = 'hidden';
  nettoyerTouteLaCarte();
});

// --- INTERACTION PREFECTURES ---
document.querySelectorAll('.prefecture').forEach(el => {
  el.addEventListener('click', (e) => {
    e.stopPropagation();
    ouvrirFiche(el.getAttribute('data-prefecture'));
  });

  el.addEventListener('mouseenter', () => {
    if (document.body.classList.contains('fiche-mode')) return;
    const id = el.getAttribute('data-prefecture');
    const info = prefecture_INFOS[id];
    el.classList.add('illumine');
    if (info) {
      hoverLabel.textContent = `${info.kanji} – ${info.romaji}`;
      hoverLabel.style.display = 'block';
    }
  });

  el.addEventListener('mouseleave', () => {
    el.classList.remove('illumine');
    hoverLabel.style.display = 'none';
  });
});

// --- NAVIGATION BOUTONS (AVEC TRANSITION DOUCE) ---
function transitionVersFiche(nouvelIndex) {
  const elementsAAnimer = document.querySelectorAll('#ficheTitre, #prefecture-drapeau, .stats-grid, #ficheTexte, #pref-portrait-container');
  const btnPrev = document.getElementById('fiche-prev');
  const btnNext = document.getElementById('fiche-next');
  
  btnPrev.style.pointerEvents = 'none';
  btnNext.style.pointerEvents = 'none';

  elementsAAnimer.forEach(el => el.classList.add('fiche-transition-out'));

  setTimeout(() => {
    ouvrirFiche(ordrePrefectures[nouvelIndex]);

    elementsAAnimer.forEach(el => {
      el.style.animation = 'none';
      el.offsetHeight; 
      el.style.animation = null;
      el.classList.remove('fiche-transition-out');
    });

    btnPrev.style.pointerEvents = 'auto';
    btnNext.style.pointerEvents = 'auto';
  }, 200);
}

document.getElementById('fiche-prev').addEventListener('click', (e) => {
  e.stopPropagation();
  if (indexActuel > 0) transitionVersFiche(indexActuel - 1);
});

document.getElementById('fiche-next').addEventListener('click', (e) => {
  e.stopPropagation();
  if (indexActuel < ordrePrefectures.length - 1) transitionVersFiche(indexActuel + 1);
});

// --- RECHERCHE ET THEME ---
document.getElementById('nightModeToggle').addEventListener('change', () => document.body.classList.toggle('dark-theme'));

const searchSuggestions = document.getElementById('search-suggestions');
let indexSuggestion = -1; // Mémorise la position dans la liste (-1 = rien sélectionné)

// 1. Quand l'utilisateur tape une lettre
searchInput.addEventListener('input', (e) => {
  const valeur = e.target.value.toLowerCase().trim();
  searchSuggestions.innerHTML = ''; 
  indexSuggestion = -1; // On remet le compteur à zéro si on tape une nouvelle lettre

  if (valeur.length === 0) {
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
      const li = document.createElement('li');
      li.classList.add('suggestion-item');
      li.textContent = info.romaji; 
      
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

// 2. Écouter le clavier (Flèches, Tab, Entrée)
searchInput.addEventListener('keydown', (e) => {
  const items = searchSuggestions.querySelectorAll('.suggestion-item');
  
  // S'il n'y a pas de menu ouvert, on ne fait rien
  if (!searchSuggestions.classList.contains('active') || items.length === 0) return;

  // FLECHE BAS ou TAB (Descendre)
  if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
    e.preventDefault(); // Empêche la page de scroller ou de changer de champ
    indexSuggestion++;
    if (indexSuggestion >= items.length) indexSuggestion = 0; // Boucle vers le haut si on dépasse
    mettreEnValeurListe(items);
  } 
  // FLECHE HAUT ou SHIFT+TAB (Monter)
  else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
    e.preventDefault();
    indexSuggestion--;
    if (indexSuggestion < 0) indexSuggestion = items.length - 1; // Boucle vers le bas
    mettreEnValeurListe(items);
  } 
  // ENTRÉE (Valider)
  else if (e.key === 'Enter') {
    e.preventDefault();
    if (indexSuggestion > -1) {
      items[indexSuggestion].click(); // Simule un clic sur l'élément sélectionné
    } else {
      items[0].click(); // Si l'utilisateur fait juste "Entrée" sans descendre, on ouvre le 1er résultat
    }
  }
  // ECHAP (Fermer le menu)
  else if (e.key === 'Escape') {
    searchSuggestions.classList.remove('active');
    searchInput.blur(); // Enlève le focus de la barre de recherche
  }
});

// 3. Fonction pour déplacer visuellement la sélection
function mettreEnValeurListe(items) {
  // On nettoie toutes les lignes
  items.forEach(item => item.classList.remove('keyboard-focus'));
  
  // On illumine la bonne ligne
  if (indexSuggestion > -1 && indexSuggestion < items.length) {
    const itemActuel = items[indexSuggestion];
    itemActuel.classList.add('keyboard-focus');
    
    // MAGIQUE : Si on descend très bas, le menu scroll automatiquement pour suivre la sélection !
    itemActuel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// 4. Fermer le menu si on clique ailleurs
document.addEventListener('click', (e) => {
  if (!e.target.closest('.search-group')) {
    searchSuggestions.classList.remove('active');
  }
});
