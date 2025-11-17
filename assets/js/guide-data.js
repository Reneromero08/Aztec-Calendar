const daySigns = [
  {
    id: 1,
    name: "Cipactli",
    englishName: "Crocodile",
    glyph: "🐊",
    meaning: "The beginning, primordial energy, creation",
    element: "water",
    direction: "east",
    ruler: "Tonacatecuhtli",
    associations: ["beginnings", "creation", "primordial energy", "life force"]
  },
  {
    id: 2,
    name: "Ehecatl",
    englishName: "Wind",
    glyph: "💨",
    meaning: "Movement, change, communication, breath",
    element: "air",
    direction: "north",
    ruler: "Quetzalcoatl",
    associations: ["movement", "change", "communication", "breath", "intellect"]
  },
  {
    id: 3,
    name: "Calli",
    englishName: "House",
    glyph: "🏠",
    meaning: "Home, stability, protection, ancestors",
    element: "earth",
    direction: "west",
    ruler: "Tepeyollotl",
    associations: ["home", "stability", "protection", "ancestors", "foundation"]
  },
  {
    id: 4,
    name: "Cuetzpalin",
    englishName: "Lizard",
    glyph: "🦎",
    meaning: "Adaptation, survival, regeneration",
    element: "earth",
    direction: "south",
    ruler: "Huehuecoyotl",
    associations: ["adaptation", "survival", "regeneration", "flexibility"]
  },
  {
    id: 5,
    name: "Coatl",
    englishName: "Serpent",
    glyph: "🐍",
    meaning: "Transformation, wisdom, healing, duality",
    element: "earth",
    direction: "east",
    ruler: "Chalchiuhtlicue",
    associations: ["transformation", "wisdom", "healing", "duality", "renewal"]
  },
  {
    id: 6,
    name: "Miquiztli",
    englishName: "Death",
    glyph: "💀",
    meaning: "Transition, endings, transformation, ancestors",
    element: "earth",
    direction: "north",
    ruler: "Tecciztecatl",
    associations: ["transition", "endings", "transformation", "ancestors", "rebirth"]
  },
  {
    id: 7,
    name: "Mazatl",
    englishName: "Deer",
    glyph: "🦌",
    meaning: "Gentleness, grace, swiftness, connection to nature",
    element: "earth",
    direction: "west",
    ruler: "Tlaloc",
    associations: ["gentleness", "grace", "swiftness", "nature", "harmony"]
  },
  {
    id: 8,
    name: "Tochtli",
    englishName: "Rabbit",
    glyph: "🐰",
    meaning: "Fertility, abundance, creativity, playfulness",
    element: "earth",
    direction: "south",
    ruler: "Mayahuel",
    associations: ["fertility", "abundance", "creativity", "playfulness", "joy"]
  },
  {
    id: 9,
    name: "Atl",
    englishName: "Water",
    glyph: "💧",
    meaning: "Purification, emotions, flow, life",
    element: "water",
    direction: "east",
    ruler: "Xiuhtecuhtli",
    associations: ["purification", "emotions", "flow", "life", "healing"]
  },
  {
    id: 10,
    name: "Itzcuintli",
    englishName: "Dog",
    glyph: "🐕",
    meaning: "Loyalty, companionship, protection, guidance",
    element: "earth",
    direction: "north",
    ruler: "Mictlantecuhtli",
    associations: ["loyalty", "companionship", "protection", "guidance", "faithfulness"]
  },
  {
    id: 11,
    name: "Ozomatli",
    englishName: "Monkey",
    glyph: "🐵",
    meaning: "Playfulness, creativity, intelligence, mischief",
    element: "earth",
    direction: "west",
    ruler: "Xochipilli",
    associations: ["playfulness", "creativity", "intelligence", "mischief", "art"]
  },
  {
    id: 12,
    name: "Malinalli",
    englishName: "Grass",
    glyph: "🌾",
    meaning: "Renewal, perseverance, flexibility, growth",
    element: "earth",
    direction: "south",
    ruler: "Patecatl",
    associations: ["renewal", "perseverance", "flexibility", "growth", "resilience"]
  },
  {
    id: 13,
    name: "Acatl",
    englishName: "Reed",
    glyph: "🎋",
    meaning: "Knowledge, communication, authority, flexibility",
    element: "earth",
    direction: "east",
    ruler: "Tezcatlipoca",
    associations: ["knowledge", "communication", "authority", "flexibility", "learning"]
  },
  {
    id: 14,
    name: "Ocelotl",
    englishName: "Jaguar",
    glyph: "🐆",
    meaning: "Power, courage, strength, night energy",
    element: "earth",
    direction: "north",
    ruler: "Tlazolteotl",
    associations: ["power", "courage", "strength", "night", "warrior energy"]
  },
  {
    id: 15,
    name: "Quauhtli",
    englishName: "Eagle",
    glyph: "🦅",
    meaning: "Vision, freedom, leadership, spiritual connection",
    element: "air",
    direction: "west",
    ruler: "Xipe Totec",
    associations: ["vision", "freedom", "leadership", "spiritual", "higher perspective"]
  },
  {
    id: 16,
    name: "Cozcaquauhtli",
    englishName: "Buzzard",
    glyph: "🦅",
    meaning: "Purification, transformation, patience, wisdom",
    element: "air",
    direction: "south",
    ruler: "Itztlacoliuhqui",
    associations: ["purification", "transformation", "patience", "wisdom", "cleansing"]
  },
  {
    id: 17,
    name: "Ollin",
    englishName: "Movement",
    glyph: "🌊",
    meaning: "Change, balance, cosmic energy, earthquake",
    element: "earth",
    direction: "east",
    ruler: "Xolotl",
    associations: ["change", "balance", "cosmic energy", "earthquake", "dynamic energy"]
  },
  {
    id: 18,
    name: "Tepoztlac",
    englishName: "Stone",
    glyph: "🪨",
    meaning: "Foundation, permanence, resistance, ancient wisdom",
    element: "earth",
    direction: "north",
    ruler: "Tlaloc",
    associations: ["foundation", "permanence", "resistance", "ancient wisdom", "stability"]
  },
  {
    id: 19,
    name: "Quiahuitl",
    englishName: "Rain",
    glyph: "🌧️",
    meaning: "Blessing, purification, growth, emotional release",
    element: "water",
    direction: "west",
    ruler: "Tlaloc",
    associations: ["blessing", "purification", "growth", "emotional release", "fertility"]
  },
  {
    id: 20,
    name: "Xochitl",
    englishName: "Flower",
    glyph: "🌸",
    meaning: "Beauty, creativity, pleasure, spiritual blossoming",
    element: "earth",
    direction: "south",
    ruler: "Xochiquetzal",
    associations: ["beauty", "creativity", "pleasure", "spiritual blossoming", "art"]
  }
];

