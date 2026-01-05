"use client";

import PaperEditor from '@/components/PaperEditor';
import { createPaper } from '@/app/actions';
import { useRouter } from 'next/navigation';

export default function NewPaperPage() {
    const router = useRouter();

    const handleSave = async (data: any) => {
        await createPaper(data);
        router.push('/papers');
    };

    return (
        <div className="py-6">
            <PaperEditor onSave={handleSave} />
        </div>
    );
}
