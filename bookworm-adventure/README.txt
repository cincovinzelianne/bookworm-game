Wormwood Library - landing page and word-battle game
Stack: HTML, CSS, JavaScript + Tailwind CSS (CDN). No build step.

Run: open index.html in a browser to see the landing page.
Select "Enter the library" to choose Adventure, Shop, or Arena / Multiplayer.
Adventure opens the story campaign. Shop opens the marketplace. Online Arena / Multiplayer is shown as coming soon because this static project has no multiplayer server yet.
The game needs internet for Tailwind, fonts and the word list.
Use the game menu to return home or toggle the original synthesized battle music.
Open the game menu's Worm skin marketplace to buy and equip skins with coins earned from battles.
The marketplace has 33 skins: 12 Normal, 8 Rare, 6 Epic, and 7 Legendary.
Every skin has its own face design; Epic and Legendary skins also carry animated, skin-matched premium gear.
GSAP is loaded from jsDelivr for the animated landing-page mascot, animated skins, and Legendary attack effects; CSS/browser-animation fallbacks are used when it is unavailable.
Or serve locally:  python3 -m http.server 8000   then visit http://localhost:8000