const tonalpohualliNumbers = [
  {
    number: 1,
    name: "Ce",
    meaning: "Beginning, unity, origin",
    associations: ["leadership", "initiation", "new starts", "individuality"],
    direction: "east",
    element: "fire",
    qualities: ["pioneering", "independent", "creative", "original"]
  },
  {
    number: 2,
    name: "Ome",
    meaning: "Duality, balance, partnership",
    associations: ["relationships", "cooperation", "balance", "choice"],
    direction: "west",
    element: "earth",
    qualities: ["diplomatic", "cooperative", "sensitive", "intuitive"]
  },
  {
    number: 3,
    name: "Yei",
    meaning: "Creation, expression, communication",
    associations: ["creativity", "communication", "expression", "growth"],
    direction: "south",
    element: "air",
    qualities: ["expressive", "social", "optimistic", "creative"]
  },
  {
    number: 4,
    name: "Nahui",
    meaning: "Foundation, stability, order",
    associations: ["stability", "order", "foundation", "practicality"],
    direction: "north",
    element: "earth",
    qualities: ["practical", "organized", "reliable", "hardworking"]
  },
  {
    number: 5,
    name: "Macuilli",
    meaning: "Change, freedom, adventure",
    associations: ["freedom", "change", "adventure", "versatility"],
    direction: "east",
    element: "air",
    qualities: ["adventurous", "versatile", "curious", "freedom-loving"]
  },
  {
    number: 6,
    name: "Chicuace",
    meaning: "Harmony, responsibility, service",
    associations: ["harmony", "responsibility", "service", "healing"],
    direction: "west",
    element: "water",
    qualities: ["responsible", "caring", "harmonious", "nurturing"]
  },
  {
    number: 7,
    name: "Chicome",
    meaning: "Spirituality, intuition, wisdom",
    associations: ["spirituality", "intuition", "wisdom", "analysis"],
    direction: "south",
    element: "water",
    qualities: ["spiritual", "intuitive", "analytical", "wise"]
  },
  {
    number: 8,
    name: "Chicuei",
    meaning: "Power, abundance, manifestation",
    associations: ["power", "abundance", "manifestation", "success"],
    direction: "north",
    element: "earth",
    qualities: ["powerful", "successful", "material", "confident"]
  },
  {
    number: 9,
    name: "Chicnahui",
    meaning: "Completion, wisdom, humanitarianism",
    associations: ["completion", "wisdom", "humanitarianism", "compassion"],
    direction: "east",
    element: "fire",
    qualities: ["compassionate", "wise", "humanitarian", "idealistic"]
  },
  {
    number: 10,
    name: "Matlactli",
    meaning: "Manifestation, creation, leadership",
    associations: ["manifestation", "creation", "leadership", "confidence"],
    direction: "west",
    element: "water",
    qualities: ["confident", "creative", "leader", "charismatic"]
  },
  {
    number: 11,
    name: "Matlactli huan ce",
    meaning: "Inspiration, intuition, spiritual insight",
    associations: ["inspiration", "intuition", "spiritual insight", "channeling"],
    direction: "south",
    element: "air",
    qualities: ["inspired", "intuitive", "spiritual", "channeling"]
  },
  {
    number: 12,
    name: "Matlactli huan ome",
    meaning: "Knowledge, learning, teaching",
    associations: ["knowledge", "learning", "teaching", "communication"],
    direction: "north",
    element: "earth",
    qualities: ["knowledgeable", "teacher", "communicator", "learner"]
  },
  {
    number: 13,
    name: "Matlactli huan yei",
    meaning: "Transformation, cosmic connection, completion",
    associations: ["transformation", "cosmic connection", "completion", "ascension"],
    direction: "east",
    element: "fire",
    qualities: ["transformational", "cosmic", "complete", "ascended"]
  }
];

