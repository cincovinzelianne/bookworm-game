Goyworm Adventures - landing page and word-battle game
Stack: HTML, CSS, JavaScript + Tailwind CSS (CDN). No build step.

Run: open index.html in a browser to see the landing page.
Sign in with Google from the landing page before choosing Adventure or Shop. The game also checks authentication on direct URLs.
Adventure opens the story campaign. Shop opens the marketplace. Online Arena lets signed-in players create a private room and invite a friend with a six-character code for alternating-turn word battles.
The game needs internet for Tailwind, fonts and the word list.
Before an adventure, choose Shop to buy supplies. Closing the shop starts the fight.
During a fight, the header only provides the potion backpack and Quit; the marketplace and other menu controls are unavailable.
Use the backpack on your turn to consume owned healing, strength, curse, or defense potions; each potion uses your turn and gives the enemy a chance to attack. Defense Potions reduce the next three enemy attacks by 50%. The marketplace includes Skins and permanent Items that improve health, attack damage, and defense.
Each enemy gets one random potion per fight and uses it instead of attacking; its potion effects follow the same turn rules.
Purchases, potion inventory, and progress are included in local and Firebase saves.
Adventure has endless chapters with 20 illustrated battle scenes that change every 10 chapters. Enemy health and attack scale as chapters advance.
The marketplace has 33 skins: 12 Normal, 8 Rare, 6 Epic, and 7 Legendary.
Every skin has its own face design; Epic and Legendary skins also carry animated, skin-matched premium gear.
GSAP is loaded from jsDelivr for the animated landing-page mascot, animated skins, and Legendary attack effects; CSS/browser-animation fallbacks are used when it is unavailable.
Player coins, owned skins, and game progress are saved in localStorage. Optional cross-browser cloud sync uses Firebase Authentication (Google sign-in) and Realtime Database.

Firebase cloud-save setup:
1. Create a Firebase project and register a Web app in the Firebase console.
2. Enable Google under Authentication > Sign-in method, and add your deployed site domain under Authentication > Settings > Authorized domains.
3. Create a Realtime Database. Replace the placeholder values in js/firebase-sync.js with the Web app config from Project settings. Use the database URL shown in the Realtime Database console.
4. Paste the latest firebase-database.rules.json into Realtime Database > Rules and publish it. The rules must include the rooms section for Online Arena.
5. Serve the site over HTTP/HTTPS (not file://), then sign in with Google from the landing page before entering Adventure or Online Arena. Returning users can access their cloud save in another browser or an incognito session by signing into the same Google account.

The Firebase web config identifies the project and is not a service-account secret. Realtime Database rules restrict each save to its authenticated owner's UID and room writes to signed-in room members. Online match logic runs in the clients, so matches are not cheat-proof; trusted competitive play would require server-authoritative game logic.
Or serve locally:  python3 -m http.server 8000   then visit http://localhost:8000
