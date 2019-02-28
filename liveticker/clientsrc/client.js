import $ from 'jquery';
import io from 'socket.io-client';  // the socket.io client
import {sprintf} from 'sprintf-js';  // library with sprintf-string formatting function
import './style.css';

var socket; //global socket for join and leave, not used
var subChannels = {}; //list of subscribed channels

function subscribe(channelName){ //subscribe a channel
	//alert("Joining: "+channelName);
	//socket.join(channelName);
	subChannels[channelName] = "Yes"; //or any other value
}

function unsubscribe(channelName){ //leave a channel
	//alert("Leaving: "+channelName);
	//socket.leave(channelName);
	delete subChannels[channelName]; //deltes from dict
}

function sendToSubscribedChannels(socket, name, text){ //send message to all subscribed channels
	for (var channel in subChannels) { //for everychannel
		sendToChannel(socket, channel, name, text);
	}
}

function sendToChannel(socket, channel, name, text){ //sends to the chat, information about channel, name, text
	socket.emit('chat', { channel: channel, name: name, text: text });
}

function hasChannelSubscribed(channel){ //has the user a channel subscribed
	return channel in subChannels;
}

function hasAnyChannelSubscribed(){ //has the user any channel subscribed
	//alert(Object.keys(subChannels).length);
	return Object.keys(subChannels).length>0;
}


function activateChannelClickHandlers(){ //activates the click events for all channel buttons
	$('.fake-link').click(function(){
		var channelName = $(this).text(); // get the channel name
		$(this).toggleClass("active"); //toggle active
		var isActive = $(this).hasClass("active"); //get if is active now
		if(isActive){
			subscribe(channelName); //if active subscribe
		} else {
			unsubscribe(channelName); //else unsubscribe
		}

		//alert("All Subscribed Rooms: "+Object.keys(subChannels));
    });
}


function addChannelsToSideBar(channels){ //adds a list of names to the sidebar
	//alert("Adding Channels: "+channels);
	for(var pos in channels){ //for every channel
		addChannelToSideBar(channels[pos]); //add the channel
	}
	activateChannelClickHandlers(); //activate all click handlers
}
 
function addChannelToSideBar(channel){ //adds a channel to the sidebar
	//alert("Add To Sidebar: "+channel);
	$(".sidenav").append('<li><div class="fake-link">'+channel+'</div></li>');
}


$(document).ready(function(){
	// connect to webSocket
	//alert("Alles Geladen");
	socket = io.connect();

	var isAuthor = false;

	var pathname = window.location.pathname; //get url name
	if(pathname.includes("author")){ //super billiger Schreibschutz
		//alert("Author");	
		isAuthor = true;
	} else {
		$("#sendform").hide();
	}

	// incoming message
    // register event handler for 'chat' events
	socket.on('chat', function (data) {
		if(data.newchannels){
			addChannelsToSideBar(data.newchannels);
		}
		if(hasChannelSubscribed(data.channel) || isAuthor){
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
	    if(hasAnyChannelSubscribed()){ //if channel subcribed
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