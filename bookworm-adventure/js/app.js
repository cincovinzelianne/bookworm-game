const WORDS = new Set(
  `able acid aged also area army away baby back ball band bank base bath bear beat been bell belt best bill bird blow blue boat body bomb bond bone book boot born boss both bowl bulk burn bush busy cafe cake call calm came camp card care cart case cash cast cell chat chip city clay club coal coat code cold come cook cool cope copy core corn cost crew crop dark data date dawn days dead deal dear debt deep deer desk dial diet dirt disk dock does dome done door dose down draw drew drop drum dual duke dust duty each earn ease east easy edge else even ever evil exit face fact fail fair fall farm fast fate fear feed feel feet fell felt file fill film find fine fire firm fish five flat flew flow folk food foot ford form fort four free from fuel full fund gain game gate gave gear gift girl give glad goal goes gold golf gone good grab gray grew grid grow gulf hair half hall hand hang hard harm hate have head hear heat held hell help here hero hide high hill hold hole holy home hope horn host hour huge hunt hurt idea inch into iron item jack join joke jump jury just keen keep kept kick kill kind king knee knew know lack lady laid lake land lane last late lead left less life lift like line link lion list live load loan lock logo long look lord lose loss lost loud love luck made mail main make male many mark mass math meal mean meat meet menu mild mile milk mill mind mine miss mode mood moon more most move much must myth name navy near neck need news next nice nine node none noon nose note okay once only onto open oral over pace pack page paid pain pair palm park part pass past path peak pick pile pine pink pipe plan play plot plug plus poem pole poll pond pool poor port post pull pure push race rail rain rank rare rate read real rear rely rent rest rice rich ride ring rise risk road rock role roll roof room root rope rose rule rush safe sail sake sale salt same sand save seat seed seek seem seen self sell send sent ship shop shot show shut sick side sign silk sing sink site size skin slip slow snow soft soil sold sole some song soon sort soul soup spot star stay stem step stop such suit sure swim tail take tale talk tall tank tape task team tear tell tend term test text than that them then they thin this thus tide tied till time tiny tire told toll tone took tool tops tour town tree trip true tube tune turn twin type unit upon used user vast very view vote wage wait wake walk wall want warm wash wave ways weak wear week well went were west what when whom wide wife wild will wind wine wing wire wise wish with wolf wood word wore work worm wrap yard yeah year your zero zone
about above acorn actor adult after again agent agree ahead alarm album alert alike alive allow alone along alter among angel anger angle angry ankle apple apply arena argue arise armor array arrow aside asset avoid awake award aware badge baker basic basin batch beach beard beast begin being belly below bench berry birth black blade blame blank blast blaze bleed blend bless blind block blood bloom blown board boast bonus boost booth bound brain brake brand brave bread break breed brick bride brief bring broad broke brook brown brush build built bunch burst cabin cable camel candy canoe carry carve catch cause chain chair chalk charm chart chase cheap check cheek cheer chess chest chief child chill chime choir chose civil claim class clean clear clerk click cliff climb clock close cloth cloud clown coach coast color comet comic coral couch could count court cover crack craft crane crash crawl crazy cream crest crime crisp cross crowd crown crumb crush curve cycle daily dance dealt death debut decay delay dense depth diary digit dirty ditch dodge doubt dough dozen draft drain drama drank drawn dream dress dried drift drill drink drive drove eager eagle early earth eight elbow elder elect elite empty enemy enjoy enter equal error essay event every exact exist extra fable faint fairy faith false fancy fatal feast fence fever fiber field fifth fifty fight final first flame flash fleet flesh flight float flock flood floor flour fluid flute focus force forge forth forty forum found frame fresh front frost fruit fully giant given glass globe glory glove going grace grade grain grand grant grape graph grasp grass grave great green greet grief grill grind groan gross group grove grown guard guess guest guide habit happy harsh haste heart heavy hedge hello hence honey honor horse hotel house human humor hurry ideal image imply index inner input irony ivory jelly jewel joint judge juice knife knock known label labor large laser later laugh layer learn lease least leave legal lemon level light limit linen liver lobby local lodge logic loose lover lower loyal lucky lunch magic major maker maple march match maybe mayor meant medal media mercy merge merit metal meter might minor mixed model money month moral motor mount mouse mouth movie music naive nasty naval nerve never newly night noble noise north novel nurse ocean offer often olive onion opera orbit order other otter ought outer owner paint panel paper party pasta patch pause peace pearl phase phone photo piano piece pilot pitch pizza place plain plane plant plate plaza point polar porch pound power press price pride prime print prize proof proud prove pulse punch pupil queen query quest quick quiet quite quote radar radio raise rally ranch range rapid ratio reach react ready realm rebel refer relax reply rider ridge rifle right rigid rival river roast robin robot rocky rough round route royal rural sadly saint salad sauce scale scare scene scent scope score scout screw sense serve seven shade shadow shake shall shape share sharp sheep sheet shelf shell shift shine shirt shock shoot shore short shout sight silly since sixth skill skirt sleep slice slide slope small smart smell smile smoke snake solid solve sorry sound south space spare spark speak speed spell spend spice spine spoke spoon sport spray squad stack staff stage stair stake stamp stand stare start state steak steal steam steel steep stick stiff still stock stone stood store storm story stove straw strip stuck study stuff style sugar suite sunny super surge swamp swear sweat sweep sweet swept swift swing sword table taken taste teach teeth thank theme there thick thing think third those three threw throw thumb tiger tight timer tired title toast today token tooth topic total touch tough tower toxic trace track trade trail train trait treat trend trial tribe trick tried troop truck truly trunk trust truth twice twist ultra uncle under union unite unity until upper upset urban usage usual valid value vapor vault verse video vigor villa vines vinyl viral visit vital vivid vocal voice waste watch water weary weave weigh weird whale wheat wheel where which while white whole whose widow width witch woman world worry worse worst worth would wound woven wrist write wrong yield young youth zebra
bridge candle castle garden golden dragon wizard forest knight silver winter summer spring magic rabbit turtle pocket basket button butter cookie cotton flower hunter island jungle kitten ladder lizard marble monkey needle orange pepper pillow planet pirate rocket school spider street tunnel violin window wonder yellow zipper author battle beauty belong bottle bright broken button chance change circle cursor dinner doctor double family famous father finger flight friend golden hammer happen heaven hidden hunger insect letter listen little lovely modern moment mother nature number object orange outlet people planet pretty pursue quiet reader remain remind repair rescue return reward rhythm sketch spirit sprout stream strike sunset system talent thirst thunder travel unique valley wisdom writer adventure library monster stories journey mystery crystal pattern thought fiction lantern chapter pages paper reading wizards treasure wander whisper shadows`.split(
    /\s+/,
  ),
);
const PTS = {
  E: 1,
  A: 1,
  I: 1,
  O: 1,
  N: 1,
  R: 1,
  T: 1,
  L: 1,
  S: 1,
  U: 1,
  D: 2,
  G: 2,
  B: 3,
  C: 3,
  M: 3,
  P: 3,
  F: 4,
  H: 4,
  V: 4,
  W: 4,
  Y: 4,
  K: 5,
  J: 8,
  X: 8,
  Z: 10,
};
const BAG =
  "EEEEEEEEEEEEAAAAAAAAAIIIIIIIIOOOOOOOONNNNNNRRRRRRTTTTTTLLLLSSSSUUUUDDDDGGGBBCCMMPPFFHHVVWWYYKJXZ";
