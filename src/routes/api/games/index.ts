import type { IExercise } from '$lib/models/exercise';
import { findTable } from '$lib/stores/id-table.store';
import words from '/src/assets/data/words4.json';

export async function get() {

    const idTable = findTable();
    const randomNumber = (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const index = randomNumber(0, idTable?.length);
    const selectedId = idTable[index]?.id;

    const exercise = words.filter((word: IExercise) => word.id === selectedId);

    if (exercise) {
        return {
            body: { exercise }
        };
    }

    return {
        status: 404
    };
}