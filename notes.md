**This is interesting stuff**

Here's some things I've learned from this project.

`navigator.mediaDevices.getUserMedia({audio: true, video: true})`
Returns a PROMISE that when resolves returns a mediastream object. This code will request permission from the user to use the camera and audio. Then it grants that permission and gives acces through the steam
