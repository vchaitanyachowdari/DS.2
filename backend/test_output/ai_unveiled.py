"""
AI Unveiled: Transforming Today's World
Complete video generation from custom script
Total duration: ~8:15
"""
from manim import *
import numpy as np

config.pixel_height = 720
config.pixel_width = 1280
config.frame_rate = 24
config.background_color = "#0f0f23"

class Slide1_Introduction(Scene):
    """Introduction - 30 seconds"""
    def construct(self):
        # Title with gradient effect
        title = Text("AI Unveiled", font_size=64, color=BLUE_C)
        subtitle = Text("Transforming Today's World", font_size=32, color=WHITE)
        subtitle.next_to(title, DOWN, buff=0.5)
        
        self.play(Write(title), run_time=2)
        self.play(FadeIn(subtitle, shift=UP), run_time=1)
        self.wait(2)
        
        # Animated AI applications
        self.play(FadeOut(title), FadeOut(subtitle))
        
        # Show different AI applications        
        # Create icons
        car = VGroup(
            RoundedRectangle(height=1, width=2, corner_radius=0.2, color=RED),
            Circle(radius=0.25, color=WHITE).shift(LEFT * 0.5 + DOWN * 0.5),
            Circle(radius=0.25, color=WHITE).shift(RIGHT * 0.5 + DOWN * 0.5)
        ).shift(LEFT * 4)
        
        phone = VGroup(
            RoundedRectangle(height=2, width=1.2, corner_radius=0.1, color=GRAY),
            Dot(color=WHITE).shift(UP * 0.7)
        ).shift(ORIGIN)
        
        robot = VGroup(
            RoundedRectangle(height=1.2, width=1, corner_radius=0.2, color=TEAL),
            Circle(radius=0.15, color=YELLOW).shift(LEFT * 0.2 + UP * 0.2),
            Circle(radius=0.15, color=YELLOW).shift(RIGHT * 0.2 + UP * 0.2),
            Line(LEFT * 0.2 + DOWN * 0.2, RIGHT * 0.2 + DOWN * 0.2, color=WHITE)
        ).shift(RIGHT * 4)
        
        intro_text = Text("Welcome to the World of AI", font_size=36, color=BLUE_C).to_edge(UP)
        
        self.play(Write(intro_text))
        self.play(Create(car), Create(phone), Create(robot), run_time=2)
        
        labels = VGroup(
            Text("Self-Driving", font_size=18).next_to(car, DOWN),
            Text("Voice AI", font_size=18).next_to(phone, DOWN),
            Text("Robotics", font_size=18).next_to(robot, DOWN)
        )
        self.play(Write(labels))
        self.wait(15)


class Slide2_WhatIsAI(Scene):
    """What is AI? - 45 seconds"""
    def construct(self):
        title = Text("What is AI?", font_size=48, color=BLUE_C).to_edge(UP)
        self.play(Write(title), run_time=1.5)
        
        # Brain illustration
        brain = VGroup()
        brain_outline = Ellipse(width=3, height=2.5, color=PINK, fill_opacity=0.3)
        
        # Neural pathways inside brain
        for _ in range(20):
            start = np.array([np.random.uniform(-1.2, 1.2), np.random.uniform(-0.8, 0.8), 0])
            end = start + np.array([np.random.uniform(-0.5, 0.5), np.random.uniform(-0.5, 0.5), 0])
            line = Line(start, end, color=YELLOW, stroke_width=1, stroke_opacity=0.7)
            brain.add(line)
        brain.add(brain_outline)
        brain.shift(LEFT * 3.5)
        
        brain_label = Text("Artificial Brain", font_size=20).next_to(brain, DOWN)
        
        self.play(Create(brain), Write(brain_label), run_time=2)
        
        # Arrow to capabilities
        arrow = Arrow(brain.get_right(), RIGHT * 0.5, color=YELLOW)
        self.play(Create(arrow))
        
        # Capabilities list
        capabilities = VGroup(
            VGroup(Text(">", font_size=28, color=YELLOW), Text("Learn", font_size=22)).arrange(RIGHT, buff=0.2),
            VGroup(Text(">", font_size=28, color=YELLOW), Text("Reason", font_size=22)).arrange(RIGHT, buff=0.2),
            VGroup(Text(">", font_size=28, color=YELLOW), Text("Solve Problems", font_size=22)).arrange(RIGHT, buff=0.2)
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.4).shift(RIGHT * 2.5)
        
        for cap in capabilities:
            self.play(FadeIn(cap, shift=RIGHT), run_time=0.8)
            self.wait(1)
        
        # Examples
        examples_title = Text("Everyday AI:", font_size=24, color=GREEN).shift(RIGHT * 2.5 + DOWN * 2)
        examples = Text("Voice assistants • Self-driving cars", font_size=18).next_to(examples_title, DOWN)
        
        self.play(Write(examples_title), Write(examples), run_time=1.5)
        self.wait(25)


