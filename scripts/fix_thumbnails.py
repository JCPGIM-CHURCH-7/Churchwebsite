import re

filename = r"e:\Church-website-clone\app\daily-grace\page.tsx"

with open(filename, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace titles
content = content.replace('"Special Service Live 1"', '"SUNDAY SERVICE | 01-03-2026 | #Live"')
content = content.replace('"Special Service Live 2"', '"SUNDAY SERVICE | 01-03-2026 | #Live"')
content = content.replace('"Special Service Live 3"', '"MENS SUNDAY SERVICE | 15-02-2026 | #Live"')
content = content.replace('"Special Service Live 4"', '"SUNDAY SERVICE | 08-02-2026 | #Live"')
content = content.replace('"Special Service Live 5"', '"PROPHETIC & DELIVERANCE SERVICE | 08-02-2026 | #Live"')
content = content.replace('"Special Service Live 6"', '"PRAISE & WORSHIP SERVICE | 01-02-2026 | #Live"')
content = content.replace('"Latest Special Service"', '"SUNDAY SERVICE | 22-03-2026 | #Live"')

# Replace thumbnail resolution
content = content.replace('maxresdefault.jpg', 'hqdefault.jpg')

with open(filename, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Updated {filename} successfully.")
