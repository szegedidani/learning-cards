import clientPromise from "$lib/db";

export async function get({ params }: { params: any }) {
    try {
        const dbClient = await clientPromise;
        const db = dbClient.db('vocabulary');
        const collection = db.collection('game-types');

        if (params.slug === 'favicon.png') throw new Error('Cringe favicon error occured.');
        const gameType = await collection.find({ slug: params.slug}).toArray();


        return {
            status: 200,
            body: {
                gameType: gameType[0]
            }
        }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
        return {
            status: 500,
            message: e?.message
        }
    }
}