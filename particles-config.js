tsParticles.load("tsparticles", {
  fullScreen: { enable: false },
  background: { color: "transparent" },
  particles: {
    number: { value: 90, density: { enable: true, area: 900 } },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: {
      value: 0.5,
      animation: { enable: true, speed: 0.4, minimumValue: 0.05, sync: false }
    },
    size: { value: { min: 0.5, max: 1.8 } },
    links: { enable: false },
    move: {
      enable: true,
      speed: 0.08,
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
