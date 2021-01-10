console.log("this is the content script");


// util functions
function getWidth() {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
}

function getMsgButtonCoords() {
    let navButtons = document.getElementsByClassName("oajrlxb2 tdjehn4e qu0x051f esr5mh6w e9989ue4 r7d6kgcz rq0escxv nhd2j8a9 j83agx80 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso i1ao9s8h esuyzwwr f1sip0of lzcic4wl l9j0dhe7 abiwlrkh p8dawk7l bp9cbjyn s45kfl79 emlxlaya bkmhp75w spb7xbtv rt8b4zig n8ej3o3l agehan2d sk4xxmp2 taijpn5t qypqp5cg q676j6op");
    let msgButton = navButtons[3];

    // set position of the box on the screen
    let rect = msgButton.getBoundingClientRect();
    console.log(rect.top, rect.right, rect.bottom, rect.left);
    return rect;
}

function loadOverlay() {
    let overlay = document.getElementById("walkthru-overlay");

    $.get(chrome.extension.getURL('/overlay.html'), function(data) {
        $(data).appendTo('body');
    });

    // $.get(chrome.extension.getURL('/walkthru.js'), function(data) {
    //     $(data).appendTo('body');
    // });
}

function loadMessageBox() {
    // 7.986111640930176 980.2604370117188 47.986111640930176 940.2604370117188


    // display the overlay
    // set the z-index of the element to be higher than the overlay z-index

    // display the popup guidance box
    // set popup guidance box to have a z-index higher than the overlay
    $.get(chrome.extension.getURL('/msg_text_box.html'), function(data) {
        $(data).appendTo('body');
        console.log("data: ", data);

        let msg_text_box = document.getElementById("msg-text-box");
        console.log("msg_text_box: ", msg_text_box);
    });    
}


function displayOverlay() {
    let overlay = document.getElementById("walkthru-overlay");
    overlay.style.display = "block";
}

function displayMessageBox() {
    let rect = getMsgButtonCoords();

    let width = getWidth();
    
    let top = rect.top + 50;
    let right = width - rect.right;

    console.log("top: ", top);
    console.log("right: ", right);

    let msg_text_box = document.getElementById("msg-text-box");

    console.log("message_text_box: ", msg_text_box);

    msg_text_box.style.top = `${top}px`;
    msg_text_box.style.right = `${right}px`;

    msg_text_box.style.display = "block";
}


function hideOverlay() {
    let overlay = document.getElementById("walkthru-overlay");
    overlay.style.display = "none";
}

function hideMessageBox() {
    let msg_text_box = document.getElementById("msg-text-box");
    msg_text_box.style.display = "none";
}

function loadMsgButtonHighlight () {
    $.get(chrome.extension.getURL('/msg_icon_highlight.html'), function(data) {
        $(data).appendTo('body');
        console.log("data: ", data);

        let msg_button_highlight = document.getElementById("msg-button-highlight");
        console.log("msg_button_highlight: ", msg_button_highlight);
    });    
}

function displayMsgButtonHighlight () {
    
    let rect = getMsgButtonCoords();

    let msg_button_highlight = document.getElementById("msg-button-highlight");
    
    console.log("msg_button_highlight: ", msg_button_highlight);

    msg_button_highlight.style.top = `${rect.top}px`;
    msg_button_highlight.style.right = `${rect.right}px`;
    msg_button_highlight.style.left = `${rect.left}px`;

    msg_button_highlight.style.display = "block";

}

function hideMsgButtonHighlight () {
    let msg_button_highlight = document.getElementById("msg-button-highlight");
    msg_button_highlight.style.display = "none";
}

function hideAll() {
    hideOverlay();
    hideMessageBox();
    hideMsgButtonHighlight();
}

window.addEventListener('load', (event) => {
    "finished loading page, now loading overlay and message box";
    loadOverlay();
    loadMessageBox();
    loadMsgButtonHighlight();
});

function displayAll() {
    displayOverlay();
    displayMessageBox();1
    displayMsgButtonHighlight();
}

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    
    console.log("request: ", request);
    console.log("received action: ", request.action);
    
    if (request.action == "open_message_box") {
        displayAll();
        return true;
    } else {
        alert("That feature will be available soon! :)");
        return true
    }
});