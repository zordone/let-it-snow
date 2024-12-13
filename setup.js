"use strict";

if (window.snowScriptLoaded) {
  throw new Error("Already loaded.");
}
window.snowScriptLoaded = true;

{
  const baseUrl = "https://zordone.github.io/let-it-snow/";

  const script = (name) =>
    new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `${baseUrl}${name}`;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });

  const audio = (name) => {
    const audio = document.createElement("audio");
    audio.id = name;
    audio.crossorigin = "anonymous";
    audio.loop = true;
    audio.src = `${baseUrl}${name}.m4a`;
    document.body.appendChild(audio);
  };

  const canvas = () => {
    const canvas = document.createElement("canvas");
    canvas.id = "canvas";
    canvas.width = 10;
    canvas.height = 10;
    document.body.appendChild(canvas);
  };

  const menu = () => {
    const more = document.querySelector("[data-cy=Header_SettingsLink_SettingsLinkContainer]");
    const snow = document.createElement("span");
    snow.style.display = "flex";
    snow.innerHTML = more.innerHTML;
    const snowButton = snow.querySelector("button");
    const snowButtonClassName = snowButton.className;
    snowButton.id = "snow-button";
    snowButton.onclick = () =>
      toggle((state) => {
        snowButton.className = `${snowButtonClassName} ${state}`;
        const isTransitioning = state === "starting" || state === "stopping";
        snowButton.disabled = isTransitioning ? "disabled" : "";
      });
    snow.querySelector("svg").parentElement.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m3 7l3.5 2M21 17l-3.5-2M12 12L6.5 9m5.5 3l-5.5 3m5.5-3V5m0 7v6.5m0-6.5l5.5 3M12 12l5.5-3M12 2v3m0 17v-3.5M21 7l-3.5 2M3 17l3.5-2m0-6L3 10m3.5-1L6 5.5m.5 9.5L3 14m3.5 1L6 18.5M12 5L9.5 4M12 5l2.5-1M12 18.5l2.5 1.5M12 18.5L9.5 20m8-5l.5 3.5m-.5-3.5l3.5-1m-3.5-5l3.5 1m-3.5-1l.5-3.5"/>
      </svg>
    `;
    more.parentElement.appendChild(snow);
  };

  const css = () => {
    const style = document.createElement("style");
    style.innerText = `
      #canvas {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 18s ease-in-out;
      }
      #canvas.on { opacity: 1; }
      #snow-button { cursor: pointer; }
      #snow-button:disabled { cursor: not-allowed; }
      #snow-button:hover:disabled svg { opacity: 1; }
      #snow-button.starting { color: yellow; }
      #snow-button.running { color: lime; }
      #snow-button.stopping { color: yellow; }
    `;
    document.head.appendChild(style);
  };

  script("gpu-browser.min.js").then(() => {
    css();
    audio("christmas");
    audio("blizzard");
    canvas();
    script("snow.js");
    menu();
  });
}

console.log(
  `
  Make sure you have your headphones on.
  Close the devtools, then click the snowflake ❄️ button in the menu.
  
  Happy Holidays! 🎄
  `
);
