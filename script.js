// --- DOM Elements ---
const carteContainer = document.getElementById('carteContainer');
const ficheTitre = document.getElementById('ficheTitre');
const ficheTexte = document.getElementById('ficheTexte');
const retourCarte = document.getElementById('retourCarte');
const ficheDetail = document.getElementById('ficheDetail');
const hoverLabel = document.getElementById('prefecture-hover-label');

// --- FONCTION : Afficher une fiche ---
function ouvrirFiche(prefectureId) {
  const info = prefecture_INFOS[prefectureId];
  if (!info) return;

  // 1. Sélection des éléments du DOM
  const ficheTitre = document.getElementById('ficheTitre');
  const ficheTexte = document.getElementById('ficheTexte');
  const ficheCapitale = document.getElementById('ficheCapitale');
  const fichePop = document.getElementById('fichePop');
  const imgDrapeau = document.getElementById('prefecture-drapeau');

  // 2. Reset visuel (Boutons et Carte)
  document.querySelectorAll('.big-btn, .region-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.prefecture').forEach(p => {
    p.classList.remove('superile-highlight', 'selected', 'dimmed', 'illumine', 'active-prefecture');
  });

  // Highlight de la préfecture sélectionnée sur la carte
  document.querySelectorAll(`.prefecture[data-prefecture="${prefectureId}"]`).forEach(p => {
    p.classList.add('active-prefecture');
  });

  // 3. Remplissage des textes de base
  ficheTitre.textContent = `${info.kanji} — ${info.romaji}`;
  ficheTexte.textContent = info.desc;
  ficheCapitale.textContent = info.capitale || "N/A";

  // 4. Animation du compteur de population
  if (info.population && info.population !== "N/A") {
    // On appelle la fonction d'animation que nous avons créée précédemment
    animerCompteur(fichePop, info.population);
  } else {
    fichePop.textContent = "N/A";
  }

  // 5. Gestion du drapeau
  if (imgDrapeau) {
    imgDrapeau.src = `../flags/${prefectureId}.svg`;
    imgDrapeau.style.display = "block";
    imgDrapeau.onerror = function() { this.style.display = "none"; };
  }

  // 6. Activation de l'interface "Mode Fiche"
  document.body.classList.add('fiche-mode');
  carteContainer.classList.add('minimized');
  hoverLabel.style.display = 'none';
  document.documentElement.style.overflowY = 'auto';

  // Petit délai pour laisser l'animation CSS se lancer avant de scroller
  setTimeout(() => {
    document.getElementById('ficheDetail').scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

// --- RETOUR CARTE ---
retourCarte.addEventListener('click', () => {
  document.body.classList.remove('fiche-mode');
  carteContainer.classList.remove('minimized');
  
  // ON CACHE LE DRAPEAU
  const imgDrapeau = document.getElementById('prefecture-drapeau');
  if (imgDrapeau) imgDrapeau.style.display = "none";

  document.querySelectorAll('.prefecture').forEach(p => p.classList.remove('selected', 'dimmed', 'illumine', 'active-prefecture'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// --- GESTION DES CLICS (prefectures ET Lacs) ---
document.querySelectorAll('.prefecture, .prefecture-annexe').forEach(el => {
  el.addEventListener('click', (e) => {
    e.stopPropagation();
    if (document.body.classList.contains('fiche-mode')) return;

    // Si c'est un lac, on récupère la prefecture liée, sinon on prend l'ID direct
    const prefectureId = el.getAttribute('data-prefecture') || el.getAttribute('data-prov-annexe');
    ouvrirFiche(prefectureId);
  });
});

// --- HOVER (Survol) ---
document.querySelectorAll('.prefecture').forEach(el => {
  el.addEventListener('mouseenter', (e) => {
    if (document.body.classList.contains('fiche-mode')) return;

    const prefectureId = e.currentTarget.getAttribute('data-prefecture');
    if (!prefectureId) return;

    // Nettoyage de sécurité : on retire l'illumination des autres au cas où
    document.querySelectorAll('.prefecture.illumine').forEach(p => p.classList.remove('illumine'));

    // On allume TOUTE la prefecture (îles incluses)
    document.querySelectorAll(`.prefecture[data-prefecture="${prefectureId}"]`).forEach(partie => {
      partie.classList.add('illumine');
      // On ne fait le appendChild QUE si nécessaire pour éviter de casser le focus de Chrome
      if (partie.parentNode.lastElementChild !== partie) {
          partie.parentNode.appendChild(partie);
      }
    });

    // Affichage du nom
    const info = prefecture_INFOS[prefectureId];
    if (info) {
      hoverLabel.textContent = `${info.kanji} – ${info.romaji}`;
      hoverLabel.style.display = 'block';
    }
  });

  el.addEventListener('mouseleave', () => {
    // On retire l'effet à absolument tout le monde
    document.querySelectorAll('.prefecture').forEach(p => {
      p.classList.remove('illumine');
    });
    hoverLabel.style.display = 'none';
  });
});
// --- BOUTONS ILES ---
document.querySelectorAll('.big-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const superile = btn.getAttribute('data-super-ile-btn');
    const isActive = btn.classList.contains('active');

    document.querySelectorAll('.region-btn.active, .big-btn.active').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.prefecture').forEach(p => p.classList.remove('selected', 'superile-highlight'));

    if (!isActive) {
      document.querySelectorAll(`.prefecture[data-main-ile="${superile}"]`).forEach(p => p.classList.add('superile-highlight'));
      btn.classList.add('active');
    }
  });
});

// --- BOUTONS REGIONS ---
document.querySelectorAll('.region-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const region = btn.getAttribute('data-region-btn');
    const isActive = btn.classList.contains('active');

    // On retire le highlight des îles (optionnel, selon tes préférences)
    // Mais on ne touche plus aux autres boutons de régions !
    document.querySelectorAll('.big-btn.active').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.prefecture.superile-highlight').forEach(p => p.classList.remove('superile-highlight'));

    if (isActive) {
      // Si le bouton était déjà actif, on l'éteint et on éteint ses prefectures
      btn.classList.remove('active');
      document.querySelectorAll(`.prefecture[data-region="${region}"]`).forEach(p => p.classList.remove('selected'));
    } else {
      // Sinon, on l'allume sans éteindre les autres régions déjà actives
      btn.classList.add('active');
      document.querySelectorAll(`.prefecture[data-region="${region}"]`).forEach(p => p.classList.add('selected'));
    }
  });
});
// --- RETOUR CARTE ---
retourCarte.addEventListener('click', () => {
  document.body.classList.remove('fiche-mode');
  carteContainer.classList.remove('minimized');
  document.querySelectorAll('.prefecture').forEach(p => p.classList.remove('selected', 'dimmed', 'illumine', 'active-prefecture'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- CLIC EXTERIEUR (Désactivé en mode fiche) ---
document.addEventListener('click', (e) => {
  // On vérifie si on est déjà en mode fiche
  const estEnModeFiche = document.body.classList.contains('fiche-mode');

  // Si on est en mode fiche, on NE FAIT RIEN (on ignore le clic extérieur)
  if (estEnModeFiche) return;

  // Si on n'est PAS en mode fiche, on garde le comportement de reset habituel
  if (!e.target.closest('.prefecture, .prefecture-annexe, .big-btn, .region-btn, #ficheDetail')) {
    document.querySelectorAll('.prefecture').forEach(p => p.classList.remove('selected', 'superile-highlight', 'dimmed', 'illumine'));
    document.querySelectorAll('.big-btn, .region-btn').forEach(b => b.classList.remove('active'));
    hoverLabel.style.display = 'none';
  }
});

// --- LOGIQUE DE RECHERCHE/ BARRE DE RECHERCHE ---
const searchInput = document.getElementById('searchPrefecture');

// Fonction pour enlever les accents et tirets (ex: Tōkyō -> tokyo)
function normaliserTexte(texte) {
  return texte
    .toLowerCase()
    .normalize("NFD") // Décompose les caractères accentués
    .replace(/[\u0300-\u036f]/g, "") // Enlève les accents classiques
    .replace(/ā/g, "a") // Gestion spécifique des tirets japonais (macrons)
    .replace(/ē/g, "e")
    .replace(/ī/g, "i")
    .replace(/ō/g, "o")
    .replace(/ū/g, "u");
}

searchInput.addEventListener('input', (e) => {
  const saisie = normaliserTexte(e.target.value.trim());
  
  // On nettoie l'illumination actuelle
  document.querySelectorAll('.prefecture').forEach(p => p.classList.remove('illumine'));

  if (saisie === "") return;

  for (const id in prefecture_INFOS) {
    const nomPrefNormalise = normaliserTexte(id); // "tokyo"
    const kanjiPref = prefecture_INFOS[id].kanji; // "越中" par exemple

    // Vérifie si le nom COMMENCE par la saisie OU si le Kanji contient la saisie
    if (nomPrefNormalise.startsWith(saisie) || kanjiPref.includes(saisie)) {
      document.querySelectorAll(`.prefecture[data-prefecture="${id}"]`).forEach(partie => {
        partie.classList.add('illumine');
      });
    }
  }
});

// Garde aussi l'écouteur pour la touche "Entrée"
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const premiereIlluminee = document.querySelector('.prefecture.illumine');
    if (premiereIlluminee) {
      const id = premiereIlluminee.getAttribute('data-prefecture');
      ouvrirFiche(id);
      searchInput.value = ""; 
    }
  }
});

// Gestion du Night Mode
const nightModeToggle = document.getElementById('nightModeToggle');

nightModeToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark-theme');
});



