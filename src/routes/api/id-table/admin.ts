import clientPromise from "$lib/db";
import { idTable } from './../../../lib/stores/id-table.store';

export async function get() {
    try {
        const dbClient = await clientPromise;
        const db = dbClient.db('vocabulary');
        const idTableCollection = db.collection('id-table');
        const exerciseCollection = db.collection('exercise');

        const allExercises = await exerciseCollection.find().toArray();
        const body = JSON.stringify(allExercises);

        const res = await fetch('http://localhost:3000/api/probability', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            cache: 'no-store',
            body
        })
        const idTable = (await res.json()).idTable;

        idTableCollection.findOneAndReplace({name: 'id-table'}, { name: 'id-table', table: idTable });

        return {
            status: 200,
        }

    } catch (e) {
        console.error(e);
        return {
            status: 400
        }
    }
}