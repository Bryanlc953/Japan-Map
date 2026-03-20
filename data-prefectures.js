// =========================================================
// DONNÉES DES RÉGIONS
// =========================================================
const region_INFOS = {
  'region-Hokkaidō': {
    nomRomaji: 'Hokkaidō',
    nomKanji: '北海道',
    pop: '5.2 Millions',
    cap: 'Sapporo',
    desc: 'Grande île septentrionale du Japon, Hokkaidō est un territoire de nature sauvage, de parcs nationaux immenses et de volcans. Colonisée tardivement au XIXe siècle, elle conserve une identité propre marquée par l\'héritage aïnou. Ses hivers rigoureux font sa renommée mondiale pour la poudreuse et le festival de glace de Sapporo.'
  },
  'region-Tōhoku': {
    nomRomaji: 'Tōhoku',
    nomKanji: '東北地方',
    pop: '8.6 Millions',
    cap: 'Sendai',
    desc: 'Région montagneuse du nord-est de Honshū, le Tōhoku est un pays de forêts denses, de sources thermales et de rizières en terrasses. Marquée par le séisme et le tsunami de 2011, elle incarne la résilience japonaise. Ses matsuri (festivals) comme le Nebuta d\'Aomori font partie des plus spectaculaires du pays.'
  },
  'region-Kantō': {
    nomRomaji: 'Kantō',
    nomKanji: '関東地方',
    pop: '43.3 Millions',
    cap: 'Tokyo',
    desc: 'Cœur économique et politique du Japon, le Kantō abrite la mégalopole de Tokyo et concentre près d\'un tiers de la population nationale sur une vaste plaine côtière. Centre mondial de la finance, de la technologie et de la culture pop, c\'est ici que bat le pouls du Japon contemporain.'
  },
  'region-Chūbu': {
    nomRomaji: 'Chūbu',
    nomKanji: '中部地方',
    pop: '21.4 Millions',
    cap: 'Nagoya',
    desc: 'Région centrale de Honshū, le Chūbu est dominé par les Alpes japonaises et accueille le majestueux Mont Fuji. Terre d\'industrie avec Nagoya et Toyota, mais aussi de tradition avec les villages de Shirakawa-gō, elle incarne le contraste permanent entre modernité et patrimoine ancestral.'
  },
  'region-Kansai': {
    nomRomaji: 'Kansai',
    nomKanji: '関西地方',
    pop: '22.5 Millions',
    cap: 'Osaka',
    desc: 'Berceau historique et culturel du Japon, le Kansai rayonne à travers ses trois grandes métropoles : Kyoto l\'impériale, Osaka l\'exubérante et Nara l\'antique. Riche de milliers de temples et sanctuaires, la région concentre une part immense du patrimoine mondial de l\'humanité au Japon.'
  },
  'region-Chūgoku': {
    nomRomaji: 'Chūgoku',
    nomKanji: '中国地方',
    pop: '7.3 Millions',
    cap: 'Hiroshima',
    desc: 'Pointe occidentale de Honshū, le Chūgoku est une région de collines, de mer intérieure et d\'histoire profonde. Hiroshima, symbole mondial de paix, et le sanctuaire flottant de Miyajima en sont les emblèmes. La mer intérieure de Seto offre des paysages d\'une beauté apaisante.'
  },
  'region-Shikoku': {
    nomRomaji: 'Shikoku',
    nomKanji: '四国地方',
    pop: '3.7 Millions',
    cap: 'Matsuyama',
    desc: 'La plus petite des quatre îles principales, Shikoku est mondialement connue pour son pèlerinage des 88 temples bouddhistes, vieux de plus de mille ans. Île de nature préservée et de rivières cristallines, elle offre une authenticité rare dans un Japon souvent hyperdéveloppé.'
  },
  'region-Kyūshū': {
    nomRomaji: 'Kyūshū',
    nomKanji: '九州地方',
    pop: '14.3 Millions',
    cap: 'Fukuoka',
    desc: 'Île méridionale volcanique, Kyūshū est la porte d\'entrée historique du Japon vers le continent asiatique. Terre de feu avec l\'Aso et le Sakurajima, de sources thermales à Beppu et d\'une gastronomie riche et diverse. Fukuoka en est la métropole dynamique et internationale.'
  }
};

