import json
import os

config_dir = r"s:\tig-nsec-website\nsec\New\public\config"
os.makedirs(config_dir, exist_ok=True)

# 1. page-about-config.json
about_data = {
  "hero": {
    "title": "About",
    "titleHighlight": "Us.",
    "subtitle": "Discover NSEC"
  },
  "content": {
    "overview": {
      "heading": "Our Legacy of Excellence",
      "description": "Netaji Subhash Engineering College (NSEC) is a pioneering technical institution situated in the heart of Kolkata. Since its inception, NSEC has been committed to providing holistic education that empowers students to become transformative societal leaders.",
      "stats": [
        {"value": "1998", "label": "Year Established"},
        {"value": "25+", "label": "Years of Legacy"}
      ]
    },
    "vision": {
      "visionText": "To emerge as a Centre of Excellence filled with humanistic values for technical education and research.",
      "missionPoints": [
        "Imparting outcome-based education.",
        "Inculcating a research culture through state-of-the-art facilities.",
        "Fostering innovation and entrepreneurship.",
        "Nurturing human values to create sustainable socio-economic development."
      ]
    },
    "accreditation": [
      {"label": "NAAC Accredited"},
      {"label": "NBA Accredited Programs"},
      {"label": "AICTE Approved"},
      {"label": "MAKAUT Affiliated"}
    ],
    "messages": [
      {
        "title": "Message from the Chairman",
        "excerpt": "Education is the most powerful weapon which you can use to change the world. At NSEC, we believe in nurturing not just engineers, but responsible global citizens...",
        "link": "/messages/chairman"
      },
      {
        "title": "Message from the Principal",
        "excerpt": "Our dedicated faculty, modern infrastructure, and industry-aligned curriculum ensure that every student who walks through our doors is prepared for the challenges of tomorrow...",
        "link": "/messages/principal"
      }
    ],
    "committees": [
      "Anti-Ragging Committee",
      "Internal Complaints Committee",
      "SC/ST Cell",
      "Grievance Redressal Cell",
      "Internal Quality Assurance Cell (IQAC)",
      "Student Welfare Committee"
    ]
  }
}

# 2. department-aeie-config.json
aeie_data = {
  "department": {
    "name": "Applied Electronics & Instrumentation Engineering",
    "code": "AEIE",
    "description": "The department aims at producing engineering graduates with adequate knowledge in the area of Applied Electronics and Instrumentation Engineering.",
    "stats": {
      "students": 240,
      "faculty": 15,
      "labs": 8,
      "placementRate": "92%"
    },
    "contact": {
      "head": "Dr. John Doe",
      "email": "hod_aeie@nsec.ac.in"
    },
    "faculty": [
      { "id": 1, "name": "Dr. John Doe", "designation": "Professor & HOD", "qualification": "Ph.D, M.Tech" },
      { "id": 2, "name": "Dr. Jane Smith", "designation": "Associate Professor", "qualification": "Ph.D" },
      { "id": 3, "name": "Prof. Alan Turing", "designation": "Assistant Professor", "qualification": "M.Tech" },
      { "id": 4, "name": "Prof. Ada Lovelace", "designation": "Assistant Professor", "qualification": "M.Tech" }
    ],
    "curriculum": [
      { "sem": "Semester 1", "subjects": ["Mathematics I", "Physics I", "Basic Electrical Engineering"] },
      { "sem": "Semester 2", "subjects": ["Mathematics II", "Chemistry I", "Programming for Problem Solving"] },
      { "sem": "Semester 3", "subjects": ["Analog Electronics", "Digital Electronics", "Sensors and Transducers"] }
    ],
    "labs": [
      {"name": "Process Control Lab", "img": ""},
      {"name": "Sensors Lab", "img": ""},
      {"name": "Microprocessor Lab", "img": ""},
      {"name": "Industrial Instrumentation Lab", "img": ""}
    ]
  }
}

# 3. page-notices-config.json
notices_data = {
  "hero": {
    "title": "Notices &",
    "titleHighlight": "Downloads.",
    "subtitle": "Important Updates"
  },
  "notices": [
    { "id": 1, "title": "B.Tech Even Semester Examination Schedule 2024", "date": "2024-04-15", "category": "Examination", "size": "245 KB", "url": "#" },
    { "id": 2, "title": "Notice regarding Tech Fest 'AVENIR 2024'", "date": "2024-04-10", "category": "Events", "size": "1.2 MB", "url": "#" },
    { "id": 3, "title": "Revised Academic Calendar for 1st Year Students", "date": "2024-04-05", "category": "Academic", "size": "156 KB", "url": "#" },
    { "id": 4, "title": "Campus Placement Drive: TCS Digital", "date": "2024-04-02", "category": "Placement", "size": "420 KB", "url": "#" },
    { "id": 5, "title": "Holiday List 2024 - Updated", "date": "2024-03-28", "category": "General", "size": "110 KB", "url": "#" }
  ]
}

# 4. page-gallery-config.json
gallery_data = {
  "hero": {
    "title": "Photo",
    "titleHighlight": "Gallery.",
    "subtitle": "Campus Visuals"
  },
  "images": [
    { "id": 1, "url": "https://source.unsplash.com/random/800x600?university,college,1", "category": "Campus Life", "title": "Campus Entrance" },
    { "id": 2, "url": "https://source.unsplash.com/random/800x800?university,college,2", "category": "Tech Fest", "title": "Avenir 2024 Opening" },
    { "id": 3, "url": "https://source.unsplash.com/random/800x1200?university,college,3", "category": "Labs", "title": "Computer Lab Session" },
    { "id": 4, "url": "https://source.unsplash.com/random/800x600?university,college,4", "category": "Library", "title": "Central Library Reading Room" },
    { "id": 5, "url": "https://source.unsplash.com/random/800x1000?university,college,5", "category": "Campus Life", "title": "Student Activities" }
  ]
}

# 5. page-vtour-config.json
vtour_data = {
  "hero": {
    "title": "Virtual",
    "titleHighlight": "Tour.",
    "subtitle": "Experience NSEC",
    "description": "Walk through our state-of-the-art laboratories, spacious classrooms, and lush green campus from anywhere in the world."
  },
  "embed": "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1"
}


# IQAC
iqac_data = {
  "hero": {
    "title": "Internal Quality",
    "titleHighlight": "Assurance Cell.",
    "subtitle": "IQAC: NSEC"
  },
  "content": [
    {
      "title": "Annual Quality Assurance Reports",
      "desc": "Reports submitted to NAAC.",
      "items": ["AQAR 2022-23", "AQAR 2021-22", "AQAR 2020-21", "AQAR 2019-20"]
    },
    {
      "title": "IQAC Meetings",
      "desc": "Minutes of the meetings and action taken reports.",
      "items": ["Minutes 2023", "Minutes 2022", "Minutes 2021"]
    }
  ]
}

# Write files
configs = {
  "page-about-config.json": about_data,
  "department-aeie-config.json": aeie_data,
  "page-notices-config.json": notices_data,
  "page-gallery-config.json": gallery_data,
  "page-vtour-config.json": vtour_data,
  "page-iqac-config.json": iqac_data,
  "page-naac-config.json": iqac_data, # Using same structure
  "page-rd-config.json": iqac_data # Using same structure
}

for name, data in configs.items():
  with open(os.path.join(config_dir, name), "w") as f:
    json.dump(data, f, indent=2)
  print(f"Created {name}")
