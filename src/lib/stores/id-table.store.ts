import { writable, type Writable, get } from 'svelte/store';

export const idTable: Writable<{ id: number }[]> = writable([]);

export const findTable = () => {
    return get(idTable);
}