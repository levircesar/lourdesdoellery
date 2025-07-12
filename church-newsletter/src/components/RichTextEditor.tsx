import React, { useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// CSS personalizado para o editor
const editorStyles = `
  .rich-text-editor .ql-container {
    height: calc(100% - 42px);
    overflow-y: auto;
  }
  
  .rich-text-editor .ql-editor {
    min-height: 100%;
    font-size: 14px;
    line-height: 1.6;
  }
  
  .rich-text-editor .ql-toolbar {
    border-bottom: 1px solid #ccc;
    background: #f8f9fa;
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
  height = '400px',
  minHeight = '300px',
  maxHeight = '600px'
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
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <div 
          className="rich-text-editor"
          style={{ 
            height: height,
            minHeight: minHeight,
            maxHeight: maxHeight
          }}
        >
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={value}
            onChange={onChange}
            modules={modules}
            formats={formats}
            placeholder={placeholder}
          />
        </div>
      </div>
    </>
  );
};

export default RichTextEditor; 