function animerCompteur(element, valeurFinale) {
  // 1. Nettoyage et préparation
  element.innerHTML = ''; // On vide l'élément
  element.classList.add('slot-machine');
  
  // On traite chaque caractère (chiffre ou espace)
  const caracteres = valeurFinale.split('');

  caracteres.forEach((char) => {
    if (/\d/.test(char)) {
      // Si c'est un chiffre, on crée une colonne de 0 à 9
      const column = document.createElement('div');
      column.className = 'slot-column';
      
      // On crée les chiffres de 0 à 9 dans la colonne
      for (let i = 0; i <= 9; i++) {
        const digit = document.createElement('div');
        digit.className = 'slot-digit';
        digit.textContent = i;
        column.appendChild(digit);
      }
      
      element.appendChild(column);

      // On déclenche le mouvement après un léger délai pour l'animation
      setTimeout(() => {
        const targetDigit = parseInt(char, 10);
        const moveY = targetDigit * 1.5; // 1.5 rem correspond à la hauteur définie en CSS
        column.style.transform = `translateY(-${moveY}rem)`;
      }, 20);

    } else {
      // Si c'est un espace ou un séparateur, on l'ajoute tel quel
      const separator = document.createElement('div');
      separator.className = 'slot-separator';
      separator.textContent = char;
      element.appendChild(separator);
    }
  });
  
  // On ajoute l'unité à la fin
  const unit = document.createElement('div');
  unit.style.marginLeft = "8px";
  unit.textContent = " hab";
  element.appendChild(unit);

}
