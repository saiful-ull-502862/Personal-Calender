import { getEvents, getRecentJournalEntries, getDashboardStats } from "./actions";
import { format } from "date-fns";
import Link from "next/link";
import { Plus, Clock, BookOpen, FileText, FlaskConical, Target, AlertCircle } from "lucide-react";

// Force dynamic rendering to ensure stats are up-to-date
export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const today = new Date();
  const startOfDay = new Date(today);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);

  const todaysEvents = await getEvents(startOfDay, endOfDay);
  const recentEntries = await getRecentJournalEntries(3);
  const stats = await getDashboardStats();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-secondary pb-1">
            Research Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">Manage your schedule, experiments, and insights.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/calendar" className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 font-medium">
            <Plus size={20} /> Add Event
          </Link>
          <Link href="/journal/new" className="flex items-center gap-2 px-5 py-2.5 bg-secondary text-white rounded-xl hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/20 font-medium">
            <Plus size={20} /> New Entry
          </Link>
        </div>
      </header>

      {/* Quick Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/papers" className="glass-card p-5 flex flex-col items-center justify-center text-center hover:scale-105 transition-transform duration-200 cursor-pointer border-l-4 border-l-blue-500">
          <FileText className="w-8 h-8 text-blue-500 mb-2 opacity-80" />
          <div className="text-2xl font-bold">{stats.papersRead}</div>
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Papers Read</div>
        </Link>
        <Link href="/journal?search=experiment" className="glass-card p-5 flex flex-col items-center justify-center text-center hover:scale-105 transition-transform duration-200 cursor-pointer border-l-4 border-l-pink-500">
          <FlaskConical className="w-8 h-8 text-pink-500 mb-2 opacity-80" />
          <div className="text-2xl font-bold">{stats.experiments}</div>
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Experiments</div>
        </Link>
        <div className="glass-card p-5 flex flex-col items-center justify-center text-center hover:scale-105 transition-transform duration-200 border-l-4 border-l-green-500">
          <Target className="w-8 h-8 text-green-500 mb-2 opacity-80" />
          <div className="text-2xl font-bold">{stats.goalsProgress}%</div>
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Goal Progress</div>
        </div>
        <Link href="/calendar" className="glass-card p-5 flex flex-col items-center justify-center text-center hover:scale-105 transition-transform duration-200 cursor-pointer border-l-4 border-l-orange-500">
          <AlertCircle className="w-8 h-8 text-orange-500 mb-2 opacity-80" />
          <div className="text-2xl font-bold">{stats.upcomingDeadlines}</div>
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Future Deadlines</div>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <section className="glass-card p-6 min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              Today's Schedule
            </h2>
            <Link href="/calendar" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">View All &rarr;</Link>
          </div>

          {todaysEvents.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-muted rounded-xl bg-muted/20">
              <Clock className="w-12 h-12 text-muted-foreground/30 mb-3" />
              <p className="text-muted-foreground font-medium">No events scheduled for today.</p>
              <p className="text-sm text-muted-foreground/80 mt-1">Time to focus on deep work!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {todaysEvents.map(event => (
                <div key={event.id} className="group relative flex gap-4 p-4 rounded-xl bg-card border border-border hover:shadow-lg transition-all duration-200 hover:border-primary/50">
                  <div className="flex flex-col items-center justify-center w-16 px-2 py-1 bg-muted rounded-lg text-center group-hover:bg-primary/5 transition-colors">
                    <span className="text-sm font-bold text-foreground group-hover:text-primary">{format(event.start, 'HH:mm')}</span>
                    <span className="text-xs text-muted-foreground">{format(event.end, 'HH:mm')}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg leading-tight">{event.title}</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className={`px-2 py-0.5 rounded-md text-xs font-medium uppercase tracking-wider
                         ${event.category === 'research' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                          event.category === 'meeting' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' :
                            'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                        }
                       `}>{event.category}</span>
                    </div>
                  </div>
                  <div className="absolute right-4 top-4 w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Recent Journal Entries */}
        <section className="glass-card p-6 min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <BookOpen className="w-6 h-6 text-secondary" />
              </div>
              Recent Journal
            </h2>
            <Link href="/journal" className="text-sm font-medium text-secondary hover:text-secondary/80 transition-colors">View All &rarr;</Link>
          </div>

          {recentEntries.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-muted rounded-xl bg-muted/20">
              <BookOpen className="w-12 h-12 text-muted-foreground/30 mb-3" />
              <p className="text-muted-foreground font-medium">No journal entries yet.</p>
              <Link href="/journal/new" className="mt-4 text-sm text-secondary font-semibold hover:underline">Start documenting &rarr;</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentEntries.map(entry => (
                <Link href={`/journal/${entry.id}`} key={entry.id} className="block group">
                  <div className="p-5 rounded-xl border border-border bg-card hover:bg-muted/30 hover:shadow-lg transition-all duration-200">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg group-hover:text-secondary transition-colors">{entry.title}</h3>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">{format(entry.createdAt, 'MMM d')}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {entry.tags.split(',').filter(Boolean).map((tag, i) => (
                        <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-secondary/10 text-secondary font-medium border border-secondary/20">#{tag.trim()}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
