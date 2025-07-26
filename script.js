


// 1. Infos provinces
const PROVINCE_INFOS = {

  "Satsuma": { kanji: "薩摩", hiragana: "さつま", desc: "Ancienne province du sud du Kyūshū." },
  "Kii": { kanji: "紀伊", hiragana: "きい", desc: "Province historique dans la région de Kansai." },
  "Hyūga": { kanji: "日向", hiragana: "ひゅうが", desc: "Province sur la côte est de Kyūshū." },
  "Ōsumi": { kanji: "大隅", hiragana: "おおすみ", desc: "Région du sud-est du Kyūshū." },
  "Chikugo": { kanji: "筑後", hiragana: "ちくご", desc: "Province du nord du Kyūshū." },
  "Hizen": { kanji: "肥前", hiragana: "ひぜん", desc: "Province de l’ouest de Kyūshū." },
  "Honshū": { kanji: "本州", hiragana: "ほんしゅう", desc: "L’île principale du Japon." },
  "Shikoku": { kanji: "四国", hiragana: "しこく", desc: "La plus petite des quatre îles principales." },
  "Kyūshū": { kanji: "九州", hiragana: "きゅうしゅう", desc: "Grande île au sud-ouest." },
  "Higo": { kanji: "肥後", hiragana: "ひご", desc: "je sais pas encore." },
  "Bungo": { kanji: "豊後", hiragana: "ぶんご", desc: "je sais pas encore." },
  "Buzen": { kanji: "豊前", hiragana: "ぶぜん", desc: "je sais pas encore." },
  "Chikuzen": { kanji: "筑前", hiragana: "ちくぜん", desc: "je sais pas encore." },
  "Tsushima":  { kanji: "対馬", hiragana: "つしま", desc: "je sais pas encore." },
  "Iki": { kanji: "壱岐", hiragana: "いき", desc: "je sais pas encore." },
  "Iyo": { kanji: "伊予", hiragana: "いよ", desc: "je sais pas encore." },
  "Tosa": { kanji: "土佐", hiragana: "とさ", desc: "je sais pas encore." },
  "Awa_shikoku": { kanji: "阿波", hiragana: "あわ", romaji: "Awa (Shikoku)", desc: "je sais pas encore." },
  "Sanuki": { kanji: "讃岐", hiragana: "さぬき", desc: "je sais pas encore." },
  "Nagato": { kanji: "長門", hiragana: "ながと", desc: "je sais pas encore." },
  "Suō": { kanji: "周防", hiragana: "すおう", desc: "je sais pas encore." },
  "Aki": { kanji: "安芸", hiragana: "あき", desc: "je sais pas encore." },
  "Bingo": { kanji: "備後", hiragana: "びんご", desc: "je sais pas encore." },
  "Bitchū": { kanji: "備中/備州", hiragana: "びっちゅう", desc: "je sais pas encore." },
  "Mimasaka": { kanji: "美作", hiragana: "みまさか", desc: "je sais pas encore." },
  "Bizen": { kanji: "備前", hiragana: "びぜん", desc: "je sais pas encore." },
  "Harima": { kanji: "播磨", hiragana: "はりま", desc: "je sais pas encore." },
  "Iwami": { kanji: "石見", hiragana: "いわみ", desc: "je sais pas encore." },
  "Izumo": { kanji: "出雲", hiragana: "いずも", desc: "je sais pas encore." },
  "Hōki": { kanji: "伯耆", hiragana: "ほうき", desc: "je sais pas encore." },
  "Oki": { kanji: "隠岐", hiragana: "おき", desc: "je sais pas encore." },
  "Inaba": { kanji: "因幡", hiragana: "いなば", desc: "je sais pas encore." },
  "Tajima": { kanji: "但馬", hiragana: "たじま", desc: "je sais pas encore." },
  "Tango": { kanji: "丹後", hiragana: "たんご", desc: "je sais pas encore." },
  "Tanba": { kanji: "丹波", hiragana: "たんば", desc: "je sais pas encore." },
  "Yamato": { kanji: "大和", hiragana: "やまと", desc: "je sais pas encore." },
  "Kawachi": { kanji: "河内", hiragana: "かわち", desc: "je sais pas encore." },
  "Yamashiro": { kanji: "山城", hiragana: "やましろ", desc: "je sais pas encore." },
  "Izumi": { kanji: "和泉", hiragana: "いずみ", desc: "je sais pas encore." },
  "Settsu": { kanji: "摂津", hiragana: "せっつ", desc: "je sais pas encore." },
  "Wakasa": { kanji: "若狭", hiragana: "わかさ", desc: "je sais pas encore." },
  "Echizen": { kanji: "越前", hiragana: "えちぜん", desc: "je sais pas encore." },
  "Kaga": { kanji: "加賀", hiragana: "かが", desc: "je sais pas encore." },
  "Etchū": { kanji: "越中", hiragana: "えっちゅう", desc: "je sais pas encore." },
  "Noto": { kanji: "能登", hiragana: "のと", desc: "je sais pas encore." },
  "Echigo": { kanji: "越後", hiragana: "えちご", desc: "je sais pas encore." },
  "Sado": { kanji: "佐渡", hiragana: "さど", desc: "je sais pas encore." },
  "Shima": { kanji: "志摩", hiragana: "しま", desc: "je sais pas encore." },
  "Ise": { kanji: "伊勢", hiragana: "いせ", desc: "je sais pas encore." },
  "Iga": { kanji: "伊賀", hiragana: "いさ", desc: "je sais pas encore." },
  "Owari": { kanji: "尾張", hiragana: "おわり", desc: "je sais pas encore." },
  "Mikawa": { kanji: "三河", hiragana: "まかわ", desc: "je sais pas encore." },
  "Suruga": { kanji: "讃岐", hiragana: "するが", desc: "je sais pas encore." },
  "Tōtōmi": { kanji: "遠江", hiragana: "とうとうみ", desc: "je sais pas encore." },
  "Izu": { kanji: "伊豆", hiragana: "いず", desc: "je sais pas encore." },
  "Kai": { kanji: "甲斐", hiragana: "かい", desc: "je sais pas encore." },
  "Sagami": { kanji: "相模", hiragana: "さがみ", desc: "je sais pas encore." },
  "Musashi": { kanji: "武蔵", hiragana: "むさし", desc: "je sais pas encore." },
  "Shimōsa": { kanji: "下総", hiragana: "しもうさ", desc: "je sais pas encore." },
  "Kazusa": { kanji: "上総", hiragana: "かずさ", desc: "je sais pas encore." },
  "Awa_honshuu": { kanji: "安房", hiragana: "あわ", romaji: "Awa (Honshū)", desc: "je sais pas encore." },
  "Hitachi": { kanji: "常陸", hiragana: "ひたち", desc: "je sais pas encore." },
  "Ōmi": { kanji: "近江", hiragana: "おうみ", desc: "je sais pas encore." },
  "Mino": { kanji: "美濃", hiragana: "みの", desc: "je sais pas encore." },
  "Hida": { kanji: "飛騨", hiragana: "ひだ", desc: "je sais pas encore." },
  "Shinano": { kanji: "信濃", hiragana: "しなの", desc: "je sais pas encore." },
  "Kōzuke": { kanji: "上野", hiragana: "こうずけ", desc: "je sais pas encore." },
  "Shimotsuke": { kanji: "下野", hiragana: "しもつけ", desc: "je sais pas encore." },
  "Mutsu": { kanji: "陸奥", hiragana: "むつ", desc: "je sais pas encore." },
  "Dewa": { kanji: "出羽", hiragana: "でわ", desc: "je sais pas encore." },
};

