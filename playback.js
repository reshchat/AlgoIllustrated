var isPaused = false;
function isAtEnd() {
    return (gw.getCurrentIteration()==(gw.getTotalIteration()-1));
}

function pause() {
    if(isPlaying) {
        isPaused = true;
        gw.pause();
        $('#play').show();
        $('#pause').hide();
    }
}
function play() {
    if(isPlaying) {
        isPaused = false;
        $('#pause').show();
        $('#play').hide();
        if(isAtEnd()) {
            gw.replay();
        } else {
            gw.play();
        }
    }
}
function stepForward() {
    if(isPlaying) {
        pause();
        gw.forceNext(250);
    }
}
function stepBackward() {
    if(isPlaying) {
        pause();
        gw.forcePrevious(250);	
    }
}
function goToBeginning() {
    if(isPlaying) {
        gw.jumpToIteration(0,0);
        pause();
    }
}
function goToEnd() {
    if(isPlaying) {
        gw.jumpToIteration(gw.getTotalIteration()-1,0);
        pause();
    }
}
function stop() {
    gw.stop();
    isPaused = false;
    isPlaying = false;
    $('#pause').show();
    $('#play').hide();
    $('#current-action').hide();
}

//shortcut keys for playback controls
$(document).keydown( function(event) {
    if(event.which == 32) { //spacebar
        if(isPaused) { play(); } else { pause(); }
    } else if(event.which == 37) { //left arrow
        stepBackward();
    } else if(event.which == 39) { //right arrow
        stepForward();
    } else if(event.which == 35) { //end
        stop();
    } else if (event.which == 189) { //minus
        var d = (2200-gw.getAnimationDuration())-100;
        if(d > 0) {
            $("#speed-input").slider("value", d);
        } else {
            $("#speed-input").slider("value", 0);
        }
    } else if (event.which == 187) { //plus
        var d = (2200-gw.getAnimationDuration())+100;
        if(d <= 2000) {
            $("#speed-input").slider("value", d);
        } else {
            $("#speed-input").slider("value", 2000);
        }
    }
});

//sliders
$("#speed-input").slider({
    min: 200,
    max: 2000,
    value: 1700,
    change: function(event, ui) {
        gw.setAnimationDuration(2200-ui.value);
    }
});
$("#progress-bar").slider({
    range: "min",
    min: 0,
    value: 0,
    slide: function(event, ui) {
        gw.pause();
        gw.jumpToIteration(ui.value,0);
    },
    stop: function(event, ui) {
        if(!isPaused) { setTimeout( function(){gw.play();}, 500) }
    }
});