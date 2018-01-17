 window.onload = function() {
 	// Create button 
 	var addBtn = document.createElement("a");
 	addBtn.classList.add("add-btn");
 	addBtn.innerHTML = "+";
 	document.body.appendChild(addBtn);
 	// Create  container for iframe
 	var container = document.createElement("div");
 	container.id = "container";
 	document.body.appendChild(container);
 	// Create iFrameChatBox
 	var iframeChatBox = {
 		user: 1,
 		targetOrigin: '*',
 		createFrame: function() {
 			var iframe = document.createElement("iframe");
 			container.appendChild(iframe);
 			iframe.srcdoc =
 				"<link rel='stylesheet' type='text/css' href='assets/style/chat-room.css'/>" +
 				"<div id='containerheader'></div>" + "<ul id='chat-area'></ul>" +
 				"<form id='form' class='form'>" +
 				"<label for='message' id='labelMessage'>[User" + this.user +
 				"]:</label>" +
 				"<textarea  id='message' placeholder='Write message'></textarea>" +
 				"<button id='submit' type='submit' value='send'><img src='assets/img/plane.svg'></img></button>" +
 				"</form>" + "<script src='assets/js/chat-room.js'></script>";
 			this.user++;
 		},
 		pushMessage: function(msg, targetOrigin) {
 			var allIframes = document.getElementsByTagName("iframe");
 			for (var i = 0; i < allIframes.length; i++) {
 				allIframes[i].contentWindow.postMessage(msg, targetOrigin);
 			}
 		},
 	};
 	window.addEventListener('message', function(e) {
 		//Post msg to all iframes
 		iframeChatBox.pushMessage(e.data, iframeChatBox.targetOrigin);
 	});
 	//Add iframe by ckick
 	addBtn.addEventListener('click', function() {
 		iframeChatBox.createFrame();
 	});
 };