for (const key in PROVINCE_INFOS) {
  if (!PROVINCE_INFOS[key].romaji) {
    PROVINCE_INFOS[key].romaji = key;
  }
}

const svg = document.getElementById('svg');
const provincePop = document.getElementById('province-pop');
const ficheKanji = document.getElementById('ficheKanji');
const ficheHiragana = document.getElementById('ficheHiragana');
const ficheDesc = document.getElementById('ficheDesc');

// 1. Affichage fiche info
function showFiche(province) {
  const info = PROVINCE_INFOS[province];
  if (!info) return;

  const romaji = info.romaji || province;

  // Remplir les infos
  ficheKanji.textContent = info.kanji;
  ficheHiragana.textContent = info.hiragana;
  ficheDesc.textContent = info.desc;

  // Gestion de l'audio
  const playBtn = document.getElementById('playAudio');
  if (playBtn) {
    playBtn.onclick = () => {
      const audio = new Audio(`audio/${romaji}.mp3`);
      audio.play().catch(err => console.warn("Erreur audio :", err));
    };
  }

  // Affiche la fiche
  document.getElementById('ficheInfo').classList.add('sidebar', 'open');
}

function closeFiche() {
  const fiche = document.getElementById('ficheInfo');
  fiche.classList.remove('sidebar', 'open');

  // Vider le contenu (important pour éviter les résidus)
  ficheKanji.textContent = '';
  ficheHiragana.textContent = '';
  ficheDesc.textContent = '';

  // Supprimer le onclick du bouton audio
  const playBtn = document.getElementById('playAudio');
  if (playBtn) playBtn.onclick = null;

  // Désélectionner la province visuellement
  document.querySelectorAll('.province.selected, .province.dimmed').forEach(el => {
    el.classList.remove('selected', 'dimmed');
  });
}

