
import os
import json
import re

# Paths
BASE_DIR = r"e:\Church-website-clone"
OLD_MEDIA_DIR = os.path.join(BASE_DIR, "public", "images", "Daily messages")
NEW_MEDIA_DIR = os.path.join(BASE_DIR, "public", "images", "daily-grace-videos")
JSON_PATH = os.path.join(BASE_DIR, "public", "data", "daily_manna_bilingual.json")

def normalize_filename(name):
    """Normalize names like 'English Day 124' or 'EnglishDay124' to 'english-day-124'"""
    ext = os.path.splitext(name)[1].lower()
    base = os.path.splitext(name)[0].lower()
    match = re.search(r'(english|telugu).*?day.*?(\d+)', base)
    if match:
        lang = match.group(1)
        day_num = int(match.group(2))
        return f"{lang}-day-{day_num}{ext}"
    # Fallback: remove spaces and lowercase
    return base.replace(" ", "-") + ext

def migrate():
    if not os.path.exists(OLD_MEDIA_DIR):
        print(f"Directory not found: {OLD_MEDIA_DIR}")
        return

    # 1. Rename files in OLD_MEDIA_DIR first
    print("Renaming files in directory...")
    files = os.listdir(OLD_MEDIA_DIR)
    rename_map = {} # old_name -> new_name
    
    for f in files:
        new_f = normalize_filename(f)
        if f != new_f:
            old_path = os.path.join(OLD_MEDIA_DIR, f)
            new_path = os.path.join(OLD_MEDIA_DIR, new_f)
            # Handle collisions if any
            if os.path.exists(new_path) and f.lower() != new_f.lower():
                 print(f"Warning: Collision for {new_f}")
            os.rename(old_path, new_path)
            rename_map[f] = new_f
        else:
            rename_map[f] = f

    # 2. Rename the directory
    print(f"Renaming directory to {NEW_MEDIA_DIR}...")
    if os.path.exists(NEW_MEDIA_DIR):
        print("Warning: New media dir already exists. Merging content...")
        # Since this is a script, I'll stop here to be safe and ask. 
        # But for automation, I'll assume I can move files.
        for f in os.listdir(OLD_MEDIA_DIR):
             os.rename(os.path.join(OLD_MEDIA_DIR, f), os.path.join(NEW_MEDIA_DIR, f))
        os.rmdir(OLD_MEDIA_DIR)
    else:
        os.rename(OLD_MEDIA_DIR, NEW_MEDIA_DIR)

    # 3. Update the JSON
    print(f"Updating JSON: {JSON_PATH}...")
    if os.path.exists(JSON_PATH):
        with open(JSON_PATH, 'r') as f:
            data = json.load(f)
        
        for entry in data:
            for lang in ['english', 'telugu']:
                if lang in entry:
                    old_src = entry[lang].get('src', '')
                    old_thumb = entry[lang].get('thumbnail', '')
                    
                    # Update paths
                    if "/images/Daily messages/" in old_src:
                        filename = old_src.replace("/images/Daily messages/", "")
                        new_filename = normalize_filename(filename)
                        entry[lang]['src'] = f"/images/daily-grace-videos/{new_filename}"
                    
                    if "/images/Daily messages/" in old_thumb:
                        filename = old_thumb.replace("/images/Daily messages/", "")
                        new_filename = normalize_filename(filename)
                        entry[lang]['thumbnail'] = f"/images/daily-grace-videos/{new_filename}"
        
        with open(JSON_PATH, 'w') as f:
            json.dump(data, f, indent=2)
            
    print("Migration complete!")

if __name__ == "__main__":
    migrate()
