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
    const menu = document.querySelector("[data-cy=Header_Menu_RightSide");
    const button = document.createElement("button");
    button.id = "snow-button";
    button.innerHTML = `
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" viewBox="-6 -6 459.421 459.421">
      <path d="M453.421,275.252c0,57.266-46.141,103.882-103.186,104.8c-0.662-7.759-2.917-15.376-6.713-22.32h5.011
        c45.473,0,82.475-36.994,82.475-82.479c0-45.473-37.002-82.47-82.475-82.47c-5.104,0-10.386,0.514-15.703,1.529l-13.438,2.577
        l0.131-13.688c0-0.523,0.033-1.032,0.07-1.546c0.016-66.821-54.288-121.117-121.038-121.117
        c-66.736,0-121.039,54.296-121.039,121.044c0,1.871,0.134,3.704,0.262,5.54l0.605,9.688l-7.091,3.173
        c-29.7,13.267-48.891,42.821-48.891,75.27c0,40.51,29.371,74.211,67.919,81.111c-1.844,2.928-2.931,6.31-2.931,9.855v12.355
        C37.878,370.203,0,327.121,0,275.252c0-38.653,21.394-74.071,55.126-92.271c-0.012-0.471-0.016-0.936-0.016-1.407
        c0-79.103,64.348-143.457,143.45-143.457c75.425,0,137.427,58.487,143.048,132.491c2.326-0.156,4.639-0.241,6.926-0.241
        C406.373,170.368,453.421,217.419,453.421,275.252z M177.99,355.934l-23.614,3.128l15.163-19.94
        c0.674-0.887,0.931-2.023,0.707-3.107c-0.225-1.082-0.906-2.024-1.867-2.571l-12.875-7.301c-0.946-0.535-2.08-0.656-3.117-0.306
        c-1.037,0.351-1.87,1.116-2.312,2.111l-9.805,22.534l-9.964-22.337c-0.443-1.001-1.283-1.762-2.32-2.09
        c-1.032-0.34-2.157-0.219-3.103,0.317l-13.084,7.496c-0.965,0.559-1.642,1.499-1.859,2.583c-0.219,1.083,0.043,2.222,0.722,3.108
        l14.864,19.294l-22.692-2.933c-1.104-0.121-2.203,0.204-3.032,0.941c-0.829,0.722-1.305,1.774-1.305,2.878v14.594
        c0,1.1,0.476,2.162,1.305,2.883c0.824,0.723,1.921,1.059,3.032,0.932l22.856-2.922l-15.007,19.283
        c-0.667,0.854-0.941,1.958-0.75,3.021c0.184,1.071,0.818,2.014,1.737,2.593l12.226,7.727c0.623,0.384,1.334,0.585,2.057,0.585
        c0.364,0,0.733-0.054,1.091-0.146c1.059-0.327,1.935-1.078,2.399-2.091l10.54-22.884l9.682,22.589
        c0.432,1.006,1.272,1.778,2.316,2.125c1.042,0.35,2.177,0.238,3.126-0.309l13.524-7.741c0.978-0.555,1.655-1.518,1.867-2.623
        c0.213-1.1-0.071-2.237-0.771-3.119l-15.115-18.888l23.456,2.801c1.1,0.137,2.188-0.219,3.01-0.941
        c0.824-0.739,1.295-1.784,1.295-2.877v-14.59c0-1.104-0.481-2.167-1.312-2.896C180.198,356.117,179.078,355.778,177.99,355.934z
        M267.022,331.296l18.047,2.151c1.293,0.158,2.615-0.257,3.601-1.125c0.984-0.883,1.549-2.131,1.549-3.444v-13.001
        c0-1.325-0.574-2.595-1.568-3.464c-0.998-0.874-2.32-1.275-3.646-1.101l-18.223,2.419l11.788-15.519
        c0.799-1.06,1.112-2.418,0.842-3.71c-0.271-1.303-1.083-2.43-2.243-3.081l-11.47-6.506c-1.136-0.635-2.495-0.788-3.731-0.36
        c-1.237,0.416-2.242,1.335-2.77,2.527l-7.671,17.631l-7.793-17.454c-0.522-1.189-1.531-2.101-2.779-2.497
        c-1.236-0.416-2.589-0.272-3.721,0.372l-11.653,6.677c-1.156,0.667-1.969,1.783-2.227,3.097c-0.257,1.312,0.058,2.661,0.864,3.716
        l11.505,14.938l-17.401-2.249c-1.316-0.152-2.631,0.236-3.625,1.111c-0.995,0.87-1.562,2.134-1.562,3.453v13.001
        c0,1.319,0.572,2.583,1.562,3.453c0.994,0.869,2.292,1.265,3.625,1.111l17.527-2.244l-11.613,14.927
        c-0.803,1.03-1.128,2.343-0.903,3.623c0.224,1.28,0.979,2.402,2.078,3.104l10.895,6.878c0.742,0.471,1.602,0.711,2.461,0.711
        c0.439,0,0.877-0.065,1.308-0.179c1.274-0.383,2.32-1.288,2.872-2.497l8.287-17.981l7.573,17.681c0.523,1.21,1.526,2.14,2.778,2.55
        c1.236,0.416,2.604,0.29,3.744-0.367l12.042-6.889c1.171-0.667,1.988-1.811,2.237-3.141c0.252-1.325-0.093-2.682-0.93-3.731
        L267.022,331.296z M339.297,367.532c-0.536-1.215-1.564-2.145-2.835-2.531c-1.27-0.401-2.637-0.228-3.775,0.458l-9.274,5.674
        l2.703-11.38c0.3-1.288,0.038-2.65-0.737-3.734c-0.766-1.083-1.97-1.778-3.285-1.915l-9.773-0.975
        c-1.308-0.119-2.593,0.297-3.555,1.184c-0.965,0.869-1.518,2.122-1.512,3.425l0.076,11.649l-8.589-7.765
        c-0.965-0.864-2.245-1.285-3.548-1.159c-1.297,0.126-2.484,0.804-3.25,1.849l-5.93,8.061c-0.79,1.078-1.074,2.436-0.79,3.738
        c0.295,1.29,1.127,2.406,2.298,3.041l9.852,5.347l-9.808,2.906c-1.268,0.379-2.32,1.285-2.867,2.484
        c-0.557,1.205-0.569,2.593-0.038,3.797l3.917,8.854c0.542,1.215,1.56,2.134,2.824,2.534c1.266,0.383,2.634,0.229,3.77-0.454
        l8.823-5.33l-2.727,10.894c-0.312,1.265-0.083,2.595,0.64,3.679c0.723,1.078,1.867,1.802,3.157,1.985l9.483,1.412
        c0.231,0.033,0.456,0.044,0.681,0.044c1.087,0,2.148-0.378,2.979-1.089c1.013-0.864,1.605-2.111,1.625-3.437l0.182-12.099
        l8.549,7.957c0.962,0.896,2.264,1.34,3.567,1.214c1.307-0.12,2.493-0.799,3.272-1.849l6.132-8.324
        c0.799-1.078,1.078-2.456,0.779-3.77c-0.303-1.302-1.167-2.418-2.358-3.043l-9.791-5.089l10.188-3.13
        c1.261-0.388,2.293-1.297,2.835-2.494c0.547-1.193,0.555-2.572,0.021-3.771L339.297,367.532z"/>
    </svg>  
  `;
    button.onclick = () =>
      toggle((state) => {
        button.className = state;
        const isTransitioning = state === "starting" || state === "stopping";
        button.disabled = isTransitioning ? "disabled" : "";
      });
    menu.appendChild(button);
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
        transition: opacity 10s ease-in-out;
      }
      #canvas.on { opacity: 1; }
      #snow-button {
        display: flex;
        align-items: center;
        background: none;
        border: none;
        margin: 0 0 0 0.7rem;
        padding: 0;
        cursor: pointer;
        color: var(--menuForeground, '#fff');
        transition: color 1s ease-in-out;
      }
      #snow-button:disabled { cursor: not-allowed; }
      #snow-button:hover:not(:disabled) { opacity: 0.7; }
      #snow-button.starting { color: yellow; }
      #snow-button.running { color: lime; }
      #snow-button.stopping { color: yellow; }
      #snow-button svg {
        fill: currentColor;
        stroke: currentColor;
        stroke-width: 6px;      
        height: 1.4rem;
        margin-top: 0.2rem;
      }
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
  Close the devtools, then click the snow cloud button in the menu.
  
  Happy Holidays! 🎄
  `
);
