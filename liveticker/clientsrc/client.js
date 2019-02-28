import $ from 'jquery';
import io from 'socket.io-client';  // the socket.io client
import {sprintf} from 'sprintf-js';  // library with sprintf-string formatting function
import './style.css';

var socket;
var subChannels = {};

function subscribe(channelName){
	alert("Joining: "+channelName);
	socket.join(channelName);
	subChannels[channelName] = "Yes";
}

function unsubscribe(channelName){
	alert("Leaving: "+channelName);
	socket.leave(channelName);
	delete subChannels[channelName];
}

function myStart(){
	$('.fake-link').click(function(){
		var channelName = $(this).text();
		$(this).toggleClass("active");
		var isActive = $(this).hasClass("active");
		if(isActive){
			subscribe(channelName);
		} else {
			unsubscribe(channelName);
		}

		alert("All Subscribed Rooms: "+Object.keys(subChannels));
    });
}



$(document).ready(function(){
	// connect to webSocket
	alert("Alles Geladen");
	socket = io.connect();

	myStart(socket);

	// incoming message
    // register event handler for 'chat' events
	socket.on('chat', function (data) {
		var now = new Date(data.time);
		// construct html string for chat message and add to #content list
		$('#content').append(
            sprintf("<li>Test: [%02d:%02d:%02d] <b>%s: </b> <span>%s</span></li>",
                now.getHours(), now.getMinutes(), now.getSeconds(),
                data.name  || '', data.text));
		// scroll down (broken)
		$('body').scrollTop($('body')[0].scrollHeight);
	});

	// send a message (submit handler for html form)
	$('#sendform').submit(function (event) {
	    // send (emit) a 'chat' event to server
		socket.emit('chat', { name: "Name: "+$('#name').val(), text: $('#text').val() });
		$('#text').val('Beispieltext');
	    event.preventDefault();
    });

	// refresh number of chatters every second via ajax
    // this could of course be done via websockets / counting connects and disconnects as well,
    // but this is to demonstrate how to use websockets and ajax together
	window.setInterval(function () { $('#numclients').load('/numclients'); }, 5000);

});