"""
Synchronize video slides with their individual audio narrations
Creates properly synced video with each slide matching its narration duration
"""
import subprocess
import os
from pathlib import Path

# Paths
BASE_DIR = Path(".")
VIDEO_DIR = BASE_DIR / "media" / "videos" / "ai_unveiled" / "720p24"
AUDIO_DIR = BASE_DIR / "ai_unveiled_output"
OUTPUT_DIR = BASE_DIR / "synced_output"
OUTPUT_DIR.mkdir(exist_ok=True)

# Slide mappings
SLIDES = [
    ("Slide1_Introduction.mp4", "narration_00.mp3"),
    ("Slide2_WhatIsAI.mp4", "narration_01.mp3"),
    ("Slide3_Evolution.mp4", "narration_02.mp3"),
    ("Slide4_Goals.mp4", "narration_03.mp3"),
    ("Slide5_Applications.mp4", "narration_04.mp3"),
    ("Slide6_Ethics.mp4", "narration_05.mp3"),
    ("Slide7_Future.mp4", "narration_06.mp3"),
    ("Slide8_Conclusion.mp4", "narration_07.mp3"),
]

def get_duration(file_path):
    """Get media file duration in seconds"""
    result = subprocess.run([
        "ffprobe", "-v", "error", 
        "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1",
        str(file_path)
    ], capture_output=True, text=True)
    return float(result.stdout.strip())

def sync_slide_with_audio(video_file, audio_file, output_file):
    """
    Sync a video slide with its audio narration.
    - If video is shorter than audio: loop/freeze last frame
    - If video is longer than audio: trim video to audio length
    """
    video_path = VIDEO_DIR / video_file
    audio_path = AUDIO_DIR / audio_file
    
    video_dur = get_duration(video_path)
    audio_dur = get_duration(audio_path)
    
    print(f"  Video: {video_dur:.1f}s, Audio: {audio_dur:.1f}s")
    
    if video_dur < audio_dur:
        # Video is shorter - we need to extend it
        # Use filter to loop/freeze the video to match audio duration
        cmd = [
            "ffmpeg", "-y",
            "-i", str(video_path),
            "-i", str(audio_path),
            "-filter_complex", 
            f"[0:v]tpad=stop_mode=clone:stop_duration={audio_dur - video_dur}[v]",
            "-map", "[v]",
            "-map", "1:a",
            "-c:v", "libx264",
            "-preset", "fast",
            "-c:a", "aac",
            "-shortest",
            str(output_file)
        ]
    else:
        # Video is longer or equal - trim to audio duration
        cmd = [
            "ffmpeg", "-y",
            "-i", str(video_path),
            "-i", str(audio_path),
            "-c:v", "copy",
            "-c:a", "aac",
            "-map", "0:v:0",
            "-map", "1:a:0",
            "-t", str(audio_dur),
            str(output_file)
        ]
    
    subprocess.run(cmd, capture_output=True)
    return output_file

def main():
    print("=" * 60)
    print("Synchronizing AI Unveiled Video with Audio")
    print("=" * 60)
    
    synced_videos = []
    
    for i, (video, audio) in enumerate(SLIDES):
        output_file = OUTPUT_DIR / f"slide_{i+1:02d}_synced.mp4"
        print(f"\nSlide {i+1}: {video}")
        
        sync_slide_with_audio(video, audio, output_file)
        
        if output_file.exists():
            dur = get_duration(output_file)
            print(f"  ✓ Created synced slide: {dur:.1f}s")
            synced_videos.append(output_file)
        else:
            print(f"  ✗ Failed to create synced slide")
    
    # Create concat list
    print("\n" + "=" * 60)
    print("Concatenating all synced slides...")
    
    list_file = OUTPUT_DIR / "synced_list.txt"
    with open(list_file, "w") as f:
        for video in synced_videos:
            f.write(f"file '{video.name}'\n")
    
    # Final concatenation
    final_output = BASE_DIR / "AI_Unveiled_Synced.mp4"
    subprocess.run([
        "ffmpeg", "-y",
        "-f", "concat",
        "-safe", "0",
        "-i", str(list_file),
        "-c", "copy",
        str(final_output)
    ], capture_output=True, cwd=str(OUTPUT_DIR))
    
    if final_output.exists():
        final_dur = get_duration(final_output)
        final_size = final_output.stat().st_size / (1024 * 1024)
        print(f"\n✅ Final synced video created!")
        print(f"   File: {final_output}")
        print(f"   Duration: {int(final_dur // 60)}m {int(final_dur % 60)}s")
        print(f"   Size: {final_size:.2f} MB")
    else:
        print("\n✗ Failed to create final video")
    
    print("=" * 60)

if __name__ == "__main__":
    main()
