import urllib.request
import re

youtube_ids = [
    'QOOufKwMOKA',
    'ZB7s8tSn4Y8',
    'nurHlBe5G88',
    'EcrT2wRSzpc',
    'YAgGVFpipsI',
    'Ub-YaVGGK5A',
    'mskh0t0_7Zw'
]

titles = []
for yid in youtube_ids:
    url = f"https://www.youtube.com/watch?v={yid}"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req).read().decode('utf-8')
        title_match = re.search(r'<title>(.*?)</title>', html)
        if title_match:
            title = title_match.group(1).replace(" - YouTube", "")
            titles.append((yid, title))
        else:
            titles.append((yid, "Unknown Title"))
    except Exception as e:
        titles.append((yid, str(e)))

for item in titles:
    print(item[0], "->", item[1])
