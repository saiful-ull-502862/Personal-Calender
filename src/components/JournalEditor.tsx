"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { useState } from 'react';
import { Bold, Italic, List, ListOrdered, Save } from 'lucide-react';

interface JournalEditorProps {
    initialTitle?: string;
    initialContent?: string;
    initialTags?: string;
    id?: string;
    onSave: (data: { title: string; content: string; tags: string }) => Promise<void>;
}

export default function JournalEditor({ initialTitle = '', initialContent = '', initialTags = '', onSave }: JournalEditorProps) {
    const [title, setTitle] = useState(initialTitle);
    const [tags, setTags] = useState(initialTags);
    const [isSaving, setIsSaving] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({ placeholder: 'Start writing your research notes, ideas, or experiment results...' }),
        ],
        content: initialContent,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl dark:prose-invert mx-auto focus:outline-none min-h-[300px] text-foreground',
            },
        },
    });

    const handleSave = async () => {
        if (!editor) return;
        setIsSaving(true);
        await onSave({
            title,
            content: editor.getHTML(),
            tags
        });
        setIsSaving(false);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-500">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Entry Title"
                className="w-full text-4xl font-black bg-transparent border-none focus:outline-none placeholder:text-muted-foreground/50 text-foreground text-center md:text-left tracking-tight"
            />

            <div className="glass-card flex items-center justify-between p-2 sticky top-4 z-10">
                <div className="flex gap-1">
                    <button onClick={() => editor?.chain().focus().toggleBold().run()} className={`p-2 rounded-lg hover:bg-muted transition-colors ${editor?.isActive('bold') ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}><Bold size={20} /></button>
                    <button onClick={() => editor?.chain().focus().toggleItalic().run()} className={`p-2 rounded-lg hover:bg-muted transition-colors ${editor?.isActive('italic') ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}><Italic size={20} /></button>
                    <div className="w-px h-6 bg-border mx-1 self-center" />
                    <button onClick={() => editor?.chain().focus().toggleBulletList().run()} className={`p-2 rounded-lg hover:bg-muted transition-colors ${editor?.isActive('bulletList') ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}><List size={20} /></button>
                    <button onClick={() => editor?.chain().focus().toggleOrderedList().run()} className={`p-2 rounded-lg hover:bg-muted transition-colors ${editor?.isActive('orderedList') ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}><ListOrdered size={20} /></button>
                </div>
            </div>

            <div className="glass-card p-8 min-h-[500px] border border-border/50">
                <EditorContent editor={editor} />
            </div>

            <div className="flex gap-4 items-center">
                <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Tags (e.g. experiment, literature, idea)..."
                    className="flex-1 p-3 rounded-xl bg-card border border-border focus:ring-2 focus:ring-primary focus:outline-none transition-all shadow-sm"
                />
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-8 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 flex items-center gap-2 disabled:opacity-50 font-semibold"
                >
                    <Save size={20} /> {isSaving ? 'Saving...' : 'Save Entry'}
                </button>
            </div>
        </div>
    );
}
