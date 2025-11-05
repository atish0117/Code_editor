import { Save, Share2, Play, RotateCcw, Moon, Sun, Code2 } from 'lucide-react';
import ThemeSelector from './ThemeSelector';

export default function Toolbar({
  onSave,
  onShare,
  onRun,
  onReset,
  onToggleTheme,
  onCodeThemeChange,
  isDark,
  isSaving,
  title,
  onTitleChange,
  codeTheme,
}) {
  return (
    <div className={`border-b ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
      <div className="h-14 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Code2 size={24} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
            <input
              type="text"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              className={`text-lg font-semibold bg-transparent border-none outline-none ${
                isDark ? 'text-white' : 'text-gray-900'
              } focus:outline-none w-48`}
              placeholder="Untitled Snippet"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onRun}
            className={`px-3 py-1.5 rounded-md flex items-center gap-2 text-sm font-medium transition-colors ${
              isDark
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
            title="Run (Ctrl+Enter)"
          >
            <Play size={14} />
            Run
          </button>

          <button
            onClick={onSave}
            disabled={isSaving}
            className={`px-3 py-1.5 rounded-md flex items-center gap-2 text-sm font-medium transition-colors ${
              isDark
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 disabled:opacity-50'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:opacity-50'
            }`}
            title="Save (Ctrl+S)"
          >
            <Save size={14} />
            {isSaving ? 'Saving...' : 'Save'}
          </button>

          <button
            onClick={onShare}
            className={`px-3 py-1.5 rounded-md flex items-center gap-2 text-sm font-medium transition-colors ${
              isDark
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
            title="Share"
          >
            <Share2 size={14} />
            Share
          </button>

          <button
            onClick={onReset}
            className={`px-3 py-1.5 rounded-md flex items-center gap-2 text-sm font-medium transition-colors ${
              isDark
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
            title="Reset"
          >
            <RotateCcw size={14} />
            Reset
          </button>

          <div className={`w-px h-6 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`} />

          <ThemeSelector
            theme={codeTheme}
            onThemeChange={onCodeThemeChange}
            isDark={isDark}
          />

          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-md transition-colors ${
              isDark
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
            title="Toggle theme"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
