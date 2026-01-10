"""Generate audio for AI Unveiled video"""
import asyncio
import subprocess
from pathlib import Path

OUTPUT_DIR = Path("ai_unveiled_output")
OUTPUT_DIR.mkdir(exist_ok=True)

# Narrations from the script
NARRATIONS = [
    "Welcome to the incredible journey into Artificial Intelligence, or AI, a field blending computer science with ingenious algorithms to create machines that think and act like humans. Imagine a world where machines learn from their experiences and make decisions just like we do. Intrigued? Let's dive in!",
    "At its core, AI is the brains behind machines, enabling them to learn, reason, and solve problems. It's why your smartphone can respond to your voice and why some cars can drive themselves. But how did this technology come to be, and why is it so important? Let's find out.",
    "The journey of AI began in the 1950s, evolving from simple puzzles to machines that can beat humans in complex games. But it's not been smooth sailing; the field has seen both booms and winters. Yet, recent advancements have led us into an AI boom, thanks to deep learning and neural networks.",
    "AI aims to mimic human intelligence. This includes learning from data, understanding languages, recognizing objects and sounds, and making decisions. Researchers use various techniques, drawing from psychology to computer science, to create smarter AI.",
    "AI is not just theory; it's all around us. From recommending the next song on your playlist to powering chatbots that answer your questions, AI makes many modern conveniences possible. And it's pushing boundaries in healthcare, finance, and even creative arts.",
    "But with great power comes great responsibility. AI's rapid growth raises ethical questions, from privacy concerns to the impact on jobs. How do we ensure AI benefits society without causing harm? It's a global conversation we're all a part of.",
    "What lies ahead for AI? The possibilities are as vast as our imagination. From achieving Artificial General Intelligence, where machines can perform any cognitive task, to solving some of humanity's biggest challenges, the future of AI is both exciting and unknown.",
    "As we stand on the brink of AI's potential, it's clear that this technology isn't just about machines; it's about us. How we develop, use, and regulate AI will define the future. So, let's continue this journey with curiosity, creativity, and caution."
]

async def generate_audio():
    print("Generating audio for AI Unveiled video...")
    
    for i, text in enumerate(NARRATIONS):
        output_file = OUTPUT_DIR / f"narration_{i:02d}.mp3"
        escaped_text = text.replace('"', '\\"').replace("'", "\\'")
        
        cmd = f'python -m edge_tts --voice "en-US-GuyNeural" --rate="-5%" --text "{escaped_text}" --write-media "{output_file}"'
        
        print(f"  Generating slide {i+1}/8...")
        process = await asyncio.create_subprocess_shell(cmd, stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.PIPE)
        await process.communicate()
        
        if output_file.exists():
            print(f"    ✓ {output_file.name}")
        else:
            print(f"    ✗ Failed")
    
    # Combine audio
    print("\nCombining audio files...")
    list_content = "\n".join([f"file 'narration_{i:02d}.mp3'" for i in range(8)])
    (OUTPUT_DIR / "audio_list.txt").write_text(list_content)
    
    subprocess.run([
        "ffmpeg", "-y", "-f", "concat", "-safe", "0",
        "-i", str(OUTPUT_DIR / "audio_list.txt"),
        "-c:a", "libmp3lame", "-q:a", "2",
        str(OUTPUT_DIR / "full_narration.mp3")
    ], capture_output=True)
    
    print("✓ Combined audio saved to full_narration.mp3")

if __name__ == "__main__":
    asyncio.run(generate_audio())
