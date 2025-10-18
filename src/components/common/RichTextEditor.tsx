// src/components/common/RichTextEditor.tsx
"use client";

import Blockquote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import CodeBlock from "@tiptap/extension-code-block";
import History from "@tiptap/extension-history";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import ImageExtension from "@tiptap/extension-image";
import LinkExtension from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Placeholder from "@tiptap/extension-placeholder";
import { TableKit } from "@tiptap/extension-table";
import { TableCell } from "@tiptap/extension-table/cell";
import { TableHeader } from "@tiptap/extension-table/header";
import { TableRow } from "@tiptap/extension-table/row";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

// import Highlight from "@tiptap/extension-highlight";
// import Typography from "@tiptap/extension-typography";
// import TextAlign from "@tiptap/extension-text-align";

// lucide icons
import {
	AlignCenter,
	AlignLeft,
	AlignRight,
	Bold as BoldIcon,
	Columns,
	Image as ImageIcon,
	Italic as ItalicIcon,
	Link as LinkIcon,
	List as ListIcon,
	ListOrdered as OrderedListIcon,
	Redo2,
	Rows,
	Table as TableIcon,
	Trash2,
	Underline as UnderlineIcon,
	Undo2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface RichTextEditorProps {
	value: string;
	onChange: (html: string) => void;
	placeholder?: string;
	className?: string;
}

/**
 * RichTextEditor
 * - loads many tiptap extensions
 * - `immediatelyRender: false` to avoid SSR hydration mismatches
 * - sticky toolbar + scrollable editor region
 */
export default function RichTextEditor({
	value,
	onChange,
	placeholder = "Write the abstract...",
	className = "",
}: RichTextEditorProps) {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			LinkExtension.configure({
				openOnClick: true,
				autolink: true,
				linkOnPaste: true,
				HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
			}),
			Placeholder.configure({ placeholder }),
			// History,
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
			// Highlight,
			// Typography,
			// TextAlign.configure({ types: ["heading", "paragraph"] }),
		],
		content: value || "",
		onUpdate: ({ editor }) => onChange(editor.getHTML()),
		immediatelyRender: false, // required to avoid SSR hydration mismatch
	});

	const handleEditorClick = () => editor?.chain().focus().run();

	// don't render editor until client-side editor is ready
	if (!editor) {
		// placeholder skeleton while TipTap initializes
		return (
			<div className="border rounded-md p-2 min-h-[160px] bg-white">
				<div className="h-8 mb-2 rounded bg-gray-100 animate-pulse" />
				<div className="h-40 rounded bg-gray-50 animate-pulse" />
			</div>
		);
	}

	const IconButton = ({
		icon,
		onClick,
		active = false,
		title,
	}: {
		icon: React.ReactNode;
		onClick: () => void;
		active?: boolean;
		title?: string;
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

	return (
		<div className={`border rounded-md bg-white relative ${className}`}>
			{/* sticky toolbar */}
			<div className="sticky top-0 z-20 bg-white border-b p-2 flex flex-wrap gap-1 items-center">
				{IconButton({
					icon: <BoldIcon size={16} />,
					onClick: () => editor.chain().focus().toggleBold().run(),
					active: editor.isActive("bold"),
					title: "Bold",
				})}
				{IconButton({
					icon: <ItalicIcon size={16} />,
					onClick: () => editor.chain().focus().toggleItalic().run(),
					active: editor.isActive("italic"),
					title: "Italic",
				})}
				{IconButton({
					icon: <UnderlineIcon size={16} />,
					onClick: () => editor.chain().focus().toggleUnderline().run(),
					active: editor.isActive("underline"),
					title: "Underline",
				})}

				{IconButton({
					icon: <ListIcon size={16} />,
					onClick: () => editor.chain().focus().toggleBulletList().run(),
					active: editor.isActive("bulletList"),
					title: "Bullet list",
				})}
				{IconButton({
					icon: <OrderedListIcon size={16} />,
					onClick: () => editor.chain().focus().toggleOrderedList().run(),
					active: editor.isActive("orderedList"),
					title: "Numbered list",
				})}

				{IconButton({
					icon: <LinkIcon size={16} />,
					onClick: () => {
						const url = prompt("Enter link URL");
						if (url)
							editor
								.chain()
								.focus()
								.extendMarkRange("link")
								.setLink({ href: url })
								.run();
					},
					active: editor.isActive("link"),
					title: "Link",
				})}

				{IconButton({
					icon: <ImageIcon size={16} />,
					onClick: () => {
						const url = prompt("Enter image URL");
						if (url) editor.chain().focus().setImage({ src: url }).run();
					},
					title: "Insert image",
				})}

				<div className="w-px h-5 bg-gray-200 mx-1" />

				{/* {IconButton({
          icon: <AlignLeft size={16} />,
          onClick: () => editor.chain().focus().setTextAlign("left").run(),
          active: editor.isActive({ textAlign: "left" }),
          title: "Align left",
        })} */}
				{/* {IconButton({
          icon: <AlignCenter size={16} />,
          onClick: () => editor.chain().focus().setTextAlign("center").run(),
          active: editor.isActive({ textAlign: "center" }),
          title: "Center",
        })} */}
				{/* {IconButton({
          icon: <AlignRight size={16} />,
          onClick: () => editor.chain().focus().setTextAlign("right").run(),
          active: editor.isActive({ textAlign: "right" }),
          title: "Align right",
        })} */}

				<div className="w-px h-5 bg-gray-200 mx-1" />

				{IconButton({
					icon: <Undo2 size={16} />,
					onClick: () => editor.chain().focus().undo().run(),
					title: "Undo",
				})}
				{IconButton({
					icon: <Redo2 size={16} />,
					onClick: () => editor.chain().focus().redo().run(),
					title: "Redo",
				})}

				<div className="w-px h-5 bg-gray-200 mx-1" />

				{IconButton({
					icon: <TableIcon size={16} />,
					onClick: () =>
						editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run(),
					title: "Insert table",
				})}
				{IconButton({
					icon: <Rows size={16} />,
					onClick: () => editor.chain().focus().addRowAfter().run(),
					title: "Add row",
				})}
				{IconButton({
					icon: <Columns size={16} />,
					onClick: () => editor.chain().focus().addColumnAfter().run(),
					title: "Add column",
				})}
				{IconButton({
					icon: <Trash2 size={16} />,
					onClick: () => editor.chain().focus().deleteTable().run(),
					title: "Delete table",
				})}
			</div>

			{/* scrollable editor area; sticky toolbar will stay visible */}
			<div
				className="p-3 max-h-[48vh] overflow-y-auto"
				role="textbox"
				onClick={handleEditorClick}
				onKeyDown={handleEditorClick} // focus editor on keydown too
			>
				<EditorContent
					editor={editor}
					className="prose max-w-none  focus:outline-none"
				/>
			</div>
		</div>
	);
}
