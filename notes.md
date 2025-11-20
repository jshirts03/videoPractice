**This is interesting stuff**

Here's some things I've learned from this project.

`navigator.mediaDevices.getUserMedia({audio: true, video: true})`
Returns a PROMISE that when resolves returns a mediastream object. This code will request permission from the user to use the camera and audio. Then it grants that permission and gives access through the steam

We can then make this media stream the `srcObject` of a video html tag that has an `autoplay` configuration, which allows users to see a live preview of their camera and mic audio in the video html element. We normally want to add the `muted` attribute to the video tag because the live stream will automatically play any audio it hears which is a bit annoying.


We can't use this stream very much for recording unless we convert it to a MediaRecorder object, which is a built in API in Javascript. 
`mediaRecorder = new MediaRecorder(stream);`



With this we need 2 essential event listeners:

1) `mediaRecorder.ondataavailable`

- This event is triggered anytime the mediarecorder has captured any data. In our code when this is call if the `event.data` has anything in it, we push it to a recordedChunks array. This builds an array of data that will be compiled later into a usable video file.


2) `mediaRecorder.onstop`

-This event is triggered when the .stop() method is called on the recorder. If our recorder worked correctly, we should have an array somewhere with a bunch of chunks of data stored in it. We compile that data by creating a new Blob, specifying the type as video.webm. This Blob can then be converted into a URL which can be used as an href for a download <a> tag, or on a display <video> tag.


```
 mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, {type: 'video/webm' })
            const videoURL = URL.createObjectURL(blob);
            document.getElementById("player").src = videoURL;
            document.getElementById("download").href = videoURL;
            document.getElementById("download").download = "test.webm";
            btn.style.backgroundColor = "white";
        }
```




