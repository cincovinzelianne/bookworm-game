import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  signInWithPopup,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import {
  get,
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_DATABASE_NAME.REGION.firebasedatabase.app",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_FIREBASE_APP_ID",
};
const configured = Object.values(firebaseConfig).every(
  (value) => !value.startsWith("YOUR_"),
);
const signInButton = document.getElementById("bGoogleSignIn");
const signOutButton = document.getElementById("bGoogleSignOut");
const accountStatus = document.getElementById("accountStatus");
let auth;
let database;
let currentUser = null;
let syncReady = false;
let queuedSave = false;
let saveTimer;

function setStatus(message) {
  accountStatus.textContent = message;
}

function showSignedIn(user) {
  signInButton.hidden = Boolean(user);
  signOutButton.hidden = !user;
  setStatus(
    user
      ? `Signed in as ${user.displayName || user.email}.`
      : "Progress is saved in this browser.",
  );
}

async function writeSave(data) {
  if (!currentUser || !syncReady) {
    queuedSave = true;
    return;
  }
  try {
    await set(ref(database, `users/${currentUser.uid}/save`), data);
    setStatus(`Cloud save synced for ${currentUser.displayName || currentUser.email}.`);
  } catch (error) {
    console.error("Could not sync save to Firebase:", error);
    setStatus("Cloud sync failed. Your local save is still available.");
  }
}

window.WormwoodFirebase = {
  save(data) {
    if (!currentUser) return;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => writeSave(data), 400);
  },
};

if (!configured) {
  signInButton.disabled = true;
  setStatus("Add your Firebase web config to js/firebase-sync.js to enable cloud sync.");
} else {
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  database = getDatabase(app);

  signInButton.addEventListener("click", async () => {
    signInButton.disabled = true;
    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error) {
      console.error("Google sign-in failed:", error);
      setStatus(`Google sign-in failed: ${error.message}`);
    } finally {
      signInButton.disabled = false;
    }
  });

  signOutButton.addEventListener("click", async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Could not sign out:", error);
      setStatus(`Could not sign out: ${error.message}`);
    }
  });

  onAuthStateChanged(auth, async (user) => {
    currentUser = user;
    syncReady = false;
    queuedSave = false;
    showSignedIn(user);
    if (!user) return;

    try {
      await setPersistence(auth, browserLocalPersistence);
      const snapshot = await get(ref(database, `users/${user.uid}/save`));
      if (snapshot.exists()) {
        window.WormwoodGame.applySaveData(snapshot.val());
      } else {
        queuedSave = true;
      }
      syncReady = true;
      if (queuedSave) {
        queuedSave = false;
        await writeSave(window.WormwoodGame.getSaveData());
      } else {
        setStatus(`Cloud save loaded for ${user.displayName || user.email}.`);
      }
    } catch (error) {
      console.error("Could not load cloud save from Firebase:", error);
      setStatus("Could not load cloud save. Local save is unchanged; reload to retry.");
    }
  });
}
