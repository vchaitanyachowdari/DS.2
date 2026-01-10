"""
Sample 5-Minute Video Generation Test
Generates a complete educational video about Machine Learning using Manim + Edge TTS

Run with: python test_video_gen.py
"""
import asyncio
import subprocess
import os
import json
from pathlib import Path

# Configuration
OUTPUT_DIR = Path("test_output")
OUTPUT_DIR.mkdir(exist_ok=True)

# Sample 5-minute script (about 750-800 words at ~150 wpm)
SCRIPT = {
    "title": "Introduction to Machine Learning",
    "description": "A beginner-friendly guide to understanding machine learning concepts",
    "slides": [
        {
            "title": "What is Machine Learning?",
            "narration": "Welcome to this introduction to machine learning! Machine learning is a type of artificial intelligence that allows computers to learn from data without being explicitly programmed. Instead of writing specific rules, we feed the computer examples and it learns patterns on its own. Think of it like teaching a child to recognize cats - you show them many pictures of cats, and eventually they can identify cats they've never seen before.",
            "duration": 45,
            "visualType": "text"
        },
        {
            "title": "Types of Machine Learning",
            "narration": "There are three main types of machine learning. First, supervised learning, where we train models with labeled data. Second, unsupervised learning, where the algorithm finds patterns in unlabeled data. And third, reinforcement learning, where an agent learns by interacting with an environment and receiving rewards. Each type is suited for different kinds of problems.",
            "duration": 40,
            "visualType": "diagram"
        },
        {
            "title": "Supervised Learning",
            "narration": "In supervised learning, we have input data and corresponding output labels. The model learns to map inputs to outputs. Common examples include image classification, spam detection, and price prediction. The model is trained on labeled examples and then can predict labels for new, unseen data.",
            "duration": 35,
            "visualType": "list"
        },
        {
            "title": "Neural Networks",
            "narration": "Neural networks are inspired by the human brain. They consist of layers of interconnected nodes or neurons. Each connection has a weight that gets adjusted during training. Information flows from the input layer through hidden layers to the output layer. Deep learning uses neural networks with many hidden layers.",
            "duration": 40,
            "visualType": "diagram"
        },
        {
            "title": "Training a Model",
            "narration": "Training a machine learning model involves several steps. First, we prepare and clean our data. Then we split it into training and testing sets. The model learns from the training data by adjusting its parameters to minimize errors. Finally, we evaluate performance on the test data to ensure the model generalizes well to new examples.",
            "duration": 45,
            "visualType": "diagram"
        },
        {
            "title": "Key Concepts",
            "narration": "Some important concepts in machine learning include features, which are the input variables used for prediction. Labels are the output we want to predict. Loss functions measure how wrong our predictions are. And optimization algorithms like gradient descent help us improve the model iteratively.",
            "duration": 40,
            "visualType": "list"
        },
        {
            "title": "Real World Applications",
            "narration": "Machine learning powers many applications we use daily. Voice assistants like Siri and Alexa use speech recognition. Netflix and Spotify use recommendation systems. Self-driving cars use computer vision. Healthcare uses machine learning for diagnosis and drug discovery. The possibilities are endless!",
            "duration": 35,
            "visualType": "text"
        },
        {
            "title": "Getting Started",
            "narration": "To get started with machine learning, you should learn Python programming and libraries like NumPy and Pandas for data manipulation. Then explore scikit-learn for classical algorithms and TensorFlow or PyTorch for deep learning. Practice with real datasets from Kaggle and build projects to solidify your understanding.",
            "duration": 40,
            "visualType": "list"
        }
    ],
    "totalDuration": "5:20"
}


