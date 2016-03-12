#!/bin/bash
cd www
npm run build
surge dist be-music.surge.sh
