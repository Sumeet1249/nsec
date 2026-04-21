import json
import os

config = {
  "category": "Institution",
  "title": "About NSEC",
  "sidebarTitle": "The NSEC Panel",
  "tabs": [
    {
      "id": "overview",
      "label": "Overview",
      "title": "About The Institution",
      "content": [
        {
          "type": "paragraph",
          "text": "Netaji Subhash Engineering College (NSEC) is one of the pioneer self-financed engineering colleges in West Bengal. It was established in the year 1998, under the umbrella of the Techno India Group. The college is affiliated to Maulana Abul Kalam Azad University of Technology (MAKAUT) and approved by AICTE."
        },
        {
          "type": "paragraph",
          "text": "The institute has earned NBA Accreditation for four major departments. NSEC also holds the prestigious NAAC Accreditation and is focused on research-driven education."
        }
      ]
    },
    {
      "id": "vision-mission",
      "label": "Vision & Mission",
      "title": "Our Vision & Mission",
      "content": [
        {
          "type": "paragraph",
          "text": "Vision: To be a center of excellence in education and research, producing global leaders in science, technology and management."
        },
        {
          "type": "list",
          "items": [
            "Mission 1: Imparting quality education and developing technical skills.",
            "Mission 2: Fostering innovation and entrepreneurship.",
            "Mission 3: Inculcating ethical values and social responsibility."
          ]
        }
      ]
    },
    {
      "id": "message",
      "label": "Messages",
      "title": "Message from Leadership",
      "content": [
        {
          "type": "person",
          "name": "Prof. (Dr.) T.S. Bhattacharya",
          "role": "Director",
          "bio": "Quality education is the foundation of a progressive society. At NSEC, we constantly strive to empower students with technical wisdom.",
          "image": "/assets/Leadership/director.jpg"
        }
      ]
    },
    {
      "id": "accreditation",
      "label": "Accreditation",
      "title": "Accreditation & Affiliation",
      "content": [
        {
          "type": "list",
          "items": [
            "Approved by All India Council for Technical Education (AICTE), New Delhi.",
            "Affiliated to Maulana Abul Kalam Azad University of Technology (MAKAUT), West Bengal.",
            "Four B.Tech programs (CSE, ECE, EE, BME) accredited by National Board of Accreditation (NBA).",
            "Accredited by National Assessment and Accreditation Council (NAAC)."
          ]
        }
      ]
    }
  ]
}

os.makedirs("public/config", exist_ok=True)
with open("public/config/page-about-config.json", "w") as f:
    json.dump(config, f, indent=2)
print("Generated page-about-config.json")
