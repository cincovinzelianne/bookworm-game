const modePicker = document.getElementById("mode-picker");
const openModePicker = document.getElementById("open-mode-picker");
const closeModePicker = document.getElementById("close-mode-picker");
const ctaLabel = document.getElementById("library-cta-label");
const authStatus = document.getElementById("landing-auth-status");
const signInRequired =
  new URLSearchParams(location.search).get("signin") === "required";
let signedInUser = null;

function updateAuthUI(user) {
  signedInUser = user;
  ctaLabel.textContent = user ? "Enter the library" : "Sign in with Google";
  authStatus.textContent = user
    ? `Signed in as ${user.displayName || user.email}.`
    : signInRequired
      ? "Please sign in with Google before opening Adventure."
      : "Sign in with Google before entering the library.";
}

function closeModes() {
  modePicker.hidden = true;
  openModePicker.focus();
}

openModePicker.addEventListener("click", async () => {
  const firebaseAuth = window.WormwoodFirebaseAuth;
  if (!firebaseAuth) {
    authStatus.textContent = "Sign-in is still loading. Please try again.";
    return;
  }
  if (!signedInUser) signedInUser = firebaseAuth.user;
  if (!signedInUser) {
    openModePicker.disabled = true;
    authStatus.textContent = "Opening Google sign-in…";
    try {
      signedInUser = await firebaseAuth.signIn();
      updateAuthUI(signedInUser);
    } catch (error) {
      console.error("Google sign-in failed:", error);
      authStatus.textContent = `Sign-in failed: ${error.message}`;
      openModePicker.disabled = false;
      return;
    }
    openModePicker.disabled = false;
  }
  modePicker.hidden = false;
  closeModePicker.focus();
});

window.addEventListener("wormwood-auth-state", (event) => {
  updateAuthUI(event.detail.user);
});
window.WormwoodFirebaseAuthReady.then(updateAuthUI);

closeModePicker.addEventListener("click", closeModes);
modePicker.addEventListener("click", (event) => {
  if (event.target === modePicker) closeModes();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modePicker.hidden) closeModes();
});

const heroVisual = document.querySelector(".hero-visual");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function animateWilbur() {
  const gsap = window.gsap;
  if (!heroVisual || !gsap || reduceMotion.matches) return;

  heroVisual.classList.add("motion-ready");

  const head = heroVisual.querySelector(".worm-head");
  const tail = heroVisual.querySelector(".worm-tail");
  const segments = heroVisual.querySelectorAll(".worm-segment");
  const antennae = heroVisual.querySelector(".worm-antennae");
  const antennaTips = heroVisual.querySelectorAll(".antenna-tip");
  const book = heroVisual.querySelector(".worm-book-float");
  const shadow = heroVisual.querySelector(".worm-shadow");
  const eyelids = heroVisual.querySelectorAll(".worm-eyelid");
  const lashes = heroVisual.querySelectorAll(".worm-lash");
  const pupils = [...heroVisual.querySelectorAll(".worm-eye")].map((eye) =>
    eye.querySelector("circle:nth-of-type(2)"),
  );

  gsap.set(eyelids, { scaleY: 0, transformOrigin: "50% 0%" });
  gsap.set(lashes, { opacity: 0 });

  gsap.to(head, {
    y: -3,
    rotation: 1.4,
    duration: 2.1,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    transformOrigin: "54% 92%",
  });
  gsap.to(tail, {
    y: -2,
    rotation: -1.1,
    duration: 1.7,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    transformOrigin: "75% 82%",
  });
  gsap.to(segments, {
    y: -3,
    duration: 1.05,
    ease: "sine.inOut",
    stagger: 0.18,
    repeat: -1,
    yoyo: true,
  });
  gsap.to(antennae, {
    rotation: 4,
    duration: 1.15,
    ease: "sine.inOut",
    transformOrigin: "50% 100%",
    repeat: -1,
    yoyo: true,
  });
  gsap.to(antennaTips, {
    scale: 1.16,
    duration: 0.72,
    ease: "sine.inOut",
    stagger: 0.18,
    repeat: -1,
    yoyo: true,
    transformOrigin: "50% 50%",
  });
  gsap.to(book, {
    y: -3,
    rotation: 1.8,
    duration: 1.6,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    transformOrigin: "52% 72%",
  });
  gsap.to(shadow, {
    scaleX: 0.92,
    opacity: 0.34,
    duration: 2.1,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    transformOrigin: "50% 50%",
  });
  gsap.to(pupils, {
    x: 1.3,
    y: -0.8,
    duration: 2.4,
    ease: "sine.inOut",
    stagger: 0.06,
    repeat: -1,
    yoyo: true,
  });
  gsap.to(heroVisual.querySelectorAll(".orbit-one, .orbit-three"), {
    rotation: "+=360",
    duration: 48,
    ease: "none",
    repeat: -1,
  });
  gsap.to(heroVisual.querySelector(".orbit-two"), {
    rotation: "-=360",
    duration: 64,
    ease: "none",
    repeat: -1,
  });
  gsap.to(heroVisual.querySelectorAll(".spark"), {
    opacity: 0.42,
    scale: 0.78,
    duration: 1.35,
    stagger: 0.28,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });
  gsap.fromTo(
    heroVisual,
    { opacity: 0, scale: 0.94, y: 16 },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1.05,
      ease: "power3.out",
      clearProps: "opacity,scale,y",
    },
  );
  gsap.fromTo(
    document.querySelectorAll(".hero-copy > *"),
    { opacity: 0, y: 15 },
    {
      opacity: 1,
      y: 0,
      duration: 0.65,
      stagger: 0.11,
      delay: 0.08,
      ease: "power2.out",
      clearProps: "opacity,y",
    },
  );
  gsap.fromTo(
    heroVisual.querySelectorAll(".hero-art-badge, .scene-chip"),
    { opacity: 0, y: 11 },
    {
      opacity: 1,
      y: 0,
      duration: 0.55,
      stagger: 0.12,
      delay: 0.5,
      ease: "power2.out",
      clearProps: "opacity,y",
    },
  );

  let blinkTimer;
  const blink = () => {
    if (document.hidden || reduceMotion.matches) {
      blinkTimer = window.setTimeout(blink, 1200);
      return;
    }

    const blinkMotion = gsap.timeline({
      onComplete: () => {
        blinkTimer = window.setTimeout(blink, 4300 + Math.random() * 2500);
      },
    });
    blinkMotion
      .to(eyelids, {
        scaleY: 0.94,
        duration: 0.15,
        stagger: 0.035,
        ease: "sine.inOut",
      })
      .to(lashes, { opacity: 0.7, duration: 0.1, stagger: 0.035 }, "<")
      .to({}, { duration: 0.035 })
      .to(eyelids, {
        scaleY: 0,
        duration: 0.24,
        stagger: 0.035,
        ease: "sine.out",
      })
      .to(lashes, { opacity: 0, duration: 0.2, stagger: 0.035 }, "<");
  };

  blinkTimer = window.setTimeout(blink, 1700 + Math.random() * 900);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      window.clearTimeout(blinkTimer);
    } else {
      blinkTimer = window.setTimeout(blink, 600 + Math.random() * 900);
    }
  });
}

animateWilbur();
