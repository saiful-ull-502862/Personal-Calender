import { getJournalEntry, updateJournalEntry } from "@/app/actions";
import JournalEditor from "@/components/JournalEditor";
import { notFound } from "next/navigation";

export default async function JournalEntryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const entry = await getJournalEntry(id);

    if (!entry) {
        notFound();
    }

    async function handleSave(data: { title: string; content: string; tags: string }) {
        "use server";
        await updateJournalEntry(id, data);
    }

    return (
        <div className="py-6">
            <JournalEditor
                id={entry.id}
                initialTitle={entry.title}
                initialContent={entry.content}
                initialTags={entry.tags}
                onSave={handleSave}
            />
        </div>
    );
}
