import words from '/src/assets/data/words3.json';
import { writeFile } from 'fs/promises';

export async function get() {

    const updatedWords = words.map((exercise, index: number) => (
        {
            id: index + 1,
            ...exercise,
        tracker: {
            "seen": 0,
            "correct": 0,
            "incorrect": 0,
            "lastSeen": "2022-05-21"
        }
        }
    ))

    writeFile('src/assets/data/words4.json', JSON.stringify(updatedWords))

    return {
        body: { success: true }
    };
}