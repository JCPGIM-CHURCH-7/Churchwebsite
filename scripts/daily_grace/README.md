# Daily Grace Automation System

This system automates the fetching, processing, and publishing of "Daily Grace" style videos from YouTube to your website and prepares them for WhatsApp Status/Instagram Reels.

## Prerequisites

1.  **Python 3.8+** installed.
2.  Install dependencies:
    ```bash
    pip install -r scripts/daily_grace/requirements.txt
    ```

## Usage

### 1. Run the Automation Script

The main script fetches the latest video from a YouTube channel, downloads it, trims it to 30 seconds (vertical format), and saves it.

```bash
# Run from the project root
python scripts/daily_grace/main.py
```

**Options:**
- `--channel "URL or Query"`: Specify a YouTube channel URL or a search query (default: `ytsearch:Daily Grace Prays`).
- `--force`: Force re-processing even if the video has already been processed.

**Example:**
```bash
python scripts/daily_grace/main.py --channel "https://www.youtube.com/@DailyGracePrays/videos" --force
```

### 2. Website Update
The script automatically updates `public/data/daily_videos.json`. The website (Daily Grace page) reads this file and displays the new videos at the top of the list.

### 3. WhatsApp Status / Reels
- **Output Folder**: `public/images/Daily messages`
- **Output Files**: `YYYYMMDD-VideoID_wa.mp4`
- **Usage**: Transfer these files to your phone to post as WhatsApp Status or Instagram Reels.

## Troubleshooting
- **Network Errors**: If download fails, check your internet or try again.
- **Import Error**: Ensure you are running the command from the root folder `e:\Church-website-clone`.
