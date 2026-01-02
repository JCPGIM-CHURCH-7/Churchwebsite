import os
from moviepy import VideoFileClip, TextClip, CompositeVideoClip
import yt_dlp

def download_video(video_url, output_path="temp_video.mp4"):
    """Downloads the video using yt-dlp."""
    ydl_opts = {
        'format': 'best[ext=mp4]',
        'outtmpl': output_path,
        'quiet': True,
        'overwrite': True # Overwrite if exists
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([video_url])
    return output_path

def process_video_for_social(input_path, output_path, mode="whatsapp"):
    """
    Processes video for social media.
    mode: "whatsapp" (30s, 720x1280) or "reels" (60s, 9:16)
    """
    try:
        clip = VideoFileClip(input_path)
        
        # Target resolution
        target_w, target_h = 720, 1280
        
        # Duration limit
        limit = 30 if mode == "whatsapp" else 90
        if clip.duration > limit:
            # clip = clip.subclip(0, limit) # Simple trim from start
             clip = clip.subclip(0, limit)

        # crop to 9:16 (center)
        # First resize to ensure height covers target height
        # If we resize by height, width might be smaller or larger than 720
        
        # Logic: Resize so that it fills the 720x1280 box, then crop center
        # Aspect Ratio of target
        target_aspect = target_w / target_h
        current_aspect = clip.w / clip.h

        if current_aspect > target_aspect:
            # Video is wider than target (landscape usually)
            # Resize by height to 1280, width will be > 720
            # v2 usage: clip.resized(height=...)
            clip = clip.resized(height=target_h)
            # Crop center width
            # v2 usage: clip.cropped(x1=..., width=...)
            clip = clip.cropped(x1=(clip.w/2 - target_w/2), width=target_w, height=target_h)
        else:
            # Video is taller or same aspect (unlikely for youtube)
            clip = clip.resized(width=target_w)
            clip = clip.cropped(y1=(clip.h/2 - target_h/2), width=target_w, height=target_h)

        # Add Text Overlay (Optional)
        # text = TextClip("Daily Grace", fontsize=70, color='white', font='Arial-Bold')
        # text = text.set_pos('center').set_duration(clip.duration)
        # final = CompositeVideoClip([clip, text])
        
        # Write output
        clip.write_videofile(
            output_path, 
            codec='libx264', 
            audio_codec='aac', 
            temp_audiofile='temp-audio.m4a', 
            remove_temp=True,
            preset='medium',
            bitrate='2000k' # Target reasonable size
        )
        
        clip.close()
        return True

    except Exception as e:
        print(f"Error processing video: {e}")
        return False

if __name__ == "__main__":
    # Test
    # download_video("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "test.mp4")
    # process_video_for_social("test.mp4", "output.mp4")
    pass
