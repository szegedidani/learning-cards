import clientPromise from "$lib/db";

export async function post({ request }: any) {
    try {
        const dbClient = await clientPromise;
        const db = dbClient.db('vocabulary');
        const collection = db.collection('exercise');

        const body = await request.json();
        const id = await getHighestId() + 1;
        const newExercise = {...body, id, tracker: { seen: 0, correct: 0, incorrect: 0, lastSeen: new Date() }};

        const action = await collection.insertOne(newExercise);

        if (await updateIdTable() === false) throw new Error("Failed to update id table");

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

async function updateIdTable() {
    const res = await fetch('http://localhost:3000/api/id-table/admin');

    if (res.status === 200) return true;
    return false;
}

async function getHighestId() {
    const dbClient = await clientPromise;
    const db = dbClient.db('vocabulary');
    const collection = db.collection('exercise');

    const res = await collection.find().sort({id: -1}).limit(1).toArray();

    if (res?.length) {
        return res[0].id
    } else {
        return 0
    }
}