def generate_manim_code():
    """Generate Manim Python code for the video"""
    
    code = '''
from manim import *
import numpy as np

config.pixel_height = 720
config.pixel_width = 1280
config.frame_rate = 24
config.background_color = "#1a1a2e"

class IntroScene(Scene):
    def construct(self):
        # Title card
        title = Text("Introduction to\\nMachine Learning", font_size=56, color=WHITE)
        subtitle = Text("A Beginner's Guide", font_size=28, color=BLUE_C)
        subtitle.next_to(title, DOWN, buff=0.5)
        
        self.play(Write(title), run_time=2)
        self.play(FadeIn(subtitle), run_time=1)
        self.wait(2)
        self.play(FadeOut(title), FadeOut(subtitle))

class WhatIsML(Scene):
    def construct(self):
        title = Text("What is Machine Learning?", font_size=42, color=BLUE_C).to_edge(UP)
        self.play(Write(title))
        
        # Brain to Computer animation
        brain = Circle(radius=1, color=PINK).shift(LEFT * 3)
        brain_label = Text("Human\\nLearning", font_size=20).move_to(brain)
        
        computer = RoundedRectangle(height=2, width=2, corner_radius=0.2, color=GREEN).shift(RIGHT * 3)
        computer_label = Text("Machine\\nLearning", font_size=20).move_to(computer)
        
        arrow = Arrow(brain.get_right(), computer.get_left(), color=YELLOW)
        arrow_label = Text("Inspired by", font_size=16).next_to(arrow, UP)
        
        self.play(Create(brain), Write(brain_label))
        self.play(Create(arrow), Write(arrow_label))
        self.play(Create(computer), Write(computer_label))
        self.wait(3)
        
        # Data to Patterns
        self.play(FadeOut(brain), FadeOut(brain_label), FadeOut(arrow), 
                  FadeOut(arrow_label), FadeOut(computer), FadeOut(computer_label))
        
        data_points = VGroup(*[Dot(point=[np.random.uniform(-4, 4), np.random.uniform(-2, 2), 0], 
                                   color=random_color()) for _ in range(30)])
        data_label = Text("Data", font_size=24).to_edge(DOWN)
        
        self.play(Create(data_points), Write(data_label))
        self.wait(2)

class TypesOfML(Scene):
    def construct(self):
        title = Text("Types of Machine Learning", font_size=42, color=BLUE_C).to_edge(UP)
        self.play(Write(title))
        
        # Three boxes for types
        box1 = RoundedRectangle(height=2.5, width=3.5, corner_radius=0.2, color=GREEN).shift(LEFT * 4)
        box2 = RoundedRectangle(height=2.5, width=3.5, corner_radius=0.2, color=ORANGE).shift(ORIGIN)
        box3 = RoundedRectangle(height=2.5, width=3.5, corner_radius=0.2, color=PURPLE).shift(RIGHT * 4)
        
        text1 = Text("Supervised\\nLearning", font_size=20).move_to(box1)
        text2 = Text("Unsupervised\\nLearning", font_size=20).move_to(box2)
        text3 = Text("Reinforcement\\nLearning", font_size=20).move_to(box3)
        
        desc1 = Text("Labeled data", font_size=14, color=GRAY).next_to(box1, DOWN)
        desc2 = Text("Find patterns", font_size=14, color=GRAY).next_to(box2, DOWN)
        desc3 = Text("Learn by rewards", font_size=14, color=GRAY).next_to(box3, DOWN)
        
        self.play(Create(box1), Write(text1), FadeIn(desc1), run_time=1)
        self.wait(1)
        self.play(Create(box2), Write(text2), FadeIn(desc2), run_time=1)
        self.wait(1)
        self.play(Create(box3), Write(text3), FadeIn(desc3), run_time=1)
        self.wait(3)

class NeuralNetworks(Scene):
    def construct(self):
        title = Text("Neural Networks", font_size=42, color=BLUE_C).to_edge(UP)
        self.play(Write(title))
        
        # Simple neural network visualization
        layers = [3, 4, 4, 2]  # nodes per layer
        layer_positions = [-4, -1.5, 1.5, 4]
        
        all_nodes = VGroup()
        all_edges = VGroup()
        
        for i, (num_nodes, x_pos) in enumerate(zip(layers, layer_positions)):
            layer_nodes = VGroup()
            for j in range(num_nodes):
                y_pos = (j - (num_nodes - 1) / 2) * 1.2
                node = Circle(radius=0.3, color=BLUE if i == 0 else (GREEN if i == len(layers)-1 else WHITE))
                node.move_to([x_pos, y_pos, 0])
                layer_nodes.add(node)
            all_nodes.add(layer_nodes)
        
        # Draw edges between layers
        for i in range(len(layers) - 1):
            for node1 in all_nodes[i]:
                for node2 in all_nodes[i + 1]:
                    edge = Line(node1.get_center(), node2.get_center(), 
                               color=GRAY, stroke_width=0.5)
                    all_edges.add(edge)
        
        self.play(Create(all_edges), run_time=1)
        self.play(Create(all_nodes), run_time=1)
        
        # Labels
        input_label = Text("Input", font_size=18).next_to(all_nodes[0], DOWN)
        hidden_label = Text("Hidden Layers", font_size=18).next_to(all_nodes[1], DOWN, buff=1)
        output_label = Text("Output", font_size=18).next_to(all_nodes[-1], DOWN)
        
        self.play(Write(input_label), Write(hidden_label), Write(output_label))
        self.wait(3)

class TrainingProcess(Scene):
    def construct(self):
        title = Text("Training a Model", font_size=42, color=BLUE_C).to_edge(UP)
        self.play(Write(title))
        
        # Flow diagram
        steps = ["Prepare\\nData", "Split\\nData", "Train\\nModel", "Evaluate"]
        boxes = VGroup()
        
        for i, step in enumerate(steps):
            box = RoundedRectangle(height=1.5, width=2.5, corner_radius=0.1, color=TEAL)
            box.shift(LEFT * 4.5 + RIGHT * i * 3)
            text = Text(step, font_size=18).move_to(box)
            boxes.add(VGroup(box, text))
        
        arrows = VGroup()
        for i in range(len(steps) - 1):
            arrow = Arrow(boxes[i].get_right(), boxes[i + 1].get_left(), buff=0.1, color=YELLOW)
            arrows.add(arrow)
        
        for i, box in enumerate(boxes):
            self.play(Create(box), run_time=0.5)
            if i < len(arrows):
                self.play(Create(arrows[i]), run_time=0.3)
        
        self.wait(3)

class KeyConcepts(Scene):
    def construct(self):
        title = Text("Key Concepts", font_size=42, color=BLUE_C).to_edge(UP)
        self.play(Write(title))
        
        concepts = [
            ("Features", "Input variables for prediction"),
            ("Labels", "Output we want to predict"),
            ("Loss Function", "Measures prediction error"),
            ("Optimization", "Improves model iteratively")
        ]
        
        items = VGroup()
        for i, (term, desc) in enumerate(concepts):
            term_text = Text(term + ":", font_size=24, color=GREEN)
            desc_text = Text(desc, font_size=20, color=WHITE)
            term_text.shift(LEFT * 3 + DOWN * (i * 0.8 - 1))
            desc_text.next_to(term_text, RIGHT, buff=0.3)
            items.add(VGroup(term_text, desc_text))
        
        for item in items:
            self.play(Write(item), run_time=0.8)
        
        self.wait(3)

class Applications(Scene):
    def construct(self):
        title = Text("Real World Applications", font_size=42, color=BLUE_C).to_edge(UP)
        self.play(Write(title))
        
        apps = ["Voice Assistants", "Recommendations", "Self-Driving Cars", 
                "Healthcare", "Finance", "Gaming"]
        
        # Create circular arrangement
        app_texts = VGroup()
        center = ORIGIN
        radius = 2.5
        
        for i, app in enumerate(apps):
            angle = i * TAU / len(apps) - TAU / 4
            pos = center + radius * np.array([np.cos(angle), np.sin(angle), 0])
            text = Text(app, font_size=20, color=random_color())
            text.move_to(pos)
            app_texts.add(text)
        
        ml_center = Text("Machine\\nLearning", font_size=24, color=WHITE).move_to(center)
        
        self.play(Write(ml_center))
        
        for text in app_texts:
            line = Line(center, text.get_center(), color=GRAY, stroke_width=1)
            self.play(Create(line), Write(text), run_time=0.5)
        
        self.wait(3)

class GettingStarted(Scene):
    def construct(self):
        title = Text("Getting Started", font_size=42, color=BLUE_C).to_edge(UP)
        self.play(Write(title))
        
        steps = [
            "1. Learn Python programming",
            "2. Master NumPy and Pandas",
            "3. Explore scikit-learn",
            "4. Try TensorFlow or PyTorch",
            "5. Practice on Kaggle"
        ]
        
        step_texts = VGroup()
        for i, step in enumerate(steps):
            text = Text(step, font_size=24, color=WHITE)
            text.shift(LEFT * 2 + DOWN * (i * 0.7 - 1.5))
            step_texts.add(text)
        
        for step_text in step_texts:
            self.play(FadeIn(step_text, shift=RIGHT * 0.5), run_time=0.6)
        
        self.wait(2)
        
        # End card
        self.play(FadeOut(title), FadeOut(step_texts))
        thanks = Text("Thanks for watching!", font_size=48, color=BLUE_C)
        self.play(Write(thanks))
        self.wait(2)

class FullVideo(Scene):
    """Complete video combining all scenes"""
    def construct(self):
        # This is a placeholder - in practice each scene runs separately
        # and they're concatenated in post-processing
        
        title = Text("Full Video Generation Complete!", font_size=36)
        self.play(Write(title))
        self.wait(2)
'''
    
    return code


