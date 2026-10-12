document.getElementById("year").textContent = new Date().getFullYear();

// Hover drives the resume menu via CSS; this covers touch and keyboard.
const resumeMenu = document.getElementById("resumeMenu");
const resumeTrigger = document.getElementById("resumeTrigger");

const setResumeOpen = (open) => {
  resumeMenu.classList.toggle("open", open);
  resumeTrigger.setAttribute("aria-expanded", open);
};

resumeTrigger.addEventListener("click", (event) => {
  event.stopPropagation();
  setResumeOpen(!resumeMenu.classList.contains("open"));
});

document.addEventListener("click", (event) => {
  if (!resumeMenu.contains(event.target)) setResumeOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && resumeMenu.classList.contains("open")) {
    setResumeOpen(false);
    resumeTrigger.focus();
  }
});

resumeMenu.addEventListener("focusout", (event) => {
  if (!resumeMenu.contains(event.relatedTarget)) setResumeOpen(false);
});
