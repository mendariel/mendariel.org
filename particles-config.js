tsParticles.load("tsparticles", {
  fullScreen: { enable: false },
  background: { color: "transparent" },
  particles: {
    number: { value: 35, density: { enable: true, area: 900 } },
    color: { value: "#4f8cff" },
    shape: { type: "circle" },
    opacity: { value: 0.25 },
    size: { value: { min: 1, max: 2.5 } },
    links: {
      enable: true,
      distance: 130,
      color: "#4f8cff",
      opacity: 0.12,
      width: 1
    },
    move: {
      enable: true,
      speed: 0.3,
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "out" }
    }
  },
  interactivity: {
    events: { onHover: { enable: false }, onClick: { enable: false } }
  },
  detectRetina: true
});
