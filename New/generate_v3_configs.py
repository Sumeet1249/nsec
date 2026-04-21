import json
import os

configs = {
  "page-academics-config.json": {
    "category": "Education",
    "title": "Academic Excellence",
    "sidebarTitle": "Academics",
    "tabs": [
      {
        "id": "programmes",
        "label": "Programmes",
        "title": "Academic Programmes",
        "content": [
          { "type": "paragraph", "text": "We offer a diverse range of undergraduate, postgraduate, and diploma programs tailored to modern industry needs. Please use the Departments menu to navigate to specific branches." }
        ]
      },
      {
        "id": "curriculum",
        "label": "Curriculum Planning",
        "title": "Curriculum Planning & Implementation",
        "content": [
          { "type": "paragraph", "text": "Our curriculum is continuously updated in line with AICTE and MAKAUT guidelines. We integrate project-based learning and industry internships into core academics." },
          { "type": "list", "items": ["Value Added Technical Programs (VATP)", "Structured Induction Program for First Years", "Choice Based Credit System (CBCS) Integration"] }
        ]
      },
      {
        "id": "practices",
        "label": "Best Practices",
        "title": "Academic Best Practices",
        "content": [
          { "type": "list", "items": ["Continuous Internal Evaluation", "Flipped Classroom methodology", "Mandatory NPTEL certification", "Peer-assisted learning (PAL)"] }
        ]
      },
      {
        "id": "calendar",
        "label": "Academic Calendar",
        "title": "Academic Calendar",
        "content": [
          { "type": "download", "link": "/assets/Notices/academiccalendarevensemester24-25.pdf" },
          { "type": "paragraph", "text": "The calendar is subject to modifications based on MAKAUT notifications." }
        ]
      },
      {
        "id": "feedbacks",
        "label": "Feedbacks",
        "title": "Feedback Analysis System",
        "content": [
          { "type": "paragraph", "text": "We regularly collect feedback from students, alumni, and industry partners to refine our Teaching Learning Process (TLP). Read our latest action taken reports." }
        ]
      }
    ]
  },
  "page-facilities-config.json": {
    "category": "Infrastructure",
    "title": "Campus Facilities",
    "sidebarTitle": "Amenities",
    "tabs": [
      {
        "id": "library",
        "label": "Central Library",
        "title": "Central Library",
        "content": [
          { "type": "paragraph", "text": "Over 100,000 volumes, international journals, digital repos, and fully automated borrowing systems." }
        ]
      },
      {
        "id": "labs",
        "label": "Laboratories",
        "title": "State of the Art Labs",
        "content": [
          { "type": "paragraph", "text": "Each department is equipped with modern, specialized labs complying with industry standards. Includes our AICTE IDEA lab." }
        ]
      },
      {
        "id": "hostel",
        "label": "Hostel",
        "title": "Hostel Accommodations",
        "content": [
          { "type": "paragraph", "text": "Separate, secure, and fully equipped hostels for boys and girls with high-speed internet and mess facilities." }
        ]
      },
      {
        "id": "sports",
        "label": "Sports",
        "title": "Sports Complex",
        "content": [
          { "type": "paragraph", "text": "Facilities for cricket, football, basketball, table tennis, and a fully equipped indoor gymnasium." }
        ]
      },
      {
        "id": "cafeteria",
        "label": "Cafeteria",
        "title": "Campus Cafeteria",
        "content": [
          { "type": "paragraph", "text": "Hygienic, affordable, and diverse food options available for students and staff throughout the day." }
        ]
      }
    ]
  },
  "page-placement-config.json": {
    "category": "Career",
    "title": "Training & Placement",
    "sidebarTitle": "Placement Cell",
    "tabs": [
      {
        "id": "records",
        "label": "Placement Records",
        "title": "Placement Records",
        "content": [
          { "type": "paragraph", "text": "NSEC enjoys stellar placement records. With over 90% placement year on year, our alumni are placed in premier MNCs like TCS, CTS, Infosys, Capgemini, Amazon, and Microsoft." }
        ]
      },
      {
        "id": "mou",
        "label": "MoU Partners",
        "title": "Industry Collaborations",
        "content": [
          { "type": "list", "items": ["TCS - Initial learning programs", "Infosys - Campus Connect", "L&T - Edutech", "NASSCOM"] }
        ]
      },
      {
        "id": "career",
        "label": "Career Opportunities",
        "title": "Internships & Careers",
        "content": [
          { "type": "paragraph", "text": "The T&P Cell organizes exhaustive Pre-Placement Training (PPT) encompassing aptitude, coding, logic, and soft skills to bridge the gap between academia and industry." }
        ]
      }
    ]
  },
  "page-students-config.json": {
    "category": "Life at NSEC",
    "title": "Students' Corner",
    "sidebarTitle": "Student Life",
    "tabs": [
      {
        "id": "achievements",
        "label": "Achievements",
        "title": "Student Achievements",
        "content": [
          { "type": "paragraph", "text": "Our students routinely perform stellar feats at Smart India Hackathon, NPTEL exams, and global coding championships." }
        ]
      },
      {
        "id": "mentoring",
        "label": "Mentoring System",
        "title": "Dedicated Mentoring",
        "content": [
          { "type": "paragraph", "text": "A robust 1:20 Teacher-Student mentoring ratio ensures personalized academic and psychological support." }
        ]
      },
      {
        "id": "phoenix",
        "label": "PHOENIX Club",
        "title": "Official Tech Club",
        "content": [
          { "type": "paragraph", "text": "The official technical club of NSEC hosting AVENIR, the annual tech fest, alongside regular hackathons and coding bootcamps." }
        ]
      },
      {
        "id": "rotaract",
        "label": "Rotaract Club",
        "title": "Rotaract Club of NSEC",
        "content": [
          { "type": "paragraph", "text": "Engaging in impactful social service, blood donation camps, and rural outreach." }
        ]
      },
      {
        "id": "alumni",
        "label": "Alumni Association",
        "title": "NSEC Alumni Network",
        "content": [
          { "type": "paragraph", "text": "A strong global network of 15,000+ alumni supporting our students with mentorships, referrals, and career guidance." }
        ]
      }
    ]
  }
}

os.makedirs("public/config", exist_ok=True)
for filename, data in configs.items():
    with open(f"public/config/{filename}", "w") as f:
        json.dump(data, f, indent=2)
    print(f"Generated {filename}")
