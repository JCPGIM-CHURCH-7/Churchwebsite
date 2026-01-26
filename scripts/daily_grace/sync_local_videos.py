import os
import json
import re
from datetime import datetime, timedelta
from moviepy import VideoFileClip

# Paths
JSON_PATH = "public/data/daily_manna_bilingual.json"
MEDIA_DIR = "public/images/daily-grace-videos"
START_DATE = datetime(2025, 9, 1) # Day 1
THEMES = ["Faith", "Grace", "Hope", "Love", "Peace", "Redemption", "Strength", "Wisdom", "Prayer", "Joy"]

def normalize_name(name):
    """Normalize names like 'English Day 124' or 'EnglishDay124' to 'english-day-124'"""
    # Remove extension and normalize spaces/case
    name = os.path.splitext(name)[0].lower()
    # Match Language and Day Number
    match = re.search(r'(english|telugu).*?day.*?(\d+)', name)
    if match:
        lang = match.group(1)
        day_num = int(match.group(2))
        return f"{lang}-day-{day_num}"
    return name

def sync():
    if not os.path.exists(JSON_PATH):
        print(f"JSON not found: {JSON_PATH}")
        return

    with open(JSON_PATH, 'r') as f:
        data = json.load(f)

    # Index local files
    print("Indexing local files...")
    local_files = os.listdir(MEDIA_DIR)
    mp4_map = {}
    
    max_local_day = 0
    for f in local_files:
        norm = normalize_name(f)
        if f.lower().endswith('.mp4'):
            mp4_map[norm] = f
            match = re.search(r'day.*?(\d+)', norm)
            if match:
                max_local_day = max(max_local_day, int(match.group(1)))

    print(f"Found MP4 files up to Day {max_local_day}.")

    # 1. Update existing entries
    updates_count = 0
    thumbnails_generated = 0
    
    day_numbers_in_json = {entry['dayNumber'] for entry in data}
    
    for entry in data:
        day_num = entry['dayNumber']
        for lang in ['english', 'telugu']:
            norm_key = f"{lang}-day-{day_num}"
            if norm_key in mp4_map:
                mp4_filename = mp4_map[norm_key]
                jpg_filename = f"{os.path.splitext(mp4_filename)[0]}.jpg"
                jpg_path = os.path.join(MEDIA_DIR, jpg_filename)
                
                entry[lang]['src'] = f"/images/daily-grace-videos/{mp4_filename}"
                entry[lang]['thumbnail'] = f"/images/daily-grace-videos/{jpg_filename}"
                entry[lang]['type'] = "video"
                updates_count += 1
                
                if not os.path.exists(jpg_path):
                    thumbnails_generated += generate_thumbnail(mp4_filename, jpg_path)

    # 2. Add missing days up to max_local_day (usually 148)
    new_days_added = 0
    for d in range(1, max_local_day + 1):
        if d not in day_numbers_in_json:
            date_obj = START_DATE + timedelta(days=d-1)
            new_entry = {
                "date": date_obj.strftime("%Y-%m-%d"),
                "dayNumber": d,
                "theme": THEMES[d % len(THEMES)],
                "english": {
                    "dayId": f"EnglishDay{d:03d}",
                    "title": f"English Day {d}",
                    "type": "image", # Default
                    "src": ""
                },
                "telugu": {
                    "dayId": f"TeluguDay{d:03d}",
                    "title": f"Telugu Day {d}",
                    "type": "image", # Default
                    "src": ""
                }
            }
            
            # Populate with MP4 if exists
            for lang in ['english', 'telugu']:
                norm_key = f"{lang}-day-{d}"
                if norm_key in mp4_map:
                    mp4_filename = mp4_map[norm_key]
                    jpg_filename = f"{os.path.splitext(mp4_filename)[0]}.jpg"
                    jpg_path = os.path.join(MEDIA_DIR, jpg_filename)
                    
                    new_entry[lang]['src'] = f"/images/daily-grace-videos/{mp4_filename}"
                    new_entry[lang]['thumbnail'] = f"/images/daily-grace-videos/{jpg_filename}"
                    new_entry[lang]['type'] = "video"
                    
                    if not os.path.exists(jpg_path):
                        thumbnails_generated += generate_thumbnail(mp4_filename, jpg_path)
                else:
                    # Fallback for missing MP4 in new day
                    new_entry[lang]['thumbnail'] = "/placeholder.jpg"
                    new_entry[lang]['src'] = "/placeholder.jpg"

            data.append(new_entry)
            new_days_added += 1

    # Sort data by dayNumber ascending
    data.sort(key=lambda x: x['dayNumber'])

    # Save updated JSON
    with open(JSON_PATH, 'w') as f:
        json.dump(data, f, indent=2)

    print(f"\nSync complete!")
    print(f"Updated {updates_count} video entries.")
    print(f"Added {new_days_added} new day entries.")
    print(f"Generated {thumbnails_generated} new thumbnails.")

def generate_thumbnail(mp4_filename, jpg_path):
    print(f"Generating thumbnail for {mp4_filename}...")
    try:
        mp4_path = os.path.join(MEDIA_DIR, mp4_filename)
        clip = VideoFileClip(mp4_path)
        t = min(1, clip.duration / 2)
        clip.save_frame(jpg_path, t=t)
        clip.close()
        return 1
    except Exception as e:
        print(f"Error generating thumbnail for {mp4_filename}: {e}")
        return 0

if __name__ == "__main__":
    sync()
