import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  signInWithPopup,
  signInAnonymously,
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
const localGuestSessionKey = "wormwood-local-guest-session";
let auth;
let database;
let currentUser = null;
let syncReady = false;
let queuedSave = false;
let saveTimer;

function getLocalGuestUser() {
  try {
    return localStorage.getItem(localGuestSessionKey) === "true"
      ? {
          uid: "local-guest",
          isAnonymous: true,
          localOnly: true,
          displayName: "Guest",
        }
      : null;
  } catch (error) {
    console.error("Could not read the local guest session:", error);
    return null;
  }
}

function saveLocalGuestSession() {
  try {
    localStorage.setItem(localGuestSessionKey, "true");
  } catch (error) {
    console.error("Could not update the local guest session:", error);
    throw new Error("Could not save your guest session in this browser.", {
      cause: error,
    });
  }
}

function clearLocalGuestSession() {
  try {
    localStorage.removeItem(localGuestSessionKey);
  } catch (error) {
    console.error("Could not clear the local guest session:", error);
  }
}

function startLocalGuestSession() {
  saveLocalGuestSession();
  const user = getLocalGuestUser();
  if (!user) throw new Error("Could not start a guest session in this browser.");
  showSignedIn(user);
  announceAuthState(user);
  return user;
}

function setStatus(message) {
  if (accountStatus) accountStatus.textContent = message;
}

