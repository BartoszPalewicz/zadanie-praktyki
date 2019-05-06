var obj2=[];

var myObj=$.get('zadanie.json', function(data){
    createTimeline(data)
});
var startt=[];
var endt=[];


function createTimeline(arr){
    for (x in arr) {
        obj2[x]=arr[x];
    }
            
            sort(arr);

        
        for (x in arr) {
            if(arr[x].parent_id==null||arr[x].parent_id==""){
                arr[x].parent_id="";
                createDiv(x, arr);
                search_arr(x, arr);
            }
        }
        
        
    console.log(arr);
    
}

function search_arr(i, arr){
    for (x in arr) {
        if(arr[x].parent_id==arr[i].id){
            createDiv(x, arr);
            search_arr(x, arr)
        }
    }
}

function createDiv(i, arr){
    var txt="";
    if(endt[arr[i].parent_id]==undefined)
{    var width=parseFloat(((endt[arr[i].id]-startt[arr[i].id])/24)*100);
}    else{
var width=parseInt(((endt[arr[x].id]+1-startt[arr[x].id])/(endt[arr[i].parent_id]+1-startt[arr[i].parent_id]))*100);

}

    width+="%";
    console.log(width);
    var parId="task";
    if(arr[i].parent_id!=null||arr[i].parent_id!="")
    parId += arr[i].parent_id;
    
    

    txt="<div class='tasks' id='task";
    txt+=arr[i].id;
    txt+="' width='"
    txt+=width;
    txt+="' style='left:"
    //txt+=
    txt+="%' ><p"
    
    txt+=">"
    txt+=arr[i].name;
    txt+="</p></div>"
    console.log(txt);
    console.log(parId);
    document.getElementById(parId).innerHTML += txt;
    
}
function sort(arr){
    for (i in arr){
        startt[arr[i].id]=parseInt(arr[i].start_time[8]+arr[i].start_time[9]);
        endt[arr[i].id]=parseInt(arr[i].end_time[8]+arr[i].end_time[9]);
    }
    for (i=0; i < arr.length; i++){
        min = i;
        for (j=i+1; j < arr.length; j++){
            

            if ( startt[arr[i].id]<  startt[arr[j].id]){
                min = j;
            }
        }
        if (i != min){
            var temp = arr[i];
            arr[i] = arr[min];
            arr[min] = temp;
        }
    }

    return(arr);
}