import os
import json
import re
import random
from datetime import datetime, timedelta

# Configuration
MEDIA_DIR = "public/images/Daily messages"
OUTPUT_FILE = "public/data/daily_videos_full.json"
START_DATE = datetime(2026, 1, 1) # Day 1 = Jan 1, 2026

THEMES = ["Faith", "Grace", "Hope", "Love", "Peace", "Joy", "Wisdom", "Strength", "Prayer", "Healing"]

def get_theme_for_day(day_num):
    # Deterministic theme based on day number so it doesn't change on re-run
    return THEMES[day_num % len(THEMES)]

def index_videos():
    videos = []
    
    if not os.path.exists(MEDIA_DIR):
        print(f"Directory not found: {MEDIA_DIR}")
        return

    files = os.listdir(MEDIA_DIR)
    print(f"Found {len(files)} files in {MEDIA_DIR}")

    # Regex to match "English Day 123.mp4" or "Telugu Day 5.mp4"
    # Also handles potential extra spaces like "English  Day 3.mp4"
    pattern = re.compile(r"(English|Telugu)\s+Day\s*(\d+)", re.IGNORECASE)

    for filename in files:
        if not filename.lower().endswith(('.mp4', '.mov', '.m4v')):
            continue

        match = pattern.search(filename)
        if match:
            lang = match.group(1)
            day_num = int(match.group(2))
            
            # Calculate date
            # Day 1 -> Start Date
            # Day 2 -> Start Date + 1 day
            date_obj = START_DATE + timedelta(days=day_num - 1)
            date_str = date_obj.strftime("%Y-%m-%d")
            
            # Create entry
            video_entry = {
                "id": f"{lang.lower()}_day_{day_num}",
                "title": f"{lang} Day {day_num}",
                "day_number": day_num,
                "language": lang,
                "date": date_str,
                "theme": get_theme_for_day(day_num),
                "src": f"/images/Daily messages/{filename}",
                "thumbnail": "/placeholder.jpg", # Fallback for now, could generate later
                "type": "video"
            }
            
            videos.append(video_entry)
    
    # Sort by date (descending)
    videos.sort(key=lambda x: x['day_number'], reverse=True)
    
    # Save to JSON
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, 'w') as f:
        json.dump(videos, f, indent=2)
    
    print(f"Indexed {len(videos)} videos. Saved to {OUTPUT_FILE}")

if __name__ == "__main__":
    index_videos()
