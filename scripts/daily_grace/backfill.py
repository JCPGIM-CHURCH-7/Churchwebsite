import yt_dlp
import json
import os
from datetime import datetime, timedelta
import random

# Configuration
CHANNELS = [
    "https://www.youtube.com/channel/UCXWDxR3S2UivMe8MwTctllA", # Daily Grace Devotional
    "https://www.youtube.com/@DailyMannaDevotionals",
    "https://www.youtube.com/c/mannatvinternational/videos",
    "https://m.youtube.com/@DivineGrace4u/videos"
]

OUTPUT_FILE = "public/data/daily_grace_124.json"

# Target Timeline: Jan 2, 2026 back to Sept 1, 2025 (124 days)
END_DATE = datetime(2026, 1, 2)
TOTAL_DAYS = 124

THEMES = ["Faith", "Grace", "Hope", "Love", "Peace", "Redemption", "Strength", "Prayer", "Healing", "Wisdom"]

def fetch_channel_videos(channel_url, limit=40):
    """
    Fetches metadata for the last 'limit' videos from a channel.
    """
    ydl_opts = {
        'quiet': True,
        'extract_flat': 'in_playlist', # Just get metadata, don't download
        'playlistend': limit,
        'ignoreerrors': True,
        'skip_download': True
    }
    
    videos = []
    print(f"Fetching from {channel_url}...")
    
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        try:
            result = ydl.extract_info(channel_url, download=False)
            if 'entries' in result:
                for entry in result['entries']:
                    if entry:
                       videos.append({
                           'id': entry.get('id'),
                           'title': entry.get('title'),
                           'url': f"https://www.youtube.com/watch?v={entry.get('id')}",
                           'thumbnail': entry.get('thumbnail'), # Often None in flat extraction, might need fallback or second pass
                           # Use maxres default if thumb missing
                           'thumbnail_fallback': f"https://img.youtube.com/vi/{entry.get('id')}/maxresdefault.jpg",
                           'upload_date': entry.get('upload_date'), # YYYYMMDD
                           'duration': entry.get('duration')
                       })
        except Exception as e:
            print(f"Error fetching {channel_url}: {e}")
            
    return videos

def main():
    all_videos = []
    
    # 1. Fetch from all sources
    for url in CHANNELS:
        # Fetch enough to cover the mix
        vids = fetch_channel_videos(url, limit=50) 
        all_videos.extend(vids)
    
    # 2. Sort by upload date (descending)
    # Filter out invalid dates
    all_videos = [v for v in all_videos if v.get('upload_date')]
    all_videos.sort(key=lambda x: x['upload_date'], reverse=True)
    
    # Remove duplicates (by ID)
    seen_ids = set()
    unique_videos = []
    for v in all_videos:
        if v['id'] not in seen_ids:
            unique_videos.append(v)
            seen_ids.add(v['id'])
    
    print(f"Total unique videos found: {len(unique_videos)}")

    # FALLBACK: If no videos found (API limits or errors), generate placeholders
    if not unique_videos:
        print("WARNING: No videos found. Generating placeholders for functional testing.")
        for i in range(TOTAL_DAYS):
            unique_videos.append({
                "id": f"placeholder_{i}",
                "title": f"Daily Grace Inspiration {i+1}",
                "url": "https://www.youtube.com/watch?v=placeholder",
                "thumbnail": "/placeholder.jpg",
                "thumbnail_fallback": "/placeholder.jpg",
                "upload_date": "20250101",
                "duration": 60
            })
    
    # 3. Map to Timeline (Jan 2, 2026 -> Backwards)
    timeline_data = []
    
    # We need exactly 124 entries
    # If we have shortage, we loop or use placeholders (here we just reuse if needed for safety, but with 200 fetched it should be fine)
    
    current_date = END_DATE
    video_idx = 0
    
    for _ in range(TOTAL_DAYS):
        date_str = current_date.strftime("%Y-%m-%d")
        
        if video_idx < len(unique_videos):
            video = unique_videos[video_idx]
            video_idx += 1
        else:
            # Fallback: wrap around
            video = unique_videos[video_idx % len(unique_videos)]
            video_idx += 1
            
        # Determine Theme
        # Simple keyword matching
        theme = "Grace" # Default
        title_lower = video['title'].lower()
        
        for t in THEMES:
            if t.lower() in title_lower:
                theme = t
                break
        
        # If still default, pick random stable based on day
        if theme == "Grace":
            theme = THEMES[video_idx % len(THEMES)]

        entry = {
            "date": date_str,
            "id": video['id'],
            "title": video['title'],
            "src": f"https://www.youtube.com/embed/{video['id']}",
            "original_url": video['url'],
            "thumbnail": video.get('thumbnail') or video['thumbnail_fallback'],
            "theme": theme,
            "type": "youtube"
        }
        
        timeline_data.append(entry)
        current_date -= timedelta(days=1)
        
    # Reverse to be chronological (Oldest -> Newest) or keep Descending?
    # Usually data files are easier if sorted chronological or we just handle it in frontend.
    # User wanted "connect last 123 days seamlessly to today", suggesting a flow.
    # Let's sort Descending (Today first) for the JSON as it's common for feeds,
    # but frontend can sort as needed.
    # Re-verify: "timeline... binge-view sequence".
    
    # Let's save Descending (Day 124 (Jan 2) ... Day 1 (Sept 1))
    
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, 'w') as f:
        json.dump(timeline_data, f, indent=2)
        
    print(f"Successfully created 124-day timeline in {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
