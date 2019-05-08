

// var myObj = $.get('zadanie.json', function (data) {
//     createTimeline(data)
// });

var json_text ='[{"name":"Import danych do bazy danych","start_time":"2019-05-08","end_time":"2019-05-10","status":"new","parent_id":34,"id":36,"assignee":"Bartłomiej Nowak"},{"name":"Utworzenie modeli bazy danych","start_time":"2019-05-07","end_time":"2019-05-08","status":"new","parent_id":34,"id":35,"assignee":"Justyna Malik"},{"name":"Utworzenie repozytorium git","start_time":"2019-05-06","end_time":"2019-05-06","status":"new","parent_id":29,"id":33,"assignee":"Justyna Malik"},{"name":"Sortowanie bąbelkowe","start_time":"2019-05-01","end_time":"2019-05-02","status":"completed","parent_id":10,"id":11,"assignee":"Jan Kowalski"},{"name":"Sortowanie przez scalanie","start_time":"2019-05-02","end_time":"2019-05-03","status":"pending","parent_id":10,"id":12,"assignee":"Jan Kowalski"},{"name":"Sortowanie mergsort","start_time":"2019-05-04","end_time":"2019-05-05","status":"new","parent_id":10,"id":14,"assignee":"Bartłomiej Nowak"},{"name":"Migracja systemu zadań","start_time":"2019-05-06","end_time":"2019-05-24","status":"new","parent_id":"","id":29,"assignee":"Jan Kowalski"},{"name":"Wyświetlanie zadań na osi czasu","start_time":"2019-05-07","end_time":"2019-05-10","status":"new","parent_id":"29","id":32,"assignee":"Bartłomiej Nowak"},{"name":"Sortowanie zadań wg. czasu wykonania","start_time":"2019-05-06","end_time":"2019-05-07","status":"new","parent_id":29,"id":31,"assignee":"Bartłomiej Nowak"},{"name":"Utowrzenie endpointów dla aplikacji web","start_time":"2019-05-10","end_time":"2019-05-10","status":"new","parent_id":34,"id":"37","assignee":"Justyna Malik"},{"name":"Sortowanie quicksort","start_time":"2019-05-03","end_time":"2019-05-04","status":"new","parent_id":10,"id":13,"assignee":"Bartłomiej Nowak"},{"name":"Integracja z Django","start_time":"2019-05-07","end_time":"2019-05-24","status":"new","parent_id":29,"id":34,"assignee":"Bartłomiej Nowak"},{"name":"Algorytmy sortujące","start_time":"2019-05-01","end_time":"2019-05-06","status":"pending","parent_id":null,"id":10,"assignee":"Jan Kowalski"}]'
var myObj2 = JSON.parse(json_text);

var arr = [];
var startt = [];
var endt = [];
var tb = [];
for (var i = 0; i < 30; i++)
    tb[i] = [];
createTimeline(myObj2)
createDays();



function createTimeline(obj2) {
    for (x in obj2) {
        arr[x] = obj2[x];
    }

    sort(arr);


    for (x in arr) {

        if (arr[x].parent_id == null || arr[x].parent_id == "") {
            arr[x].parent_id = "";
            createDiv(x, arr);
            search_arr(x, arr);
        }
    }


    console.log(arr);

}

function search_arr(i, arr) {
    for (x in arr) {
        if (arr[x].parent_id == arr[i].id) {
            createDiv(x, arr);
            search_arr(x, arr)
        }
    }
}

function createDays() {
    var txt;
    for (var i = 1; i < 25; i++) {
        txt = "<div class='tasks' ";
        txt += "style='left:"
        txt += parseFloat((i / (25)) * 100);
        txt += "%; "
        txt += " width:"
        txt += parseFloat(((1) / 25) * 100);
        txt += "%;color: #999; height: 100%"
        txt += "; background-color: #"
        if (i % 2) {
            txt += "111";
        }
        else {
            txt += "222";
        }
        txt += "; z-index: -1; border-left:0px; border-right:0px; font-size: 15px;  top: "
        txt += -50;
        txt += "px'><p>"
        txt += "2019-05-";
        txt += i ;
        txt += "</p></div>"

        document.getElementById("task").innerHTML += txt;

    }
}

function createDiv(i, arr) {
    var p;
    var y = 0;
    var color;
    var border_color;
    console.log(i);
    if (arr[i].parent_id != null && arr[i].parent_id != "") {
        for (b in arr) {
            if (arr[i].parent_id == arr[b].id)
                p = b;
        }

        var y = arr[p].y;
    }

    var c = true;
    while (c) {
        c = false;
        for (var j = startt[arr[i].id]; j < endt[arr[i].id]; j++) {
            if (tb[y][j] != undefined) {
                c = true;
                y++;
                break;
            }
        }
    }

    for (var j = startt[arr[i].id]; j < endt[arr[i].id]; j++) {
        if (tb[y][j] != undefined) {
            tb[y][j] = false;
        }
        else {
            tb[y][j] = arr[i].name[0];
        }

    }
    arr[i].y = y;

    var txt = "";
    var width = parseFloat(((endt[arr[i].id] - startt[arr[i].id]) / 25) * 100);

    if (arr[i].parent_id == null || arr[i].parent_id == "") {

        color = parseInt(Math.random() * 700) + 299;
        if (color % 10 < 4)
            color += 4;
        if (color % 100 < 40)
            color += 40;


    } else {
        color = arr[p].color - 111;
    }
    arr[i].color = color;

    if (arr[i].status == "new")
        border_color = "#79ff8b"
    if (arr[i].status == "pending")
        border_color = "#ffb579"
    if (arr[i].status == "completed")
        border_color = "#798bff"



    txt = "<div class='tasks' id='task";
    txt += arr[i].id;
    txt += "' "
    txt += "style='left:"

    txt += parseFloat(((startt[arr[i].id]) / (25)) * 100);

    txt += "%; "
    txt += " width:"
    txt += width;
    txt += "%; background-color: #"
    txt += color;
    txt += "; top: "
    txt += 110 * y;
    txt += "px; border-bottom-color: ";
    txt += border_color;
    if ((endt[arr[i].id] - startt[arr[i].id]) < 2) {
        txt += "; font-size: 10px"
    }
    txt += "'><p>"
    txt += arr[i].name;
    txt += "<br><br>"
    txt += arr[i].assignee;
    txt += "</p></div>"

    document.getElementById("task").innerHTML += txt;

}
function sort(arr) {
    for (i in arr) {
        arr[i].y = 0;
        startt[arr[i].id] = parseInt(arr[i].start_time[8] + arr[i].start_time[9]);
        endt[arr[i].id] = parseInt(arr[i].end_time[8] + arr[i].end_time[9]) + 1;
    }
    for (i = 0; i < arr.length; i++) {
        min = i;
        for (j = i + 1; j < arr.length; j++) {


            if (startt[arr[i].id] < startt[arr[j].id]) {
                min = j;
            }
        }
        if (i != min) {
            var temp = arr[i];
            arr[i] = arr[min];
            arr[min] = temp;
        }
    }

    return (arr);
}