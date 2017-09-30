var path = require('path');
var DataStore = require('nedb');
var db = new DataStore({filename:'device.db', autoload:true})
var nodeConsole = require('console');
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
myConsole.log("nihao");

function saveinformation(){
    myConsole.log("saveinformation");
    var form = document.getElementById('login'); 
    var tagElements = form.getElementsByTagName('input');
    var deviceinfo = {};
    for (var j = 0; j < tagElements.length-1; j++){ 
        myConsole.log(tagElements[j].value);
        deviceinfo[tagElements[j].name] = tagElements[j].value;
    } 
    db.insert(deviceinfo, function(err, newDoc){
        myConsole.log("err" + err);
    })
}


function queryinformation(){
    myConsole.log("queryinformation");

    var select = document.getElementById('se');
    var sql = document.getElementById('sql');
    var options = select.options;
    var index = select.selectedIndex;  
    var select = {};
    select[options[index].value] = sql.value;
    db.find(select, function(err, newDoc){
        //myConsole.log("err" + err);
        myConsole.log("newDoc: " + JSON.stringify(newDoc));
        updataList(newDoc);

    })
}

function updataList(list){
    myConsole.log("updataList");
    for(item in list)
    {
        var newEl = document.createElement('tr');
        delete list[item]._id;
        for(itemsecond in list[item])
        {
            myConsole.log("item[itemsecond]: "+ list[item][itemsecond]);
            var newElSecond = document.createElement('th');
            newEl.appendChild(newElSecond);
            var newText = document.createTextNode(list[item][itemsecond]);
            newElSecond.appendChild(newText);
        }
        
        var position = document.getElementsByTagName('table')[0];
        position.appendChild(newEl);
    }
}

// document.addEventListener('DOMContentLoaded', function() {
//   document.getElementById("basic").addEventListener("click", doNotify);
//   document.getElementById("image").addEventListener("click", doNotify);
//   //document.getElementById("login").addEventListener("click", saveinformation);
// })
