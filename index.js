let currentSong = 0
let playing = false

function play() {
    document.getElementById("music").play()
    playing = true
}

function pause() {
    document.getElementById("music").pause()
    playing = false
}

function createAudio(song){
    let parent = document.getElementById("player")
    let audio = document.createElement("audio")
    audio.id="music"
    let source = document.createElement("source")
    source.id="source"
    // document.body.appendChild(audio)
    parent.insertBefore(audio, parent.children[1])
    audio.appendChild(source)
    // audio.controls = true
    source.src = song
    audio.onplay = () => { playing = true }
    console.log(playing);
    audio.duration = "4"
    console.log(audio.currentTime,audio.duration);
}

function nextSong(){
    document.getElementById("prev").disabled = false
    fetch("http://localhost/audioPlayer/data.json").then((response) => response.json()).then((data) => {
        if(currentSong === Object.keys(data).length - 2){
            document.getElementById("next").disabled = true
        }
        document.getElementById("music").remove()
        createAudio(("http://localhost/audioPlayer/music/" + data[currentSong + 1]).split(" ").join("%20"))
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
        createAudio(("http://localhost/audioPlayer/music/" + data[currentSong - 1]).split(" ").join("%20"))
        if(playing){
            document.getElementById("music").play()
        }
        currentSong -- 
    })
}

window.onload =()=>{
    createAudio(("./music/3.33 - TIKNIkneR.mp3"))
    
}