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
Player coins, owned skins, and game progress are saved in localStorage. Optional cross-browser cloud sync uses Firebase Authentication (Google sign-in) and Realtime Database.

Firebase cloud-save setup:
1. Create a Firebase project and register a Web app in the Firebase console.
2. Enable Google under Authentication > Sign-in method, and add your deployed site domain under Authentication > Settings > Authorized domains.
3. Create a Realtime Database. Replace the placeholder values in js/firebase-sync.js with the Web app config from Project settings. Use the database URL shown in the Realtime Database console.
4. Paste firebase-database.rules.json into Realtime Database > Rules and publish.
5. Serve the site over HTTP/HTTPS (not file://) and sign in with Google from the game menu. Returning users can access their cloud save in another browser or an incognito session by signing into the same Google account.

The Firebase web config identifies the project and is not a service-account secret. Realtime Database rules restrict each save to its authenticated owner's UID. Since game saves are written by the browser, this setup is for convenience and is not cheat-proof.
Or serve locally:  python3 -m http.server 8000   then visit http://localhost:8000
