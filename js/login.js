var memberContent =""
var classContent =""
$( document ).ready(function() {
localStorage.setItem("expandedIndex",0);
localStorage.setItem("expandedMeetingIndex",0);
localStorage.setItem("nextBtnVal", 1);
createGroupContent();
createMeetingContent();


$( "#signUpLink" ).click(function() {

$("#loginDiv").hide();
$("#signUpLinkDiv").hide();
$("#signUpDiv").show();

});



$( "#nextBtn" ).click(function() {
var value = register();
if(value === 1){
$("#signupPage").hide();
$("#enterClassDetails").show();
$("#signUpBtn").show();
$( "#nextBtn" ).hide();
document.getElementById("addMoreClass").setAttribute('style','color:black;font-size: 12px;float: right;margin-right: 10%;display:both');
document.getElementById("errordivsignup").setAttribute('style','display:none');
}
});

$( "#addMoreClass" ).click(function() {
document.getElementById("classSchedule").value = '';
document.getElementById("timeFrom").value = '';
document.getElementById("timeTo").value = '';
document.getElementById("selectdays").value = '';
});

$( "#goBtn" ).click(function() {
var value = $("input[name='radio-mini']:checked").val();
if(value == "choice-1")
{
$("#findGroupDiv").hide();
$("#byMajorDiv").hide();
$("#byNameDiv").show();
createByNameContent();
}

else if(value == "choice-2")
{
$("#findGroupDiv").hide();
$("#byNameDiv").hide();
$("#byMajorDiv").show();
createByMajorContent();
}

});


$("#createMeetingBtn").click(function(){
var success = createMeeting();
if(success){
$("#createGroupContent").hide();
$("#groupstoBeAdded").show();
createMeetingGroupList();
}
});

$("#backButton").click(function(){
if(localStorage.getItem("nextBtnVal") == 0)
{
    $("#loginDiv").show();
    $("#signUpLinkDiv").show();
    $("#signUpDiv").hide();
    localStorage.setItem("nextBtnVal", 1) ;
}
else{
    $("#signupPage").show();
    $("#nextBtn").show();
    localStorage.setItem("nextBtnVal", 0) ;
}
});
 

$("#signUpBtn").click(function(){
addClass();
});

$("#logout").click(function(){
window.location.href = "Login.html";
});

$("#submitBtn").click(function(){
authenticate();
});

$("#contentLink1").click(function(){

  menubarContent(1);
});
$("#contentLink2").click(function(){

  menubarContent(2);
});
$("#contentLink3").click(function(){

  menubarContent(3);
});
$("#contentLink4").click(function(){

  menubarContent(4);
});
$("#contentLink5").click(function(){

  menubarContent(5);
});
$("#contentLink6").click(function(){

  menubarContent(6);
});
$("#contentLink7").click(function(){

  menubarContent(7);
});

$("#createGrpBtn").click(function(){
	createGroup();
});

$( "#editBtn" ).click(function() {

$("#editContactDetails").show();
$("#contactDetailsList").hide();
});

$( "#editContactBtn" ).click(function() {


$("#editContactDetails").hide();
$("#contactDetailsList").show();
//details go here for editing
});

$("#addBtn").click(function(){
var memberName = $("#members").val();
addMember();
if(document.getElementById("errordivcreategroup").getAttribute('style').indexOf('display:none') != -1){
if(memberName != "")
memberListGenerate(memberName);
}
});




$("#addClassBtn").click(function(){
var className = $("#classSchedule").val();
var timeFrom = $("#timeFrom").val();
var timeTo = $("#timeTo").val();
if(className == "" || timeFrom =="" || timeTo =="" )
alert("Please enter a member name");
else
classList(className,timeFrom,timeTo);
});

});




