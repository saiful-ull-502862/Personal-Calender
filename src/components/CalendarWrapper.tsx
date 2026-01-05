"use client";

import { Calendar, dateFnsLocalizer, Views, View } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createEvent } from '@/app/actions';

const locales = {
    'en-US': enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

interface Event {
    id: string;
    title: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    category: string;
}

export default function CalendarWrapper({ events }: { events: Event[] }) {
    const router = useRouter();
    const [view, setView] = useState<View>(Views.WEEK);
    const [date, setDate] = useState(new Date());

    const eventPropGetter = (event: Event) => {
        let bgClass = 'bg-slate-500';
        if (event.category === 'research') bgClass = 'bg-blue-600';
        if (event.category === 'meeting') bgClass = 'bg-purple-600';
        if (event.category === 'deadline') bgClass = 'bg-red-600'; // actually dangerous color, maybe orange
        if (event.category === 'class') bgClass = 'bg-green-600';

        return {
            className: `${bgClass} text-white border-0 rounded px-2 opacity-90 hover:opacity-100 transition-opacity`
        };
    };

    const handleSelectSlot = async ({ start, end }: { start: Date; end: Date }) => {
        const title = window.prompt('Enter event title:');
        if (title) {
            // Simple prompt for MVP
            await createEvent({
                title,
                start,
                end,
                category: 'research' // Default
            });
            router.refresh();
        }
    };

    return (
        <div className="h-[600px] md:h-[calc(100vh-150px)] glass-card p-6 text-foreground">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%' }}
                view={view}
                onView={setView}
                date={date}
                onNavigate={setDate}
                eventPropGetter={eventPropGetter}
                selectable
                onSelectSlot={handleSelectSlot}
                className="font-sans"
            />
        </div>
    );
}
