import { useState, useEffect, useCallback } from 'react';
import { useDebounce } from './hooks/useDebounce';
import EditorPane from './components/EditorPane';
import EditorTabs from './components/EditorTabs';
import PreviewPane from './components/PreviewPane';
import ConsolePane from './components/ConsolePane';
import Toolbar from './components/Toolbar';
import FileBrowser from './components/FileBrowser';
import { saveSnippet, getSnippet, updateSnippet } from './services/snippetService';

const DEFAULT_HTML = `<div class="container">
  <h1>Hello, CodePen Lite!</h1>
  <p>Start coding and see your changes live.</p>
  <button id="btn">Click me!</button>
</div>`;

const DEFAULT_CSS = `body {
  font-family: 'Segoe UI', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  background: white;
  padding: 3rem;
  border-radius: 1rem;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  text-align: center;
}

h1 {
  color: #667eea;
  margin-bottom: 1rem;
}

button {
  margin-top: 1rem;
  padding: 0.75rem 2rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s;
}

button:hover {
  transform: translateY(-2px);
}`;

const DEFAULT_JS = `document.getElementById('btn').addEventListener('click', () => {
  console.log('Button clicked!');
  alert('Hello from CodePen Lite!');
});

console.log('Welcome to CodePen Lite!');`;

function App() {
  const [html, setHtml] = useState(DEFAULT_HTML);
  const [css, setCss] = useState(DEFAULT_CSS);
  const [javascript, setJavascript] = useState(DEFAULT_JS);
  const [title, setTitle] = useState('Untitled Snippet');
  const [isDark, setIsDark] = useState(true);
  const [codeTheme, setCodeTheme] = useState('oneDark');
  const [activeEditor, setActiveEditor] = useState('html');
  const [consoleMessages, setConsoleMessages] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [currentSlug, setCurrentSlug] = useState(null);
  const [runKey, setRunKey] = useState(0);
  const [fileBrowserOpen, setFileBrowserOpen] = useState(false);

  const debouncedHtml = useDebounce(html, 400);
  const debouncedCss = useDebounce(css, 400);
  const debouncedJavascript = useDebounce(javascript, 400);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('s');

    if (slug) {
      loadSnippet(slug);
    }
  }, []);

  const loadSnippet = async (slug) => {
    const { snippet, error } = await getSnippet(slug);

    if (error || !snippet) {
      alert('Failed to load snippet: ' + (error || 'Not found'));
      return;
    }

    setHtml(snippet.html);
    setCss(snippet.css);
    setJavascript(snippet.javascript);
    setTitle(snippet.title);
    setCurrentSlug(snippet.slug);
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      if (currentSlug) {
        const { error } = await updateSnippet(currentSlug, {
          title,
          html,
          css,
          javascript,
        });

        if (error) {
          alert('Failed to update snippet: ' + error);
        } else {
          console.log('Snippet updated successfully!');
        }
      } else {
        const { snippet, error } = await saveSnippet({
          title,
          html,
          css,
          javascript,
        });

        if (error || !snippet) {
          alert('Failed to save snippet: ' + (error || 'Unknown error'));
        } else {
          setCurrentSlug(snippet.slug);
          window.history.pushState({}, '', `?s=${snippet.slug}`);
          console.log('Snippet saved successfully!');
        }
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleShare = () => {
    if (!currentSlug) {
      alert('Please save the snippet first before sharing!');
      return;
    }

    const shareUrl = `${window.location.origin}${window.location.pathname}?s=${currentSlug}`;
    navigator.clipboard.writeText(shareUrl);
    alert('Share link copied to clipboard!');
  };

  const handleRun = () => {
    setConsoleMessages([]);
    setRunKey((prev) => prev + 1);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all code?')) {
      setHtml(DEFAULT_HTML);
      setCss(DEFAULT_CSS);
      setJavascript(DEFAULT_JS);
      setTitle('Untitled Snippet');
      setConsoleMessages([]);
      setCurrentSlug(null);
      window.history.pushState({}, '', window.location.pathname);
    }
  };

  const handleConsoleMessage = useCallback((message) => {
    setConsoleMessages((prev) => [
      ...prev,
      { ...message, timestamp: Date.now() },
    ]);
  }, []);

  const handleClearConsole = () => {
    setConsoleMessages([]);
  };

  const handleSelectSnippet = (snippet) => {
    setHtml(snippet.html);
    setCss(snippet.css);
    setJavascript(snippet.javascript);
    setTitle(snippet.title);
    setCurrentSlug(snippet.slug);
    window.history.pushState({}, '', `?s=${snippet.slug}`);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRun();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [html, css, javascript, title, currentSlug]);

  return (
    <div className={`h-screen flex ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>

      <FileBrowser
        isOpen={fileBrowserOpen}
        onClose={() => setFileBrowserOpen(false)}
        onSelect={handleSelectSnippet}
        isDark={isDark}
      />
        <div className="flex-1 flex flex-col">
      <Toolbar
        onSave={handleSave}
        onShare={handleShare}
        onRun={handleRun}
        onReset={handleReset}
        onToggleTheme={() => setIsDark(!isDark)}
        onCodeThemeChange={setCodeTheme}
        onOpenFileBrowser={() => setFileBrowserOpen(true)}
        isDark={isDark}
        isSaving={isSaving}
        title={title}
        onTitleChange={setTitle}
        codeTheme={codeTheme}
      />

     

      

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 flex flex-col lg:flex-row gap-0 overflow-hidden">
          <div className="flex-1 flex flex-col border-r border-gray-700 min-w-0">
            <EditorTabs
              activeEditor={activeEditor}
              onEditorChange={setActiveEditor}
              isDark={isDark}
            />

            <div className="flex-1 relative overflow-hidden">
              <EditorPane
                language="html"
                value={html}
                onChange={setHtml}
                isDark={isDark}
                theme={codeTheme}
                isActive={activeEditor === 'html'}
              />
              <EditorPane
                language="css"
                value={css}
                onChange={setCss}
                isDark={isDark}
                theme={codeTheme}
                isActive={activeEditor === 'css'}
              />
              <EditorPane
                language="javascript"
                value={javascript}
                onChange={setJavascript}
                isDark={isDark}
                theme={codeTheme}
                isActive={activeEditor === 'javascript'}
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col min-w-0 max-lg:border-t max-lg:border-gray-700">
            <PreviewPane
              key={runKey}
              html={debouncedHtml}
              css={debouncedCss}
              javascript={debouncedJavascript}
              onConsoleMessage={handleConsoleMessage}
            />
          </div>
        </div>

        <ConsolePane
          messages={consoleMessages}
          onClear={handleClearConsole}
          isDark={isDark}
        />
      </div>
       </div>
    </div>
  );
}

export default App;
