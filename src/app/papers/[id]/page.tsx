import { getPaper, updatePaper } from "@/app/actions";
import PaperEditor from "@/components/PaperEditor";
import { notFound } from "next/navigation";

export default async function EditPaperPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const paper = await getPaper(id);

    if (!paper) {
        notFound();
    }

    async function handleSave(data: any) {
        "use server";
        await updatePaper(id, data);
    }

    return (
        <div className="py-6">
            <PaperEditor
                initialData={paper}
                onSave={handleSave}
            />
        </div>
    );
}
