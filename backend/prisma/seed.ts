import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.event.createMany({
        data: [
            {
                id: "1",
                name: "Tech Conference 2025",
                startDate: new Date("2025-05-10T09:00:00.000Z"),
                endDate: new Date("2025-05-12T17:00:00.000Z"),
                location: "Kuala Lumpur Convention Centre",
                status: "Upcoming",
                thumbnail: "/uploads/tech-conference.jpg",
            },
            {
                id: "2",
                name: "Music Festival 2025",
                startDate: new Date("2025-06-15T12:00:00.000Z"),
                endDate: new Date("2025-06-17T23:59:00.000Z"),
                location: "Sunway Lagoon",
                status: "Upcoming",
                thumbnail: "/uploads/music-festival.jpg",
            },
            {
                id: "3",
                name: "Startup Pitch Night",
                startDate: new Date("2025-04-20T18:00:00.000Z"),
                endDate: new Date("2025-04-20T22:00:00.000Z"),
                location: "WeWork, Bangsar",
                status: "Completed",
                thumbnail: "/uploads/startup-pitch.jpg",
            },
            {
                id: "4",
                name: "AI & Machine Learning Workshop",
                startDate: new Date("2025-07-01T10:00:00.000Z"),
                endDate: new Date("2025-07-02T16:00:00.000Z"),
                location: "Cyberjaya Innovation Hub",
                status: "Upcoming",
                thumbnail: "/uploads/ai-workshop.jpg",
            },
            {
                id: "5",
                name: "E-Sports Tournament",
                startDate: new Date("2025-08-10T09:00:00.000Z"),
                endDate: new Date("2025-08-15T23:00:00.000Z"),
                location: "Axiata Arena",
                status: "Ongoing",
                thumbnail: "/uploads/esports-tournament.jpg",
            },
        ],
    });

    console.log("✅ Events seeded successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
