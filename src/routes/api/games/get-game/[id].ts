import clientPromise from "$lib/db";
import { ObjectId } from "mongodb";

export async function get({ params }: { params: any }) {

    try {
        
        const dbClient = await clientPromise;
        const db = dbClient.db('vocabulary');
        const collection = db.collection('game');
        
        const game = await collection.find({ _id: new ObjectId(params.id) }).toArray();
    
        if (game) {
            return {
                body: game[0]
            };
        }
        return {
            status: 404
        };
        
    } catch (error) {
        return {
            status: 404
        };
    }

}