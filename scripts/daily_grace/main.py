import argparse
import os
import json
import datetime
from fetcher import get_latest_video
from processor import download_video, process_video_for_social

DATA_FILE = "public/data/daily_videos.json"
OUTPUT_DIR = "public/images/Daily messages"

def load_data():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as f:
            return json.load(f)
    return []

def save_data(data):
    os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f, indent=2)

def main():
    parser = argparse.ArgumentParser(description="Daily Grace Automation")
    parser.add_argument("--channel", default="ytsearch:Daily Grace Prays", help="YouTube Channel URL or Search Query")
    parser.add_argument("--force", action="store_true", help="Force re-process if already exists")
    args = parser.parse_args()

    print(f"Searching for videos from: {args.channel}")
    video_info = get_latest_video(args.channel)
    
    if not video_info:
        print("No video found.")
        return

    print(f"Found video: {video_info['title']} ({video_info['upload_date']})")

    # Check database
    db = load_data()
    existing = next((v for v in db if v['id'] == video_info['id']), None)
    
    if existing and not args.force:
        print("Video already processed. Use --force to re-process.")
        return

    # Prepare output paths
    # Use formatted date or similar for filename
    # simple filename: YYYY-MM-DD-ID.mp4
    date_str = video_info['upload_date'] # YYYYMMDD
    filename_base = f"{date_str}-{video_info['id']}"
    raw_path = os.path.join("temp", f"{filename_base}_raw.mp4")
    wa_path = os.path.join(OUTPUT_DIR, f"{filename_base}_wa.mp4")
    
    # Ensure dirs
    os.makedirs("temp", exist_ok=True)
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # Download
    print("Downloading...")
    download_video(video_info['url'], raw_path)

    # Process
    print("Processing for WhatsApp...")
    if process_video_for_social(raw_path, wa_path, mode="whatsapp"):
        print(f"WhatsApp video saved to: {wa_path}")
        
        # Add to DB
        new_entry = {
            "id": video_info['id'],
            "title": video_info['title'],
            "date": date_str,
            "wa_video_path": f"/images/Daily messages/{filename_base}_wa.mp4",
            "original_url": video_info['url']
        }
        
        if existing:
            db = [x for x in db if x['id'] != video_info['id']]
            
        db.append(new_entry)
        save_data(db)
        print("Database updated.")
    else:
        print("Processing failed.")

    # Cleanup raw
    if os.path.exists(raw_path):
        os.remove(raw_path)

if __name__ == "__main__":
    main()
