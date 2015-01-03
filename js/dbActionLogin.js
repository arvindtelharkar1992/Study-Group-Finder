function authenticate(){
	var users = database["Users"];
	var storageUsers = {};
	if (localStorage.getItem("Users") != null) {
		var jsonText = localStorage.getItem("Users");
		storageUsers = JSON.parse(jsonText);
	}
	
	var found = 0;
	for(var i=0;i<users.length;i++){
		if(document.getElementById("userName").value === users[i]["name"] && document.getElementById("password").value ===  users[i]["password"] ){
			 found = 1;
			 break;
		}
		if(storageUsers[i] != undefined && storageUsers[i] != undefined){
			if(document.getElementById("userName").value === storageUsers[i]["name"] && document.getElementById("password").value ===  storageUsers[i]["password"] ){
				found = 1;
				break;
			}	
		}
	}

	if(document.getElementById("userName").value === "" || document.getElementById("password").value === ""){
		if(document.getElementById("errordiv").getAttribute('style').indexOf('display:none') > -1){
			document.getElementById("errordiv").setAttribute('style','display:both');	
		}
		document.getElementById("errormessage").textContent = "Please enter your Username/Password!";
	}
	else if(found === 1){
		var jsonText = JSON.stringify(document.getElementById("userName").value);
		sessionStorage.setItem("CurrentUser",jsonText);
		window.location.href = "DashBoard.html";
	}
	else{
	  if(document.getElementById("errordiv").getAttribute('style').indexOf('display:none') > -1){
	    document.getElementById("errordiv").setAttribute('style','display:both');
	    document.getElementById("errormessage").textContent = "Username/Password Incorrect!";
	  }
	}
}

function register(){
	var users = database["Users"];
	var found = 0;
	
	for(var i=0;i<users.length;i++){
		if(document.getElementById("name").value === users[i]["name"] || document.getElementById("email").value ===  users[i]["email"] ){
			 found = 1;
			 break;
		}
	}
	
	if(document.getElementById("name").value === "" || document.getElementById("email").value === "" || document.getElementById("newpassword").value === "" || document.getElementById("major").value === "" || document.getElementById("degree").value === ""){
		if(document.getElementById("errordivsignup").getAttribute('style').indexOf('display:none') > -1){
			document.getElementById("errordivsignup").setAttribute('style','display:compact;width:100%;margin-top:2%');
		}
		document.getElementById("errormessagesignup").textContent = "You have not entered all the required details!";
		return 0;
	}
	else if(found === 1){
		if(document.getElementById("errordivsignup").getAttribute('style').indexOf('display:none') > -1){
			document.getElementById("errordivsignup").setAttribute('style','display:compact;width:100%;margin-top:2%');
		}
		document.getElementById("errormessagesignup").textContent = "Username/Email already registered!";
		return 0;
	}
	else{
		savefirstPageData();
		return 1;
	}
}

var newUser = {};
newUser["name"]=[];
newUser["email"] = [];
newUser["password"] =[];
newUser["major"]=[];
newUser["degree"]=[];
newUser["class"]=[];
newUser["to"]=[];
newUser["from"]=[];
newUser["day"]=[];
	
function savefirstPageData(){
	newUser["name"].push(document.getElementById("name").value);
	newUser["email"].push(document.getElementById("email").value);
	newUser["password"].push(document.getElementById("newpassword").value);
	newUser["major"].push(document.getElementById("major").value);
	newUser["degree"].push(document.getElementById("degree").value);
}

function addClass(){
if(document.getElementById("classSchedule").value != "" || document.getElementById("timeTo").value != "" || document.getElementById("timeFrom").value != "" ||
document.getElementById("selectdays").value != ""){
	newUser["class"].push(document.getElementById("classSchedule").value);
	newUser["to"].push(document.getElementById("timeTo").value);
	newUser["from"].push(document.getElementById("timeFrom").value);
	newUser["day"].push(document.getElementById("selectdays").value);
	if(document.getElementById("errordivsignup").getAttribute('style').indexOf('display:none') > -1){
			document.getElementById("errordivsignup").setAttribute('style','display:none;width:100%;margin-top:2%');
	}
	var jsonText = JSON.stringify(newUser);
	localStorage.setItem("Users", jsonText);
	window.location.href = "DashBoard.html";
}
else{
	if(document.getElementById("errordivsignup").getAttribute('style').indexOf('display:none') > -1){
			document.getElementById("errordivsignup").setAttribute('style','display:compact;width:100%;margin-top:2%');
		}
	document.getElementById("errormessagesignup").textContent = "You have not entered all the required details!";
}
}