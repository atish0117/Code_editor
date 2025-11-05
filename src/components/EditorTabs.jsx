import { FileCode, Palette, Code } from 'lucide-react';

const EDITOR_TABS = [
  { id: 'html', label: 'HTML', icon: <FileCode size={16} /> },
  { id: 'css', label: 'CSS', icon: <Palette size={16} /> },
  { id: 'javascript', label: 'JavaScript', icon: <Code size={16} /> },
];

export default function EditorTabs({ activeEditor, onEditorChange, isDark }) {
  return (
    <div
      className={`flex items-center gap-1 px-3 py-2 border-b ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'
      }`}
    >
      {EDITOR_TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onEditorChange(tab.id)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-t-lg transition-all duration-200
            ${
              activeEditor === tab.id
                ? isDark
                  ? 'bg-gray-900 text-blue-400 border-b-2 border-blue-400'
                  : 'bg-white text-blue-600 border-b-2 border-blue-600'
                : isDark
                ? 'text-gray-400 hover:text-gray-300'
                : 'text-gray-600 hover:text-gray-900'
            }
          `}
        >
          {tab.icon}
          <span className="text-sm font-medium">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