function createMeetingGroupList(){
var content ="";
groups = getMyGroups();
if(groups.length ===0){
	alert("You are not in any group");
}
else{
for(var i = 0; i < groups.length; i++)
{
content += "<div class='ui-block-a' id =i style='border-right: 1px solid #909090; border-bottom: 1px solid #909090; height:30px;width:80%;text-align:center;padding-top:1.6%;'>Group "+groups[i]["name"]+"</div><div class='ui-block-b' style='width:19.8%;border-bottom: 1px solid #909090; height:40px; '><img id='addGroupBtn"+i+"' onclick='joinGroupForMeeting("+i+")' src='../images/add_icon.png' height='20' width='20' style='float:left;margin-top:8%;margin-left: 7%;'/><p style='margin: 10% 0 0 30%;'>Add Group</p></div>";

}
}

$("#groupsAdded").html(content);
}





function classList(className,timeFrom,timeTo){

classContent = "<p><label>"+className+"</label><label>  "+timeFrom+"</label><label>  "+timeTo+"</label></p>";
$("#classList").append(classContent);
$("#classList").show();
$("#classSchedule").removeAttr('value');
$("#timeFrom").removeAttr('value');
$("#timeTo").removeAttr('value');
}

function memberListGenerate(memberName){
memberContent = "<p>"+memberName+"</p>";
$("#memberList").append(memberContent);
$("#memberList").show();
$("#members").removeAttr('value');
}


function menubarContent(number){


$("#contentDetails"+number).show();
$("#contentLink"+number).addClass("open");

for(var i = 1; i<8; i++)
{
if(i!=number)
{
$("#contentDetails"+i).hide();
$("#contentLink"+i).removeClass("open");
}
}
}

var groups;
function createGroupContent(){
var content = "";
groups = getMyGroups();
	if(groups.length ===0 && sessionStorage.getItem("CurrentUser") != null){
		alert("You have not joined any group.");
	}
	else{
		 for(var i = 0; i < groups.length; i++)
        {
        content += "<div id='groupContent"+(i+1)+"' class='expandDiv'><h3 style='float:left;margin-left:20%;'>Group Name: "+groups[i]["name"]+"</h2><img id='expandableIcon"+(i+1)+"' onclick='expandedContentFunction("+(i+1)+")' src='../images/down_arrow.png' class='arrowCss'/><ul id='expandableContent"+(i+1)+"' data-role='listview' data-inset='false' style='display:none;margin-top:8%;font-size:104%;list-style-type:none;'><li>Members :"+groups[i]["members"][0]+", "+groups[i]["members"][1]+"</li><li>Topic :"+groups[i]["topic"][0]+" </li><li><img id='leaveBtn"+(i+1)+"' onclick='leaveGroupByMajor("+(i+1)+","+groups[i]["name"]+")' src='../images/leave_icon.png' height='20' width='20' style='margin-left: 37%;margin-top:2%;'/><label style='font-size: 130%;margin-left: 2%;'>Leave Group</label></li></ul></div>";
        }

		$("#myGroupContent").html(content);
}
}


function expandedContentFunction(index)
{
if(localStorage.expandedIndex == index) 
{

$("#expandableContent"+index).hide();
$("#groupContent"+index).css("height","40px");
$("#expandableIcon"+index).attr("src", "../images/down_arrow.png");
localStorage.setItem("expandedIndex",0);
}

else
{
localStorage.setItem("expandedIndex",index);

$("#expandableContent"+index).show();
$("#groupContent"+index).css("height","120px");
$("#expandableIcon"+index).attr("src", "../images/up_arrow.png");

for(var i = 0; i<8; i++)
{
if(i!=index)
{
$("#expandableContent"+i).hide();
$("#groupContent"+i).css("height","40px");
$("#expandableIcon"+i).attr("src", "../images/down_arrow.png");
}
}
}

}

