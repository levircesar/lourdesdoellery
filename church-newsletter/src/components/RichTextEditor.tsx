import React, { useState, useRef, useEffect } from 'react';
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
  height = '300px',
  minHeight = '200px',
  maxHeight = '600px'
}) => {
  const [editorHeight, setEditorHeight] = useState(height);
  const [isResizing, setIsResizing] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
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

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing || !editorRef.current) return;

    const rect = editorRef.current.getBoundingClientRect();
    const newHeight = e.clientY - rect.top;
    
    // Converter para pixels e aplicar limites
    const minHeightPx = parseInt(minHeight);
    const maxHeightPx = parseInt(maxHeight);
    
    if (newHeight >= minHeightPx && newHeight <= maxHeightPx) {
      setEditorHeight(`${newHeight}px`);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizing]);

  return (
    <div 
      className="relative border border-gray-300 rounded-lg overflow-hidden"
      ref={editorRef}
    >
      <div 
        className="rich-text-editor"
        style={{ 
          height: editorHeight,
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
      
      {/* Handle de redimensionamento */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-b from-transparent to-gray-200 flex items-center justify-center cursor-ns-resize transition-colors hover:bg-gradient-to-b hover:from-transparent hover:to-gray-300"
        onMouseDown={handleMouseDown}
      >
        <div className="text-gray-500 text-xs font-bold select-none">
          ⋮⋮
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor; 