import clientPromise from "$lib/db";
import type { IExercise } from "$lib/models/exercise";
import type { ObjectId } from "mongodb";

export async function get({ params }: { params: any }) {

    try {
        const count = params.count;
        const exercises = await getExercises(count);

        const mappedExercises = exercises.map((exercise) => {
            const { exerciseWithoutId } = ((): {_id: ObjectId, exerciseWithoutId: Partial<IExercise>} => {
                const { _id, ...exerciseWithoutId } = exercise;
                return { _id, exerciseWithoutId }
            })();

            return exerciseWithoutId;
        });
        
        const newGame = {
            createdAt: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
            selectedExercise: 1,
            exercises: mappedExercises
        }

        const dbClient = await clientPromise;
        const db = dbClient.db('vocabulary');
        const collection = db.collection('game');


        const gameId = (await collection.insertOne(newGame)).insertedId.toString();
        return {
            body: {
                gameId
            }
        }
        
    } catch (error) {
        return {
            status: 404
        };
    }

}

async function findTable() {
    const res = await fetch('http://localhost:3000/api/id-table/public')
    const { idTable } = await res.json();

    return idTable;
}

async function getExercises(count: number) {

    const idTable: any = await findTable();
        
    const exerciseIds: number[] = [];
    
    for (let i = 0; i < count; i++) {
        const randomNumber = (min: number, max: number): number => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        const index = randomNumber(0, idTable?.length);
        exerciseIds.push(idTable[index]?.id);
    }

    const dbClient = await clientPromise;
    const db = dbClient.db('vocabulary');
    const collection = db.collection('exercise');
    const exercises = await collection.find({ id: { $in: exerciseIds } }).toArray();

    return exercises;
}