import json
import os
from datetime import datetime, timedelta

JSON_PATH = r"e:\Church-website-clone\public\data\daily_manna_bilingual.json"
VIDEOS_DIR = r"e:\Church-website-clone\public\images\daily-grace-videos"
themes = ["Grace", "Hope", "Love", "Prayer", "Wisdom", "Strength", "Faith"]

def main():
    # Load existing to find where we left off (around Day 148)
    with open(JSON_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    # Remove any entries that have a youtube.com link that we previously added
    clean_data = []
    for entry in data:
        src = entry['english']['src']
        if 'youtube' not in src.lower() and 'youtu.be' not in src.lower():
            clean_data.append(entry)
            
    # Now clean_data has up to Day 148 (or whatever the last MP4 was)
    last_entry = clean_data[-1]
    last_day_num = last_entry['dayNumber']
    last_date = datetime.strptime(last_entry['date'], "%Y-%m-%d")
    
    # We want to add missing MP4 files from Day 149 to 206
    # Let's see what files exist in VIDEOS_DIR
    existing_files = os.listdir(VIDEOS_DIR)
    
    current_day = last_day_num + 1
    current_date = last_date + timedelta(days=1)
    
    while True:
        eng_mp4 = f"english-day-{current_day}.mp4"
        tel_mp4 = f"telugu-day-{current_day}.mp4"
        
        if eng_mp4 not in existing_files and tel_mp4 not in existing_files:
            break # No more videos found
            
        eng_jpg = f"english-day-{current_day}.jpg"
        tel_jpg = f"telugu-day-{current_day}.jpg"
        
        # If jpg is missing, use a placeholder or None
        eng_thumb = f"/images/daily-grace-videos/{eng_jpg}" if eng_jpg in existing_files else ""
        tel_thumb = f"/images/daily-grace-videos/{tel_jpg}" if tel_jpg in existing_files else ""
        
        new_entry = {
            "date": current_date.strftime("%Y-%m-%d"),
            "dayNumber": current_day,
            "theme": themes[(current_day - 1) % len(themes)],
            "english": {
                "dayId": f"EnglishDay{current_day:03d}",
                "title": f"English Day {current_day}",
                "type": "video",
                "src": f"/images/daily-grace-videos/{eng_mp4}",
                "thumbnail": eng_thumb
            },
            "telugu": {
                "dayId": f"TeluguDay{current_day:03d}",
                "title": f"Telugu Day {current_day}",
                "type": "video",
                "src": f"/images/daily-grace-videos/{tel_mp4}",
                "thumbnail": tel_thumb
            }
        }
        
        clean_data.append(new_entry)
        
        current_day += 1
        current_date += timedelta(days=1)
        
    with open(JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(clean_data, f, indent=2)

    print(f"Restored JSON. Total entries: {len(clean_data)}. Highest day: {current_day - 1}.")

if __name__ == "__main__":
    main()
