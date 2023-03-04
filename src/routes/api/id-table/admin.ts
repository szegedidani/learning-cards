import clientPromise from "$lib/db";

export async function get() {
    try {
        const dbClient = await clientPromise;
        const db = dbClient.db('vocabulary');
        const idTableCollection = db.collection('id-table');
        const exerciseCollection = db.collection('exercise');

        const allExercises = await exerciseCollection.find().toArray();
        const body = JSON.stringify(allExercises);

        const res = await (await fetch('http://localhost:3000/api/probability', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            cache: 'no-store',
            body
        })).json();

        if (res.status === 500) throw new Error("Probability script failed!");

        const idTable = res.idTable;

        const count = await idTableCollection.countDocuments({});

        let newTable;
        if (count === 0) {
            newTable = await idTableCollection.insertOne({ name: 'id-table', table: idTable });
        } else {
            newTable = await idTableCollection.findOneAndReplace({name: 'id-table'}, { name: 'id-table', table: idTable });
        }

        if (!newTable) throw new Error("Id table update failed");

        return {
            status: 200,
        }

    } catch (e) {
        console.error(e);
        return {
            status: 400,
            error: e
        }
    }
}