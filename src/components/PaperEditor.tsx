"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { useState } from 'react';
import { Bold, Italic, List, ListOrdered, Save, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface PaperEditorProps {
    initialData?: {
        id?: string;
        title: string;
        authors?: string;
        year?: number;
        status: string;
        link?: string;
        summary?: string;
    };
    onSave: (data: any) => Promise<void>;
}

export default function PaperEditor({ initialData, onSave }: PaperEditorProps) {
    const router = useRouter();
    const [title, setTitle] = useState(initialData?.title || '');
    const [authors, setAuthors] = useState(initialData?.authors || '');
    const [year, setYear] = useState(initialData?.year?.toString() || '');
    const [status, setStatus] = useState(initialData?.status || 'To Read');
    const [link, setLink] = useState(initialData?.link || '');
    const [isSaving, setIsSaving] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({ placeholder: 'Write your summary, key takeaways, and methodology notes here...' }),
        ],
        content: initialData?.summary || '',
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl dark:prose-invert mx-auto focus:outline-none min-h-[300px] text-foreground',
            },
        },
        immediatelyRender: false,
    });

    const handleSave = async () => {
        setIsSaving(true);
        await onSave({
            title,
            authors,
            year: year ? parseInt(year) : undefined,
            status,
            link,
            summary: editor?.getHTML() || '',
        });
        setIsSaving(false);
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-500 pb-10">
            <div className="flex items-center gap-4 mb-6">
                <Link href="/papers" className="p-2 hover:bg-muted rounded-full transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-2xl font-bold">{initialData ? 'Edit Paper' : 'Add New Paper'}</h1>
            </div>

            <div className="glass-card p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Paper Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Attention Is All You Need"
                            className="w-full p-3 rounded-lg bg-background border border-border focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Authors</label>
                        <input
                            type="text"
                            value={authors}
                            onChange={(e) => setAuthors(e.target.value)}
                            placeholder="e.g. Vaswani et al."
                            className="w-full p-3 rounded-lg bg-background border border-border focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Publication Year</label>
                        <input
                            type="number"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            placeholder="2017"
                            className="w-full p-3 rounded-lg bg-background border border-border focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Reading Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full p-3 rounded-lg bg-background border border-border focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="To Read">To Read</option>
                            <option value="Reading">Reading</option>
                            <option value="Read">Read</option>
                        </select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium text-muted-foreground">Link (Google Drive/Doc/PDF)</label>
                        <input
                            type="url"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            placeholder="https://drive.google.com/..."
                            className="w-full p-3 rounded-lg bg-background border border-border focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono text-sm"
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-lg font-bold">Summary & Notes</label>
                <div className="glass-card flex items-center justify-between p-2 sticky top-4 z-10">
                    <div className="flex gap-1">
                        <button onClick={() => editor?.chain().focus().toggleBold().run()} className={`p-2 rounded-lg hover:bg-muted transition-colors ${editor?.isActive('bold') ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}><Bold size={20} /></button>
                        <button onClick={() => editor?.chain().focus().toggleItalic().run()} className={`p-2 rounded-lg hover:bg-muted transition-colors ${editor?.isActive('italic') ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}><Italic size={20} /></button>
                        <div className="w-px h-6 bg-border mx-1 self-center" />
                        <button onClick={() => editor?.chain().focus().toggleBulletList().run()} className={`p-2 rounded-lg hover:bg-muted transition-colors ${editor?.isActive('bulletList') ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}><List size={20} /></button>
                        <button onClick={() => editor?.chain().focus().toggleOrderedList().run()} className={`p-2 rounded-lg hover:bg-muted transition-colors ${editor?.isActive('orderedList') ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}><ListOrdered size={20} /></button>
                    </div>
                </div>

                <div className="glass-card p-8 min-h-[400px] border border-border/50">
                    <EditorContent editor={editor} />
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 flex items-center gap-2 disabled:opacity-50 font-semibold"
                >
                    <Save size={20} /> {isSaving ? 'Saving...' : 'Save Paper'}
                </button>
            </div>
        </div>
    );
}
