
from manim import *
import numpy as np

config.pixel_height = 720
config.pixel_width = 1280
config.frame_rate = 24
config.background_color = "#1a1a2e"

class IntroScene(Scene):
    def construct(self):
        # Title card
        title = Text("Introduction to\nMachine Learning", font_size=56, color=WHITE)
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
        brain_label = Text("Human\nLearning", font_size=20).move_to(brain)
        
        computer = RoundedRectangle(height=2, width=2, corner_radius=0.2, color=GREEN).shift(RIGHT * 3)
        computer_label = Text("Machine\nLearning", font_size=20).move_to(computer)
        
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
        
        text1 = Text("Supervised\nLearning", font_size=20).move_to(box1)
        text2 = Text("Unsupervised\nLearning", font_size=20).move_to(box2)
        text3 = Text("Reinforcement\nLearning", font_size=20).move_to(box3)
        
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
        steps = ["Prepare\nData", "Split\nData", "Train\nModel", "Evaluate"]
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
        
        ml_center = Text("Machine\nLearning", font_size=24, color=WHITE).move_to(center)
        
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
