const modePicker = document.getElementById("mode-picker");
const openModePicker = document.getElementById("open-mode-picker");
const closeModePicker = document.getElementById("close-mode-picker");

function closeModes() {
  modePicker.hidden = true;
  openModePicker.focus();
}

openModePicker.addEventListener("click", () => {
  modePicker.hidden = false;
  closeModePicker.focus();
});

closeModePicker.addEventListener("click", closeModes);
modePicker.addEventListener("click", (event) => {
  if (event.target === modePicker) closeModes();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modePicker.hidden) closeModes();
});
