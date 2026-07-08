// =========================================================
//   LOGIQUE DES TRANSITIONS (EFFET ASCENSEUR CENTRALISÉ)
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
    // Les boutons
    const btnDecouverteMap = document.getElementById('btn-decouverte');
    const btnDecouverteCours = document.getElementById('btn-decouverte-cours');
    const btnRetourLanding = document.getElementById('btn-retour-landing');
    
    // Les conteneurs
    const landingPage = document.getElementById('landing-page-intro');
    const mapAppContainer = document.getElementById('map-app-container');
    const coursAppContainer = document.getElementById('cours-app-container');

    // 1. ACTION : OUVRIR LA CARTE
    if (btnDecouverteMap && mapAppContainer && landingPage) {
        btnDecouverteMap.addEventListener('click', (e) => {
            e.preventDefault();
            // On s'assure que le cours est caché
            if (coursAppContainer) coursAppContainer.style.display = 'none';
            
            mapAppContainer.style.display = 'block'; 
            setTimeout(() => {
                landingPage.style.transform = 'translateY(-100vh)';
                mapAppContainer.style.transform = 'translateY(0)';
            }, 10);
            
            setTimeout(() => { landingPage.style.display = 'none'; }, 800);
        });
    }

    // 2. ACTION : OUVRIR LE COURS
    if (btnDecouverteCours && coursAppContainer && landingPage) {
        btnDecouverteCours.addEventListener('click', (e) => {
            e.preventDefault();
            // On s'assure que la carte est cachée pour éviter les superpositions
            if (mapAppContainer) {
                mapAppContainer.style.transform = 'translateY(100vh)';
                mapAppContainer.style.display = 'none';
            }
            
            coursAppContainer.style.display = 'block';
            setTimeout(() => {
                landingPage.style.transform = 'translateY(-100vh)';
                coursAppContainer.style.transform = 'translateY(0)';
            }, 10);
            
            setTimeout(() => { landingPage.style.display = 'none'; }, 800);
        });
    }

    // 3. ACTION : RETOUR À L'ACCUEIL (Bouton Maison Premium)
    if (btnRetourLanding && landingPage) {
        btnRetourLanding.addEventListener('click', () => {
            landingPage.style.display = 'block';
            
            setTimeout(() => {
                landingPage.style.transform = 'translateY(0)';
                // On renvoie la carte ET le cours vers le bas (peu importe lequel était ouvert)
                if (mapAppContainer) mapAppContainer.style.transform = 'translateY(100vh)';
                if (coursAppContainer) coursAppContainer.style.transform = 'translateY(100vh)';
            }, 10);
            
            // On coupe l'affichage après l'animation
            setTimeout(() => { 
                if (coursAppContainer) coursAppContainer.style.display = 'none'; 
            }, 800);
        });
    }
});

// Le reste de ton fichier (Sidebar, Pilule login...) reste inchangé en dessous !
// =========================================================
//   LOGIQUE DE LA PILULE DE CONNEXION (DROPDOWN)
// =========================================================

const loginToggleBtn = document.getElementById('loginToggleBtn');
const loginDropdown = document.getElementById('loginDropdown');

if (loginToggleBtn && loginDropdown) {
    // Ouvrir / Fermer au clic sur l'icône utilisateur
    loginToggleBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Empêche le clic de se propager au document
        loginDropdown.classList.toggle('active');
    });

    // Fermer le menu si on clique n'importe où ailleurs sur la page
    document.addEventListener('click', function(e) {
        if (!loginDropdown.contains(e.target)) {
            loginDropdown.classList.remove('active');
        }
    });

    // Empêcher la fermeture si on clique à l'intérieur du formulaire
    loginDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

// =========================================================
//   LOGIQUE DU MENU LATÉRAL (SIDEBAR)
// =========================================================

const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
const sidebarMenu = document.getElementById('sidebarMenu');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const sidebarDarkToggle = document.getElementById('sidebarDarkToggle');

if (sidebarToggleBtn && sidebarMenu && sidebarOverlay) {
    
    // Fonction pour ouvrir la sidebar
    function openSidebar() {
        sidebarMenu.classList.add('active');
        sidebarOverlay.classList.add('active');
    }

    // Fonction pour fermer la sidebar
    function closeSidebar() {
        sidebarMenu.classList.remove('active');
        sidebarOverlay.classList.remove('active');
    }

    // Événements d'ouverture et fermeture
    sidebarToggleBtn.addEventListener('click', openSidebar);
    if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', closeSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);

    // Écouteur sur le Toggle Switch du Mode Sombre
    // Écouteur sur le Toggle Switch du Mode Sombre
if (sidebarDarkToggle) {
    sidebarDarkToggle.addEventListener('change', function() {
        if (this.checked) {
            // On ajoute la classe au body : tout bascule en sombre d'un coup
            document.body.classList.add('dark-theme');
            console.log("Mode sombre activé !");
        } else {
            // On retire la classe : on revient au mode clair
            document.body.classList.remove('dark-theme');
            console.log("Mode sombre désactivé !");
        }
    });
}}