// 2. Hover provinces (illumine + label)
document.querySelectorAll('.province').forEach(function(el) {
  el.addEventListener('mouseenter', function() {
    const prov = el.getAttribute('data-province');

    // Désactive hover visuel si un bouton est actif
    const anyActive = document.querySelector('.region-btn.active, .big-btn.active');
    if (!anyActive) {
      document.querySelectorAll('.province[data-province="' + prov + '"]').forEach(function(e2){
        e2.classList.add('illumine');
      });
    }

    // Affiche nom province en bas
    const label = document.getElementById('province-hover-label');
    const info = PROVINCE_INFOS[prov];
    if (info) {
  label.textContent = `${info.kanji || prov} – ${info.romaji || prov}`;
   } else {
  label.textContent = prov;
   }
    label.style.display = 'block';
  });

  el.addEventListener('mouseleave', function() {
    const prov = el.getAttribute('data-province');
    document.querySelectorAll('.province[data-province="' + prov + '"]').forEach(function(e2){
      e2.classList.remove('illumine');
    });
    document.getElementById('province-hover-label').style.display = 'none';
  });
});

// 3. Clic sur une province => pop/fiche
document.querySelectorAll('.province').forEach(function(el) {
  el.addEventListener('click', function(e) {
    e.stopPropagation();
    const prov = el.getAttribute('data-province');
    // Réinitialisation
    document.querySelectorAll('.province.selected, .province.dimmed, .province.superile-highlight, .big-btn.active, .region-btn.active')
      .forEach(e => e.classList.remove('selected', 'dimmed', 'superile-highlight', 'active'));
    document.body.classList.remove('allregions');
    // Zoom + fiche
    showProvincePop(el);
    showFiche(prov);
  });
});

// 4. Pop province affichée (inchangé)
// On ajoute la gestion des .province-annexe (ex : lac de Biwa)
function showProvincePop(provinceEl) {
  provincePop.innerHTML = '';

  // 1. Sélectionne toutes les formes principales ET annexes (lac, etc.)
  const prov = provinceEl.getAttribute('data-province');
  const provinceShapes = [
    ...document.querySelectorAll('.province[data-province="' + prov + '"]'),
    ...document.querySelectorAll('.province-annexe[data-prov-annexe="' + prov + '"]')
  ];

  // 2. Bounding box total pour centrer tout le groupe
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  provinceShapes.forEach(el => {
    const b = el.getBBox();
    if(b.x < minX) minX = b.x;
    if(b.y < minY) minY = b.y;
    if(b.x + b.width > maxX) maxX = b.x + b.width;
    if(b.y + b.height > maxY) maxY = b.y + b.height;
  });
  const bbox = { x: minX, y: minY, width: maxX - minX, height: maxY - minY };

  // 3. FACTEUR de zoom constant pour toutes (modifie ici pour plus grand/petit)
  const marge = 60; // Mets moins pour zoomer + (risque de dépasser)
const scale = Math.min(
  (window.innerWidth - marge*2) / bbox.width,
  (window.innerHeight - marge*2) / bbox.height
);

  // 4. Taille de la pop = fenêtre (ou carré max 90vw/vh si tu veux)
  const popW = window.innerWidth;
  const popH = window.innerHeight;

  // 5. Centre du bbox dans le SVG original
  const cx = bbox.x + bbox.width / 2;
  const cy = bbox.y + bbox.height / 2;

  // 6. Position cible (centre écran)
  const targetX = popW / 2;
  const targetY = popH / 2;

  // 7. Décalage pour centrer le groupe, *après* agrandissement
  const dx = targetX - cx * scale;
  const dy = targetY - cy * scale;

  // 8. SVG pop-up, prend tout l'écran (ou popW/popH)
  const popSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  popSvg.setAttribute('width', popW);
  popSvg.setAttribute('height', popH);
  popSvg.setAttribute('viewBox', `0 0 ${popW} ${popH}`);
  popSvg.style.display = 'block';
  popSvg.style.background = 'none';
  popSvg.style.backgroundColor = 'transparent';

  // 9. Clone toutes les formes, *garde leur couleur d'origine*
  provinceShapes.forEach(el => {
    const clone = el.cloneNode(true);
    // IMPORTANT: Retire les class CSS selectionnées/dimmed, mais garde la classe qui définit les couleurs de base !
    if(clone.classList.contains('province')) {
      clone.setAttribute('class', 'province');
    }
    if(clone.classList.contains('province-annexe')) {
      clone.setAttribute('class', 'province-annexe');
    }
    clone.removeAttribute('style');
    clone.style.filter = "drop-shadow(0 8px 24px #0002)";
    // Centrage/zoom
    clone.setAttribute("transform", `translate(${dx},${dy}) scale(${scale})`);
    popSvg.appendChild(clone);
  });

  provincePop.innerHTML = '';
  provincePop.appendChild(popSvg);
  provincePop.style.opacity = 1;
  provincePop.style.pointerEvents = 'none';
  provincePop.style.zIndex = 1002;
  provincePop.style.position = 'fixed';
  provincePop.style.left = '0';
  provincePop.style.top = '0';
  provincePop.style.width = popW + 'px';
  provincePop.style.height = popH + 'px';
  provincePop.style.transform = 'none';

  // Fond transparent sur la carte (à prévoir dans ton CSS)
  document.body.classList.add('backdrop-active');
}


