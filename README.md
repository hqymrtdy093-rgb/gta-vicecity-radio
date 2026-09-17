# Vice City Radio

A private, lightweight web radio player for the original PC **Grand Theft Auto: Vice City** radio stations.

## Features

- All 9 original Vice City radio stations
- Continuous station MP3 playback
- Station switching
- Play / pause
- Previous / next station
- Volume and mute controls
- Keyboard controls
- Responsive desktop and mobile UI
- No seek bar, timeline, or song metadata UI
- No external libraries or CDNs

## Add the radio audio

Place your extracted station MP3 files inside the `radio/` folder using these exact filenames:

```text
radio/WILD.mp3
radio/FLASH.mp3
radio/FEVER.mp3
radio/VROCK.mp3
radio/ESPANT.mp3
radio/EMOTION.mp3
radio/WAVE.mp3
radio/KCHAT.mp3
radio/VCPR.mp3
```

The repository intentionally does **not** include the audio files.

## GitHub Pages

After the MP3 files are added, enable GitHub Pages for the `main` branch and the repository root (`/`).

The site is entirely static, so no server or API is required.

## Keyboard

- `Space` — play / pause
- `Left Arrow` — previous station
- `Right Arrow` — next station
- `M` — mute / unmute
