export interface IExercise {
    id: number;
    question: string;
    extra: string;
    anwser: string[]
    tracker: {
        seen: number;
        correct: number;
        incorrect: number;
        lastSeen: string;
    }
}