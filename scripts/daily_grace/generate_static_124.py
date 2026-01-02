import json
import os
from datetime import datetime, timedelta

# Configuration
START_DATE = datetime(2025, 9, 1) # Day 1 = Sept 1, 2025
TOTAL_DAYS = 124

# Curated Video List (16 items)
CURATED_VIDEOS = [
    { "title": "Sunday Service 12-10-2025 | Pastor K. Ravi Kumar", "src": "https://www.youtube.com/embed/yVhKuyAdi_Q", "date": "2025-10-12" },
    { "title": "Sunday Service 19-10-2025 | Pastor K. Ravi Kumar", "src": "https://www.youtube.com/embed/gT-Cpnw1AZ0", "date": "2025-10-19" },
    { "title": "Sunday Service 26-10-2025 | Pastor K. Ravi Kumar", "src": "https://www.youtube.com/embed/rYce42cNPro", "date": "2025-10-26" },
    { "title": "Sunday Service 09-11-2025 | Live | Pastor K. Ravi Kumar", "src": "https://www.youtube.com/embed/ap8Ux72GkDk", "date": "2025-11-09" },
    { "title": "Sunday Service 16-11-2025 | Pastor K. Ravi Kumar", "src": "https://www.youtube.com/embed/PXtXYOgWyWM", "date": "2025-11-16" },
    { "title": "Sunday Service 23-11-2025 | Pastor K. Ravi Kumar", "src": "https://www.youtube.com/embed/VJWWLPx9cEI", "date": "2025-11-23" },
    { "title": "Sunday Service 30-11-2025 | Live | Pastor K. Ravi Kumar", "src": "https://www.youtube.com/embed/kw9VWIUQhKo", "date": "2025-11-30" },
    { "title": "GLORIOUS SUNDAY SERVICE | 07-12-2025 | #live", "src": "https://www.youtube.com/embed/PDr8Y6_So_Q", "date": "2025-12-07" },
    { "title": "SUNDAY SERVICE | 14-12-2025 | #live", "src": "https://www.youtube.com/embed/C_ZEDst1LB0", "date": "2025-12-14" },
    { "title": "CANDLE LIGHT SERVICE | 21-12-2025 | #live", "src": "https://www.youtube.com/embed/jG1O2yHBKbw", "date": "2025-12-21" },
    { "title": "YOUTH SEMI CHRISTMAS | 21-12-2025 | #live", "src": "https://www.youtube.com/embed/74m65SgBRz0", "date": "2025-12-21" }, # Special Case: Double booking? We'll prioritize based on logic or add as secondary
    { "title": "CHRISTMAS WORSHIP SERVICE | 25-12-2025 | #live", "src": "https://www.youtube.com/embed/Fbtimdmzaf0", "date": "2025-12-25" },
    { "title": "PRAISE & WORSHIP SERVICE | 28-12-2025 | #live (Morning)", "src": "https://www.youtube.com/embed/5gucWw-d_nA", "date": "2025-12-28" },
    { "title": "PRAISE & WORSHIP SERVICE | 28-12-2025 | #live (Evening)", "src": "https://www.youtube.com/embed/t_VirkLYgHQ", "date": "2025-12-28" },
    { "title": "CROSS OVER SERVICE | 31-12-2025 | #live", "src": "https://www.youtube.com/embed/7NyPOxY9zwA", "date": "2025-12-31" },
    { "title": "NEW YEAR SERVICE | 01-01-2026 | #live", "src": "https://www.youtube.com/embed/QanFnzbUQUM", "date": "2026-01-01" },
]

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
    
    # Check for matching video
    # Note: Videos are English/General. We will attach to English slot primarily,
    # or both if generic.
    matching_video = next((v for v in CURATED_VIDEOS if v["date"] == date_str), None)
    
    # Construct Day Object
    day_obj = {
        "date": date_str,
        "dayNumber": day_num,
        "theme": get_theme(day_num, current_date),
        "english": {
            "dayId": f"EnglishDay{day_num:03d}",
            "title": f"English Day {day_num}",
            "thumbnail": eng_img,
            "type": "image",
            "src": eng_img # Default to image
        },
        "telugu": {
            "dayId": f"TeluguDay{day_num:03d}",
            "title": f"Telugu Day {day_num}",
            "thumbnail": tel_img,
            "type": "image",
            "src": tel_img # Default to image
        }
    }
    
    # If video exists, override English src to be video (or add metadata)
    # User said: "fallback to the daily image only... if missing video"
    # User also said: "use image files... as thumbnails... click opens full view with image enlarged or video embedded"
    if matching_video:
        day_obj["english"]["type"] = "video"
        day_obj["english"]["src"] = matching_video["src"]
        day_obj["english"]["title"] = matching_video["title"]
        # keep thumbnail as daily image so the grid looks uniform? 
        # User said "Each Reel Card: High-quality thumbnail... (like YouTube Shorts)... Labels: EnglishDayno... On click... embedded playable YouTube video"
        # So we keep image as thumbnail but src becomes video.
        
        # For Telugu, we might keep it as image unless we have a Telugu video. 
        # The list is mostly English/Bilingual services.
        # Let's verify if "Enosh Kumar" videos were in the curated list? No, the list provided in prompt was 16 specific videos.
        # So Telugu remains image-only for these days, unless the service is bilingual.
        # Most of these look like main church services (likely Bilingual/English).
        # Let's enable video for Telugu too if it's a "Service" which acts as the Daily Manna for that day.
        
        day_obj["telugu"]["type"] = "video"
        day_obj["telugu"]["src"] = matching_video["src"]
        day_obj["telugu"]["title"] = matching_video["title"] # Shared title
        
    results.append(day_obj)

# Output
with open("public/data/daily_manna_bilingual.json", "w") as f:
    json.dump(results, f, indent=2)

print(f"Generated {len(results)} days of data.")
