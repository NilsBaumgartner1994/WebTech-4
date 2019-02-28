
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
function ajax(method, url, body, successhandler, errorhandler, content_type) {
    if(content_type === undefined){
        content_type = "application/json; charset=utf-8";
    }
    console.log("Start Ajax Call");
        $.ajax({
            type: method,
            url: url,
            dataType: "text",
            data: body,
            contentType: content_type,
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
    if(typeof data !== "object"){
        data = JSON.parse(data);
    }
    var output = Mustache.render(document.getElementById(templatename).innerHTML, data);
    $("#content")[0].innerHTML=output;
}

// shortcut for rendering errors
function render_error(data) {
    render('file_error', data);
}

// fetch a list of files and display it
function list_files() {
    console.log("List Files");
    ajax("GET", base_url+'/files', {}, function (data) {
        render('file_list', data);
    }, render_error);
}

// read a particular file and display it
function read_file(file_url) {
    ajax("GET", file_url, {}, function (data) { render('file_read', data); }, render_error);
}


// edit a file
function edit_file(file_url) {
    ajax("PUT", file_url, {"content": $('.filecontent')[0].value}, function () {}, render_error, "application/x-www-form-urlencoded; charset=utf-8");
}

// render create file
function create_file(file_url) {
    render('file_create', null);
}

// create file
function make_file(file_url) {

    // build url
    var url = base_url + "/files";
    if($('#filename')[0].value){
        url += "/" + $('#filename')[0].value;
    }

    console.log($(".filecontent")[0].value);
    ajax("POST", url, {"content": $(".filecontent")[0].value}, list_files, render_error, "application/x-www-form-urlencoded; charset=utf-8");
}

// read a particular file and display it
function delete_file(file_url) {
    console.log("delete");
    ajax("DELETE", file_url, {}, list_files, render_error);
}

// event handler for all clicks on #content
// this is mainly used because it can fetch events for elements that are not yet present
// when the event listener is created
function click_content(event) {
    if (event.target.dataset['readfile']) {
        read_file(event.target.dataset['readfile']);
    }
    if (event.target.dataset['deletefile']) {
        delete_file(event.target.dataset['deletefile']);
    }
    if (event.target.dataset.editfile) {
        edit_file(event.target.dataset['editfile']);
    }
    if (event.target.dataset['createfile']) {
        create_file(event.target.dataset['createfile']);
    }
    if (event.target.dataset['makefile']) {
        make_file(event.target.dataset['makefile']);
    }
}

var base_url='http://localhost:8080';

window.addEventListener("DOMContentLoaded", function () {
    console.log("Dom Loaded");
    $("#nav_list").click(list_files);
    $('#content').click(click_content);
    list_files();
});

