export interface IExercise {
    id: number;
    question: string;
    extra: string;
    answer: string[]
    tracker: {
        seen: number;
        correct: number;
        incorrect: number;
        lastSeen: string;
    }
}