# CodeMirror 6 Custom Themes

A collection of 12 beautiful, production-ready themes for your CodeMirror 6 editor.

## Available Themes

### Dark Themes

1. **One Dark** - The classic Atom editor theme with balanced colors
2. **Monokai Pro** - Rich, vibrant colors inspired by Monokai
3. **Nord** - Arctic, north-bluish color palette
4. **Tokyo Night** - A clean, elegant night theme inspired by Tokyo
5. **Dracula** - Dark theme with carefully chosen colors
6. **Material Ocean** - Deep ocean-inspired Material Design theme
7. **Ayu Mirage** - Modern, elegant theme with soft colors
8. **VS Code Dark** - Microsoft's VS Code dark theme
9. **High Contrast** - Maximum contrast for accessibility

### Light Themes

10. **Light** - Clean, minimal light theme
11. **GitHub Light** - GitHub's signature light theme
12. **Solarized Light** - Precision colors for better readability

## Usage

All themes are available in your editor's theme selector dropdown. Simply:

1. Click the palette icon in the toolbar
2. Select your preferred theme from the dropdown
3. The editor will instantly update with your chosen theme

## Theme Details

### Monokai Pro
- Background: `#2d2a2e`
- Vibrant syntax highlighting with pink, cyan, yellow, and green
- Excellent for long coding sessions

### Nord
- Background: `#2e3440`
- Arctic color palette with frost blues and aurora greens
- Easy on the eyes with muted colors

### Tokyo Night
- Background: `#1a1b26`
- Inspired by Tokyo's night skyline
- Purple keywords, blue functions, bright syntax colors

### Dracula
- Background: `#282a36`
- Pink keywords, cyan identifiers, green functions
- High contrast while remaining comfortable

### Solarized Light
- Background: `#fdf6e3`
- Scientifically designed color relationships
- Reduces eye strain with precise contrast ratios

### GitHub Light
- Background: `#ffffff`
- Clean, professional appearance
- Familiar to GitHub users

### Material Ocean
- Background: `#0f111a`
- Deep, immersive coding environment
- Purple and blue accent colors

### Ayu Mirage
- Background: `#1f2430`
- Balanced warm and cool tones
- Orange keywords with teal and green highlights

## Implementation

Each theme includes:
- Full CodeMirror 6 EditorView theme configuration
- Complete syntax highlighting for HTML, CSS, and JavaScript
- Proper gutters, line numbers, and selection colors
- Active line highlighting
- Cursor customization

## Code Sample

Here's what a typical code snippet looks like:

**HTML:**
```html
<div class="container">
  <h1>Hello World</h1>
  <button id="btn">Click me</button>
</div>
```

**CSS:**
```css
.container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  border-radius: 1rem;
}

button {
  background: #667eea;
  color: white;
  border: none;
  cursor: pointer;
}
```

**JavaScript:**
```javascript
document.getElementById('btn').addEventListener('click', () => {
  console.log('Button clicked!');
  alert('Hello from CodePen Lite!');
});

const data = { message: 'Welcome!' };
console.log(data);
```

## Technical Details

All themes are built using:
- `@codemirror/view` for theme base
- `@codemirror/language` for syntax highlighting
- `@lezer/highlight` for semantic token styling
- Full TypeScript support
- Zero runtime dependencies beyond CodeMirror

## Customization

Each theme can be further customized by modifying the theme configuration in `src/themes/customThemes.ts`. The themes are built as Extensions that combine:

1. **EditorView.theme()** - Controls editor UI elements
2. **HighlightStyle.define()** - Defines syntax token colors
3. **syntaxHighlighting()** - Applies the highlight style

## Accessibility

All themes follow accessibility best practices:
- Sufficient contrast ratios for readability
- High Contrast theme for users with visual impairments
- Clear cursor and selection indicators
- Readable line numbers and gutters

## Performance

Themes are:
- Lightweight with minimal overhead
- Loaded only when selected
- Optimized for smooth transitions
- Compatible with all CodeMirror 6 features
