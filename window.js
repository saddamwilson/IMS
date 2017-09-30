var path = require('path');
var DataStore = require('nedb');
var db = new DataStore({filename:'device.db', autoload:true})
var nodeConsole = require('console');
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
var xlsx = require('node-xlsx');
var dbkey = ['type','name','ipAddress','hostPort','adbPort','serialPort','controlPort','country']

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
    var selectresult = {};
    selectresult[options[index].value] = sql.value;
    db.find(selectresult, function(err, newDoc){
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

function uploadinformation(){
    myConsole.log("uploadinformation");
    var id = document.getElementById("excelid");
    var obj = xlsx.parse(id.files[0].path)
    
    var arrayinfo = new Array();
    for(var i=1; i<obj[0].data.length; i++)
    {
        var info = {};
        myConsole.log("yuzhehui" + obj[0].data[i]);
        for(var j=0; j<obj[0].data[i].length; j++)
        {
            info[dbkey[j]] = obj[0].data[i][j];
            myConsole.log("info: " + JSON.stringify(info));
        }
        arrayinfo.push(info);
        // info = {};
        myConsole.log("arrayinfo : " + JSON.stringify(arrayinfo));
    }
    db.insert(arrayinfo, function(err, newDoc){
        myConsole.log("err" + err);
    })

    myConsole.log("id.value: " + id.files[0].path);
}
// document.addEventListener('DOMContentLoaded', function() {
//   document.getElementById("basic").addEventListener("click", doNotify);
//   document.getElementById("image").addEventListener("click", doNotify);
//   //document.getElementById("login").addEventListener("click", saveinformation);
// })