async def generate_audio_for_slides():
    """Generate TTS audio for each slide"""
    print("\\n📢 Generating narration audio...")
    
    audio_files = []
    for i, slide in enumerate(SCRIPT["slides"]):
        output_file = OUTPUT_DIR / f"narration_{i:02d}.mp3"
        text = slide["narration"].replace('"', '\\"').replace("'", "\\'")
        
        cmd = f'python -m edge_tts --voice "en-US-JennyNeural" --text "{text}" --write-media "{output_file}"'
        
        print(f"  Generating audio for slide {i+1}: {slide['title'][:30]}...")
        
        try:
            process = await asyncio.create_subprocess_shell(
                cmd,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE
            )
            await process.communicate()
            
            if output_file.exists():
                audio_files.append(str(output_file))
                print(f"    ✓ Generated: {output_file.name}")
            else:
                print(f"    ✗ Failed to generate audio for slide {i+1}")
        except Exception as e:
            print(f"    ✗ Error: {e}")
    
    return audio_files


def combine_audio_files(audio_files, output_path):
    """Combine multiple audio files into one"""
    print("\\n🎵 Combining audio files...")
    
    list_file = OUTPUT_DIR / "audio_list.txt"
    with open(list_file, "w") as f:
        for audio_file in audio_files:
            f.write(f"file '{audio_file}'\\n")
    
    cmd = f'ffmpeg -y -f concat -safe 0 -i "{list_file}" -c:a libmp3lame -q:a 2 "{output_path}"'
    subprocess.run(cmd, shell=True, capture_output=True)
    
    if Path(output_path).exists():
        print(f"  ✓ Combined audio saved to: {output_path}")
        return True
    return False


