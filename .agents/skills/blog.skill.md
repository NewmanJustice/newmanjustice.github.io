# Blog Skill

## Activation

This skill activates when the user invokes `/blog` or asks to write/capture a blog post.

## Purpose

Collaboratively craft blog posts documenting the learning journey with O'Reilly MCP and Claude. The output is personal narrative, not tutorial slop.

## Voice & Tone

- **Personal**: First-person narrative about the experience, not abstract instruction
- **Authentic**: Write like a real person sharing their journey, not a content mill
- **Reflective**: Capture insights, surprises, frustrations, and breakthroughs
- **Engaging**: Make the reader feel they're alongside you in the process
- **Never slop**: No filler, no padding, no generic statements. Every sentence earns its place.

## Process

This is collaborative. Work *with* the user, not *for* them.

### 1. Starting Point

When invoked, check `src/content/posts/` for existing series and posts to understand what's already been written. Ask:
- "What moment or insight do you want to capture?"
- "What surprised you or stuck with you?"
- If they're unsure, suggest angles based on the progress file.

### 2. Drafting Together

- Start with the user's raw thoughts - don't polish prematurely
- Ask clarifying questions: "What did that feel like?" / "Why did that matter?"
- Suggest structure only after the core ideas are clear
- Offer options, not directives: "We could frame this as X or Y - which feels right?"

### 3. Code Examples

When including code from learning sessions:
- Auto-format for GitHub-flavored markdown
- Add brief context before each snippet (what it demonstrates)
- Keep examples focused - show the interesting parts, not everything
- Include the learning moment: what worked, what didn't, what clicked

### 4. Refinement

- Read drafts critically - cut anything that doesn't serve the piece
- Check for authentic voice (does this sound like a person or a template?)
- Ensure insights land clearly
- Polish prose without losing personality

### 5. Output Format

GitHub Pages compatible markdown:
- Front matter if needed (title, date, tags)
- Clean heading hierarchy
- Properly fenced code blocks with language tags
- No unnecessary formatting clutter

## Quality Standards

Before considering a post done, verify:
- [ ] Does it say something genuine, not generic?
- [ ] Would I want to read this?
- [ ] Are the insights specific and earned?
- [ ] Does the code illuminate, not just fill space?
- [ ] Is every paragraph necessary?

## Anti-Patterns to Avoid

- "In this post, I will discuss..." - Just start
- Repeating the title in the intro
- Summarizing what you're about to say, then saying it, then summarizing what you said
- Generic "learning is a journey" platitudes
- Padding to hit word counts
- Explaining obvious things to seem thorough
- Corporate/marketing voice
- Listicles disguised as narrative

## Example Prompts to the User

**Starting:**
> "I see you've been working through [topic]. What's the thing that's sticking with you - the moment where something clicked, or maybe where you hit a wall?"

**Developing:**
> "That's interesting - can you say more about why that surprised you? What were you expecting instead?"

**Refining:**
> "This paragraph is doing a lot of work. What's the one thing you most want the reader to take from it?"

**Quality check:**
> "Reading this back - does it sound like you? Is there anything that feels like filler we could cut?"

## File Management

- Drafts: save to `src/content/posts/<series-slug>/drafts/` (or discuss with user if series is new)
- Final posts: save to `src/content/posts/<series-slug>/<NN>-<slug>.md` following the existing series model
- Use Astro frontmatter: `title`, `description`, `pubDate`, `series`, `seriesOrder`, `tags`
- If starting a new series, also create `src/content/posts/<series-slug>/index.md` as the series parent
