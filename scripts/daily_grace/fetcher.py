import yt_dlp
import datetime

def get_latest_video(channel_url):
    """
    Fetches the latest video from a specific YouTube channel or search query.
    Returns a dictionary with video details.
    """
    ydl_opts = {
        'quiet': True,
        'extract_flat': True,
        'force_generic_extractor': False,
        'playlistend': 5, # Check first 5 videos
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        try:
            result = ydl.extract_info(channel_url, download=False)
            
            if 'entries' in result:
                # result is a playlist or list of searching results
                video = result['entries'][0]
            else:
                # Just a video
                video = result

            return {
                'id': video.get('id'),
                'title': video.get('title'),
                'url': f"https://www.youtube.com/watch?v={video.get('id')}",
                'thumbnail': video.get('thumbnail'),
                'upload_date': video.get('upload_date'), # Format: YYYYMMDD
                'duration': video.get('duration')
            }
        except Exception as e:
            print(f"Error fetching video: {e}")
            return None

if __name__ == "__main__":
    # Example usage: Searching for "Daily Grace" or a specific channel
    # For testing, we can use a query or a known channel ID
    # channel = "https://www.youtube.com/@DailyGracePrays/videos" 
    # For now, let's just search
    print("Fetching latest video...")
    video = get_latest_video("ytsearch:Daily Grace Prays")
    print(video)
