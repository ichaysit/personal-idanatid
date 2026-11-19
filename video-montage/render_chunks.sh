#!/bin/bash
# Resumable render: video in frame chunks (muted), audio once, then mux + exports.
set -e
cd "$(dirname "$0")"
COMP=ReposVideo; TOTAL=2197; STEP=270; OUT=out/chunks
i=0; s=0
while [ $s -lt $TOTAL ]; do
  e=$((s+STEP-1)); [ $e -ge $TOTAL ] && e=$((TOTAL-1))
  f=$(printf "$OUT/c%02d.mp4" $i)
  if [ ! -s "$f.done" ]; then
    rm -rf /tmp/react-motion-render*
    npx remotion render $COMP "$f" --frames=$s-$e --muted --codec=h264 --crf=10 --x264-preset=slow --jpeg-quality=100 --concurrency=3 --timeout=120000 --log=error
    echo ok > "$f.done"
  fi
  i=$((i+1)); s=$((e+1))
done
[ -s $OUT/audio.wav ] || npx remotion render $COMP $OUT/audio.wav --codec=wav --log=error
ls $OUT/c*.mp4 | sed "s/.*/file '&'/;s|out/chunks/|chunks/|" > out/chunks.txt
cd out
ffmpeg -v error -y -f concat -safe 0 -i chunks.txt -i chunks/audio.wav -map 0:v -map 1:a -vf "scale=2160:3840:in_range=full:out_range=tv:out_color_matrix=bt709,setsar=1,format=yuv420p" -c:v libx264 -preset slow -crf 12 -profile:v high -level 5.2 -color_range tv -colorspace bt709 -color_primaries bt709 -color_trc bt709 -r 60 -af "loudnorm=I=-14:TP=-1:LRA=9,aresample=48000" -c:a aac -b:a 320k -ar 48000 -shortest -movflags +faststart -map_metadata -1 Repos-Skills-4K60.mp4
ffmpeg -v error -y -i Repos-Skills-4K60.mp4 -c:v libx265 -preset medium -crf 18 -tag:v hvc1 -x265-params log-level=error -c:a copy -movflags +faststart Repos-Skills-4K60-telephone.mp4
ffmpeg -v error -y -i Repos-Skills-4K60.mp4 -vf "scale=1080:1920:flags=lanczos,fps=30,setsar=1,format=yuv420p" -c:v libx264 -preset slow -crf 16 -profile:v high -level 4.2 -colorspace bt709 -color_primaries bt709 -color_trc bt709 -color_range tv -c:a copy -movflags +faststart Repos-Skills-Reels-1080.mp4
ls -la Repos-Skills*
