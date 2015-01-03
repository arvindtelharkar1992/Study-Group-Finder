window.addEventListener('DOMContentLoaded', function(e) { 
document.getElementById("person").innerHTML = "Welcome, " +JSON.parse(sessionStorage.getItem("CurrentUser"));
}, false);

function createGroup(){

	var groups = database["Groups"];
	var found = 0;
	var storageGroups = {};
	var newGroup = {};
	newGroup["name"]=[];
	newGroup["topic"] = [];
	newGroup["members"] =[];
	
	for(var i=0;i<groups.length;i++){
		if(document.getElementById("groupName").value === groups[i]["name"] || document.getElementById("topic").value ===  groups[i]["topic"] ){
			 found = 1;
			 break;
		}
	}
	
	if (localStorage.getItem("Groups") != null) {
			var jsonText = localStorage.getItem("Groups");
			storageGroups = JSON.parse(jsonText);
	}
	var storageFound=0;
	//check if group is in localstorage, 
	//for(var i=0;i<storageGroups.length;i++){ --1 group*/
			if(storageGroups["name"] != undefined && storageGroups["topic"]!= undefined){
				if(document.getElementById("groupName").value  === storageGroups["name"]){
					storageFound = 1;
				}	
			}
	//}

	if(document.getElementById("groupName").value === "" || document.getElementById("topic").value === "" || (document.getElementById('members').value === "" && members[0] === undefined)){
		if(document.getElementById("errordivcreategroup").getAttribute('style').indexOf('display:none') > -1){
			document.getElementById("errordivcreategroup").setAttribute('style','display:both');
		}
		document.getElementById("errormessagecreategroup").textContent = "You have not entered all the required details!";
	}
	else if(found === 1 || storageFound === 1){
		if(document.getElementById("errordivcreategroup").getAttribute('style').indexOf('display:none') > -1){
			document.getElementById("errordivcreategroup").setAttribute('style','display:both');
		}
		document.getElementById("errormessagecreategroup").textContent = "Group with this name/topic already exists!";
	}
	else{
	  if(document.getElementById("errordivcreategroup").getAttribute('style').indexOf('display:none') > -1){
	    document.getElementById("errordivcreategroup").setAttribute('style','display:both');
	  }
		document.getElementById("errormessagecreategroup").textContent = "Group Created!";
		newGroup["name"] = document.getElementById("groupName").value;
		newGroup["topic"] = document.getElementById("topic").value;
		newGroup["members"] = members;
		if(document.getElementById('members').value != "")
			newGroup["members"].push(document.getElementById('members').value);
		var jsonText = JSON.stringify(newGroup);
		localStorage.setItem("Groups", jsonText);
	}
	var notify = {};
	notify["members"]=[];
	notify["message"]=[];
	notify["members"] = members;
	notify["message"] = "You have been added to group: " + document.getElementById("groupName").value;
	var newjsonText = JSON.stringify(notify);
	localStorage.setItem("Notifications", newjsonText);
}

var members=[];
function addMember(){
	var newMember = document.getElementById('members').value;
	var storageUsers = {};
	if (localStorage.getItem("Users") != null) {
			var jsonText = localStorage.getItem("Users");
			storageUsers = JSON.parse(jsonText);
	}
	var found=0;
		//check if user is in database
		var users = database["Users"];
		for(var i=0;i<users.length;i++){
			if(newMember === users[i]["name"] ){
				found = 1;
				break;
			}
			if(storageUsers["name"][i] != undefined && storageUsers["password"][i] != undefined){
				if(newMember === storageUsers["name"][i]){
					found = 1;
					break;
				}	
			}
	}

	if(newMember === ""){
		if(document.getElementById("errordivcreategroup").getAttribute('style').indexOf('display:none') > -1){
			document.getElementById("errordivcreategroup").setAttribute('style','display:block');
		}
		document.getElementById("errormessagecreategroup").textContent = "Please enter a member name!";
	}
	else if(found ===0){
			if(document.getElementById("errordivcreategroup").getAttribute('style').indexOf('display:none') > -1){
			document.getElementById("errordivcreategroup").setAttribute('style','display:both');
			}
			document.getElementById("errormessagecreategroup").textContent = "The member name entered is not registered!";
	}
	else{
		document.getElementById("errordivcreategroup").setAttribute('style','display:none');
		members.push(newMember);
	}
}


