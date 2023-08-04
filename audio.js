var play_audio = function play_audio(page) {
    console.log('page ' + page);
    var audio;
    if(page.includes("graph")) {
        audio = document.getElementById("graph_audio_file");
    }
    else if(page.includes("dp")) {
        audio = document.getElementById("dp_audio_file");
    }
    else if(page.includes("stacks")) {
        audio = document.getElementById("stacks_audio_file");
    }
    audio.play();
}