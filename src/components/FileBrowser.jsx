import { useEffect, useState } from 'react';
import { X, Loader, FileText, Trash2 } from 'lucide-react';
import { getAllSnippets, deleteSnippet } from '../services/snippetService';

export default function FileBrowser({ isOpen, onClose, onSelect, isDark }) {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (isOpen) {
      loadSnippets();
    }
  }, [isOpen]);

  const loadSnippets = async () => {
    setLoading(true);
    const { snippets, error } = await getAllSnippets();
    if (!error && snippets) {
      setSnippets(snippets);
    }
    setLoading(false);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    const snippet = snippets.find((s) => s.id === id);
    if (!snippet) return;

    if (confirm(`Delete "${snippet.title}"?`)) {
      setDeletingId(id);

      const { success } = await deleteSnippet(snippet.slug);

      if (success) {
        setSnippets(snippets.filter((s) => s.id !== id));
      }

      setDeletingId(null);
    }
  };

  const filteredSnippets = snippets.filter((snippet) =>
    snippet.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div
        className={`
          relative w-full max-w-2xl max-h-[80vh] rounded-lg shadow-2xl
          flex flex-col
          ${isDark ? 'bg-gray-800' : 'bg-white'}
        `}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-4 border-b ${
            isDark ? 'border-gray-700' : 'border-gray-200'
          }`}
        >
          <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            My Files
          </h2>

          <button
            onClick={onClose}
            className={`p-1 rounded hover:bg-gray-200 ${isDark ? 'hover:bg-gray-700' : ''}`}
          >
            <X size={20} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
          </button>
        </div>

        {/* Search */}
        <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`
              w-full px-3 py-2 rounded border
              ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }
              focus:outline-none focus:ring-2 focus:ring-blue-500
            `}
          />
        </div>

        {/* Snippet List */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <Loader className="animate-spin text-blue-500" size={32} />
            </div>
          ) : filteredSnippets.length === 0 ? (
            <div
              className={`
                flex flex-col items-center justify-center h-full p-8 text-center
                ${isDark ? 'text-gray-400' : 'text-gray-500'}
              `}
            >
              <FileText size={48} className="mb-4 opacity-50" />
              <p className="text-lg font-medium">No files found</p>
              <p className="text-sm mt-1">Create a new file or try a different search</p>
            </div>
          ) : (
            <div
              className="divide-y"
              style={{
                borderColor: isDark ? '#374151' : '#e5e7eb',
              }}
            >
              {filteredSnippets.map((snippet) => (
                <div
                  key={snippet.id}
                  onClick={() => {
                    onSelect(snippet);
                    onClose();
                  }}
                  className={`
                    p-4 cursor-pointer transition-colors
                    ${
                      isDark
                        ? 'hover:bg-gray-700 border-gray-700'
                        : 'hover:bg-gray-50 border-gray-200'
                    }
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`font-medium truncate ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {snippet.title}
                      </h3>

                      <div
                        className={`text-xs mt-1 flex gap-3 ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        <span>{new Date(snippet.created_at).toLocaleDateString()}</span>
                        <span>{snippet.views} views</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => handleDelete(e, snippet.id)}
                      disabled={deletingId === snippet.id}
                      className={`
                        p-2 rounded ml-2 transition-colors
                        ${
                          isDark
                            ? 'hover:bg-red-900/20 text-gray-400 hover:text-red-400'
                            : 'hover:bg-red-50 text-gray-400 hover:text-red-600'
                        }
                        ${deletingId === snippet.id ? 'opacity-50' : ''}
                      `}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className={`
            p-4 border-t text-xs
            ${isDark ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}
          `}
        >
          {filteredSnippets.length} file{filteredSnippets.length !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
}