function showSignedIn(user) {
  if (signInButton) signInButton.hidden = Boolean(user);
  if (signOutButton) signOutButton.hidden = !user;
  setStatus(
    user
      ? user.isAnonymous
        ? user.localOnly
          ? "Playing as a guest. Progress is saved only in this browser."
          : "Playing as a guest. Progress is saved in this browser and synced to your guest account."
        : `Signed in as ${user.displayName || user.email}.`
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
    setStatus(
      currentUser.isAnonymous
        ? "Cloud save synced to your guest account."
        : `Cloud save synced for ${currentUser.displayName || currentUser.email}.`,
    );
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

const DAILY_REWARDS = [
  { type: "coins", amount: 200, label: "200 coins" },
  { type: "potion", potion: "healing", amount: 1, label: "Healing Potion" },
  { type: "coins", amount: 300, label: "300 coins" },
  { type: "potion", potion: "strength", amount: 1, label: "Strength Potion" },
  { type: "coins", amount: 500, label: "500 coins" },
  { type: "potion", potion: "curse", amount: 1, label: "Curse Potion" },
  { type: "potion", potion: "defense", amount: 1, label: "Defense Potion" },
];
function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function getPreviousDateKey(date = new Date()) {
  const previous = new Date(date);
  previous.setDate(previous.getDate() - 1);
  return localDateKey(previous);
}
function nextDailyRewardDay(dailyReward, today) {
  if (dailyReward?.lastClaimDate === today) return dailyReward.day;
  const lastDay =
    Number.isSafeInteger(dailyReward?.day) &&
    dailyReward.day >= 1 &&
    dailyReward.day <= DAILY_REWARDS.length
      ? dailyReward.day
      : 0;
  return dailyReward?.lastClaimDate === getPreviousDateKey() && lastDay
    ? (lastDay % DAILY_REWARDS.length) + 1
    : 1;
}
function updateLocalDailyRewardSave(save) {
  try {
    localStorage.setItem("wormwood-library-player", JSON.stringify({
      coins: Number.isSafeInteger(save.coins) ? save.coins : 0,
      ownedSkins: Array.isArray(save.ownedSkins) ? save.ownedSkins : ["garden"],
      equippedSkin: typeof save.equippedSkin === "string" ? save.equippedSkin : "garden",
      potions: save.potions || {},
      upgrades: save.upgrades || { heart: 0, spellbook: 0, "iron-shell": 0 },
      redeemedCodes: Array.isArray(save.redeemedCodes) ? save.redeemedCodes : [],
    }));
    localStorage.setItem(
      "wormwood-library-daily-reward",
      JSON.stringify(save.dailyReward || null),
    );
  } catch (error) {
    console.error("Could not cache the daily reward locally:", error);
  }
}
window.WormwoodFirebaseDailyRewards = {
  rewards: DAILY_REWARDS,
  async getStatus() {
    if (!currentUser || !syncReady)
      throw new Error("Wait for your account sync to finish.");
    const snapshot = await get(ref(database, `users/${currentUser.uid}/save`));
    const save = snapshot.val() || {};
    const dailyReward = save.dailyReward || null;
    const today = localDateKey();
    return {
      dailyReward,
      today,
      nextDay: nextDailyRewardDay(dailyReward, today),
      claimedToday: dailyReward?.lastClaimDate === today,
    };
  },
  async claim() {
    if (!currentUser || !syncReady)
      throw new Error("Wait for your account sync to finish.");
    const today = localDateKey();
    let rewardDay = 1;
    const saveRef = ref(database, `users/${currentUser.uid}/save`);
    const result = await runTransaction(saveRef, (currentSave) => {
      const save = currentSave && typeof currentSave === "object"
        ? currentSave
        : {};
      if (save.dailyReward?.lastClaimDate === today) return;

      rewardDay = nextDailyRewardDay(save.dailyReward, today);
      const reward = DAILY_REWARDS[rewardDay - 1];
      const potions = Object.fromEntries(
        ["healing", "strength", "curse", "defense"].map((id) => [
          id,
          Number.isSafeInteger(save.potions?.[id])
            ? Math.max(0, save.potions[id])
            : 0,
        ]),
      );
      const coins = Number.isSafeInteger(save.coins)
        ? Math.max(0, save.coins)
        : 0;
      return {
        ...save,
        coins:
          coins + (reward.type === "coins" ? reward.amount : 0),
        potions:
          reward.type === "potion"
            ? {
                ...potions,
                [reward.potion]: potions[reward.potion] + reward.amount,
              }
            : potions,
        dailyReward: { lastClaimDate: today, day: rewardDay },
      };
    });
    const updatedSave = result.snapshot.val();
    if (!result.committed) {
      return {
        claimed: false,
        dailyReward: updatedSave?.dailyReward || null,
        reward: null,
      };
    }
    updateLocalDailyRewardSave(updatedSave);
    return {
      claimed: true,
      dailyReward: updatedSave.dailyReward,
      reward: DAILY_REWARDS[rewardDay - 1],
    };
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
function explainDatabasePermissionError(error) {
  if (
    error?.code === "PERMISSION_DENIED" ||
    /permission_denied|permission denied/i.test(error?.message || "")
  )
    return new Error(
      "Firebase rejected this online action. Publish the latest firebase-database.rules.json in Realtime Database > Rules, then try again.",
    );
  return error;
}
async function getPlayerSkinSvg() {
  const snapshot = await get(ref(database, `users/${currentUser.uid}/save`));
  const svg = snapshot.child("equippedSkinSvg").val();
  const rarity = snapshot.child("equippedSkinRarity").val();
  const accent = snapshot.child("equippedSkinAccent").val();
  return {
    rarity:
      typeof rarity === "string" &&
      ["normal", "rare", "epic", "legendary", "mythic"].includes(rarity)
        ? rarity
        : "normal",
    accent:
      typeof accent === "string" && /^#[\da-f]{3,8}$/i.test(accent)
        ? accent
        : "#8fe06c",
    svg: typeof svg === "string" && svg.length <= 100_000 ? svg : "",
  };
}
window.WormwoodFirebaseRooms = {
  get user() {
    return currentUser;
  },
  async create(displayName) {
    if (!database || !currentUser)
      throw new Error("Sign in before creating an online room.");
    const skin = await getPlayerSkinSvg();
    for (let attempt = 0; attempt < 5; attempt++) {
      const code = makeRoomCode();
      const member = {
        uid: currentUser.uid,
        name: displayName || currentUser.displayName || "Player 1",
        online: true,
      };
      if (skin.svg) {
        member.skinAccent = skin.accent;
        member.skinRarity = skin.rarity;
        member.skinSvg = skin.svg;
      }
      const room = {
        hostUid: currentUser.uid,
        guestUid: "",
        members: { [currentUser.uid]: member },
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
    const skin = await getPlayerSkinSvg();
    const members = roomSnapshot.child("members");
    if (
      members.hasChild(currentUser.uid) &&
      (roomSnapshot.child("hostUid").val() === currentUser.uid ||
        roomSnapshot.child("guestUid").val() === currentUser.uid)
    ) {
      const memberRef = ref(
        database,
        `rooms/${normalizedCode}/members/${currentUser.uid}`,
      );
      await set(memberRef, {
        ...members.child(currentUser.uid).val(),
        online: true,
        ...(skin.svg
          ? {
              skinAccent: skin.accent,
              skinRarity: skin.rarity,
              skinSvg: skin.svg,
            }
          : {}),
      });
      return {
        code: normalizedCode,
        host: roomSnapshot.child("hostUid").val() === currentUser.uid,
      };
    }
    if (roomSnapshot.child("game/status").val() !== "waiting")
      throw new Error("This match has already started or ended.");
    const uid = currentUser.uid;
    const name = (
      displayName || currentUser.displayName || "Player 2"
    ).slice(0, 24);
    const member = { uid, name, online: true };
    if (skin.svg) {
      member.skinAccent = skin.accent;
      member.skinRarity = skin.rarity;
      member.skinSvg = skin.svg;
    }
    let claim;
    try {
      claim = await runTransaction(roomRef, (room) => {
        const currentRoom = room ?? roomSnapshot.val();
        const guestMember = currentRoom?.members?.[currentRoom.guestUid];
        const guestSlotOccupied = Boolean(
          currentRoom?.guestUid &&
            guestMember &&
            guestMember.online !== false,
        );
        if (
          !currentRoom ||
          currentRoom.hostUid === uid ||
          guestSlotOccupied ||
          currentRoom.game?.status !== "waiting" ||
          !currentRoom.members?.[currentRoom.hostUid]
        )
          return;
        return {
          ...currentRoom,
          guestUid: uid,
          members: {
            [currentRoom.hostUid]: currentRoom.members[currentRoom.hostUid],
            [uid]: member,
          },
        };
      });
    } catch (error) {
      throw explainDatabasePermissionError(error);
    }
    if (!claim.committed) {
      const latest = await get(roomRef);
      if (!latest.exists()) throw new Error("Room not found. Check the code.");
      if (latest.child("game/status").val() !== "waiting")
        throw new Error("This match has already started or ended.");
      if (latest.child("hostUid").val() === uid)
        throw new Error(
          "You are signed in as the room host. Join from a different account or browser profile.",
        );
      const latestGuestUid = latest.child("guestUid").val();
      if (
        latestGuestUid &&
        latest.child(`members/${latestGuestUid}`).child("online").val() !==
          false
      )
        throw new Error(
          "Another player is still online in this room. Ask them to leave first.",
        );
      if (!latest.child(`members/${latest.child("hostUid").val()}`).exists())
        throw new Error(
          "This room is missing its host player data. Ask the host to create a new room.",
        );
      throw new Error(
        "Firebase could not save the join. The room code works, but the latest Realtime Database rules may not be published yet.",
      );
    }
    return { code: normalizedCode, host: false };
  },
  async start(code, initialGame) {
    const roomRef = roomReference(code);
    const roomSnapshot = await get(roomRef);
    const room = roomSnapshot.val();
    if (!room || room.hostUid !== currentUser.uid)
      throw new Error("Only the room creator can start the match.");
    const members = Object.values(room.members || {});
    if (
      room.guestUid === "" ||
      members.length !== 2 ||
      members.some((member) => !member.online)
    )
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
    await set(ref(database, `rooms/${code}/guestUid`), "");
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
  beginRandomMatch(displayName, handlers) {
    if (!database || !currentUser)
      throw new Error("Sign in before searching for a random match.");

    const queueRef = ref(database, "matchmaking/openRooms");
    const ownQueueRef = ref(
      database,
      `matchmaking/openRooms/${currentUser.uid}`,
    );
    let active = true;
    let matched = false;
    let joining = false;
    let ownCode = null;
    let queueUnsubscribe;
    let roomUnsubscribe;
    let timeout;

    const stopListeners = () => {
      if (queueUnsubscribe) queueUnsubscribe();
      if (roomUnsubscribe) roomUnsubscribe();
      clearTimeout(timeout);
    };
    const removeOwnQueueEntry = async () => {
      try {
        await remove(ownQueueRef);
      } catch (error) {
        console.error("Could not remove the quick-match queue entry:", error);
      }
    };
    const finish = async (result) => {
      if (!active || matched) return;
      matched = true;
      active = false;
      stopListeners();
      await removeOwnQueueEntry();
      if (!result.host && ownCode) {
        try {
          await remove(roomReference(ownCode));
        } catch (error) {
          console.error("Could not remove the unused quick-match room:", error);
        }
      }
      handlers.onMatched(result);
    };
    const fail = async (error) => {
      if (!active || matched) return;
      active = false;
      stopListeners();
      await removeOwnQueueEntry();
      if (ownCode) {
        try {
          await remove(roomReference(ownCode));
        } catch (cleanupError) {
          console.error("Could not remove the abandoned quick-match room:", cleanupError);
        }
      }
      handlers.onError(explainDatabasePermissionError(error));
    };
    const joinFromQueue = async (snapshot) => {
      if (!active || matched || joining) return;
      const now = Date.now();
      const candidates = Object.entries(snapshot.val() || {})
        .filter(
          ([uid, entry]) =>
            uid !== currentUser.uid &&
            uid < currentUser.uid &&
            entry?.hostUid === uid &&
            typeof entry.roomCode === "string" &&
            entry.createdAt <= now &&
            now - entry.createdAt < 120_000,
        )
        .sort(() => Math.random() - 0.5);

      for (const [, entry] of candidates) {
        if (!active || matched) return;
        joining = true;
        try {
          await window.WormwoodFirebaseRooms.join(entry.roomCode, displayName);
          if (!active || matched) {
            try {
              await window.WormwoodFirebaseRooms.leave(entry.roomCode);
            } catch (error) {
              console.error("Could not leave a cancelled quick-match room:", error);
            }
            return;
          }
          await finish({ code: entry.roomCode, host: false });
          return;
        } catch (error) {
          if (
            !/full|already started|not found|rejected/i.test(error.message || "")
          ) {
            await fail(error);
            return;
          }
        } finally {
          joining = false;
        }
      }
    };

    const watchOwnRoom = (code) => {
      roomUnsubscribe = onValue(
        roomReference(code),
        (snapshot) => {
          const room = snapshot.val();
          if (!room) {
            fail(new Error("Your quick-match room was closed."));
            return;
          }
          const members = Object.values(room.members || {});
          if (
            room.hostUid === currentUser.uid &&
            members.length === 2 &&
            members.every((member) => member.online)
          )
            finish({ code, host: true });
        },
        (error) => fail(error),
      );
    };

    const begin = async () => {
      const currentQueue = await get(queueRef);
      await joinFromQueue(currentQueue);
      if (!active || matched) return;

      ownCode = await window.WormwoodFirebaseRooms.create(displayName);
      const entry = {
        hostUid: currentUser.uid,
        roomCode: ownCode,
        createdAt: Date.now(),
      };
      await onDisconnect(ownQueueRef).remove();
      await set(ownQueueRef, entry);
      watchOwnRoom(ownCode);
      queueUnsubscribe = onValue(
        queueRef,
        (snapshot) => joinFromQueue(snapshot),
        (error) => fail(error),
      );
      handlers.onWaiting(ownCode);
      timeout = setTimeout(
        () => fail(new Error("No random opponent found. Try again later.")),
        120_000,
      );
    };

    begin().catch(fail);
    return {
      async cancel() {
        if (!active || matched) return;
        active = false;
        stopListeners();
        await removeOwnQueueEntry();
        if (ownCode) {
          try {
            await remove(roomReference(ownCode));
          } catch (error) {
            console.error("Could not remove the cancelled quick-match room:", error);
            throw error;
          }
        }
      },
    };
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
  async signInAsGuest() {
    if (!auth) return startLocalGuestSession();
    await setPersistence(auth, browserLocalPersistence);
    try {
      const result = await signInAnonymously(auth);
      clearLocalGuestSession();
      return result.user;
    } catch (error) {
      if (
        error.code === "auth/operation-not-allowed" ||
        error.code === "auth/admin-restricted-operation"
      ) {
        console.warn(
          "Firebase anonymous sign-in is unavailable; using a local guest save.",
          error,
        );
        return startLocalGuestSession();
      }
      throw error;
    }
  },
  async signOut() {
    clearLocalGuestSession();
    if (auth) await signOut(auth);
  },
};

if (!configured) {
  if (signInButton) signInButton.disabled = true;
  const message =
    "Firebase is not configured. Sign-in is currently unavailable.";
  setStatus(message);
  if (landingAuthStatus) landingAuthStatus.textContent = message;
  const localGuest = getLocalGuestUser();
  resolveAuthReady(localGuest);
  announceAuthState(localGuest);
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
    if (user) clearLocalGuestSession();
    if (!user) {
      const localGuest = getLocalGuestUser();
      if (localGuest) {
        showSignedIn(localGuest);
        resolveAuthReady(localGuest);
        announceAuthState(localGuest);
        return;
      }
    }
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
        if (
          window.WormwoodGame &&
          (!snapshot.child("equippedSkinSvg").exists() ||
            !snapshot.child("equippedSkinRarity").exists() ||
            !snapshot.child("equippedSkinAccent").exists())
        )
          queuedSave = true;
      } else if (window.WormwoodGame) {
        queuedSave = true;
      }
      syncReady = true;
      if (queuedSave) {
        queuedSave = false;
        await writeSave(window.WormwoodGame.getSaveData());
      } else {
        setStatus(
          user.isAnonymous
            ? "Guest cloud save loaded."
            : `Cloud save loaded for ${user.displayName || user.email}.`,
        );
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
