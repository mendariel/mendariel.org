tsParticles.load({
  id: "tsparticles",
  options: {
    fullScreen: { enable: false },
    background: { color: "transparent" },
    particles: {
      number: { value: 90, density: { enable: true, area: 900 } },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: {
        value: 0.9,
        animation: { enable: true, speed: 0.4, minimumValue: 0.3, sync: false }
      },
      size: { value: { min: 1.5, max: 3.5 } },
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
  }
});
