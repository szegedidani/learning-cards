import clientPromise from '$lib/db';
import type { IExercise } from '$lib/models/exercise';

export async function put({ params, request }: any) {
    
    try {
        const data = await request.json();
    
        const dbClient = await clientPromise;
        const db = dbClient.db('vocabulary');
        const collection = db.collection('exercise');
        const exercise = (await collection.find({ id: parseInt(params.id) }).toArray())[0];

        const updatedExercise: Partial<IExercise> = {
            ...exercise,
            tracker: {
                ...exercise.trackers,
                seen: exercise.tracker.seen++,
                correct: data.correct ? exercise.tracker.correct++ : exercise.tracker.incorrect++,
                lastSeen: exercise.tracker.lastSeen = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
            }
        };
    
        await collection.findOneAndReplace({ id: params.id }, updatedExercise);
    
        return {
            body: { updatedExercise },
        };
        
    } catch (error) {
        return {
            status: 404,
        };
    }
}