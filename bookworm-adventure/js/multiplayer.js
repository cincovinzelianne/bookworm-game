const $ = (id) => document.getElementById(id);
const LETTER_BAG =
  "EEEEEEEEEEEEAAAAAAAAAIIIIIIIIOOOOOOOONNNNNNRRRRRRTTTTTTLLLLSSSSUUUUDDDDGGGBBCCMMPPFFHHVVWWYYKJXZ";
const VOWELS = "AEIOU";
const LETTER_POINTS = {
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
const TILES_PER_BOARD = 16;
const selectedTiles = new Set();
const knownWords = new Set(
  (window.dictionary || [])
    .filter((word) => typeof word === "string")
    .map((word) => word.trim().toLowerCase()),
);
let user;
let roomCode;
let roomData;
let unsubscribeRoom;
let submitting = false;
let renderedMoveNumber;
let quickMatchSession;
let quickMatchActive = false;
let quickMatchStarting = false;
const skinImageSourceCache = new Map();

function setStatus(message, error = false) {
  $("mpStatus").textContent = message;
  $("mpStatus").classList.toggle("is-error", error);
}

function randomTile() {
  const letter = LETTER_BAG[Math.floor(Math.random() * LETTER_BAG.length)];
  return { letter, gem: Math.random() < 0.1 };
}

function newBoard() {
  const board = Array.from({ length: TILES_PER_BOARD }, randomTile);
  let vowels = board.filter((tile) => VOWELS.includes(tile.letter)).length;
  while (vowels < 5) {
    const index = board.findIndex((tile) => !VOWELS.includes(tile.letter));
    board[index] = {
      letter: VOWELS[Math.floor(Math.random() * VOWELS.length)],
      gem: false,
    };
    vowels++;
  }
  return board;
}

function getWord() {
  if (!roomData?.game?.board) return "";
  return [...selectedTiles]
    .sort((a, b) => a - b)
    .map((index) => roomData.game.board[index].letter)
    .join("")
    .toLowerCase();
}

function wordIsValid(word) {
  const has = (candidate) => knownWords.has(candidate);
  if (knownWords.has(word)) return true;
  const length = word.length;
  if (length <= 3) return false;
  if (/s$/.test(word) && has(word.slice(0, -1))) return true;
  if (/es$/.test(word) && has(word.slice(0, -2))) return true;
  if (/ies$/.test(word) && has(`${word.slice(0, -3)}y`)) return true;
  if (
    /ed$/.test(word) &&
    (has(word.slice(0, -2)) ||
      has(word.slice(0, -1)) ||
      (word[length - 3] === word[length - 4] && has(word.slice(0, -3))))
  )
    return true;
  if (
    /ing$/.test(word) &&
    (has(word.slice(0, -3)) ||
      has(`${word.slice(0, -3)}e`) ||
      (word[length - 4] === word[length - 5] && has(word.slice(0, -4))))
  )
    return true;
  if (/er$/.test(word) && (has(word.slice(0, -2)) || has(word.slice(0, -1))))
    return true;
  if (/ly$/.test(word) && has(word.slice(0, -2))) return true;
  return false;
}

function playerIds() {
  return Object.keys(roomData?.members || {});
}

function opponentId() {
  return playerIds().find((id) => id !== user.uid);
}

function setSkinPortrait(image, member) {
  image.removeAttribute("src");
  image.alt = member?.skinSvg
    ? `${member.name || "Player"} equipped skin`
    : `${member?.name || "Player"} skin preview unavailable`;
  if (typeof member?.skinSvg !== "string" || member.skinSvg.length > 100_000)
    return;
  const cachedSource = skinImageSourceCache.get(member.skinSvg);
  if (cachedSource) {
    image.src = cachedSource;
    return;
  }

  const parsed = new DOMParser().parseFromString(
    member.skinSvg,
    "image/svg+xml",
  );
  const svg = parsed.documentElement;
  if (
    svg.localName !== "svg" ||
    svg.namespaceURI !== "http://www.w3.org/2000/svg" ||
    parsed.querySelector("parsererror")
  )
    return;
  parsed
    .querySelectorAll("script, style, foreignObject, iframe, object, embed")
    .forEach((element) => element.remove());
  [svg, ...svg.querySelectorAll("*")].forEach((element) => {
    [...element.attributes].forEach((attribute) => {
      const name = attribute.name.toLowerCase();
      const value = attribute.value.trim();
      if (
        name.startsWith("on") ||
        ((name === "href" || name.endsWith(":href") || name === "src") &&
          !value.startsWith("#")) ||
        (name === "style" &&
          /url\s*\(|expression\s*\(|javascript:/i.test(value))
      )
        element.removeAttribute(attribute.name);
    });
  });
  const source = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    new XMLSerializer().serializeToString(svg),
  )}`;
  if (skinImageSourceCache.size >= 4)
    skinImageSourceCache.delete(skinImageSourceCache.keys().next().value);
  skinImageSourceCache.set(member.skinSvg, source);
  image.src = source;
}

function renderRoom() {
  if (!roomData) {
    $("roomSetup").hidden = false;
    $("roomPanel").hidden = true;
    $("matchPanel").hidden = true;
    return;
  }

  $("roomSetup").hidden = true;
  $("roomPanel").hidden = false;
  $("roomCode").textContent = roomCode;
  const members = Object.values(roomData.members || {});
  const allOnline = members.length === 2 && members.every((member) => member.online);
  $("memberList").replaceChildren(
    ...members.map((member) => {
      const item = document.createElement("li");
      item.className = "mp-member";
      const name = document.createElement("strong");
      name.textContent =
        member.uid === user.uid ? `${member.name} (you)` : member.name;
      const status = document.createElement("span");
      status.textContent = member.online ? "Online" : "Reconnecting";
      status.className = member.online ? "is-online" : "is-offline";
      item.append(name, status);
      return item;
    }),
  );
  const waiting = roomData.game?.status === "waiting";
  $("startMatch").hidden = !waiting || roomData.hostUid !== user.uid;
  $("startMatch").disabled = !allOnline;
  $("roomMessage").textContent = waiting
    ? allOnline
      ? quickMatchActive
        ? "Opponent found. Starting your match…"
        : "Both players are here. The room creator can start the match."
      : quickMatchActive
        ? "Searching for a random opponent…"
        : "Share the code with one friend. Waiting for them to join…"
    : roomData.game?.status === "playing" && members.length < 2
      ? "Your opponent left the room. This match cannot continue."
      : "";
  $("matchPanel").hidden = !["playing", "finished"].includes(
    roomData.game?.status,
  );
  if (!$("matchPanel").hidden) renderMatch();
  if (
    quickMatchActive &&
    waiting &&
    allOnline &&
    roomData.hostUid === user.uid &&
    !quickMatchStarting
  )
    startMatch();
}

function renderMatch() {
  const game = roomData.game;
  if (renderedMoveNumber !== (game.moveNumber ?? 0)) {
    selectedTiles.clear();
    renderedMoveNumber = game.moveNumber ?? 0;
  }
  const otherId = opponentId();
  const me = roomData.members[user.uid];
  const opponent = roomData.members[otherId];
  const mine = game.health?.[user.uid] ?? 100;
  const theirs = game.health?.[otherId] ?? 100;
  $("youName").textContent = me?.name || "You";
  $("opponentName").textContent = opponent?.name || "Friend";
  setSkinPortrait($("youSkin"), me);
  setSkinPortrait($("opponentSkin"), opponent);
  $("youHealth").textContent = mine;
  $("opponentHealth").textContent = theirs;
  $("youHealthBar").style.width = `${Math.max(0, mine)}%`;
  $("opponentHealthBar").style.width = `${Math.max(0, theirs)}%`;
  $("turnMessage").textContent =
    game.status === "finished"
      ? game.winnerUid === user.uid
        ? "You won the match!"
        : "Your friend won this match."
      : playerIds().length < 2
        ? "Your opponent left the room."
      : game.turnUid === user.uid
        ? "Your turn — spell a word and attack!"
        : `${opponent?.name || "Your friend"} is choosing a word…`;
  $("lastMove").textContent = game.lastMove
    ? `${roomData.members[game.lastMove.uid]?.name || "Player"} used "${game.lastMove.word.toUpperCase()}" and dealt ${game.lastMove.damage} damage.`
    : "The first valid word starts the duel.";
  if (!Array.isArray(game.board)) return;
  $("mpBoard").replaceChildren(
    ...game.board.map((tile, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "mp-tile";
      button.textContent = tile.letter;
      button.setAttribute("aria-label", `Letter ${tile.letter}`);
      button.classList.toggle("is-gem", Boolean(tile.gem));
      button.classList.toggle("is-selected", selectedTiles.has(index));
      button.disabled =
        game.status !== "playing" ||
        playerIds().length !== 2 ||
        game.turnUid !== user.uid ||
        submitting;
      button.addEventListener("click", () => {
        if (selectedTiles.has(index)) selectedTiles.delete(index);
        else selectedTiles.add(index);
        renderMatch();
      });
      return button;
    }),
  );
  const word = getWord();
  const alreadyUsed = game.usedWords?.[user.uid]?.includes(word);
  $("wordPreview").textContent = alreadyUsed
    ? `${word} · already used`
    : word || "Spell a word…";
  $("submitWord").disabled =
    game.status !== "playing" ||
    playerIds().length !== 2 ||
    game.turnUid !== user.uid ||
    !wordIsValid(word) ||
    alreadyUsed ||
    submitting;
  $("clearWord").disabled = selectedTiles.size === 0 || submitting;
}

function subscribeToRoom(code) {
  if (unsubscribeRoom) unsubscribeRoom();
  roomCode = code;
  selectedTiles.clear();
  $("roomCodeInput").value = "";
  $("leaveRoom").textContent = quickMatchActive ? "Cancel search" : "Leave room";
  setStatus(`Connected to room ${code}.`);
  window.WormwoodFirebaseRooms.watchConnection(code).catch((error) => {
    console.error("Could not register room connection status:", error);
  });
  unsubscribeRoom = window.WormwoodFirebaseRooms.listen(
    code,
    (room) => {
      if (!room) {
        roomData = null;
        roomCode = null;
        renderRoom();
        setStatus("This room has been closed.", true);
        return;
      }
      roomData = room;
      renderRoom();
    },
    (error) => {
      console.error("Could not listen to the online room:", error);
      setStatus("Could not connect to this room. Check Firebase database rules.", true);
    },
  );
}

function startQuickMatch() {
  if (quickMatchSession) return;
  quickMatchActive = true;
  document.body.classList.add("is-quick-match");
  $("quickMatch").disabled = true;
  setStatus("Looking for an online player…");
  try {
    quickMatchSession = window.WormwoodFirebaseRooms.beginRandomMatch(
      getDisplayName(),
      {
        onWaiting(code) {
          subscribeToRoom(code);
          setStatus("Searching for a random opponent. Hang tight…");
        },
        onMatched(result) {
          quickMatchSession = null;
          if (result.code !== roomCode) subscribeToRoom(result.code);
          $("leaveRoom").textContent = "Leave match";
          setStatus("Opponent found! Getting the match ready…");
          if (!result.host) $("roomMessage").textContent = "Opponent found!";
        },
        onError(error) {
          quickMatchSession = null;
          quickMatchActive = false;
          quickMatchStarting = false;
          document.body.classList.remove("is-quick-match");
          roomCode = null;
          roomData = null;
          renderRoom();
          $("quickMatch").disabled = false;
          setStatus(error.message || "Quick Match failed. Try again.", true);
        },
      },
    );
  } catch (error) {
    console.error("Could not begin Quick Match:", error);
    quickMatchSession = null;
    quickMatchActive = false;
    document.body.classList.remove("is-quick-match");
    $("quickMatch").disabled = false;
    setStatus(error.message, true);
  }
}

function getDisplayName() {
  return (
    $("playerName").value.trim() ||
    user.displayName ||
    user.email?.split("@")[0] ||
    "Player"
  ).slice(0, 24);
}

async function createRoom() {
  $("createRoom").disabled = true;
  try {
    const code = await window.WormwoodFirebaseRooms.create(getDisplayName());
    subscribeToRoom(code);
  } catch (error) {
    console.error("Could not create an online room:", error);
    setStatus(error.message, true);
  } finally {
    $("createRoom").disabled = false;
  }
}

async function joinRoom(event) {
  event.preventDefault();
  const code = $("roomCodeInput").value.trim().toUpperCase();
  if (!/^[A-HJ-NP-Z2-9]{6}$/.test(code)) {
    setStatus("Enter a valid six-character room code.", true);
    return;
  }
  const button = $("joinForm").querySelector("button");
  button.disabled = true;
  try {
    await window.WormwoodFirebaseRooms.join(code, getDisplayName());
    subscribeToRoom(code);
  } catch (error) {
    console.error("Could not join the online room:", error);
    setStatus(error.message, true);
  } finally {
    button.disabled = false;
  }
}

async function startMatch() {
  if (quickMatchStarting) return;
  const ids = playerIds();
  if (ids.length !== 2) return;
  quickMatchStarting = true;
  $("startMatch").disabled = true;
  try {
    await window.WormwoodFirebaseRooms.start(roomCode, {
      status: "playing",
      turnUid: roomData.hostUid,
      health: { [ids[0]]: 100, [ids[1]]: 100 },
      board: newBoard(),
      usedWords: { [ids[0]]: [], [ids[1]]: [] },
      moveNumber: 0,
      winnerUid: null,
      lastMove: null,
    });
  } catch (error) {
    console.error("Could not start the online match:", error);
    setStatus(error.message, true);
  } finally {
    quickMatchStarting = false;
    $("startMatch").disabled = false;
  }
}

async function submitWord() {
  const word = getWord();
  if (
    !wordIsValid(word) ||
    roomData.game.usedWords?.[user.uid]?.includes(word) ||
    submitting
  )
    return;
  const indexes = [...selectedTiles];
  const game = roomData.game;
  const baseDamage = indexes.reduce(
    (total, index) => total + (LETTER_POINTS[game.board[index].letter] || 1),
    0,
  );
  const hasGem = indexes.some((index) => game.board[index].gem);
  const damage = Math.round(
    baseDamage * (1 + (word.length - 3) * 0.4) * (hasGem ? 2 : 1),
  );
  const targetId = opponentId();
  submitting = true;
  renderMatch();
  try {
    await window.WormwoodFirebaseRooms.updateGame(roomCode, (current) => {
      if (
        !current ||
        current.status !== "playing" ||
        current.turnUid !== user.uid ||
        current.usedWords?.[user.uid]?.includes(word)
      )
        return;
      const health = { ...current.health };
      health[targetId] = Math.max(0, health[targetId] - damage);
      const finished = health[targetId] === 0;
      return {
        ...current,
        status: finished ? "finished" : "playing",
        turnUid: finished ? null : targetId,
        health,
        board: finished ? current.board : newBoard(),
        usedWords: {
          ...current.usedWords,
          [user.uid]: [...(current.usedWords?.[user.uid] || []), word],
        },
        moveNumber: (current.moveNumber || 0) + 1,
        winnerUid: finished ? user.uid : null,
        lastMove: { uid: user.uid, word, damage, at: Date.now() },
      };
    });
    selectedTiles.clear();
  } catch (error) {
    console.error("Could not submit the online attack:", error);
    setStatus(error.message, true);
  } finally {
    submitting = false;
    if (roomData) renderMatch();
  }
}

async function leaveRoom() {
  if (!roomCode) return true;
  $("leaveRoom").disabled = true;
  try {
    if (quickMatchSession) {
      await quickMatchSession.cancel();
      quickMatchSession = null;
    } else {
      await window.WormwoodFirebaseRooms.leave(roomCode);
    }
    if (unsubscribeRoom) unsubscribeRoom();
    unsubscribeRoom = null;
    roomCode = null;
    roomData = null;
    quickMatchActive = false;
    quickMatchStarting = false;
    document.body.classList.remove("is-quick-match");
    $("quickMatch").disabled = false;
    selectedTiles.clear();
    renderedMoveNumber = undefined;
    renderRoom();
    setStatus("You left the room.");
    return true;
  } catch (error) {
    console.error("Could not leave the online room:", error);
    setStatus(error.message, true);
    return false;
  } finally {
    $("leaveRoom").disabled = false;
  }
}

async function initialize() {
  user = await window.WormwoodFirebaseAuthReady;
  if (!user) {
    location.replace("index.html?signin=required");
    return;
  }
  if (user.localOnly) {
    location.replace("index.html?online=required");
    return;
  }
  if (!window.WormwoodFirebaseRooms) {
    setStatus("Online rooms did not initialize. Reload and try again.", true);
    return;
  }
  $("roomSetup").hidden = false;
  $("playerName").value = user.displayName || (user.isAnonymous ? "Guest" : "");
  setStatus(
    user.isAnonymous
      ? "Playing as a guest."
      : `Signed in as ${user.displayName || user.email}.`,
  );
  $("quickMatch").disabled = true;
  $("createRoom").disabled = true;
  $("joinForm").querySelector("button").disabled = true;
  try {
    const response = await fetch(
      "https://cdn.jsdelivr.net/npm/an-array-of-english-words@2.0.0/index.json",
    );
    if (!response.ok)
      throw new Error(`Word list request failed with status ${response.status}`);
    const words = await response.json();
    if (!Array.isArray(words))
      throw new TypeError("Word list response is not an array.");
    words.forEach((word) => {
      if (typeof word === "string") knownWords.add(word.toLowerCase());
    });
    $("quickMatch").disabled = false;
    $("createRoom").disabled = false;
    $("joinForm").querySelector("button").disabled = false;
  } catch (error) {
    console.error("Could not load the online word list:", error);
    setStatus("The word list could not load. Check your connection and reload.", true);
    $("quickMatch").disabled = true;
  }
}

window.addEventListener("wormwood-auth-state", (event) => {
  if (user && !event.detail.user) location.replace("index.html?signin=required");
});
$("quickMatch").addEventListener("click", startQuickMatch);
$("createRoom").addEventListener("click", createRoom);
$("joinForm").addEventListener("submit", joinRoom);
$("startMatch").addEventListener("click", startMatch);
$("leaveRoom").addEventListener("click", leaveRoom);
$("submitWord").addEventListener("click", submitWord);
$("clearWord").addEventListener("click", () => {
  selectedTiles.clear();
  renderMatch();
});
$("copyCode").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(roomCode);
    setStatus(`Room code ${roomCode} copied.`);
  } catch (error) {
    console.error("Could not copy the room code:", error);
    setStatus("Could not copy the code. Select and copy it manually.", true);
  }
});
$("roomCodeInput").addEventListener("input", (event) => {
  event.target.value = event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
});

initialize().catch((error) => {
  console.error("Could not initialize Online Arena:", error);
  setStatus("Online Arena could not start. Reload and try again.", true);
});
