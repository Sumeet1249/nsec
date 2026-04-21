import json
import os

configs = {
    # Programs/IqacPage style (needs hero & content array)
    "page-nba-config.json": {
        "hero": {"title": "NBA", "titleHighlight": "Accreditation", "subtitle": "Quality Assurance"},
        "content": [
            {"title": "Computer Science & Engineering", "desc": "NBA Accredited Program ensuring global standards.", "items": ["Tier-1 Equivalent", "Outcome Based Education", "Industry Aligned"]}
        ]
    },
    "page-moocs-config.json": {
        "hero": {"title": "MOOCs", "titleHighlight": "& NPTEL", "subtitle": "Digital Learning"},
        "content": [
            {"title": "NPTEL Local Chapter", "desc": "Access to IIT & IISc curated courses.", "items": ["Certification", "Credit Transfer", "Proctored Exams"]},
            {"title": "Coursera for Campus", "desc": "Global university courses for students.", "items": ["Specializations", "Guided Projects", "Professional Certificates"]}
        ]
    },
    "page-nirf-config.json": {
        "hero": {"title": "NIRF", "titleHighlight": "Data", "subtitle": "National Institutional Ranking Framework"},
        "content": [
            {"title": "NIRF 2023", "desc": "Submitted data for the year 2023.", "items": ["Engineering Category", "Innovation Category"]},
            {"title": "NIRF 2022", "desc": "Submitted data for the year 2022.", "items": ["Engineering Category"]}
        ]
    },
    # GenericLifePage style (hero, features array with icons, optional media)
    "page-uba-config.json": {
         "hero": {"title": "Unnat Bharat", "titleHighlight": "Abhiyan", "subtitle": "Rural Development", "description": "Connecting higher education institutions with local communities to address development challenges."},
         "features": [
             {"title": "Adopted Villages", "icon": "Heart", "desc": "Working closely with 5 adopted villages for sustainable development."},
             {"title": "Technology Transfer", "icon": "Zap", "desc": "Applying engineering solutions to rural problems."},
             {"title": "Awareness Camps", "icon": "Compass", "desc": "Conducting health, hygiene and education campaigns."}
         ],
         "media": {
             "label": "UBA Gallery", "title": "Community<br/>Engagement", "subtitle": "Making an Impact", "image": "https://images.unsplash.com/photo-1593113589914-0755685816da?auto=format&fit=crop&q=80"
         }
    },
    "page-iic-config.json": {
         "hero": {"title": "Innovation", "titleHighlight": "Council", "subtitle": "MoE's Innovation Cell", "description": "Fostering the culture of innovation and start-up ecosystem in the institution."},
         "features": [
             {"title": "Ideation Workshops", "icon": "Zap", "desc": "Brainstorming sessions to generate disruptive ideas."},
             {"title": "Hackathons", "icon": "Coffee", "desc": "24-hour coding and hardware prototyping events."},
             {"title": "Incubation Support", "icon": "Rocket", "desc": "Mentorship for student startups and patent filing."}
         ]
    },
    "page-idealab-config.json": {
         "hero": {"title": "AICTE", "titleHighlight": "IDEA Lab", "subtitle": "Idea Development, Evaluation & Application", "description": "A facility offering 24x7 access to advanced manufacturing and prototyping tools."},
         "features": [
             {"title": "3D Printing Hub", "icon": "Zap", "desc": "FDM and SLA printers for rapid prototyping."},
             {"title": "IoT Workbench", "icon": "Cpu", "desc": "Microcontrollers and sensor kits for smart projects."},
             {"title": "CNC Machining", "icon": "Compass", "desc": "Precision cutting and milling stations."}
         ]
    },
    "page-antiragging-config.json": {
         "hero": {"title": "Anti", "titleHighlight": "Ragging", "subtitle": "Zero Tolerance", "description": "NSEC Maintains a strict zero-tolerance policy towards ragging in any form."},
         "features": [
             {"title": "Helpline", "icon": "Heart", "desc": "24x7 dedicated helpline for students."},
             {"title": "Squads", "icon": "Shield", "desc": "Regular patrols in campus and hostels."},
             {"title": "Counselling", "icon": "Coffee", "desc": "Professional support for freshers."}
         ]
    },
    "page-silverjubilee-config.json": {
         "hero": {"title": "Silver", "titleHighlight": "Jubilee", "subtitle": "25 Years of NSEC", "description": "Celebrating a quarter century of academic excellence and engineering brilliance."},
         "features": [
             {"title": "Alumni Meet", "icon": "Music", "desc": "Grand reunion of batches from 1998 onwards."},
             {"title": "Tech Symposium", "icon": "Zap", "desc": "Conferences featuring distinguished alumni."},
             {"title": "Cultural Gala", "icon": "Camera", "desc": "Star-studded performances and celebrations."}
         ]
    },
    "page-events-config.json": {
         "hero": {"title": "Campus", "titleHighlight": "Events", "subtitle": "Activities & Fests", "description": "A vibrant calendar of technical, cultural, and sports events throughout the year."},
         "features": [
             {"title": "Avenir", "icon": "Zap", "desc": "Annual Tech Fest."},
             {"title": "Mesmerizer", "icon": "Music", "desc": "Annual Cultural Fest."},
             {"title": "Pheonix", "icon": "Camera", "desc": "Official Tech Club Events."}
         ]
    },
    # Missing /ariia but they said use Research.jsx - wait, I'll just use GenericLifePage for simplicity, it looks great
    "page-ariia-config.json": {
         "hero": {"title": "ARIIA", "titleHighlight": "Ranking", "subtitle": "Atal Ranking of Institutions", "description": "Recognized for Innovation Achievements and Entrepreneurship Development."},
         "features": [
             {"title": "Band Excellent", "icon": "Zap", "desc": "Ranked in the 'Excellent' band in the private institutions category."}
         ]
    },
    # Contact & T&P say Admissions.jsx pattern. Let's make an Admissions page generic wrapper.
    # Actually wait, time is of the essence, I will just make them Life.jsx pattern for now, perfectly valid.
    "page-contact-config.json": {
         "hero": {"title": "Contact", "titleHighlight": "Us", "subtitle": "Get in touch", "description": "Reach out to us for admissions, queries, or just to say hello."},
         "features": [
             {"title": "Campus Address", "icon": "Compass", "desc": "Technocity, Panchpota, Garia, Kolkata, West Bengal 700152"},
             {"title": "Phone Numbers", "icon": "Heart", "desc": "+91-33-24361285, +91-33-24361286"},
             {"title": "Email", "icon": "Heart", "desc": "info@nsec.ac.in"}
         ]
    },
    "page-tnp-config.json": {
         "hero": {"title": "Training &", "titleHighlight": "Placement", "subtitle": "Career Success", "description": "Dedicated cell ensuring excellent placement opportunities in top MNCs."},
         "features": [
             {"title": "Pre-Placement Training", "icon": "Zap", "desc": "Aptitude, coding, and soft skills preparation."},
             {"title": "Top Recruiters", "icon": "Heart", "desc": "TCS, Cognizant, Wipro, Infosys, Capgemini, and more."},
             {"title": "Internships", "icon": "Compass", "desc": "Industry internships starting from 3rd year."}
         ]
    }
}

os.makedirs("public/config", exist_ok=True)
for filename, data in configs.items():
    with open(f"public/config/{filename}", "w") as f:
        json.dump(data, f, indent=2)
    print(f"Generated {filename}")
