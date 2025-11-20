
let mediaRecorder;
let recordedChunks = []
const metBut = document.getElementById("metstrt")
const met = document.getElementById("metronome")

window.onload = function () {
    let btn = document.getElementById("btn")
    let btn2 = document.getElementById("btn2")
    const player = document.getElementById("player");
    const player2 = document.getElementById("player2");
    navigator.mediaDevices.getUserMedia({audio: true, video: true}).then(stream=> {
        document.getElementById("video").srcObject = stream;
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };
        mediaRecorder.onstop = () => {
            met.pause();
            met.currentTime = 0;
            const blob = new Blob(recordedChunks, {type: 'video/webm' })
            const videoURL = URL.createObjectURL(blob);
            if (player.src){
                player2.src = videoURL;
            }
            else{
                player.src = videoURL;
            }
            document.getElementById("download").href = videoURL;
            document.getElementById("download").download = "test.webm";
            btn.style.backgroundColor = "white";
        }
    })
}


btn.onclick = () => {
    recordedChunks = [];
    met.play();
    mediaRecorder.start();
    if (player.src){
        player.play();
    }
    btn.style.backgroundColor = "green";

}


document.getElementById("stopbtn").onclick = () => {
    mediaRecorder.stop();
}


btn2.onclick = () => {
    player.play();
    player2.play();
};



metBut.onclick = () => {
    let speed = document.getElementById("mySlider")
    met.playbackRate = speed.value;
    if (met.paused){
        met.play();
    }
    else{
        met.pause();
        met.currentTime = 0;
    }

}