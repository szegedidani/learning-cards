import { writable, type Writable } from 'svelte/store';

export const words: Writable<{ id: number }[]> = writable([]);
