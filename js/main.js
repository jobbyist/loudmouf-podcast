/**
 * THE BIG MOOD SERIES — main.js
 * No build step, no dependencies. Reads window.BIG_MOOD_EPISODES and
 * window.BIG_MOOD_HOSTS (see /data) and renders the page.
 */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- nav ---------------- */
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var open = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------- hero waveform bars ---------------- */
  var waveform = document.getElementById("heroWaveform");
  if (waveform) {
    var barCount = window.innerWidth < 600 ? 24 : 48;
    for (var i = 0; i < barCount; i++) {
      var bar = document.createElement("span");
      var duration = (1.6 + Math.random() * 1.6).toFixed(2);
      var delay = (Math.random() * -2).toFixed(2);
      bar.style.animationDuration = duration + "s";
      bar.style.animationDelay = delay + "s";
      waveform.appendChild(bar);
    }
  }

  /* ---------------- marquee (duplicated for seamless loop) ---------------- */
  var marqueeTrack = document.getElementById("marqueeTrack");
  if (marqueeTrack) {
    marqueeTrack.innerHTML = marqueeTrack.innerHTML + marqueeTrack.innerHTML;
  }

  /* ---------------- helpers ---------------- */
  function el(tag, className, html) {
    var e = document.createElement(tag);
    if (className) e.className = className;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  function formatTime(seconds) {
    if (!isFinite(seconds) || seconds < 0) return "--:--";
    var m = Math.floor(seconds / 60);
    var s = Math.floor(seconds % 60);
    return m + ":" + (s < 10 ? "0" : "") + s;
  }

  var playIcon = '<svg class="icon-play" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg><svg class="icon-pause" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>';

  /* ---------------- episodes ---------------- */
  var episodeList = document.getElementById("episodeList");
  var episodes = window.BIG_MOOD_EPISODES || [];
  var currentlyPlaying = null; // {audioEl, cardEl, playerEl}

  function pauseCurrent() {
    if (currentlyPlaying) {
      currentlyPlaying.audioEl.pause();
      currentlyPlaying.cardEl.classList.remove("is-playing");
      currentlyPlaying.playerEl.classList.remove("is-playing");
      currentlyPlaying = null;
    }
  }

  function buildEpisodeCard(ep) {
    var card = el("article", "episode-card reveal");
    card.id = ep.id;

    var number;
    if (ep.cover) {
      number = el("div", "episode-number episode-number--cover");
      var coverImg = el("img");
      coverImg.src = ep.cover;
      coverImg.alt = "";
      coverImg.loading = "lazy";
      number.appendChild(coverImg);
      var coverBadge = el("span", "episode-number-badge", ep.number);
      number.appendChild(coverBadge);
    } else {
      number = el("div", "episode-number", ep.number);
    }
    number.setAttribute("aria-hidden", "true");

    var body = el("div", "episode-body");

    var title = el("h3", "episode-title",
      ep.title + '<span class="episode-subtitle">' + ep.subtitle + "</span>"
    );

    var synopsis = el("p", "episode-synopsis", ep.synopsis || "");

    var meta = el("div", "episode-meta");
    var durationSpan = el("span", "meta-duration", ep.duration && ep.duration !== "00:00" ? ep.duration : "duration tba");
    meta.appendChild(durationSpan);
    if (ep.date) {
      meta.appendChild(el("span", "meta-date", ep.date));
    }
    if (ep.guest) {
      meta.appendChild(el("span", "meta-guest", ep.guest));
    }
    if (ep.explicit) {
      meta.appendChild(el("span", "badge-explicit", "E"));
    }

    body.appendChild(title);
    body.appendChild(synopsis);
    body.appendChild(meta);

    if (ep.audio) {
      body.appendChild(buildPlayer(ep, card));
    } else {
      body.appendChild(el("p", "audio-empty-note", "Audio coming soon — check back shortly."));
    }

    card.appendChild(number);
    card.appendChild(body);
    return card;
  }

  function buildPlayer(ep, card) {
    var player = el("div", "audio-player");
    player.setAttribute("data-audio", ep.audio);

    var audio = new Audio();
    audio.preload = "none";
    audio.src = ep.audio;

    var playBtn = el("button", "play-btn", playIcon);
    playBtn.type = "button";
    playBtn.setAttribute("aria-label", "Play episode " + ep.number + ": " + ep.title);

    var progressTrack = el("div", "progress-track");
    progressTrack.setAttribute("role", "slider");
    progressTrack.setAttribute("aria-label", "Seek");
    progressTrack.setAttribute("tabindex", "0");
    progressTrack.setAttribute("aria-valuemin", "0");
    progressTrack.setAttribute("aria-valuemax", "100");
    progressTrack.setAttribute("aria-valuenow", "0");
    var progressFill = el("div", "progress-fill");
    progressTrack.appendChild(progressFill);

    var timeCurrent = el("span", "time-current", "0:00");
    var timeSep = el("span", "time-sep", "/");
    var timeDuration = el("span", "time-duration", "--:--");

    var eq = el("div", "eq", "<span></span><span></span><span></span><span></span>");

    player.appendChild(playBtn);
    player.appendChild(progressTrack);
    player.appendChild(timeCurrent);
    player.appendChild(timeSep);
    player.appendChild(timeDuration);
    player.appendChild(eq);

    function setProgress() {
      var pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
      progressFill.style.width = pct + "%";
      progressTrack.setAttribute("aria-valuenow", Math.round(pct));
      timeCurrent.textContent = formatTime(audio.currentTime);
    }

    function seekFromClientX(clientX) {
      var rect = progressTrack.getBoundingClientRect();
      var ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      if (audio.duration) audio.currentTime = ratio * audio.duration;
      setProgress();
    }

    progressTrack.addEventListener("click", function (e) {
      seekFromClientX(e.clientX);
    });
    progressTrack.addEventListener("keydown", function (e) {
      if (!audio.duration) return;
      if (e.key === "ArrowRight") { audio.currentTime = Math.min(audio.duration, audio.currentTime + 5); setProgress(); }
      if (e.key === "ArrowLeft") { audio.currentTime = Math.max(0, audio.currentTime - 5); setProgress(); }
    });

    audio.addEventListener("loadedmetadata", function () {
      timeDuration.textContent = formatTime(audio.duration);
    });
    audio.addEventListener("timeupdate", setProgress);
    audio.addEventListener("ended", function () {
      player.classList.remove("is-playing");
      card.classList.remove("is-playing");
      currentlyPlaying = null;
      progressFill.style.width = "0%";
      timeCurrent.textContent = "0:00";
    });
    audio.addEventListener("error", function () {
      playBtn.setAttribute("aria-label", "Audio unavailable");
      playBtn.disabled = true;
      player.classList.add("has-error");
    });

    playBtn.addEventListener("click", function () {
      if (audio.paused) {
        if (currentlyPlaying && currentlyPlaying.audioEl !== audio) pauseCurrent();
        audio.play().catch(function () { /* file not uploaded yet, or blocked */ });
        player.classList.add("is-playing");
        card.classList.add("is-playing");
        currentlyPlaying = { audioEl: audio, cardEl: card, playerEl: player };
      } else {
        audio.pause();
        player.classList.remove("is-playing");
        card.classList.remove("is-playing");
        currentlyPlaying = null;
      }
    });

    return player;
  }

  if (episodeList) {
    episodes.forEach(function (ep) {
      episodeList.appendChild(buildEpisodeCard(ep));
    });
  }

  /* ---------------- hosts ---------------- */
  var hostGrid = document.getElementById("hostGrid");
  var hosts = window.BIG_MOOD_HOSTS || [];

  function initials(name) {
    return name
      .replace(/[^A-Za-z0-9 ]/g, "")
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map(function (w) { return w[0].toUpperCase(); })
      .join("");
  }

  if (hostGrid) {
    hosts.forEach(function (host) {
      var card = el("div", "host-card reveal");
      var avatar = el("div", "host-avatar");
      if (host.photo) {
        var img = el("img");
        img.src = host.photo;
        img.alt = host.name;
        avatar.appendChild(img);
      } else {
        avatar.textContent = initials(host.name);
      }
      card.appendChild(avatar);
      card.appendChild(el("h3", null, host.name));
      card.appendChild(el("p", null, host.role));
      hostGrid.appendChild(card);
    });
  }

  /* ---------------- scroll reveal ---------------- */
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach(function (node) { io.observe(node); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (node) { node.classList.add("is-visible"); });
  }

  /* ---------------- footer year ---------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
