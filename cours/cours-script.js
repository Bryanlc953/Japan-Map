let currentLesson = [];
let currentIndex = 0;
// =========================================================
//   TRANSITIONS ASCENSEUR : LANDING <-> COURS
// =========================================================
const btnDecouverteCours = document.getElementById('btn-decouverte-cours'); // Le bouton de ta section Apprentissage
const btnRetourCours = document.getElementById('btn-retour-cours');
const coursAppContainer = document.getElementById('cours-app-container');
const landingPage = document.getElementById('landing-page-intro'); //[cite: 3]

if (btnDecouverteCours && coursAppContainer && landingPage) {
    btnDecouverteCours.addEventListener('click', function(e) {
        e.preventDefault();
        coursAppContainer.style.display = 'block'; // On s'assure qu'il est visible
        
        // La landing monte, le cours monte
        setTimeout(() => {
            landingPage.style.transform = 'translateY(-100vh)';
            coursAppContainer.style.transform = 'translateY(0)';
        }, 10);
        
        setTimeout(() => { landingPage.style.display = 'none'; }, 800);
    });
}

if (btnRetourCours) {
    btnRetourCours.addEventListener('click', function() {
        landingPage.style.display = 'block';
        setTimeout(() => {
            landingPage.style.transform = 'translateY(0)';
            coursAppContainer.style.transform = 'translateY(100vh)';
        }, 10);
        setTimeout(() => { coursAppContainer.style.display = 'none'; }, 800);
    });
}

// =========================================================
//   LOGIQUE DU COURS (Générateur de vues & Canvas)
// =========================================================

// 1. Clic sur une leçon -> Ouvre la Théorie
function lancerLecon(idLecon) {
    document.querySelectorAll('.cours-onglet').forEach(el => el.style.display = 'none');
    document.getElementById('cours-tabs-nav').style.display = 'none';
    
    document.getElementById('vue-exercice').style.display = 'block';
    document.getElementById('module-trace').style.display = 'block'; 
    document.getElementById('cours-app-container').scrollTop = 0; 
    
    // --- NOUVEAU : Chargement des données ---
    currentLesson = leconsData[idLecon]; // On récupère l'Array de la leçon 1
    currentIndex = 0; // On commence au premier caractère (index 0)
    
    initCanvas();
    chargerEtapeActuelle(); // On charge le premier Hiragana !
}

// NOUVEAU : Fonction déclenchée par le bouton "Vérifier le tracé"
function validerExercice(type) {
    if (type === 'trace') {
        // Pour l'instant on valide d'office (la vraie vérification graphique viendra plus tard)
        currentIndex++; // On passe au caractère suivant (+1)

        // Est-ce qu'il reste des caractères dans la leçon ?
        if (currentIndex < currentLesson.length) {
            // Oui -> On charge le prochain
            chargerEtapeActuelle();
        } else {
            // Non -> La leçon est finie !
            document.getElementById('ex-progress').style.width = '100%';
            
            // Petite pause pour laisser la barre aller à 100%
            setTimeout(() => {
                alert("Bravo ! Vous avez terminé cette leçon 🎉");
                retourChoixLecons(); // On renvoie l'utilisateur à l'accueil des leçons
            }, 500);
        }
    }
}

