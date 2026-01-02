import json
import os
from datetime import datetime, timedelta

# Configuration
START_DATE = datetime(2025, 9, 1) # Day 1 = Sept 1, 2025
TOTAL_DAYS = 124

# NOTE: The 16 Sunday Videos are NOT mapped here. They are handled separately in the Frontend (page.tsx).
# This script generates purely the 124-day Image Sequence.

def get_theme(day_num, date_obj):
    # Simple logic
    if date_obj.weekday() == 6: return "Sunday Worship"
    if date_obj.month == 12 and date_obj.day == 25: return "Christmas"
    if date_obj.month == 1 and date_obj.day == 1: return "New Year"
    themes = ["Faith", "Grace", "Hope", "Love", "Prayer", "Wisdom", "Strength"]
    return themes[day_num % 7]

results = []

for i in range(TOTAL_DAYS):
    day_num = i + 1
    current_date = START_DATE + timedelta(days=i)
    date_str = current_date.strftime("%Y-%m-%d")
    
    # Base Image Paths
    eng_img = f"/images/Daily messages/English Day {day_num}.jpg"
    tel_img = f"/images/Daily messages/Telugu Day {day_num}.jpg"
    
    # Construct Day Object - STRICTLY IMAGE TYPE
    day_obj = {
        "date": date_str,
        "dayNumber": day_num,
        "theme": get_theme(day_num, current_date),
        "english": {
            "dayId": f"EnglishDay{day_num:03d}",
            "title": f"English Day {day_num}",
            "thumbnail": eng_img,
            "type": "image",
            "src": eng_img 
        },
        "telugu": {
            "dayId": f"TeluguDay{day_num:03d}",
            "title": f"Telugu Day {day_num}",
            "thumbnail": tel_img,
            "type": "image",
            "src": tel_img
        }
    }
    
    results.append(day_obj)

# Output
with open("public/data/daily_manna_bilingual.json", "w") as f:
    json.dump(results, f, indent=2)

print(f"Generated {len(results)} days of pure image data.")
