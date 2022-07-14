import clientPromise from "$lib/db";

export async function post({ params, request }) {

    try {
        const dbClient = await clientPromise;
        const db = dbClient.db('vocabulary');
        const collection = db.collection('exercise');

        const body = await request.json();

        const action = await collection.insertOne(body);

        return {
            status: 200,
            body: {
                action
            }
        }

    } catch (e) {
        console.error(e);
        return {
            status: 400
        }
    }
}