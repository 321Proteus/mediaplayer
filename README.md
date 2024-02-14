# mediaplayer

IQPlayer is an online audio player.

IQPlayer offers song/playlist looping and drag-and-drop-organised playlist. Users can pick their own accent color and save the options at localStorage.

It can be used either as a webpage or as an Electron App.

To use on your machine, clone the repository and run a live server or use `npm start` to build the binary.
Remember to change OS preferences in package.json (Windows Portable is set by default).

To do (as for 0.9.8):

- Fix scrollbar color flicker when scrolling with active song

- Expand config settings - playback speed, long title/artist behaviour, etc.

- Implement deleting song from playlist, as well as saving playlist session (reloading window resets it by default)

- Implement text scrolling when title is too long
