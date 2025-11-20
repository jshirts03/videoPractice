
let mediaRecorder;
let recordedChunks = []
let btn = document.getElementById("btn")


window.onload = function () {
    navigator.mediaDevices.getUserMedia({audio: true, video: true}).then(stream=> {
        document.getElementById("video").srcObject = stream;
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };
        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, {type: 'video/webm' })
            const videoURL = URL.createObjectURL(blob);
            document.getElementById("player").src = videoURL;
            document.getElementById("download").href = videoURL;
            document.getElementById("download").download = "test.webm";
            btn.style.backgroundColor = "white";
        }
    })
}


btn.onclick = () => {
    recordedChunks = [];
    mediaRecorder.start();
    btn.style.backgroundColor = "green";

}


document.getElementById("stopbtn").onclick = () => {
    mediaRecorder.stop();
}