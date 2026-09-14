export type MenuItem = {
  name: string;
  desc?: string;
  price: string;
  frozen?: boolean;
  veg?: boolean;
  challenge?: boolean;
};

export type MenuSection = {
  id: string;
  emoji: string;
  title: string;
  note?: string;
  items: MenuItem[];
};

export const menu: MenuSection[] = [
  {
    id: "offerta",
    emoji: "🌟",
    title: "Offerta Special",
    items: [
      {
        name: "Maxi Tagliere Alette Speziate Fritte + Chips",
        desc: "20 pz",
        price: "25,00",
      },
    ],
  },
  {
    id: "carne",
    emoji: "🥩",
    title: "Piatti di Carne",
    items: [
      { name: "Burger di Scottona 200g", desc: "+ verdure", price: "13,00", frozen: true },
      { name: "Burger di Manzo 200g", desc: "+ verdure", price: "13,00", frozen: true },
      { name: "Burger di Angus 200g", desc: "+ verdure", price: "13,00", frozen: true },
      { name: "Zampina + Bombette", desc: "+ chips", price: "10,00", frozen: true },
      { name: "Cotoletta di Pollo (Home Made)", desc: "+ chips", price: "7,00", frozen: true },
      {
        name: "Costata di Scottona (600g circa)",
        desc: "+ chips (chiedere disponibilità)",
        price: "25,00",
        frozen: true,
      },
      { name: "Costine di Maiale in Salsa BBQ", desc: "+ chips", price: "17,00", frozen: true },
      { name: "Alette Speziate Fritte", desc: "8 pz", price: "8,00", frozen: true },
      {
        name: "Alette Speziate Fritte alla N'duja di Spilinga",
        desc: "8 pz",
        price: "10,00",
        frozen: true,
      },
      { name: "Maxi Tagliere di Alette Speziate Fritte + chips", desc: "20 pz", price: "25,00" },
      {
        name: "Alette più Piccanti al Mondo",
        desc: "6 pz (chiedere disponibilità)",
        price: "10,00",
        frozen: true,
      },
      {
        name: "Tagliata di Manzo Condita (300/350 gr)",
        desc: "rucola, grana, pomodorino e glassa",
        price: "18,00",
      },
      {
        name: "Tartare di Carne Cruda Abbattuta di Scottona 150g",
        desc: "condita con olio di oliva BIO, pepe nero e lime, accompagnata con cavolo rosso alla piastra (chiedere disponibilità)",
        price: "13,00",
      },
    ],
  },
  {
    id: "special-burger",
    emoji: "⭐",
    title: "Special Burger",
    items: [
      {
        name: "Herb Simpson",
        desc: "Doppio bovino 250gr, doppio cheddar fuso, doppio bacon, pulled pork, figliata di mozzarella",
        price: "25,00",
      },
      {
        name: "Mona Simpson",
        desc: "Hamburger bovino 250gr, insalata, pomodoro, pulled pork, cheddar fuso, figliata di mozzarella",
        price: "20,00",
      },
      {
        name: "Abe Pistacchiotto",
        desc: "Burger di manzo 200gr, crema di pistacchio, grana a scaglie, mortadella",
        price: "10,00",
        frozen: true,
      },
      {
        name: "Otto — Doppio Giant Burger",
        desc: "Doppio burger di manzo 250gr, insalata, doppio cheddar, doppio bacon, burrata, salsa hill's",
        price: "20,00",
      },
      {
        name: "Il Panzino",
        desc: "Burger di Scottona 200g, provola affumicata, n'duja di Spilinga, cavolo rosso, bacon croccante, cipolla fresca e maionese",
        price: "12,00",
        frozen: true,
      },
      {
        name: "Big Apu",
        desc: "Tartare di carne cruda abbattuta di scottona 150g, olio di oliva, n'duja di Spilinga, grana a scaglie, cavolo rosso, insalata e salsa hill's (chiedere disponibilità)",
        price: "15,00",
      },
      {
        name: "Sherri e Terry (Pistacchioso Giant)",
        desc: "Burger di scottona 200gr, insalata, doppio cheddar, doppio bacon, burrata, crema di pistacchio",
        price: "16,00",
        frozen: true,
      },
      {
        name: "Artie",
        desc: "Triplo burger di manzo 200gr, triplo cheddar, provola affumicata e pulled pork",
        price: "20,00",
        frozen: true,
      },
    ],
  },
  {
    id: "panini",
    emoji: "🍔",
    title: "Hamburger e Panini Sfida",
    items: [
      {
        name: "Hills Burger",
        desc: "Burger di bovino 100gr, formaggio cheddar, insalata, pomodoro, ketch./maion.",
        price: "5,00",
      },
      {
        name: "Cheeseburger",
        desc: "Burger di bovino 100gr, doppio cheddar, insalata, pomodoro, ketch./maion.",
        price: "6,00",
      },
      {
        name: "Baby Burger",
        desc: "Burger di bovino 100gr, patatine fritte, ketch./maion.",
        price: "5,00",
        frozen: true,
      },
      {
        name: "Springfield",
        desc: "Burger di bovino 100gr, formaggio cheddar, pomodoro, bacon, ketchup, salsa hill's",
        price: "6,00",
      },
      {
        name: "Homer",
        desc: "Burger di manzo 200gr, doppio cheddar, pomodoro, bacon, cipolla caramellata, salsa hill's",
        price: "10,00",
        frozen: true,
      },
      {
        name: "Marge",
        desc: "Burger di pollo 100gr, grana padano, insalata, pomodoro, ketchup, salsa hill's",
        price: "6,00",
      },
      {
        name: "Bart",
        desc: "Doppio burger 100gr, doppio cheddar, insalata, pomodoro, ketch./maion.",
        price: "10,00",
      },
      {
        name: "Lisa",
        desc: "Burger di verdure 100gr, insalata, pomodoro, cipolla caramellata, ketchup",
        price: "6,00",
        frozen: true,
        veg: true,
      },
      {
        name: "Montgomery Burns",
        desc: "Doppio burger di bovino 100gr, doppio cheddar, doppio bacon, insalata, pomodoro, salsa barbecue",
        price: "11,00",
      },
      {
        name: "Boy Szyslak",
        desc: "Burger di pollo con croccante panatura stile K giapponese ai cornflakes, formaggio cheddar, insalata, pomodoro, ketchup e maionese.",
        price: "10,00",
        frozen: true,
      },
      {
        name: "Winchester",
        desc: "Burger di manzo 200gr, bacon, patatine fritte, insalata, pomodoro, ketch./maion.",
        price: "11,00",
        frozen: true,
      },
      {
        name: "Krusty Clown",
        desc: "Burger di angus irlandese 200gr, formaggio cheddar, bacon, rucola, pomodoro, salsa hill's",
        price: "12,00",
        frozen: true,
      },
      {
        name: "Barney",
        desc: "Burger di scottona 200gr, formaggio cheddar, bacon, insalata, pomodoro, uovo occhio di bue, salsa hill's",
        price: "12,00",
        frozen: true,
      },
      {
        name: "Italiano",
        desc: "Burger di scottona 200gr, bacon, formaggio cheddar, patata dippers (con buccia), maionese",
        price: "13,00",
        frozen: true,
      },
      {
        name: "Americano",
        desc: "Burger di angus irlandese 200gr, rucola, pomodoro, bacon, formaggio cheddar fuso, salsa hill's",
        price: "13,00",
        frozen: true,
      },
      {
        name: "Rosti",
        desc: "Burger di bovino 100gr, formaggio cheddar, Rosti burger (hamburger di patate), bacon, cipolla croccante, insalata, pomodoro, salsa barbecue, maionese",
        price: "10,00",
        frozen: true,
      },
      {
        name: "Troy McClure",
        desc: "Burger di chianina 200gr, pomodorini, cipolla caramellata, mozzarella di bufala, paté di olive nere, salsa boscaiola",
        price: "11,00",
        frozen: true,
      },
      {
        name: "Maggie",
        desc: "Cotoletta di pollo, insalata, pomodoro, patatine fritte, bacon, ketch./maion.",
        price: "6,00",
        frozen: true,
      },
      {
        name: "Gran Scottona",
        desc: "Burger di scottona 200gr, insalata, pomodorini, mozzarella di bufala, crema di noci",
        price: "13,00",
        frozen: true,
      },
      {
        name: "Premium Big",
        desc: "Burger di manzo 200gr avvolto da formaggio cheddar e bacon, insalata, pomodoro, salsa hill's",
        price: "10,00",
        frozen: true,
      },
      {
        name: "Gran Chianina",
        desc: "Burger di chianina 200gr, insalata, pomodoro, formaggio cheddar, bacon, ketch./maion.",
        price: "11,00",
        frozen: true,
      },
      {
        name: "Royal Bacon BBQ",
        desc: "3 Burger di bovino 100gr, formaggio cheddar fuso, bacon, anelli di cipolla, salsa barbecue",
        price: "15,00",
        frozen: true,
      },
      {
        name: "Patty",
        desc: "Burger di manzo 200gr, cipolla caramellata, n'duja piccante, mozzarella di bufala, insalata",
        price: "10,00",
        frozen: true,
      },
      {
        name: "Burger N'Zert",
        desc: "Burger di manzo 200gr, insalata, pomodoro, mozzarella di bufala, uovo occhio di bue, bacon, salsa hill's",
        price: "10,00",
        frozen: true,
      },
      {
        name: "Yom Chi",
        desc: "Burger di manzo 200gr, insalata, pomodoro, formaggio brie, melanzane grigliate, bacon, salsa hill's",
        price: "10,00",
        frozen: true,
      },
      {
        name: "Uomo dei Fumetti",
        desc: "Porchetta di ariccia (con prosciutto cotto, scamorza affumicata, formaggio cheddar), maxi uccelletto (di bacon, scamorza affumicata, cheddar, patatine fritte), insalata, maionese",
        price: "13,00",
        frozen: true,
      },
      {
        name: "Lenny Leonard",
        desc: "Burger di manzo (GIANT) 250gr, doppio cheddar, maxi uccelletto (di bacon, scamorzine, cheddar), insalata, melanzane grigliate, salsa hill's",
        price: "15,00",
        frozen: true,
      },
      {
        name: "Joe Quimby",
        desc: "Doppio burger di pollo 200gr con croccante panatura stile K giapponese ai cornflakes, doppio cheddar, doppio bacon, insalata e salsa Hill's.",
        price: "20,00",
        frozen: true,
      },
      {
        name: "Secco Jones",
        desc: "Burger di scottona 200gr, doppio cheddar, doppio bacon, rucola, pomodoro, salsa a scelta",
        price: "12,00",
        frozen: true,
      },
      {
        name: "Spider Pork",
        desc: "Spalla di maiale magra tenerissima sfilacciata (Pulled Pork), insalata, salsa barbecue",
        price: "8,00",
      },
      {
        name: "Telespalla Bob",
        desc: "Tagliata di manzo al sangue, rucola, pomodorino, grana padano, glassa balsamica",
        price: "8,00",
      },
      {
        name: "Ned Flanders",
        desc: "Burger di manzo 200g, doppio cheddar, bacon, gorgonzola, patatine, salsa hill's",
        price: "11,00",
        frozen: true,
      },
      {
        name: "Snake",
        desc: "Kebab di pollo e tacchino, insalata, patatine, ketch./maion.",
        price: "5,00",
        frozen: true,
      },
      {
        name: "Selma",
        desc: "Burger di manzo 200g, provola affumicata, bacon, cipolla croccante, rucola, pomodoro e salsa hill's",
        price: "10,00",
        frozen: true,
      },
      {
        name: "Centrale Nucleare",
        desc: "Salsiccia di maiale piccante, n'duja calabrese, peperoncino",
        price: "7,00",
      },
      { name: "Edna", desc: "Salmone affumicato, philadelphia, zucchine grigliate", price: "7,00" },
      { name: "Carl", desc: "Salsiccia alla piastra, patatine, ketch./maion.", price: "5,00", frozen: true },
      { name: "Nelson", desc: "Bombette alla piastra, patatine, ketch./maion.", price: "5,00", frozen: true },
      { name: "Milhouse", desc: "Uccelletti, patatine, ketch./maion.", price: "5,00", frozen: true },
      { name: "Willie", desc: "Porchetta di ariccia, insalata, funghi, ketch./maion.", price: "8,00" },
      {
        name: "Apu",
        desc: "Burger di verdure, verdure grigliate, glassa balsamica",
        price: "6,00",
        frozen: true,
        veg: true,
      },
      {
        name: "Seymour Skinner",
        desc: "Cotoletta di pollo, patatine, ketch./maion.",
        price: "5,00",
        frozen: true,
      },
      { name: "Hot Dog", desc: "Wurstel, ketch./maion.", price: "3,00" },
      { name: "Hot Dog Chips", desc: "Wurstel, patatine, ketch./maion.", price: "4,00", frozen: true },
      {
        name: "Super Hot Dog",
        desc: "Wurstel, bacon, formaggio cheddar, ketch./maion.",
        price: "5,00",
      },
      {
        name: "Hot Dog Americano",
        desc: "Wurstel, cheddar, bacon, insalata, pomodoro, cipolla croccante, ketch./maion.",
        price: "6,00",
      },
      {
        name: "Uvuccir (Finalista Burger Battle 2025)",
        desc: "Burger di bovino 100gr, formaggio cheddar, bacon, uccelletti, zucchine alla poverella, salsa barbecue",
        price: "8,00",
        frozen: true,
      },
      {
        name: "Hills Bomba",
        desc: "Doppio burger di bovino 200gr, scamorza affumicata, doppio bacon, pulled pork, salsa hill's",
        price: "15,00",
      },
      {
        name: "🔥 Big Simpson (Panino Sfida)",
        desc: "3 Burger di bovino 100gr, 2 fette di porchetta di ariccia, bombette, maxi uccelletto, formaggio cheddar, bacon, insalata, pomodoro, salsa a scelta (contorno di patatine). SE LO MANGI IN 20 MINUTI NON LO PAGHI!!!",
        price: "30,00",
        frozen: true,
        challenge: true,
      },
    ],
  },
  {
    id: "combo",
    emoji: "🥤",
    title: "Menu Combo",
    items: [
      { name: "Menu Hill's (Menu 1)", desc: "Panino Hill's + Coca-Cola + Patatine fritte", price: "10,00" },
      {
        name: "Menu Porketta (Menu 2)",
        desc: "Panino (porchetta, provola, patatine) + Birra Peroni + Patatine fritte",
        price: "10,00",
      },
      {
        name: "Menu Combo 3 (Menu Pulled)",
        desc: "Piadina (pulled, insalata, patatine, cipolla, salse) + Coca-Cola + Patatine fritte",
        price: "10,00",
      },
      {
        name: "Menu Combo 4 (Menu Chicken)",
        desc: "Panino (cotoletta, insalata, pomodoro, maionese) + Coca-Cola + n°5 Nuggets",
        price: "10,00",
      },
    ],
  },
  {
    id: "piadine",
    emoji: "🌯",
    title: "Piadine",
    items: [
      { name: "Ralph", desc: "Crudo, mozzarella, funghi, insalata, pomodoro", price: "7,00" },
      { name: "Habraham", desc: "Cotto, scamorza affumicata, funghi, rucola", price: "7,00" },
      { name: "Love Joy", desc: "Crudo, mozzarella, pomodoro, rucola", price: "7,00" },
      { name: "Spada", desc: "Pollo alla piastra, insalata, pomodoro, mozzarella, salsa hill's", price: "9,00" },
      {
        name: "Fajitas Mexicana",
        desc: "Tagliata di pollo, cipolla, insalata, pomodoro, curry, salsa mexicana",
        price: "9,00",
        frozen: true,
      },
    ],
  },
  {
    id: "insalate",
    emoji: "🥗",
    title: "Insalate",
    items: [
      {
        name: "Insalata Pulled",
        desc: "Insalata verde, pomodorino, rucola, olive nere, grana padano, pulled pork, gocce di salsa BBQ",
        price: "10,00",
      },
      {
        name: "Insalata Cocktail",
        desc: "Insalata verde, rucola, pomodorino, gamberetti, tonno, salsa cocktail",
        price: "10,00",
      },
      {
        name: "Insalata Crudo & Bufala",
        desc: "Insalata verde, funghi sott'olio, crudo, grana padano, pomodorino, mozzarella di bufala",
        price: "10,00",
      },
      {
        name: "Insalata Salmone",
        desc: "Insalata verde, tonno, pomodorino, grana padano, salmone affumicato, salsa hill's",
        price: "11,00",
      },
      {
        name: "Insalata Pollo",
        desc: "Insalata verde, petto di pollo, mais, pomodorino, mozzarella di bufala",
        price: "11,00",
      },
      {
        name: "Insalata Kebab",
        desc: "Insalata verde, kebab, funghi sott'olio, grana padano, salsa yogurt",
        price: "11,00",
        frozen: true,
      },
    ],
  },
  {
    id: "fritture",
    emoji: "🍟",
    title: "Fritture e Patatine",
    note: "Porzioni da 6 pz",
    items: [
      { name: "Mozz. Stick Beer Battered", price: "6,00", frozen: true },
      { name: "Anelloni di Cipolla", price: "6,00", frozen: true },
      { name: "Nuggets di Pollo", price: "6,00", frozen: true },
      { name: "Strip Chicken (Home Made)", price: "6,00", frozen: true },
      { name: "Cream Cheese Jalapeno", price: "6,00", frozen: true },
      { name: "Crocchette di Patate", price: "6,00", frozen: true },
      { name: "Polpettine di Carne", price: "6,00", frozen: true },
      { name: "Dischi di Camembert", price: "6,00", frozen: true },
      { name: "Bites Pulled Pork", price: "6,00", frozen: true },
      { name: "Anelli di Formaggio Gouda con Bacon", price: "6,00", frozen: true },
      { name: "Stick di Cheddar", price: "6,00", frozen: true },
      { name: "Patatine Classiche", desc: "piccola / grande", price: "4,00 / 8,00", frozen: true },
      {
        name: "Ribble Fries (patata rossa dolce)",
        desc: "piccola / grande",
        price: "5,00 / 10,00",
        frozen: true,
      },
      { name: "Dippers (patata con buccia)", desc: "piccola / grande", price: "5,00 / 10,00", frozen: true },
      { name: "Criss Cuts (patata grigliata)", desc: "piccola / grande", price: "5,00 / 10,00", frozen: true },
      {
        name: "Dippers con cheddar fuso e bacon croccante",
        desc: "piccola / grande",
        price: "8,00 / 16,00",
        frozen: true,
      },
    ],
  },
];

