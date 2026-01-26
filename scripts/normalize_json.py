
import json
import os

JSON_PATH = r"e:\Church-website-clone\lib\daily-messages.json"

def normalize_name(name):
    base, ext = os.path.splitext(name)
    normalized = base.lower().replace(" ", "-").replace("--", "-")
    return normalized + ext.lower()

if os.path.exists(JSON_PATH):
    with open(JSON_PATH, 'r') as f:
        data = json.load(f)
    
    for msg in data['dailyMessages']:
        msg['file'] = normalize_name(msg['file'])
        
    with open(JSON_PATH, 'w') as f:
        json.dump(data, f, indent=2)
    print("Updated daily-messages.json")
else:
    print("File not found")
