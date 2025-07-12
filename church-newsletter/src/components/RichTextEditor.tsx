import React, { useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Digite o conteúdo aqui...',
  height = '500px',
  minHeight = '500px',
  maxHeight = '1200px'
}) => {
  const quillRef = useRef<ReactQuill>(null);

  // Configuração dos módulos do Quill
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false,
    }
  };

  // Configuração dos formatos permitidos
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'list', 'bullet',
    'indent',
    'align',
    'link', 'image'
  ];

  // Aplicar estilos do tema escuro quando o componente montar
  useEffect(() => {
    const applyDarkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      const editor = quillRef.current?.getEditor();
      
      if (editor) {
        // Usar root em vez de container
        const container = editor.root?.parentElement;
        const toolbar = container?.querySelector('.ql-toolbar');
        const editorContainer = container?.querySelector('.ql-container');
        const editorElement = container?.querySelector('.ql-editor');
        
        if (isDark) {
          // Aplicar tema escuro
          if (toolbar) {
            toolbar.classList.add('dark-toolbar');
          }
          if (editorContainer) {
            editorContainer.classList.add('dark-container');
          }
          if (editorElement) {
            editorElement.classList.add('dark-editor');
          }
        } else {
          // Remover tema escuro
          if (toolbar) {
            toolbar.classList.remove('dark-toolbar');
          }
          if (editorContainer) {
            editorContainer.classList.remove('dark-container');
          }
          if (editorElement) {
            editorElement.classList.remove('dark-editor');
          }
        }
      }
    };

    // Aplicar tema inicial
    applyDarkTheme();

    // Observar mudanças no tema
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          applyDarkTheme();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .rich-text-editor {
          min-height: ${minHeight};
          resize: vertical;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: ${height};
          max-height: ${maxHeight};
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
        }

        .rich-text-editor .ql-toolbar {
          border-bottom: 1px solid #ccc;
          background: #f8f9fa;
          border-top: 1px solid #d1d5db;
          border-left: 1px solid #d1d5db;
          border-right: 1px solid #d1d5db;
          border-radius: 0.5rem 0.5rem 0 0;
        }

        .rich-text-editor .ql-container {
          flex: 1 1 0%;
          min-height: 0;
          height: 100%;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          border-bottom: 1px solid #d1d5db;
          border-left: 1px solid #d1d5db;
          border-right: 1px solid #d1d5db;
          border-radius: 0 0 0.5rem 0.5rem;
        }

        .rich-text-editor .ql-editor {
          flex: 1 1 0%;
          min-height: 200px;
          font-size: 14px;
          line-height: 1.6;
          overflow-y: auto;
          background: white;
          color: #374151;
        }

        /* Tema escuro */
        .rich-text-editor .ql-toolbar.dark-toolbar {
          background: #374151;
          border-color: #4b5563;
          color: #d1d5db;
        }

        .rich-text-editor .ql-toolbar.dark-toolbar .ql-stroke {
          stroke: #d1d5db;
        }

        .rich-text-editor .ql-toolbar.dark-toolbar .ql-fill {
          fill: #d1d5db;
        }

        .rich-text-editor .ql-toolbar.dark-toolbar .ql-picker {
          color: #d1d5db;
        }

        .rich-text-editor .ql-toolbar.dark-toolbar .ql-picker-options {
          background: #374151;
          border-color: #4b5563;
        }

        .rich-text-editor .ql-container.dark-container {
          border-color: #4b5563;
        }

        .rich-text-editor .ql-editor.dark-editor {
          background: #1f2937;
          color: #d1d5db;
        }

        .rich-text-editor .ql-editor.dark-editor.ql-blank::before {
          color: #9ca3af;
        }

        /* Hover states para tema escuro */
        .rich-text-editor .ql-toolbar.dark-toolbar button:hover .ql-stroke,
        .rich-text-editor .ql-toolbar.dark-toolbar .ql-picker-label:hover .ql-stroke {
          stroke: #60a5fa;
        }

        .rich-text-editor .ql-toolbar.dark-toolbar button:hover .ql-fill,
        .rich-text-editor .ql-toolbar.dark-toolbar .ql-picker-label:hover .ql-fill {
          fill: #60a5fa;
        }

        .rich-text-editor .ql-toolbar.dark-toolbar .ql-picker-label:hover {
          color: #60a5fa;
        }

        /* Estados ativos para tema escuro */
        .rich-text-editor .ql-toolbar.dark-toolbar .ql-active .ql-stroke {
          stroke: #60a5fa;
        }

        .rich-text-editor .ql-toolbar.dark-toolbar .ql-active .ql-fill {
          fill: #60a5fa;
        }

        .rich-text-editor .ql-toolbar.dark-toolbar .ql-active {
          color: #60a5fa;
        }
      `}</style>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        className="rich-text-editor"
        style={{ 
          height: height,
          minHeight: minHeight,
          maxHeight: maxHeight
        }}
      />
    </>
  );
};

export default RichTextEditor; 