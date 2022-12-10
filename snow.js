// const [WIDTH, HEIGHT] = [1920, 1080];
const [WIDTH, HEIGHT] = [1200, 675];
// const [WIDTH, HEIGHT] = [960, 540];

const FLAKES = 1_000;
const SPEED_MIN = 0.04;
const SPEED_MAX = 0.12;
const SIZE_MIN = 0.6;
const SIZE_MAX = 2.2;
const OPACITY_MIN = 125;
const OPACITY_MAX = 250;
const WIND_CHANGE_INTERVAL = 2_000;
const ACCELERATION = 0.005;
const SMALL_RATIO = 0.3;
const TRANSITION_TIME = 18_000;

// ---

// setup canvas
const canvas = document.getElementById("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;
const ctx = canvas.getContext("2d");

// setup audio
const chirstmas = document.getElementById("christmas");
const blizzard = document.getElementById("blizzard");

// kernel utils

function _move(x, y, angle, dist) {
  const newX = x + Math.cos(angle) * dist;
  const newY = y + Math.sin(angle) * dist;
  return [newX, newY];
}

function _map(value, min, max) {
  return min + (max - min) * value;
}

// main

const RAD360 = Math.PI * 2;
const DOWN = Math.PI * 0.5;

const State = {
  Stopped: "stopped",
  Stopping: "stopping",
  Starting: "starting",
  Running: "running",
};
let state = State.Stopped;
let flakes, flakeProps;

const sleep = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

const sign = () => (Math.random() < 0.5 ? 1 : -1);

const limit = (x, min, max) => Math.min(max, Math.max(min, x));

// flakes: x, y, windSum
// props: size, opacity, mass
const initFlakes = () => {
  flakes = Array(FLAKES)
    .fill(0)
    .map(() => [
      Math.random() * WIDTH, // x
      Math.random() * HEIGHT, // y
      0, // windSum
    ]);
  flakeProps = flakes.map((_, index) => {
    const size = index / FLAKES < SMALL_RATIO ? 0 : Math.random();
    return [
      size, // size
      Math.round(_map(Math.random() * size, OPACITY_MIN, OPACITY_MAX)), // opacity %
      _map(Math.random(), 0.5, 0.85), // mass
    ];
  });
};

const gpu = new GPU();

const gpuMove = gpu
  .createKernel(function (flakes, flakeProps, deltaTime, wind) {
    const { WIDTH, HEIGHT, SPEED_MIN, SPEED_MAX, ACCELERATION } =
      this.constants;
    let [x, y, windSum] = flakes[this.thread.x];
    const [size, opacity, mass] = flakeProps[this.thread.x];
    // move
    const speed = _map(size, SPEED_MIN, SPEED_MAX);
    let newY = y + speed * deltaTime;
    // wind +/-
    windSum += (wind - windSum) * ACCELERATION;
    let newX = x + (1 - mass) * windSum * deltaTime;
    // borders
    if (newX < 0) newX += WIDTH;
    if (newX > WIDTH - 1) newX -= WIDTH;
    if (newY > HEIGHT - 1) newY -= HEIGHT;
    return [newX, newY, windSum];
  })
  .addFunction(_map)
  .addFunction(_move)
  .setConstants({
    WIDTH,
    HEIGHT,
    SPEED_MIN,
    SPEED_MAX,
    ACCELERATION,
  })
  .setOutput([FLAKES]);

let windChanged;
let wind = 0;
let frame = 0;
const drawFrame = async () => {
  // elapsed time since last frame
  const now = Date.now();
  const deltaTime = now - time;
  time = now;
  frame += 1;

  // wind & target
  const canChange = time - windChanged > WIND_CHANGE_INTERVAL;
  if (canChange && Math.random() < 0.01) {
    // no subseqent opposite signs
    let newWind = Math.random() < 0.5 ? 0 : sign() * Math.random();
    if (wind * newWind < 0) newWind *= -1;
    if (wind !== newWind) {
      wind = newWind;
      windChanged = time;
    }
  }

  // move balls
  flakes = gpuMove(flakes, flakeProps, deltaTime, wind);

  // background
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  // draw flakes
  const h10 = Math.ceil(document.body.scrollHeight / HEIGHT) * HEIGHT;
  const canvasScale = HEIGHT / window.innerHeight;
  const scrollY = window.scrollY * canvasScale;
  for (i in flakes) {
    const [x, y0] = flakes[i];
    let [size, opacity, mass] = flakeProps[i];
    const r = _map(size, SIZE_MIN, SIZE_MAX);

    if (y0 < -r || y0 > HEIGHT + r) continue;
    const y = (y0 + h10 - scrollY) % HEIGHT;

    ctx.fillStyle = "#FFFFFF" + opacity.toString(16).padStart("0");
    ctx.beginPath();
    ctx.arc(x, y, r, 0, RAD360, false);
    ctx.fill();
  }

  // schedule next frame
  if (state !== State.Stopped) {
    requestAnimationFrame(drawFrame);
  }
};

const fadeAudio = (player, fromVolume, toVolume, ms) => {
  const INTERVAL = 100;
  fromVolume = fromVolume ?? player.volume;
  player.volume = fromVolume;
  player.play();
  const step = (toVolume - fromVolume) / (ms / INTERVAL);
  const timer = setInterval(() => {
    player.volume = limit(player.volume + step, 0, 1);
    const fadeOutDone = step < 0 && player.volume <= toVolume;
    const fadeInDone = step > 0 && player.volume >= toVolume;
    if (fadeInDone || fadeOutDone) {
      player.volume = toVolume;
      clearInterval(timer);
    }
  }, INTERVAL);
};

const init = () => {
  frame = 0;
  time = Date.now();
  windChanged = 0;
  initFlakes();
};

const start = (listener) => {
  init();
  state = State.Starting;
  listener(state);
  console.log("starting...");
  requestAnimationFrame(drawFrame);
  canvas.classList.add("on");
  fadeAudio(blizzard, 0, 0.4, TRANSITION_TIME * 0.6);
  setTimeout(
    () => fadeAudio(chirstmas, 0, 0.25, TRANSITION_TIME * 0.6),
    TRANSITION_TIME * 0.3
  );
  setTimeout(() => {
    state = State.Running;
    listener(state);
    console.log("running.");
  }, TRANSITION_TIME);
};

const stop = (listener) => {
  state = State.Stopping;
  listener(state);
  console.log("stopping...");
  canvas.classList.remove("on");
  fadeAudio(chirstmas, null, 0, TRANSITION_TIME * 0.6);
  fadeAudio(blizzard, null, 0, TRANSITION_TIME * 0.9);
  setTimeout(() => {
    state = State.Stopped;
    listener(state);
    console.log("stopped.");
  }, TRANSITION_TIME);
};

const toggle = (listener) => {
  if (state === State.Running) {
    stop(listener);
  } else if (state === State.Stopped) {
    start(listener);
  }
};

// document.body.onclick = () => {
//   console.log("click");
//   if (state === State.Running) {
//     stop();
//   } else if (state === State.Stopped) {
//     start();
//   }
// };

// document.body.ondblclick = () => {
//   if (document.fullscreenElement) {
//     document.exitFullscreen();
//   } else {
//     document.body.requestFullscreen();
//   }
// };
