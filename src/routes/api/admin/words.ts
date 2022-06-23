import clientPromise from "$lib/db";

export async function get(request: Request) {

    try {
        const dbClient = await clientPromise;
        const db = dbClient.db('vocabulary');
        const collection = db.collection('words');

        // const word = await collection.findOne({ id: 1 });

        return {
            status: 200,
            props: { isConnected: true },
        }

    } catch (e) {
        console.error(e);
        return {
            status: 400
        }
    }
}