class Slide3_Evolution(Scene):
    """The Evolution of AI - 45 seconds"""
    def construct(self):
        title = Text("The Evolution of AI", font_size=48, color=BLUE_C).to_edge(UP)
        self.play(Write(title), run_time=1.5)
        
        # Timeline
        timeline = Line(LEFT * 6, RIGHT * 6, color=WHITE).shift(DOWN * 0.5)
        self.play(Create(timeline), run_time=1)
        
        # Milestones
        milestones = [
            ("1950s", "AI Born", LEFT * 5, BLUE),
            ("1970s", "AI Winter", LEFT * 2, GRAY),
            ("1997", "Deep Blue", RIGHT * 1, GREEN),
            ("2010s", "Deep Learning", RIGHT * 4, YELLOW),
        ]
        
        milestone_groups = VGroup()
        for year, event, pos, color in milestones:
            dot = Dot(color=color, radius=0.15).move_to(pos + DOWN * 0.5)
            year_text = Text(year, font_size=16, color=color).next_to(dot, UP, buff=0.3)
            event_text = Text(event, font_size=14).next_to(dot, DOWN, buff=0.3)
            group = VGroup(dot, year_text, event_text)
            milestone_groups.add(group)
        
        for group in milestone_groups:
            self.play(Create(group), run_time=1)
            self.wait(2)
        
        # Current era highlight
        current = VGroup(
            RoundedRectangle(height=1.5, width=3, corner_radius=0.2, color=GOLD, fill_opacity=0.2),
            Text("AI Boom Era", font_size=22, color=GOLD)
        ).arrange(DOWN, buff=-0.5).shift(DOWN * 2.5 + RIGHT * 2)
        
        self.play(Create(current), run_time=1)
        
        tech_text = Text("Neural Networks • Deep Learning", font_size=16, color=WHITE)
        tech_text.next_to(current, DOWN, buff=0.2)
        self.play(Write(tech_text))
        self.wait(20)


class Slide4_Goals(Scene):
    """AI Goals and Research - 45 seconds"""
    def construct(self):
        title = Text("AI Goals and Research", font_size=48, color=BLUE_C).to_edge(UP)
        self.play(Write(title), run_time=1.5)
        
        # Central brain
        center_brain = Circle(radius=1.2, color=PINK, fill_opacity=0.3)
        brain_text = Text("AI\nGoals", font_size=24).move_to(center_brain)
        
        self.play(Create(center_brain), Write(brain_text))
        
        # Surrounding goals
        goals = [
            ("Learning", BLUE, "Data-driven\nimprovement"),
            ("Language", GREEN, "Understanding\ntext & speech"),
            ("Vision", ORANGE, "Recognizing\npatterns"),
            ("Decision", PURPLE, "Making\nchoices"),
        ]
        
        goal_groups = VGroup()
        for i, (name, color, desc) in enumerate(goals):
            angle = i * TAU / len(goals) - TAU / 4
            pos = 3.2 * np.array([np.cos(angle), np.sin(angle), 0])
            
            circle = Circle(radius=0.6, color=color, fill_opacity=0.4).move_to(pos)
            label = Text(name, font_size=16, color=color).move_to(pos)
            description = Text(desc, font_size=12).next_to(circle, DOWN if angle > 0 else UP, buff=0.15)
            
            line = Line(center_brain.get_center() + 0.4 * np.array([np.cos(angle), np.sin(angle), 0]), 
                       pos - 0.4 * np.array([np.cos(angle), np.sin(angle), 0]),
                       color=GRAY, stroke_width=2)
            
            group = VGroup(line, circle, label, description)
            goal_groups.add(group)
        
        for group in goal_groups:
            self.play(Create(group), run_time=1.2)
            self.wait(1.5)
        
        self.wait(20)


