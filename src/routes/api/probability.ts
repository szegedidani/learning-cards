import type { IExercise } from '$lib/models/exercise';

let seenCount = 0;
let words: any;

export async function post({ params, request }) {
    
    try {
        const body = await request.json();
        words = body;
    
        seenCount = 0;
        const wordsData: {id: number; score: number}[] = [];
        const idTable = [];
    
        words.forEach((word: IExercise) => {
            seenCount += word.tracker.seen;
        });
    
        words.forEach((exercise: IExercise) => {
            const score = 100 + seenScore(exercise.tracker.seen) + correctScore(exercise.tracker.correct, exercise.tracker.incorrect) + timeScore(exercise.tracker.lastSeen);
            wordsData.push({
                id: exercise.id,
                score : score < 10 ? 1 : score / 10
            });
        });
    
    
        for (let wordIndex = 0; wordIndex < wordsData.length; wordIndex++) {
            for (let i = 0; i < wordsData[wordIndex].score; i++) {
                idTable.push({
                    id: wordsData[wordIndex]?.id,
                })
            }
        }
    

        return {
            status: 200,
            body: { idTable }
        };
    } catch (error) {
        return {
            status: 500,
            error: error
        }
    }

}

function seenScore(seen: number): number {
    const avg = 1 / words.length;
    const score = Math.round((avg - (seen / seenCount !== 0 ? seenCount : 1)) * 10) * 10;
    return score;
}

function correctScore(correct: number, incorrect: number) {
    if ((correct + incorrect === 0)) return 0;
    return Math.round(((incorrect - correct) / (correct + incorrect)) * 10) * 10;
}

function timeScore(lastSeen: string) {
    if ((Math.round((+new Date() - +new Date(lastSeen)) / (1000 * 60 * 60 * 24)) - 1) > 20) {
        return 100;
    } else {
        return (Math.round((+new Date() - +new Date(lastSeen)) / (1000 * 60 * 60 * 24)) - 1) * 10;
    }
    
}