import json
import re
from datetime import datetime

# User provided list
raw_data = [
    { 
      "title": "Sunday Service 12-10-2025 | Pastor K. Ravi Kumar", 
      "src": "https://www.youtube.com/embed/yVhKuyAdi_Q", 
      "isYouTube": True,
      "thumbnail": "https://img.youtube.com/vi/yVhKuyAdi_Q/maxresdefault.jpg"
    },
    { 
      "title": "Sunday Service 19-10-2025 | Pastor K. Ravi Kumar", 
      "src": "https://www.youtube.com/embed/gT-Cpnw1AZ0", 
      "isYouTube": True,
      "thumbnail": "https://img.youtube.com/vi/gT-Cpnw1AZ0/maxresdefault.jpg"
    },
    { 
      "title": "Sunday Service 26-10-2025 | Pastor K. Ravi Kumar", 
      "src": "https://www.youtube.com/embed/rYce42cNPro", 
      "isYouTube": True,
      "thumbnail": "https://img.youtube.com/vi/rYce42cNPro/maxresdefault.jpg"
    },
    { 
      "title": "Sunday Service 09-11-2025 | Live | Pastor K. Ravi Kumar", 
      "src": "https://www.youtube.com/embed/ap8Ux72GkDk", 
      "isYouTube": True,
      "thumbnail": "https://img.youtube.com/vi/ap8Ux72GkDk/maxresdefault.jpg"
    },
    { 
      "title": "Sunday Service 16-11-2025 | Pastor K. Ravi Kumar", 
      "src": "https://www.youtube.com/embed/PXtXYOgWyWM", 
      "isYouTube": True,
      "thumbnail": "https://img.youtube.com/vi/PXtXYOgWyWM/maxresdefault.jpg"
    },
    { 
      "title": "Sunday Service 23-11-2025 | Pastor K. Ravi Kumar", 
      "src": "https://www.youtube.com/embed/VJWWLPx9cEI", 
      "isYouTube": True,
      "thumbnail": "https://img.youtube.com/vi/VJWWLPx9cEI/maxresdefault.jpg"
    },
    {
      "title": "Sunday Service 30-11-2025 | Live | Pastor K. Ravi Kumar",
      "src": "https://www.youtube.com/embed/kw9VWIUQhKo",
      "isYouTube": True,
      "thumbnail": "https://img.youtube.com/vi/kw9VWIUQhKo/maxresdefault.jpg"
    },
    {
      "title": "GLORIOUS SUNDAY SERVICE | 07-12-2025 | #live",
      "src": "https://www.youtube.com/embed/PDr8Y6_So_Q",
      "isYouTube": True,
      "thumbnail": "https://img.youtube.com/vi/PDr8Y6_So_Q/maxresdefault.jpg"
    },
    {
      "title": "SUNDAY SERVICE | 14-12-2025 | #live",
      "src": "https://www.youtube.com/embed/C_ZEDst1LB0",
      "isYouTube": True,
      "thumbnail": "https://img.youtube.com/vi/C_ZEDst1LB0/maxresdefault.jpg"
    },
    {
      "title": "CANDLE LIGHT SERVICE | 21-12-2025 | #live",
      "src": "https://www.youtube.com/embed/jG1O2yHBKbw",
      "isYouTube": True,
      "thumbnail": "https://img.youtube.com/vi/jG1O2yHBKbw/maxresdefault.jpg"
    },
    {
      "title": "YOUTH SEMI CHRISTMAS | 23-12-2025 | #live",
      "src": "https://www.youtube.com/embed/74m65SgBRz0",
      "isYouTube": True,
      "thumbnail": "https://img.youtube.com/vi/74m65SgBRz0/maxresdefault.jpg"
    },
    {
      "title": "CHRISTMAS WORSHIP SERVICE | 25-12-2025 | #live",
      "src": "https://www.youtube.com/embed/Fbtimdmzaf0",
      "isYouTube": True,
      "thumbnail": "https://img.youtube.com/vi/Fbtimdmzaf0/maxresdefault.jpg"
    },
    {
      "title": "PRAISE & WORSHIP SERVICE | 28-12-2025 | #live (Morning)",
      "src": "https://www.youtube.com/embed/5gucWw-d_nA",
      "isYouTube": True,
      "thumbnail": "https://img.youtube.com/vi/5gucWw-d_nA/maxresdefault.jpg"
    },
    {
      "title": "PRAISE & WORSHIP SERVICE | 28-12-2025 | #live (Evening)",
      "src": "https://www.youtube.com/embed/t_VirkLYgHQ",
      "isYouTube": True,
      "thumbnail": "https://img.youtube.com/vi/t_VirkLYgHQ/maxresdefault.jpg"
    },
    {
      "title": "CROSS OVER SERVICE | 31-12-2025 | #live",
      "src": "https://www.youtube.com/embed/7NyPOxY9zwA",
      "isYouTube": True,
      "thumbnail": "https://img.youtube.com/vi/7NyPOxY9zwA/maxresdefault.jpg"
    },
    {
      "title": "NEW YEAR SERVICE | 01-01-2026 | #live",
      "src": "https://www.youtube.com/embed/QanFnzbUQUM",
      "isYouTube": True,
      "thumbnail": "https://img.youtube.com/vi/QanFnzbUQUM/maxresdefault.jpg"
    }
]

def parse_date(title):
    # Try different date formats
    # Look for DD-MM-YYYY
    match = re.search(r'(\d{2}-\d{2}-\d{4})', title)
    if match:
        d_str = match.group(1)
        try:
            return datetime.strptime(d_str, "%d-%m-%Y").strftime("%Y-%m-%d")
        except:
            return None
    return None

def get_theme(title):
    if "Christmas" in title or "CANDLE" in title:
        return "Christmas"
    if "New Year" in title or "CROSS OVER" in title:
        return "New Beginnings"
    if "Youth" in title:
        return "Youth"
    return "Worship"

processed_data = []

for item in raw_data:
    # Extract ID from src
    # https://www.youtube.com/embed/yVhKuyAdi_Q -> yVhKuyAdi_Q
    vid_id = item['src'].split('/')[-1]
    
    date_str = parse_date(item['title'])
    if not date_str:
        # Fallback if regex fails (shouldn't for this list)
        date_str = "2025-01-01" 
        
    theme = get_theme(item['title'])
    
    entry = {
        "id": vid_id,
        "title": item['title'],
        "date": date_str,
        "theme": theme,
        "src": item['src'],
        "thumbnail": item['thumbnail'],
        "type": "youtube"
    }
    processed_data.append(entry)

# Sort Descending (Newest First)
processed_data.sort(key=lambda x: x['date'], reverse=True)

# Save to public/data/daily_videos_full.json AND daily_grace_124.json to be safe
# The user might be referencing daily_videos_full.json in page.tsx now or in future
# My previous edit to page.tsx pointed to daily_grace_124.json.
# I will update BOTH to be sure.

output_files = [
    "public/data/daily_grace_124.json",
    "public/data/daily_videos_full.json"
]

for f_path in output_files:
    with open(f_path, 'w') as f:
        json.dump(processed_data, f, indent=2)
        
print("Successfully over-wrote data files with curated list.")
