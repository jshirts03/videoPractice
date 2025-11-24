let screen = document.getElementById("screen");
let display1 = document.getElementById("display1");
let display2 = document.getElementById("display2");
let display3 = document.getElementById("display3");
let display4 = document.getElementById("display4");
let startBtn = document.getElementById("startBtn");
let stopBtn = document.getElementById("stopBtn");
let playBtn = document.getElementById("play")
let selector = document.getElementById("vidChoice")
let recordedChunks = [];




async function main() {
    const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
    screen.srcObject = stream;
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };
    mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, {type: 'video/webm' })
        const videoURL = URL.createObjectURL(blob);
        if (selector.value === "Video 1"){
                display1.src = videoURL;
            }
        else if (selector.value === "Video 2"){
                display2.src = videoURL;
            }
        else if (selector.value === "Video 3"){
            display3.src = videoURL;
            }
        else if (selector.value === "Video 4"){
            display4.src = videoURL;
        }
        display1.muted = false;
    }
}


startBtn.onclick = () => {
    mediaRecorder.start();
    if (display1.src){
        display1.muted = true;
        display1.play();
    }
    startBtn.style.backgroundColor = 'green'
}

stopBtn.onclick = () => {
    mediaRecorder.stop();
    recordedChunks = [];
    startBtn.style.backgroundColor = "white";
}


playBtn.onclick = () => {
    display1.play();
    display2.play();
    display3.play();
    display4.play();
}

window.onload = main()