
from manim import *
import numpy as np

config.pixel_height = 720
config.pixel_width = 1280
config.frame_rate = 30
config.background_color = "#0f0f23"


class Slide0Scene(Scene):
    def construct(self):
        # Title
        title = Text("The Essence of AI", font_size=42, color=BLUE_B).to_edge(UP, buff=0.5)
        self.play(Write(title), run_time=1.5)
        
        # Brain diagram
        brain_group = VGroup()
        core = Ellipse(width=3, height=2.4, color=PINK, fill_opacity=0.2)
        brain_group.add(core)
        
        # Paths
        for _ in range(12):
            start = [np.random.uniform(-1, 1), np.random.uniform(-0.8, 0.8), 0]
            end = [np.random.uniform(-1, 1), np.random.uniform(-0.8, 0.8), 0]
            path = Line(start, end, color=YELLOW, stroke_width=1, stroke_opacity=0.6)
            brain_group.add(path)
            
        brain_group.shift(LEFT * 3)
        self.play(FadeIn(brain_group), run_time=2)
        
        # Bullet points
        bullet_list = VGroup()
        b0 = Text("• Human Cognition Simulation", font_size=28, color=WHITE)
        bullet_list.add(b0)
        b1 = Text("• Advanced Pattern Recognition", font_size=28, color=WHITE)
        bullet_list.add(b1)
        b2 = Text("• Autonomous Decision Making", font_size=28, color=WHITE)
        bullet_list.add(b2)
        bullet_list.arrange(DOWN, aligned_edge=LEFT, buff=0.5).shift(RIGHT * 3)
        
        for b in bullet_list:
            self.play(FadeIn(b, shift=RIGHT), run_time=0.8)
            
        self.wait(9)
        self.play(FadeOut(Group(*self.mobjects)))

class Slide1Scene(Scene):
    def construct(self):
        title = Text("The Hierarchy of Intelligence", font_size=42, color=BLUE_B).to_edge(UP, buff=0.5)
        self.play(Write(title), run_time=1.5)
        
        # Hierarchy roots
        root = RoundedRectangle(width=3, height=1, color=GOLD, fill_opacity=0.3)
        root_text = Text("AI", font_size=24, color=GOLD)
        top = VGroup(root, root_text).shift(UP * 1.5)
        self.play(FadeIn(top))
        
        nodes = VGroup()
        colors = [BLUE_C, GREEN_C, RED_C]
        n0 = VGroup(
            RoundedRectangle(width=3.2, height=0.8, color=BLUE_C, fill_opacity=0.2),
            Text("Narrow AI - Task Specific", font_size=18, color=WHITE)
        )
        nodes.add(n0)
        n1 = VGroup(
            RoundedRectangle(width=3.2, height=0.8, color=GREEN_C, fill_opacity=0.2),
            Text("General AI - Human Level", font_size=18, color=WHITE)
        )
        nodes.add(n1)
        n2 = VGroup(
            RoundedRectangle(width=3.2, height=0.8, color=RED_C, fill_opacity=0.2),
            Text("Super AI - Theoretical Peak", font_size=18, color=WHITE)
        )
        nodes.add(n2)
        nodes.arrange(DOWN, buff=0.4).shift(DOWN * 0.5)
        
        for node in nodes:
            line = Line(top.get_bottom(), node.get_top(), color=GRAY, stroke_width=2)
            self.play(Create(line), FadeIn(node), run_time=0.8)
            
        self.wait(9)
        self.play(FadeOut(Group(*self.mobjects)))

class Slide2Scene(Scene):
    def construct(self):
        title = Text("AI in our Daily Lives", font_size=42, color=BLUE_B).to_edge(UP, buff=0.5)
        self.play(Write(title), run_time=1.5)
        
        # Icons area
        icons = VGroup()
        ic0 = VGroup(
            Square(side_length=1.5, color=BLUE_E, fill_opacity=0.5),
            Text("Smart Navi", font_size=16, color=WHITE).shift(DOWN * 1)
        )
        icons.add(ic0)
        ic1 = VGroup(
            Square(side_length=1.5, color=BLUE_E, fill_opacity=0.5),
            Text("Content Cu", font_size=16, color=WHITE).shift(DOWN * 1)
        )
        icons.add(ic1)
        ic2 = VGroup(
            Square(side_length=1.5, color=BLUE_E, fill_opacity=0.5),
            Text("Medical Di", font_size=16, color=WHITE).shift(DOWN * 1)
        )
        icons.add(ic2)
        icons.arrange(RIGHT, buff=0.8).shift(DOWN * 0.5)
        
        for ic in icons:
            self.play(GrowFromCenter(ic), run_time=0.8)
            
        self.wait(9)
        self.play(FadeOut(Group(*self.mobjects)))
