(() => {
  "use strict";

  const FlipElements = document.querySelectorAll("[data-flip]");
  const playVideo = document.getElementById("playVideo");
  const portrait = document.getElementById("portrait");
  const ragVid = document.getElementById("ragVid");
  const btnPlay = document.getElementById("ragVBtnPlay");
  const btnPause = document.getElementById("ragVBtnPause");
  const btnRefresh = document.getElementById("ragVBtnRefresh");
  const btnMute = document.getElementById("ragVBtnMute");
  const timeline = document.getElementById("ragVTimeline");
  const progressBar = document.getElementById("ragVProgressBar");
  const volumeBar = document.getElementById("ragVVolumeBar");
  const volumePointer = document.getElementById("ragVVolumePointer");

  bind();

  function bind() {
    ragVid.addEventListener(
      "canplay",
      (e) => {
        playVideo.addEventListener("click", fisrtPlay, false);
        btnPlay.addEventListener("click", play, false);
        btnPause.addEventListener("click", pause, false);
        btnRefresh.addEventListener("click", refresh, false);
        btnMute.addEventListener("click", mute, false);
        flipHandler();
        timelineHandler();
        volumeHandler();
      },
      false
    );
  }

  function fisrtPlay() {
    console.log('fisrtPlay');

    volume(0.3);
    portrait.classList.add("active");
    FlipElements[0].classList.toggle("flip");
    ragVid.play();
  }

  function play() {
    return ragVid.play();
  }

  function pause() {
    ragVid.pause();
  }

  function refresh() {
    FlipElements[0].classList.toggle("flip");
    ragVid.currentTime = 0;
    ragVid.play();
  }

  function mute() {
    if (this.dataset.mute) {
      this.dataset.mute = "";
      return (ragVid.muted = false);
    }

    this.dataset.mute = "on";
    return (ragVid.muted = true);
  }

  function flipHandler() {
    FlipElements.forEach(flipEvents);
  }

  function flipEvents(obj) {
    return obj.addEventListener("click", toglleFlip);
  }

  function toglleFlip() {
    return this.classList.toggle("flip");
  }

  function timelineHandler() {
    timeline.value = 0;
    timeline.addEventListener("change", timelineChange, false);
    ragVid.addEventListener("timeupdate", updateTimeline, false);
  }

  function timelineChange(event) {
    ragVid.currentTime = (ragVid.duration / 100) * event.target.value;
  }

  function updateTimeline(event) {
    event.stopPropagation();
    progressBar.value = (ragVid.currentTime * 100) / ragVid.duration;
  }

  function volumeHandler() {
    volumeBar.addEventListener("input", onUpdateVolumePointer, false);
    ragVid.addEventListener("volumechange", onVolumeChange, false);
  }
  function onUpdateVolumePointer(event) {
    volume(this.value / 100);
  }

  function volume(vol) {
    ragVid.volume = vol;
  }

  function onVolumeChange(event) {
    const percentage = ragVid.volume * 100;

    if (percentage <= 15) {
      volumePointer.style.borderColor = "#1186b2";
    }

    if (percentage > 30) {
      volumePointer.style.borderColor = "#576fe6";
    }

    if (percentage > 45) {
      volumePointer.style.borderColor = "#9844b7";
    }

    if (percentage > 60) {
      volumePointer.style.borderColor = "#ff357f";
    }

    if (percentage > 75) {
      volumePointer.style.borderColor = "#ff0b3f";
    }

    volumeBar.value = Math.round(percentage);
    volumePointer.innerHTML = Math.round(percentage);
    volumePointer.style.transform = `translateX(${
      (volumeBar.clientWidth / 110) * percentage
    }px)`;
  }

  return;
})();