function getMyGroups(){
	var username = JSON.parse(sessionStorage.getItem("CurrentUser"));
	var groups = [];
	var index = 0;
	var storageGroups=[];
	//check in database
	var groupDB = database["Groups"];
	for(var i=0;i<groupDB.length;i++){
		if(groupDB[i]["members"].indexOf(username) > -1){
			groups[index]= [];
			groups[index]["name"] = [];
			groups[index]["topic"] = [];
			groups[index]["members"] = [];
			groups[index]["name"] = groupDB[i]["name"];
			groups[index]["topic"] = groupDB[i]["topic"];
			groups[index]["members"] = groupDB[i]["members"];
			index++;
		}
	}
	
	//check in localstorage
	if (localStorage.getItem("Groups") != null) {
			var jsonText = localStorage.getItem("Groups");
			storageGroups = JSON.parse(jsonText);
	}
	var storageFound=0;
	//check if group is in localstorage, 
	//for(var i=0;i<storageGroups.length;i++){ --1 group*/
	if(storageGroups["name"] != undefined && storageGroups["topic"]!= undefined && (storageGroups["members"].indexOf(username) > -1)){
				groups[index]= [];
				groups[index]["name"] = [];
				groups[index]["topic"] = [];
				groups[index]["members"] = [];
				groups[index]["name"] = storageGroups["name"];
				groups[index]["topic"] = storageGroups["topic"];
				groups[index]["members"] = storageGroups["members"];
	}
	//}
	
	return groups;	
}

var newMeeting = {};
newMeeting["name"]=[];
newMeeting["groups"] =[];
newMeeting["to"]=[];
newMeeting["from"] = [];
newMeeting["date"] =[];
newMeeting["place"] =[];

function createMeeting(){
	var meetings = database["Meetings"];
	var found = 0;
	var storageMeetings = {};
	
	
	for(var i=0;i<meetings.length;i++){
		if(document.getElementById("meetingName").value === meetings[i]["name"]){
			 found = 1;
			 break;
		}
	}
	
	if (localStorage.getItem("Meetings") != null) {
			var jsonText = localStorage.getItem("Meetings");
			storageMeetings = JSON.parse(jsonText);
	}
	var storageFound=0;
	//check if group is in localstorage, 
	//for(var i=0;i<storageGroups.length;i++){ --1 group*/
			if(storageMeetings["name"] != undefined){
				if(document.getElementById("meetingName").value  === storageMeetings["name"]){
					storageFound = 1;
				}	
			}
	//}

	if(document.getElementById("meetingName").value === "" || document.getElementById("timefrom").value === "" || (document.getElementById('timeto').value === "") || (document.getElementById('date').value === "") || (document.getElementById('place').value === "")){
		if(document.getElementById("errordivcreatemeeting").getAttribute('style').indexOf('display:none') > -1){
			document.getElementById("errordivcreatemeeting").setAttribute('style','display:block');
		}
		document.getElementById("errormessagecreatemeeting").textContent = "You have not entered all the required details!";
		return 0;
	}
	else if(found === 1 || storageFound === 1){
		if(document.getElementById("errordivcreatemeeting").getAttribute('style').indexOf('display:none') > -1){
			document.getElementById("errordivcreatemeeting").setAttribute('style','display:block');
		}
		document.getElementById("errormessagecreatemeeting").textContent = "Meeting with this name already exists!";
		return 0;
	}
	else{
		newMeeting["name"]=document.getElementById("meetingName").value;
		newMeeting["to"]=document.getElementById("timeto").value;
		newMeeting["from"] = document.getElementById("timefrom").value;
		newMeeting["date"] =document.getElementById("date").value;
		newMeeting["place"] =document.getElementById("place").value;
		return 1;
	}
}

