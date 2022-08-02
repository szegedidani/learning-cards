import clientPromise from "$lib/db";
import { string_to_slug } from "$lib/slugify";

export async function post({ params, request }) {

    console.log('run');
    try {
        const dbClient = await clientPromise;
        const db = dbClient.db('vocabulary');
        const collection = db.collection('game-types');

        console.log(request);

        let body = await request.json();

        body = { ...body, slug: string_to_slug(body.name) }

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