function createMeetingContent(){
var content = "";
var meetings = getMyMeetings();
if(meetings.length ===0 && sessionStorage.getItem("CurrentUser") != null){
		alert("You have no meetings scheduled.");
}
else{
for(var i = 0; i < meetings.length; i++)
{

content += "<div id='meetingContent"+(i+1)+"' class='expandDiv'><h3 style='float:left;margin-left:20%;'>Meeting Name: "+meetings[i]["name"]+"</h2><img id='expandableIcon"+(i+1)+"' onclick='expandedMeetingContentFunction("+(i+1)+")' src='../images/down_arrow.png' class='arrowCss'/><ul id='expandableMeetingContent"+(i+1)+"' data-role='listview' data-inset='false' style='display:none;margin-top:8%;font-size:104%;'><li>Place: "+meetings[i]["place"]+"</li><li>Next Meeting: "+meetings[i]["to"]+"-"+meetings[i]["from"]+"</li></ul></div>";
}

$("#myMeetingContent").html(content);
}
}


function expandedMeetingContentFunction(index)
{
if(localStorage.expandedMeetingIndex == index) 
{

$("#expandableMeetingContent"+index).hide();
$("#meetingContent"+index).css("height","40px");
$("#expandableIcon"+index).attr("src", "../images/down_arrow.png");
localStorage.setItem("expandedMeetingIndex",0);
}

else
{
localStorage.setItem("expandedMeetingIndex",index);

$("#expandableMeetingContent"+index).show();
$("#meetingContent"+index).css("height","100px");
$("#expandableIcon"+index).attr("src", "../images/up_arrow.png");

for(var i = 1; i<8; i++)
{
if(i!=index)
{
$("#expandableMeetingContent"+i).hide();
$("#meetingContent"+i).css("height","40px");
$("#expandableIcon"+i).attr("src", "../images/down_arrow.png");
}
}
}

}



function createByNameContent(){
var content ="";
var groups = getAllGroups();
if(groups.length ===0 && sessionStorage.getItem("CurrentUser") != null){
		alert("There are no groups");
}
else{
for(var i = 1; i < groups.length; i++)
{
content += "<div class='ui-block-a' style='border-right: 1px solid #909090; border-bottom: 1px solid #909090; height:30px;width:80%;text-align:center;padding-top:1.6%;'>Group Name:"+groups[i-1]["name"]+"</div><div class='ui-block-b' style='width:19.8%;border-bottom: 1px solid #909090; height:40px; '><img id='joinBtn"+i+"' onclick='joinGroupByName("+i+")' src='../images/add_icon.png' height='20' width='20' style='float:left;margin-top:8%;margin-left: 7%;'/><p style='margin: 10% 0 0 30%;'>Join</p></div>";

}

$("#byNameDivContent").html(content);
}
}

function joinGroupByName(index)
{
addUserToGroup(index);
//alert("join group"+index);
}


function createByMajorContent(){
var content ="";
var groups = getAllGroups();
if(groups.length ===0 && sessionStorage.getItem("CurrentUser") != null){
		alert("There are no groups");
}
else{
for(var i = 1; i < groups.length; i++)
{
content += "<div class='ui-block-a' style='border-right: 1px solid #909090; border-bottom: 1px solid #909090; height:30px;width:80%;text-align:center;padding-top:1.6%;'>Topic: "+groups[i-1]["topic"][i-1]+", "+groups[i-1]["topic"][i]+", "+groups[i-1]["topic"][i+1]+"</div><div class='ui-block-b' style='width:19.8%;border-bottom: 1px solid #909090; height:40px; '><img id='joinBtn"+i+"' onclick='joinGroupByMajor("+i+")' src='../images/add_icon.png' height='20' width='20' style='float:left;margin-top:8%;margin-left: 7%;'/><p style='margin: 10% 0 0 30%;'>Join</p></div>";

}

$("#byMajorDivContent").html(content);
}
}

function joinGroupByMajor(index)
{
addUserToGroup(index);
//alert("join group"+index);
}




function joinGroupForMeeting(index)
{
addMeetingGroups(index);
//alert("add group"+index+" for Meeting");
}


function leaveGroupByMajor(index){
removeMeFromGroup(index);
}