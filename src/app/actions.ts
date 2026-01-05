"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getEvents(start: Date, end: Date) {
    return await prisma.event.findMany({
        where: {
            start: {
                gte: start,
            },
            end: {
                lte: end,
            },
        },
        orderBy: {
            start: 'asc'
        }
    });
}

export async function createEvent(data: {
    title: string;
    description?: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    category: string;
}) {
    const event = await prisma.event.create({
        data
    });
    revalidatePath('/calendar');
    revalidatePath('/');
    return event;
}

export async function getRecentJournalEntries(limit = 5) {
    return await prisma.journalEntry.findMany({
        take: limit,
        orderBy: {
            createdAt: 'desc'
        }
    });
}

export async function getAllJournalEntries() {
    return await prisma.journalEntry.findMany({
        orderBy: { createdAt: 'desc' }
    });
}

export async function getJournalEntry(id: string) {
    return await prisma.journalEntry.findUnique({
        where: { id }
    });
}

export async function createJournalEntry(data: {
    title: string;
    content: string;
    tags: string;
}) {
    const entry = await prisma.journalEntry.create({
        data
    });
    revalidatePath('/journal');
    revalidatePath('/');
    return entry;
}

export async function updateJournalEntry(id: string, data: { title?: string; content?: string; tags?: string }) {
    const entry = await prisma.journalEntry.update({
        where: { id },
        data
    });
    revalidatePath(`/journal/${id}`);
    revalidatePath('/journal');
    revalidatePath('/');
    return entry;
}

// Papers

export async function getAllPapers() {
    return await prisma.paper.findMany({
        orderBy: { createdAt: 'desc' }
    });
}

export async function getPaper(id: string) {
    return await prisma.paper.findUnique({
        where: { id }
    });
}

export async function createPaper(data: {
    title: string;
    authors?: string;
    year?: number;
    status: string;
    link?: string;
}) {
    const paper = await prisma.paper.create({
        data
    });
    revalidatePath('/papers');
    revalidatePath('/');
    return paper;
}

export async function updatePaper(id: string, data: {
    title?: string;
    authors?: string;
    year?: number;
    status?: string;
    link?: string;
    summary?: string;
}) {
    const paper = await prisma.paper.update({
        where: { id },
        data
    });
    revalidatePath(`/papers/${id}`);
    revalidatePath('/papers');
    revalidatePath('/');
    return paper;
}

// Dashboard Stats

export async function getDashboardStats() {
    const papersRead = await prisma.paper.count({ where: { status: 'Read' } });
    const experiments = await prisma.event.count({ where: { category: 'experiment' } }) +
        await prisma.journalEntry.count({ where: { tags: { contains: 'experiment' } } });

    // Simple goal tracking: just counts for now, could be more complex later
    const goalsTotal = 10; // Placeholder
    const goalsCompleted = papersRead; // Just a proxy for now

    const upcomingDeadlines = await prisma.event.count({
        where: {
            category: 'deadline',
            start: {
                gte: new Date()
            }
        }
    });

    return {
        papersRead,
        experiments,
        goalsProgress: Math.min(Math.round((goalsCompleted / goalsTotal) * 100), 100),
        upcomingDeadlines
    };
}
