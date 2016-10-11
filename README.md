
bmsurge
=======

The infrastructure that runs [Be-Music Surge](http://be-music.surge.sh).
Using microservice approach.

Be-Music Surge is composed of three main components:

1. __A music server__
  - Stores all music files.
    - Music files are generated using [bms2mp3](https://github.com/bemusic/bms2mp3).
    - Songs are synchronized to this server using Resilio Sync.
  - Runs the [`mpd` (Music Player Daemon)](https://www.musicpd.org/).
    - This application plays the songs and broadcasts to the IceCast server (2).
2. __An IceCast server__
  - The `mpd` on (1) sends audio data to this server.
  - Listeners also listen from this server.
3. __Microservices__
  - Programme automation.
  - Statistics logging.
  - REST API to query current song.
  - This repository contains the code for these services.
4. __Website__
  - This repository contains the code for the website.

A set of microservices that interact with mpd and IceCast. This repo contains the code for this part.

These microservices interact with `mpd` through the `mpc` command-line application (or other client library). They also interact with each other. For example, one service connects to IceCast to extract the server statitics and writes to a file. Another service may read from this log.

Current services are:

- `dj` Auto DJ: a Ruby microservice that keeps refilling songs into mpd’s song queue.
- `nowplaying` Serves the server status and currently playing music.
- `programme` Scripts to update radio program.
- `statistics-logger` Worker that records the server statistics every minute.
- `www` The web site built using Webpack and Preact. The result is a 19k HTML file with all CSS and JS inlined.
