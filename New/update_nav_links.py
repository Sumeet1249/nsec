import json

with open("public/config/site-config.json", "r") as f:
    config = json.load(f)

# The keys we implemented as StandardInfoPage
top_level_ids = ["about", "academics", "facilities", "placement", "students"]

for item in config.get("navigation", []):
    if item["id"] in top_level_ids and "children" in item:
        for child in item["children"]:
            # e.g., "/about/overview" -> "/about#overview"
            if child["path"].startswith(f"/{item['id']}/"):
                tab_id = child["path"].split("/")[-1]
                child["path"] = f"/{item['id']}#{tab_id}"

with open("public/config/site-config.json", "w") as f:
    json.dump(config, f, indent=2)

print("Updated site-config.json with hash routes for SPA tabs!")
