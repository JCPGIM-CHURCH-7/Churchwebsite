import yt_dlp
import json
import os
from datetime import datetime, timedelta
import random

# Configuration
ENGLISH_CHANNELS = [
    "https://www.youtube.com/c/ourdailymanna",
    "https://www.youtube.com/c/mannatvinternational/videos",
    "https://www.youtube.com/@DailyMannaDevotionals",
    "https://www.youtube.com/playlist?list=PL_YrphRaExuOHfpaLhAFNW_WIRu7YYSoR"
]

TELUGU_CHANNELS = [
    "https://www.youtube.com/playlist?list=PLiglW1ox1u4cPSyccDfHBF8_5jO0Nj50h",
    "https://www.youtube.com/@enoshkumar",
    "https://www.youtube.com/@Dailymanna-007"
]

OUTPUT_FILE = "public/data/daily_manna_bilingual.json"

# Target Timeline: Jan 2, 2026 back to Sept 1, 2025 (124 days)
END_DATE = datetime(2026, 1, 2)
TOTAL_DAYS = 124

THEMES = ["Faith", "Grace", "Hope", "Love", "Peace", "Redemption", "Strength", "Wisdom", "Prayer", "Joy"]

def fetch_videos(channels, limit=60):
    """
    Fetches videos from a list of channels/playlists.
    """
    videos = []
    ydl_opts = {
        'quiet': True,
        'extract_flat': 'in_playlist',
        'playlistend': limit,
        'ignoreerrors': True,
        'skip_download': True
    }
    
    for url in channels:
        print(f"Fetching from {url}...")
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            try:
                result = ydl.extract_info(url, download=False)
                entries = result.get('entries', [])
                if not entries and 'id' in result: # Single video or flat list
                     entries = [result]
                
                for entry in entries:
                    if entry:
                        videos.append({
                           'id': entry.get('id'),
                           'title': entry.get('title'),
                           'url': f"https://www.youtube.com/watch?v={entry.get('id')}",
                           'thumbnail': entry.get('thumbnail') or f"https://img.youtube.com/vi/{entry.get('id')}/maxresdefault.jpg",
                           'upload_date': entry.get('upload_date')
                        })
            except Exception as e:
                print(f"Error fetching {url}: {e}")
                
    # Remove duplicates
    unique_videos = {v['id']: v for v in videos}.values()
    return list(unique_videos)

def generate_placeholders(count, lang_prefix):
    placeholders = []
    for i in range(count):
        placeholders.append({
            'id': f"{lang_prefix}_placeholder_{i}",
            'title': f"Daily Manna {lang_prefix} Day {i+1}",
            'url': "https://www.youtube.com/watch?v=placeholder",
            'thumbnail': "/placeholder.jpg"
        })
    return placeholders

def main():
    print("Fetching English Content...")
    english_videos = fetch_videos(ENGLISH_CHANNELS)
    if len(english_videos) < TOTAL_DAYS:
        print(f"Warning: Only found {len(english_videos)} English videos. Filling with placeholders.")
        english_videos.extend(generate_placeholders(TOTAL_DAYS - len(english_videos), "Eng"))
    
    print("Fetching Telugu Content...")
    telugu_videos = fetch_videos(TELUGU_CHANNELS)
    if len(telugu_videos) < TOTAL_DAYS:
        print(f"Warning: Only found {len(telugu_videos)} Telugu videos. Filling with placeholders.")
        telugu_videos.extend(generate_placeholders(TOTAL_DAYS - len(telugu_videos), "Tel"))

    # Map to Timeline
    bilingual_data = []
    current_date = END_DATE
    
    # Sort by date descending if possible, else just use list order
    # Assuming list order is roughly newest first for now
    
    for i in range(TOTAL_DAYS):
        day_num = TOTAL_DAYS - i # Day 124 down to 1
        date_str = current_date.strftime("%Y-%m-%d")
        
        # Pick videos (cycling if needed, though we filled placeholders)
        eng_vid = english_videos[i % len(english_videos)]
        tel_vid = telugu_videos[i % len(telugu_videos)]
        
        # Theme
        theme = THEMES[i % len(THEMES)]
        
        entry = {
            "date": date_str,
            "dayNumber": day_num,
            "theme": theme,
            "english": {
                "dayId": f"EnglishDay{day_num:03d}",
                "videoId": eng_vid['id'],
                "title": eng_vid['title'],
                "src": f"https://www.youtube.com/embed/{eng_vid['id']}",
                "thumbnail": eng_vid['thumbnail']
            },
            "telugu": {
                "dayId": f"TeluguDay{day_num:03d}",
                "videoId": tel_vid['id'],
                "title": tel_vid['title'],
                "src": f"https://www.youtube.com/embed/{tel_vid['id']}",
                "thumbnail": tel_vid['thumbnail']
            }
        }
        
        bilingual_data.append(entry)
        current_date -= timedelta(days=1)
        
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, 'w') as f:
        json.dump(bilingual_data, f, indent=2)
        
    print(f"Successfully generated bilingual 124-day timeline: {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