//needs to be checked
function addMeetingGroups(index){
		//if(document.getElementById('members').value != "")
		newMeeting["groups"].push("Group "+index);
		var jsonText = JSON.stringify(newMeeting);
		localStorage.setItem("Meetings", jsonText);
		alert("Meeting has been added to your schedule");
}

function getMyMeetings(){
	var groups = getMyGroups();
	var meetings = [];
	var index = 0;
	
	//check in database
	var meetingDB = database["Meetings"];
	for(var i=0;i<meetingDB.length;i++){
		for(var j=0;j<groups.length;j++){
		if(meetingDB[i]["groups"].indexOf(groups[j]["name"]) > -1){
			meetings[index]= [];
			meetings[index]["name"] = [];
			meetings[index]["to"] = [];
			meetings[index]["from"] = [];
			meetings[index]["place"] =[];
			meetings[index]["groups"] = [];
			meetings[index]["name"] = meetingDB[i]["name"];
			meetings[index]["to"] = meetingDB[i]["to"];
			meetings[index]["from"] = meetingDB[i]["from"];
			meetings[index]["date"] = meetingDB[i]["date"];
			meetings[index]["place"] = meetingDB[i]["place"];
			meetings[index]["groups"] = meetingDB[i]["groups"];
			index++;
		}
		}
	}
	
	//check in localstorage
	var storageMeetings = [];
	if (localStorage.getItem("Meetings") != null) {
			var jsonText = localStorage.getItem("Meetings");
			storageMeetings = JSON.parse(jsonText);
	}
	//console.log(storageMeetings);
	if(storageMeetings["name"] != undefined && storageMeetings["to"]!= undefined && storageMeetings["from"] != "undefined"){
		//for(var j=0;j<groups.length;j++){
			//if(storageMeetings["groups"].indexOf(groups[j]["name"]) > -1){
			meetings[index]= [];
			meetings[index]["name"] = [];
			meetings[index]["to"] = [];
			meetings[index]["from"] = [];
			meetings[index]["place"] =[];
			meetings[index]["groups"] = [];
			meetings[index]["name"] =storageMeetings["name"];
			meetings[index]["to"] = storageMeetings["to"];
			meetings[index]["from"] = storageMeetings["from"];
			meetings[index]["date"] = storageMeetings["date"];
			meetings[index]["place"] = storageMeetings["place"];
			meetings[index]["groups"] = storageMeetings["groups"];
			index++;
			//}
		//}
	}
	
	
	return meetings;	
}


function setCalendar(){

}


function displayNotifications(){
	var image = document.getElementById("uparrow");
	var list = document.getElementById("notifyList");
	if(image.getAttribute('style').indexOf('display:none') > -1 || list.getAttribute('style').indexOf('display:none') > -1 ){
		image.setAttribute('style','display:block;margin-left:90%;position:absolute;top:37px;');
		list.setAttribute('style','display:both;margin-left:60%;color:black;z-index:99;position:absolute;width:30%;margin-left:68%;margin-top:0px;');
		
		setNotification();
	 }
	 else{
		image.setAttribute('style','display:none');
		list.setAttribute('style','display:none');
	 }	 
}

function setNotification(){
  var notifications = [];
  if(sessionStorage.getItem("CurrentUser") != null){
  
	var currUser = JSON.parse(sessionStorage.getItem("CurrentUser"));
	
	if (localStorage.getItem("Notifications") != null) {
		var jsonText = localStorage.getItem("Notifications");
		notifications=(JSON.parse(jsonText));
	}
	
	if(notifications.length != 0){
		if(notifications["members"].indexOf(currUser) > -1){
			var sender;
			for(var i=0;i<notifications["members"].length;i++){
				if(notifications["members"][i] != currUser){
					sender = notifications["members"][i];
					break;
				}
			}
			document.getElementById("notifyName").innerHTML = sender;
			document.getElementById("notifyPara").innerHTML = notifications["message"];
		}
	}
	else{
		document.getElementById("notifyName").innerHTML = "No new notifications";
		document.getElementById("notifyPara").innerHTML = "";
	}
  }
}


