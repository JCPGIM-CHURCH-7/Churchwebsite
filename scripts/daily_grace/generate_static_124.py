import json
import os
from datetime import datetime, timedelta

# Configuration
START_DATE = datetime(2025, 9, 1) # Day 1 = Sept 1, 2025
TOTAL_DAYS = 124

# Helper for Theme
def get_theme(day_num, date_obj):
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
    
    # Base Asset Paths
    eng_img = f"/images/Daily messages/English Day {day_num}.jpg"
    tel_img = f"/images/Daily messages/Telugu Day {day_num}.jpg"
    
    # Predicted Local Video Paths (As requested for linking)
    # The user can drop files here and they will work.
    eng_vid = f"/videos/English Day {day_num}.mp4"
    tel_vid = f"/videos/Telugu Day {day_num}.mp4"
    
    # Logic: If video file exists, we could switch type to 'video'.
    # For now, we'll keep type as 'image' by default since we know images exist (or we rely on them),
    # but we will ADD the videoSrc property.
    # The frontend can check if the video is playble or we can manually flip the switch in JSON later.
    # OR: The instruction "make use this and do the linking" implies we should reference them.
    # I will set `videoSrc` in the object. The frontend currently uses `src` based on `type`.
    
    # Let's be smart: We will use the Image as the THUMBNAIL always.
    # We will set `src` to the VIDEO path and `type` to `video` IF we assume the user WANTS to play videos.
    # But he said "If missing... fallback".
    # Since I cannot verify file existence on the client easily without a build step check,
    # I will stick to the previous robust "Image Only" for the 124 days UNLESS I verify a file?
    # No, I am running this script LOCALLY on the machine. I CAN check os.path.exists!
    
    # Checking if local video exists in 'public/videos'
    # Note: Script is in 'scripts/daily_grace', project root is '../../'
    project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../'))
    public_videos_path = os.path.join(project_root, 'public', 'videos')
    
    # English Check
    eng_vid_exists = False
    if os.path.exists(os.path.join(public_videos_path, f"English Day {day_num}.mp4")):
        eng_vid_exists = True
        
    # Telugu Check
    tel_vid_exists = False
    if os.path.exists(os.path.join(public_videos_path, f"Telugu Day {day_num}.mp4")):
        tel_vid_exists = True
        
    # Construct English Obj
    eng_obj = {
            "dayId": f"EnglishDay{day_num:03d}",
            "title": f"English Day {day_num}",
            "thumbnail": eng_img,
            "type": "video" if eng_vid_exists else "image", # Auto-switch if file found
            "src": eng_vid if eng_vid_exists else eng_img
    }
    
    # Construct Telugu Obj
    tel_obj = {
            "dayId": f"TeluguDay{day_num:03d}",
            "title": f"Telugu Day {day_num}",
            "thumbnail": tel_img,
            "type": "video" if tel_vid_exists else "image", # Auto-switch if file found
            "src": tel_vid if tel_vid_exists else tel_img
    }

    day_obj = {
        "date": date_str,
        "dayNumber": day_num,
        "theme": get_theme(day_num, current_date),
        "english": eng_obj,
        "telugu": tel_obj
    }
    
    results.append(day_obj)

# Output
# Also creating the simple 'videos.json' list if desired, but updating the main bilingual one is better.
with open("public/data/daily_manna_bilingual.json", "w") as f:
    json.dump(results, f, indent=2)

print(f"Generated {len(results)} days. Checked 'public/videos/' for auto-linking.")
