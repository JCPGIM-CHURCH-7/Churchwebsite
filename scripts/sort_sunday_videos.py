
import re

filename = r"e:\Church-website-clone\app\daily-grace\page.tsx"

# Video data with dates for sorting
video_data = [
    ("2025-10-12", "Sunday Service 12-10-2025 | Pastor K. Ravi Kumar", "yVhKuyAdi_Q"),
    ("2025-10-19", "Sunday Service 19-10-2025 | Pastor K. Ravi Kumar", "gT-Cpnw1AZ0"),
    ("2025-10-26", "Sunday Service 26-10-2025 | Pastor K. Ravi Kumar", "rYce42cNPro"),
    ("2025-11-09", "Sunday Service 09-11-2025 | Live | Pastor K. Ravi Kumar", "ap8Ux72GkDk"),
    ("2025-11-16", "Sunday Service 16-11-2025 | Pastor K. Ravi Kumar", "PXtXYOgWyWM"),
    ("2025-11-23", "Sunday Service 23-11-2025 | Pastor K. Ravi Kumar", "VJWWLPx9cEI"),
    ("2025-11-30", "Sunday Service 30-11-2025 | Live | Pastor K. Ravi Kumar", "kw9VWIUQhKo"),
    ("2025-12-07", "GLORIOUS SUNDAY SERVICE | 07-12-2025 | #live", "PDr8Y6_So_Q"),
    ("2025-12-14", "SUNDAY SERVICE | 14-12-2025 | #live", "C_ZEDst1LB0"),
    ("2025-12-21", "CANDLE LIGHT SERVICE | 21-12-2025 | #live", "jG1O2yHBKbw"),
    ("2025-12-21", "YOUTH SEMI CHRISTMAS | 21-12-2025 | #live", "74m65SgBRz0"),
    ("2025-12-25", "CHRISTMAS WORSHIP SERVICE | 25-12-2025 | #live", "Fbtimdmzaf0"),
    ("2025-12-28", "PRAISE & WORSHIP SERVICE | 28-12-2025 | #live (Morning)", "5gucWw-d_nA"),
    ("2025-12-28", "PRAISE & WORSHIP SERVICE | 28-12-2025 | #live (Evening)", "t_VirkLYgHQ"),
    ("2025-12-31", "CROSS OVER SERVICE | 31-12-2025 | #live", "7NyPOxY9zwA"),
    ("2026-01-01", "NEW YEAR SERVICE | 01-01-2026 | #live", "QanFnzbUQUM"),
    ("2026-01-04", "SUNDAY SERVICE | 04-01-2026 | #live", "LWSVUvhuTtc"),
    ("2026-01-04", "GLORIOUS SUNDAY SERVICE | 04-01-2026 | #live", "rh7ynbWPtI0"),
    ("2026-01-11", "SUNDAY SERVICE | 11-01-2026 | #live", "kOxQEwxqOdo"),
    ("2026-01-18", "SUNDAY SERVICE | 18-01-2026 | #live", "J27bQckpPEQ"),
    ("2026-01-25", "SUNDAY SERVICE | 25-01-2026 | #live", "47XTHrkc8Yc"),
    ("2026-02-01", "PRAISE & WORSHIP SERVICE | 01-02-2026 | #Live", "Ub-YaVGGK5A"),
    ("2026-02-08", "SUNDAY SERVICE | 08-02-2026 | #Live", "EcrT2wRSzpc"),
    ("2026-02-08", "PROPHETIC & DELIVERANCE SERVICE | 08-02-2026 | #Live", "YAgGVFpipsI"),
    ("2026-02-08", "SUNDAY SERVICE | 08-02-2026 | #Live", "ZB7s8tSn4Y8"),
    ("2026-02-15", "MENS SUNDAY SERVICE | 15-02-2026 | #Live", "nurHlBe5G88"),
    ("2026-03-01", "SUNDAY SERVICE | 01-03-2026 | #Live", "QOOufKwMOKA"),
    ("2026-03-22", "SUNDAY SERVICE | 22-03-2026 | #Live", "mskh0t0_7Zw"),
]

# Sort ascending by date
video_data.sort(key=lambda x: x[0])

# Generate replacement string
replacement_content = "const SUNDAY_VIDEOS = [\n"
for date, title, yid in video_data:
    replacement_content += f'  {{ title: "{title}", src: "https://www.youtube.com/embed/{yid}", thumbnail: "https://img.youtube.com/vi/{yid}/hqdefault.jpg" }},\n'
replacement_content = replacement_content.rstrip(",\n") + "\n];"

with open(filename, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the SUNDAY_VIDEOS array and replace it
new_content = re.sub(r'const SUNDAY_VIDEOS = \[.*?\];', replacement_content, content, flags=re.DOTALL)

with open(filename, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Updated {filename} with {len(video_data)} sorted videos.")
