import { writable, type Writable } from 'svelte/store';

export const words: Writable<{ id: number }[]> = writable([]);

export const selectedExercise: Writable<{ index: number }> = writable({ index: 0 });

export const anwsers: Writable<{ id: number, correct: boolean }[]> = writable([]);