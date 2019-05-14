

// var myObj = $.get('zadanie.json', function (data) {
//     createTimeline(data)
// });

var json_text = '[{"name":"Import danych do bazy danych","start_time":"2019-05-08","end_time":"2019-05-10","status":"new","parent_id":34,"id":36,"assignee":"Bartłomiej Nowak"},{"name":"Utworzenie modeli bazy danych","start_time":"2019-05-07","end_time":"2019-05-08","status":"new","parent_id":34,"id":35,"assignee":"Justyna Malik"},{"name":"Utworzenie repozytorium git","start_time":"2019-05-06","end_time":"2019-05-06","status":"new","parent_id":29,"id":33,"assignee":"Justyna Malik"},{"name":"Sortowanie bąbelkowe","start_time":"2019-05-01","end_time":"2019-05-02","status":"completed","parent_id":10,"id":11,"assignee":"Jan Kowalski"},{"name":"Sortowanie przez scalanie","start_time":"2019-05-02","end_time":"2019-05-03","status":"pending","parent_id":10,"id":12,"assignee":"Jan Kowalski"},{"name":"Sortowanie mergsort","start_time":"2019-05-04","end_time":"2019-05-05","status":"new","parent_id":10,"id":14,"assignee":"Bartłomiej Nowak"},{"name":"Migracja systemu zadań","start_time":"2019-05-06","end_time":"2019-05-24","status":"new","parent_id":"","id":29,"assignee":"Jan Kowalski"},{"name":"Wyświetlanie zadań na osi czasu","start_time":"2019-05-07","end_time":"2019-05-10","status":"new","parent_id":"29","id":32,"assignee":"Bartłomiej Nowak"},{"name":"Sortowanie zadań wg. czasu wykonania","start_time":"2019-05-06","end_time":"2019-05-07","status":"new","parent_id":29,"id":31,"assignee":"Bartłomiej Nowak"},{"name":"Utowrzenie endpointów dla aplikacji web","start_time":"2019-05-10","end_time":"2019-05-10","status":"new","parent_id":34,"id":"37","assignee":"Justyna Malik"},{"name":"Sortowanie quicksort","start_time":"2019-05-03","end_time":"2019-05-04","status":"new","parent_id":10,"id":13,"assignee":"Bartłomiej Nowak"},{"name":"Integracja z Django","start_time":"2019-05-07","end_time":"2019-05-24","status":"new","parent_id":29,"id":34,"assignee":"Bartłomiej Nowak"},{"name":"Algorytmy sortujące","start_time":"2019-05-01","end_time":"2019-05-06","status":"pending","parent_id":null,"id":10,"assignee":"Jan Kowalski"}]'
var arr = JSON.parse(json_text);


var startt = [];
var endt = [];
var tb = [];

var w = 73;
var h = 40;
for (var i = 0; i < 40; i++) {
    tb[i] = [];
    for (var j = 0; j < 30; j++)
        tb[i][j] = [];
}
arr = sort(arr);
createTimeline(arr)
createDays();



function createTimeline() {
    for (i in arr) {

        if (arr[i].parent_id == "" || arr[i].parent_id == null) {
            arr[i].parent_id = 0;
            childSearch(i);
        }}
        for(i in arr)
        if (arr[i].parent_id == 0) {
            

            console.log(i)
            createDiv(i);

        }

        
    



}

function childSearch(x) {
    for (i in arr) {
        if (arr[i].parent_id == arr[x].id) {

            childSearch(i)

        }
    }

    getValues(x);
}

