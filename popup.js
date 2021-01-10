// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

function closePopup(e) {
  window.close();
}

document.addEventListener('DOMContentLoaded', function () {
  var optionDivs = document.querySelectorAll('div.option');
  for (var i = 0; i < optionDivs.length; i++) {

    let div = optionDivs[i];

    if (div.id == "message-button") {
      div.addEventListener('click', handleMessageButtonClick);  

    } else {
      div.addEventListener('click', handleGeneralClick);  

    }
  }

});

function handleMessageButtonClick(e) {

  console.log("handling message button click");

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {action: "open_message_box"}, function(response) {});  
  });
  closePopup(e);
}

function handleGeneralClick(e) {
  console.log("handling general button click");

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){

    console.log("tabs: ", tabs);

    chrome.tabs.sendMessage(tabs[0].id, {action: "upcoming_feature"}, function(response) {});  
  });
  closePopup(e);
}