const VOW = "AEIOU";
const hero = `<svg viewBox="0 0 160 150"><ellipse cx="80" cy="144" rx="60" ry="6" fill="#0006"/>
<g class="seg" style="animation-delay:.6s"><circle cx="28" cy="122" r="22" fill="#7bd35c"/></g><g class="seg" style="animation-delay:.4s"><circle cx="58" cy="118" r="25" fill="#8fe06c"/></g><g class="seg" style="animation-delay:.2s"><circle cx="92" cy="104" r="30" fill="#a4ee7a"/></g>
<g class="seg"><circle cx="104" cy="62" r="36" fill="#b9f78d"/>
<path d="M92 28q-6-18 8-20M112 28q4-16 18-14" stroke="#5aa83c" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="100" cy="8" r="5" fill="#ffd23f"/><circle cx="130" cy="14" r="5" fill="#ffd23f"/></g>
<!--skin-item--><!--skin-face--></svg>`;
const SKIN_PALETTES = [
  ["garden", "Garden", 0, "#b9f78d", "#a4ee7a", "#7bd35c", "#5aa83c"],
  ["moonbeam", "Moonbeam", 30, "#b2dcff", "#90c4f1", "#6092c9", "#4778ae"],
  ["berry", "Berry", 45, "#ffabc1", "#e87ba0", "#b44772", "#92375c"],
  ["ocean", "Ocean", 60, "#8be7d5", "#4cc9c0", "#258b91", "#176970"],
  ["sunfire", "Sunfire", 75, "#ffdb78", "#ffb94f", "#d4742e", "#ac5424"],
  ["lavender", "Lavender", 35, "#d5b5ff", "#b68ce8", "#8458bd", "#654092"],
  ["mint", "Mint", 40, "#b6f7ce", "#7bdfa4", "#42a972", "#2c8052"],
  ["rose", "Rose", 45, "#ffc4bc", "#f28e86", "#ce5a61", "#a8404b"],
  ["cocoa", "Cocoa", 50, "#d9b38b", "#bb8b63", "#885d42", "#68432e"],
  ["sky", "Sky", 55, "#c2eeff", "#7dd3ef", "#3d9fc6", "#287596"],
  ["lemon", "Lemon", 60, "#fff39b", "#e9d45d", "#baa537", "#87782b"],
  ["lilac", "Lilac", 65, "#f2c5ff", "#d393ec", "#a553bd", "#793a91"],
  ["pebble", "Pebble", 70, "#d5d6ca", "#b4b8aa", "#858c81", "#5d655e"],
  ["peach", "Peach", 75, "#ffe0bd", "#f7b98e", "#d98a68", "#a9614e"],
  ["bluebell", "Bluebell", 80, "#d3d9ff", "#a8b2f3", "#7783cb", "#535b98"],
  ["sprout", "Sprout", 85, "#d6f5a1", "#a7d66c", "#75a849", "#4d793c"],
];
const RARE_SKINS = [
  [
    "starlight",
    "Starlight",
    130,
    "#c4d2ff",
    "#8ba6f5",
    "#6175cb",
    "#45549b",
    "stars",
  ],
  [
    "mosskeeper",
    "Mosskeeper",
    145,
    "#d5e78a",
    "#a4c55a",
    "#718d36",
    "#4e6727",
    "leaves",
  ],
  [
    "candyfloss",
    "Candyfloss",
    160,
    "#ffc3e7",
    "#f18acb",
    "#c65caa",
    "#984183",
    "freckles",
  ],
  [
    "frostbite",
    "Frostbite",
    175,
    "#ddffff",
    "#94e6e9",
    "#51b5c5",
    "#348493",
    "ice",
  ],
  [
    "copperleaf",
    "Copperleaf",
    190,
    "#ffd095",
    "#e79a56",
    "#b76536",
    "#854425",
    "scales",
  ],
  [
    "nightink",
    "Night Ink",
    205,
    "#a9a8d7",
    "#77759f",
    "#504c78",
    "#393550",
    "glasses",
  ],
  [
    "meadow",
    "Meadow",
    220,
    "#e5f591",
    "#b7d85d",
    "#7aa744",
    "#567832",
    "blossoms",
  ],
  [
    "tidepool",
    "Tidepool",
    235,
    "#9ef1e8",
    "#5dcbbb",
    "#359789",
    "#246c63",
    "bubbles",
  ],
  [
    "emberfox",
    "Emberfox",
    255,
    "#ffd09a",
    "#ed9a65",
    "#bd6549",
    "#85443b",
    "phoenix",
  ],
  [
    "glacier",
    "Glacier",
    275,
    "#e2fbff",
    "#9bdde9",
    "#64a9c5",
    "#3f718f",
    "ice",
  ],
  [
    "sunpetal",
    "Sunpetal",
    295,
    "#fff1a8",
    "#f3ce68",
    "#cb9445",
    "#8f6534",
    "blossoms",
  ],
  [
    "twilight",
    "Twilight",
    315,
    "#e4c9ff",
    "#ae8ad7",
    "#7859ad",
    "#514078",
    "stars",
  ],
];
const EPIC_SKINS = [
  [
    "dragonling",
    "Dragonling",
    350,
    "#ffaf76",
    "#ed7148",
    "#bd4537",
    "#87302d",
    "dragon",
  ],
  [
    "royalreader",
    "Royal Reader",
    380,
    "#ffe88f",
    "#e9bd50",
    "#b88634",
    "#805b26",
    "crown",
  ],
  [
    "starweaver",
    "Starweaver",
    410,
    "#e8c4ff",
    "#ba88e8",
    "#8555c1",
    "#5b398e",
    "wizard",
  ],
  [
    "shellguard",
    "Shellguard",
    440,
    "#d8d1bd",
    "#aaa38d",
    "#777360",
    "#514f43",
    "armor",
  ],
  [
    "dreamwing",
    "Dreamwing",
    470,
    "#ffc7e7",
    "#ed9ed3",
    "#ba70ab",
    "#84517e",
    "wings",
  ],
  [
    "aurora",
    "Aurora",
    500,
    "#baffec",
    "#74dbc1",
    "#439b96",
    "#2b6b72",
    "aurora",
  ],
  [
    "runekeeper",
    "Runekeeper",
    540,
    "#c5eaff",
    "#7ab9e2",
    "#4c7fb4",
    "#315781",
    "wizard",
  ],
  [
    "coralwarden",
    "Coral Warden",
    575,
    "#ffe0d2",
    "#e89884",
    "#b7656d",
    "#7c4257",
    "armor",
  ],
  [
    "thunderbud",
    "Thunderbud",
    610,
    "#e0f9ff",
    "#9cd9ed",
    "#5ca5ce",
    "#3d699e",
    "storm",
  ],
  [
    "honeycomet",
    "Honey Comet",
    650,
    "#fff0a5",
    "#f2c65f",
    "#d18b3f",
    "#8c5734",
    "celestial",
  ],
  [
    "shadowbloom",
    "Shadowbloom",
    690,
    "#efceff",
    "#bd89d8",
    "#80519e",
    "#55366f",
    "void",
  ],
  [
    "crystalknight",
    "Crystal Knight",
    740,
    "#d9fff6",
    "#91daca",
    "#539f9c",
    "#35666f",
    "armor",
  ],
];
const LEGENDARY_SKINS = [
  [
    "phoenix",
    "Phoenix Reborn",
    900,
    "#fff0a1",
    "#ff9d45",
    "#e54c38",
    "#a92e43",
    "phoenix",
    "inferno",
  ],
  [
    "celestial",
    "Celestial",
    1050,
    "#f6d5ff",
    "#ce9cff",
    "#8b64dd",
    "#5539a2",
    "celestial",
    "nova",
  ],
  [
    "stormcaller",
    "Stormcaller",
    1200,
    "#d2f7ff",
    "#78d8ec",
    "#388ecc",
    "#245795",
    "storm",
    "thunder",
  ],
  [
    "verdantking",
    "Verdant King",
    1350,
    "#eaff9c",
    "#9bdd61",
    "#57a64b",
    "#337442",
    "verdant",
    "vine",
  ],
  [
    "voidwalker",
    "Voidwalker",
    1500,
    "#d4c8ee",
    "#9888bd",
    "#5b4b82",
    "#342c54",
    "void",
    "rift",
  ],
  [
    "starlord",
    "Star Lord",
    1700,
    "#fff2ad",
    "#e8bd62",
    "#ac793f",
    "#704b33",
    "starlord",
    "constellation",
  ],
  [
    "timekeeper",
    "Timekeeper",
    1900,
    "#c3fff4",
    "#78d9cb",
    "#428f9d",
    "#2b5b79",
    "timekeeper",
    "chronosphere",
  ],
  [
    "dawnempress",
    "Dawn Empress",
    2100,
    "#fff4c2",
    "#f0c875",
    "#c77b58",
    "#80505a",
    "crown",
    "nova",
  ],
  [
    "deeporacle",
    "Deep Oracle",
    2300,
    "#c9fff3",
    "#68cdbd",
    "#347e91",
    "#254964",
    "celestial",
    "tide",
  ],
  [
    "emberknight",
    "Ember Knight",
    2500,
    "#ffe2a1",
    "#e88851",
    "#a94c49",
    "#672e46",
    "armor",
    "inferno",
  ],
  [
    "frostoracle",
    "Frost Oracle",
    2750,
    "#edffff",
    "#a8ddf1",
    "#6c9dcc",
    "#465b9a",
    "ice",
    "nova",
  ],
  [
    "wildsovereign",
    "Wild Sovereign",
    3000,
    "#efffa9",
    "#a6d66b",
    "#5a9a54",
    "#34634b",
    "verdant",
    "vine",
  ],
  [
    "eclipsemonarch",
    "Eclipse Monarch",
    3300,
    "#f4d8ff",
    "#a98bd1",
    "#63548f",
    "#382f62",
    "void",
    "rift",
  ],
];
const MYTHIC_SKINS = [
  [
    "mythic-astral-dragon",
    "Astral Dragon",
    5000,
    "#c5ffff",
    "#73d9e8",
    "#398bc4",
    "#33447e",
    "astral",
    "mythic-dragon",
  ],
  [
    "mythic-solar-phoenix",
    "Solar Phoenix",
    5500,
    "#fff0a4",
    "#ff9f45",
    "#eb4c54",
    "#852b67",
    "solar",
    "mythic-phoenix",
  ],
  [
    "mythic-prism-butterfly",
    "Prism Butterfly",
    6000,
    "#ffe0fa",
    "#df91ee",
    "#8a7ae5",
    "#4953a3",
    "prism",
    "mythic-butterfly",
  ],
  [
    "mythic-moonstag",
    "Moonlit Stag",
    6500,
    "#e4e8ff",
    "#9da8ec",
    "#5f70bc",
    "#394779",
    "moon",
    "mythic-stag",
  ],
  [
    "mythic-tide-serpent",
    "Tide Serpent",
    7000,
    "#bdfff0",
    "#55d2c2",
    "#238aa4",
    "#285272",
    "tide",
    "mythic-serpent",
  ],
];
const SKIN_ACCESSORIES = {
  stars: `<g class="skin-accessory skin-float" fill="${"${accent}"}"><path d="m75 60 4 9 10 1-8 7 2 10-8-5-8 5 2-10-8-7 10-1z"/><path d="m133 88 3 6 7 1-5 5 1 7-6-4-6 4 1-7-5-5 7-1z"/></g>`,
  leaves: `<g class="skin-accessory skin-float" fill="${"${accent}"}"><path d="M75 41q-19-24-25-3 14 12 25 3zm6-1q8-30 22-17-2 17-22 17zm-12 8q-28-14-29 5 17 10 29-5z"/></g>`,
  freckles: `<g class="skin-accessory" fill="${"${accent}"}"><circle cx="78" cy="69" r="3"/><circle cx="84" cy="74" r="2"/><circle cx="76" cy="79" r="2"/><circle cx="132" cy="69" r="3"/><circle cx="138" cy="74" r="2"/><circle cx="130" cy="79" r="2"/></g>`,
  ice: `<g class="skin-accessory skin-float" fill="${"${accent}"}"><path d="m80 51 9 13-9 13-9-13zm57 0 9 13-9 13-9-13z"/><path d="m107 26 6 9-6 9-6-9z"/></g>`,
  scales: `<g class="skin-accessory" fill="none" stroke="${"${accent}"}" stroke-width="3"><path d="M82 89q7 8 14 0m-17 8q7 8 14 0m22-8q7 8 14 0m-17 8q7 8 14 0"/></g>`,
  glasses: `<g class="skin-accessory" fill="none" stroke="${"${accent}"}" stroke-width="4"><circle cx="92" cy="58" r="14"/><circle cx="118" cy="58" r="14"/><path d="M106 58h-2"/></g>`,
  blossoms: `<g class="skin-accessory skin-float" fill="${"${accent}"}"><path d="M77 46q-9-10 0-14 8 4 0 14 11-9 14 0-3 9-14 0 8 12-1 14-8-4 1-14-11 9-14 0 3-9 14 0zm59 0q-9-10 0-14 8 4 0 14 11-9 14 0-3 9-14 0 8 12-1 14-8-4 1-14-11 9-14 0 3-9 14 0z"/></g>`,
  bubbles: `<g class="skin-accessory skin-float" fill="none" stroke="${"${accent}"}" stroke-width="3"><circle cx="77" cy="67" r="7"/><circle cx="138" cy="69" r="5"/><circle cx="73" cy="87" r="3"/><circle cx="143" cy="87" r="3"/></g>`,
  dragon: `<g class="skin-accessory skin-float" fill="${"${accent}"}"><path d="M79 40 66 8l28 18 10-17 9 19 24-17-9 37q-25-13-49-8z"/><path d="m79 97 14 9-13 8 14 9-18 10-5-18z"/></g>`,
  crown: `<g class="skin-accessory skin-float" fill="${"${accent}"}" stroke="#6b471a" stroke-width="2"><path d="m72 43 6-25 16 17 12-25 13 25 18-17 4 30z"/><circle cx="105" cy="23" r="4" fill="#ff637d"/></g>`,
  wizard: `<g class="skin-accessory skin-float" fill="${"${accent}"}" stroke="#59367e" stroke-width="2"><path d="m70 47 30-42 32 43q-30-10-62-1z"/><path d="M68 45q32-8 67 2l-3 10H70z"/><path d="m99 26 4 8 9 1-7 6 2 8-8-5-7 5 2-8-7-6 9-1z" fill="#fff1a1"/></g>`,
  armor: `<g class="skin-accessory" fill="${"${accent}"}" stroke="#f1dfae" stroke-width="3"><path d="M58 103 43 112v14l19 8 11-17zm70 0 15 9v14l-19 8-11-17z"/><path d="m104 109 10 8-10 8-10-8z"/></g>`,
  wings: `<g class="skin-accessory skin-wings" fill="${"${accent}"}" fill-opacity=".72" stroke="#fff1fa" stroke-width="2"><path d="M77 91Q45 57 39 85q5 19 32 25-32 2-26 20 17 4 34-13z"/><path d="M133 91q32-34 38-6-5 19-32 25 32 2 26 20-17 4-32-13z"/></g>`,
  aurora: `<g class="skin-accessory skin-float" fill="none" stroke="${"${accent}"}" stroke-width="5" opacity=".8"><path d="M73 40q25-35 45 0t45 0"/><path d="M68 49q25-30 48 0t47 0" opacity=".55"/></g>`,
  phoenix: `<g class="skin-accessory skin-flame" fill="${"${accent}"}"><path d="M76 48Q49 12 82 0q-5 18 9 20Q90 2 113-5q-8 28 17 38 7-15 18-18-6 25-23 38-27-15-49-5z"/><path d="M64 91Q35 75 28 99q18-3 29 15m74-23q29-16 36 8-18-3-29 15" opacity=".82"/></g>`,
  celestial: `<g class="skin-accessory skin-float" fill="none" stroke="${"${accent}"}" stroke-width="3"><ellipse cx="104" cy="64" rx="57" ry="25" transform="rotate(-24 104 64)"/><ellipse cx="104" cy="64" rx="59" ry="29" transform="rotate(32 104 64)" opacity=".55"/><circle cx="153" cy="38" r="5" fill="#fff3ac"/></g>`,
  storm: `<g class="skin-accessory skin-float" fill="${"${accent}"}"><path d="m92 3-28 43h19l-9 29 38-48H92z"/><path d="M73 102q-15 17 0 29m65-29q15 17 0 29" fill="none" stroke="${"${accent}"}" stroke-width="5"/></g>`,
  verdant: `<g class="skin-accessory skin-float" fill="${"${accent}"}"><path d="M70 45Q45 18 62 11q12 4 12 21 3-28 19-22 8 14-11 32 26-18 34-3-2 17-33 15z"/><path d="M72 87q-24 8-10 26 16-8 10-26m58 0q24 8 10 26-16-8-10-26" stroke="#d7ff98" stroke-width="3"/></g>`,
  void: `<g class="skin-accessory skin-float" fill="none" stroke="${"${accent}"}" stroke-width="4"><circle cx="105" cy="62" r="62"/><circle cx="105" cy="62" r="51" stroke-dasharray="3 8"/><path d="m104 5 7 14-7 14-7-14z" fill="#fff"/></g>`,
  starlord: `<g class="skin-accessory skin-float" fill="${"${accent}"}"><path d="M76 42 91 5l13 31 25-28-4 39q-25-9-49-5z"/><path d="m147 85 5 10 11 2-8 8 2 11-10-5-10 5 2-11-8-8 11-2z"/><circle cx="77" cy="89" r="5"/></g>`,
  timekeeper: `<g class="skin-accessory skin-float" fill="none" stroke="${"${accent}"}" stroke-width="4"><circle cx="105" cy="62" r="58"/><circle cx="105" cy="62" r="46"/><path d="M105 30v33l23 13M74 24l-8-8m72 8 8-8"/></g>`,
};
const MYTHIC_SKIN_ART = {
  "mythic-dragon": (skin) => {
    const id = skin.id;
    return `<svg class="mythic-character mythic-dragon" viewBox="0 0 200 160" role="img" aria-label="${skin.name}">
      <defs>
        <linearGradient id="${id}-body" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${skin.accent}"/><stop offset=".52" stop-color="${skin.colors["#8fe06c"]}"/><stop offset="1" stop-color="${skin.shade}"/></linearGradient>
        <linearGradient id="${id}-wing" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${skin.accent}" stop-opacity=".95"/><stop offset="1" stop-color="${skin.colors["#7bd35c"]}" stop-opacity=".55"/></linearGradient>
        <radialGradient id="${id}-core"><stop stop-color="#fff"/><stop offset=".3" stop-color="${skin.accent}"/><stop offset="1" stop-color="${skin.accent}" stop-opacity="0"/></radialGradient>
        <filter id="${id}-glow"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <ellipse cx="101" cy="148" rx="70" ry="7" fill="#080d20" opacity=".55"/>
      <circle cx="103" cy="76" r="68" fill="url(#${id}-core)" opacity=".34"/>
      <g class="mythic-wings" stroke="${skin.shade}" stroke-width="3" stroke-linejoin="round">
        <path d="M92 84Q53 5 10 17l23 35-22-5 28 40-23 5 48 26 34-18z" fill="url(#${id}-wing)"/>
        <path d="m88 88-49-36m49 39L39 92m49-1-26 20M104 84q43-79 86-67l-23 35 22-5-28 40 23 5-48 26-34-18z" fill="url(#${id}-wing)"/>
        <path d="m110 88 49-36m-49 39 49 1m-49-1 26 20" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="2"/>
      </g>
      <path d="M52 119q24 22 53 5 23-14 40-22l13 8q-30 6-46 26-29 19-62-5z" fill="url(#${id}-body)" stroke="${skin.shade}" stroke-width="4"/>
      <path d="M62 128q-20 1-27-13l18 1-10-12 24 11m57-4 18 18-21-5 4 14-18-15" fill="${skin.accent}" stroke="${skin.shade}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M76 119q20 13 40 3m-29 0 2 7m10-4 2 6m39-17q17 8 31 5" fill="none" stroke="#fff5c8" stroke-opacity=".8" stroke-width="3"/>
      <path d="M129 77q12-25 34-14l18 17-11 20-29 2-17-12z" fill="url(#${id}-body)" stroke="${skin.shade}" stroke-width="4"/>
      <path d="m145 69 1-20 14 17m7 1 11-17 1 24" fill="${skin.accent}" stroke="${skin.shade}" stroke-width="4" stroke-linejoin="round"/>
      <path d="m157 85 17 2-14 7" fill="#fff1d3" stroke="${skin.shade}" stroke-width="2"/>
      <ellipse cx="151" cy="78" rx="7" ry="5" fill="#fff7cf"/><ellipse cx="153" cy="78" rx="2" ry="4" fill="${skin.shade}"/>
      <path d="M111 98q10 10 18 7m-53 16 12 7m31-19 10 7" fill="none" stroke="${skin.accent}" stroke-width="5" stroke-linecap="round"/>
      <circle class="skin-float" cx="105" cy="40" r="12" fill="${skin.accent}" opacity=".72" filter="url(#${id}-glow)"/>
      <path d="m105 32 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" fill="#fffbe0"/>
    </svg>`;
  },
  "mythic-phoenix": (skin) => {
    const id = skin.id;
    return `<svg class="mythic-character mythic-phoenix" viewBox="0 0 200 160" role="img" aria-label="${skin.name}">
      <defs>
        <linearGradient id="${id}-feather" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#fff5b0"/><stop offset=".38" stop-color="${skin.accent}"/><stop offset="1" stop-color="${skin.colors["#7bd35c"]}"/></linearGradient>
        <linearGradient id="${id}-body" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff2b1"/><stop offset=".5" stop-color="${skin.colors["#8fe06c"]}"/><stop offset="1" stop-color="${skin.shade}"/></linearGradient>
        <radialGradient id="${id}-aura"><stop stop-color="${skin.accent}" stop-opacity=".6"/><stop offset="1" stop-color="${skin.accent}" stop-opacity="0"/></radialGradient>
      </defs>
      <ellipse cx="100" cy="148" rx="58" ry="7" fill="#160c25" opacity=".52"/>
      <circle cx="100" cy="76" r="73" fill="url(#${id}-aura)"/>
      <g class="mythic-wings" stroke="${skin.shade}" stroke-width="2.5" stroke-linejoin="round">
        <path d="M91 96Q49 21 9 31q22 15 18 38L7 60q13 30 39 39L22 95q22 31 59 31z" fill="url(#${id}-feather)"/>
        <path d="M109 96q42-75 82-65-22 15-18 38l20-9q-13 30-39 39l24-4q-22 31-59 31z" fill="url(#${id}-feather)"/>
        <path d="M88 102Q55 64 29 47m40 64L28 96m84 6q33-38 59-55m-40 66 41-15" fill="none" stroke="#fff9dc" stroke-opacity=".75" stroke-width="3"/>
      </g>
      <path d="M72 120q-12 22-37 18 20-11 14-27 21 10 28-4m51 13q12 22 37 18-20-11-14-27-21 10-28-4" fill="url(#${id}-feather)" stroke="${skin.shade}" stroke-width="3"/>
      <path d="M78 105q-2-29 22-37 24 8 22 37l-9 24H87z" fill="url(#${id}-body)" stroke="${skin.shade}" stroke-width="4"/>
      <path d="M88 89q12 10 24 0m-17 16q5 4 10 0" fill="none" stroke="#fff5cb" stroke-width="3" stroke-linecap="round"/>
      <path d="M86 74q-17-25-3-44 1 16 12 19-2-27 12-39 0 27 17 36 11 6 2 25l-13 9z" fill="url(#${id}-feather)" stroke="${skin.shade}" stroke-width="3" stroke-linejoin="round"/>
      <path d="m119 76 18 5-17 8" fill="#fff4b1" stroke="${skin.shade}" stroke-width="2"/>
      <circle cx="113" cy="69" r="4" fill="#fff"/><circle cx="114" cy="69" r="2" fill="${skin.shade}"/>
      <path class="skin-flame" d="M96 128q-18 15-5 25 0-9 10-9 11 10 19-2-14 3-10-14" fill="${skin.accent}" opacity=".85"/>
      <path class="skin-float" d="m44 38 3-8 3 8 8 3-8 3-3 8-3-8-8-3z" fill="#fff8d5"/>
      <path class="skin-float" d="m157 47 2-6 3 6 6 2-6 2-3 6-2-6-6-2z" fill="#fff8d5"/>
    </svg>`;
  },
  "mythic-butterfly": (skin) => {
    const id = skin.id;
    return `<svg class="mythic-character mythic-butterfly" viewBox="0 0 200 160" role="img" aria-label="${skin.name}">
      <defs>
        <linearGradient id="${id}-wing" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff4ff"/><stop offset=".28" stop-color="${skin.accent}"/><stop offset=".7" stop-color="${skin.colors["#8fe06c"]}"/><stop offset="1" stop-color="${skin.shade}"/></linearGradient>
        <radialGradient id="${id}-shine"><stop stop-color="#fff"/><stop offset=".2" stop-color="${skin.accent}" stop-opacity=".86"/><stop offset="1" stop-color="${skin.accent}" stop-opacity="0"/></radialGradient>
        <filter id="${id}-glow"><feGaussianBlur stdDeviation="5"/></filter>
      </defs>
      <ellipse cx="100" cy="147" rx="53" ry="6" fill="#11102b" opacity=".45"/>
      <circle cx="100" cy="80" r="72" fill="url(#${id}-shine)" opacity=".55"/>
      <g class="mythic-wings" stroke="${skin.shade}" stroke-width="3">
        <path d="M91 81Q73 13 31 24 3 31 20 66q8 17 28 23-31 13-21 39 13 21 41 3 20-14 32-42z" fill="url(#${id}-wing)"/>
        <path d="M109 81q18-68 60-57 28 7 11 42-8 17-28 23 31 13 21 39-13 21-41 3-20-14-32-42z" fill="url(#${id}-wing)"/>
        <path d="M96 83Q69 46 32 31m64 56Q61 75 29 119m75-36q27-37 64-52m-64 61q35-9 67 27" fill="none" stroke="#fff" stroke-opacity=".85" stroke-width="3"/>
        <circle cx="45" cy="70" r="13" fill="none" stroke="#fff9d8" stroke-width="4"/><circle cx="155" cy="70" r="13" fill="none" stroke="#fff9d8" stroke-width="4"/>
        <circle cx="51" cy="116" r="8" fill="${skin.accent}" stroke="#fff" stroke-width="3"/><circle cx="149" cy="116" r="8" fill="${skin.accent}" stroke="#fff" stroke-width="3"/>
      </g>
      <path d="M100 48q-14 12-12 34l5 37 7 11 7-11 5-37q2-22-12-34z" fill="${skin.shade}" stroke="#fff2ff" stroke-width="3"/>
      <circle cx="100" cy="48" r="14" fill="url(#${id}-wing)" stroke="${skin.shade}" stroke-width="3"/>
      <path d="M94 39Q79 17 83 11m23 28q15-22 11-28" fill="none" stroke="${skin.shade}" stroke-width="3" stroke-linecap="round"/>
      <circle cx="83" cy="11" r="4" fill="#fff"/><circle cx="117" cy="11" r="4" fill="#fff"/>
      <path d="M94 60h1m10 0h1" stroke="#282544" stroke-width="4" stroke-linecap="round"/>
      <path class="skin-float" d="m100 25 4 9 10 1-7 7 2 10-9-5-9 5 2-10-7-7 10-1z" fill="#fff6c8" filter="url(#${id}-glow)"/>
      <circle class="skin-float" cx="25" cy="45" r="3" fill="#fff"/><circle class="skin-float" cx="174" cy="48" r="4" fill="#fff"/>
    </svg>`;
  },
  "mythic-stag": (skin) => {
    const id = skin.id;
    return `<svg class="mythic-character mythic-stag" viewBox="0 0 200 160" role="img" aria-label="${skin.name}">
      <defs>
        <linearGradient id="${id}-coat" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff3d4"/><stop offset=".38" stop-color="${skin.accent}"/><stop offset="1" stop-color="${skin.shade}"/></linearGradient>
        <radialGradient id="${id}-moon"><stop stop-color="#fff"/><stop offset=".22" stop-color="${skin.accent}"/><stop offset="1" stop-color="${skin.accent}" stop-opacity="0"/></radialGradient>
      </defs>
      <ellipse cx="100" cy="148" rx="65" ry="7" fill="#10132c" opacity=".52"/>
      <circle cx="103" cy="49" r="43" fill="url(#${id}-moon)" opacity=".7"/>
      <path d="M57 92q-17-13-24 0l14 11m91-7q13-15 25-2l-15 16" fill="url(#${id}-coat)" stroke="${skin.shade}" stroke-width="4"/>
      <path d="M61 79q25-20 59-8l15 19-13 29H68L53 99z" fill="url(#${id}-coat)" stroke="${skin.shade}" stroke-width="4"/>
      <path d="m73 110-5 31h12l8-29m27-1 8 30h12l-3-40" fill="${skin.colors["#7bd35c"]}" stroke="${skin.shade}" stroke-width="4" stroke-linejoin="round"/>
      <path d="M118 79q4-30 24-37l18 11-7 25-15 13z" fill="url(#${id}-coat)" stroke="${skin.shade}" stroke-width="4"/>
      <path d="m143 60q22-4 24 7-9 9-27 3" fill="${skin.accent}" stroke="${skin.shade}" stroke-width="3"/>
      <circle cx="148" cy="61" r="4" fill="#fff"/><circle cx="149" cy="61" r="2" fill="${skin.shade}"/>
      <path d="M131 48q-2-19-19-28m20 27q1-17 13-25m-33-2q-14 0-18-12m18 12q-3-13 2-20m31 23q13-4 17-16m-17 16q5-13 3-20" fill="none" stroke="${skin.accent}" stroke-width="5" stroke-linecap="round"/>
      <path d="M108 19q-17-12-11-23m48 28q16-10 15-22" fill="none" stroke="#fff4c2" stroke-width="2"/>
      <path class="skin-float" d="m107 51 3 7 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1z" fill="#fff6cd"/>
      <circle cx="42" cy="56" r="3" fill="#fff"/><circle cx="74" cy="34" r="2" fill="#fff"/><circle cx="171" cy="37" r="3" fill="#fff"/>
    </svg>`;
  },
  "mythic-serpent": (skin) => {
    const id = skin.id;
    return `<svg class="mythic-character mythic-serpent" viewBox="0 0 200 160" role="img" aria-label="${skin.name}">
      <defs>
        <linearGradient id="${id}-scale" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#dffff5"/><stop offset=".32" stop-color="${skin.accent}"/><stop offset=".72" stop-color="${skin.colors["#8fe06c"]}"/><stop offset="1" stop-color="${skin.shade}"/></linearGradient>
        <radialGradient id="${id}-pearl"><stop stop-color="#fff"/><stop offset=".25" stop-color="#b7fff1"/><stop offset="1" stop-color="#67e5db" stop-opacity="0"/></radialGradient>
      </defs>
      <ellipse cx="100" cy="148" rx="68" ry="7" fill="#091a2b" opacity=".54"/>
      <path d="M40 118q-22-16-3-38 17-18 48-5 30 13 52 3 25-11 17-32-7-19-32-16-17 2-22 17" fill="none" stroke="${skin.shade}" stroke-width="29" stroke-linecap="round"/>
      <path d="M40 118q-22-16-3-38 17-18 48-5 30 13 52 3 25-11 17-32-7-19-32-16-17 2-22 17" fill="none" stroke="url(#${id}-scale)" stroke-width="21" stroke-linecap="round"/>
      <path d="M32 112q-14-13 1-27m25 14q-10-15 3-27m27 19q-9-16 5-26m28 22q-5-16 9-23m28 2q-3-15 10-19" fill="none" stroke="#edffff" stroke-opacity=".72" stroke-width="3"/>
      <path d="M116 46q-5-19 11-28l24 2 14 17-8 19-27 8-15-9z" fill="url(#${id}-scale)" stroke="${skin.shade}" stroke-width="4"/>
      <path d="m132 23-2-16 15 14m6 2 13-11-5 21" fill="${skin.accent}" stroke="${skin.shade}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M154 40q21-2 23 8-11 8-25 1" fill="#fff0d6" stroke="${skin.shade}" stroke-width="3"/>
      <ellipse cx="143" cy="35" rx="6" ry="5" fill="#fff"/><ellipse cx="145" cy="35" rx="2" ry="4" fill="${skin.shade}"/>
      <path d="M122 44q-17-17-25-2 14 3 15 17m33-10q18-20 30-5-14 7-15 20" fill="${skin.accent}" stroke="${skin.shade}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M56 133q-15 8-22-4m88-91q-12-12-21-2" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="3" stroke-linecap="round"/>
      <circle cx="46" cy="59" r="26" fill="url(#${id}-pearl)" opacity=".85"/>
      <circle class="skin-float" cx="46" cy="59" r="8" fill="#f3ffff" stroke="${skin.accent}" stroke-width="3"/>
      <path class="skin-float" d="m44 55 2-5 2 5 5 2-5 2-2 5-2-5-5-2z" fill="${skin.accent}"/>
    </svg>`;
  },
};
const SKIN_FACE_CONFIG = {
  garden: ["round", "freckles", "smile", "#315e32"],
  moonbeam: ["sleepy", "crescent", "smirk", "#28436f"],
  berry: ["lashes", "blush", "fangs", "#792b52"],
  ocean: ["goggles", "bubbles", "grin", "#164f59"],
  sunfire: ["angry", "lightning", "fangs", "#783b1d"],
  lavender: ["sparkle", "diamonds", "open", "#573177"],
  mint: ["wink", "leaf", "smile", "#1d5e43"],
  rose: ["heart", "freckles", "pout", "#802e42"],
  cocoa: ["monocle", "whiskers", "smirk", "#513522"],
  sky: ["wide", "stars", "grin", "#245978"],
  lemon: ["spiral", "dots", "open", "#706219"],
  lilac: ["star", "cheek-stars", "smile", "#632774"],
  starlight: ["star", "constellation", "smirk", "#303f88"],
  mosskeeper: ["sleepy", "leaf", "grin", "#3f5320"],
  candyfloss: ["heart", "blush", "tongue", "#842e70"],
  frostbite: ["slit", "ice", "fangs", "#1e6677"],
  copperleaf: ["monocle", "scales", "smirk", "#743b1f"],
  nightink: ["mask", "scar", "pout", "#29253f"],
  meadow: ["lashes", "blossoms", "smile", "#506e27"],
  tidepool: ["cyclops", "bubbles", "open", "#175e57"],
  dragonling: ["slit", "scales", "fangs", "#6a2925"],
  royalreader: ["monocle", "crown-jewel", "smirk", "#69491c"],
  starweaver: ["sparkle", "runes", "open", "#553181"],
  shellguard: ["goggles", "armor-marks", "grin", "#484638"],
  dreamwing: ["lashes", "teardrops", "smile", "#713f6a"],
  aurora: ["wide", "aurora", "pout", "#205d65"],
  phoenix: ["angry", "flame-marks", "fangs", "#7d2527"],
  celestial: ["star", "constellation", "smile", "#493185"],
  stormcaller: ["lightning-eyes", "lightning", "open", "#1c477c"],
  verdantking: ["sleepy", "vine", "smirk", "#2c6639"],
  voidwalker: ["spiral", "void-marks", "fangs", "#282143"],
  starlord: ["goggles", "crown-jewel", "grin", "#654222"],
  timekeeper: ["monocle", "clock-marks", "smile", "#20485d"],
};
const FACE_EYES = {
  round: (accent, pupil) =>
    `<g stroke="#3a1f0a" stroke-width="2.5"><ellipse cx="92" cy="58" rx="9" ry="11" fill="#fff"/><ellipse cx="118" cy="58" rx="9" ry="11" fill="#fff"/><circle cx="94" cy="59" r="4.5" fill="${pupil}"/><circle cx="120" cy="59" r="4.5" fill="${pupil}"/><path d="M102 57h5" fill="none" stroke="${accent}" stroke-width="4" stroke-linecap="round"/></g><circle cx="93" cy="56" r="2" fill="#fff"/><circle cx="119" cy="56" r="2" fill="#fff"/>`,
  sleepy: (accent, pupil) =>
    `<g stroke="#3a1f0a" stroke-width="2.5"><ellipse cx="92" cy="60" rx="9" ry="8" fill="#fff"/><ellipse cx="118" cy="60" rx="9" ry="8" fill="#fff"/><circle cx="94" cy="61" r="4" fill="${pupil}"/><circle cx="120" cy="61" r="4" fill="${pupil}"/><path d="M83 57q9-8 18 0m8 0q9-8 18 0" fill="${accent}" stroke-linecap="round"/></g>`,
  sparkle: (accent, pupil) =>
    `<g stroke="#3a1f0a" stroke-width="2"><ellipse cx="92" cy="58" rx="10" ry="12" fill="#fff"/><ellipse cx="118" cy="58" rx="10" ry="12" fill="#fff"/><path d="m92 52 2 4 4 2-4 2-2 4-2-4-4-2 4-2zm26 0 2 4 4 2-4 2-2 4-2-4-4-2 4-2z" fill="${pupil}"/></g><circle cx="92" cy="58" r="1.5" fill="#fff"/><circle cx="118" cy="58" r="1.5" fill="#fff"/>`,
  slit: (accent, pupil) =>
    `<g stroke="#3a1f0a" stroke-width="2.5"><ellipse cx="92" cy="58" rx="9" ry="10" fill="#fff"/><ellipse cx="118" cy="58" rx="9" ry="10" fill="#fff"/><ellipse cx="94" cy="59" rx="2.5" ry="7" fill="${pupil}"/><ellipse cx="120" cy="59" rx="2.5" ry="7" fill="${pupil}"/><path d="M84 49 91 45m21 4 7-4" stroke="${accent}" stroke-width="3" stroke-linecap="round"/></g>`,
  heart: (accent, pupil) =>
    `<path d="M92 68 82 59q-7-8 1-13 6-3 9 4 4-7 10-4 8 5 1 13zm26 0-10-9q-7-8 1-13 6-3 9 4 4-7 10-4 8 5 1 13z" fill="${pupil}" stroke="#3a1f0a" stroke-width="2"/><circle cx="90" cy="53" r="2" fill="#fff"/><circle cx="116" cy="53" r="2" fill="#fff"/>`,
  cyclops: (accent, pupil) =>
    `<ellipse cx="105" cy="57" rx="14" ry="17" fill="#fff" stroke="#3a1f0a" stroke-width="3"/><ellipse cx="108" cy="59" rx="6" ry="8" fill="${pupil}"/><circle cx="106" cy="55" r="3" fill="#fff"/><path d="M91 39q14-11 28 0" fill="none" stroke="${accent}" stroke-width="4" stroke-linecap="round"/>`,
  monocle: (accent, pupil) =>
    `<g stroke="#3a1f0a" stroke-width="2"><ellipse cx="92" cy="58" rx="8" ry="10" fill="#fff"/><ellipse cx="118" cy="58" rx="8" ry="10" fill="#fff"/><circle cx="94" cy="59" r="4" fill="${pupil}"/><circle cx="120" cy="59" r="4" fill="${pupil}"/></g><circle cx="118" cy="58" r="14" fill="none" stroke="#f8d67a" stroke-width="3"/><path d="m127 69 5 8" stroke="#f8d67a" stroke-width="2"/>`,
  goggles: (accent, pupil) =>
    `<g stroke="#3a1f0a" stroke-width="2"><circle cx="92" cy="58" r="10" fill="#fff"/><circle cx="118" cy="58" r="10" fill="#fff"/><circle cx="94" cy="59" r="4.5" fill="${pupil}"/><circle cx="120" cy="59" r="4.5" fill="${pupil}"/></g><g fill="none" stroke="${accent}" stroke-width="4"><circle cx="92" cy="58" r="14"/><circle cx="118" cy="58" r="14"/><path d="M106 57h-2M78 56l-5-3m59 3 6-3"/></g>`,
  lashes: (accent, pupil) =>
    `<g stroke="#3a1f0a" stroke-width="2.5"><ellipse cx="92" cy="58" rx="9" ry="11" fill="#fff"/><ellipse cx="118" cy="58" rx="9" ry="11" fill="#fff"/><circle cx="94" cy="60" r="4" fill="${pupil}"/><circle cx="120" cy="60" r="4" fill="${pupil}"/><path d="m85 49-4-5m9 3-1-6m13 8 4-5m9 0-1-6m9 7 4-5" fill="none" stroke="${accent}" stroke-width="3" stroke-linecap="round"/></g>`,
  mask: (accent, pupil) =>
    `<path d="M77 50q27-18 55 0l-4 22q-24-9-47 0z" fill="${accent}" opacity=".72"/><g stroke="#271e35" stroke-width="2"><ellipse cx="92" cy="58" rx="8" ry="7" fill="#fff"/><ellipse cx="118" cy="58" rx="8" ry="7" fill="#fff"/><circle cx="94" cy="59" r="4" fill="${pupil}"/><circle cx="120" cy="59" r="4" fill="${pupil}"/></g>`,
  wink: (accent, pupil) =>
    `<ellipse cx="92" cy="58" rx="9" ry="11" fill="#fff" stroke="#3a1f0a" stroke-width="2.5"/><circle cx="94" cy="60" r="4.5" fill="${pupil}"/><circle cx="118" cy="59" r="4" fill="${pupil}"/><path d="M108 57q10-8 20 0" fill="none" stroke="#3a1f0a" stroke-width="3.5" stroke-linecap="round"/><circle cx="92" cy="56" r="2" fill="#fff"/>`,
  spiral: (accent, pupil) =>
    `<g fill="#fff" stroke="#3a1f0a" stroke-width="2"><circle cx="92" cy="58" r="10"/><circle cx="118" cy="58" r="10"/></g><path d="M96 58q-4-6-8-1-4 7 4 8 7 1 7-6m15-1q-4-6-8-1-4 7 4 8 7 1 7-6" fill="none" stroke="${pupil}" stroke-width="3" stroke-linecap="round"/>`,
  star: (accent, pupil) =>
    `<g stroke="#3a1f0a" stroke-width="2"><ellipse cx="92" cy="58" rx="10" ry="12" fill="#fff"/><ellipse cx="118" cy="58" rx="10" ry="12" fill="#fff"/></g><path d="m92 51 2 5 5 2-5 2-2 5-2-5-5-2 5-2zm26 0 2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="${pupil}"/>`,
  angry: (accent, pupil) =>
    `<g stroke="#3a1f0a" stroke-width="2.5"><ellipse cx="92" cy="60" rx="9" ry="8" fill="#fff"/><ellipse cx="118" cy="60" rx="9" ry="8" fill="#fff"/><circle cx="94" cy="61" r="4" fill="${pupil}"/><circle cx="120" cy="61" r="4" fill="${pupil}"/><path d="m82 48 20 7m27-7-20 7" fill="none" stroke="${accent}" stroke-width="5" stroke-linecap="round"/></g>`,
  wide: (accent, pupil) =>
    `<g stroke="#3a1f0a" stroke-width="2.5"><ellipse cx="92" cy="58" rx="11" ry="13" fill="#fff"/><ellipse cx="118" cy="58" rx="11" ry="13" fill="#fff"/><circle cx="94" cy="60" r="5" fill="${pupil}"/><circle cx="120" cy="60" r="5" fill="${pupil}"/></g><circle cx="92" cy="55" r="2.5" fill="#fff"/><circle cx="118" cy="55" r="2.5" fill="#fff"/>`,
  "lightning-eyes": (accent, pupil) =>
    `<g stroke="#3a1f0a" stroke-width="2"><ellipse cx="92" cy="58" rx="9" ry="11" fill="#fff"/><ellipse cx="118" cy="58" rx="9" ry="11" fill="#fff"/></g><path d="m94 51-5 8h5l-2 7 8-10h-5l3-5zm26 0-5 8h5l-2 7 8-10h-5l3-5z" fill="${pupil}" stroke="#fff3a0" stroke-width="1"/>`,
};
const FACE_MARKS = {
  freckles: (accent) =>
    `<g fill="${accent}"><circle cx="78" cy="72" r="2.5"/><circle cx="83" cy="78" r="2"/><circle cx="78" cy="83" r="1.5"/><circle cx="132" cy="72" r="2.5"/><circle cx="127" cy="78" r="2"/><circle cx="132" cy="83" r="1.5"/></g>`,
  crescent: (accent) =>
    `<path d="M79 72q8 8 15 0-2 13-13 9-6-3-2-9m42 0q8 8 15 0-2 13-13 9-6-3-2-9" fill="${accent}"/>`,
  blush: (accent) =>
    `<g fill="${accent}" opacity=".68"><ellipse cx="79" cy="75" rx="7" ry="4"/><ellipse cx="131" cy="75" rx="7" ry="4"/></g>`,
  bubbles: (accent) =>
    `<g fill="none" stroke="${accent}" stroke-width="2"><circle cx="78" cy="76" r="4"/><circle cx="84" cy="83" r="2"/><circle cx="132" cy="75" r="5"/><circle cx="126" cy="84" r="2"/></g>`,
  lightning: (accent) =>
    `<path d="m79 69 7-5-2 7 6-2-10 12 2-8-6 2zm52 0-7-5 2 7-6-2 10 12-2-8 6 2z" fill="${accent}"/>`,
  diamonds: (accent) =>
    `<path d="m78 75 4-6 4 6-4 6zm54 0 4-6 4 6-4 6z" fill="${accent}"/><circle cx="79" cy="84" r="2" fill="#fff"/>`,
  leaf: (accent) =>
    `<g fill="${accent}"><path d="M77 75q-2-10 10-12-1 11-10 12zm56 0q2-10-10-12 1 11 10 12z"/></g><path d="m78 75 6-8m48 8-6-8" stroke="#fff" stroke-width="1.5"/>`,
  stars: (accent) =>
    `<path d="m78 73 2-4 2 4 4 2-4 2-2 4-2-4-4-2zm54 0 2-4 2 4 4 2-4 2-2 4-2-4-4-2z" fill="${accent}"/>`,
  dots: (accent) =>
    `<g fill="${accent}"><circle cx="78" cy="72" r="3"/><circle cx="85" cy="78" r="2"/><circle cx="80" cy="84" r="2"/><circle cx="132" cy="72" r="3"/><circle cx="125" cy="78" r="2"/><circle cx="130" cy="84" r="2"/></g>`,
  "cheek-stars": (accent) =>
    `<path d="m80 72 2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1zm50 0 2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z" fill="${accent}"/>`,
  scar: (accent) =>
    `<path d="m77 70 11 12m-5-15-5 5m58-2-11 12m5-15 5 5" fill="none" stroke="${accent}" stroke-width="3" stroke-linecap="round"/>`,
  ice: (accent) =>
    `<path d="m78 70 5 6-5 7-5-7zm54 0 5 6-5 7-5-7z" fill="${accent}" stroke="#fff" stroke-width="1.5"/>`,
  scales: (accent) =>
    `<g fill="none" stroke="${accent}" stroke-width="2"><path d="m75 73 6 5 6-5m-12 6 6 5 6-5m38-6 6 5 6-5m-12 6 6 5 6-5"/></g>`,
  whiskers: (accent) =>
    `<g fill="none" stroke="${accent}" stroke-width="2" stroke-linecap="round"><path d="m84 75-14-4m14 8-15 2m14 2-12 7m45-15 14-4m-14 8 15 2m-14 2 12 7"/></g>`,
  blossoms: (accent) =>
    `<g fill="${accent}"><circle cx="79" cy="73" r="3"/><circle cx="76" cy="70" r="3"/><circle cx="82" cy="70" r="3"/><circle cx="79" cy="67" r="3"/><circle cx="131" cy="73" r="3"/><circle cx="128" cy="70" r="3"/><circle cx="134" cy="70" r="3"/><circle cx="131" cy="67" r="3"/></g><circle cx="79" cy="70" r="1.5" fill="#ffe88f"/><circle cx="131" cy="70" r="1.5" fill="#ffe88f"/>`,
  "crown-jewel": (accent) =>
    `<path d="m105 77 5 6-5 7-5-7z" fill="${accent}" stroke="#fff2b6" stroke-width="1.5"/><circle cx="105" cy="84" r="2" fill="#fff"/>`,
  runes: (accent) =>
    `<g fill="none" stroke="${accent}" stroke-width="2"><path d="m78 70 6 8-6 7m4-15v15m46-15-6 8 6 7m-4-15v15"/></g>`,
  "armor-marks": (accent) =>
    `<path d="m77 70 10-4-3 12-8 5zm56 0-10-4 3 12 8 5z" fill="${accent}" stroke="#fff1d0" stroke-width="1.5"/>`,
  teardrops: (accent) =>
    `<path d="M79 69q-8 10 0 12 8-2 0-12m52 0q-8 10 0 12 8-2 0-12" fill="${accent}" opacity=".85"/>`,
  aurora: (accent) =>
    `<path d="M75 76q8-10 16 0m28 0q8-10 16 0" fill="none" stroke="${accent}" stroke-width="3" stroke-linecap="round"/><circle cx="80" cy="73" r="2" fill="#fff"/>`,
  "flame-marks": (accent) =>
    `<path d="M80 82q-7-7 1-14 0 5 4 6-1-5 4-8 4 9-1 15-4-4-8 1m44 0q7-7-1-14 0 5-4 6 1-5-4-8-4 9 1 15 4-4 8 1" fill="${accent}"/>`,
  vine: (accent) =>
    `<g fill="none" stroke="${accent}" stroke-width="2"><path d="M77 82q-7-13 5-16m-3 10 6-5m51 11q7-13-5-16m3 10-6-5"/></g><circle cx="82" cy="67" r="2" fill="${accent}"/><circle cx="128" cy="67" r="2" fill="${accent}"/>`,
  "void-marks": (accent) =>
    `<g fill="none" stroke="${accent}" stroke-width="2"><circle cx="80" cy="77" r="6"/><circle cx="130" cy="77" r="6"/><path d="m80 70 2 7-4 5m50-12-2 7 4 5"/></g>`,
  "clock-marks": (accent) =>
    `<g fill="none" stroke="${accent}" stroke-width="2"><circle cx="80" cy="77" r="7"/><path d="M80 72v5l4 2m46-2a7 7 0 1 1-14 0 7 7 0 0 1 14 0m-7-5v5l4 2"/></g>`,
  constellation: (accent) =>
    `<g fill="${accent}" stroke="${accent}" stroke-width="1.5"><path d="m78 74 2-4 2 4 4 2-4 2-2 4-2-4-4-2zm54 0 2-4 2 4 4 2-4 2-2 4-2-4-4-2z"/><path d="m80 76 8 7m48-7-8 7" fill="none"/></g>`,
};
const FACE_MOUTHS = {
  smile: `<path d="M96 76q9 10 19 0" fill="none" stroke="#3a1f0a" stroke-width="3.5" stroke-linecap="round"/>`,
  smirk: `<path d="M98 78q10 3 18-5" fill="none" stroke="#3a1f0a" stroke-width="3.5" stroke-linecap="round"/>`,
  fangs: `<path d="M95 75q11 13 22 0v5l-4-3-3 7-4-7-4 4z" fill="#3a1f0a" stroke="#3a1f0a" stroke-width="2" stroke-linejoin="round"/><path d="m98 77 2 6 3-4m9-2-2 6-3-4" fill="#fff"/>`,
  grin: `<path d="M94 74q12 16 25 0v7q-12 10-25 0z" fill="#3a1f0a"/><path d="m99 77 2 4 3-3 3 4 3-4 3 2" fill="none" stroke="#fff" stroke-width="2"/>`,
  open: `<ellipse cx="106" cy="79" rx="7" ry="9" fill="#3a1f0a"/><path d="M101 84q5-4 10 0" fill="none" stroke="#f47784" stroke-width="3" stroke-linecap="round"/>`,
  pout: `<path d="M99 78q7-7 14 0-7 7-14 0" fill="#7e3446" stroke="#3a1f0a" stroke-width="2"/>`,
  tongue: `<path d="M96 75q10 12 21 0v6q-10 9-21 0z" fill="#3a1f0a"/><path d="M105 81q8-1 6 6-5 4-8-1" fill="#ff7891" stroke="#d94a6c" stroke-width="1.5"/>`,
  beak: `<path d="m99 74 14 0-7 11z" fill="#ffd15c" stroke="#875328" stroke-width="2" stroke-linejoin="round"/>`,
  buck: `<path d="M97 75q9 8 19 0" fill="none" stroke="#3a1f0a" stroke-width="3.5" stroke-linecap="round"/><path d="M103 76h7v7h-7z" fill="#fff" stroke="#3a1f0a" stroke-width="1"/>`,
  zigzag: `<path d="m95 77 5-4 5 5 5-5 5 4" fill="none" stroke="#3a1f0a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  laugh: `<path d="M95 74q11 18 23 0v8q-12 12-23 0z" fill="#3a1f0a"/><path d="M99 77h15" stroke="#fff" stroke-width="2.5"/>`,
  tiny: `<path d="M102 78q4 4 8 0" fill="none" stroke="#3a1f0a" stroke-width="3" stroke-linecap="round"/>`,
};
const SKIN_HELD_ITEM_TYPES = {
  dragonling: "sword",
  royalreader: "crystal",
  starweaver: "wand",
  shellguard: "hammer",
  dreamwing: "staff",
  aurora: "prism",
  phoenix: "flameStaff",
  celestial: "celestialOrb",
  stormcaller: "thunderHammer",
  verdantking: "vineBlade",
  voidwalker: "voidScythe",
  starlord: "starSpear",
  timekeeper: "timeStaff",
};
const HELD_ITEM_ART = {
  sword: (accent, shade) =>
    `<g class="skin-held-item skin-float" stroke-linejoin="round"><path d="m8 31 27-27 4 4-27 27z" fill="#dff8ff" stroke="${shade}" stroke-width="2"/><path d="m6 31 8 8M4 35l8 8m-7-8 5 5" stroke="#754b36" stroke-width="4" stroke-linecap="round"/><path d="m6 30 8 8" stroke="${accent}" stroke-width="4" stroke-linecap="round"/><path d="m31 8 4-4 3 3-4 4" fill="#fff"/></g>`,
  crystal: (accent, shade) =>
    `<g class="skin-held-item skin-float"><path d="m11 16 7-12 14 1 7 12-14 22z" fill="${accent}" stroke="${shade}" stroke-width="3"/><path d="m18 4 7 13 14 0m-14 0v21m-7-21 7 21" fill="none" stroke="#fff" stroke-width="2" opacity=".8"/><path d="m22 13 4-6 4 6-4 6z" fill="#fff7c2"/></g>`,
  wand: (accent, shade) =>
    `<g class="skin-held-item skin-float"><path d="m8 39 22-31" stroke="#8c5638" stroke-width="6" stroke-linecap="round"/><path d="m30 8 1-6 3 5 6-1-4 5 2 5-6-2-4 4 1-6-5-3z" fill="${accent}" stroke="${shade}" stroke-width="2"/><circle cx="32" cy="8" r="2" fill="#fff"/></g>`,
  hammer: (accent, shade) =>
    `<g class="skin-held-item skin-float"><path d="m10 38 20-22" stroke="#825237" stroke-width="6" stroke-linecap="round"/><path d="m17 14 8-9 20 17-8 9z" fill="${accent}" stroke="${shade}" stroke-width="3"/><path d="m24 8 6 5-8 9-6-5z" fill="#fff" opacity=".65"/></g>`,
  staff: (accent, shade) =>
    `<g class="skin-held-item skin-float"><path d="m11 42 17-34" stroke="#7a5036" stroke-width="5" stroke-linecap="round"/><path d="M28 8q-12-8-5-14 7-3 10 4 8-7 13-1 3 9-7 13z" fill="${accent}" stroke="${shade}" stroke-width="2"/><path d="M31 4q4-6 8-2" fill="none" stroke="#fff" stroke-width="2"/></g>`,
  prism: (accent, shade) =>
    `<g class="skin-held-item skin-float"><path d="m9 13 11-9 19 3 5 13-17 19-17-12z" fill="${accent}" stroke="${shade}" stroke-width="3"/><path d="m20 4 7 16 17 0m-17 0v19m-18-11 18-8 12-13" fill="none" stroke="#fff" stroke-width="2" opacity=".85"/><circle cx="27" cy="20" r="4" fill="#fff7c2"/></g>`,
  flameStaff: (accent, shade) =>
    `<g class="skin-held-item skin-float"><path d="m10 42 17-34" stroke="#754537" stroke-width="5" stroke-linecap="round"/><path d="M27 8Q18 0 28-8q-1 7 5 8 0-9 8-11-3 11 6 15-4 10-15 10z" fill="${accent}" stroke="${shade}" stroke-width="2"/><path d="M31 7q-2-5 3-9 0 5 4 6l-4 6z" fill="#fff3a0"/></g>`,
  celestialOrb: (accent, shade) =>
    `<g class="skin-held-item skin-float"><path d="m10 39 10-17" stroke="#84603b" stroke-width="5" stroke-linecap="round"/><circle cx="29" cy="15" r="14" fill="${accent}" stroke="${shade}" stroke-width="3"/><ellipse cx="29" cy="15" rx="20" ry="7" fill="none" stroke="#fff1b6" stroke-width="2" transform="rotate(-25 29 15)"/><path d="m29 5 2 7 7 3-7 2-2 7-2-7-7-2 7-3z" fill="#fff"/></g>`,
  thunderHammer: (accent, shade) =>
    `<g class="skin-held-item skin-float"><path d="m10 41 22-23" stroke="#745139" stroke-width="6" stroke-linecap="round"/><path d="m15 11 8-8 24 11-7 11z" fill="${accent}" stroke="${shade}" stroke-width="3"/><path d="m31 4-5 9h6l-4 9 11-12h-7l4-6z" fill="#fff4a8"/></g>`,
  vineBlade: (accent, shade) =>
    `<g class="skin-held-item skin-float"><path d="m9 40 23-25" stroke="#79533a" stroke-width="6" stroke-linecap="round"/><path d="M27 20Q16 7 30-3q4 11 11 5 5 7-3 15-6 6-11 3z" fill="${accent}" stroke="${shade}" stroke-width="2"/><path d="m28 16 11-12m-8 13 7 5" stroke="#eaff9c" stroke-width="2"/></g>`,
  voidScythe: (accent, shade) =>
    `<g class="skin-held-item skin-float"><path d="m10 41 22-30" stroke="#67558b" stroke-width="5" stroke-linecap="round"/><path d="M29 13Q28-1 45-7q-3 11-12 18 13-6 18 1-9 5-19 4z" fill="${accent}" stroke="${shade}" stroke-width="2"/><circle cx="34" cy="9" r="3" fill="#fff"/></g>`,
  starSpear: (accent, shade) =>
    `<g class="skin-held-item skin-float"><path d="m8 42 29-39" stroke="#855e39" stroke-width="5" stroke-linecap="round"/><path d="m38 0 8-5-1 10 7 6-10 1-5 8-2-9-8-5 10-1z" fill="${accent}" stroke="${shade}" stroke-width="2"/><path d="m12 35 6 4" stroke="#f6dc94" stroke-width="2"/></g>`,
  timeStaff: (accent, shade) =>
    `<g class="skin-held-item skin-float"><path d="m11 42 17-33" stroke="#795638" stroke-width="5" stroke-linecap="round"/><circle cx="32" cy="8" r="13" fill="${accent}" stroke="${shade}" stroke-width="3"/><circle cx="32" cy="8" r="9" fill="none" stroke="#fff4be" stroke-width="1.5"/><path d="M32 2v7l5 3m-17-4h3m22 0h3m-16-13v3m0 22v3" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></g>`,
};
const SKIN_STAT_DEFINITIONS = {
  health: {
    label: "Max health",
    values: [10, 15, 20, 25, 30],
    format: (value) => `+${value} max health`,
  },
  damage: {
    label: "Attack damage",
    values: [3, 5, 8, 10, 12],
    format: (value) => `+${value} attack damage`,
  },
  stun: {
    label: "Stun chance",
    values: [10, 15, 20, 30, 40],
    format: (value) => `+${value}% stun chance`,
  },
  defense: {
    label: "Damage reduction",
    values: [1, 1, 2, 3, 4],
    format: (value) => `-${value} damage per enemy hit`,
  },
  coins: {
    label: "Coin bonus",
    values: [5, 8, 12, 15, 20],
    format: (value) => `+${value}% coins earned`,
  },
  recovery: {
    label: "Victory recovery",
    values: [3, 5, 8, 10, 12],
    format: (value) => `+${value} health after victory`,
  },
};
const SKIN_STAT_IDS = Object.keys(SKIN_STAT_DEFINITIONS);
const SKIN_RARITY_TIERS = {
  normal: 0,
  rare: 1,
  epic: 2,
  legendary: 3,
  mythic: 4,
};
function getSkinStatCount(rarity, index) {
  if (rarity === "normal") return 1;
  if (rarity === "rare") return 1 + (index % 2);
  if (rarity === "epic") return 2 + (index % 2);
  if (rarity === "mythic") return 4 + (index % 2);
  return 3 + (index % 2);
}
function makeSkinStats(rarity, index) {
  const tier = SKIN_RARITY_TIERS[rarity];
  const count = getSkinStatCount(rarity, index);
  const offset = (index * 2 + tier) % SKIN_STAT_IDS.length;
  return Array.from({ length: count }, (_, position) => {
    const id = SKIN_STAT_IDS[(offset + position) % SKIN_STAT_IDS.length];
    return {
      id,
      label: SKIN_STAT_DEFINITIONS[id].label,
      value: SKIN_STAT_DEFINITIONS[id].values[tier],
      description: SKIN_STAT_DEFINITIONS[id].format(
        SKIN_STAT_DEFINITIONS[id].values[tier],
      ),
    };
  });
}
function makeSkin(
  [id, name, price, head, body, tail, shade],
  rarity,
  accessory,
  effect,
  index,
) {
  return {
    id,
    name,
    price,
    rarity,
    stats: makeSkinStats(rarity, index),
    accessory,
    effect,
    face: SKIN_FACE_CONFIG[id],
    heldItem: SKIN_HELD_ITEM_TYPES[id] || null,
    accent: head,
    shade,
    colors: {
      "#7bd35c": tail,
      "#8fe06c": body,
      "#a4ee7a": body,
      "#b9f78d": head,
      "#5aa83c": shade,
    },
  };
}
const SKINS = [
  ...SKIN_PALETTES.map((palette, index) =>
    makeSkin(palette, "normal", undefined, undefined, index),
  ),
  ...RARE_SKINS.map((skin, index) =>
    makeSkin(skin, "rare", skin[7], undefined, index),
  ),
  ...EPIC_SKINS.map((skin, index) =>
    makeSkin(skin, "epic", skin[7], undefined, index),
  ),
  ...LEGENDARY_SKINS.map((skin, index) =>
    makeSkin(skin, "legendary", skin[7], skin[8], index),
  ),
  ...MYTHIC_SKINS.map((skin, index) =>
    makeSkin(skin, "mythic", skin[7], skin[8], index),
  ),
];
const SKIN_RARITIES = [
  ["all", "All", SKINS.length],
  ...["normal", "rare", "epic", "legendary", "mythic"].map((rarity) => [
    rarity,
    rarity[0].toUpperCase() + rarity.slice(1),
    SKINS.filter((skin) => skin.rarity === rarity).length,
  ]),
];
let activeSkinRarity = "all";
let activeShopCategory = "skins";
const STORE_KEY = "wormwood-library-player";
const PROGRESS_KEY = "wormwood-library-progress";
const DAILY_REWARD_KEY = "wormwood-library-daily-reward";
const REDEEM_CODE = "nice ka goy";
const REDEEM_CODE_ID = "nice-ka-goy";
const REDEEM_CODE_REWARD = 20_000;
const POTIONS = [
  {
    id: "healing",
    name: "Healing Potion",
    price: 35,
    description: "Restore 35 health during your turn.",
  },
  {
    id: "strength",
    name: "Strength Potion",
    price: 45,
    description: "Boost your next 3 attacks by 50%.",
  },
  {
    id: "curse",
    name: "Curse Potion",
    price: 40,
    description: "Halve the next enemy hit against you.",
  },
  {
    id: "defense",
    name: "Defense Potion",
    price: 50,
    description: "Reduce the next 3 enemy attacks by 50%.",
  },
];
const UPGRADES = [
  {
    id: "heart",
    name: "Heart Locket",
    description: "+20 maximum health per level.",
    price: (level) => 100 + level * 75,
    maxLevel: 5,
  },
  {
    id: "spellbook",
    name: "Spellbook",
    description: "+10% word attack damage per level.",
    price: (level) => 140 + level * 100,
    maxLevel: 5,
  },
  {
    id: "iron-shell",
    name: "Iron Shell",
    description: "Reduce each enemy hit by 2 per level.",
    price: (level) => 120 + level * 85,
    maxLevel: 5,
  },
];
function emptyPotions() {
  return { healing: 0, strength: 0, curse: 0, defense: 0 };
}
function randomEnemyPotion() {
  return POTIONS[(Math.random() * POTIONS.length) | 0].id;
}
function emptyUpgrades() {
  return { heart: 0, spellbook: 0, "iron-shell": 0 };
}
const DEFAULT_STORE = {
  coins: 0,
  ownedSkins: ["garden"],
  equippedSkin: "garden",
  potions: emptyPotions(),
  upgrades: emptyUpgrades(),
  redeemedCodes: [],
};
function loadStore() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
    if (!saved || typeof saved !== "object") return { ...DEFAULT_STORE };
    const ownedSkins = Array.isArray(saved.ownedSkins)
      ? [
          ...new Set(
            saved.ownedSkins.filter((id) =>
              SKINS.some((skin) => skin.id === id),
            ),
          ),
        ]
      : ["garden"];
    if (!ownedSkins.includes("garden")) ownedSkins.push("garden");
    return {
      coins: Number.isFinite(saved.coins)
        ? Math.max(0, Math.floor(saved.coins))
        : 0,
      ownedSkins,
      equippedSkin: ownedSkins.includes(saved.equippedSkin)
        ? saved.equippedSkin
        : "garden",
      potions: Object.fromEntries(
        POTIONS.map(({ id }) => [
          id,
          Number.isSafeInteger(saved.potions?.[id])
            ? Math.max(0, saved.potions[id])
            : 0,
        ]),
      ),
      upgrades: Object.fromEntries(
        UPGRADES.map(({ id, maxLevel }) => [
          id,
          Number.isSafeInteger(saved.upgrades?.[id])
            ? Math.min(maxLevel, Math.max(0, saved.upgrades[id]))
            : 0,
        ]),
      ),
      redeemedCodes: Array.isArray(saved.redeemedCodes)
        ? [...new Set(saved.redeemedCodes.filter((code) => typeof code === "string"))]
        : [],
    };
  } catch (error) {
    console.error("Could not load saved marketplace data:", error);
    return { ...DEFAULT_STORE };
  }
}
let STORE = loadStore();
function saveStore() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(STORE));
    window.WormwoodFirebase?.save(getCloudSaveData());
    return true;
  } catch (error) {
    console.error("Could not save marketplace data:", error);
    const message = $("shopMessage");
    if (message)
      message.textContent =
        "Could not save your coins or skin in this browser.";
    return false;
  }
}
function getSkin(id = STORE.equippedSkin) {
  return SKINS.find((skin) => skin.id === id) || SKINS[0];
}
function getEquippedSkinStat(id) {
  return getSkin().stats.find((stat) => stat.id === id)?.value || 0;
}
function getEquippedSkinStatsSummary() {
  return getSkin()
    .stats.map((stat) => stat.description)
    .join(" · ");
}
function wormSvg(skin = getSkin()) {
  if (skin.rarity === "mythic") {
    const renderMythic = MYTHIC_SKIN_ART[skin.effect];
    if (!renderMythic) throw new Error(`Missing artwork for ${skin.name}.`);
    return renderMythic(skin);
  }
  const coloredSvg = Object.entries(skin.colors).reduce(
    (svg, [original, color]) => svg.replaceAll(original, color),
    hero,
  );
  const accessory = SKIN_ACCESSORIES[skin.accessory];
  const face = skin.face || ["round", "freckles", "smile", "#315e32"];
  const eyes = FACE_EYES[face[0]];
  const marks = FACE_MARKS[face[1]];
  const mouth = FACE_MOUTHS[face[2]];
  const faceArt = `<g class="skin-face">${eyes(skin.accent, face[3])}${marks(skin.accent)}${mouth}</g>`;
  const itemArt = skin.heldItem
    ? `<g class="skin-item-hand" fill="none" stroke="${skin.shade}" stroke-width="7" stroke-linecap="round"><path d="M79 112Q67 110 64 125"/></g><circle cx="64" cy="125" r="5" fill="${skin.colors["#8fe06c"]}"/><g transform="translate(53 91)">${HELD_ITEM_ART[skin.heldItem](skin.accent, skin.shade)}</g>`
    : `<g class="skin-book"><rect x="66" y="96" width="38" height="28" rx="4" fill="#b8352f" transform="rotate(-10 85 110)"/><rect x="70" y="100" width="30" height="20" rx="2" fill="#f6ecd2" transform="rotate(-10 85 110)"/><path d="m76 106 18-3m-17 7 16-3" stroke="#b69565" stroke-width="1.5"/></g>`;
  let svg = coloredSvg
    .replace("<!--skin-item-->", itemArt)
    .replace("<!--skin-face-->", faceArt);
  if (accessory) {
    svg = svg.replace(
      "</svg>",
      `<g class="skin-overlay" style="--skin-accent:${skin.accent}">${accessory.replaceAll("${accent}", skin.accent)}</g></svg>`,
    );
  }
  return svg;
}
function clearSkinAnimations() {
  const gsap = window.gsap;
  if (!gsap) return;
  gsap.killTweensOf(
    $("hero").querySelectorAll(
      ".skin-float, .skin-wings, .skin-flame, .mythic-wings",
    ),
  );
}
function animateEquippedSkin(skin = getSkin()) {
  const worm = $("hero");
  worm.classList.remove(
    "skin-normal",
    "skin-rare",
    "skin-epic",
    "skin-legendary",
    "skin-mythic",
  );
  worm.classList.add(`skin-${skin.rarity}`);
  worm.style.setProperty("--skin-accent", skin.accent);
  const gsap = window.gsap;
  if (
    !gsap ||
    !skin.accessory ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return;

  gsap.killTweensOf(
    worm.querySelectorAll(".skin-float, .skin-wings, .skin-flame"),
  );
  const floaters = worm.querySelectorAll(".skin-float");
  const wings = worm.querySelectorAll(".skin-wings");
  const flames = worm.querySelectorAll(".skin-flame");
  if (floaters.length)
    gsap.fromTo(
      floaters,
      { y: 0, rotation: -2 },
      {
        y: -6,
        rotation: 2,
        duration: 1.15,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.1,
        transformOrigin: "center",
      },
    );
  if (wings.length)
    gsap.fromTo(
      wings,
      { scaleY: 0.8 },
      {
        scaleY: 1.08,
        duration: 0.24,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        transformOrigin: "center",
      },
    );
  if (flames.length)
    gsap.fromTo(
      flames,
      { scale: 0.94, opacity: 0.78 },
      {
        scale: 1.06,
        opacity: 1,
        duration: 0.34,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        transformOrigin: "center bottom",
      },
    );
}
function playLegendaryAttack(skin, x, y) {
  if (skin.rarity !== "legendary" && skin.rarity !== "mythic")
    return Promise.resolve();

  const effect = document.createElement("div");
  effect.className = `legendary-vfx${skin.rarity === "mythic" ? " mythic-vfx" : ""} vfx-${skin.effect}`;
  effect.style.left = `${x}px`;
  effect.style.top = `${y}px`;
  effect.style.setProperty("--vfx-color", skin.accent);
  effect.innerHTML =
    '<span class="vfx-ring"></span><span class="vfx-ring"></span><span class="vfx-ring"></span><span class="vfx-core"></span><span class="vfx-spark"></span><span class="vfx-spark"></span><span class="vfx-spark"></span><span class="vfx-spark"></span>';
  document.body.appendChild(effect);

  const gsap = window.gsap;
  if (!gsap || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const animation = effect.animate(
      [
        {
          opacity: 0,
          transform: "translate(-50%, -50%) scale(.2) rotate(-35deg)",
        },
        {
          opacity: 1,
          transform: "translate(-50%, -50%) scale(1.15) rotate(0deg)",
          offset: 0.55,
        },
        {
          opacity: 0,
          transform: "translate(-50%, -50%) scale(1.65) rotate(35deg)",
        },
      ],
      {
        duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? 100
          : 780,
        easing: "cubic-bezier(.15,.75,.3,1)",
      },
    );
    return animation.finished.then(() => effect.remove());
  }

  return new Promise((resolve) => {
    const rings = effect.querySelectorAll(".vfx-ring");
    const sparks = effect.querySelectorAll(".vfx-spark");
    gsap.set(effect, { xPercent: -50, yPercent: -50, scale: 0.18, opacity: 0 });
    gsap.set(rings, { scale: 0.4, opacity: 0, rotation: -30 });
    gsap.set(sparks, { scale: 0, opacity: 0 });
    gsap
      .timeline({
        onComplete: () => {
          effect.remove();
          resolve();
        },
      })
      .to(effect, {
        scale: 1.08,
        opacity: 1,
        duration: 0.2,
        ease: "back.out(2)",
      })
      .to(
        rings,
        {
          scale: 1,
          opacity: 0.9,
          rotation: 180,
          duration: 0.52,
          stagger: 0.035,
          ease: "power2.out",
        },
        0,
      )
      .to(
        rings,
        { rotation: "+=120", opacity: 0, duration: 0.3, stagger: 0.025 },
        0.48,
      )
      .to(
        effect,
        { scale: 1.45, opacity: 0, duration: 0.35, ease: "power2.in" },
        0.4,
      )
      .to(
        sparks,
        { scale: 1, opacity: 1, duration: 0.12, stagger: 0.035 },
        0.08,
      )
      .to(
        sparks,
        {
          y: (index) => (index % 2 ? 55 : -55),
          x: (index) => (index < 2 ? -45 : 45),
          opacity: 0,
          duration: 0.45,
          stagger: 0.025,
        },
        0.2,
      );
  });
}
const FOES = [
  {
    n: "Inkblot",
    hp: 30,
    atk: 8,
    words: ["ink", "blot", "stain", "smudge", "splat"],
    c: "#5b3fa8",
    svg: (c) =>
      `<svg viewBox="0 0 160 150"><ellipse cx="80" cy="144" rx="55" ry="6" fill="#0006"/><path d="M20 130Q8 60 50 40Q80 10 115 40Q155 65 140 130Q80 145 20 130Z" fill="${c}"/><path d="M30 120q-14 12-6 24M130 125q16 10 8 22M80 140q0 12 8 14" stroke="${c}" stroke-width="10" stroke-linecap="round" fill="none"/><circle cx="58" cy="78" r="14" fill="#fff"/><circle cx="102" cy="78" r="14" fill="#fff"/><circle cx="62" cy="80" r="6" fill="#111"/><circle cx="98" cy="80" r="6" fill="#111"/><path d="M45 62l28 8M115 62l-28 8" stroke="#111" stroke-width="6" stroke-linecap="round"/><path d="M55 105q25 18 50 0" stroke="#111" stroke-width="5" fill="#111"/></svg>`,
  },
  {
    n: "Page Bat",
    hp: 50,
    atk: 11,
    words: ["bat", "bite", "fang", "wing", "swoop"],
    c: "#a33b52",
    svg: (c) =>
      `<svg viewBox="0 0 160 150"><ellipse cx="80" cy="144" rx="45" ry="5" fill="#0006"/><g style="transform-origin:80px 70px;animation:wig .5s infinite"><path d="M80 70Q40 0 4 30Q18 50 14 76Q40 62 54 92Q66 80 80 90Z" fill="#7d2438"/><path d="M80 70Q120 0 156 30Q142 50 146 76Q120 62 106 92Q94 80 80 90Z" fill="#7d2438"/></g><ellipse cx="80" cy="85" rx="32" ry="38" fill="${c}"/><path d="M58 58l-6-28 22 16zM102 58l6-28-22 16z" fill="${c}"/><circle cx="68" cy="78" r="9" fill="#ffe14d"/><circle cx="92" cy="78" r="9" fill="#ffe14d"/><circle cx="68" cy="79" r="4" fill="#111"/><circle cx="92" cy="79" r="4" fill="#111"/><path d="M68 100l5 10 7-8 7 8 5-10z" fill="#fff"/></svg>`,
  },
  {
    n: "Dust Golem",
    hp: 70,
    atk: 14,
    words: ["dust", "grit", "sand", "stone", "rubble"],
    c: "#8a8a7a",
    svg: (c) =>
      `<svg viewBox="0 0 160 150"><ellipse cx="80" cy="144" rx="60" ry="6" fill="#0006"/><rect x="38" y="36" width="84" height="80" rx="30" fill="${c}"/><rect x="14" y="60" width="30" height="50" rx="14" fill="${c}"/><rect x="116" y="60" width="30" height="50" rx="14" fill="${c}"/><rect x="48" y="112" width="26" height="30" rx="10" fill="${c}"/><rect x="86" y="112" width="26" height="30" rx="10" fill="${c}"/><circle cx="62" cy="68" r="9" fill="#ff7b3a"/><circle cx="98" cy="68" r="9" fill="#ff7b3a"/><path d="M58 94h44" stroke="#333" stroke-width="7" stroke-linecap="round" stroke-dasharray="8 6"/><path d="M56 36q-4-16 6-24M80 34q0-18 8-22M104 36q6-14 0-22" stroke="#bbb" stroke-width="6" stroke-linecap="round" fill="none"/></svg>`,
  },
  {
    n: "Lord Overdue",
    hp: 100,
    atk: 18,
    words: ["doom", "curse", "spell", "tome", "late"],
    c: "#c0392b",
    svg: (c) =>
      `<svg viewBox="0 0 160 150"><ellipse cx="80" cy="144" rx="60" ry="6" fill="#0006"/><path d="M20 120Q10 50 50 36L40 6 66 26Q80 20 94 26L120 6 110 36Q150 50 140 120Q80 140 20 120Z" fill="${c}"/><path d="M0 70q20-30 40-10M160 70q-20-30-40-10" stroke="${c}" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M50 72l28 8M110 72l-28 8" stroke="#111" stroke-width="7" stroke-linecap="round"/><circle cx="62" cy="86" r="9" fill="#ffe14d"/><circle cx="98" cy="86" r="9" fill="#ffe14d"/><path d="M52 108l10 12 9-10 9 10 9-10 10 12 10-14" fill="#fff" stroke="#111" stroke-width="3"/><rect x="60" y="2" width="40" height="14" rx="3" fill="#ffd23f"/></svg>`,
  },
];
const SCENES = [
  "grand-library",
  "ivy-archive",
  "moonlit-observatory",
  "ember-forge",
  "undersea-archive",
  "crystal-cavern",
  "skyship-dock",
  "royal-greenhouse",
  "flooded-crypt",
  "clockwork-hall",
  "dragon-roost",
  "winter-citadel",
  "desert-caravan",
  "mushroom-grotto",
  "sunken-temple",
  "storm-library",
  "autumn-courtyard",
  "mirror-gallery",
  "dragon-lair",
  "celestial-atrium",
];
function getFoe(level = S.lv) {
  const base = FOES[level % FOES.length];
  return {
    ...base,
    n: `${base.n} · ${level + 1}`,
    hp: Math.round(base.hp * (1 + level * 0.1)),
    atk: base.atk + Math.floor(level / 10),
  };
}
function setScene(level) {
  const sceneIndex = Math.floor(level / 10) % SCENES.length;
  document.body.dataset.scene = SCENES[sceneIndex];
}
const $ = (id) => document.getElementById(id);
const BIG = new Set();
function addWords(words) {
  if (!Array.isArray(words)) return;
  words.forEach((word) => {
    if (typeof word !== "string") return;
    const normalized = word.trim().toLowerCase();
    if (/^[a-z]+$/.test(normalized)) BIG.add(normalized);
  });
}
addWords(window.dictionary);
const has = (w) => WORDS.has(w) || BIG.has(w);
async function loadDictionary() {
  const response = await fetch(
    "https://cdn.jsdelivr.net/npm/an-array-of-english-words@2.0.0/index.json",
  );
  if (!response.ok) {
    throw new Error(`Dictionary request failed with status ${response.status}`);
  }
  const words = await response.json();
  if (!Array.isArray(words)) {
    throw new TypeError("Dictionary response must be an array of words");
  }
  addWords(words);
}
function valid(w) {
  if (has(w)) return true;
  const n = w.length;
  if (n <= 3) return false;
  if (/s$/.test(w) && has(w.slice(0, -1))) return true;
  if (/es$/.test(w) && has(w.slice(0, -2))) return true;
  if (/ies$/.test(w) && has(w.slice(0, -3) + "y")) return true;
  if (
    /ed$/.test(w) &&
    (has(w.slice(0, -2)) ||
      has(w.slice(0, -1)) ||
      (w[n - 3] === w[n - 4] && has(w.slice(0, -3))))
  )
    return true;
  if (
    /ing$/.test(w) &&
    (has(w.slice(0, -3)) ||
      has(w.slice(0, -3) + "e") ||
      (w[n - 4] === w[n - 5] && has(w.slice(0, -4))))
  )
    return true;
  if (/er$/.test(w) && (has(w.slice(0, -2)) || has(w.slice(0, -1))))
    return true;
  if (/ly$/.test(w) && has(w.slice(0, -2))) return true;
  return false;
}
let S;
function getCloudSaveData() {
  return {
    coins: STORE.coins,
    ownedSkins: STORE.ownedSkins,
    equippedSkin: STORE.equippedSkin,
    potions: STORE.potions,
    upgrades: STORE.upgrades,
    redeemedCodes: STORE.redeemedCodes,
    dailyReward: loadDailyRewardRecord(),
    progress: loadProgress(),
  };
}
function loadDailyRewardRecord() {
  try {
    return JSON.parse(localStorage.getItem(DAILY_REWARD_KEY) || "null");
  } catch (error) {
    console.error("Could not load daily reward progress:", error);
    return null;
  }
}
function getMaxHealth() {
  return 100 + STORE.upgrades.heart * 20 + getEquippedSkinStat("health");
}
function getAttackMultiplier() {
  return 1 + STORE.upgrades.spellbook * 0.1;
}
function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(PROGRESS_KEY) || "null");
    if (!saved || typeof saved !== "object") return null;
    return saved;
  } catch (error) {
    console.error("Could not load saved game progress:", error);
    return null;
  }
}
function saveProgress() {
  if (!S || !Array.isArray(S.t) || S.t.length !== 16) return;
  const progress = {
    lv: S.lv,
    score: S.score,
    php: S.php,
    ehp: S.ehp,
    emax: S.emax,
    buffs: { ...S.buffs },
    enemyPotion: S.enemyPotion,
    enemyBuffs: { ...S.enemyBuffs },
    tiles: S.t.map(({ l, gem }) => ({ l, gem: Boolean(gem) })),
    used: [...S.used],
  };
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    window.WormwoodFirebase?.save(getCloudSaveData());
  } catch (error) {
    console.error("Could not save game progress:", error);
    say("Could not save your game progress in this browser.", "#ff8a8a");
  }
}
function applyCloudSaveData(saved) {
  if (!saved || typeof saved !== "object") return;
  const ownedSkins = Array.isArray(saved.ownedSkins)
    ? [
        ...new Set(
          saved.ownedSkins.filter((id) => SKINS.some((skin) => skin.id === id)),
        ),
      ]
    : ["garden"];
  if (!ownedSkins.includes("garden")) ownedSkins.push("garden");
  STORE = {
    coins: Number.isFinite(saved.coins)
      ? Math.max(0, Math.floor(saved.coins))
      : 0,
    ownedSkins,
    equippedSkin: ownedSkins.includes(saved.equippedSkin)
      ? saved.equippedSkin
      : "garden",
    potions: Object.fromEntries(
      POTIONS.map(({ id }) => [
        id,
        Number.isSafeInteger(saved.potions?.[id])
          ? Math.max(0, saved.potions[id])
          : 0,
      ]),
    ),
    upgrades: Object.fromEntries(
      UPGRADES.map(({ id, maxLevel }) => [
        id,
        Number.isSafeInteger(saved.upgrades?.[id])
          ? Math.min(maxLevel, Math.max(0, saved.upgrades[id]))
          : 0,
      ]),
    ),
    redeemedCodes: Array.isArray(saved.redeemedCodes)
      ? [...new Set(saved.redeemedCodes.filter((code) => typeof code === "string"))]
      : [],
  };
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(STORE));
    if (saved.progress && typeof saved.progress === "object") {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(saved.progress));
    } else {
      localStorage.removeItem(PROGRESS_KEY);
    }
    localStorage.setItem(
      DAILY_REWARD_KEY,
      JSON.stringify(saved.dailyReward || null),
    );
  } catch (error) {
    console.error("Could not cache cloud save in this browser:", error);
  }
  const progress = loadProgress();
  if (progress && S && restoreProgress(progress)) {
    load(false);
    S.ehp = Math.min(S.emax, Math.max(1, progress.ehp));
    S.php = Math.min(getMaxHealth(), Math.max(1, progress.php));
    S.score = Math.max(0, Math.floor(progress.score));
    hud();
    render();
  } else if (S) {
    hud();
  }
  renderShop();
  $("hero").innerHTML = wormSvg();
  animateEquippedSkin();
}
function restoreProgress(progress) {
  if (
    !Number.isSafeInteger(progress.lv) ||
    progress.lv < 0 ||
    !Array.isArray(progress.tiles) ||
    progress.tiles.length !== 16 ||
    !progress.tiles.every(
      (tile) =>
        tile &&
        typeof tile.l === "string" &&
        /^[A-Z]$/.test(tile.l) &&
        typeof tile.gem === "boolean",
    ) ||
    !Number.isFinite(progress.score) ||
    !Number.isFinite(progress.php) ||
    !Number.isFinite(progress.ehp)
  )
    return false;
  S.lv = progress.lv;
  S.score = Math.max(0, Math.floor(progress.score));
  S.php = Math.min(getMaxHealth(), Math.max(1, progress.php));
  S.buffs = normalizeBuffs(progress.buffs);
  S.enemyPotion =
    progress.enemyPotion === null
      ? null
      : POTIONS.some(({ id }) => id === progress.enemyPotion)
        ? progress.enemyPotion
        : randomEnemyPotion();
  S.enemyBuffs = normalizeBuffs(progress.enemyBuffs);
  S.t = progress.tiles.map((tile) => ({
    l: tile.l,
    gem: tile.gem,
    id: Math.random(),
  }));
  S.used = new Set(
    Array.isArray(progress.used)
      ? progress.used.filter((word) => typeof word === "string")
      : [],
  );
  return true;
}
function normalizeBuffs(buffs) {
  return {
    strength: Number.isSafeInteger(buffs?.strength)
      ? Math.min(3, Math.max(0, buffs.strength))
      : 0,
    curse: Boolean(buffs?.curse),
    defense: Number.isSafeInteger(buffs?.defense)
      ? Math.min(3, Math.max(0, buffs.defense))
      : 0,
  };
}
window.WormwoodGame = {
  getSaveData: getCloudSaveData,
  applySaveData: applyCloudSaveData,
};
function rl() {
  return BAG[(Math.random() * BAG.length) | 0];
}
function mk() {
  const l = rl();
  return {
    l,
    gem: Math.random() < 0.1,
    id: Math.random(),
  };
}
function fixVowels() {
  let v = S.t.filter((x) => VOW.includes(x.l)).length;
  while (v < 5) {
    const i = S.t.findIndex(
      (x) => !VOW.includes(x.l) && !S.sel.includes(S.t.indexOf(x)),
    );
    S.t[i] = {
      l: VOW[(Math.random() * 5) | 0],
      gem: false,
      id: Math.random(),
    };
    v++;
  }
}
function start(resume = false) {
  S = {
    lv: 0,
    score: 0,
    php: getMaxHealth(),
    t: Array.from(
      {
        length: 16,
      },
      mk,
    ),
    sel: [],
    used: new Set(),
    busy: false,
    turn: "player",
    playerStunned: false,
    enemyStunned: false,
    buffs: { strength: 0, curse: false },
    enemyPotion: randomEnemyPotion(),
    enemyBuffs: { strength: 0, curse: false, defense: 0 },
    inBattle: true,
    preparing: false,
  };
  const savedProgress = resume ? loadProgress() : null;
  const restoredProgress = savedProgress
    ? restoreProgress(savedProgress)
    : false;
  fixVowels();
  $("over").style.display = "none";
  setBattleMode(true);
  clearSkinAnimations();
  $("hero").innerHTML = wormSvg();
  animateEquippedSkin();
  load(!restoredProgress);
  if (restoredProgress) {
    S.ehp = Math.min(S.emax, Math.max(1, savedProgress.ehp));
    S.php = Math.min(getMaxHealth(), Math.max(1, savedProgress.php));
    S.score = Math.max(0, Math.floor(savedProgress.score));
  }
  render();
  hud();
  saveProgress();
}
function load(newEnemy = true) {
  const f = getFoe();
  if (newEnemy) {
    S.enemyPotion = randomEnemyPotion();
    S.enemyBuffs = { strength: 0, curse: false, defense: 0 };
  }
  setScene(S.lv);
  S.ehp = f.hp;
  S.emax = f.hp;
  S.turn = "player";
  S.playerStunned = false;
  S.enemyStunned = false;
  $("ename").textContent = f.n;
  $("lvl").textContent = S.lv + 1;
  const e = $("foe");
  e.getAnimations().forEach((animation) => animation.cancel());
  e.className = "bob w-32 sm:w-40";
  e.style.animationDelay = ".7s";
  e.innerHTML = f.svg(f.c);
  e.animate(
    [
      {
        transform: "translateX(300px) scale(.4)",
        opacity: 0,
      },
      {
        transform: "none",
        opacity: 1,
      },
    ],
    {
      duration: 700,
      easing: "cubic-bezier(.2,1.3,.4,1)",
    },
  );
  hud();
}
function hud() {
  $("php").textContent = `${Math.max(0, Math.ceil(S.php))}/${getMaxHealth()}`;
  $("pbar").style.width =
    Math.max(0, (S.php / getMaxHealth()) * 100) + "%";
  $("ebar").style.width = Math.max(0, (S.ehp / S.emax) * 100) + "%";
  $("ehp").textContent = Math.max(0, S.ehp);
  $("score").textContent = S.score;
  $("coins").textContent = STORE.coins;
  $("turn").textContent = S.turn === "player" ? "Wilbur" : getFoe().n;
  if (!$("backpack").hidden) renderBackpack();
}
function render() {
  const b = $("board");
  b.innerHTML = "";
  S.t.forEach((t, i) => {
    const e = document.createElement("button");
    e.className =
      "tile" + (t.gem ? " gem" : "") + (S.sel.includes(i) ? " sel" : "");
    e.style.animationDelay = (t.fresh ? 0 : i * 25) + "ms";
    e.innerHTML = t.l + `<small>${PTS[t.l]}</small>`;
    e.onclick = () => pick(i);
    t.fresh = false;
    b.appendChild(e);
  });
  word();
}
function updSel() {
  [...$("board").children].forEach((e, i) =>
    e.classList.toggle("sel", S.sel.includes(i)),
  );
  word();
}
function word() {
  const w = $("word");
  w.innerHTML =
    S.sel
      .map(
        (i) =>
          `<span class="toast serif grid h-11 w-9 place-items-center rounded-lg bg-[#f3e3bd] text-2xl font-bold text-[#3a1f0a] shadow-lg">${S.t[i].l}</span>`,
      )
      .join("") || '<span class="serif opacity-50">Spell a word…</span>';
}
function pick(i) {
  if (S.busy || S.preparing) return;
  const k = S.sel.indexOf(i);
  if (k > -1) S.sel.splice(k, 1);
  else S.sel.push(i);
  blip(300 + S.sel.length * 60);
  updSel();
}
function say(t, c) {
  $("msg").textContent = t;
  $("msg").style.color = c || "";
}
function renderShop() {
  $("shopCoins").textContent = STORE.coins;
  $("shop-title").textContent =
    activeShopCategory === "skins"
      ? "Character wardrobe"
      : activeShopCategory === "potions"
        ? "Potion counter"
        : "Character upgrades";
  $("shop").querySelector(".shop-kicker").textContent =
    activeShopCategory === "skins"
      ? "Battle skins, legendary looks, and Mythic forms"
      : activeShopCategory === "potions"
        ? "Battle-ready brews and curses"
        : "Permanent boosts for every adventure";
  $("shopStats").textContent =
    `Health ${S ? Math.ceil(S.php) : getMaxHealth()}/${getMaxHealth()} · ` +
    `Attack +${Math.round((getAttackMultiplier() - 1) * 100)}% · ` +
    `Defense ${STORE.upgrades["iron-shell"] * 2 + getEquippedSkinStat("defense")}` +
    ` · Skin: ${getEquippedSkinStatsSummary()}` +
    (S?.buffs?.strength ? ` · Strength ${S.buffs.strength} attacks` : "") +
    (S?.buffs?.curse ? " · Curse ready" : "") +
    (S?.buffs?.defense ? ` · Defense ${S.buffs.defense} attacks` : "");
  const isSkinShop = activeShopCategory === "skins";
  $("skinFilters").hidden = !isSkinShop;
  $("skinGrid").classList.toggle("shop-item-grid", !isSkinShop);
  document.querySelectorAll("[data-shop-category]").forEach((button) => {
    const active = button.dataset.shopCategory === activeShopCategory;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  if (!isSkinShop) {
    $("skinGrid").innerHTML = renderConsumables();
    return;
  }
  $("skinFilters").innerHTML = SKIN_RARITIES.map(
    ([rarity, label, count]) =>
      `<button class="rarity-filter rarity-${rarity}${activeSkinRarity === rarity ? " is-active" : ""}" type="button" data-rarity="${rarity}" aria-pressed="${activeSkinRarity === rarity}">${label}<span>${count}</span></button>`,
  ).join("");
  const visibleSkins =
    activeSkinRarity === "all"
      ? SKINS
      : SKINS.filter((skin) => skin.rarity === activeSkinRarity);
  $("skinGrid").innerHTML = visibleSkins
    .map((skin) => {
      const owned = STORE.ownedSkins.includes(skin.id);
      const equipped = STORE.equippedSkin === skin.id;
      const price = skin.price === 0 ? "Free" : `${skin.price} ✦`;
      const label = equipped ? "Equipped" : owned ? "Equip" : `Buy · ${price}`;
      const action = equipped ? "equipped" : owned ? "equip" : "buy";

      return `<article class="skin-card rarity-${skin.rarity}${equipped ? " is-equipped" : ""}" style="--skin-accent:${skin.accent}">
        <div class="skin-preview" aria-hidden="true">${wormSvg(skin)}</div>
        <div class="skin-info">
          <span class="rarity-label">${skin.rarity}</span>
          <h3>${skin.name}</h3>
          <p>${owned ? (equipped ? "Currently wearing" : "Owned") : price}</p>
          <ul class="skin-stats">${skin.stats.map((stat) => `<li>${stat.description}</li>`).join("")}</ul>
        </div>
        <button class="skin-action" type="button" data-skin-id="${skin.id}" data-skin-action="${action}" ${equipped ? "disabled" : ""}>${label}</button>
      </article>`;
    })
    .join("");
}
function handleRedeemCode(event) {
  event.preventDefault();
  const input = $("redeem-code");
  const status = $("redeem-status");
  const code = input.value.trim().toLowerCase().replace(/\s+/g, " ");
  if (code !== REDEEM_CODE) {
    status.textContent = "That redeem code isn't valid.";
    status.classList.add("is-error");
    return;
  }
  if (STORE.redeemedCodes.includes(REDEEM_CODE_ID)) {
    status.textContent = "You've already redeemed this code.";
    status.classList.add("is-error");
    return;
  }

  const previous = STORE;
  STORE = {
    ...STORE,
    coins: STORE.coins + REDEEM_CODE_REWARD,
    redeemedCodes: [...STORE.redeemedCodes, REDEEM_CODE_ID],
  };
  if (!saveStore()) {
    STORE = previous;
    return;
  }

  input.value = "";
  status.textContent = `Code redeemed! +${REDEEM_CODE_REWARD.toLocaleString()} coins.`;
  status.classList.remove("is-error");
  hud();
  renderShop();
}
function renderConsumables() {
  if (activeShopCategory === "potions") {
    return POTIONS.map((potion) => {
      const quantity = STORE.potions[potion.id];
      return `<article class="shop-item-card">
        <div class="shop-item-icon" aria-hidden="true">${potion.id === "healing" ? "♥" : potion.id === "strength" ? "⚔" : potion.id === "defense" ? "⬟" : "☠"}</div>
        <div class="shop-item-info"><h3>${potion.name}</h3><p>${potion.description}</p><small>Owned: ${quantity}</small></div>
        <button class="skin-action" type="button" data-market-action="buy" data-item-id="${potion.id}">Buy · ${potion.price} ✦</button>
      </article>`;
    }).join("");
  }
  return UPGRADES.map((upgrade) => {
    const level = STORE.upgrades[upgrade.id];
    const maxed = level >= upgrade.maxLevel;
    const price = upgrade.price(level);
    return `<article class="shop-item-card">
      <div class="shop-item-icon" aria-hidden="true">${upgrade.id === "heart" ? "♥" : upgrade.id === "spellbook" ? "✦" : "⬟"}</div>
      <div class="shop-item-info"><h3>${upgrade.name}</h3><p>${upgrade.description}</p><small>Level ${level}/${upgrade.maxLevel}</small></div>
      <button class="skin-action" type="button" data-market-action="upgrade" data-item-id="${upgrade.id}" ${maxed ? "disabled" : ""}>${maxed ? "Max level" : `Upgrade · ${price} ✦`}</button>
    </article>`;
  }).join("");
}
function setBattleMode(active) {
  S.inBattle = active;
  document.body.classList.toggle("battle-active", active);
  $("battleActions").hidden = !active;
  if (active) $("gameMenu").open = false;
}
function openShop() {
  if (S?.inBattle) {
    say("The marketplace is closed during a fight.", "#ff8a8a");
    return;
  }
  renderShop();
  $("shop").hidden = false;
  document.body.classList.add("shop-open");
  $("bShopClose").focus();
}
function closeShop() {
  $("shop").hidden = true;
  document.body.classList.remove("shop-open");
  if (S?.preparing) {
    S.preparing = false;
    setBattleMode(true);
    $("shopMessage").textContent = "The marketplace is closed during a fight.";
    $("bBackpack").focus();
    return;
  }
  $("bShop").focus();
}
function renderBackpack() {
  const canAct = S && !S.busy && S.turn === "player";
  $("backpackMessage").textContent = canAct
    ? "Choose a potion to use on this turn."
    : "Potions can only be used during your turn.";
  $("backpackItems").innerHTML = POTIONS.map((potion) => {
    const quantity = STORE.potions[potion.id];
    const usable =
      canAct &&
      quantity > 0 &&
      (potion.id !== "healing" || S.php < getMaxHealth());
    const label =
      quantity < 1
        ? "None owned"
        : potion.id === "healing" && S.php >= getMaxHealth()
          ? "Health full"
          : usable
            ? "Use potion"
            : "Your turn";
    return `<article class="shop-item-card">
      <div class="shop-item-icon" aria-hidden="true">${potion.id === "healing" ? "♥" : potion.id === "strength" ? "⚔" : potion.id === "defense" ? "⬟" : "☠"}</div>
      <div class="shop-item-info"><h3>${potion.name}</h3><p>${potion.description}</p><small>Owned: ${quantity}</small></div>
      <button class="skin-action" type="button" data-use-potion="${potion.id}" ${usable ? "" : "disabled"}>${label}</button>
    </article>`;
  }).join("");
}
function openBackpack() {
  if (!S?.inBattle || $("over").style.display === "flex") return;
  renderBackpack();
  $("backpack").hidden = false;
  document.body.classList.add("backpack-open");
  $("bBackpackClose").focus();
}
function closeBackpack() {
  $("backpack").hidden = true;
  document.body.classList.remove("backpack-open");
  $("bBackpack").focus();
}
async function usePotion(id) {
  if (!S?.inBattle || S.busy || S.turn !== "player") {
    $("backpackMessage").textContent =
      "Wait until your turn to use a potion.";
    renderBackpack();
    return;
  }
  if (!POTIONS.some((potion) => potion.id === id) || STORE.potions[id] < 1)
    return;
  const previousHealth = S.php;
  const previousBuffs = { ...S.buffs };
  if (id === "healing") {
    if (S.php >= getMaxHealth()) {
      $("backpackMessage").textContent = "Your health is already full.";
      renderBackpack();
      return;
    }
    const healed = Math.min(35, getMaxHealth() - S.php);
    S.php += healed;
    say(`Healing Potion restored ${healed} health.`, "#b6f27a");
  } else if (id === "strength") {
    S.buffs.strength = Math.min(3, S.buffs.strength + 3);
    say("Strength Potion ready: your next 3 attacks deal 50% more damage.", "#ffe08a");
  } else if (id === "curse") {
    S.buffs.curse = true;
    say("Curse Potion ready: the next enemy hit will be halved.", "#bba5ff");
  } else {
    S.buffs.defense = Math.min(3, S.buffs.defense + 3);
    say("Defense Potion ready: the next 3 enemy attacks deal 50% less damage.", "#9ddcff");
  }
  const previous = STORE;
  STORE = {
    ...STORE,
    potions: { ...STORE.potions, [id]: STORE.potions[id] - 1 },
  };
  if (!saveStore()) {
    STORE = previous;
    S.php = previousHealth;
    S.buffs = previousBuffs;
    hud();
    return;
  }
  saveProgress();
  closeBackpack();
  S.busy = true;
  S.turn = "enemy";
  hud();
  await resolveEnemyTurn();
}
function handleSkinAction(event) {
  if (S?.inBattle) return;
  if (event.target.closest("[data-market-action]")) {
    handleMarketAction(event);
    return;
  }
  const button = event.target.closest("[data-skin-action]");
  if (!button || button.disabled) return;

  const skin = getSkin(button.dataset.skinId);
  const previous = STORE;
  const previousHealth = S?.php;
  const previousMaxHealth = getMaxHealth();
  if (button.dataset.skinAction === "buy") {
    if (STORE.coins < skin.price) {
      $("shopMessage").textContent =
        `You need ${skin.price - STORE.coins} more coins for ${skin.name}.`;
      return;
    }
    STORE = {
      ...STORE,
      coins: STORE.coins - skin.price,
      ownedSkins: [...STORE.ownedSkins, skin.id],
      equippedSkin: skin.id,
    };
  } else {
    STORE = { ...STORE, equippedSkin: skin.id };
  }
  if (S) {
    const newMaxHealth = getMaxHealth();
    S.php = Math.min(
      newMaxHealth,
      S.php + Math.max(0, newMaxHealth - previousMaxHealth),
    );
  }

  if (!saveStore()) {
    STORE = previous;
    if (S && previousHealth !== undefined) S.php = previousHealth;
    return;
  }

  clearSkinAnimations();
  $("hero").innerHTML = wormSvg();
  animateEquippedSkin(skin);
  $("shopMessage").textContent =
    `${skin.name} skin equipped! Keep battling to earn more coins.`;
  hud();
  saveProgress();
  renderShop();
}
function handleMarketAction(event) {
  if (S?.inBattle) return;
  const button = event.target.closest("[data-market-action]");
  if (!button || button.disabled) return;
  const action = button.dataset.marketAction;
  const id = button.dataset.itemId;
  const previous = STORE;
  const previousHealth = S?.php;
  const previousBuffs = S ? { ...S.buffs } : null;
  let message;

  if (action === "buy") {
    const potion = POTIONS.find((item) => item.id === id);
    if (!potion) return;
    if (STORE.coins < potion.price) {
      $("shopMessage").textContent =
        `You need ${potion.price - STORE.coins} more coins for ${potion.name}.`;
      return;
    }
    STORE = {
      ...STORE,
      coins: STORE.coins - potion.price,
      potions: { ...STORE.potions, [id]: STORE.potions[id] + 1 },
    };
    message = `${potion.name} added to your inventory.`;
  } else if (action === "upgrade") {
    const upgrade = UPGRADES.find((item) => item.id === id);
    if (!upgrade) return;
    const level = STORE.upgrades[id];
    if (level >= upgrade.maxLevel) return;
    const price = upgrade.price(level);
    if (STORE.coins < price) {
      $("shopMessage").textContent =
        `You need ${price - STORE.coins} more coins for ${upgrade.name}.`;
      return;
    }
    STORE = {
      ...STORE,
      coins: STORE.coins - price,
      upgrades: { ...STORE.upgrades, [id]: level + 1 },
    };
    if (id === "heart" && S) S.php = Math.min(getMaxHealth(), S.php + 20);
    message = `${upgrade.name} upgraded to level ${level + 1}.`;
  } else {
    return;
  }

  if (!saveStore()) {
    STORE = previous;
    if (S && previousHealth !== undefined) S.php = previousHealth;
    if (S && previousBuffs) S.buffs = previousBuffs;
    return;
  }
  if (action === "upgrade") saveProgress();
  $("shopMessage").textContent = message;
  hud();
  renderShop();
}
function bad(t) {
  say(t, "#ff8a8a");
  $("word").classList.remove("shake");
  void $("word").offsetWidth;
  $("word").classList.add("shake");
  blip(120, 0.2, "sawtooth");
}
async function go() {
  if (
    !S.inBattle ||
    S.preparing ||
    S.busy ||
    S.turn !== "player" ||
    !S.sel.length
  )
    return;
  const w = S.sel
    .map((i) => S.t[i].l)
    .join("")
    .toLowerCase();
  if (w.length < 2) return bad("Words need 2 or more letters");
  if (S.used.has(w)) return bad("You already used that word");
  if (!valid(w)) return bad(`"${w}" isn't a valid word`);
  S.busy = true;
  S.turn = "enemy";
  hud();
  S.used.add(w);
  const idx = [...S.sel];
  const gems = idx.filter((i) => S.t[i].gem).length;
  const playerSkin = getSkin();
  let dmg = idx.reduce((a, i) => a + PTS[S.t[i].l], 0);
  dmg = Math.round(
    dmg *
      (1 + (w.length - 3) * 0.4) *
      (gems ? 2 : 1) *
      getAttackMultiplier() *
      (S.buffs.strength > 0 ? 1.5 : 1),
  ) + getEquippedSkinStat("damage");
  if (S.enemyBuffs.curse || S.enemyBuffs.defense > 0) {
    dmg = Math.max(1, Math.round(dmg * 0.5));
  }
  S.enemyBuffs.curse = false;
  if (S.enemyBuffs.defense > 0) S.enemyBuffs.defense--;
  if (S.buffs.strength > 0) S.buffs.strength--;
  const foe = $("foe").getBoundingClientRect(),
    els = [...$("board").children];
  const fl = idx.map((i, n) => {
    const r = els[i].getBoundingClientRect();
    const a = els[i].animate(
      [
        {
          transform: "none",
          opacity: 1,
        },
        {
          transform: `translate(${foe.left + foe.width / 2 - r.left - r.width / 2}px,${foe.top + foe.height / 2 - r.top - r.height / 2}px) rotate(${720 + n * 90}deg) scale(.3)`,
          opacity: 0.9,
        },
      ],
      {
        duration: 650,
        delay: n * 70,
        easing: "cubic-bezier(.5,-.3,.6,1)",
        fill: "forwards",
      },
    );
    return a.finished;
  });
  $("hero").classList.remove("bob");
  $("hero").classList.add("lungeL");
  sweep(dmg >= 20);
  await Promise.all(fl);
  burst(
    foe.left + foe.width / 2,
    foe.top + foe.height / 2,
    Math.min(70, 20 + dmg),
    playerSkin.rarity === "legendary"
      ? playerSkin.accent
      : gems
        ? "#ffd23f"
        : "#ff8a3d",
  );
  await playLegendaryAttack(
    playerSkin,
    foe.left + foe.width / 2,
    foe.top + foe.height / 2,
  );
  shakeScreen(dmg);
  blip(180, 0.3, "square");
  $("foe").classList.add("hit");
  setTimeout(() => $("foe").classList.remove("hit"), 400);
  num(foe.left + foe.width / 2, foe.top, "-" + dmg);
  S.ehp -= dmg;
  S.score += dmg * 10;
  const earnedCoins = Math.max(
    1,
    Math.floor((dmg / 5) * (1 + getEquippedSkinStat("coins") / 100)),
  );
  STORE.coins += earnedCoins;
  saveStore();
  S.sel = [];
  S.enemyStunned =
    w.length > 5 || Math.random() * 100 < getEquippedSkinStat("stun");
  say(
    `${w.toUpperCase()}${dmg >= 25 ? "! Critical hit!" : ` deals ${dmg}`}${S.enemyStunned ? ` ${getFoe().n} is stunned!` : ""} +${earnedCoins} coins`,
    "#ffe08a",
  );
  idx.forEach((i) => {
    S.t[i] = {
      ...mk(),
      fresh: true,
    };
  });
  fixVowels();
  hud();
  render();
  $("hero").classList.remove("lungeL");
  $("hero").classList.add("bob");
  await resolveEnemyTurn(S.enemyStunned);
}
async function resolveEnemyTurn(enemyStunned = false) {
  hud();
  await sleep(500);
  if (S.ehp <= 0) return win();
  if (enemyStunned) {
    S.enemyStunned = false;
    say(`${getFoe().n} is stunned and misses its turn!`, "#b6f27a");
    await sleep(500);
  } else {
    await foeAttack();
  }
  while (S.playerStunned && S.php > 0) {
    S.playerStunned = false;
    S.turn = "enemy";
    say("Wilbur is stunned and misses his turn!", "#ff8a8a");
    hud();
    await sleep(500);
    await foeAttack();
  }
  if (S.php <= 0) return;
  S.turn = "player";
  hud();
  S.busy = false;
  if (!$("backpack").hidden) renderBackpack();
  saveProgress();
}
async function foeAttack() {
  if (await useEnemyPotion()) return;
  const f = getFoe(),
    e = $("foe");
  const attackWords = f.words.filter(has);
  const fallbackWords = Array.from(WORDS).filter((entry) => entry.length >= 2);
  const words = attackWords.length ? attackWords : fallbackWords;
  const word = words[(Math.random() * words.length) | 0];
  S.turn = "enemy";
  hud();
  e.classList.remove("bob");
  e.classList.add("lunge");
  await sleep(300);
  const h = $("hero").getBoundingClientRect();
  const damage = Math.max(
    1,
    Math.ceil(
      f.atk *
        (S.enemyBuffs.strength > 0 ? 1.5 : 1) *
        (S.buffs.curse || S.buffs.defense > 0 ? 0.5 : 1) -
        STORE.upgrades["iron-shell"] * 2 + getEquippedSkinStat("defense"),
    ),
  );
  if (S.enemyBuffs.strength > 0) S.enemyBuffs.strength--;
  S.buffs.curse = false;
  if (S.buffs.defense > 0) S.buffs.defense--;
  S.php -= damage;
  burst(h.left + h.width / 2, h.top + h.height / 2, 30, "#ff4d4d");
  shakeScreen(f.atk * 2);
  blip(90, 0.3, "sawtooth");
  $("hero").classList.add("hit");
  num(h.left + 60, h.top, "-" + damage);
  S.playerStunned = word.length > 5;
  say(
    `${f.n} attacks with "${word.toUpperCase()}" for ${damage} damage!${S.playerStunned ? " Wilbur is stunned!" : ""}`,
    "#ff8a8a",
  );
  hud();
  await sleep(400);
  $("hero").classList.remove("hit");
  e.classList.remove("lunge");
  e.classList.add("bob");
  if (S.php <= 0) end(false);
}
async function useEnemyPotion() {
  const potion = POTIONS.find(({ id }) => id === S.enemyPotion);
  if (!potion) return false;
  if (potion.id === "healing" && S.emax - S.ehp < 35) return false;

  S.enemyPotion = null;
  if (potion.id === "healing") {
    const healed = Math.min(35, S.emax - S.ehp);
    S.ehp += healed;
    say(`${getFoe().n} drinks a Healing Potion and restores ${healed} health!`, "#b6f27a");
  } else if (potion.id === "strength") {
    S.enemyBuffs.strength = Math.min(3, S.enemyBuffs.strength + 3);
    say(`${getFoe().n} drinks a Strength Potion! Its next 3 attacks deal 50% more damage.`, "#ffe08a");
  } else if (potion.id === "curse") {
    S.enemyBuffs.curse = true;
    say(`${getFoe().n} drinks a Curse Potion! Your next attack deals 50% less damage.`, "#bba5ff");
  } else {
    S.enemyBuffs.defense = Math.min(3, S.enemyBuffs.defense + 3);
    say(`${getFoe().n} drinks a Defense Potion! Your next 3 attacks deal 50% less damage.`, "#9ddcff");
  }
  hud();
  await sleep(500);
  return true;
}
async function win() {
  const f = $("foe").getBoundingClientRect();
  burst(f.left + f.width / 2, f.top + f.height / 2, 120, "#ffd23f");
  await $("foe").animate(
    [
      {
        transform: "scale(1) rotate(0)",
        opacity: 1,
      },
      {
        transform: "scale(0) rotate(540deg)",
        opacity: 0,
      },
    ],
    {
      duration: 700,
      fill: "forwards",
    },
  ).finished;
  blip(520, 0.3);
  setTimeout(() => blip(780, 0.3), 150);
  S.score += 500;
  const recoveredHealth = 25 + getEquippedSkinStat("recovery");
  S.php = Math.min(getMaxHealth(), S.php + recoveredHealth);
  const victoryCoins = 10 + Math.floor((10 * getEquippedSkinStat("coins")) / 100);
  STORE.coins += victoryCoins;
  saveStore();
  S.lv++;
  say(
    `Chapter ${S.lv + 1}! A new foe approaches. +${recoveredHealth} health · +${victoryCoins} coins`,
    "#b6f27a",
  );
  load();
  S.busy = false;
  saveProgress();
}
function end(v) {
  S.busy = true;
  saveProgress();
  $("ot").textContent = v ? "Library saved!" : "Adventure over";
  $("os").textContent =
    (v ? "Wilbur defeated every monster. " : "Wilbur was bookmarked. ") +
    `Reached chapter ${S.lv + 1}. Final score: ${S.score}`;
  $("over").style.display = "flex";
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
function num(x, y, t) {
  const d = document.createElement("div");
  d.className = "dmg";
  d.textContent = t;
  d.style.left = x - 20 + "px";
  d.style.top = y + "px";
  document.body.appendChild(d);
  setTimeout(() => d.remove(), 1000);
}
function shakeScreen(n) {
  const a = $("arena");
  a.classList.remove("shake");
  void a.offsetWidth;
  a.classList.add("shake");
}
function sweep() {}
// Combat impact particles only; the scene art is a static illustrated backdrop.
const cv = $("fx"),
  cx = cv.getContext("2d");
let P = [];
function rs() {
  cv.width = innerWidth;
  cv.height = innerHeight;
}
rs();
addEventListener("resize", rs);
function burst(x, y, n, c) {
  for (let i = 0; i < n; i++) {
    const a = Math.random() * 6.28,
      v = 2 + Math.random() * 7;
    P.push({
      x,
      y,
      vx: Math.cos(a) * v,
      vy: Math.sin(a) * v - 3,
      l: 1,
      r: 2 + Math.random() * 5,
      c,
      star: Math.random() < 0.3,
    });
  }
}
function loop() {
  cx.clearRect(0, 0, cv.width, cv.height);
  P = P.filter((p) => p.l > 0);
  P.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.25;
    p.l -= 0.02;
    cx.globalAlpha = Math.max(0, p.l);
    cx.fillStyle = p.c;
    cx.beginPath();
    if (p.star) {
      cx.save();
      cx.translate(p.x, p.y);
      cx.rotate(p.l * 8);
      cx.fillRect(-p.r, -p.r, p.r * 2, p.r * 2);
      cx.restore();
    } else {
      cx.arc(p.x, p.y, p.r * p.l + 1, 0, 6.28);
      cx.fill();
    }
  });
  cx.globalAlpha = 1;
  requestAnimationFrame(loop);
}
loop();
// sound
let AC;
let musicTimer = null;
let musicStarting = false;
let musicBus = null;
let musicStep = 0;
let nextMusicTime = 0;
let noiseBuffer = null;
const MUSIC_STEP = 60 / 116 / 2;
const MUSIC_ROOTS = [50, 46, 48, 45];
const MUSIC_MELODY = [12, null, 7, null, 10, null, 7, 5];
const MUSIC_LOOP_STEPS = MUSIC_ROOTS.length * MUSIC_MELODY.length;

function blip(f, d = 0.15, t = "triangle") {
  try {
    AC = AC || new AudioContext();
    const o = AC.createOscillator(),
      g = AC.createGain();
    o.type = t;
    o.frequency.value = f;
    g.gain.setValueAtTime(0.08, AC.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, AC.currentTime + d);
    o.connect(g).connect(AC.destination);
    o.start();
    o.stop(AC.currentTime + d);
  } catch (e) {}
}

function musicFrequency(note) {
  return 440 * 2 ** ((note - 69) / 12);
}

function playMusicTone(note, time, duration, volume, type, cutoff) {
  const oscillator = AC.createOscillator();
  const gain = AC.createGain();
  const filter = AC.createBiquadFilter();
  oscillator.type = type;
  oscillator.frequency.value = musicFrequency(note);
  filter.type = "lowpass";
  filter.frequency.value = cutoff;
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(volume, time + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
  oscillator.connect(filter).connect(gain).connect(musicBus);
  oscillator.start(time);
  oscillator.stop(time + duration + 0.02);
}

function playBattleKick(time) {
  const oscillator = AC.createOscillator();
  const gain = AC.createGain();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(135, time);
  oscillator.frequency.exponentialRampToValueAtTime(42, time + 0.16);
  gain.gain.setValueAtTime(0.7, time);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.18);
  oscillator.connect(gain).connect(musicBus);
  oscillator.start(time);
  oscillator.stop(time + 0.2);
}

function playBattleSnare(time) {
  const noise = AC.createBufferSource();
  const filter = AC.createBiquadFilter();
  const gain = AC.createGain();
  noise.buffer = noiseBuffer;
  filter.type = "highpass";
  filter.frequency.value = 1400;
  gain.gain.setValueAtTime(0.28, time);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.12);
  noise.connect(filter).connect(gain).connect(musicBus);
  noise.start(time);
  noise.stop(time + 0.13);
}

