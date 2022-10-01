import type { IExercise } from "./exercise";
import type { ObjectId } from 'mongodb';

export interface IGame {
    _id?:ObjectId,
    createdAt: string;
    selectedExercise: number;
    exercises: IExercise[];
    anwsers: boolean[];
}