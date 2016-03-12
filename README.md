
bmsurge
=======

The infrastructure that runs [Be-Music Surge](http://be-music.surge.sh).
Using microservice approach.

Be-Music Surge is composed of three components:

1. A server that stores the music and runs `mpd` (music player daemon).
2. An IceCast server.
3. A set of microservices that interact with mpd and IceCast. This repo contains the code for this part.

These microservices interact with `mpd` through the `mpc` command-line application (or other client library). They also interact with each other. For example, one service connects to IceCast to extract the server statitics and writes to a file. Another service may read from this log.

Current services are:

- `nowplaying` Serves the server status and currently playing music.
- `programme` Scripts to update radio program.
- `statistics-logger` Worker that records the server statistics every minute.
- `website` The web site.
