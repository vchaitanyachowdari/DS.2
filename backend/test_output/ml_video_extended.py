"""
Extended duration Manim scenes for 5-minute video
Each scene is timed to match the narration duration
"""
from manim import *
import numpy as np

config.pixel_height = 720
config.pixel_width = 1280
config.frame_rate = 24
config.background_color = "#1a1a2e"

# Narration durations (in seconds) for each slide
DURATIONS = {
    "IntroScene": 45,
    "WhatIsML": 45,
    "TypesOfML": 40,
    "NeuralNetworks": 40,
    "TrainingProcess": 45,
    "KeyConcepts": 40,
    "Applications": 35,
    "GettingStarted": 40
}

class IntroScene(Scene):
    def construct(self):
        # Title card - 45 seconds
        title = Text("Introduction to\nMachine Learning", font_size=56, color=WHITE)
        subtitle = Text("A Beginner's Guide", font_size=28, color=BLUE_C)
        subtitle.next_to(title, DOWN, buff=0.5)
        
        self.play(Write(title), run_time=3)
        self.play(FadeIn(subtitle), run_time=1.5)
        self.wait(8)
        
        # Animated background elements
        dots = VGroup(*[Dot(color=random_color(), radius=0.05).move_to(
            [np.random.uniform(-7, 7), np.random.uniform(-4, 4), 0]
        ) for _ in range(50)])
        
        self.play(FadeIn(dots, lag_ratio=0.1), run_time=5)
        self.wait(10)
        
        self.play(FadeOut(title), FadeOut(subtitle), FadeOut(dots), run_time=2)
        self.wait(15)  # Total ~45s

class WhatIsML(Scene):
    def construct(self):
        # What is ML - 45 seconds
        title = Text("What is Machine Learning?", font_size=42, color=BLUE_C).to_edge(UP)
        self.play(Write(title), run_time=2)
        
        # Brain to Computer comparison
        brain = Circle(radius=1.2, color=PINK, fill_opacity=0.3).shift(LEFT * 3.5)
        brain_label = Text("Human\nLearning", font_size=22).move_to(brain)
        
        computer = RoundedRectangle(height=2.4, width=2.4, corner_radius=0.2, 
                                    color=GREEN, fill_opacity=0.3).shift(RIGHT * 3.5)
        computer_label = Text("Machine\nLearning", font_size=22).move_to(computer)
        
        arrow = Arrow(brain.get_right(), computer.get_left(), color=YELLOW, buff=0.3)
        arrow_label = Text("Inspired by", font_size=18).next_to(arrow, UP, buff=0.2)
        
        self.play(Create(brain), Write(brain_label), run_time=2)
        self.wait(3)
        self.play(Create(arrow), Write(arrow_label), run_time=1.5)
        self.wait(2)
        self.play(Create(computer), Write(computer_label), run_time=2)
        self.wait(5)
        
        # Transition to data visualization
        self.play(FadeOut(brain), FadeOut(brain_label), FadeOut(arrow), 
                  FadeOut(arrow_label), FadeOut(computer), FadeOut(computer_label), run_time=1.5)
        
        # Data points visualization
        data_subtitle = Text("Learning from Data", font_size=28, color=GREEN).next_to(title, DOWN, buff=0.5)
        self.play(Write(data_subtitle), run_time=1)
        
        data_points = VGroup(*[Dot(
            point=[np.random.uniform(-5, 5), np.random.uniform(-2.5, 1.5), 0], 
            color=BLUE if np.random.random() > 0.5 else RED,
            radius=0.1
        ) for _ in range(40)])
        
        self.play(Create(data_points, lag_ratio=0.05), run_time=4)
        self.wait(8)
        
        # Pattern recognition
        pattern_line = Line([-5, -0.5, 0], [5, 0.5, 0], color=YELLOW, stroke_width=3)
        self.play(Create(pattern_line), run_time=2)
        self.wait(10)

