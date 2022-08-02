import clientPromise from "$lib/db";

export async function get() {
    try {
        const dbClient = await clientPromise;
        const db = dbClient.db('vocabulary');
        const collection = db.collection('id-table');

        const idTable = await collection.find().toArray();


        return {
            status: 200,
            body: {
                idTable: idTable[0].table
            }
        }

    } catch (e) {
        console.error(e);
        return {
            status: 400
        }
    }
}