const xiuhpohualliMonths = [
  {
    id: 1,
    name: "Atlcahualo",
    englishName: "Water left",
    days: 20,
    meaning: "Time of water offerings and purification",
    season: "spring",
    associatedDeity: "Tlaloc",
    ceremonies: ["water offerings", "rain ceremonies", "purification rituals"],
    agriculturalActivity: "preparing fields for planting"
  },
  {
    id: 2,
    name: "Tlacaxipehualiztli",
    englishName: "Flaying of men",
    days: 20,
    meaning: "Festival of renewal and regeneration",
    season: "spring",
    associatedDeity: "Xipe Totec",
    ceremonies: ["renewal ceremonies", "fertility rites", "seed blessings"],
    agriculturalActivity: "planting season begins"
  },
  {
    id: 3,
    name: "Tozoztontli",
    englishName: "Little vigil",
    days: 20,
    meaning: "Time of vigilance and protection",
    season: "spring",
    associatedDeity: "Centeotl",
    ceremonies: ["vigil ceremonies", "crop protection", "ancestral offerings"],
    agriculturalActivity: "protecting young crops"
  },
  {
    id: 4,
    name: "Huei Tozoztli",
    englishName: "Great vigil",
    days: 20,
    meaning: "Extended period of protection and growth",
    season: "spring",
    associatedDeity: "Centeotl",
    ceremonies: ["extended vigils", "growth ceremonies", "corn offerings"],
    agriculturalActivity: "monitoring crop growth"
  },
  {
    id: 5,
    name: "Toxcatl",
    englishName: "Drought",
    days: 20,
    meaning: "Time of sun and dryness",
    season: "summer",
    associatedDeity: "Tezcatlipoca",
    ceremonies: ["sun ceremonies", "warrior rituals", "youth festivals"],
    agriculturalActivity: "crops maturing in sun"
  },
  {
    id: 6,
    name: "Etzal",
    englishName: "Corn",
    days: 20,
    meaning: "Time of corn and sustenance",
    season: "summer",
    associatedDeity: "Centeotl",
    ceremonies: ["corn festivals", "harvest preparation", "food offerings"],
    agriculturalActivity: "corn beginning to ripen"
  },
  {
    id: 7,
    name: "Tecuilhuitontli",
    englishName: "Little feast of the lords",
    days: 20,
    meaning: "Feast time for the nobility",
    season: "summer",
    associatedDeity: "Huixtocihuatl",
    ceremonies: ["noble feasts", "salt ceremonies", "social gatherings"],
    agriculturalActivity: "early harvesting of some crops"
  },
  {
    id: 8,
    name: "Huei Tecuilhuitl",
    englishName: "Great feast of the lords",
    days: 20,
    meaning: "Major feast and celebration time",
    season: "summer",
    associatedDeity: "Xilonen",
    ceremonies: ["great feasts", "dance ceremonies", "community celebrations"],
    agriculturalActivity: "harvesting of early crops"
  },
  {
    id: 9,
    name: "Tlaxochimaco",
    englishName: "Giving of flowers",
    days: 20,
    meaning: "Time of flower offerings and beauty",
    season: "late summer",
    associatedDeity: "Xochipilli",
    ceremonies: ["flower offerings", "art ceremonies", "beauty rituals"],
    agriculturalActivity: "flowers in bloom, main harvest begins"
  },
  {
    id: 10,
    name: "Xocotlhuetzi",
    englishName: "Fruit falls",
    days: 20,
    meaning: "Time of fruit harvest and abundance",
    season: "autumn",
    associatedDeity: "Xocotl",
    ceremonies: ["fruit harvest festivals", "abundance celebrations", "food sharing"],
    agriculturalActivity: "main fruit harvest"
  },
  {
    id: 11,
    name: "Ochpaniztli",
    englishName: "Sweeping",
    days: 20,
    meaning: "Time of cleaning and renewal",
    season: "autumn",
    associatedDeity: "Toci",
    ceremonies: ["cleaning ceremonies", "renewal rituals", "preparation for new cycle"],
    agriculturalActivity: "clearing fields, preparing for next season"
  },
  {
    id: 12,
    name: "Teotleco",
    englishName: "Arrival of gods",
    days: 20,
    meaning: "Time when gods arrive on earth",
    season: "autumn",
    associatedDeity: "Multiple deities",
    ceremonies: ["deity welcoming ceremonies", "divination", "ancestor communication"],
    agriculturalActivity: "storing harvest, final field clearing"
  },
  {
    id: 13,
    name: "Tepeilhuitl",
    englishName: "Feast of the mountains",
    days: 20,
    meaning: "Honoring mountain spirits and earth",
    season: "autumn",
    associatedDeity: "Tlaltecuchtli",
    ceremonies: ["mountain offerings", "earth ceremonies", "nature honors"],
    agriculturalActivity: "earth resting period begins"
  },
  {
    id: 14,
    name: "Quecholli",
    englishName: "Flamingo",
    days: 20,
    meaning: "Time of hunting and warrior preparation",
    season: "winter",
    associatedDeity: "Mixcoatl",
    ceremonies: ["hunting rituals", "warrior preparation", "hunting ceremonies"],
    agriculturalActivity: "hunting season, agricultural rest"
  },
  {
    id: 15,
    name: "Panquetzaliztli",
    englishName: "Raising of banners",
    days: 20,
    meaning: "Time of Huitzilopochtli and warrior honor",
    season: "winter",
    associatedDeity: "Huitzilopochtli",
    ceremonies: ["banner raising", "warrior ceremonies", "victory celebrations"],
    agriculturalActivity: "deep winter, agricultural rest"
  },
  {
    id: 16,
    name: "Atemoztli",
    englishName: "Descent of water",
    days: 20,
    meaning: "Time of water's return and preparation",
    season: "winter",
    associatedDeity: "Tlaloc",
    ceremonies: ["water ceremonies", "rain preparation", "purification"],
    agriculturalActivity: "preparing for agricultural cycle renewal"
  },
  {
    id: 17,
    name: "Tititl",
    englishName: "Stretch",
    days: 20,
    meaning: "Time of stretching and preparation for new year",
    season: "late winter",
    associatedDeity: "Ilamatecuhtli",
    ceremonies: ["stretching ceremonies", "new year preparation", "ancestral honors"],
    agriculturalActivity: "final preparations for planting season"
  },
  {
    id: 18,
    name: "Izcalli",
    englishName: "Sprout",
    days: 20,
    meaning: "Time of rebirth and new growth",
    season: "late winter",
    associatedDeity: "Xiuhtecuhtli",
    ceremonies: ["rebirth ceremonies", "fire festivals", "new beginnings"],
    agriculturalActivity: "preparing for spring planting"
  }
];

