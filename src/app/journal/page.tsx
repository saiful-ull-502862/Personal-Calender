import { getAllJournalEntries } from "@/app/actions";
import Link from "next/link";
import { format } from "date-fns";
import { Plus, Search, Tag, BookOpen } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function JournalListPage() {
    const entries = await getAllJournalEntries();

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-secondary via-pink-500 to-purple-500 pb-1">
                        Research Journal
                    </h1>
                    <p className="text-muted-foreground text-lg">Document your daily progress, experiments, and literature reviews.</p>
                </div>
                <Link href="/journal/new" className="flex items-center gap-2 px-6 py-3 bg-secondary text-white rounded-xl hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/25 font-bold">
                    <Plus size={20} /> New Entry
                </Link>
            </header>

            {/* Search Bar Placeholder */}
            <div className="relative max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input type="text" placeholder="Search by title, tag, or content..." className="w-full pl-12 pr-4 py-3 rounded-xl border border-border/50 bg-card/50 backdrop-blur focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all shadow-sm" />
            </div>

            <div className="grid gap-4">
                {entries.map(entry => (
                    <Link href={`/journal/${entry.id}`} key={entry.id} className="block group">
                        <div className="glass-card p-6 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl border border-border/50 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-secondary/0 group-hover:bg-secondary transition-all"></div>

                            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold group-hover:text-secondary transition-colors mb-2">{entry.title}</h2>
                                    <div className="text-sm text-muted-foreground flex items-center gap-3 mb-4">
                                        <span className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md">
                                            <BookOpen size={14} /> {format(entry.date, 'MMM d, yyyy')}
                                        </span>
                                        <span>•</span>
                                        <span>{format(entry.createdAt, 'h:mm a')}</span>
                                    </div>
                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {entry.tags.split(',').filter(Boolean).map((tag, i) => (
                                            <span key={i} className="flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full bg-secondary/5 text-secondary border border-secondary/10 group-hover:bg-secondary/10 transition-colors">
                                                <Tag size={12} /> {tag.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
                {entries.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-muted-foreground border-2 border-dashed border-muted rounded-2xl bg-muted/10">
                        <BookOpen className="w-16 h-16 mb-4 opacity-20" />
                        <p className="text-xl font-medium mb-2">No journal entries yet</p>
                        <p>Start documenting your research journey today.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
