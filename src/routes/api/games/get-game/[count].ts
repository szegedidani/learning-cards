import clientPromise from "$lib/db";

export async function get({ params }: { params: any }) {

    try {
        
        const idTable: any = await findTable();
        
        const exerciseIds: number[] = [];
        
        for (let i = 0; i < params.count; i++) {
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
    
        if (exercises?.length) {
            return {
                body: { exercises }
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

async function findTable() {
    const res = await fetch('http://localhost:3000/api/id-table/public')
    const { idTable } = await res.json();

    return idTable;
}