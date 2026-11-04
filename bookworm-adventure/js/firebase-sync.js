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
  onDisconnect,
  onValue,
  ref,
  remove,
  runTransaction,
  set,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyC4QvBkAcaRIFM8OAJMN0dcTRvKWptuuuI",
  authDomain: "goyworm.firebaseapp.com",
  databaseURL: "https://goyworm-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "goyworm",
  appId: "1:560910148964:web:598325ddcfc9cd8bec0671",
};
const configured = Object.values(firebaseConfig).every(
  (value) => !value.startsWith("YOUR_"),
);
const signInButton = document.getElementById("bGoogleSignIn");
const signOutButton = document.getElementById("bGoogleSignOut");
const accountStatus = document.getElementById("accountStatus");
const landingAuthStatus = document.getElementById("landing-auth-status");
let auth;
let database;
let currentUser = null;
let syncReady = false;
let queuedSave = false;
let saveTimer;

function setStatus(message) {
  if (accountStatus) accountStatus.textContent = message;
}

function showSignedIn(user) {
  if (signInButton) signInButton.hidden = Boolean(user);
  if (signOutButton) signOutButton.hidden = !user;
  setStatus(
    user
      ? `Signed in as ${user.displayName || user.email}.`
      : "Progress is saved in this browser.",
  );
}