function switchOnglet(ongletId, btnElement) {
    // 1. Cacher tous les onglets
    document.querySelectorAll('.cours-onglet').forEach(onglet => {
        onglet.style.display = 'none';
    });
    
    // 2. Retirer la classe 'active' de toutes les pilules
    document.querySelectorAll('.cours-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // 3. Afficher le bon onglet et rendre le bouton cliqué actif
    document.getElementById('onglet-' + ongletId).style.display = 'block';
    btnElement.classList.add('active');
}

// 2. Clic sur "Passer à la pratique" -> Ouvre les exercices
function lancerExercices() {
    document.getElementById('vue-theorie').style.display = 'none';
    document.getElementById('vue-exercice').style.display = 'block';
    
    // Afficher le module de tracé pour commencer
    document.getElementById('module-trace').style.display = 'block';
    
    // Remonter en haut
    document.getElementById('cours-app-container').scrollTop = 0;
    
    // Initialiser le canvas de dessin
    initCanvas();
}

// Fonction pour effacer uniquement le tracé de l'utilisateur sur le canvas
function effacerCanvas() {
    const canvas = document.getElementById('drawing-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        // Nettoie toute la surface du canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath(); // TRÈS IMPORTANT : Réinitialise les tracés pour éviter les bugs au coup de pinceau suivant[cite: 4]
    }
}
// Fonction pour rejouer l'animation du modèle (Bouton et Automatique)
function rejouerAnimationSVG() {
    // On force d'abord l'effacement du canvas
    effacerCanvas();
    
    // Ensuite, on s'occupe de relancer le SVG
    const svgContainer = document.getElementById('svg-animation-wrapper');
    if (!svgContainer) return;
    
    const ancienSVG = svgContainer.querySelector('svg');
    if (!ancienSVG) return;
    
    // On clone et on remplace pour forcer le CSS à rejouer les keyframes
    const nouveauSVG = ancienSVG.cloneNode(true);
    svgContainer.replaceChild(nouveauSVG, ancienSVG);
}

// 3. Bouton Retour (depuis la Théorie ou les Exercices)
function retourChoixLecons() {
    // 1. Cacher complètement la zone d'exercice actuelle
    document.getElementById('vue-exercice').style.display = 'none';
    
    // 2. Rendre à nouveau visible la barre d'onglets (pilules)
    const tabsNav = document.getElementById('cours-tabs-nav');
    if (tabsNav) {
        tabsNav.style.display = 'flex';
    }
    
    // 3. Simuler un clic sur la pilule "Leçons & Tracés" (le 2ème bouton, index 1)
    // Cela va automatiquement afficher l'onglet des leçons et activer la pilule rouge !
    const boutonsOnglets = document.querySelectorAll('.cours-tab-btn');
    if (boutonsOnglets && boutonsOnglets[1]) {
        boutonsOnglets[1].click();
    }
}

// --- GESTION DU DESSIN SUR LE CANVAS (Souris + Tactile) ---
function initCanvas() {
    const canvas = document.getElementById('drawing-canvas');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;

    // Style du pinceau (Gros pinceau noir style calligraphie)
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#1a202c';

    function startPosition(e) {
        isDrawing = true;
        draw(e);
    }

    function endPosition() {
        isDrawing = false;
        ctx.beginPath(); // Réinitialise le chemin pour le prochain trait
    }

    function draw(e) {
        if (!isDrawing) return;
        e.preventDefault(); // Empêche le scroll sur mobile
        
        // Gérer le tactile et la souris
        let clientX = e.clientX || e.touches[0].clientX;
        let clientY = e.clientY || e.touches[0].clientY;
        
        const rect = canvas.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    // Événements Souris
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mousemove', draw);

    // Événements Tactiles (Smartphones)
    canvas.addEventListener('touchstart', startPosition);
    canvas.addEventListener('touchend', endPosition);
    canvas.addEventListener('touchmove', draw);
}


// Fonction pour charger et afficher le caractère actuel
function chargerEtapeActuelle() {
    const etape = currentLesson[currentIndex];

    // 1. Mettre à jour le texte du titre (ex: "Dessinez le caractère : あ")
    document.querySelector('.target-kana').textContent = etape.kana;

    // 2. Injecter le nouveau SVG
    // Magie : l'injection d'un nouveau SVG relance automatiquement l'animation CSS !
    const svgWrapper = document.getElementById('svg-animation-wrapper');
    if (svgWrapper) {
        svgWrapper.innerHTML = etape.svg;
    }

    // 3. Mettre à jour la barre de progression
    const progressPourcent = (currentIndex / currentLesson.length) * 100;
    const progressBar = document.getElementById('ex-progress');
    if (progressBar) {
        progressBar.style.width = progressPourcent + '%';
    }

    // 4. Nettoyer le canvas pour le nouveau dessin
    effacerCanvas();
}