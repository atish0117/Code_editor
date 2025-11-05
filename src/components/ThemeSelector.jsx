import { Palette } from 'lucide-react';

const THEMES = [
  { id: 'oneDark', label: 'One Dark' },
  { id: 'monokaiPro', label: 'Monokai Pro' },
  { id: 'nord', label: 'Nord' },
  { id: 'tokyoNight', label: 'Tokyo Night' },
  { id: 'dracula', label: 'Dracula' },
  { id: 'materialOcean', label: 'Material Ocean' },
  { id: 'ayuMirage', label: 'Ayu Mirage' },
  { id: 'vsCode', label: 'VS Code' },
  { id: 'light', label: 'Light' },
  { id: 'githubLight', label: 'GitHub Light' },
  { id: 'solarizedLight', label: 'Solarized Light' },
  { id: 'highContrast', label: 'High Contrast' },
];

export default function ThemeSelector({ theme, onThemeChange, isDark }) {
  return (
    <div className="flex items-center gap-2">
      <Palette size={14} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
      <select
        value={theme}
        onChange={(e) => onThemeChange(e.target.value)}
        className={`
          text-xs px-2 py-1 rounded border
          transition-colors duration-200
          ${isDark
            ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
          }
        `}
      >
        {THEMES.map((t) => (
          <option key={t.id} value={t.id}>
            {t.label}
          </option>
        ))}
      </select>
    </div>
  );
}