function announceAuthState(user) {
  const detail = { user };
  window.dispatchEvent(new CustomEvent("wormwood-auth-state", { detail }));
  window.dispatchEvent(new CustomEvent("wormwood-auth-ready", { detail }));
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

let resolveAuthReady;
const authReady = new Promise((resolve) => {
  resolveAuthReady = resolve;
});
const roomCodeAlphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function makeRoomCode() {
  const randomValues = crypto.getRandomValues(new Uint32Array(6));
  return Array.from(
    randomValues,
    (value) => roomCodeAlphabet[value % roomCodeAlphabet.length],
  ).join("");
}
function roomReference(code) {
  if (!/^[A-HJ-NP-Z2-9]{6}$/.test(code))
    throw new Error("Room codes must be 6 letters or numbers.");
  if (!database || !currentUser)
    throw new Error("Sign in before using online rooms.");
  return ref(database, `rooms/${code}`);
}
window.WormwoodFirebaseRooms = {
  get user() {
    return currentUser;
  },
  async create(displayName) {
    if (!database || !currentUser)
      throw new Error("Sign in before creating an online room.");
    for (let attempt = 0; attempt < 5; attempt++) {
      const code = makeRoomCode();
      const room = {
        hostUid: currentUser.uid,
        members: {
          [currentUser.uid]: {
            uid: currentUser.uid,
            name: displayName || currentUser.displayName || "Player 1",
            online: true,
          },
        },
        game: { status: "waiting" },
      };
      const result = await runTransaction(roomReference(code), (existing) =>
        existing === null ? room : undefined,
      );
      if (result.committed) return code;
    }
    throw new Error("Could not find an available room code. Try again.");
  },
  async join(code, displayName) {
    const normalizedCode = code.trim().toUpperCase();
    const roomRef = roomReference(normalizedCode);
    const roomSnapshot = await get(roomRef);
    if (!roomSnapshot.exists()) throw new Error("Room not found. Check the code.");
    const members = roomSnapshot.child("members");
    const memberRef = ref(
      database,
      `rooms/${normalizedCode}/members/${currentUser.uid}`,
    );
    if (members.hasChild(currentUser.uid)) {
      await set(memberRef, {
        ...members.child(currentUser.uid).val(),
        online: true,
      });
      return { code: normalizedCode, host: false };
    }
    if (roomSnapshot.child("game/status").val() !== "waiting")
      throw new Error("This match has already started or ended.");
    if (members.numChildren() >= 2)
      throw new Error("This room already has two players.");
    const result = await runTransaction(memberRef, (existing) =>
      existing === null
        ? {
            uid: currentUser.uid,
            name: displayName || currentUser.displayName || "Player 2",
            online: true,
          }
        : undefined,
    );
    if (!result.committed)
      throw new Error("This room is full or your join request was rejected.");
    return { code: normalizedCode, host: false };
  },
  async start(code, initialGame) {
    const roomRef = roomReference(code);
    const roomSnapshot = await get(roomRef);
    const room = roomSnapshot.val();
    if (!room || room.hostUid !== currentUser.uid)
      throw new Error("Only the room creator can start the match.");
    const members = Object.values(room.members || {});
    if (members.length !== 2 || members.some((member) => !member.online))
      throw new Error("Wait for your friend to connect before starting.");
    const gameRef = ref(database, `rooms/${code}/game`);
    const result = await runTransaction(gameRef, (game) =>
      game?.status === "waiting" ? initialGame : undefined,
    );
    if (!result.committed)
      throw new Error("This match has already started.");
  },
  async updateGame(code, update) {
    const gameRef = ref(database, `rooms/${code}/game`);
    const result = await runTransaction(gameRef, update);
    if (!result.committed)
      throw new Error("The match changed. Please wait for the latest turn.");
    return result.snapshot.val();
  },
  listen(code, onRoom, onError) {
    return onValue(
      roomReference(code),
      (snapshot) => onRoom(snapshot.val()),
      (error) => onError(error),
    );
  },
  async leave(code) {
    const roomRef = roomReference(code);
    const roomSnapshot = await get(roomRef);
    const room = roomSnapshot.val();
    if (!room) return;
    if (room.hostUid === currentUser.uid) {
      await remove(roomRef);
      return;
    }
    await remove(ref(database, `rooms/${code}/members/${currentUser.uid}`));
  },
  async watchConnection(code) {
    const memberRef = ref(
      database,
      `rooms/${code}/members/${currentUser.uid}/online`,
    );
    await set(memberRef, true);
    return onDisconnect(memberRef).set(false);
  },
  serverTime() {
    return Date.now();
  },
};
window.WormwoodFirebaseAuth = {
  ready: authReady,
  get user() {
    return currentUser;
  },
  async signIn() {
    if (!auth) throw new Error("Firebase is not configured yet.");
    await setPersistence(auth, browserLocalPersistence);
    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    return result.user;
  },
  async signOut() {
    if (auth) await signOut(auth);
  },
};

if (!configured) {
  if (signInButton) signInButton.disabled = true;
  const message =
    "Firebase is not configured. Sign-in is currently unavailable.";
  setStatus(message);
  if (landingAuthStatus) landingAuthStatus.textContent = message;
  resolveAuthReady(null);
  announceAuthState(null);
} else {
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  database = getDatabase(app);

  if (signInButton) {
    signInButton.addEventListener("click", async () => {
      signInButton.disabled = true;
      try {
        await window.WormwoodFirebaseAuth.signIn();
      } catch (error) {
        console.error("Google sign-in failed:", error);
        setStatus(`Google sign-in failed: ${error.message}`);
      } finally {
        signInButton.disabled = false;
      }
    });
  }

  if (signOutButton) {
    signOutButton.addEventListener("click", async () => {
      try {
        await window.WormwoodFirebaseAuth.signOut();
      } catch (error) {
        console.error("Could not sign out:", error);
        setStatus(`Could not sign out: ${error.message}`);
      }
    });
  }

  onAuthStateChanged(auth, async (user) => {
    currentUser = user;
    syncReady = false;
    queuedSave = false;
    showSignedIn(user);
    if (!user) {
      if (document.body.classList.contains("auth-ready")) {
        location.replace("index.html?signin=required");
      }
      resolveAuthReady(null);
      announceAuthState(null);
      return;
    }

    try {
      await setPersistence(auth, browserLocalPersistence);
      const snapshot = await get(ref(database, `users/${user.uid}/save`));
      if (snapshot.exists()) {
        window.WormwoodGame?.applySaveData(snapshot.val());
      } else if (window.WormwoodGame) {
        queuedSave = true;
      }
      syncReady = true;
      if (queuedSave) {
        queuedSave = false;
        await writeSave(window.WormwoodGame.getSaveData());
      } else {
        setStatus(`Cloud save loaded for ${user.displayName || user.email}.`);
      }
      resolveAuthReady(user);
      announceAuthState(user);
    } catch (error) {
      console.error("Could not load cloud save from Firebase:", error);
      setStatus("Could not load cloud save. Local save is unchanged; reload to retry.");
      resolveAuthReady(user);
      announceAuthState(user);
    }
  });
}