function scheduleBattleMusic() {
  while (nextMusicTime < AC.currentTime + 0.12) {
    const step = musicStep;
    const beat = step % 8;
    const root = MUSIC_ROOTS[Math.floor(step / 8)];
    const time = nextMusicTime;
    const melody = MUSIC_MELODY[beat];

    playMusicTone(
      root - 12 + (beat % 2 ? 7 : 0),
      time,
      0.2,
      0.38,
      "sawtooth",
      260,
    );
    if (beat === 0 || beat === 4) playBattleKick(time);
    if (beat === 2 || beat === 6) playBattleSnare(time);
    if (melody !== null) {
      playMusicTone(root + melody, time, 0.22, 0.16, "square", 1500);
    }

    musicStep = (musicStep + 1) % MUSIC_LOOP_STEPS;
    nextMusicTime += MUSIC_STEP;
  }
}

async function startBattleMusic() {
  AC = AC || new AudioContext();
  await AC.resume();
  musicBus = AC.createGain();
  musicBus.gain.setValueAtTime(0, AC.currentTime);
  musicBus.gain.linearRampToValueAtTime(0.3, AC.currentTime + 0.6);
  musicBus.connect(AC.destination);

  noiseBuffer = AC.createBuffer(1, AC.sampleRate * 0.15, AC.sampleRate);
  const noiseData = noiseBuffer.getChannelData(0);
  for (let i = 0; i < noiseData.length; i++) {
    noiseData[i] = Math.random() * 2 - 1;
  }

  musicStep = 0;
  nextMusicTime = AC.currentTime + 0.05;
  musicTimer = setInterval(scheduleBattleMusic, 50);
  $("bMusic").setAttribute("aria-pressed", "true");
  $("musicLabel").textContent = "Pause battle music";
}