function renderDaySignCards() {
  const container = document.getElementById('day-signs-container');
  if (!container) return;

  const html = daySigns.map(sign => `
    <article id="day-sign-${sign.id}" class="card day-sign-card">
      <div class="day-sign-glyph" aria-label="${sign.englishName} day sign">${sign.glyph}</div>
      <h3 class="day-sign-name">${sign.name}</h3>
      <p class="day-sign-english">${sign.englishName}</p>
      <p class="day-sign-meaning">"${sign.meaning}"</p>
      <div class="day-sign-details">
        <div class="detail-item">
          <div class="detail-label">Element</div>
          <div class="detail-value">${sign.element}</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">Direction</div>
          <div class="detail-value">${sign.direction}</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">Ruler</div>
          <div class="detail-value" style="font-size: 0.8rem;">${sign.ruler}</div>
        </div>
      </div>
      <div class="associations">
        <div class="associations-label">Associations</div>
        <div class="associations-list">
          ${sign.associations.map(a => `<span class="association-tag">${a}</span>`).join('')}
        </div>
      </div>
    </article>
  `).join('');

  container.innerHTML = html;
}

function renderNumberCards() {
  const container = document.getElementById('numbers-container');
  if (!container) return;

  const html = tonalpohualliNumbers.map(num => `
    <article id="number-${num.number}" class="card number-card">
      <div class="number-value">${num.number}</div>
      <h3 class="number-name">${num.name}</h3>
      <p class="number-meaning">"${num.meaning}"</p>
      <div class="grid-2-col">
        <div class="detail-item">
          <div class="detail-label">Element</div>
          <div class="detail-value">${num.element}</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">Direction</div>
          <div class="detail-value">${num.direction}</div>
        </div>
      </div>
      <div class="associations">
        <div class="associations-label">Qualities</div>
        <div class="associations-list">
          ${num.qualities.map(q => `<span class="association-tag">${q}</span>`).join('')}
        </div>
      </div>
    </article>
  `).join('');

  container.innerHTML = html;
}

function renderMonthCards() {
  const container = document.getElementById('months-container');
  if (!container) return;

  const html = xiuhpohualliMonths.map((month, idx) => `
    <article id="month-${idx + 1}" class="card month-card">
      <h3 class="month-name">${month.name}</h3>
      <p class="month-english">"${month.englishName}"</p>
      <p class="month-meaning">"${month.meaning}"</p>
      <div class="grid-2-col">
        <div class="detail-item">
          <div class="detail-label">Days</div>
          <div class="detail-value">${month.days} days</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">Season</div>
          <div class="detail-value">${month.season}</div>
        </div>
        <div class="detail-item">
          <div class="detail-label">Deity</div>
          <div class="detail-value" style="font-size: 0.8rem;">${month.associatedDeity}</div>
        </div>
      </div>
      <div class="associations">
        <div class="associations-label">Agricultural Activity</div>
        <div style="font-size: 0.9rem; color: var(--color-ink);">${month.agriculturalActivity}</div>
      </div>
    </article>
  `).join('');

  container.innerHTML = html;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    renderDaySignCards();
    renderNumberCards();
    renderMonthCards();
  });
} else {
  renderDaySignCards();
  renderNumberCards();
  renderMonthCards();
}
