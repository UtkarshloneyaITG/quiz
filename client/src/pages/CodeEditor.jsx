// src/CodeEditor.js
import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import Split from 'react-split';
// import 'react-split/style.css'; // Optional for default gutter styling

const languageOptions = [
  { label: 'HTML', value: 'html' },
  { label: 'CSS', value: 'css' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Python', value: 'python' },
  { label: 'MySQL', value: 'sql' },
];

const defaultCode = {
  html: '<!-- HTML Example -->\n<div>Hello World</div>',
  css: '/* CSS Example */\nbody { background: #f0f0f0; color: #333; }',
  javascript: "// JavaScript Example\nconsole.log('Hello World');",
  python: "# Python Example\nprint('Hello World')",
  sql: "-- MySQL Example\nSELECT * FROM users;",
};

const LOCAL_STORAGE_KEY = 'monaco_project';

const CodeEditor = () => {
  const [language, setLanguage] = useState('html');
  const [code, setCode] = useState(defaultCode['html']);
  const [projectName, setProjectName] = useState('My Project');

  const [htmlCode, setHtmlCode] = useState(defaultCode.html);
  const [cssCode, setCssCode] = useState(defaultCode.css);
  const [jsCode, setJsCode] = useState(defaultCode.javascript);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      setLanguage(data.language || 'html');
      setCode(data.code || defaultCode[data.language]);
      setProjectName(data.projectName || 'My Project');

      if (data.language === 'html') setHtmlCode(data.code);
      if (data.language === 'css') setCssCode(data.code);
      if (data.language === 'javascript') setJsCode(data.code);
    }
  }, []);

  const saveProject = () => {
    const project = { language, code, projectName };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(project));
    alert('Project saved!');
  };

  const resetEditor = () => {
    const defaultLangCode = defaultCode[language];
    setCode(defaultLangCode);

    if (language === 'html') setHtmlCode(defaultLangCode);
    if (language === 'css') setCssCode(defaultLangCode);
    if (language === 'javascript') setJsCode(defaultLangCode);
  };

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    const newCode = defaultCode[newLang];
    setCode(newCode);
  };

  const handleEditorChange = (value) => {
    setCode(value);
    if (language === 'html') setHtmlCode(value);
    if (language === 'css') setCssCode(value);
    if (language === 'javascript') setJsCode(value);
  };

  const isPreviewable = ['html', 'css', 'javascript'].includes(language);

  const generatePreviewHTML = () => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Preview</title>
        <style>${cssCode}</style>
      </head>
      <body>
        ${htmlCode}
        <script>${jsCode}</script>
      </body>
      </html>
    `;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-zinc-900">
      <div className="bg-zinc-900 p-4 shadow-lg w-full h-screen flex flex-col">
        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Project name"
            className="bg-zinc-800 text-white px-3 py-2 border border-purple-400 rounded focus:outline-none w-full md:w-auto"
          />
          <p className='text-3xl text-white ml-10 font-semibold'>Gecko Editor</p>
          <div className="flex flex-wrap gap-3">
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="bg-zinc-800 text-white border border-purple-400 rounded px-3 py-2 focus:outline-none"
            >
              {languageOptions.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>

            <button
              onClick={saveProject}
              className="bg-purple-400 text-zinc-900 font-semibold px-4 py-2 rounded hover:bg-purple-300 transition"
            >
              Save
            </button>

            <button
              onClick={resetEditor}
              className="bg-zinc-700 text-white px-4 py-2 rounded hover:bg-zinc-600 transition"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Resizable Editor/Preview Panel */}
        <Split
          className="flex flex-1"
          direction="horizontal"
          sizes={[50, 50]}
          minSize={200}
          gutterSize={8}
          style={{ display: 'flex', height: '100%' }}
          gutter={() => {
            const gutter = document.createElement('div');
            gutter.className = ' cursor-col-resize';
            gutter.style.width = '8px';
            return gutter;
          }}
        >
          {/* Editor Panel */}
          <div style={{ height: '100%', overflow: 'hidden'}}>
            <Editor
              height="100%"
              language={language}
              value={code}
              theme="vs-dark"
              onChange={handleEditorChange}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: true,
                automaticLayout: true,
              }}
            />
          </div>

          {/* Preview Panel */}
          <div className="bg-white rounded shadow overflow-hidden" style={{ height: '100%' }}>
            {isPreviewable ? (
              <iframe
                title="Live Preview"
                className="w-full h-full"
                sandbox="allow-scripts allow-same-origin"
                srcDoc={generatePreviewHTML()}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-center text-zinc-700">
                <p className="text-lg">
                  Preview not available for <strong>{language.toUpperCase()}</strong>
                </p>
              </div>
            )}
          </div>
        </Split>
      </div>
    </div>
  );
};

export default CodeEditor;
