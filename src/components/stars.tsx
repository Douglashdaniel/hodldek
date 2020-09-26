import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
// import Particles from 'react-tsparticles';

const Stars = () => {
  return (
    <StyledMain>
      {/* <ParticlesBox // move to index.js
        params={{
          particles: {
            number: { value: 40, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: {
              type: "circle",
              stroke: { width: 0, color: "#000000" },
              polygon: { nb_sides: 5 },
            },
            opacity: {
              value: 1,
              random: true,
              anim: { enable: true, speed: 6, opacity_min: 0, sync: false },
            },
            size: {
              value: 3,
              random: true,
              anim: { enable: false, speed: 4, size_min: 0.3, sync: false },
            },
            line_linked: {
              enable: false,
              distance: 150,
              color: "#ffffff",
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0,
              direction: "none",
              random: true,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: { enable: false, rotateX: 600, rotateY: 600 },
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: { enable: true, mode: "bubble" },
              onclick: { enable: true, mode: "repulse" },
              resize: true,
            },
            modes: {
              grab: { distance: 400, line_linked: { opacity: 1 } },
              bubble: {
                distance: 250,
                size: 0,
                duration: 2,
                opacity: 0,
                speed: 3,
              },
              repulse: { distance: 400, duration: 0.4 },
              push: { particles_nb: 4 },
              remove: { particles_nb: 2 },
            },
          },
          retina_detect: true,
        }}
      /> */}
    </StyledMain>
  );
};

export default Stars;

const StyledMain = styled.div``;

// const ParticlesBox = styled(Particles)`
//   position: fixed;
//   width: 100%;
//   height: 100vh;
//   // background-color: #000000;
//   // background-color: #212529;
//   // background: linear-gradient(to bottom, #000000, #00060d);
//   z-index: -10;
// `;
