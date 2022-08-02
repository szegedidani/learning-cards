import clientPromise from "$lib/db";

export async function get() {
    try {
        const dbClient = await clientPromise;
        const db = dbClient.db('vocabulary');
        const collection = db.collection('game-types');

        const allData = await collection.find().toArray();

        return {
            status: 200,
            body: {
                gameTypes: allData
            }
        }

    } catch (e) {
        console.error(e);
        return {
            status: 400
        }
    }
}