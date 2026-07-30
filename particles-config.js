tsParticles.load({
  id: "tsparticles",
  options: {
    fullScreen: { enable: true, zIndex: 0 },
    background: { color: "transparent" },
    particles: {
      number: { value: 90, density: { enable: true, area: 900 } },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: {
        value: 0.5,
        animation: { enable: true, speed: 0.4, minimumValue: 0.1, sync: false }
      },
      size: { value: { min: 0.6, max: 2 } },
      links: { enable: false },
      move: {
        enable: true,
        speed: 0.1,
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
  }
});