class Slide5_Applications(Scene):
    """Real-World AI Applications - 60 seconds"""
    def construct(self):
        title = Text("Real-World AI Applications", font_size=48, color=BLUE_C).to_edge(UP)
        self.play(Write(title), run_time=1.5)
        
        # Application cards
        apps = [
            ("Music", "Personalized\nRecommendations", BLUE, LEFT * 4 + UP * 1),
            ("Chatbots", "24/7 Customer\nSupport", GREEN, ORIGIN + UP * 1),
            ("Healthcare", "Disease Detection\n& Diagnosis", RED, RIGHT * 4 + UP * 1),
            ("Finance", "Fraud Detection\n& Trading", GOLD, LEFT * 4 + DOWN * 1.5),
            ("Art", "AI-Generated\nCreativity", PURPLE, ORIGIN + DOWN * 1.5),
            ("Transport", "Autonomous\nVehicles", TEAL, RIGHT * 4 + DOWN * 1.5),
        ]
        
        for name, desc, color, pos in apps:
            card = VGroup(
                RoundedRectangle(height=1.6, width=2.6, corner_radius=0.15, 
                                color=color, fill_opacity=0.3),
                Text(name, font_size=20, color=color),
                Text(desc, font_size=12)
            )
            card[1].shift(UP * 0.3)
            card[2].shift(DOWN * 0.3)
            card.move_to(pos)
            
            self.play(Create(card), run_time=0.8)
            self.wait(1.5)
        
        # Highlight text
        highlight = Text("AI is everywhere, making life smarter!", font_size=24, color=YELLOW)
        highlight.to_edge(DOWN)
        self.play(Write(highlight), run_time=1.5)
        self.wait(30)


class Slide6_Ethics(Scene):
    """Ethics and AI - 45 seconds"""
    def construct(self):
        title = Text("Ethics and AI", font_size=48, color=BLUE_C).to_edge(UP)
        self.play(Write(title), run_time=1.5)
        
        # Balance scale
        fulcrum = Triangle(color=WHITE, fill_opacity=1).scale(0.3).shift(DOWN * 1)
        beam = Line(LEFT * 3, RIGHT * 3, color=WHITE, stroke_width=4).shift(DOWN * 0.6)
        
        self.play(Create(fulcrum), Create(beam))
        
        # Benefits side
        benefits = VGroup(
            RoundedRectangle(height=2, width=2.5, corner_radius=0.15, color=GREEN, fill_opacity=0.3),
            Text("Benefits", font_size=22, color=GREEN),
            Text("Efficiency\nInnovation\nAccessibility", font_size=14)
        ).arrange(DOWN, buff=0.15).shift(LEFT * 3.5 + UP * 0.8)
        
        # Concerns side
        concerns = VGroup(
            RoundedRectangle(height=2, width=2.5, corner_radius=0.15, color=RED, fill_opacity=0.3),
            Text("Concerns", font_size=22, color=RED),
            Text("Privacy\nJob Loss\nBias", font_size=14)
        ).arrange(DOWN, buff=0.15).shift(RIGHT * 3.5 + UP * 0.8)
        
        self.play(Create(benefits), run_time=1.5)
        self.wait(3)
        self.play(Create(concerns), run_time=1.5)
        self.wait(3)
        
        # Question marks
        questions = VGroup(*[
            Text("?", font_size=36, color=YELLOW).move_to([np.random.uniform(-5, 5), 
                                                           np.random.uniform(-3, -2), 0])
            for _ in range(5)
        ])
        self.play(FadeIn(questions, lag_ratio=0.2))
        
        # Central question
        central_q = Text("How do we balance progress with responsibility?", 
                        font_size=20, color=WHITE).to_edge(DOWN)
        self.play(Write(central_q))
        self.wait(25)


