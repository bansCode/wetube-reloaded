const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;
let videoPlayStatus = false;
let setVideoPlayStatus = false;

const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const handleMuteClick = (event) => {
  // video should be muted at range 0 and when 'unmute' it should be back to 0.5
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtnIcon.classList = video.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";

  // Below code is same as: volumeRange.value = video.muted ? 0 : volumeValue === "0" ? 0.5 : volumeValue;
  if (video.muted) {
    volumeRange.value = 0;
  } else if (volumeValue === "0") {
    volumeRange.value = 0.5;
    video.volume = 0.5;
  } else {
    volumeRange.value = volumeValue;
  }
};

const handleVolumeInput = (event) => {
  const {
    target: { value },
  } = event;

  if (video.muted) {
    video.muted = false;
    muteBtnIcon.classList = "fas fa-volume-up";
  }
  volumeValue = value;
  video.volume = value;

  if (Number(volumeValue) === 0) {
    muteBtnIcon.classList = "fas fa-volume-mute";
    video.muted = true;
  }
};

const formatTime = (seconds) => {
  const startIdx = seconds >= 3600 ? 11 : 14;
  return new Date(seconds * 1000).toISOString().substring(startIdx, 19);
};

const handleLoadedMetaData = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

const handleTimeLineChange = (event) => {
  const {
    target: { value },
  } = event;

  if (!setVideoPlayStatus) {
    videoPlayStatus = video.paused ? false : true;
    setVideoPlayStatus = true;
  }
  video.pause();
  video.currentTime = value;
};

const handleTimelineSet = () => {
  videoPlayStatus ? video.play() : video.pause();
  setVideoPlayStatus = false;
};

const handleVideoEnded = () => {
  video.currentTime = 0;
  playBtnIcon.classList = "fas fa-play";
};

const handleVideoSkip = (event) => {
  if (event.code === "ArrowRight") {
    video.currentTime += 5;
  }
  if (event.code === "ArrowLeft") {
    video.currentTime -= 5;
  }
};

const handleVideoPlaySpace = (event) => {
  event.preventDefault();
  if (event.code === "Space") {
    handlePlayClick();
  }
};

const handleFullScreen = (event) => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullScreenIcon.classList = "fas fa-expand";
  } else {
    videoContainer.requestFullscreen();
    fullScreenIcon.classList = "fas fa-compress";
  }
};

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("showing");
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 3000);
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeInput);
video.addEventListener("loadeddata", handleLoadedMetaData);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);
video.addEventListener("ended", handleVideoEnded);
video.addEventListener("click", handlePlayClick);
timeline.addEventListener("input", handleTimeLineChange);
timeline.addEventListener("change", handleTimelineSet);
document.addEventListener("keydown", handleVideoSkip);
document.addEventListener("keyup", handleVideoPlaySpace);
fullScreenBtn.addEventListener("click", handleFullScreen);
