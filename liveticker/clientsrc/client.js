import $ from 'jquery';
import io from 'socket.io-client';  // the socket.io client
import {sprintf} from 'sprintf-js';  // library with sprintf-string formatting function
import './style.css';

var socket;
var subChannels = {};

function subscribe(channelName){
	//alert("Joining: "+channelName);
	//socket.join(channelName);
	subChannels[channelName] = "Yes";
}

function unsubscribe(channelName){
	//alert("Leaving: "+channelName);
	//socket.leave(channelName);
	delete subChannels[channelName];
}

function sendToSubscribedChannels(socket, name, text){
	for (var channel in subChannels) {
		sendToChannel(socket, channel, name, text);
	}
}

function sendToChannel(socket, channel, name, text){
	socket.emit('chat', { channel: channel, name: name, text: text });
}

function hasChannelSubscribed(channel){
	return channel in subChannels;
}

function hasAnyChannelSubscribed(){
	//alert(Object.keys(subChannels).length);
	return Object.keys(subChannels).length>0;
}


function activateChannelClickHandlers(){
	$('.fake-link').click(function(){
		var channelName = $(this).text();
		$(this).toggleClass("active");
		var isActive = $(this).hasClass("active");
		if(isActive){
			subscribe(channelName);
		} else {
			unsubscribe(channelName);
		}

		//alert("All Subscribed Rooms: "+Object.keys(subChannels));
    });
}


function addChannelsToSideBar(channels){
	//alert("Adding Channels: "+channels);
	for(var pos in channels){
		addChannelToSideBar(channels[pos]);
	}
	activateChannelClickHandlers();
}

function addChannelToSideBar(channel){
	//alert("Add To Sidebar: "+channel);
	$(".sidenav").append('<li><div class="fake-link">'+channel+'</div></li>');
}


$(document).ready(function(){
	// connect to webSocket
	//alert("Alles Geladen");
	socket = io.connect();

	var pathname = window.location.pathname;
	if(pathname.includes("author")){ //super billiger Schreibschutz
		//alert("Author");	
	} else {
		$("#sendform").hide();
	}

	// incoming message
    // register event handler for 'chat' events
	socket.on('chat', function (data) {
		if(data.newchannels){
			addChannelsToSideBar(data.newchannels);
		}
		if(hasChannelSubscribed(data.channel)){
			var now = new Date(data.time);
			// construct html string for chat message and add to #content list
			$('#content').append(
	            sprintf("<li>%s: [%02d:%02d:%02d] <b>%s: </b> <span>%s</span></li>",
	                data.channel, now.getHours(), now.getMinutes(), now.getSeconds(),
	                data.name  || '', data.text));
			// scroll down (broken)
			$('body').scrollTop($('body')[0].scrollHeight);
		}
	});

	// send a message (submit handler for html form)
	$('#sendform').submit(function (event) {
	    // send (emit) a 'chat' event to server
	    if(hasAnyChannelSubscribed()){
			sendToSubscribedChannels(socket, $('#name').val(), $('#text').val())
			//socket.emit('chat', { name: "Name: "+$('#name').val(), text: $('#text').val() });
			$('#text').val('Beispieltext');	    	
	    } else {
	    	alert("Bitte min. einen Channel anklicken");
	    }

	    event.preventDefault();
    });

	// refresh number of chatters every second via ajax
    // this could of course be done via websockets / counting connects and disconnects as well,
    // but this is to demonstrate how to use websockets and ajax together
	window.setInterval(function () { $('#numclients').load('/numclients'); }, 5000);

});