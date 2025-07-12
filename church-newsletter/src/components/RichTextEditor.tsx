import React, { useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// CSS personalizado para o editor
const editorStyles = `
  .rich-text-editor {
    min-height: 500px;
    resize: vertical;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 500px;
    max-height: 1200px;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
  }

  .rich-text-editor .ql-toolbar {
    border-bottom: 1px solid #ccc;
    background: #f8f9fa;
  }

  .rich-text-editor .ql-container {
    flex: 1 1 0%;
    min-height: 0;
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }

  .rich-text-editor .ql-editor {
    flex: 1 1 0%;
    min-height: 200px;
    font-size: 14px;
    line-height: 1.6;
    overflow-y: auto;
  }
`;

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

  return (
    <>
      <style>{editorStyles}</style>
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