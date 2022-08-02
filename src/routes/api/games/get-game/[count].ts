import type { IExercise } from "$lib/models/exercise";
import words from '/src/assets/data/words4.json';

export async function get({ params, request }) {

    const idTable: any = await findTable();

    const exerciseIds: number[] = [];

    for (let i = 0; i < params.count; i++) {
        const randomNumber = (min: number, max: number): number => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        const index = randomNumber(0, idTable?.length);
        exerciseIds.push(idTable[index]?.id);
    }

    const exercises = words.filter((word: IExercise) => exerciseIds.includes(word.id));

    if (exercises?.length) {
        return {
            body: { exercises }
        };
    }

    return {
        status: 404
    };
}

async function findTable() {
    const res = await fetch('http://localhost:3000/api/id-table/public')
    const { idTable } = await res.json();

    return idTable;
}