function getMyClasses(){
var classes = {};
var users = database["Users"];
var storageUsers = [];
var currUser = JSON.parse(sessionStorage.getItem("CurrentUser"));

if (localStorage.getItem("Users") != null) {
	var jsonText = localStorage.getItem("Users");
	storageUsers = JSON.parse(jsonText);
}
	
var index = 0;
for(var i=0;i<users.length;i++){
	if(currUser === users[i]["name"]){
		 classes[index] = [];
		 classes[index].push(users[i]["class"]);
		 index++;
	}
}

for(var i=0;i<storageUsers.length;i++){
	if(storageUsers[i] != undefined && storageUsers[i] != undefined){
		if(storageUsers[i]["name"] === currUser && storageUsers[i]["class"] != undefined){
			 classes[index] = [];
			 classes[index].push(storageUsers[i]["class"]);
			 index++;
		}	
	}
}
return classes;
}


function getAllGroups(){
	var groups = [];
	var index = 0;
	var storageGroups=[];
	//check in database
	var groupDB = database["Groups"];
	for(var i=0;i<groupDB.length;i++){
			groups[index]= [];
			groups[index]["name"] = [];
			groups[index]["topic"] = [];
			groups[index]["members"] = [];
			groups[index]["name"] = groupDB[i]["name"];
			groups[index]["topic"] = groupDB[i]["topic"];
			groups[index]["members"] = groupDB[i]["members"];
			index++;
	}
	
	//check in localstorage
	if (localStorage.getItem("Groups") != null) {
			var jsonText = localStorage.getItem("Groups");
			storageGroups = JSON.parse(jsonText);
	}
	var storageFound=0;
	//check if group is in localstorage, 
	//for(var i=0;i<storageGroups.length;i++){ --1 group*/
	if(storageGroups["name"] != undefined && storageGroups["topic"]!= undefined){
				groups[index]= [];
				groups[index]["name"] = [];
				groups[index]["topic"] = [];
				groups[index]["members"] = [];
				groups[index]["name"] = storageGroups["name"];
				groups[index]["topic"] = storageGroups["topic"];
				groups[index]["members"] = storageGroups["members"];
	}
	//}
	
	return groups;	
}



function addUserToGroup(index){
	//get user object from the database
	var username = JSON.parse(sessionStorage.getItem("CurrentUser"));
	var users = database["Users"];
	var currUser=[];
	var storageUsers = {};
	if (localStorage.getItem("Users") != null) {
		var jsonText = localStorage.getItem("Users");
		storageUsers = JSON.parse(jsonText);
	}
	
	var found = 0;
	for(var i=0;i<users.length;i++){
		if(username === users[i]["name"]){
			 currUser=users[i];
			 found=1;
		}
	}
	
	if(found != 1){
	if(storageUsers[0] != undefined && storageUsers[0] != undefined){
			if(username === storageUsers[0]["name"]){
				currUser=storageUsers[0];
			}	
	}
	}

	//modify its group
	currUser["groups"].push(index);
	
	//add it to localstorage
	var jsonText = JSON.stringify(currUser);
	localStorage.setItem("Users", jsonText);
	alert("You are added to the group.");
}


function removeMeFromGroup(groupName){
	//get the user
	var username = JSON.parse(sessionStorage.getItem("CurrentUser"));
	var users = database["Users"];
	var currUser=[];
	var storageUsers = {};
	if (localStorage.getItem("Users") != null) {
		var jsonText = localStorage.getItem("Users");
		storageUsers = JSON.parse(jsonText);
	}
	
	var found = 0;
	for(var i=0;i<users.length;i++){
		if(username === users[i]["name"]){
			 currUser=users[i];
			 found=1;
		}
	}
	
	if(found != 1){
	if(storageUsers[0] != undefined && storageUsers[0] != undefined){
			if(username === storageUsers[0]["name"]){
				currUser=storageUsers[0];
			}	
	}
	}
	
	//modify this user's group and save
	var groups = [];
	var index = 0;
	for(var i=0;i<currUser["groups"].length;i++){
		if(currUser["groups"][i] != groupName){
			groups[index] = (currUser["groups"][i]);
			index++;
		}
	}
	currUser["groups"] = groups;
	alert("You have been successfully removed from the group.");
}




