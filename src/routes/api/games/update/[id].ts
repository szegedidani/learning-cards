import clientPromise from '$lib/db';

export async function put({ params, request }: any) {

    try {
        const data = await request.json();
    
        const dbClient = await clientPromise;
        const db = dbClient.db('vocabulary');
        const collection = db.collection('exercise');

        delete data._id;

        await collection.updateOne({ id: parseInt(params.id) }, { $set: data });
    
        return {
            body: { data },
        };
        
    } catch (error) {
        console.error(error);
        return {
            status: 404,
        };
    }

}