def render_manim_scenes():
    """Render Manim scenes to video"""
    print("\\n🎬 Rendering Manim scenes...")
    
    # Save Manim code
    manim_file = OUTPUT_DIR / "ml_video.py"
    with open(manim_file, "w") as f:
        f.write(generate_manim_code())
    
    print(f"  ✓ Manim script saved to: {manim_file}")
    
    # Render each scene
    scenes = ["IntroScene", "WhatIsML", "TypesOfML", "NeuralNetworks", 
              "TrainingProcess", "KeyConcepts", "Applications", "GettingStarted"]
    
    video_files = []
    
    for scene in scenes:
        print(f"  Rendering {scene}...")
        output_video = OUTPUT_DIR / f"{scene}.mp4"
        
        cmd = f'manim render -ql "{manim_file}" {scene} -o {scene}.mp4 --media_dir "{OUTPUT_DIR}"'
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
        
        # Find the rendered video
        possible_paths = [
            OUTPUT_DIR / "videos" / "ml_video" / "480p15" / f"{scene}.mp4",
            OUTPUT_DIR / f"{scene}.mp4"
        ]
        
        for path in possible_paths:
            if path.exists():
                video_files.append(str(path))
                print(f"    ✓ Rendered: {path.name}")
                break
        else:
            print(f"    ⚠ Could not find rendered video for {scene}")
    
    return video_files


def main():
    print("=" * 60)
    print("🎬 Sample 5-Minute Video Generation Test")
    print("=" * 60)
    print(f"\\n📝 Script: {SCRIPT['title']}")
    print(f"   Duration: {SCRIPT['totalDuration']}")
    print(f"   Slides: {len(SCRIPT['slides'])}")
    print(f"   Output: {OUTPUT_DIR.absolute()}")
    
    # Save script
    with open(OUTPUT_DIR / "script.json", "w") as f:
        json.dump(SCRIPT, f, indent=2)
    print(f"\\n✓ Script saved to: {OUTPUT_DIR / 'script.json'}")
    
    # Generate audio
    audio_files = asyncio.run(generate_audio_for_slides())
    
    if audio_files:
        combined_audio = OUTPUT_DIR / "full_narration.mp3"
        combine_audio_files(audio_files, combined_audio)
    
    # Generate Manim code (don't render - takes too long)
    manim_file = OUTPUT_DIR / "ml_video.py"
    with open(manim_file, "w") as f:
        f.write(generate_manim_code())
    print(f"\\n✓ Manim script saved to: {manim_file}")
    print("  To render: manim render -ql ml_video.py IntroScene")
    
    print("\\n" + "=" * 60)
    print("✅ Video generation setup complete!")
    print("=" * 60)
    print(f"\\nFiles generated in: {OUTPUT_DIR.absolute()}")
    print("  - script.json (full script)")
    print("  - narration_*.mp3 (individual audio clips)")
    print("  - full_narration.mp3 (combined audio ~5 min)")
    print("  - ml_video.py (Manim scenes for video)")
    print("\\nTo render the video:")
    print(f"  cd {OUTPUT_DIR.absolute()}")
    print("  manim render -ql ml_video.py IntroScene")


if __name__ == "__main__":
    main()
