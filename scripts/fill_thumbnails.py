import json

JSON_PATH = r"e:\Church-website-clone\public\data\daily_manna_bilingual.json"
PLACEHOLDER = "/images/daily-grace-placeholder.png"

def main():
    with open(JSON_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    updated_count = 0
    for entry in data:
        if not entry['english'].get('thumbnail'):
            entry['english']['thumbnail'] = PLACEHOLDER
            updated_count += 1
        if not entry['telugu'].get('thumbnail'):
            entry['telugu']['thumbnail'] = PLACEHOLDER
            updated_count += 1
            
    with open(JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)

    print(f"Updated {updated_count} thumbnails with placeholder.")

if __name__ == "__main__":
    main()
