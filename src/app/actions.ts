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
