let currentSong = 0
let playing = false
let currentSongDuration = 0

function playPause() {
    playing === true ? document.getElementById("music").pause() : document.getElementById("music").play()
    playing = !playing
}

function createAudio(song,songName){
    if(document.getElementById("songName")){
        document.getElementById("songName").remove()
    }
        
    let parent = document.getElementById("player")
    let audio = document.createElement("audio")
    let source = document.createElement("source")
    let name = document.createElement("p")
    name.id = "songName"
    audio.id="music"
    audio.preload = "metadata"
    source.id="source"
    parent.insertBefore(audio, parent.children[1])
    audio.appendChild(source)
    source.src = song
    audio.onplay = () => { playing = true }
    
    name.textContent = songName.substring(0,songName.length - 4)
    document.getElementById("songInfo").appendChild(name)

}


function nextSong(){
    document.getElementById("prev").disabled = false
    
    // let line = document.getElementById("line")
    // context= line.getContext("2d")
    // context.clearRect(0, 0, line.width, line.height);

    lineStateA = 0    
    fetch("http://localhost/audioPlayer/data.json").then((response) => response.json()).then((data) => {
        if(currentSong === Object.keys(data).length - 2){
            document.getElementById("next").disabled = true
        }
        
        document.getElementById("music").remove()
        console.log(data[currentSong]);
        createAudio(("http://localhost/audioPlayer/music/" + data[currentSong + 1]).split(" ").join("%20"),data[currentSong + 1])
        document.getElementById("music").onloadedmetadata = function() {
            currentSongDuration = document.getElementById("music").duration   
        };
        if(playing){
            document.getElementById("music").play()
        }
        currentSong ++     
    })
}

function prevSong(){
    document.getElementById("next").disabled = false
    fetch("http://localhost/audioPlayer/data.json").then((response) => response.json()).then((data) => {
        if(currentSong <= 1){
            document.getElementById("prev").disabled = true
        }
        
        document.getElementById("music").remove()
        createAudio(("http://localhost/audioPlayer/music/" + data[currentSong - 1]).split(" ").join("%20"),data[currentSong - 1])
        document.getElementById("music").onloadedmetadata = function() {
            currentSongDuration = document.getElementById("music").duration
        };
        if(playing){
            document.getElementById("music").play()
        }
        currentSong -- 
    })
}

function drawLine(){
    let line = document.getElementById("line")
    let context = line.getContext("2d")
    let currentTime = document.getElementById("music").currentTime
    let end = currentTime * 300 /currentSongDuration
    context.clearRect(0, 0, line.width, line.height);
    var w = line.width;
    line.width = 1;
    line.width = w;
    
    context.moveTo(0, line.height/2)
    context.lineTo(end, line.height/2)
    context.lineWidth = 2
    context.strokeStyle = "white"
    context.stroke()


    
}


function loop(){
    let line = document.getElementById("line")
    requestAnimationFrame(loop)
    drawLine()
}
window.onload =()=>{
    createAudio(("./music/3.33 - TIKNIkneR.mp3"),"3.33 - TIKNIkneR.mp3") 
    document.getElementById("music").onloadedmetadata = function() {
        currentSongDuration = document.getElementById("music").duration
    };   
    drawLine()

    loop()
}