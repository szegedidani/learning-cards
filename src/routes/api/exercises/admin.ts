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

        updateIdTable()

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

function updateIdTable() {
    fetch('http://localhost:3000/api/id-table/admin');
}

async function getHighestId() {
    const dbClient = await clientPromise;
    const db = dbClient.db('vocabulary');
    const collection = db.collection('exercise');

    const res = await collection.find().sort({id: -1}).limit(1).toArray();

    if (res) {
        return res[0].id
    }
}