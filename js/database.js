var database= {
"Users":
     [  
      {"name": "Shashank",
        "password" : "1234",
        "email": "shashank@gmail.com",
        "major": "computer science",
        "degree": "MS",
		"class": [
			{
				"name" : "CSC 554",
				"date": "12/01/2014",
				"from": "06:00",
				"to": "07:00"
			},
			{
				"name" : "CSC 554",
				"date": "12/03/2014",
				"from": "06:00",
				"to": "07:00"
			},
			{
				"name" : "CSC 501",
				"date": "12/04/2014",
				"from": "02:00",
				"to": "03:00"
			}
		],
		"groups":[
				"Group One"
		]
      },
      {
	  "name": "Saurav",
        "password" : "1234",
        "email": "saurav@gmail.com",
        "major": "Computer Science",
        "degree": "MS",
		"class": [
			{
				"name" : "CSC 554",
				"date": "12/01/2014",
				"from": "06:00",
				"to": "07:00"
			},
			{
				"name" : "CSC 554",
				"date": "12/03/2014",
				"from": "18:00",
				"to": "19:00"
			},
			{
				"name" : "CSC 501",
				"date": "12/04/2014",
				"from": "16:00",
				"to": "17:00"
			},
			{
				"name" : "CSC 574",
				"date": "12/01/2014",
				"from": "09:00",
				"to": "10:00"
			},
			{
				"name" : "CSC 573",
				"date": "12/01/2014",
				"from": "17:00",
				"to": "18:00"
			},
			{
				"name" : "CSC 574",
				"date": "12/03/2014",
				"from": "09:00",
				"to": "10:00"
			},
			{
				"name" : "CSC 573",
				"date": "12/03/2014",
				"from": "17:00",
				"to": "18:00"
			}
		],
		"groups":[
				"Group One"
		]
      }
     ],
"Groups":
     [
      { 
        "name" : "Group One",
        "topic" : [
			"Visual Interfaces",
			"Interactive Design",
			"Artificial Intelligence"
		],
        "members": [
             "Saurav",
             "Shashank"
         ],
      }
     ],
   "Meetings":
     [
      { 
		"name" : "Study HCI - CSC 554",
        "place" : "EBII NCSU",
		"date": "12/02/2014",
		"from": "08:00",
		"to": "09:00",
        "groups": [
             "Group One"
         ]
      },
      { 
		"name" : "Study CNS - CSC 574",
		"place" : "EBI NCSU",
		"date": "12/05/2014",
		"from": "20:00",
		"to": "21:00",
        "groups": [
              "Group One"
         ]
      },
	  { 
		"name" : "Study IP - CSC 573",
		"place" : "EBIII NCSU",
		"date": "12/01/2014",
		"from": "10:00",
		"to": "12:00",
        "groups": [
              "Group One"
         ]
      },
	  { 
		"name" : "Study HCI - CSC 554",
		"place" : "Hunt NCSU",
		"date": "12/01/2014",
		"from": "18:00",
		"to": "19:00",
        "groups": [
              "Group One"
         ]
      },
	  { 
		"name" : "Study OS - CSC 501",
		"place" : "Hunt NCSU",
		"date": "12/01/2014",
		"from": "15:00",
		"to": "16:00",
        "groups": [
              "Group One"
         ]
      },
	  { 
		"name" : "Study IP - CSC 573",
		"place" : "EBIII NCSU",
		"date": "12/05/2014",
		"from": "10:00",
		"to": "12:00",
        "groups": [
              "Group One"
         ]
      }
     ]
}