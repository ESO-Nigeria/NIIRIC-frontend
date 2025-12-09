// src/components/common/RichTextEditor.tsx
"use client";

import React, { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import LinkExtension from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import ImageExtension from "@tiptap/extension-image";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlock from "@tiptap/extension-code-block";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import { TableKit } from "@tiptap/extension-table";
import { TableCell } from "@tiptap/extension-table/cell";
import { TableHeader } from "@tiptap/extension-table/header";
import { TableRow } from "@tiptap/extension-table/row";

import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  List as ListIcon,
  ListOrdered as OrderedListIcon,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo2,
  Redo2,
  Table as TableIcon,
  Rows,
  Columns,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ============================= TYPES ============================= */
interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
}

interface IconButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  title?: string;
}

/* ============================= EXTENSIONS CONFIG ============================= */
const getEditorExtensions = (placeholder: string) => [
  StarterKit,
  Underline,
  LinkExtension.configure({
    openOnClick: true,
    autolink: true,
    linkOnPaste: true,
    HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
  }),
  Placeholder.configure({ placeholder }),
  ImageExtension.configure({ inline: false }),
  Blockquote,
  CodeBlock,
  HorizontalRule,
  BulletList,
  OrderedList,
  ListItem,
  TableKit.configure({}),
  TableRow,
  TableHeader,
  TableCell,
];

/* ============================= COMPONENTS ============================= */
const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  active = false,
  title,
}) => (
  <Button
    size="icon"
    type="button"
    variant="ghost"
    onClick={onClick}
    className={`w-8 h-8 ${active ? "bg-gray-200 text-gray-900" : ""}`}
    title={title}
  >
    {icon}
  </Button>
);

const LoadingSkeleton: React.FC = () => (
  <div className="border rounded-md p-2 min-h-[160px] bg-white">
    <div className="h-8 mb-2 rounded bg-gray-100 animate-pulse" />
    <div className="h-40 rounded bg-gray-50 animate-pulse" />
  </div>
);

/* ============================= TOOLBAR ACTIONS ============================= */
const useToolbarActions = (editor: any) => {
  const handleAddLink = () => {
    const url = prompt("Enter link URL");
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  };

  const handleAddImage = () => {
    const url = prompt("Enter image URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return {
    bold: () => editor.chain().focus().toggleBold().run(),
    italic: () => editor.chain().focus().toggleItalic().run(),
    underline: () => editor.chain().focus().toggleUnderline().run(),
    bulletList: () => editor.chain().focus().toggleBulletList().run(),
    orderedList: () => editor.chain().focus().toggleOrderedList().run(),
    addLink: handleAddLink,
    addImage: handleAddImage,
    undo: () => editor.chain().focus().undo().run(),
    redo: () => editor.chain().focus().redo().run(),
    insertTable: () =>
      editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run(),
    addRow: () => editor.chain().focus().addRowAfter().run(),
    addColumn: () => editor.chain().focus().addColumnAfter().run(),
    deleteTable: () => editor.chain().focus().deleteTable().run(),
  };
};

/* ============================= TOOLBAR COMPONENT ============================= */
interface ToolbarProps {
  editor: any;
}

const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  const actions = useToolbarActions(editor);

  return (
    <div className="sticky top-0 z-20 bg-white border-b p-2 flex flex-wrap gap-1 items-center">
      {/* Text Formatting */}
      <IconButton
        icon={<BoldIcon size={16} />}
        onClick={actions.bold}
        active={editor.isActive("bold")}
        title="Bold"
      />
      <IconButton
        icon={<ItalicIcon size={16} />}
        onClick={actions.italic}
        active={editor.isActive("italic")}
        title="Italic"
      />
      <IconButton
        icon={<UnderlineIcon size={16} />}
        onClick={actions.underline}
        active={editor.isActive("underline")}
        title="Underline"
      />

      {/* Lists */}
      <IconButton
        icon={<ListIcon size={16} />}
        onClick={actions.bulletList}
        active={editor.isActive("bulletList")}
        title="Bullet list"
      />
      <IconButton
        icon={<OrderedListIcon size={16} />}
        onClick={actions.orderedList}
        active={editor.isActive("orderedList")}
        title="Numbered list"
      />

      {/* Links & Images */}
      <IconButton
        icon={<LinkIcon size={16} />}
        onClick={actions.addLink}
        active={editor.isActive("link")}
        title="Link"
      />
      <IconButton
        icon={<ImageIcon size={16} />}
        onClick={actions.addImage}
        title="Insert image"
      />

      <div className="w-px h-5 bg-gray-200 mx-1" />

      {/* History */}
      <IconButton
        icon={<Undo2 size={16} />}
        onClick={actions.undo}
        title="Undo"
      />
      <IconButton
        icon={<Redo2 size={16} />}
        onClick={actions.redo}
        title="Redo"
      />

      <div className="w-px h-5 bg-gray-200 mx-1" />

      {/* Table Actions */}
      <IconButton
        icon={<TableIcon size={16} />}
        onClick={actions.insertTable}
        title="Insert table"
      />
      <IconButton
        icon={<Rows size={16} />}
        onClick={actions.addRow}
        title="Add row"
      />
      <IconButton
        icon={<Columns size={16} />}
        onClick={actions.addColumn}
        title="Add column"
      />
      <IconButton
        icon={<Trash2 size={16} />}
        onClick={actions.deleteTable}
        title="Delete table"
      />
    </div>
  );
};

/* ============================= MAIN COMPONENT ============================= */
export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write the abstract...",
  className = "",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: getEditorExtensions(placeholder),
    content: value || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none  min-h-full",
      },
    },
  });

  // Sync external value changes to editor
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      const { from, to } = editor.state.selection;
      editor.commands.setContent(value || "", {});
      // Restore cursor position if possible
      editor.commands.setTextSelection({
        from: Math.min(from, editor.state.doc.content.size),
        to: Math.min(to, editor.state.doc.content.size),
      });
    }
  }, [editor, value]);

  const handleEditorClick = () => editor?.chain().focus().run();

  // don't render editor until client-side editor is ready
  if (!editor) {
    // placeholder skeleton while TipTap initializes
    return <LoadingSkeleton />;
  }

  return (
    <div
      className={`border rounded-md bg-white relative flex flex-col ${className}`}
    >
      <Toolbar editor={editor} />

      {/* scrollable editor area; sticky toolbar will stay visible */}
      <div
        className="p-3 flex-1 min-h-[200px] max-h-[48vh] overflow-y-auto [&_.ProseMirror]:outline-none [&_.ProseMirror]:border-none [&_.ProseMirror]:min-h-[180px]"
        role="textbox"
        onClick={handleEditorClick}
        onKeyDown={handleEditorClick}
      >
        <EditorContent
          editor={editor}
          className="h-full [&_.ProseMirror]:outline-none [&_.ProseMirror]:border-none"
        />
      </div>
    </div>
  );
}
