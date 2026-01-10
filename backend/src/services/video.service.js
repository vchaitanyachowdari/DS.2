/**
 * Video Rendering Service
 * Creates actual video content by combining Manim animations with TTS narration
 * Uses Manim for educational visualizations and Edge TTS for voiceover
 */
const path = require('path');
const fs = require('fs').promises;
const { exec } = require('child_process');
const { promisify } = require('util');
const execPromise = promisify(exec);

// Directory for video outputs
const VIDEO_OUTPUT_DIR = path.join(process.cwd(), 'public', 'videos');
const TEMP_DIR = path.join(process.cwd(), 'temp');

/**
 * Generate Manim code for a slide based on visual description
 * @param {Object} slide - Slide object with title, narration, visualDescription
 * @param {number} slideIndex - Index of the slide
 * @param {number} duration - Duration in seconds for this slide
 * @returns {string} Manim Python code for the scene
 */
function generateManimSceneCode(slide, slideIndex, duration = 10) {
    const safeTitle = (slide.title || `Slide ${slideIndex + 1}`)
        .replace(/"/g, '\\"')
        .replace(/'/g, "\\'");
    const safeNarration = (slide.narration || '')
        .substring(0, 100)
        .replace(/"/g, '\\"')
        .replace(/'/g, "\\'");
    const visualDesc = (slide.visualDescription || slide.visualType || 'text')
        .toLowerCase();

    // Determine visualization type based on visual description or type
    let visualizationType = slide.visualType || 'text';

    // If no explicit type, infer from description
    if (!slide.visualType) {
        if (visualDesc.includes('graph') || visualDesc.includes('chart') || visualDesc.includes('plot')) {
            visualizationType = 'graph';
        } else if (visualDesc.includes('brain') || visualDesc.includes('neural') || visualDesc.includes('network')) {
            visualizationType = 'brain_diagram';
        } else if (visualDesc.includes('diagram') || visualDesc.includes('flow') || visualDesc.includes('process')) {
            visualizationType = 'hierarchy';
        } else if (visualDesc.includes('equation') || visualDesc.includes('formula') || visualDesc.includes('math')) {
            visualizationType = 'math';
        } else if (visualDesc.includes('list') || visualDesc.includes('bullet') || visualDesc.includes('point')) {
            visualizationType = 'list';
        } else if (visualDesc.includes('code') || visualDesc.includes('algorithm')) {
            visualizationType = 'code';
        }
    }

    // Generate appropriate Manim scene based on type
    const sceneCode = generateVisualization(visualizationType, slide, slideIndex, duration);

    return sceneCode;
}

/**
 * Generate Manim visualization code based on type
 * Enhanced to match ai_unveiled.py quality with rich animations and visuals
 */
function generateVisualization(type, slide, slideIndex, duration) {
    const title = (slide.title || `Slide ${slideIndex + 1}`).replace(/"/g, '\\"');
    const className = `Slide${slideIndex}Scene`;

    // Extract bullet points from slide or narration
    const bullets = slide.bulletPoints ||
        (slide.narration || '').split(/\.\s+/)
            .filter(s => s.length > 10 && s.length < 100)
            .slice(0, 4)
            .map(s => s.trim().substring(0, 60) + (s.length > 60 ? "..." : ""));

    // Calculate animation time and wait time
    const animationTime = Math.min(duration * 0.3, 5); // 30% for animations, max 5s
    const waitTime = Math.max(duration - animationTime - 2, 1); // Remaining time for content display

    switch (type) {
        case 'graph':
            return `
class ${className}(Scene):
    """${title} - ${duration}s"""
    def construct(self):
        # Title with gradient effect
        title = Text("${title}", font_size=48, color=BLUE_C)
        title.to_edge(UP, buff=0.5)
        self.play(Write(title), run_time=1.5)

        # Create axes with labels
        axes = Axes(
            x_range=[0, 10, 2],
            y_range=[0, 10, 2],
            x_length=9,
            y_length=5,
            axis_config={"include_tip": True, "include_numbers": True, "color": GRAY}
        ).shift(DOWN * 0.3)

        x_label = axes.get_x_axis_label("Time", direction=DOWN)
        y_label = axes.get_y_axis_label("Progress", direction=LEFT)

        # Create smooth curves with different colors
        graph1 = axes.plot(lambda x: 0.08 * x**2 + 2, color=BLUE, x_range=[0, 9])
        graph2 = axes.plot(lambda x: 1.5 * np.sin(x) + 5, color=GREEN, x_range=[0, 9])

        label1 = Text("Growth", font_size=20, color=BLUE).next_to(graph1.point_from_proportion(0.8), UP)
        label2 = Text("Trend", font_size=20, color=GREEN).next_to(graph2.point_from_proportion(0.8), DOWN)

        self.play(Create(axes), Write(x_label), Write(y_label), run_time=1.5)
        self.play(Create(graph1), FadeIn(label1), run_time=2)
        self.play(Create(graph2), FadeIn(label2), run_time=2)
        self.wait(${waitTime})
        self.play(*[FadeOut(mob) for mob in self.mobjects])
`;

        case 'diagram':
        case 'brain_diagram':
            return `
class ${className}(Scene):
    """${title} - ${duration}s"""
    def construct(self):
        # Title
        title = Text("${title}", font_size=48, color=BLUE_C).to_edge(UP, buff=0.5)
        self.play(Write(title), run_time=1.5)

        # Enhanced brain/AI visualization
        brain = VGroup()
        brain_outline = Ellipse(width=3.5, height=2.8, color=PINK, fill_opacity=0.3, stroke_width=3)

        # Neural pathways inside brain with varied colors
        pathways = VGroup()
        for i in range(25):
            start = np.array([np.random.uniform(-1.4, 1.4), np.random.uniform(-1, 1), 0])
            end = start + np.array([np.random.uniform(-0.6, 0.6), np.random.uniform(-0.6, 0.6), 0])
            color = random.choice([YELLOW, TEAL, BLUE, GREEN])
            line = Line(start, end, color=color, stroke_width=1.5, stroke_opacity=0.7)
            pathways.add(line)

        brain.add(brain_outline, pathways)
        brain.shift(LEFT * 3.5)

        brain_label = Text("AI System", font_size=22, color=PINK).next_to(brain, DOWN, buff=0.3)

        self.play(Create(brain_outline), run_time=1.2)
        self.play(Create(pathways, lag_ratio=0.05), run_time=2)
        self.play(Write(brain_label), run_time=0.8)

        # Arrow to key points
        arrow = Arrow(brain.get_right(), RIGHT * 0.2, color=YELLOW, buff=0.2)
        self.play(Create(arrow), run_time=0.8)

        # Enhanced bullet points with icons
        bullet_list = VGroup()
${bullets.map((b, i) => `        bullet${i} = VGroup(
            Text(">", font_size=32, color=YELLOW),
            Text("${b.replace(/"/g, '\\"').replace(/\n/g, ' ')}", font_size=24, color=WHITE)
        ).arrange(RIGHT, buff=0.3)
        bullet_list.add(bullet${i})`).join('\n')}
        bullet_list.arrange(DOWN, aligned_edge=LEFT, buff=0.4).shift(RIGHT * 2.8)

        for bullet in bullet_list:
            self.play(FadeIn(bullet, shift=RIGHT), run_time=0.8)
            self.wait(0.5)

        self.wait(${waitTime})
        self.play(*[FadeOut(mob) for mob in self.mobjects])
`;

        case 'hierarchy':
        case 'process':
            return `
class ${className}(Scene):
    """${title} - ${duration}s"""
    def construct(self):
        title = Text("${title}", font_size=48, color=BLUE_C).to_edge(UP, buff=0.5)
        self.play(Write(title), run_time=1.5)

        # Central concept with enhanced design
        root = VGroup(
            RoundedRectangle(width=3.5, height=1.2, corner_radius=0.2, color=GOLD, fill_opacity=0.4, stroke_width=3),
            Text("Core Concept", font_size=24, color=GOLD, weight=BOLD)
        ).shift(UP * 1.8)
        self.play(FadeIn(root, scale=0.8), run_time=1)

        # Create hierarchical nodes with varied colors
        nodes = VGroup()
        colors = [BLUE_C, GREEN_C, RED_C, PURPLE_C]
${bullets.map((b, i) => `        node${i} = VGroup(
            RoundedRectangle(width=4, height=0.9, corner_radius=0.15,
                           color=${['BLUE_C', 'GREEN_C', 'RED_C', 'PURPLE_C'][i] || 'TEAL_C'},
                           fill_opacity=0.3, stroke_width=2),
            Text("${b.substring(0, 35).replace(/"/g, '\\"').replace(/\n/g, ' ')}", font_size=20, color=WHITE)
        )
        nodes.add(node${i})`).join('\n')}
        nodes.arrange(DOWN, buff=0.5).shift(DOWN * 0.3)

        # Animate hierarchy with connecting lines
        lines = VGroup()
        for i, node in enumerate(nodes):
            angle = (i - len(nodes) / 2 + 0.5) * 0.3
            start = root.get_bottom()
            end = node.get_top()
            line = Line(start, end, color=GRAY, stroke_width=2.5, stroke_opacity=0.7)
            lines.add(line)
            self.play(Create(line), FadeIn(node, shift=DOWN * 0.3), run_time=1)
            self.wait(0.4)

        self.wait(${waitTime})
        self.play(*[FadeOut(mob) for mob in self.mobjects])
`;

        case 'list':
            return `
class ${className}(Scene):
    """${title} - ${duration}s"""
    def construct(self):
        # Title with underline
        title = Text("${title}", font_size=48, color=BLUE_C).to_edge(UP, buff=0.5)
        underline = Line(LEFT, RIGHT, color=BLUE_C).scale(2).next_to(title, DOWN, buff=0.1)
        self.play(Write(title), run_time=1.5)
        self.play(Create(underline), run_time=0.5)

        # Enhanced bullet points with icons and boxes
        points = VGroup()
${bullets.map((b, i) => `        point${i} = VGroup(
            RoundedRectangle(width=10, height=0.8, corner_radius=0.1,
                           color=${['BLUE', 'GREEN', 'YELLOW', 'PURPLE'][i] || 'TEAL'},
                           fill_opacity=0.2, stroke_width=2),
            Text("•", font_size=36, color=${['BLUE', 'GREEN', 'YELLOW', 'PURPLE'][i] || 'TEAL'}),
            Text("${b.replace(/"/g, '\\"').replace(/\n/g, ' ')}", font_size=24, color=WHITE)
        )
        point${i}[1].shift(LEFT * 4.5)
        point${i}[2].next_to(point${i}[1], RIGHT, buff=0.4)
        points.add(point${i})`).join('\n')}
        points.arrange(DOWN, buff=0.4, aligned_edge=LEFT).shift(DOWN * 0.5)

        # Animate each point with emphasis
        for i, point in enumerate(points):
            self.play(
                FadeIn(point[0], scale=0.95),
                FadeIn(point[1], shift=RIGHT * 0.3),
                Write(point[2]),
                run_time=1.2
            )
            self.wait(0.6)

        self.wait(${waitTime})
        self.play(*[FadeOut(mob) for mob in self.mobjects])
`;

        case 'code':
            return `
class ${className}(Scene):
    """${title} - ${duration}s"""
    def construct(self):
        # Title
        title = Text("${title}", font_size=48, color=BLUE_C).to_edge(UP, buff=0.5)
        self.play(Write(title), run_time=1.5)

        # Code terminal appearance
        terminal_bg = RoundedRectangle(
            width=11, height=5.5, corner_radius=0.2,
            color=GRAY_D, fill_opacity=0.9, stroke_width=2
        ).shift(DOWN * 0.3)

        # Terminal header
        header = Rectangle(width=11, height=0.5, color=GRAY_C, fill_opacity=1)
        header.align_to(terminal_bg, UP).shift(DOWN * 0.25)

        dots = VGroup(*[
            Dot(radius=0.08, color=RED),
            Dot(radius=0.08, color=YELLOW),
            Dot(radius=0.08, color=GREEN)
        ]).arrange(RIGHT, buff=0.15)
        dots.next_to(header, LEFT, buff=0.5).shift(RIGHT * 0.5)

        self.play(FadeIn(terminal_bg), FadeIn(header), FadeIn(dots), run_time=1)

        # Code block with syntax highlighting simulation
        code_text = '''# Algorithm Implementation
def process_data(input_stream):
    results = []
    for item in input_stream:
        analyzed = analyze(item)
        if is_valid(analyzed):
            results.append(analyzed)
    return results'''

        code = Code(
            code=code_text,
            language="python",
            font_size=18,
            background="rectangle",
            background_stroke_width=0,
            insert_line_no=True,
            style="monokai"
        ).scale(0.8).move_to(terminal_bg.get_center()).shift(DOWN * 0.1)

        self.play(Create(code), run_time=2.5)
        self.wait(${waitTime})
        self.play(*[FadeOut(mob) for mob in self.mobjects])
`;

        default: // text
            return `
class ${className}(Scene):
    """${title} - ${duration}s"""
    def construct(self):
        # Title with gradient-like effect
        title = Text("${title}", font_size=52, color=BLUE_C, weight=BOLD)
        title.to_edge(UP, buff=0.4)
        underline = Line(LEFT, RIGHT, color=BLUE_C).scale(title.width / 2).next_to(title, DOWN, buff=0.1)

        self.play(Write(title), run_time=1.5)
        self.play(Create(underline), run_time=0.6)

        # Summary text from narration with word wrapping
        summary_text = """${(slide.narration || '').substring(0, 200).replace(/"/g, "'").replace(/\n/g, ' ')}"""

        summary = Text(
            summary_text[:150] + ("..." if len(summary_text) > 150 else ""),
            font_size=26,
            color=WHITE,
            line_spacing=1.2
        ).scale(0.9)
        summary.next_to(title, DOWN, buff=1.5)

        # Decorative elements
        box = RoundedRectangle(
            width=11, height=4, corner_radius=0.2,
            color=BLUE_D, fill_opacity=0.15, stroke_width=3
        )
        box.surround(summary, buff=0.6)

        # Key points or highlights
        highlight = VGroup()
        if len("""${bullets.join(' ')}""") > 10:
${bullets.slice(0, 3).map((b, i) => `            h${i} = Text("• ${b.substring(0, 40).replace(/"/g, '\\"').replace(/\n/g, ' ')}", font_size=22, color=YELLOW)
            highlight.add(h${i})`).join('\n')}
            highlight.arrange(DOWN, aligned_edge=LEFT, buff=0.3).next_to(box, DOWN, buff=0.6)

        self.play(FadeIn(summary, shift=UP), run_time=1.5)
        self.play(Create(box), run_time=1)

        if len(highlight) > 0:
            for h in highlight:
                self.play(FadeIn(h, shift=RIGHT), run_time=0.7)

        self.wait(${waitTime})
        self.play(*[FadeOut(mob) for mob in self.mobjects])
`;
    }
}

/**
 * Generate complete Manim Python file for all slides
 * @param {Array} slides - Array of slide objects from video script
 * @param {string} jobId - Unique job identifier
 * @returns {Promise<string>} Path to generated Python file
 */
async function generateManimFile(slides, jobId) {
    const outputDir = path.join(TEMP_DIR, jobId);
    await fs.mkdir(outputDir, { recursive: true });

    const fileName = `video_${jobId}.py`;
    const filePath = path.join(outputDir, fileName);

    // Build complete Manim file with enhanced configuration
    let manimCode = `
from manim import *
import numpy as np
import random

# Auto-generated educational video
# Job ID: ${jobId}
# Generated: ${new Date().toISOString()}
# Total slides: ${slides.length}

# Video configuration
config.pixel_height = 720
config.pixel_width = 1280
config.frame_rate = 24  # Smoother playback at 24fps
config.background_color = "#0f0f23"  # Dark background for better contrast

`;

    // Add scene for each slide
    slides.forEach((slide, index) => {
        const duration = parseInt(slide.duration) || 10;
        manimCode += generateManimSceneCode(slide, index, duration);
        manimCode += '\n\n';
    });

    // Add main scene that plays all slides
    manimCode += `
class FullVideo(Scene):
    def construct(self):
        """Main scene that combines all slides"""
`;

    slides.forEach((slide, index) => {
        const duration = parseInt(slide.duration) || 10;
        const title = (slide.title || `Slide ${index + 1}`).replace(/"/g, '\\"');

        manimCode += `
        # Slide ${index + 1}: ${title}
        slide${index}_title = Text("${title}", font_size=36).to_edge(UP)
        self.play(Write(slide${index}_title), run_time=1)
        self.wait(${Math.max(1, duration - 2)})
        self.play(FadeOut(slide${index}_title), run_time=0.5)
`;
    });

    await fs.writeFile(filePath, manimCode);
    console.log(`✓ Generated Manim file: ${filePath}`);

    return filePath;
}

/**
 * Render Manim file to video
 * @param {string} manimFilePath - Path to Manim Python file
 * @param {string} sceneName - Name of scene to render
 * @param {string} outputDir - Directory for output video
 * @returns {Promise<string>} Path to rendered video file
 */
async function renderManimVideo(manimFilePath, sceneName, outputDir) {
    // Use python -m manim for cross-platform compatibility
    // -ql = low quality (720p30), -qm = medium (1080p30), -qh = high (1080p60)
    const command = `python -m manim render -ql "${manimFilePath}" ${sceneName}`;

    try {
        console.log(`Rendering Manim scene: ${sceneName}...`);
        console.log(`Command: ${command}`);

        const { stdout, stderr } = await execPromise(command, {
            timeout: 600000, // 10 minutes timeout for complex scenes
            cwd: path.dirname(manimFilePath)
        });

        console.log('Manim output:', stdout);
        if (stderr) console.log('Manim stderr:', stderr);

        // Manim creates output in: media/videos/{filename}/{quality}/{SceneName}.mp4
        const baseName = path.basename(manimFilePath, '.py');
        const cwd = path.dirname(manimFilePath);
        const mediaDir = path.join(cwd, 'media', 'videos', baseName);

        // Quality folders to check (Manim uses different ones based on settings)
        const qualities = ['720p30', '720p24', '720p15', '480p30', '480p15', '1080p30', '1080p60'];

        // Try to find the final rendered video
        for (const quality of qualities) {
            const qualityDir = path.join(mediaDir, quality);

            // Check for {SceneName}.mp4 directly in quality folder
            const directPath = path.join(qualityDir, `${sceneName}.mp4`);
            try {
                await fs.access(directPath);
                console.log(`✓ Video found at: ${directPath}`);
                return directPath;
            } catch {
                // Not found, continue
            }
        }

        // If not found directly, search recursively for any .mp4 file in media directory
        console.log('Searching for video files in media directory...');

        try {
            const findVideo = async (dir) => {
                const entries = await fs.readdir(dir, { withFileTypes: true });

                for (const entry of entries) {
                    const fullPath = path.join(dir, entry.name);

                    if (entry.isDirectory() && entry.name !== 'partial_movie_files') {
                        const result = await findVideo(fullPath);
                        if (result) return result;
                    } else if (entry.isFile() && entry.name.endsWith('.mp4')) {
                        // Found a video file
                        console.log(`✓ Found video: ${fullPath}`);
                        return fullPath;
                    }
                }
                return null;
            };

            const foundVideo = await findVideo(mediaDir);
            if (foundVideo) {
                return foundVideo;
            }

            // Last resort: combine partial files if they exist
            for (const quality of qualities) {
                const partialsDir = path.join(mediaDir, quality, 'partial_movie_files', sceneName);
                try {
                    const partials = await fs.readdir(partialsDir);
                    const mp4Files = partials.filter(f => f.endsWith('.mp4')).sort();

                    if (mp4Files.length > 0) {
                        console.log(`Found ${mp4Files.length} partial files, combining...`);

                        // Create a concat file for FFmpeg
                        const concatFile = path.join(cwd, 'concat_list.txt');
                        const concatContent = mp4Files.map(f => `file '${path.join(partialsDir, f)}'`).join('\n');
                        await fs.writeFile(concatFile, concatContent);

                        // Combine with FFmpeg
                        const outputPath = path.join(mediaDir, quality, `${sceneName}.mp4`);
                        const ffmpegCmd = `ffmpeg -f concat -safe 0 -i "${concatFile}" -c copy "${outputPath}" -y`;

                        await execPromise(ffmpegCmd);
                        await fs.unlink(concatFile);

                        console.log(`✓ Combined partials into: ${outputPath}`);
                        return outputPath;
                    }
                } catch {
                    // No partials in this quality folder
                }
            }

        } catch (e) {
            console.log('Error searching media directory:', e.message);
        }

        throw new Error(`Video file not found after rendering in ${mediaDir}`);
    } catch (error) {
        console.error('Manim rendering error:', error);
        throw new Error(`Failed to render video: ${error.message}`);
    }
}

/**
 * Generate narration audio for video using Edge TTS
 * @param {Array} slides - Array of slide objects with narration
 * @param {string} jobId - Unique job identifier
 * @returns {Promise<string>} Path to combined audio file
 */
async function generateVideoNarration(slides, jobId) {
    const outputDir = path.join(TEMP_DIR, jobId);
    await fs.mkdir(outputDir, { recursive: true });

    const audioFiles = [];

    for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];
        const audioPath = path.join(outputDir, `narration_${i}.mp3`);
        const text = slide.narration || slide.title || `Section ${i + 1}`;

        // Escape text for command line
        const escapedText = text
            .replace(/"/g, '\\"')
            .replace(/'/g, "\\'")
            .replace(/`/g, '\\`');

        const command = `python -m edge_tts --voice "en-US-JennyNeural" --text "${escapedText}" --write-media "${audioPath}"`;

        try {
            await execPromise(command, { timeout: 60000 });
            audioFiles.push(audioPath);
        } catch (error) {
            console.error(`TTS error for slide ${i}:`, error.message);
            throw new Error(`Failed to generate narration: ${error.message}`);
        }
    }

    // Combine all audio files
    const combinedAudioPath = path.join(outputDir, 'full_narration.mp3');
    const listPath = path.join(outputDir, 'audio_list.txt');

    let listContent = '';
    for (const audioFile of audioFiles) {
        listContent += `file '${audioFile.replace(/\\/g, '/')}'\n`;
    }
    await fs.writeFile(listPath, listContent);

    await execPromise(`ffmpeg -y -f concat -safe 0 -i "${listPath}" -c:a libmp3lame -q:a 2 "${combinedAudioPath}"`);

    return combinedAudioPath;
}

/**
 * Combine video and audio into final output
 * @param {string} videoPath - Path to video file
 * @param {string} audioPath - Path to audio file
 * @param {string} outputPath - Path for final output
 * @returns {Promise<string>} Path to final video
 */
async function combineVideoAudio(videoPath, audioPath, outputPath) {
    const command = `ffmpeg -y -i "${videoPath}" -i "${audioPath}" -c:v copy -c:a aac -map 0:v:0 -map 1:a:0 -shortest "${outputPath}"`;

    try {
        await execPromise(command, { timeout: 120000 });
        return outputPath;
    } catch (error) {
        console.error('Video/audio combine error:', error);
        throw new Error(`Failed to combine video and audio: ${error.message}`);
    }
}

/**
 * Get video duration using ffprobe
 * @param {string} videoPath - Path to video file
 * @returns {Promise<number>} Duration in seconds
 */
async function getVideoDuration(videoPath) {
    try {
        const { stdout } = await execPromise(
            `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${videoPath}"`
        );
        return parseFloat(stdout.trim());
    } catch {
        return 0;
    }
}

/**
 * Generate thumbnail from video
 * @param {string} videoPath - Path to video file
 * @param {string} outputPath - Path for thumbnail
 * @returns {Promise<string>} Path to thumbnail
 */
async function generateThumbnail(videoPath, outputPath) {
    const command = `ffmpeg -y -i "${videoPath}" -ss 00:00:02 -vframes 1 -vf "scale=640:360" "${outputPath}"`;

    try {
        await execPromise(command, { timeout: 30000 });
        return outputPath;
    } catch {
        console.warn('Failed to generate thumbnail');
        return null;
    }
}

/**
 * Clean up temporary files
 * @param {string} jobId - Job ID for temp directory
 */
async function cleanupVideoTemp(jobId) {
    const tempDir = path.join(TEMP_DIR, jobId);
    try {
        await fs.rm(tempDir, { recursive: true, force: true });
        console.log(`Cleaned up temp directory for job ${jobId}`);
    } catch (error) {
        console.error('Cleanup error:', error.message);
    }
}

/**
 * Sync a single slide video with its audio narration
 * Trims or extends video to match audio duration
 * @param {string} videoPath - Path to slide video
 * @param {string} audioPath - Path to slide audio
 * @param {string} outputPath - Path for synced output
 * @returns {Promise<string>} Path to synced video
 */
async function syncSlideWithAudio(videoPath, audioPath, outputPath) {
    const videoDur = await getVideoDuration(videoPath);
    const audioDur = await getVideoDuration(audioPath);

    console.log(`  Syncing: Video ${videoDur.toFixed(1)}s with Audio ${audioDur.toFixed(1)}s`);

    let command;
    if (videoDur < audioDur) {
        // Video is shorter - extend it by freezing last frame
        command = `ffmpeg -y -i "${videoPath}" -i "${audioPath}" -filter_complex "[0:v]tpad=stop_mode=clone:stop_duration=${audioDur - videoDur}[v]" -map "[v]" -map "1:a" -c:v libx264 -preset fast -c:a aac -shortest "${outputPath}"`;
    } else {
        // Video is longer or equal - trim to audio duration
        command = `ffmpeg -y -i "${videoPath}" -i "${audioPath}" -c:v copy -c:a aac -map 0:v:0 -map 1:a:0 -t ${audioDur} "${outputPath}"`;
    }

    try {
        await execPromise(command, { timeout: 120000 });
        return outputPath;
    } catch (error) {
        console.error('Sync error:', error.message);
        throw new Error(`Failed to sync slide: ${error.message}`);
    }
}

/**
 * Generate properly synchronized video from slides
 * Each slide's animation matches its narration duration
 * @param {Array} slides - Array of slide objects
 * @param {string} jobId - Unique job identifier
 * @param {Array} slideVideos - Array of rendered slide video paths
 * @param {Array} slideAudios - Array of slide audio paths
 * @param {string} outputPath - Final output path
 * @returns {Promise<string>} Path to final synced video
 */
async function generateSyncedVideo(slides, jobId, slideVideos, slideAudios, outputPath) {
    const tempDir = path.join(TEMP_DIR, jobId, 'synced');
    await fs.mkdir(tempDir, { recursive: true });

    console.log('Synchronizing slides with audio...');
    const syncedSlides = [];

    for (let i = 0; i < slides.length; i++) {
        const syncedPath = path.join(tempDir, `slide_${i}_synced.mp4`);
        console.log(`Syncing slide ${i + 1}/${slides.length}...`);

        await syncSlideWithAudio(slideVideos[i], slideAudios[i], syncedPath);
        syncedSlides.push(syncedPath);
    }

    // Create concat list
    const listPath = path.join(tempDir, 'concat_list.txt');
    let listContent = '';
    for (const syncedSlide of syncedSlides) {
        listContent += `file '${syncedSlide.replace(/\\/g, '/')}'\n`;
    }
    await fs.writeFile(listPath, listContent);

    // Concatenate all synced slides
    console.log('Concatenating synced slides...');
    const concatCommand = `ffmpeg -y -f concat -safe 0 -i "${listPath}" -c copy "${outputPath}"`;

    try {
        await execPromise(concatCommand, { timeout: 180000 });
        console.log(`✓ Synced video created: ${outputPath}`);
        return outputPath;
    } catch (error) {
        console.error('Concat error:', error.message);
        throw new Error(`Failed to concatenate slides: ${error.message}`);
    }
}

/**
 * Render individual slide scenes from Manim file
 * @param {string} manimFilePath - Path to Manim Python file
 * @param {Array} sceneNames - Array of scene class names to render
 * @param {string} outputDir - Directory for output videos
 * @returns {Promise<Array>} Array of paths to rendered videos
 */
async function renderIndividualSlides(manimFilePath, sceneNames, outputDir) {
    const videoPaths = [];
    const baseName = path.basename(manimFilePath, '.py');
    const mediaDir = path.join(path.dirname(manimFilePath), 'media', 'videos', baseName);

    for (let i = 0; i < sceneNames.length; i++) {
        const sceneName = sceneNames[i];
        console.log(`Rendering scene ${i + 1}/${sceneNames.length}: ${sceneName}...`);

        // Use python -m manim for cross-platform compatibility
        const command = `python -m manim render -ql "${manimFilePath}" ${sceneName}`;

        try {
            await execPromise(command, {
                timeout: 180000, // 3 minutes per slide
                cwd: path.dirname(manimFilePath)
            });

            // Manim -ql outputs to 720p30 folder
            const qualities = ['720p30', '720p24', '480p15'];
            let foundPath = null;

            for (const quality of qualities) {
                const videoPath = path.join(mediaDir, quality, `${sceneName}.mp4`);
                try {
                    await fs.access(videoPath);
                    foundPath = videoPath;
                    break;
                } catch {
                    // Try next quality
                }
            }

            if (foundPath) {
                videoPaths.push(foundPath);
                console.log(`  ✓ Rendered: ${sceneName}.mp4`);
            } else {
                console.warn(`  ⚠ Could not find rendered video for ${sceneName}`);
            }
        } catch (error) {
            console.error(`  ✗ Failed to render ${sceneName}:`, error.message);
        }
    }

    return videoPaths;
}

/**
 * Generate narration audio for each slide individually
 * Returns array of individual audio file paths
 * @param {Array} slides - Array of slide objects with narration
 * @param {string} jobId - Unique job identifier
 * @returns {Promise<Array>} Array of audio file paths
 */
async function generateSlideNarrations(slides, jobId) {
    const outputDir = path.join(TEMP_DIR, jobId, 'audio');
    await fs.mkdir(outputDir, { recursive: true });

    const audioFiles = [];

    for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];
        const audioPath = path.join(outputDir, `narration_${i.toString().padStart(2, '0')}.mp3`);
        const text = slide.narration || slide.title || `Section ${i + 1}`;

        // Escape text for command line
        const escapedText = text
            .replace(/"/g, '\\"')
            .replace(/'/g, "\\'")
            .replace(/`/g, '\\`');

        const command = `python -m edge_tts --voice "en-US-GuyNeural" --text "${escapedText}" --write-media "${audioPath}"`;

        try {
            console.log(`Generating narration ${i + 1}/${slides.length}...`);
            await execPromise(command, { timeout: 60000 });
            audioFiles.push(audioPath);
        } catch (error) {
            console.error(`TTS error for slide ${i}:`, error.message);
            throw new Error(`Failed to generate narration: ${error.message}`);
        }
    }

    return audioFiles;
}

module.exports = {
    generateManimSceneCode,
    generateManimFile,
    renderManimVideo,
    renderIndividualSlides,
    generateVideoNarration,
    generateSlideNarrations,
    syncSlideWithAudio,
    generateSyncedVideo,
    combineVideoAudio,
    getVideoDuration,
    generateThumbnail,
    cleanupVideoTemp,
    VIDEO_OUTPUT_DIR,
    TEMP_DIR
};