// =========================================================
// DONNÉES DES PRÉFECTURES
// =========================================================
const prefecture_INFOS = {

  "Aichi": {
    kanji: "愛知", hiragana: "あいち",
    capitale: "Nagoya", population: "7,537,000",
    superficie: "5,173 km²", densite: "1,457 hab/km²",
    pib: "39 600 Mds ¥", cuisine: "Miso katsu, Hitsumabushi, Kishimen",
    villes: ["Nagoya", "Toyota", "Okazaki", "Ichinomiya"],
    desc: "Capitale industrielle du Japon, Aichi est le fief de Toyota et le moteur manufacturier du pays. La ville de Nagoya, reconstruite après la guerre, marie un château historique imposant et une scène architecturale audacieuse. La préfecture est aussi le berceau des arts martiaux et des céramiques de Seto."
  },

  "Akita": {
    kanji: "秋田", hiragana: "あきた",
    capitale: "Akita", population: "897,000",
    superficie: "11,638 km²", densite: "77 hab/km²",
    pib: "3 400 Mds ¥", cuisine: "Kiritanpo, Shottsuru, Inaniwa udon",
    villes: ["Akita", "Yokote", "Ōdate", "Noshiro"],
    desc: "Préfecture rurale du nord du Tōhoku, Akita est réputée pour la beauté de ses habitants — les femmes d'Akita sont célèbres dans tout le Japon. Ses forêts de cèdres, son lac Tazawa (le plus profond du pays) et son sake d'exception en font une destination de charme hors des sentiers battus."
  },

  "Aomori": {
    kanji: "青森", hiragana: "あおもり",
    capitale: "Aomori", population: "1,165,000",
    superficie: "9,646 km²", densite: "121 hab/km²",
    pib: "4 200 Mds ¥", cuisine: "Pommes, Senbei-jiru, Ichigo-ni",
    villes: ["Aomori", "Hachinohe", "Hirosaki", "Mutsu"],
    desc: "Extrémité nord de Honshū, Aomori est célèbre pour ses pommes — les meilleures du Japon — et pour le spectaculaire festival Nebuta, où d'immenses lanternes en papier illuminent les nuits d'été. La péninsule de Shimokita et la montagne Osore-zan dégagent une atmosphère mystique et sauvage unique."
  },

  "Chiba": {
    kanji: "千葉", hiragana: "ちば",
    capitale: "Chiba", population: "6,251,000",
    superficie: "5,158 km²", densite: "1,212 hab/km²",
    pib: "21 600 Mds ¥", cuisine: "Cuisine de l'arachide, Clams de Funabashi, Nori",
    villes: ["Chiba", "Funabashi", "Matsudo", "Kashiwa"],
    desc: "Péninsule à l'est de Tokyo, Chiba abrite Narita — la principale porte d'entrée internationale du Japon — et Disneyland Tokyo. La côte de Kujūkuri offre l'une des plus longues plages du pays, tandis que les vallées intérieures de la péninsule de Bōsō conservent un charme rural préservé."
  },

  "Ehime": {
    kanji: "愛媛", hiragana: "えひめ",
    capitale: "Matsuyama", population: "1,296,000",
    superficie: "5,676 km²", densite: "228 hab/km²",
    pib: "4 800 Mds ¥", cuisine: "Tai-meshi, Jakoten, Mikan (mandarine)",
    villes: ["Matsuyama", "Imabari", "Uwajima", "Saijō"],
    desc: "Façade nord-ouest de Shikoku, Ehime est la porte d'entrée de l'île et la préfecture la plus peuplée de la région. Matsuyama abrite le château le mieux préservé du Japon et les bains de Dōgo Onsen, les plus anciens du pays. Les mandarines mikan d'Ehime sont réputées dans tout l'archipel."
  },

  "Fukui": {
    kanji: "福井", hiragana: "ふくい",
    capitale: "Fukui", population: "739,000",
    superficie: "4,190 km²", densite: "176 hab/km²",
    pib: "3 000 Mds ¥", cuisine: "Crabe Echizen, Soba d'Echizen, Sauce Worcester locale",
    villes: ["Fukui", "Sabae", "Echizen", "Obama"],
    desc: "Petite préfecture de la côte de la mer du Japon, Fukui cache des trésors insoupçonnés : les temples millénaires d'Eihei-ji, les falaises de Tōjinbō et le musée de paléontologie de Katsuyama — l'un des meilleurs du monde pour les fossiles de dinosaures. Le crabe d'Echizen y est une institution gastronomique."
  },

  "Fukuoka": {
    kanji: "福岡", hiragana: "ふくおか",
    capitale: "Fukuoka", population: "5,172,000",
    superficie: "4,986 km²", densite: "1,037 hab/km²",
    pib: "19 800 Mds ¥", cuisine: "Hakata ramen, Mizutaki, Mentaiko, Motsunabe",
    villes: ["Fukuoka", "Kitakyūshū", "Kurume", "Ōmuta"],
    desc: "Métropole dynamique du nord de Kyūshū, Fukuoka est la ville la plus proche du continent asiatique et un carrefour culturel majeur. Son ramen Hakata — au bouillon de porc crémeux — est parmi les plus célèbres du monde. La ville allie modernité assumée, scène gastronomique vibrante et patrimoine historique à Dazaifu."
  },

  "Fukushima": {
    kanji: "福島", hiragana: "ふくしま",
    capitale: "Fukushima", population: "1,743,000",
    superficie: "13,784 km²", densite: "127 hab/km²",
    pib: "7 200 Mds ¥", cuisine: "Kozuyu, Wappa-meshi, Pêches de Fukushima",
    villes: ["Fukushima", "Kōriyama", "Iwaki", "Aizuwakamatsu"],
    desc: "Préfecture la plus étendue du Tōhoku, Fukushima est un territoire de contrastes entre montagnes, plaines agricoles et côte pacifique. Marquée par la catastrophe nucléaire de 2011, elle œuvre depuis à sa reconstruction et à la restauration de son image, mettant en valeur sa nature préservée, ses sources thermales et ses pêches réputées."
  },

  "Gifu": {
    kanji: "岐阜", hiragana: "ぎふ",
    capitale: "Gifu", population: "1,916,000",
    superficie: "10,621 km²", densite: "180 hab/km²",
    pib: "7 400 Mds ¥", cuisine: "Keichan, Hoba-miso, Mitarashi dango",
    villes: ["Gifu", "Kakamigahara", "Ōgaki", "Tajimi"],
    desc: "Préfecture enclavée au cœur des Alpes japonaises, Gifu est un condensé du Japon profond. Les villages de Shirakawa-gō et Gokayama, classés au patrimoine mondial, avec leurs maisons aux toits de chaume en forme de mains jointes (gasshō-zukuri), figurent parmi les plus photographiés du pays."
  },

  "Gunma": {
    kanji: "群馬", hiragana: "ぐんま",
    capitale: "Maebashi", population: "1,890,000",
    superficie: "6,362 km²", densite: "297 hab/km²",
    pib: "7 600 Mds ¥", cuisine: "Okkirikomi, Yaki-manju, Konnyaku",
    villes: ["Maebashi", "Takasaki", "Isesaki", "Ōta"],
    desc: "Préfecture montagneuse du nord du Kantō, Gunma est la capitale thermale du Japon avec les célèbres onsen de Kusatsu, Ikaho et Minakami. Le parc de Jōmō-ji en automne offre des paysages de feuillages spectaculaires. La préfecture est aussi connue pour son konnyaku, dont elle produit 90% de la production nationale."
  },

  "Hiroshima": {
    kanji: "広島", hiragana: "ひろしま",
    capitale: "Hiroshima", population: "2,714,000",
    superficie: "8,479 km²", densite: "320 hab/km²",
    pib: "11 200 Mds ¥", cuisine: "Okonomiyaki d'Hiroshima, Huîtres, Momiji manju",
    villes: ["Hiroshima", "Fukuyama", "Kure", "Ōtake"],
    desc: "Symbole mondial de paix depuis le 6 août 1945, Hiroshima a su se reconstruire pour devenir une ville moderne et accueillante. Le Mémorial de la Paix et le Dôme de Genbaku, inscrits au patrimoine mondial, attirent des millions de visiteurs. L'île de Miyajima, avec son torii rouge flottant, est l'un des trois paysages les plus célèbres du Japon."
  },

  "Hokkaidō": {
    kanji: "北海道", hiragana: "ほっかいどう",
    capitale: "Sapporo", population: "5,043,000",
    superficie: "83,424 km²", densite: "60 hab/km²",
    pib: "19 700 Mds ¥", cuisine: "Soupe miso de Sapporo, Kaisen-don, Jingisukan, Fromages",
    villes: ["Sapporo", "Asahikawa", "Hakodate", "Kushiro"],
    desc: "Île septentrionale du Japon, Hokkaidō est une terre de nature vierge, de grands espaces et de saisons extrêmes. Colonisée officiellement seulement à partir de 1869, elle conserve l'héritage de la culture aïnoue et une architecture influencée par l'Occident. Sapporo, sa capitale, accueille chaque février le célèbre festival de la neige et ses sculptures de glace monumentales."
  },

  "Hyōgo": {
    kanji: "兵庫", hiragana: "ひょうご",
    capitale: "Kobe", population: "5,337,000",
    superficie: "8,401 km²", densite: "635 hab/km²",
    pib: "20 700 Mds ¥", cuisine: "Bœuf de Kobe, Akashi-yaki, Takowasa",
    villes: ["Kobe", "Himeji", "Amagasaki", "Nishinomiya"],
    desc: "Préfecture côtière du Kansai, Hyōgo brille à travers Kobe, ville portuaire ouverte au monde depuis 1868 et foyer d'une importante communauté étrangère. Le bœuf de Kobe, élevé au massage et à la bière, est la viande la plus réputée du Japon. Le château d'Himeji, surnommé le Héron blanc, est le château féodal le mieux conservé du pays."
  },

  "Ibaraki": {
    kanji: "茨城", hiragana: "いばらき",
    capitale: "Mito", population: "2,806,000",
    superficie: "6,097 km²", densite: "460 hab/km²",
    pib: "12 500 Mds ¥", cuisine: "Nattō, Anko (poisson-lune), Mito no umeboshi",
    villes: ["Mito", "Tsukuba", "Hitachi", "Tsuchiura"],
    desc: "Préfecture agricole et industrielle du Kantō, Ibaraki possède deux joyaux souvent négligés par les touristes : le jardin de Kairakuen à Mito, l'un des trois plus beaux jardins du Japon, et le sanctuaire de Kashima. Elle est aussi connue pour son nattō — les haricots fermentés de Mito sont les plus réputés du pays."
  },

  "Ishikawa": {
    kanji: "石川", hiragana: "いしかわ",
    capitale: "Kanazawa", population: "1,098,000",
    superficie: "4,186 km²", densite: "262 hab/km²",
    pib: "4 600 Mds ¥", cuisine: "Jibuni, Crabe Kano, Noto salt sweets",
    villes: ["Kanazawa", "Hakusan", "Komatsu", "Nanao"],
    desc: "Préfecture de la péninsule de Noto sur la mer du Japon, Ishikawa est un condensé de raffinement japonais. Kanazawa, surnommée la « petite Kyoto », a été épargnée par les bombes de la Seconde Guerre mondiale et conserve ses quartiers de geishas, ses jardins et son école de laque makie. Le jardin Kenroku-en y figure parmi les plus beaux du Japon."
  },

  "Iwate": {
    kanji: "岩手", hiragana: "いわて",
    capitale: "Morioka", population: "1,145,000",
    superficie: "15,275 km²", densite: "75 hab/km²",
    pib: "4 600 Mds ¥", cuisine: "Wanko soba, Jajamen, Maesawa beef",
    villes: ["Morioka", "Ichinoseki", "Ōshū", "Hanamaki"],
    desc: "Deuxième plus grande préfecture de Honshū, Iwate est une terre de montagne, de côtes découpées et de tradition. La ville de Hiraizumi, ancienne capitale rivale de Kyoto au XIIe siècle, est inscrite au patrimoine mondial avec ses temples dorés. La côte Sanriku, dévastée en 2011, fait l'objet d'une reconstruction remarquable."
  },

  "Kagawa": {
    kanji: "香川", hiragana: "かがわ",
    capitale: "Takamatsu", population: "917,000",
    superficie: "1,877 km²", densite: "489 hab/km²",
    pib: "3 600 Mds ¥", cuisine: "Sanuki udon, Oshima olive beef, Soy sauce",
    villes: ["Takamatsu", "Marugame", "Sakaide", "Sanuki"],
    desc: "Plus petite préfecture du Japon, Kagawa est surnommée « l'udon-ken » — la préfecture des udon — tant ce plat y est une religion locale. Takamatsu abrite le jardin Ritsurin-kōen, l'un des plus beaux du pays. La mer intérieure de Seto offre un chapelet d'îles musées avec l'art contemporain de Naoshima et du festival Setouchi Triennale."
  },

  "Kagoshima": {
    kanji: "鹿児島", hiragana: "かごしま",
    capitale: "Kagoshima", population: "1,532,000",
    superficie: "9,187 km²", densite: "167 hab/km²",
    pib: "5 500 Mds ¥", cuisine: "Kurobuta tonkatsu, Satsumaage, Shochu de patate douce",
    villes: ["Kagoshima", "Kirishima", "Kanoya", "Satsumasendai"],
    desc: "Pointe méridionale de Kyūshū, Kagoshima vit sous le regard permanent du Sakurajima, volcan actif dont les cendres recouvrent régulièrement la ville — une coexistence unique au monde. Terre du clan Shimazu qui domina le Japon féodal du sud, elle a aussi été le point de départ des premières missions japonaises en Occident."
  },

  "Kanagawa": {
    kanji: "神奈川", hiragana: "かながわ",
    capitale: "Yokohama", population: "9,225,000",
    superficie: "2,416 km²", densite: "3,819 hab/km²",
    pib: "34 200 Mds ¥", cuisine: "Ramen de Yokohama (ie-kei), Shūmai, Kamaboko de Odawara",
    villes: ["Yokohama", "Kawasaki", "Sagamihara", "Kamakura"],
    desc: "Préfecture la plus densément peuplée du Japon après Tokyo, Kanagawa accueille Yokohama, deuxième ville du pays et premier port historique ouvert à l'Occident en 1859. Kamakura, ancienne capitale médiévale, abrite le Grand Bouddha de bronze. La ville de Hakone offre des vues imprenables sur le Mont Fuji depuis ses sources thermales."
  },

  "Kōchi": {
    kanji: "高知", hiragana: "こうち",
    capitale: "Kōchi", population: "656,000",
    superficie: "7,105 km²", densite: "92 hab/km²",
    pib: "2 400 Mds ¥", cuisine: "Katsuo no tataki, Sawachi ryori, Yuzu",
    villes: ["Kōchi", "Nankoku", "Susaki", "Shimanto"],
    desc: "Préfecture sauvage du sud de Shikoku, Kōchi est baignée par l'océan Pacifique et couverte à 84% de forêts — le taux le plus élevé du Japon. Patrie de Sakamoto Ryōma, héros de la Restauration Meiji, elle est réputée pour sa culture de la fête, ses marchés dominicaux et son tataki de bonite préparé à la paille."
  },

  "Kumamoto": {
    kanji: "熊本", hiragana: "くまもと",
    capitale: "Kumamoto", population: "1,697,000",
    superficie: "7,409 km²", densite: "229 hab/km²",
    pib: "6 200 Mds ¥", cuisine: "Basashi (cheval cru), Karashi renkon, Ikinari dango",
    villes: ["Kumamoto", "Yatsushiro", "Aso", "Amakusa"],
    desc: "Préfecture centrale de Kyūshū, Kumamoto est dominée par la caldeira de l'Aso, le plus grand volcan actif du Japon. Son château, l'un des plus imposants du pays, a été partiellement détruit par le séisme de 2016 et fait l'objet d'une reconstruction méticuleuse. La mascotte Kumamon, ours noir souriant, est l'une des plus populaires du Japon."
  },

  "Kyōto": {
    kanji: "京都", hiragana: "きょうと",
    capitale: "Kyōto", population: "2,520,000",
    superficie: "4,612 km²", densite: "547 hab/km²",
    pib: "10 300 Mds ¥", cuisine: "Kaiseki, Yudōfu, Nishiki kyō-tsukemono, Matcha",
    villes: ["Kyōto", "Uji", "Kameoka", "Maizuru"],
    desc: "Capitale impériale du Japon pendant plus de mille ans, Kyoto est le cœur spirituel et esthétique de la civilisation japonaise. Ses 1 600 temples bouddhistes, 400 sanctuaires shintō et 17 sites classés au patrimoine mondial en font la destination culturelle absolue du pays. La cuisine kaiseki y a atteint son sommet de raffinement et d'équilibre."
  },

  "Mie": {
    kanji: "三重", hiragana: "みえ",
    capitale: "Tsu", population: "1,711,000",
    superficie: "5,774 km²", densite: "296 hab/km²",
    pib: "7 400 Mds ¥", cuisine: "Homard d'Ise, Akafuku mochi, Tori-yakisoba",
    villes: ["Tsu", "Yokkaichi", "Ise", "Kuwana"],
    desc: "Préfecture côtière du Kansai, Mie est avant tout la terre des grands sanctuaires d'Ise — les plus sacrés du shintoïsme japonais, reconstruits à l'identique tous les 20 ans depuis 1 300 ans. La péninsule de Shima, parc national marin, est le berceau de la culture des huîtres et des pêcheuses ama en apnée."
  },

  "Miyagi": {
    kanji: "宮城", hiragana: "みやぎ",
    capitale: "Sendai", population: "2,248,000",
    superficie: "7,282 km²", densite: "309 hab/km²",
    pib: "9 000 Mds ¥", cuisine: "Gyūtan (langue de bœuf), Zunda mochi, Hiya-jiru",
    villes: ["Sendai", "Ishinomaki", "Ōsaki", "Natori"],
    desc: "Capitale du Tōhoku, Miyagi s'articule autour de Sendai, la « ville aux mille cerisiers ». La baie de Matsushima, avec ses quelque 260 îles boisées, est classée parmi les trois plus beaux paysages du Japon. Durement touchée par le tsunami de 2011, la préfecture a démontré une capacité de résilience et de reconstruction exemplaire."
  },

  "Miyazaki": {
    kanji: "宮崎", hiragana: "みやざき",
    capitale: "Miyazaki", population: "1,033,000",
    superficie: "7,735 km²", densite: "133 hab/km²",
    pib: "3 600 Mds ¥", cuisine: "Jidori (poulet local), Hiyajiru, Mangues",
    villes: ["Miyazaki", "Miyakonojō", "Nobeoka", "Nichinan"],
    desc: "Préfecture ensoleillée du sud-est de Kyūshū, Miyazaki bénéficie d'un des meilleurs ensoleillement du Japon et d'une côte magnifique bordée de palmiers — un décor tropical inattendu. Lieu de naissance mythique de l'empereur Jimmu selon les chroniques anciennes, elle abrite le grand sanctuaire d'Udo et la gorge de Takachiho, cœur de la mythologie japonaise."
  },

  "Nagano": {
    kanji: "長野", hiragana: "ながの",
    capitale: "Nagano", population: "1,987,000",
    superficie: "13,562 km²", densite: "146 hab/km²",
    pib: "8 300 Mds ¥", cuisine: "Soba de montagne, Oyaki, Sansai (légumes sauvages), Pommes",
    villes: ["Nagano", "Matsumoto", "Ueda", "Ina"],
    desc: "Toit du Japon, Nagano est entourée des plus hauts sommets de l'archipel et compte plus de 3 000 montagnes. Hôte des Jeux olympiques d'hiver de 1998, elle est une destination de sports d'hiver de premier plan. Le temple de Zenkō-ji, ses villages d'Azumino et les sources thermales de l'enfer des singes à Jigokudani en font l'une des préfectures les plus visitées de l'arrière-pays."
  },

  "Nagasaki": {
    kanji: "長崎", hiragana: "ながさき",
    capitale: "Nagasaki", population: "1,252,000",
    superficie: "4,132 km²", densite: "303 hab/km²",
    pib: "4 500 Mds ¥", cuisine: "Champon, Sara udon, Kakuni manju, Castella",
    villes: ["Nagasaki", "Sasebo", "Isahaya", "Ōmura"],
    desc: "Pendant plus de 200 ans, Nagasaki fut le seul port ouvert du Japon isolationniste, faisant de cette ville le creuset de tous les échanges culturels avec l'Occident et la Chine. Comme Hiroshima, elle porte la mémoire de la bombe atomique du 9 août 1945. Son architecture métissée, ses temples chinois et le quartier de Glover en font une ville unique au Japon."
  },

  "Nara": {
    kanji: "奈良", hiragana: "なら",
    capitale: "Nara", population: "1,285,000",
    superficie: "3,691 km²", densite: "348 hab/km²",
    pib: "4 700 Mds ¥", cuisine: "Kakinoha-zushi, Miwa sōmen, Kaki (kaki persimmon)",
    villes: ["Nara", "Kashihara", "Ikoma", "Yamato-Kōriyama"],
    desc: "Première capitale permanente du Japon (710-784), Nara conserve un patrimoine bouddhiste et shintō d'une richesse exceptionnelle. Le Tōdai-ji et son Grand Bouddha de bronze (le plus grand du monde), Kasuga Taisha et ses milliers de lanternes, et surtout les daims sacrés en liberté dans le parc de Nara en font l'une des destinations les plus attachantes du pays."
  },

  "Niigata": {
    kanji: "新潟", hiragana: "にいがた",
    capitale: "Niigata", population: "2,099,000",
    superficie: "12,584 km²", densite: "167 hab/km²",
    pib: "8 600 Mds ¥", cuisine: "Riz Koshihikari, Sake (premier producteur national), Hegi soba",
    villes: ["Niigata", "Nagaoka", "Jōetsu", "Sanjō"],
    desc: "Grande préfecture côtière sur la mer du Japon, Niigata est le garde-manger du Japon : ses plaines rizicoles produisent le koshihikari, le riz le plus apprécié du pays, et elle est le premier producteur de sake de l'archipel. L'île de Sado, accessible en ferry, est un monde à part avec son histoire d'exil impérial et ses mines d'or historiques."
  },

  "Ōita": {
    kanji: "大分", hiragana: "おおいた",
    capitale: "Ōita", population: "1,085,000",
    superficie: "6,341 km²", densite: "171 hab/km²",
    pib: "4 200 Mds ¥", cuisine: "Toriten, Bungo beef, Hōji-udon",
    villes: ["Ōita", "Beppu", "Nakatsu", "Hita"],
    desc: "Capitale thermale du Japon, Ōita produit le plus grand volume d'eau thermale du monde et compte plus de 4 400 sources. Beppu, avec ses « hells » bouillonnants aux couleurs irréelles, et Yufuin, village onsen élégant niché entre montagnes, en sont les ambassadeurs. Le parc national d'Aso-Kujū traverse une nature volcanique spectaculaire."
  },

  "Okayama": {
    kanji: "岡山", hiragana: "おかやま",
    capitale: "Okayama", population: "1,831,000",
    superficie: "7,115 km²", densite: "257 hab/km²",
    pib: "7 500 Mds ¥", cuisine: "Barazushi, Demi-katsu, Muscat d'Okayama",
    villes: ["Okayama", "Kurashiki", "Tsuyama", "Tamano"],
    desc: "Préfecture du Chūgoku réputée pour son ensoleillement, Okayama abrite le jardin de Kōraku-en, l'un des trois plus beaux jardins classiques du Japon. Son château surnommé « château corbeau » pour son armure noire contraste avec la verdure environnante. La région de Kurashiki conserve un quartier de canaux et d'entrepôts blancs d'époque Edo remarquablement préservé."
  },

  "Okinawa": {
    kanji: "沖縄", hiragana: "おきなわ",
    capitale: "Naha", population: "1,466,000",
    superficie: "2,281 km²", densite: "643 hab/km²",
    pib: "4 700 Mds ¥", cuisine: "Chanpurū, Gōyā champuru, Sōki soba, Awamori",
    villes: ["Naha", "Okinawa", "Uruma", "Ginowan"],
    desc: "Archipel subtropical au sud-ouest du Japon, Okinawa possède une identité culturelle distincte héritée de l'ancien royaume des Ryūkyū. Ses eaux turquoise, ses récifs coralliens et ses longévités record (zone bleue mondiale) en font une destination unique. Le château de Shuri, siège des rois Ryūkyū, est classé au patrimoine mondial de l'UNESCO."
  },

  "Ōsaka": {
    kanji: "大阪", hiragana: "おおさか",
    capitale: "Ōsaka", population: "8,757,000",
    superficie: "1,905 km²", densite: "4,597 hab/km²",
    pib: "39 400 Mds ¥", cuisine: "Takoyaki, Okonomiyaki, Kushikatsu, Fugu",
    villes: ["Ōsaka", "Sakai", "Higashiōsaka", "Suita"],
    desc: "Capitale gastronomique du Japon, Osaka est réputée pour son « kuidaore » — se ruiner en mangeant. Deuxième économie du pays, elle est une métropole exubérante et chaleureuse, dont l'humour populaire (osaka-ben) est célèbre dans tout l'archipel. Son château, le Dotonbori et le futur site de l'Exposition Universelle 2025 symbolisent une ville toujours en mouvement."
  },

  "Ryūkyū": {
    kanji: "琉球", hiragana: "りゅうきゅう",
    capitale: "Naha", population: "1,466,000",
    superficie: "2,281 km²", densite: "643 hab/km²",
    pib: "4 700 Mds ¥", cuisine: "Chanpurū, Gōyā champuru, Sōki soba, Awamori",
    villes: ["Naha", "Okinawa", "Uruma", "Ginowan"],
    desc: "Archipel subtropical au sud-ouest du Japon, les îles Ryūkyū s'étendent sur plus de 1 000 km entre Kyūshū et Taïwan. Ancien royaume indépendant pendant plus de 450 ans, cet ensemble d'îles possède une culture, une langue et des traditions distinctes du reste du Japon. Ses eaux cristallines et ses récifs coralliens en font un paradis naturel unique."
  },

  "Saga": {
    kanji: "佐賀", hiragana: "さが",
    capitale: "Saga", population: "788,000",
    superficie: "2,441 km²", densite: "323 hab/km²",
    pib: "2 900 Mds ¥", cuisine: "Yobuko ika (calamar), Muttanscalope de mer, Porcelaine Imari",
    villes: ["Saga", "Karatsu", "Tosu", "Imari"],
    desc: "Discrète préfecture du nord-ouest de Kyūshū, Saga est le berceau de la porcelaine japonaise : c'est à Arita qu'au XVIIe siècle fut créée la première porcelaine japonaise, exportée vers l'Europe sous le nom d'Imari. Le festival de montgolfières de Saga, le plus grand d'Asie, illumine le ciel automnal chaque année."
  },

  "Saitama": {
    kanji: "埼玉", hiragana: "さいたま",
    capitale: "Saitama", population: "7,332,000",
    superficie: "3,798 km²", densite: "1,930 hab/km²",
    pib: "22 900 Mds ¥", cuisine: "Musashino udon, Ikameshi, Sōka senbei (crackers de riz)",
    villes: ["Saitama", "Kawagoe", "Kawaguchi", "Koshigaya"],
    desc: "Préfecture résidentielle au nord de Tokyo, Saitama fait partie de la mégalopole de la capitale. Si elle est souvent perçue comme une banlieue, elle possède des joyaux propres : les cerisiers de Kumagaya, les feux d'artifice de Chichibu, et surtout Kawagoe — la « petite Edo » — dont les rues de marchands de l'ère Edo sont remarquablement conservées."
  },

  "Shiga": {
    kanji: "滋賀", hiragana: "しが",
    capitale: "Ōtsu", population: "1,402,000",
    superficie: "4,017 km²", densite: "349 hab/km²",
    pib: "6 100 Mds ¥", cuisine: "Funa-zushi (carpe fermentée), Ōmi beef, Akamiso",
    villes: ["Ōtsu", "Kusatsu", "Hikone", "Nagahama"],
    desc: "Préfecture encerclant le lac Biwa, le plus grand lac du Japon, Shiga est une terre de sérénité et d'histoire médiévale. Ses rives sont parsemées de châteaux et de temples, dont le château flottant de Hikone et le temple Enryaku-ji du Mont Hiei. Le funa-zushi, ancêtre des sushis fermenté pendant plusieurs années, y est la spécialité la plus ancienne du Japon."
  },

  "Shimane": {
    kanji: "島根", hiragana: "しまね",
    capitale: "Matsue", population: "642,000",
    superficie: "6,708 km²", densite: "96 hab/km²",
    pib: "2 300 Mds ¥", cuisine: "Izumo soba, Shijimi (palourdes), Nodoguro (poisson)",
    villes: ["Matsue", "Izumo", "Hamada", "Ōda"],
    desc: "Préfecture parmi les moins peuplées du Japon, Shimane est pourtant l'une des plus sacrées. Le grand sanctuaire d'Izumo-taisha, dédié à la divinité du mariage, est l'un des plus anciens et vénérés du pays. Matsue, la ville des eaux, possède l'un des rares châteaux originaux du Japon. La péninsule de Shimane et l'île d'Oki ajoutent une beauté naturelle sauvage."
  },

  "Shizuoka": {
    kanji: "静岡", hiragana: "しずおか",
    capitale: "Shizuoka", population: "3,527,000",
    superficie: "7,777 km²", densite: "454 hab/km²",
    pib: "17 200 Mds ¥", cuisine: "Sakura ebi (crevette rose), Unagi (anguille), Thé vert de Shizuoka",
    villes: ["Shizuoka", "Hamamatsu", "Numazu", "Fujinomiya"],
    desc: "Préfecture offrant la plus belle vue sur le Mont Fuji, Shizuoka est une terre de thé — elle produit 40% du thé vert japonais — d'anguilles grillées et de fruits de mer exquis. Hamamatsu est le fief mondial des instruments de musique Yamaha et Roland. La ville historique de Shimada et les cols de la vieille route du Tōkaidō évoquent l'époque des samouraïs."
  },

  "Tochigi": {
    kanji: "栃木", hiragana: "とちぎ",
    capitale: "Utsunomiya", population: "1,885,000",
    superficie: "6,408 km²", densite: "294 hab/km²",
    pib: "8 700 Mds ¥", cuisine: "Gyōza d'Utsunomiya, Yuba, Kanpyō (courge séchée)",
    villes: ["Utsunomiya", "Ashikaga", "Nikkō", "Oyama"],
    desc: "Préfecture au nord du Kantō, Tochigi abrite le sanctuaire de Nikkō, l'un des plus ornementés du Japon avec ses sculptures dorées et laquées dans un cadre forestier somptueux. Nikkō est inscrit au patrimoine mondial. La préfecture est aussi connue pour ses sources thermales de Kinugawa et ses fraises Tochigi — les meilleures du Japon selon les connaisseurs."
  },

  "Tokushima": {
    kanji: "徳島", hiragana: "とくしま",
    capitale: "Tokushima", population: "685,000",
    superficie: "4,147 km²", densite: "165 hab/km²",
    pib: "2 500 Mds ¥", cuisine: "Sudachi (agrume local), Awa odori sweets, Ramen de Tokushima",
    villes: ["Tokushima", "Naruto", "Anan", "Yoshinogawa"],
    desc: "Préfecture de l'est de Shikoku, Tokushima vit une fois par an à un rythme différent : le festival Awa Odori, danse traditionnelle millénaire, envahit les rues pendant quatre nuits en août et attire plus d'un million de visiteurs. Les gorges de l'Iya, territoire d'anciens réfugiés du clan Heike, sont parmi les plus dramatiques du Japon."
  },

  "Tōkyō": {
    kanji: "東京", hiragana: "とうきょう",
    capitale: "Tōkyō", population: "14,178,000",
    superficie: "2,194 km²", densite: "6,461 hab/km²",
    pib: "112 000 Mds ¥", cuisine: "Sushi Edomae, Monjayaki, Ramen de Tokyo, Tonkatsu",
    villes: ["Tōkyō", "Hachiōji", "Tachikawa", "Machida"],
    desc: "Capitale et mégalopole mondiale, Tokyo est la ville la plus peuplée du monde dans sa zone métropolitaine avec plus de 37 millions d'habitants. Centre mondial de la finance, de la mode, de la gastronomie (ville avec le plus d'étoiles Michelin au monde) et de la culture pop, elle est une machine à inventer le futur tout en préservant ses quartiers traditionnels comme Yanaka ou Kagurazaka."
  },

  "Tottori": {
    kanji: "鳥取", hiragana: "とっとり",
    capitale: "Tottori", population: "531,000",
    superficie: "3,507 km²", densite: "151 hab/km²",
    pib: "1 900 Mds ¥", cuisine: "Crabe Matsuba, Poires Nijisseiki, Rakkyo (échalotes)",
    villes: ["Tottori", "Yonago", "Kurayoshi", "Sakaiminato"],
    desc: "Préfecture la moins peuplée du Japon, Tottori possède un atout insolite : les seules grandes dunes de sable du Japon, s'étendant sur 16 km le long de la mer du Japon. Véritable désert miniature nippon, les dunes de Tottori accueillent un musée de sculptures de sable spectaculaires. Le crabe Matsuba, pêché en hiver dans ses eaux froides, est l'un des plus recherchés du pays."
  },

  "Toyama": {
    kanji: "富山", hiragana: "とやま",
    capitale: "Toyama", population: "997,000",
    superficie: "4,248 km²", densite: "235 hab/km²",
    pib: "4 500 Mds ¥", cuisine: "Masu-zushi (sushi de truite), Hotaru ika (calmar luciole), Shiroebi",
    villes: ["Toyama", "Takaoka", "Imizu", "Namerikawa"],
    desc: "Préfecture face à la mer du Japon au nord des Alpes japonaises, Toyama offre l'un des panoramas les plus saisissants du Japon : depuis la baie de Toyama, on peut voir simultanément les plus hauts sommets de l'archipel et la mer. La route alpine du Tateyama-Kurobe, avec ses murs de neige de 20 mètres au printemps, est l'une des expériences de montagne les plus spectaculaires d'Asie."
  },

  "Wakayama": {
    kanji: "和歌山", hiragana: "わかやま",
    capitale: "Wakayama", population: "880,000",
    superficie: "4,724 km²", densite: "186 hab/km²",
    pib: "3 400 Mds ¥", cuisine: "Kumano beef, Meharizushi, Mikan, Umeboshi de Minabe",
    villes: ["Wakayama", "Tanabe", "Shingū", "Hashimoto"],
    desc: "Préfecture côtière du Kansai, Wakayama est le point de départ du pèlerinage de Kumano — l'un des trois grands pèlerinages du Japon avec ses routes forestières millénaires classées au patrimoine mondial. Le temple du mont Kōya (Kōya-san), fondé en 816 par le moine Kūkai, est le centre du bouddhisme ésotérique shingon et l'un des lieux spirituels les plus impressionnants d'Asie."
  },

  "Yamagata": {
    kanji: "山形", hiragana: "やまがた",
    capitale: "Yamagata", population: "1,011,000",
    superficie: "9,323 km²", densite: "109 hab/km²",
    pib: "4 000 Mds ¥", cuisine: "Imoni (soupe de taro), Dashi (condiment), Cerises Satonishiki",
    villes: ["Yamagata", "Tsuruoka", "Sakata", "Kōfu"],
    desc: "Préfecture montagneuse du Tōhoku, Yamagata est célèbre pour ses cerises — les plus appréciées du Japon — et pour ses paysages de neige hivernaux. Le temple de Yamadera, accroché à une falaise et entouré d'érables millénaires, inspira le haïku le plus célèbre du poète Matsuo Bashō. Ses nombreuses stations thermales en font une destination onsen de premier plan."
  },

  "Yamaguchi": {
    kanji: "山口", hiragana: "やまぐち",
    capitale: "Yamaguchi", population: "1,281,000",
    superficie: "6,112 km²", densite: "210 hab/km²",
    pib: "5 600 Mds ¥", cuisine: "Fugu (poisson-globe), Kawara soba, Uiro de Yamaguchi",
    villes: ["Yamaguchi", "Shimonoseki", "Ube", "Hōfu"],
    desc: "Pointe occidentale de Honshū, Yamaguchi est la passerelle entre Honshū et Kyūshū. La ville de Shimonoseki est la capitale mondiale du fugu — le poisson-globe, mets dangereux et délicat — dont elle produit 80% de la consommation nationale. Les grottes karstiques d'Akiyoshi-dai et le canyon d'Akiyoshi-dō forment le plus grand karst du Japon."
  },

  "Yamanashi": {
    kanji: "山梨", hiragana: "やまなし",
    capitale: "Kōfu", population: "791,000",
    superficie: "4,465 km²", densite: "177 hab/km²",
    pib: "3 500 Mds ¥", cuisine: "Hōtō (nouilles larges miso), Shingen mochi, Vins de Kōfu",
    villes: ["Kōfu", "Fujiyoshida", "Ōtsuki", "Nirasaki"],
    desc: "Préfecture enclavée au pied du Mont Fuji, Yamanashi offre les plus belles vues sur le volcan sacré depuis les cinq lacs Fuji. C'est aussi la capitale viticole du Japon — les vignobles de Kōfu produisent les meilleurs vins japonais, notamment le cépage Koshu. Le parc national de Chichibu-Tama-Kai et les forêts d'Aokigahara complètent son paysage mystérieux."
  }
};