function stopBattleMusic() {
  clearInterval(musicTimer);
  musicTimer = null;
  if (musicBus) {
    const bus = musicBus;
    bus.gain.setTargetAtTime(0, AC.currentTime, 0.05);
    setTimeout(() => bus.disconnect(), 250);
    musicBus = null;
  }
  $("bMusic").setAttribute("aria-pressed", "false");
  $("musicLabel").textContent = "Play battle music";
}

async function toggleBattleMusic() {
  if (musicTimer !== null) {
    stopBattleMusic();
    return;
  }
  if (musicStarting) return;
  musicStarting = true;
  try {
    await startBattleMusic();
  } finally {
    musicStarting = false;
  }
}

// controls
$("bShop").onclick = openShop;
$("bShopClose").onclick = closeShop;
$("redeem-form").addEventListener("submit", handleRedeemCode);
$("shopCategories").addEventListener("click", (event) => {
  const category = event.target.closest("[data-shop-category]");
  if (!category) return;
  activeShopCategory = category.dataset.shopCategory;
  renderShop();
});
$("skinFilters").addEventListener("click", (event) => {
  const filter = event.target.closest("[data-rarity]");
  if (!filter) return;
  activeSkinRarity = filter.dataset.rarity;
  renderShop();
});
$("skinGrid").addEventListener("click", handleSkinAction);
$("shop").addEventListener("click", (event) => {
  if (event.target === $("shop")) closeShop();
});
addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !$("shop").hidden) closeShop();
  else if (event.key === "Escape" && !$("backpack").hidden) closeBackpack();
});
$("bBackpack").onclick = openBackpack;
$("bBackpackClose").onclick = closeBackpack;
$("backpackItems").addEventListener("click", (event) => {
  const button = event.target.closest("[data-use-potion]");
  if (button && !button.disabled) usePotion(button.dataset.usePotion);
});
$("backpack").addEventListener("click", (event) => {
  if (event.target === $("backpack")) closeBackpack();
});
$("bMusic").onclick = async () => {
  try {
    await toggleBattleMusic();
  } catch (error) {
    console.error("Could not toggle battle music:", error);
    say("Battle music could not start in this browser.", "#ff8a8a");
  }
};
$("bGo").onclick = go;
$("bClear").onclick = () => {
  if (!S.busy) {
    S.sel = [];
    updSel();
  }
};
$("bShuf").onclick = () => {
  if (S.busy) return;
  S.t = S.t
    .map((t) => ({
      ...t,
      fresh: false,
    }))
    .sort(() => Math.random() - 0.5);
  S.sel = [];
  fixVowels();
  render();
  blip(220, 0.2);
};
$("bAgain").onclick = start;
addEventListener("keydown", (e) => {
  if (S.busy || S.preparing || !$("backpack").hidden) return;
  if (
    e.target.closest(
      "button, a, input, select, textarea, [contenteditable=true]",
    )
  )
    return;
  if (e.key === "Enter") return go();
  if (e.key === "Backspace") {
    S.sel.pop();
    return updSel();
  }
  if (/^[a-z]$/i.test(e.key)) {
    const L = e.key.toUpperCase(),
      i = S.t.findIndex((t, k) => t.l === L && !S.sel.includes(k));
    if (i > -1) pick(i);
  }
});
async function startRequestedMode() {
  const user = await window.WormwoodFirebaseAuthReady;
  if (!user) {
    location.replace("index.html?signin=required");
    return;
  }
  document.body.classList.add("auth-ready");
  const preparing = new URLSearchParams(location.search).get("mode") === "shop";
  start(true);
  if (preparing) {
    S.inBattle = false;
    S.preparing = true;
    setBattleMode(false);
    $("shopMessage").textContent =
      "Prepare before your adventure. Close the marketplace to begin the fight.";
    openShop();
  }
}

loadDictionary()
  .then(() => {
    console.info("Dictionary words loaded:", BIG.size + WORDS.size);
    startRequestedMode();
  })
  .catch((error) => {
    console.error("Could not load the expanded dictionary:", error);
    startRequestedMode();
    say(
      "Expanded dictionary unavailable; some words may not validate.",
      "#ff8a8a",
    );
  });
