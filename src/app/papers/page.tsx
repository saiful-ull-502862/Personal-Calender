import { getAllPapers } from "@/app/actions";
import Link from "next/link";
import { format } from "date-fns";
import { Plus, ExternalLink, FileText, CheckCircle, Clock } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function PapersPage() {
    const papers = await getAllPapers();

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 pb-1">
                        Research Papers
                    </h1>
                    <p className="text-muted-foreground text-lg">Track your extensive reading list and summaries.</p>
                </div>
                <Link href="/papers/new" className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 font-bold">
                    <Plus size={20} /> Add Paper
                </Link>
            </header>

            <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-muted-foreground">
                        <thead className="bg-muted/50 text-xs uppercase font-semibold text-foreground">
                            <tr>
                                <th className="px-6 py-4">Title</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Year</th>
                                <th className="px-6 py-4">Added</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {papers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-lg font-medium">
                                        No papers added yet.
                                        <Link href="/papers/new" className="text-blue-500 hover:underline ml-2">Add your first one!</Link>
                                    </td>
                                </tr>
                            ) : (
                                papers.map((paper) => (
                                    <tr key={paper.id} className="group hover:bg-muted/30 transition-colors">
                                        <td className="px-6 py-4 font-medium text-foreground">
                                            <div className="flex flex-col">
                                                <span className="text-base line-clamp-1">{paper.title}</span>
                                                <span className="text-xs text-muted-foreground">{paper.authors || "Unknown Authors"}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold
                                        ${paper.status === 'Read' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                                    paper.status === 'Reading' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                                        'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                                                }
                                     `}>
                                                {paper.status === 'Read' ? <CheckCircle size={12} /> : <Clock size={12} />}
                                                {paper.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">{paper.year || "-"}</td>
                                        <td className="px-6 py-4">{format(paper.createdAt, 'MMM d, yyyy')}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                {paper.link && (
                                                    <a href={paper.link} target="_blank" rel="noopener noreferrer" className="p-2 text-muted-foreground hover:text-blue-500 transition-colors" title="Open Link">
                                                        <ExternalLink size={18} />
                                                    </a>
                                                )}
                                                <Link href={`/papers/${paper.id}`} className="p-2 text-muted-foreground hover:text-primary transition-colors" title="View Summary">
                                                    <FileText size={18} />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