// =========================================================
// AUTOMATISATION : AJOUT DU ROMAJI SI ABSENT
// =========================================================
for (const key in prefecture_INFOS) {
  if (!prefecture_INFOS[key].romaji) {
    prefecture_INFOS[key].romaji = key;
  }
}

// =========================================================
// AUTOMATISATION : CALCUL DES POPULATIONS RÉGIONALES
// =========================================================
const regionsMapping = {
  'region-Hokkaidō': ['Hokkaidō'],
  'region-Tōhoku':   ['Aomori', 'Iwate', 'Miyagi', 'Akita', 'Yamagata', 'Fukushima'],
  'region-Kantō':    ['Ibaraki', 'Tochigi', 'Gunma', 'Saitama', 'Chiba', 'Tōkyō', 'Kanagawa'],
  'region-Chūbu':    ['Niigata', 'Toyama', 'Ishikawa', 'Fukui', 'Yamanashi', 'Nagano', 'Gifu', 'Shizuoka', 'Aichi'],
  'region-Kansai':   ['Mie', 'Shiga', 'Kyōto', 'Ōsaka', 'Hyōgo', 'Nara', 'Wakayama'],
  'region-Chūgoku':  ['Tottori', 'Shimane', 'Okayama', 'Hiroshima', 'Yamaguchi'],
  'region-Shikoku':  ['Tokushima', 'Kagawa', 'Ehime', 'Kōchi'],
  'region-Kyūshū':   ['Fukuoka', 'Saga', 'Nagasaki', 'Kumamoto', 'Ōita', 'Miyazaki', 'Kagoshima', 'Okinawa']
};

function calculerPopulationRegion() {
  for (const regionId in regionsMapping) {
    let populationTotale = 0;
    regionsMapping[regionId].forEach(nomPrefecture => {
      const prefecture = prefecture_INFOS[nomPrefecture];
      if (prefecture && prefecture.population) {
        populationTotale += parseInt(prefecture.population.replace(/,/g, ''), 10);
      }
    });
    const popMillions = (populationTotale / 1000000).toFixed(1) + ' Millions';
    if (region_INFOS[regionId]) {
      region_INFOS[regionId].pop = popMillions;
    }
  }
}

calculerPopulationRegion();
