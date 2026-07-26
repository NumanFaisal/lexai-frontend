'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  Undo2,
  Redo2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  ListOrdered,
  Table as TableIcon,
  ChevronDown,
  Quote,
  MoreHorizontal,
  FileText,
  FilePlus,
  ArrowUpToLine,
  ArrowDownToLine,
  ArrowLeftToLine,
  ArrowRightToLine,
  MinusSquare,
  FoldHorizontal,
  UnfoldHorizontal,
  Trash2,
  Strikethrough,
  Indent,
  Outdent,
  Minus as MinusIcon,
} from 'lucide-react';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import { FontFamily } from '@tiptap/extension-font-family';
import { Color } from '@tiptap/extension-color';
import { Highlight } from '@tiptap/extension-highlight';
import { Extension } from '@tiptap/core';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';
import { useEffect, useState, useRef } from 'react';
import { PlaceholderNode } from './PlaceholderNode';

const FontSize = Extension.create({
  name: 'fontSize',
  addOptions() {
    return { types: ['textStyle'] };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element: HTMLElement) => element.style.fontSize.replace(/['"]+/g, ''),
            renderHTML: (attributes: any) => {
              if (!attributes.fontSize) return {};
              return { style: `font-size: ${attributes.fontSize}` };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize:
        (fontSize: string) =>
        ({ chain }: any) =>
          chain().setMark('textStyle', { fontSize }).run(),
      unsetFontSize:
        () =>
        ({ chain }: any) =>
          chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run(),
    };
  },
});

const IndentExtension = Extension.create({
  name: 'indent',
  addGlobalAttributes() {
    return [
      {
        types: ['paragraph', 'heading'],
        attributes: {
          indent: {
            default: 0,
            parseHTML: (element: HTMLElement) =>
              parseInt(element.style.paddingLeft || '0', 10) || 0,
            renderHTML: (attributes: any) => {
              if (!attributes.indent) return {};
              return { style: `padding-left: ${attributes.indent}px` };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      indent:
        () =>
        ({ tr, state, dispatch }: any) => {
          const { selection } = state;
          tr.doc.nodesBetween(selection.from, selection.to, (node: any, pos: number) => {
            if (['paragraph', 'heading'].includes(node.type.name)) {
              const currentIndent = node.attrs.indent || 0;
              if (dispatch)
                tr.setNodeMarkup(pos, undefined, { ...node.attrs, indent: currentIndent + 24 });
            }
          });
          return true;
        },
      outdent:
        () =>
        ({ tr, state, dispatch }: any) => {
          const { selection } = state;
          tr.doc.nodesBetween(selection.from, selection.to, (node: any, pos: number) => {
            if (['paragraph', 'heading'].includes(node.type.name)) {
              const currentIndent = node.attrs.indent || 0;
              if (currentIndent > 0 && dispatch)
                tr.setNodeMarkup(pos, undefined, {
                  ...node.attrs,
                  indent: Math.max(0, currentIndent - 24),
                });
            }
          });
          return true;
        },
    };
  },
});

const FONT_SIZES = ['10pt', '11pt', '12pt', '14pt', '16pt', '18pt', '24pt', '36pt'];
const FONTS = [
  'Times New Roman',
  'Arial',
  'Georgia',
  'Garamond',
  'Courier New',
  'Calibri',
  'Verdana',
  'Trebuchet MS',
];
const TEXT_COLORS = [
  '#000000',
  '#4B5563',
  '#EF4444',
  '#F97316',
  '#EAB308',
  '#22C55E',
  '#3B82F6',
  '#A855F7',
];
const HIGHLIGHT_COLORS = ['transparent', '#FEF08A', '#BBF7D0', '#BFDBFE', '#FBCFE8', '#FED7AA'];

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  onTemplateLoad?: (title: string) => void;
  placeholder?: string;
  onFocus?: () => void;
}

export default function TiptapEditor({ content, onChange, placeholder, onFocus }: TiptapEditorProps) {
  const [isParagraphMenuOpen, setIsParagraphMenuOpen] = useState(false);
  const [isTableMenuOpen, setIsTableMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [hoverRow, setHoverRow] = useState(0);
  const [hoverCol, setHoverCol] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const tableMenuRef = useRef<HTMLDivElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsParagraphMenuOpen(false);
      }
      if (tableMenuRef.current && !tableMenuRef.current.contains(event.target as Node)) {
        setIsTableMenuOpen(false);
      }
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setIsMoreMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TextStyle,
      FontFamily,
      Color,
      Highlight.configure({ multicolor: true }),
      FontSize,
      IndentExtension,
      PlaceholderNode,
    ],
    content,
    editorProps: {
      attributes: {
        class:
          'w-full min-h-[1056px] outline-none font-serif text-[15px] leading-[1.8] text-gray-900 placeholder:text-gray-400',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    onFocus: () => {
      if (onFocus) {
        onFocus();
      }
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      // Defer to prevent flushSync error during React render cycle
      setTimeout(() => {
        if (!editor.isDestroyed) {
          editor.commands.setContent(content, false);
        }
      }, 0);
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  const menuItems = [
    {
      label: 'Paragraph',
      icon: <span className="font-serif text-[14px] font-bold">¶</span>,
      shortcut: '⌘⌥0',
      action: () => editor.chain().focus().setParagraph().run(),
      isActive: editor.isActive('paragraph'),
    },
    {
      label: 'Heading 1',
      icon: <span className="text-[13px] font-bold tracking-tighter">H1</span>,
      shortcut: '⌘⌥1',
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive('heading', { level: 1 }),
    },
    {
      label: 'Heading 2',
      icon: <span className="text-[13px] font-bold tracking-tighter">H2</span>,
      shortcut: '⌘⌥2',
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive('heading', { level: 2 }),
    },
    {
      label: 'Heading 3',
      icon: <span className="text-[13px] font-bold tracking-tighter">H3</span>,
      shortcut: '⌘⌥3',
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive('heading', { level: 3 }),
    },
    {
      label: 'Heading 4',
      icon: <span className="text-[13px] font-bold tracking-tighter">H4</span>,
      shortcut: '⌘⌥4',
      action: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      isActive: editor.isActive('heading', { level: 4 }),
    },
    {
      label: 'Bulleted List',
      icon: <List size={14} />,
      shortcut: '⌘⇧L',
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive('bulletList'),
    },
    {
      label: 'Numbered List',
      icon: <ListOrdered size={14} />,
      shortcut: '⌘⇧7',
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive('orderedList'),
    },
    {
      label: 'Block Quote',
      icon: <Quote size={14} />,
      shortcut: '⌘⇧B',
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive('blockquote'),
    },
  ];

  const activeItem = menuItems.find((item) => item.isActive) || menuItems[0];

  return (
    <div className="flex h-full w-full flex-col bg-[#0a0a0c]">
      {/* Floating Formatting Toolbar */}
      <div className="mx-auto mt-4 mb-2 flex h-[44px] w-max shrink-0 items-center overflow-visible rounded-xl border border-[#2A2A2D] bg-[#1A1A1D] px-4 shadow-sm">
        {/* Left Side Group */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="rounded p-1.5 text-text-muted transition-colors hover:bg-[#1A1A1D] hover:text-text-primary disabled:opacity-50"
          >
            <Undo2 size={16} strokeWidth={2} />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="rounded p-1.5 text-text-muted transition-colors hover:bg-[#1A1A1D] hover:text-text-primary disabled:opacity-50"
          >
            <Redo2 size={16} strokeWidth={2} />
          </button>

          <div className="mx-1 h-5 w-px bg-[#1A1A1D]"></div>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsParagraphMenuOpen(!isParagraphMenuOpen)}
              className={`flex items-center gap-1.5 rounded px-2 py-1 transition-colors hover:bg-[#1A1A1D] ${isParagraphMenuOpen ? 'bg-[#1A1A1D] text-gold' : 'text-text-secondary'}`}
            >
              <div className="flex w-[16px] justify-center text-text-muted">{activeItem.icon}</div>
              <span className="w-[70px] truncate text-left text-[13px] font-medium">
                {activeItem.label}
              </span>
              <ChevronDown
                size={14}
                className={isParagraphMenuOpen ? 'text-gold' : 'text-[#555555]'}
              />
            </button>

            {isParagraphMenuOpen && (
              <div className="animate-in fade-in zoom-in-95 absolute top-full left-0 z-50 mt-1 w-[220px] rounded-lg border border-[#1A1A1D] bg-[#0D0D0F] py-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] duration-100">
                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      item.action();
                      setIsParagraphMenuOpen(false);
                    }}
                    className={`flex w-full items-center justify-between px-3 py-1.5 text-[13px] transition-colors hover:bg-[#2A2A2D] ${item.isActive ? 'bg-[#1A1A1D] text-gold' : 'text-text-secondary'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex w-[20px] justify-center ${item.isActive ? 'text-gold' : 'text-text-muted opacity-80'}`}
                      >
                        {item.icon}
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <span className="text-[10px] font-medium tracking-widest text-[#555555]">
                      {item.shortcut}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mx-1 h-5 w-px bg-[#1A1A1D]"></div>

          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`rounded p-1.5 transition-colors ${editor.isActive('bold') ? 'bg-gray-200 text-gray-900' : 'text-text-muted hover:bg-[#1A1A1D] hover:text-text-primary'}`}
          >
            <Bold size={16} strokeWidth={2} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`rounded p-1.5 transition-colors ${editor.isActive('italic') ? 'bg-gray-200 text-gray-900' : 'text-text-muted hover:bg-[#1A1A1D] hover:text-text-primary'}`}
          >
            <Italic size={16} strokeWidth={2} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`rounded p-1.5 transition-colors ${editor.isActive('underline') ? 'bg-gray-200 text-gray-900' : 'text-text-muted hover:bg-[#1A1A1D] hover:text-text-primary'}`}
          >
            <UnderlineIcon size={16} strokeWidth={2} />
          </button>

          <div className="mx-1 h-5 w-px bg-[#1A1A1D]"></div>

          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`rounded p-1.5 transition-colors ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200 text-gray-900' : 'text-text-muted hover:bg-[#1A1A1D] hover:text-text-primary'}`}
          >
            <AlignLeft size={16} strokeWidth={2} />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`rounded p-1.5 transition-colors ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200 text-gray-900' : 'text-text-muted hover:bg-[#1A1A1D] hover:text-text-primary'}`}
          >
            <AlignCenter size={16} strokeWidth={2} />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`rounded p-1.5 transition-colors ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200 text-gray-900' : 'text-text-muted hover:bg-[#1A1A1D] hover:text-text-primary'}`}
          >
            <AlignRight size={16} strokeWidth={2} />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={`rounded p-1.5 transition-colors ${editor.isActive({ textAlign: 'justify' }) ? 'bg-gray-200 text-gray-900' : 'text-text-muted hover:bg-[#1A1A1D] hover:text-text-primary'}`}
          >
            <AlignJustify size={16} strokeWidth={2} />
          </button>

          <div className="mx-1 h-5 w-px bg-[#1A1A1D]"></div>

          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`rounded p-1.5 transition-colors ${editor.isActive('orderedList') ? 'bg-gray-200 text-gray-900' : 'text-text-muted hover:bg-[#1A1A1D] hover:text-text-primary'}`}
          >
            <ListOrdered size={16} strokeWidth={2} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`rounded p-1.5 transition-colors ${editor.isActive('bulletList') ? 'bg-gray-200 text-gray-900' : 'text-text-muted hover:bg-[#1A1A1D] hover:text-text-primary'}`}
          >
            <List size={16} strokeWidth={2} />
          </button>

          <div className="mx-1 h-5 w-px bg-[#1A1A1D]"></div>

          <div className="relative" ref={tableMenuRef}>
            <button
              onClick={() => setIsTableMenuOpen(!isTableMenuOpen)}
              className={`flex items-center gap-0.5 rounded p-1.5 transition-colors ${isTableMenuOpen || editor.isActive('table') ? 'bg-gray-200 text-gray-900' : 'text-text-muted hover:bg-[#1A1A1D] hover:text-text-primary'}`}
            >
              <TableIcon size={16} strokeWidth={2} />
              <ChevronDown
                size={12}
                className={isTableMenuOpen ? 'text-gold' : 'text-[#555555]'}
              />
            </button>

            {isTableMenuOpen && (
              <div className="animate-in fade-in zoom-in-95 absolute top-full left-0 z-50 mt-2 flex w-max flex-col items-center rounded-xl border border-[#1A1A1D] bg-[#0D0D0F] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] duration-100">
                <div
                  className="grid grid-cols-10 gap-[3px]"
                  onMouseLeave={() => {
                    setHoverRow(0);
                    setHoverCol(0);
                  }}
                >
                  {Array.from({ length: 10 }).map((_, r) =>
                    Array.from({ length: 10 }).map((_, c) => {
                      const isHovered = r < hoverRow && c < hoverCol;
                      return (
                        <div
                          key={`${r}-${c}`}
                          className={`h-[18px] w-[18px] shrink-0 rounded-[4px] border transition-colors duration-75 ${isHovered ? 'border-gold bg-gold/20' : 'border-[#2A2A2D] bg-[#0D0D0F]'} cursor-pointer`}
                          onMouseEnter={() => {
                            setHoverRow(r + 1);
                            setHoverCol(c + 1);
                          }}
                          onClick={() => {
                            editor
                              .chain()
                              .focus()
                              .insertTable({ rows: r + 1, cols: c + 1, withHeaderRow: true })
                              .run();
                            setIsTableMenuOpen(false);
                            setHoverRow(0);
                            setHoverCol(0);
                          }}
                        />
                      );
                    })
                  )}
                </div>
                <div className="mt-3 w-full text-center text-[12px] font-medium tracking-wide text-text-secondary">
                  {hoverRow > 0 && hoverCol > 0 ? `${hoverRow} × ${hoverCol}` : 'Pick table size'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Editor Canvas */}
      <div className="custom-scrollbar w-full flex-1 overflow-y-auto transition-colors duration-200 bg-[#0a0a0c] px-4 py-8">
        <div className="transition-all duration-200 mx-auto min-h-[1056px] w-full max-w-[816px] border border-[#2A2A2D] bg-white px-16 py-20 shadow-lg">
          {editor && (
            <BubbleMenu
              editor={editor}
              tippyOptions={{ duration: 100, maxWidth: 400 }}
              shouldShow={({ editor }) => editor.isActive('table')}
            >
              <div className="flex items-center gap-0.5 rounded-lg border border-gray-200 bg-white p-1 shadow-[0_4px_20px_rgb(0,0,0,0.08)]">
                <button
                  onClick={() => editor.chain().focus().addRowBefore().run()}
                  className="rounded p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
                  title="Add Row Above"
                >
                  <ArrowUpToLine size={15} strokeWidth={2} />
                </button>
                <button
                  onClick={() => editor.chain().focus().addRowAfter().run()}
                  className="rounded p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
                  title="Add Row Below"
                >
                  <ArrowDownToLine size={15} strokeWidth={2} />
                </button>
                <button
                  onClick={() => editor.chain().focus().deleteRow().run()}
                  className="rounded p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
                  title="Delete Row"
                >
                  <MinusSquare size={15} strokeWidth={2} />
                </button>

                <div className="mx-1 h-4 w-px bg-gray-200"></div>

                <button
                  onClick={() => editor.chain().focus().addColumnBefore().run()}
                  className="rounded p-1.5 text-gray-500 transition-colors hover:bg-[#2A2A2D] hover:text-gray-900"
                  title="Add Column Left"
                >
                  <ArrowLeftToLine size={15} strokeWidth={2} />
                </button>
                <button
                  onClick={() => editor.chain().focus().addColumnAfter().run()}
                  className="rounded p-1.5 text-gray-500 transition-colors hover:bg-[#2A2A2D] hover:text-gray-900"
                  title="Add Column Right"
                >
                  <ArrowRightToLine size={15} strokeWidth={2} />
                </button>
                <button
                  onClick={() => editor.chain().focus().deleteColumn().run()}
                  className="rounded p-1.5 text-gray-500 transition-colors hover:bg-[#2A2A2D] hover:text-gray-900"
                  title="Delete Column"
                >
                  <MinusSquare size={15} strokeWidth={2} />
                </button>

                <div className="mx-1 h-4 w-px bg-gray-200"></div>

                <button
                  onClick={() => editor.chain().focus().mergeCells().run()}
                  className="rounded p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
                  title="Merge Cells"
                >
                  <FoldHorizontal size={15} strokeWidth={2} />
                </button>
                <button
                  onClick={() => editor.chain().focus().splitCell().run()}
                  className="rounded p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
                  title="Split Cell"
                >
                  <UnfoldHorizontal size={15} strokeWidth={2} />
                </button>

                <div className="mx-1 h-4 w-px bg-gray-200"></div>

                <button
                  onClick={() => editor.chain().focus().deleteTable().run()}
                  className="rounded p-1.5 text-red-500 transition-colors hover:bg-red-50"
                  title="Delete Table"
                >
                  <Trash2 size={15} strokeWidth={2} />
                </button>
              </div>
            </BubbleMenu>
          )}
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}