class TypesOfML(Scene):
    def construct(self):
        # Types of ML - 40 seconds
        title = Text("Types of Machine Learning", font_size=42, color=BLUE_C).to_edge(UP)
        self.play(Write(title), run_time=2)
        self.wait(2)
        
        # Three main types
        types_data = [
            ("Supervised\nLearning", GREEN, "Labeled data", LEFT * 4),
            ("Unsupervised\nLearning", ORANGE, "Find patterns", ORIGIN),
            ("Reinforcement\nLearning", PURPLE, "Learn by rewards", RIGHT * 4)
        ]
        
        boxes = VGroup()
        for name, color, desc, pos in types_data:
            box = RoundedRectangle(height=2.8, width=3.2, corner_radius=0.2, 
                                   color=color, fill_opacity=0.2)
            box.shift(pos + DOWN * 0.3)
            text = Text(name, font_size=20).move_to(box)
            desc_text = Text(desc, font_size=14, color=GRAY).next_to(box, DOWN, buff=0.2)
            group = VGroup(box, text, desc_text)
            boxes.add(group)
        
        for i, box in enumerate(boxes):
            self.play(Create(box), run_time=1.5)
            self.wait(3 + i)
        
        self.wait(15)

class NeuralNetworks(Scene):
    def construct(self):
        # Neural Networks - 40 seconds
        title = Text("Neural Networks", font_size=42, color=BLUE_C).to_edge(UP)
        self.play(Write(title), run_time=2)
        
        # Build neural network visualization
        layers = [3, 5, 5, 2]
        layer_x_positions = [-4.5, -1.5, 1.5, 4.5]
        
        all_nodes = VGroup()
        all_edges = VGroup()
        
        # Create nodes
        for i, (num_nodes, x_pos) in enumerate(zip(layers, layer_x_positions)):
            layer_nodes = VGroup()
            for j in range(num_nodes):
                y_pos = (j - (num_nodes - 1) / 2) * 1
                color = BLUE if i == 0 else (GREEN if i == len(layers)-1 else WHITE)
                node = Circle(radius=0.25, color=color, fill_opacity=0.5)
                node.move_to([x_pos, y_pos, 0])
                layer_nodes.add(node)
            all_nodes.add(layer_nodes)
        
        # Create edges
        for i in range(len(layers) - 1):
            for node1 in all_nodes[i]:
                for node2 in all_nodes[i + 1]:
                    edge = Line(node1.get_center(), node2.get_center(), 
                               color=GRAY, stroke_width=0.5, stroke_opacity=0.5)
                    all_edges.add(edge)
        
        self.play(Create(all_edges), run_time=2)
        self.play(Create(all_nodes), run_time=2)
        
        # Labels
        labels = VGroup(
            Text("Input", font_size=18).next_to(all_nodes[0], DOWN, buff=0.4),
            Text("Hidden Layers", font_size=18).move_to([0, -2.5, 0]),
            Text("Output", font_size=18).next_to(all_nodes[-1], DOWN, buff=0.4)
        )
        self.play(Write(labels), run_time=1.5)
        
        # Animate signal flow
        self.wait(3)
        for _ in range(2):
            signal = Dot(color=YELLOW, radius=0.15).move_to(all_nodes[0][1])
            self.play(signal.animate.move_to(all_nodes[1][2]), run_time=0.8)
            self.play(signal.animate.move_to(all_nodes[2][2]), run_time=0.8)
            self.play(signal.animate.move_to(all_nodes[3][0]), run_time=0.8)
            self.play(FadeOut(signal), run_time=0.3)
        
        self.wait(20)

class TrainingProcess(Scene):
    def construct(self):
        # Training Process - 45 seconds
        title = Text("Training a Model", font_size=42, color=BLUE_C).to_edge(UP)
        self.play(Write(title), run_time=2)
        
        # Process flow
        steps = ["Prepare\nData", "Split\nData", "Train\nModel", "Evaluate"]
        colors = [BLUE, GREEN, ORANGE, PURPLE]
        boxes = VGroup()
        
        for i, (step, color) in enumerate(zip(steps, colors)):
            box = RoundedRectangle(height=1.8, width=2.3, corner_radius=0.15, 
                                   color=color, fill_opacity=0.3)
            box.shift(LEFT * 5 + RIGHT * i * 3.3 + DOWN * 0.5)
            text = Text(step, font_size=18).move_to(box)
            boxes.add(VGroup(box, text))
        
        # Animate boxes appearing with arrows
        arrows = VGroup()
        for i in range(len(steps) - 1):
            arrow = Arrow(boxes[i].get_right(), boxes[i + 1].get_left(), 
                         buff=0.15, color=YELLOW)
            arrows.add(arrow)
        
        for i, box in enumerate(boxes):
            self.play(Create(box), run_time=1)
            if i < len(arrows):
                self.play(Create(arrows[i]), run_time=0.5)
            self.wait(2)
        
        # Show iteration cycle
        cycle_arrow = CurvedArrow(boxes[-1].get_bottom(), boxes[2].get_bottom(), 
                                  angle=-TAU/4, color=RED)
        cycle_label = Text("Iterate", font_size=16, color=RED).next_to(cycle_arrow, DOWN)
        
        self.play(Create(cycle_arrow), Write(cycle_label), run_time=1.5)
        self.wait(20)