// 5. Réinitialisation globale au clic extérieur
document.addEventListener('click', function(e) {
  if (
    !e.target.closest('.province') &&
    !e.target.closest('.big-btn') &&
    !e.target.closest('.region-btn') &&
    !e.target.closest('#ficheInfo')
  ) {
    document.querySelectorAll('.province.selected, .province.dimmed, .province.superile-highlight, .big-btn.active, .region-btn.active, [data-super-ile].selected')
      .forEach(el => el.classList.remove('selected', 'dimmed', 'superile-highlight', 'active'));
    closeFiche();
    provincePop.innerHTML = '';
    provincePop.style.opacity = 0;
    document.body.classList.remove('backdrop-active');
    document.body.classList.remove('allregions');
  }
});

// 6. Boutons grandes îles
document.querySelectorAll('.big-btn').forEach(function(btn) {
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    const superile = btn.getAttribute('data-super-ile-btn');
    const isActive = btn.classList.contains('active');

    // 1. On nettoie TOUT : régions actives, sélection de provinces
    document.querySelectorAll('.region-btn.active').forEach(r => r.classList.remove('active'));
    document.querySelectorAll('.province.selected, .province.superile-highlight').forEach(p => {
      p.classList.remove('selected', 'superile-highlight');
    });

    // 2. On réinitialise tous les boutons big-btn
    document.querySelectorAll('.big-btn.active').forEach(b => b.classList.remove('active'));

    if (isActive) {
      // Si le bouton était déjà actif → on le désactive
      btn.classList.remove('active');
      return;
    }

    // 3. Active l'île
    document.querySelectorAll('.province[data-main-ile="'+superile+'"]').forEach(p => {
      p.classList.add('superile-highlight');
    });
    btn.classList.add('active');
  });
});

// 7. Gestion des boutons régions (accumulables)
document.querySelectorAll('.region-btn').forEach(function(btn) {
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    const region = btn.getAttribute('data-region-btn');
    const isActive = btn.classList.contains('active');

    // 1. Si une île était active, on la désactive
    document.querySelectorAll('.big-btn.active').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.province.superile-highlight').forEach(p => {
      p.classList.remove('superile-highlight');
    });

    if (isActive) {
      // Si le bouton était déjà actif → désactive uniquement cette région
      btn.classList.remove('active');
      document.querySelectorAll('.province[data-region="'+region+'"]').forEach(p => {
        p.classList.remove('selected');
      });
    } else {
      // Sinon active cette région
      btn.classList.add('active');
      document.querySelectorAll('.province[data-region="'+region+'"]').forEach(p => {
        p.classList.add('selected');
      });
    }
  });
});

