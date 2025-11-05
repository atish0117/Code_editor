// import { useEffect, useRef } from 'react';
// import { Terminal, Trash2 } from 'lucide-react';

// export default function ConsolePane({ messages, onClear, isDark }) {
//   const scrollRef = useRef(null);

//   const getMessageColor = (type) => {
//     switch (type) {
//       case 'error':
//         return 'text-red-400';
//       case 'warn':
//         return 'text-yellow-400';
//       case 'info':
//         return 'text-blue-400';
//       default:
//         return isDark ? 'text-gray-300' : 'text-gray-800';
//     }
//   };

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//     }
//   }, [messages]);

//   return (
//     <div
//       className={`h-[200px] flex flex-col border-t ${
//         isDark ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
//       }`}
//     >
//       <div
//         className={`px-3 py-2 flex items-center justify-between shrink-0 ${
//           isDark ? 'bg-gray-800 border-b border-gray-700' : 'bg-gray-100 border-b border-gray-200'
//         }`}
//       >
//         <div className="flex items-center gap-2">
//           <Terminal size={14} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
//           <span
//             className={`text-xs font-semibold uppercase tracking-wide ${
//               isDark ? 'text-gray-300' : 'text-gray-700'
//             }`}
//           >
//             Console
//           </span>
//           <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
//             ({messages.length})
//           </span>
//         </div>
//         <button
//           onClick={onClear}
//           className={`p-1.5 rounded transition-colors ${
//             isDark
//               ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-300'
//               : 'hover:bg-gray-200 text-gray-600 hover:text-gray-900'
//           }`}
//           title="Clear console"
//         >
//           <Trash2 size={14} />
//         </button>
//       </div>
//       <div
//         ref={scrollRef}
//         className="flex-1 overflow-y-auto overflow-x-hidden p-3 font-mono text-xs space-y-1"
//       >
//         {messages.length === 0 ? (
//           <div className={`text-xs italic ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
//             Console output will appear here...
//           </div>
//         ) : (
//           messages.map((msg, idx) => (
//             <div key={idx} className="flex gap-2 wrap-break-word">
//               <span className={`${getMessageColor(msg.type)} font-semibold shrink-0`}>
//                 {msg.type}:
//               </span>
//               <span className={isDark ? 'text-gray-300' : 'text-gray-800'}>
//                 {msg.args.join(' ')}
//               </span>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }


import { useEffect, useRef, useState } from 'react';
import { Terminal, Trash2 } from 'lucide-react';

export default function ConsolePane({ messages, onClear, isDark }) {
  const scrollRef = useRef(null);
  const resizerRef = useRef(null);
  const [height, setHeight] = useState(200); // initial height

  const getMessageColor = (type) => {
    switch (type) {
      case 'error':
        return 'text-red-400';
      case 'warn':
        return 'text-yellow-400';
      case 'info':
        return 'text-blue-400';
      default:
        return isDark ? 'text-gray-300' : 'text-gray-800';
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Resizer logic
  useEffect(() => {
    const resizer = resizerRef.current;
    if (!resizer) return;

    let startY = 0;
    let startHeight = 0;

    const onMouseMove = (e) => {
      const newHeight = startHeight - (e.clientY - startY);
      if (newHeight > 100 && newHeight < 600) setHeight(newHeight);
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    const onMouseDown = (e) => {
      startY = e.clientY;
      startHeight = height;
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    resizer.addEventListener('mousedown', onMouseDown);

    return () => {
      resizer.removeEventListener('mousedown', onMouseDown);
    };
  }, [height]);

  return (
    <div
      className={`flex flex-col border-t ${
        isDark ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
      }`}
      style={{ height: `${height}px` }}
    >
      {/* Resizer handle */}
      <div
        ref={resizerRef}
        className={`h-1 cursor-row-resize w-full ${
          isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'
        }`}
      />

      {/* Console header */}
      <div
        className={`px-3 py-2 flex items-center justify-between shrink-0 ${
          isDark ? 'bg-gray-800 border-b border-gray-700' : 'bg-gray-100 border-b border-gray-200'
        }`}
      >
        <div className="flex items-center gap-2">
          <Terminal size={14} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
          <span
            className={`text-xs font-semibold uppercase tracking-wide ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Console
          </span>
          <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
            ({messages.length})
          </span>
        </div>
        <button
          onClick={onClear}
          className={`p-1.5 rounded transition-colors ${
            isDark
              ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-300'
              : 'hover:bg-gray-200 text-gray-600 hover:text-gray-900'
          }`}
          title="Clear console"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Console messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto overflow-x-hidden p-3 font-mono text-xs space-y-1"
      >
        {messages.length === 0 ? (
          <div className={`text-xs italic ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
            Console output will appear here...
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className="flex gap-2 wrap-break-word">
              <span className={`${getMessageColor(msg.type)} font-semibold shrink-0`}>
                {msg.type}:
              </span>
              <span className={isDark ? 'text-gray-300' : 'text-gray-800'}>
                {msg.args.join(' ')}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