class KeyConcepts(Scene):
    def construct(self):
        # Key Concepts - 40 seconds
        title = Text("Key Concepts", font_size=42, color=BLUE_C).to_edge(UP)
        self.play(Write(title), run_time=2)
        
        concepts = [
            ("Features", "Input variables for prediction", GREEN),
            ("Labels", "Output we want to predict", BLUE),
            ("Loss Function", "Measures prediction error", ORANGE),
            ("Optimization", "Improves model iteratively", PURPLE)
        ]
        
        items = VGroup()
        for i, (term, desc, color) in enumerate(concepts):
            bullet = Dot(color=color, radius=0.1).shift(LEFT * 5.5 + DOWN * (i * 0.9 - 0.5))
            term_text = Text(term + ":", font_size=24, color=color)
            term_text.next_to(bullet, RIGHT, buff=0.2)
            desc_text = Text(desc, font_size=20, color=WHITE)
            desc_text.next_to(term_text, RIGHT, buff=0.3)
            items.add(VGroup(bullet, term_text, desc_text))
        
        for item in items:
            self.play(FadeIn(item, shift=RIGHT * 0.5), run_time=1)
            self.wait(3)
        
        self.wait(15)

class Applications(Scene):
    def construct(self):
        # Applications - 35 seconds
        title = Text("Real World Applications", font_size=42, color=BLUE_C).to_edge(UP)
        self.play(Write(title), run_time=2)
        
        # Central ML node
        ml_center = VGroup(
            Circle(radius=1, color=BLUE, fill_opacity=0.3),
            Text("Machine\nLearning", font_size=20)
        )
        self.play(Create(ml_center), run_time=1)
        
        # Applications around
        apps = [
            ("Voice\nAssistants", RED),
            ("Recommendations", GREEN),
            ("Self-Driving\nCars", ORANGE),
            ("Healthcare", PINK),
            ("Finance", PURPLE),
            ("Gaming", YELLOW)
        ]
        
        app_nodes = VGroup()
        for i, (app, color) in enumerate(apps):
            angle = i * TAU / len(apps) - TAU / 4
            pos = 3.2 * np.array([np.cos(angle), np.sin(angle), 0])
            
            node = VGroup(
                RoundedRectangle(height=1, width=1.8, corner_radius=0.1, 
                                color=color, fill_opacity=0.3),
                Text(app, font_size=14)
            ).move_to(pos)
            
            line = Line(ml_center.get_center(), pos * 0.7, color=GRAY, stroke_width=1)
            app_nodes.add(VGroup(line, node))
        
        for app_node in app_nodes:
            self.play(Create(app_node), run_time=0.7)
        
        self.wait(20)

class GettingStarted(Scene):
    def construct(self):
        # Getting Started - 40 seconds
        title = Text("Getting Started", font_size=42, color=BLUE_C).to_edge(UP)
        self.play(Write(title), run_time=2)
        
        steps = [
            "1. Learn Python programming",
            "2. Master NumPy and Pandas",
            "3. Explore scikit-learn",
            "4. Try TensorFlow or PyTorch",
            "5. Practice on Kaggle"
        ]
        
        colors = [BLUE, GREEN, ORANGE, PURPLE, RED]
        step_texts = VGroup()
        
        for i, (step, color) in enumerate(zip(steps, colors)):
            check = Text("[  ]", font_size=22, color=GRAY)
            text = Text(step, font_size=24, color=WHITE)
            row = VGroup(check, text).arrange(RIGHT, buff=0.3)
            row.shift(LEFT * 2 + DOWN * (i * 0.8 - 1.5))
            step_texts.add(VGroup(check, text))
        
        for i, step_text in enumerate(step_texts):
            self.play(FadeIn(step_text, shift=RIGHT * 0.5), run_time=0.8)
            self.wait(1.5)
            # Check the box
            checkmark = Text("[X]", font_size=22, color=colors[i])
            checkmark.move_to(step_text[0])
            self.play(Transform(step_text[0], checkmark), run_time=0.3)
        
        self.wait(3)
        
        # Ending
        self.play(FadeOut(title), FadeOut(step_texts), run_time=1)
        thanks = Text("Thanks for watching!", font_size=48, color=BLUE_C)
        self.play(Write(thanks), run_time=2)
        self.wait(5)
