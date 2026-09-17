(() => {
  'use strict';

  const stations = [
    { file: 'WILD.mp3', name: 'Wildstyle Pirate Radio', badge: 'WILD' },
    { file: 'FLASH.mp3', name: 'Flash FM', badge: 'FLASH' },
    { file: 'FEVER.mp3', name: 'Fever 105', badge: 'FEVER' },
    { file: 'VROCK.mp3', name: 'V-Rock', badge: 'V-ROCK' },
    { file: 'ESPANT.mp3', name: 'Radio Espantoso', badge: 'ESP' },
    { file: 'EMOTION.mp3', name: 'Emotion 98.3', badge: 'EMOTION' },
    { file: 'WAVE.mp3', name: 'Wave 103', badge: 'WAVE' },
    { file: 'KCHAT.mp3', name: 'K-Chat', badge: 'K-CHAT' },
    { file: 'VCPR.mp3', name: 'Vice City Public Radio', badge: 'VCPR' }
  ];

  const audio = document.getElementById('audio');
  const stationName = document.getElementById('stationName');
  const stationArt = document.getElementById('stationArt');
  const stationsEl = document.getElementById('stations');
  const playBtn = document.getElementById('playBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const muteBtn = document.getElementById('muteBtn');
  const volume = document.getElementById('volume');
  const status = document.getElementById('status');

  let currentIndex = 0;

  audio.volume = Number(volume.value);

  function renderStations() {
    stationsEl.innerHTML = '';
    stations.forEach((station, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'station' + (index === currentIndex ? ' active' : '');
      button.textContent = station.badge;
      button.setAttribute('aria-label', station.name);
      button.addEventListener('click', () => selectStation(index, true));
      stationsEl.appendChild(button);
    });
  }

  function updateStationUI() {
    const station = stations[currentIndex];
    stationName.textContent = station.name;
    stationArt.textContent = station.badge;
    document.title = station.name + ' — Vice City Radio';

    Array.from(stationsEl.children).forEach((button, index) => {
      button.classList.toggle('active', index === currentIndex);
    });
  }

  async function selectStation(index, playAfterSwitch) {
    currentIndex = (index + stations.length) % stations.length;
    const station = stations[currentIndex];
    updateStationUI();

    audio.pause();
    audio.src = 'radio/' + station.file;
    audio.load();
    status.textContent = playAfterSwitch ? 'Tuning in…' : 'Ready';
    updatePlayButton(false);

    if (playAfterSwitch) {
      try {
        await audio.play();
        status.textContent = 'On air';
        updatePlayButton(true);
      } catch (error) {
        status.textContent = 'Press play to start';
        updatePlayButton(false);
      }
    }
  }

  function updatePlayButton(isPlaying) {
    playBtn.textContent = isPlaying ? '⏸' : '▶';
    playBtn.setAttribute('aria-label', isPlaying ? 'Pause' : 'Play');
  }

  async function togglePlay() {
    if (audio.paused) {
      if (!audio.src) await selectStation(currentIndex, false);
      try {
        await audio.play();
        status.textContent = 'On air';
        updatePlayButton(true);
      } catch (error) {
        status.textContent = 'Audio file could not be played';
        updatePlayButton(false);
      }
    } else {
      audio.pause();
      status.textContent = 'Paused';
      updatePlayButton(false);
    }
  }

  function toggleMute() {
    audio.muted = !audio.muted;
    muteBtn.textContent = audio.muted ? '🔇' : '🔊';
    muteBtn.setAttribute('aria-label', audio.muted ? 'Unmute' : 'Mute');
  }

  playBtn.addEventListener('click', togglePlay);
  prevBtn.addEventListener('click', () => selectStation(currentIndex - 1, true));
  nextBtn.addEventListener('click', () => selectStation(currentIndex + 1, true));
  muteBtn.addEventListener('click', toggleMute);

  volume.addEventListener('input', () => {
    audio.volume = Number(volume.value);
    if (audio.volume > 0 && audio.muted) {
      audio.muted = false;
      muteBtn.textContent = '🔊';
      muteBtn.setAttribute('aria-label', 'Mute');
    }
  });

  audio.addEventListener('play', () => updatePlayButton(true));
  audio.addEventListener('pause', () => updatePlayButton(false));
  audio.addEventListener('ended', () => {
    updatePlayButton(false);
    status.textContent = 'Broadcast ended — press play to restart';
  });
  audio.addEventListener('error', () => {
    updatePlayButton(false);
    status.textContent = 'Audio file not found — check radio/' + stations[currentIndex].file;
  });

  document.addEventListener('keydown', (event) => {
    const tag = document.activeElement && document.activeElement.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

    if (event.code === 'Space') {
      event.preventDefault();
      togglePlay();
    } else if (event.key === 'ArrowLeft') {
      selectStation(currentIndex - 1, true);
    } else if (event.key === 'ArrowRight') {
      selectStation(currentIndex + 1, true);
    } else if (event.key.toLowerCase() === 'm') {
      toggleMute();
    }
  });

  renderStations();
  updateStationUI();
})();
