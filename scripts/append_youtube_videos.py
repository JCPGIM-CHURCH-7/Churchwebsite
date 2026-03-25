import json
import os
from datetime import datetime, timedelta

JSON_PATH = r"e:\Church-website-clone\public\data\daily_manna_bilingual.json"

youtube_ids = [
    'QOOufKwMOKA',
    'ZB7s8tSn4Y8',
    'nurHlBe5G88',
    'EcrT2wRSzpc',
    'YAgGVFpipsI',
    'Ub-YaVGGK5A',
    'mskh0t0_7Zw'
]

themes = ["Grace", "Hope", "Love", "Prayer", "Wisdom", "Strength", "Faith"]

def main():
    with open(JSON_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    if not data:
        print("No data found.")
        return

    last_entry = data[-1]
    last_day_num = last_entry['dayNumber']
    last_date_str = last_entry['date']
    last_date = datetime.strptime(last_date_str, "%Y-%m-%d")

    for i, yt_id in enumerate(youtube_ids):
        next_day_num = last_day_num + i + 1
        next_date = last_date + timedelta(days=i+1)
        theme = themes[i % len(themes)]
        yt_url = f"https://www.youtube.com/live/{yt_id}"
        thumbnail = f"https://img.youtube.com/vi/{yt_id}/hqdefault.jpg"
        
        new_entry = {
            "date": next_date.strftime("%Y-%m-%d"),
            "dayNumber": next_day_num,
            "theme": theme,
            "english": {
                "dayId": f"EnglishDay{next_day_num}",
                "title": f"English Day {next_day_num}",
                "type": "video",
                "src": yt_url,
                "thumbnail": thumbnail
            },
            "telugu": {
                "dayId": f"TeluguDay{next_day_num}",
                "title": f"Telugu Day {next_day_num}",
                "type": "video",
                "src": yt_url,
                "thumbnail": thumbnail
            }
        }
        data.append(new_entry)
        
    with open(JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)

    print("Appended 7 videos successfully.")

if __name__ == "__main__":
    main()
