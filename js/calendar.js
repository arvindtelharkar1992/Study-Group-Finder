    $(document).ready(function(){    
	
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
		var eventsFromDB = getMyEvents();
        $('#calendar').fullCalendar({
			defaultView: 'basicWeek',
            editable: true,
			events: eventsFromDB
            /*events: [
                {
                    title: 'All Day Event',
                    start: new Date(y, m, 1)
                },
                {
                    title: 'Long Event',
                    start: new Date(y, m, d-5),
                    end: new Date(y, m, d-2)
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: new Date(y, m, d-3, 16, 0),
                    allDay: false
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: new Date(y, m, d+4, 16, 0),
                    allDay: false
                },
                {
                    title: 'Meeting',
                    start: new Date(y, m, d, 10, 30),
                    allDay: false
                },
				{
                    title: 'Meeting 2',
                    start: new Date(y, m, d, 12, 30),
                    allDay: false
                },
                {
                    title: 'Lunch',
                    start: new Date(y, m, d, 12, 0),
                    end: new Date(y, m, d, 14, 0),
                    allDay: false
                },
                {
                    title: 'Birthday Party',
                    start: new Date(y, m, d+1, 19, 0),
                    end: new Date(y, m, d+1, 22, 30),
                    allDay: false
                }
            ]*/
        });
    });

	
function getMyEvents(){
		var meetings = getMyMeetings();
		var classes = getMyClasses();
		var events = [];
		
		for(var i=0;i<meetings.length;i++){
			newEvent = {};
			newEvent.title = meetings[i]["name"];
			newEvent.start = new Date(Date.parse(meetings[i]["date"]+" "+meetings[i]["from"]));
			newEvent.end = new Date(Date.parse(meetings[i]["date"]+" "+meetings[i]["to"]));
			newEvent.allDay = false;
			events.push(newEvent);
		}
		var j=0;
		while(classes[j] != null){
			var i=0;
			   while(classes[j][i] != null){
				var  k=0;
				while(classes[j][i][k] !=null){
				newClassEvent = {};
				newClassEvent.title =classes[j][i][k]["name"];
				newClassEvent.start =new Date(Date.parse(classes[j][i][k]["date"]+" "+classes[j][i][k]["from"]));
				newClassEvent.end = new Date(Date.parse(classes[j][i][k]["date"]+" "+classes[j][i][k]["to"]));
				newClassEvent.allDay = false;
				events.push(newClassEvent);
				k++;
				}
				i++;
			}
			j++
		}
		
		return events;
}