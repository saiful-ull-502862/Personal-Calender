import CalendarWrapper from "@/components/CalendarWrapper";
import { getEvents } from "@/app/actions";

// Prevent caching to ensure fresh data
export const dynamic = 'force-dynamic';

export default async function CalendarPage() {
    // Fetch a wide range of events for now
    const events = await getEvents(new Date('2024-01-01'), new Date('2030-12-31'));

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">Calendar</h1>
                    <p className="text-muted-foreground">Plan your experiments and meetings.</p>
                </div>
            </header>
            <CalendarWrapper events={events} />
        </div>
    );
}