class Slide7_Future(Scene):
    """The Future of AI - 45 seconds"""
    def construct(self):
        title = Text("The Future of AI", font_size=48, color=BLUE_C).to_edge(UP)
        self.play(Write(title), run_time=1.5)
        
        # Futuristic city outline
        buildings = VGroup()
        building_data = [
            (LEFT * 5, 2.5, 0.8, BLUE),
            (LEFT * 3.5, 3.5, 1, TEAL),
            (LEFT * 2, 2, 0.7, BLUE),
            (LEFT * 0.5, 4, 1.2, GOLD),
            (RIGHT * 1, 3, 0.9, TEAL),
            (RIGHT * 2.5, 2.5, 0.8, BLUE),
            (RIGHT * 4, 3.5, 1, TEAL),
            (RIGHT * 5.5, 2, 0.6, BLUE),
        ]
        
        for pos, height, width, color in building_data:
            building = Rectangle(height=height, width=width, color=color, 
                                fill_opacity=0.4).align_to(ORIGIN + DOWN * 2, DOWN).shift(pos)
            # Windows
            for y in np.arange(-1.5, height - 0.5, 0.5):
                for x in [-width/4, width/4]:
                    window = Square(side_length=0.15, color=YELLOW, fill_opacity=0.8)
                    window.move_to(building.get_center() + UP * y + RIGHT * x)
                    building.add(window)
            buildings.add(building)
        
        ground = Line(LEFT * 7, RIGHT * 7, color=WHITE).shift(DOWN * 2)
        
        self.play(Create(ground), Create(buildings), run_time=3)
        
        # Flying vehicles
        vehicle1 = VGroup(
            Ellipse(width=1, height=0.3, color=TEAL, fill_opacity=0.8),
            Circle(radius=0.08, color=WHITE).shift(LEFT * 0.2),
            Circle(radius=0.08, color=WHITE).shift(RIGHT * 0.2)
        ).shift(UP * 2 + LEFT * 4)
        
        vehicle2 = vehicle1.copy().shift(RIGHT * 6 + DOWN * 0.5)
        
        self.play(Create(vehicle1), Create(vehicle2))
        self.play(
            vehicle1.animate.shift(RIGHT * 3),
            vehicle2.animate.shift(LEFT * 2),
            run_time=3
        )
        
        # AGI text
        agi_box = VGroup(
            RoundedRectangle(height=1.2, width=4, corner_radius=0.15, color=GOLD, fill_opacity=0.3),
            Text("Artificial General Intelligence", font_size=18, color=GOLD)
        ).shift(DOWN * 3)
        
        self.play(Create(agi_box))
        future_text = Text("The possibilities are limitless...", font_size=20, color=WHITE)
        future_text.to_edge(DOWN)
        self.play(Write(future_text))
        self.wait(25)


class Slide8_Conclusion(Scene):
    """Conclusion - 30 seconds"""
    def construct(self):
        title = Text("Our AI Journey", font_size=48, color=BLUE_C).to_edge(UP)
        self.play(Write(title), run_time=1.5)
        
        # Globe with connected people
        globe = Circle(radius=2, color=BLUE, fill_opacity=0.2)
        self.play(Create(globe))
        
        # People icons around the globe
        people = VGroup()
        for i in range(8):
            angle = i * TAU / 8
            pos = 2 * np.array([np.cos(angle), np.sin(angle), 0])
            person = VGroup(
                Circle(radius=0.2, color=random_color(), fill_opacity=0.7),
                Line(ORIGIN, DOWN * 0.3, color=WHITE, stroke_width=2)
            ).move_to(pos)
            people.add(person)
        
        self.play(Create(people), run_time=2)
        
        # Connections
        connections = VGroup()
        for i in range(len(people)):
            for j in range(i + 1, len(people)):
                if np.random.random() > 0.5:
                    line = Line(people[i].get_center(), people[j].get_center(),
                               color=TEAL, stroke_width=0.5, stroke_opacity=0.5)
                    connections.add(line)
        
        self.play(Create(connections), run_time=2)
        
        # Key message
        message = VGroup(
            Text("Curiosity", font_size=28, color=GREEN),
            Text("Creativity", font_size=28, color=BLUE),
            Text("Caution", font_size=28, color=ORANGE)
        ).arrange(RIGHT, buff=1).shift(DOWN * 2.8)
        
        self.play(Write(message), run_time=2)
        
        # Fade to thank you
        self.wait(5)
        self.play(FadeOut(globe), FadeOut(people), FadeOut(connections), 
                  FadeOut(title), FadeOut(message))
        
        thanks = Text("Thank You for Watching!", font_size=48, color=BLUE_C)
        self.play(Write(thanks), run_time=2)
        self.wait(8)
