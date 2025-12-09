let display = document.getElementById("screen");
let audio1 = document.getElementById("audio1");
let audio2 = document.getElementById("audio2");
let audio3 = document.getElementById("audio3");
let audio4 = document.getElementById("audio4");
let audio5 = document.getElementById("audio5");
let audio6 = document.getElementById("audio6");
let audio7 = document.getElementById("audio7");
let audio8 = document.getElementById("audio8");
let startBtn1 = document.getElementById("startBtn");
let stopBtn1 = document.getElementById("stopBtn");
let startBtn2 = document.getElementById("startBtn2");
let stopBtn2 = document.getElementById("stopBtn2");
let playBtn = document.getElementById("play");
let selector = document.getElementById("audioChoice");
let clearCdtr = document.getElementById("clearCdtr");
const audioContext = new AudioContext();
let recordedChunks = []
let recordedChunks2 = []
let audioElements = ["","","","","","","",""]

main();
async function main() {
    const videoStream = await navigator.mediaDevices.getUserMedia({audio: false, video: true});
    display.srcObject = videoStream;
    display.style.transform = "scaleX(-1)"
    const audioStream = await navigator.mediaDevices.getUserMedia({audio: true, video: false})
    mediaRecorder = new MediaRecorder(audioStream)
    mediaRecorder2 = new MediaRecorder(videoStream)
    mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };
    mediaRecorder2.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunks2.push(event.data);
            }
        };
    mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, {type: 'audio/webm' })
        const audioURL = URL.createObjectURL(blob);
        if (selector.value === "Track 1"){
            audio1.src = audioURL;
            audioElements[0] = blob
            }
        else if (selector.value === "Track 2"){
            audio2.src = audioURL;
            audioElements[1] = blob
            }
        else if (selector.value === "Track 3"){
            audio3.src = audioURL;
            audioElements[2] = blob
            }
        else if (selector.value === "Track 4"){
            audio4.src = audioURL;
            audioElements[3] = blob
        }
        else if (selector.value === "Track 5"){
            audio5.src = audioURL;
            audioElements[4] = blob
            }
        else if (selector.value === "Track 6"){
            audio6.src = audioURL;
            audioElements[5] = blob
            }
        else if (selector.value === "Track 7"){
            audio7.src = audioURL;
            audioElements[6] = blob
            }
        else if (selector.value === "Track 8"){
            audio8.src = audioURL;
            audioElements[7] = blob
        }
        recordedChunks = []
    }
    mediaRecorder2.onstop = () => {
        const blob = new Blob(recordedChunks2, {type: 'video/webm' })
        const videoURL = URL.createObjectURL(blob);
        display.srcObject = null;
        display.src = videoURL;
        display.autoplay = false;
        recordedChunks2 = []
    }
    clearCdtr.addEventListener("click", () => {
        display.controls = false;
        display.autoplay = true;
        display.srcObject = videoStream;
        display.style.transform = "scaleX(-1)";
    })
}

startBtn1.addEventListener("click" , () => {
    mediaRecorder2.start();
    startBtn1.style.backgroundColor = "green"
}) 

stopBtn1.addEventListener("click", () => {
    mediaRecorder2.stop();
    startBtn1.style.backgroundColor = "white"
} )

startBtn2.addEventListener("click" , () => {
    mediaRecorder.start();
    startBtn2.style.backgroundColor = "green"
    display.play();
}) 

stopBtn2.addEventListener("click", () => {
    mediaRecorder.stop();
    startBtn2.style.backgroundColor = "white"
    display.pause();
    display.currentTime = 0;
} )




playBtn.addEventListener("click", renderSound)

async function renderSound() {
    audioBlobs = []
    audioElements.forEach(element => {
        if (element){
            audioBlobs.push(element)
        }
    });
    console.log("Rendering sound")
    const sourceBuffers = await decodeBlobs(audioBlobs)
    
    // Assuming sourceBuffers is your array of decoded AudioBuffer objects
    sourceBuffers.forEach(buffer => {
    // 2. Create an AudioBufferSourceNode for each track
    const source = audioContext.createBufferSource();
    source.buffer = buffer;

    // 3. Connect the source directly to the speakers (the destination)
    source.connect(audioContext.destination);

    // 4. Start playback
    // The "0" means start playback immediately (at time 0)
    source.start(0); 
}); 
}

async function decodeBlobs(blobs) {
    const bufferPromises = blobs.map(async (blob) => {
        // Convert Blob to ArrayBuffer
        const arrayBuffer = await blob.arrayBuffer();
        // Decode the ArrayBuffer into an AudioBuffer
        return audioContext.decodeAudioData(arrayBuffer);
    });
    // Wait for all 8 decoding operations to complete
    return Promise.all(bufferPromises);
}

