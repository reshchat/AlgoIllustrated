function changeText(ss) {
    console.log("PRINTING PC");
    console.log(ss);
    // Get the paragraph element using its id attribute
    var para = document.getElementById("pseudocode");

    // Change the text content of the paragraph element
    //para.textContent = "New text";

    para.innerHTML  = ss;
}

function changeError(ss) {
    // Get the paragraph element using its id attribute
    var para = document.getElementById("err");

    // Change the text content of the paragraph element
    //para.textContent = "New text";

    para.innerHTML  = ss;
}