export const reviews = [
  {
    name: "Carmine P.",
    stars: 5,
    text: "Ottima paninoteca! Hamburger davvero gustosi, preparati con ingredienti freschi e di qualità. Il pane era morbido, la carne cotta alla perfezione e le patatine …",
  },
  {
    name: "Lucia L.",
    stars: 5,
    text: "Panini magnifici, grande opportunità di scelta in base ai propri gusti, ricchi e con prodotti di prima scelta. Persone gentilissime e professionali. Siamo …",
  },
  {
    name: "Francesco P.",
    stars: 5,
    text: "Panini buonissimi e con una ampia scelta servizio ottimo, complimenti ai proprietari Antonio e Pina, tutto buonissimo …",
  },
  {
    name: "Maria A.",
    stars: 4,
    text: "Panini ottimi! Gli ingredienti sono molto buoni e c'è tantissima scelta. Il locale è a tema Simpson, infatti ogni panino ha un nome dei diversi personaggi del …",
  },
  {
    name: "Giuseppina S.",
    stars: 5,
    text: "I panini di Antonio sono i più buoni nella zona. Antonio è una bravissima persona e fa dei panini super buonissimi. È assolutamente da provare. E nn lo lascerete più",
  },
  {
    name: "Erol L.",
    stars: 5,
    text: "Per un amante dei panini e della buona birra, stasera è stato come trovarsi nel paradiso terrestre ...40 e più tipi di panini da cui scegliere… …",
  },
  {
    name: "Oh_perbacco F.",
    stars: 5,
    text: "Vi è mai capitato di voler esagerare e sfidare le proprie capacità? Bene vi propongo un posto dove troverete quantità e qualità. Sto parlando di @hill_s_burger …",
  },
  {
    name: "Antonio M.",
    stars: 5,
    text: "Un istituzione qualità fantasia hamburger di ogni tipo sapori unici hamburgheria in stile Americano con carni e prodotti locali! Il panino della sfida incredibile… …",
  },
];

export const allergeni = [
  "Cereali contenenti glutine e prodotti derivati (grano, segale, orzo, avena, farro, kamut)",
  "Crostacei e prodotti a base di crostacei",
  "Uova e prodotti a base di uova",
  "Pesce e prodotti a base di pesce",
  "Arachidi e prodotti a base di arachidi",
  "Soia e prodotti a base di soia",
  "Latte e prodotti a base di latte",
  "Frutta a guscio e loro prodotti (mandorle, nocciole, noci, anacardi, pecan, noci del Brasile, pistacchi, macadamia)",
  "Sedano e prodotti a base di sedano",
  "Senape e prodotti a base di senape",
  "Semi di sesamo e prodotti a base di sesamo",
  "Solfiti in concentrazione superiore a 10mg/kg",
  "Lupini e prodotti a base di lupini",
  "Molluschi e prodotti a base di molluschi",
];

export const WHATSAPP = "https://wa.me/393332968401";
export const PHONE = "333 296 8401";
