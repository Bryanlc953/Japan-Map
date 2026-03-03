// data-prefectures.js
const prefecture_INFOS = {
  "Aichi": { 
    kanji: "愛知", 
    hiragana: "あいち", 
    desc: "Ancienne prefecture du sud du Kyūshū.", 
    capitale: "Nagoya", 
    population: "7,460,000"
  },

  "Akita": { 
    kanji: "秋田", 
    hiragana: "あきた", 
    desc: "prefecture historique dans la région de Kansai.", 
    capitale: "Akita",
    population: "897,000" 
  },

  "Aomori": {
     kanji: "青森",
     hiragana: "あおもり",
     desc: "prefecture sur la côte est de Kyūshū.", 
     capitale: "Aomori",
     population: "1,165,000"
    },

  "Chiba": { 
    kanji: "千葉",
    hiragana: "ちば",
    desc: "Région du sud-est du Kyūshū.", 
    capitale: "Chiba",
    population: "6,251,000" 
  },

  "Ehime": { 
    kanji: "愛媛", 
    hiragana: "えひめ", 
    desc: "prefecture du nord du Kyūshū.",
    capitale: "Matsuyama",
    population: "1,296,000" 
  },

  "Fukui": { 
    kanji: "福井", 
    hiragana: "ふくい", 
    desc: "prefecture de l’ouest de Kyūshū.",
    capitale: "Fukui",
    population: "739,000"
  },

  "Fukuoka": { 
    kanji: "福岡", 
    hiragana: "ふくおか", 
    desc: "prefecture du sud-ouest du Kyūshū.",
    capitale: "Fukuoka",
    population: "5,092,000"
  },

  "Fukushima": { 
    kanji: "福島", 
    hiragana: "ふくしま", 
    desc: "prefecture du nord-est du Japon.",
    capitale: "Fukushima",
    population: "1,743,000"
  },

  "Gifu": { 
    kanji: "岐阜", 
    hiragana: "ぎふ", 
    desc: "prefecture du centre du Japon.",
    capitale: "Gifu",
    population: "1,916,000"
  },

  "Gunma": { 
    kanji: "群馬", 
    hiragana: "ぐんま", 
    desc: "prefecture du centre du Japon.",
    capitale: "Maebashi",
    population: "1,890,000"
 },

  "Hiroshima": { 
    kanji: "広島",
    hiragana: "ひろしま", 
    desc: "prefecture du sud-ouest du Japon.", 
    capitale: "Hiroshima",
    population: "2,714,000"
  },

  "Hokkaidō": { 
    kanji: "北海道", 
    hiragana: "ほっかいどう", 
    desc: "prefecture du nord-est du Japon.",
    capitale: "Sapporo",
    population: "5,043,000"
  },

  "Hyōgo": { 
    kanji: "兵庫", 
    hiragana: "ひょうご", 
    desc: "prefecture du sud-ouest du Japon.",
    capitale: "Kobe",
    population: "5,337,000"
  },

  "Ibaraki": { 
    kanji: "茨城", 
    hiragana: "いばらき", 
    desc: "prefecture du centre du Japon.",
    capitale: "Mito",
    population: "2,806,000"
  },

  "Ishikawa": { 
    kanji: "石川", 
    hiragana: "いしかわ", 
    desc: "je sais pas encore.",
    capitale: "Kanazawa",
    population: "1,098,000" 
  },

  "Iwate": { 
    kanji: "岩手", 
    hiragana: "いわて", 
    desc: "prefecture du nord-est du Japon.",
    capitale: "Morioka",
    population: "1,145,000"
  },

  "Kagawa": { 
    kanji: "香川", 
    hiragana: "かがわ", 
    desc: "je sais pas encore.", 
    capitale: "Takamatsu",
    population: "917,000"
  },

  "Kagoshima": { 
    kanji: "鹿児島", 
    hiragana: "かごしま", 
    desc: "je sais pas encore.",
    capitale: "Kagoshima",
    population: "1,532,000"
  },

  "Kanagawa": { 
    kanji: "神奈川", 
    hiragana: "かながわ", 
    desc: "je sais pas encore.",
    capitale: "Yokohama",
    population: "9,225,000"
  },

  "Kōchi": { 
    kanji: "高知", 
    hiragana: "こうち", 
    desc: "je sais pas encore.",
    capitale: "Kōchi",
    population: "656,000"
  },

  "Kumamoto": { 
    kanji: "熊本", 
    hiragana: "くまとも", 
    desc: "je sais pas encore.",
    capitale: "Kumamoto",
    population: "1,697,000"
  },

  "Kyōto": { 
    kanji: "京都", 
    hiragana: "きょうと", 
    desc: "je sais pas encore.",
    capitale: "Kyōto",
    population: "2,520,000"
  },

  "Mie": { 
    kanji: "三重", 
    hiragana: "みえ", 
    desc: "je sais pas encore.",
    capitale: "Tsu",
    population: "1,711,000"
  },

  "Miyagi": { 
    kanji: "宮城", 
    hiragana: "みやぎ", 
    desc: "prefecture du nord-est du Japon.",
    capitale: "Sendai",
    population: "2,248,000" 
  },

  "Miyazaki": { 
    kanji: "宮崎", 
    hiragana: "みやざき", 
    desc: "je sais pas encore.",
    capitale: "Miyazaki",
    population: "1,033,000"
  },

  "Nagano": { 
    kanji: "長野", 
    hiragana: "ながの", 
    desc: "je sais pas encore.",
    capitale: "Nagano",
    population: "1,987,000"
  },

  "Nagasaki": { 
    kanji: "長崎", 
    hiragana: "ながさき", 
    desc: "je sais pas encore.",
    capitale: "Nagasaki",
    population: "1,252,000"
  },

  "Nara": { 
    kanji: "奈良", 
    hiragana: "なら", 
    desc: "je sais pas encore.",
    capitale: "Nara",
    population: "1,285,000"
  },

  "Niigata": { 
    kanji: "新潟", 
    hiragana: "にいがた", 
    desc: "je sais pas encore.",
    capitale: "Niigata",
    population: "2,099,000"
  },

  "Ōita": { 
    kanji: "大分", 
    hiragana: "おおいた", 
    desc: "je sais pas encore.",
    capitale: "Ōita",
    population: "1,085,000" 
  },

  "Okayama": { 
    kanji: "岡山", 
    hiragana: "おかやま", 
    desc: "je sais pas encore.",
    capitale: "Okayama",
    population: "1,831,000"
  },

  "Okinawa": { 
    kanji: "沖縄", 
    hiragana: "おきなわ", 
    desc: "prefecture du sud du Japon.",
    capitale: "Naha",
    population: "1,466,000"
  },

  "Ōsaka": { 
    kanji: "大阪", 
    hiragana: "おおさか", 
    desc: "je sais pas encore.",
    capitale: "Ōsaka",
    population: "8,757,000" 
  },

  "Saga": { 
    kanji: "佐賀", 
    hiragana: "さが", 
    desc: "je sais pas encore.",
    capitale: "Saga",
    population: "788,000" 
  },

  "Saitama": { 
    kanji: "埼玉", 
    hiragana: "さいたま", 
    desc: "je sais pas encore.",
    capitale: "Saitama",
    population: "7,332,000" 
  },

  "Shiga": { 
    kanji: "滋賀", 
    hiragana: "しが", 
    desc: "je sais pas encore.",
    capitale: "Ōtsu",
    population: "1,402,000" 
  },

  "Shimane": { 
    kanji: "島根", 
    hiragana: "しまね", 
    desc: "je sais pas encore.",
    capitale: "Matsue",
    population: "642,000" 
  },

  "Shizuoka": { 
    kanji: "静岡", 
    hiragana: "しずおか", 
    desc: "je sais pas encore.",
    capitale: "Shizuoka",
    population: "3,527,000" 
  },

  "Tochigi": { 
    kanji: "栃木", 
    hiragana: "とちぎ", 
    desc: "je sais pas encore.",
    capitale: "Utsunomiya",
    population: "1,885,000" 
  },

  "Tokushima": { 
    kanji: "徳島", 
    hiragana: "とくしま", 
    desc: "je sais pas encore.",
    capitale: "Tokushima",
    population: "685,000" 
  },

  "Tōkyō": { 
    kanji: "東京", 
    hiragana: "とうきょう", 
    desc: "je sais pas encore.",
    capitale: "Tōkyō",
    population: "14,178,000" 
  },

  "Tottori": { 
    kanji: "鳥取", 
    hiragana: "とっとり", 
    desc: "je sais pas encore.",
    capitale: "Tottori",
    population: "531,000" 
  },

  "Toyama": { 
    kanji: "富山", 
    hiragana: "とやま", 
    desc: "je sais pas encore.",
    capitale: "Toyama",
    population: "997,000" 
  },

  "Wakayama": { 
    kanji: "和歌山", 
    hiragana: "わかやま", 
    desc: "je sais pas encore.",
    capitale: "Wakayama",
    population: "880,000" 
  },

  "Yamagata": { 
    kanji: "山形", 
    hiragana: "やまがた", 
    desc: "prefecture du nord-est du Japon.",
    capitale: "Yamagata",
    population: "1,011,000" 
  },

  "Yamaguchi": { 
    kanji: "山口", 
    hiragana: "やまぐち", 
    desc: "je sais pas encore.",
    capitale: "Yamaguchi",
    population: "1,281,000" 
  },


  "Yamanashi": { 
    kanji: "山梨", 
    hiragana: "やまなし", 
    desc: "je sais pas encore.",
    capitale: "Kōfu",
    population: "791,000" 
  },


};

for (const key in prefecture_INFOS) {
  if (!prefecture_INFOS[key].romaji) {
    prefecture_INFOS[key].romaji = key;
  }
}

