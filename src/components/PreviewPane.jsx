import { useEffect, useRef } from 'react';

export default function PreviewPane({ html, css, javascript, onConsoleMessage }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const srcDoc = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: system-ui, -apple-system, sans-serif;
            }
            ${css}
          </style>
        </head>
        <body>
          ${html}
          <script>
            (function() {
              const originalConsole = {
                log: console.log,
                error: console.error,
                warn: console.warn,
                info: console.info
              };

              ['log', 'error', 'warn', 'info'].forEach(method => {
                console[method] = function(...args) {
                  originalConsole[method].apply(console, args);
                  window.parent.postMessage({
                    type: 'console',
                    method: method,
                    args: args.map(arg => {
                      try {
                        return typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg);
                      } catch (e) {
                        return String(arg);
                      }
                    })
                  }, '*');
                };
              });

              window.onerror = function(message, source, lineno, colno, error) {
                console.error('Error: ' + message + ' at ' + lineno + ':' + colno);
                return true;
              };

              try {
                ${javascript}
              } catch (error) {
                console.error('JavaScript Error: ' + error.message);
              }
            })();
          </script>
        </body>
      </html>
    `;

    iframe.srcdoc = srcDoc;
  }, [html, css, javascript]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'console') {
        onConsoleMessage({
          type: event.data.method,
          args: event.data.args,
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onConsoleMessage]);

  return (
    <iframe
      ref={iframeRef}
      title="preview"
      sandbox="allow-scripts allow-modals"
      className="w-full h-full border-0 bg-white"
    />
  );
}