function createDays() {
    var txt;
    for (var i = 1; i < 26; i++) {
        txt = "<div class='days' ";
        txt += "style='left:"
        txt += parseFloat((i - 1)  * w);
        txt += "px; "
        txt += " width:"
        txt += w;
        txt += "px; color: #999; height: 100%"
        txt += "; background-color: #"
        if (i % 2) {
            txt += "111";
        }
        else {
            txt += "222";
        }
        txt += "; z-index: -1; border-left:0px; border-right:0px; font-size: 10px;  top: "
        txt += 0;
        txt += "px'><p>"
        txt += "2019-05-";
        txt += i;
        txt += "</p></div>"

        document.getElementById("task").innerHTML += txt;

    }
}
function getValues(x) {
    

    arr[x].length = arr[x].et - arr[x].st;
    arr[x].width = arr[x].length * 80;
    arr[x].height = 1;
    var y = 0;
    var c = true;
    while (c) {
        c = false;
        for (var j = arr[x].st; j < arr[x].et; j++) {
            if (tb[arr[x].parent_id][y][j] != undefined) {
                c = true;
                y++;
                break;
            }
        }
    }


    arr[x].y = y;
    var temp = 0;
    for (i in arr) {
        if (arr[i].parent_id == x)
            if (arr[i].y+arr[i].height > temp)
                temp = arr[i].y+arr[i].height+2;
    }
    arr[x].height += temp;

    for (var j = arr[x].st; j < arr[x].et; j++) {
        for(var k=y; k<arr[x].height+y; k++)
        if (tb[arr[x].parent_id][k][j] != undefined) {
            tb[arr[x].parent_id][k][j] = false;
        }
        else {
            tb[arr[x].parent_id][k][j] = arr[x].name;
        }

    }

}
function createDiv(x) {
    
    var border_color;
    if (arr[i].status == "new")
        border_color = "#79ff8b";
    if (arr[i].status == "pending")
        border_color = "#ffb579";
    if (arr[i].status == "completed")
        border_color = "#798bff";

    var idName = "task"+arr[x].id;

    var newDiv=document.createElement("div");
    newDiv.setAttribute("id", idName);
    newDiv.className = "tasks";
    if (arr[x].length < 2)
        newDiv.className += " short"
    newDiv.style.width=(arr[x].length * w)+"px";
    if (arr[x].length > 1){
    newDiv.style.height=(arr[x].height * h)+"px";
    }
    newDiv.style.borderBottomColor=border_color;
    if(arr[x].parent_id==0){
        newDiv.style.left=((arr[x].st-1)*w)+"px"}
    else{
        newDiv.style.left=((arr[x].st-arr[arr[x].parent_id].st)*w)+"px";
    }
    newDiv.style.top=(((arr[x].y)*(h+20))+h)+"px";

    var newParagraph = document.createElement("P");
    newParagraph.innerHTML=arr[x].name;
    newDiv.appendChild(newParagraph);
    var elid="task"+arr[x].parent_id;
    if(arr[x].parent_id==0)
        elid="task"
    document.getElementById(elid).appendChild(newDiv);

    

    // var txt = "<div id='"
    // txt+="task";
    // txt+=arr[x].id
    // txt+="' class='tasks "
    // if (arr[x].length < 2)
    //     txt += "short "
    // txt += "' style='width: "
    // txt += arr[x].length * w;
    // if (arr[x].length > 1){
    // txt += "px; height: "
    // txt += (arr[x].height * h);
    // }
    // txt += "px; border-bottom-color: ";
    // txt += border_color;
    // txt +="; left: "
    // if(arr[x].parent_id==0){
    //     txt +=(arr[x].st-1)*w}
    // else{
    //     txt+=(arr[x].st-arr[arr[x].parent_id].st)*w;
    // }
    //     txt += "px; "
    //     txt += "top: "
    //     txt += ((arr[x].y)*(h+20))+h;
    //     txt+= "px'><p>"
    //     txt+=arr[x].name;
    //     txt+="</p></div>"
    //     var elid="task"+arr[x].parent_id;
    //     if(arr[x].parent_id==0)
    //     elid="task"
        
    //     document.getElementById(elid).innerHTML+=txt;

    for (i in arr) {
        if (arr[i].parent_id == arr[x].id) {

            createDiv(i)

        }
    }

}
function sort(arr) {
    for (i in arr) {
        arr[i].y = 0;
        arr[i].st = parseInt(arr[i].start_time[8] + arr[i].start_time[9]);
        arr[i].et = parseInt(arr[i].end_time[8] + arr[i].end_time[9]) + 1;
    }
    // for (i = 0; i < arr.length; i++) {
    //     min = i;
    //     for (j = i + 1; j < arr.length; j++) {


    //         if (startt[arr[i].id] < startt[arr[j].id]) {
    //             min = j;
    //         }
    //     }
    //     if (i != min) {
    //         var temp = arr[i];
    //         arr[i] = arr[min];
    //         arr[min] = temp;
    //     }
    // }

    var temp = [];
    for (i in arr) {
        temp[arr[i].id] = arr[i]

    }

    return (temp);
}