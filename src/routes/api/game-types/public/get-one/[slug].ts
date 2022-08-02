import clientPromise from "$lib/db";

export async function get({ request, params }) {
    try {
        const dbClient = await clientPromise;
        const db = dbClient.db('vocabulary');
        const collection = db.collection('game-types');

        const gameType = await collection.find({ slug: params.slug}).toArray();

        return {
            status: 200,
            body: {
                gameType: gameType[0]
            }
        }

    } catch (e) {
        console.error(e);
        return {
            status: 400
        }
    }
}