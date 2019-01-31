
// issue an xml http request using:
// method - GET, POST, PUT or DELETE
// url - the url
//
// after completing:
// 1. received data is interpreted and parsed as json
// 2. one of two callback functions is called:
//    if status == 200: successhandler(parsed_data)
//    else: errorhandler(statuscode, parsed_data)
//
function ajax(method, url, body, successhandler, errorhandler) {
    console.log("Start Ajax Call");
    var Success = false;
        $.ajax({
            type: method,
            url: url,
            dataType: "text",
            data: JSON.stringify(body),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                console.log("Success of Ajax Call");
                successhandler && successhandler(data); 
            },
            error: function (textStatus, errorThrown) {
                console.log("Error of Ajax Call");
                errorhandler && errorhandler(textStatus, errorThrown);
            }

        });
}

// fetch mustache template string from DOM tree, render and insert into dom tree (#content)
function render(templatename, data) {
    var output = Mustache.render(document.getElementById(templatename).innerHTML, data);
    document.querySelector("#content").innerHTML=output;
}

// shortcut for rendering errors
function render_error(data) {
    render('error', data);
}

// fetch a list of files and display it
function list_files() {
    alert("List Files");
    ajax("GET", base_url+'/files', {}, function (data) {
        render('file_list', data);
    }, render_error);
}

// read a particular file and display it
function read_file(file_url) {
    ajax("GET", file_url, {}, function (data) { render('file_read', data); }, render_error);
}

// event handler for all clicks on #content
// this is mainly used because it can fetch events for elements that are not yet present
// when the event listener is created
function click_content(event) {
    if (event.target.dataset['readfile']) {
        read_file(event.target.dataset['readfile']);
    }
}

var base_url='http://localhost:8080';

window.addEventListener("DOMContentLoaded", function () {
    alert("Dom Loaded");
    document.querySelector("#nav_list").addEventListener("click", list_files);
    document.querySelector('#content').addEventListener("click", click_content, true); // true: use capture phase!
    list_files();
});

