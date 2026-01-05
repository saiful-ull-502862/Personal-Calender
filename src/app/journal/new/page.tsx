"use client";

import JournalEditor from '@/components/JournalEditor';
import { createJournalEntry } from '@/app/actions';
import { useRouter } from 'next/navigation';

export default function NewJournalEntryPage() {
    const router = useRouter();

    const handleSave = async (data: { title: string; content: string; tags: string }) => {
        await createJournalEntry(data);
        router.push('/journal');
    };

    return (
        <div className="py-6">
            <JournalEditor onSave={handleSave} />
        </div>
    );
}
