import { useEffect, useState } from "react";
import { X, Loader, FileText, Trash2 } from "lucide-react";
import { getAllSnippets, deleteSnippet } from "../services/snippetService";

export default function FileBrowser({ isOpen, onClose, onSelect, isDark }) {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    console.log('[FileBrowser] isOpen:', isOpen);
    if (isOpen) {
      loadSnippets();
    }
  }, [isOpen]);


//   console.log("show all snippets",getAllSnippets)
//   console.log("show all deleteSpinnet",deleteSnippet)


const loadSnippets = async () => {
  setLoading(true);
  try {
    console.log('[FileBrowser] calling getAllSnippets()...');
    const { snippets, error } = await getAllSnippets();
    console.log('[FileBrowser] getAllSnippets result:', { snippets, error });
    if (!error && Array.isArray(snippets)) {
      setSnippets(snippets);
    } else {
      setSnippets([]);
    }
  } catch (err) {
    console.error('[FileBrowser] unexpected error:', err);
    setSnippets([]);
  } finally {
    setLoading(false);
  }
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
     <aside
      className={`
        fixed left-0 top-0 bottom-0 z-40 w-80 max-w-[340px] flex-shrink-0
        transform transition-transform duration-200 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        ${isDark ? "bg-gray-900 text-white border-r border-gray-800" : "bg-white text-gray-900 border-r border-gray-200"}
        shadow-lg
      `}
      aria-hidden={!isOpen}
    >
      {/* Header */}
      <div className={`flex items-center justify-between px-4 py-3 border-b ${isDark ? "border-gray-800" : "border-gray-200"}`}>
        <div className="flex items-center gap-2">
          <FileText size={18} className={isDark ? "text-gray-200" : "text-gray-700"} />
          <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>My Files</h3>
        </div>
        
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`
              hidden md:inline-block px-2 py-1 rounded border text-sm
              ${isDark ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-white border-gray-200 text-gray-700"}
            `}
          />
          <button onClick={onClose} className={`p-1 rounded ${isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"}`} title="Close">
            <X size={16} className={isDark ? "text-gray-300" : "text-gray-600"} />
          </button>
        </div>
      </div>

      {/* Mobile search */}
      <div className={`px-4 py-2 md:hidden border-b ${isDark ? "border-gray-800" : "border-gray-200"}`}>
        <input
          type="text"
          placeholder="Search files..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`
            w-full px-3 py-2 rounded border
            ${isDark ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-white border-gray-200 text-gray-700"}
            focus:outline-none
          `}
        />
      </div>

      {/* List / Loading / Empty */}
      <div className="p-2 overflow-y-auto h-full">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <Loader className="animate-spin" size={28} />
          </div>
        ) : filteredSnippets.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-6 text-center text-sm text-gray-400">
            <FileText size={42} className="mb-3 opacity-40" />
            <div>No files found</div>
            <div className="text-xs mt-1">Create a snippet to see it here</div>
          </div>
        ) : (
          <ul className="space-y-1">
            {filteredSnippets.map((snippet) => (
              <li
                key={snippet.id}
                className={`flex items-start justify-between gap-3 p-3 rounded cursor-pointer hover:${isDark ? "bg-gray-800" : "bg-gray-50"}`}
                onClick={() => {
                  onSelect(snippet);
                  // close on small screens to act like a drawer
                  if (window.innerWidth < 1024) onClose();
                }}
              >
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{snippet.title || snippet.slug}</div>
                  <div className={`text-xs mt-1 flex gap-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    <span>{new Date(snippet.created_at).toLocaleDateString()}</span>
                    <span>{snippet.views ?? 0} views</span>
                  </div>
                </div>

                <button
                  onClick={(e) => handleDelete(e, snippet.id)}
                  disabled={deletingId === snippet.id}
                  className={`p-1 rounded ${isDark ? "hover:bg-red-900/20" : "hover:bg-red-50"}`}
                  title="Delete"
                >
                  <Trash2 size={14} className={deletingId === snippet.id ? "opacity-50" : ""} />
                </button>
              </li>
            ))}
          </ul>
          
        )}
        {/* Footer */}
        <div className={ `p-4 border-t text-xs ${ isDark ? "border-gray-700 text-gray-400" : "border-gray-200 text-gray-500" } `} >
         {filteredSnippets.length} file{filteredSnippets.length !== 1 ?"s" : ""}
          </div>
      </div>

      
      
    </aside>
  );
}
