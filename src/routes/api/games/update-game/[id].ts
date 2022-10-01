import clientPromise from "$lib/db";
import type { IGame } from "$lib/models/game.model";
import { ObjectId } from "mongodb";

export async function put({ params, request }: any) {

    try {
        const dbClient = await clientPromise;
        const db = dbClient.db('vocabulary');
        const collection = db.collection('game');

        const updatedGame = await request.json();

        const { gameWithoutId } = ((): { _id: ObjectId, gameWithoutId: IGame } => {
            const { _id, ...gameWithoutId } = updatedGame;
            return { _id, gameWithoutId }
        })();
    
        await collection.findOneAndReplace({ _id: new ObjectId(params.id) }, gameWithoutId);
        
        return {
            body: { gameWithoutId },
        };

    } catch (error) {
        // throw new Error('error');
        return {
            status: 400
        }
    }
}