<script context="module" lang="ts">
    export async function load({ params, fetch }: { params: any, fetch: any }) {

        const res = await fetch(`http://localhost:3000/api/games/get-game/${params.id}`);

        if (res.ok) {
            const game = await res.json();
            return {
                props: {
                    id: params.id,
                    game: game,
                }
            }
        }

        return {
            props: {
                id: null,
                game: null
            }
        }
    }
</script>

<script lang="ts">
    import { goto } from "$app/navigation";
    import Card from "$lib/card.svelte";
    import type { IExercise } from "$lib/models/exercise";
    import type { IGame } from "$lib/models/game.model";

    export let game: IGame;
    export let id: string; 
    let exercises: IExercise[] | null = null;
    let selectedIndex: number | null = null;

    $: {
        exercises = game.exercises;
        selectedIndex = game.selectedExercise;
    }

    const updateGame = (isCorrect: boolean) => {
        const anwsers = game.anwsers ? [...game.anwsers, isCorrect] : [ isCorrect ];
        const updatedGame: IGame = {
            ...game,
            selectedExercise: game.selectedExercise !== game.exercises.length ? (game.selectedExercise + 1) : 0,
            anwsers
        };
        fetch(`http://localhost:3000/api/games/update-game/${game._id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedGame), 
        })
    }

    const nextAnwser = async () => {
        await fetchGame();
        exercises = game.exercises;
        selectedIndex = game.selectedExercise;
    }
    
    const handleAnwser = (event: CustomEvent) => {
        updateGame(event.detail.isCorrect);
        if (game.selectedExercise === game.exercises.length ) goto(`http://localhost:3000/games/result/${game._id}`);
    }

    const fetchGame = async () => {
        const res = await fetch(`http://localhost:3000/api/games/get-game/${id}`);

        if (res.ok) {
            game = await res.json();
        }

    }

</script>

<div class="container">
    <h1>Card</h1>
    <p>{selectedIndex}</p>
    {#if exercises && selectedIndex}
        <Card {exercises} {selectedIndex} on:anwser={(event) => handleAnwser(event)} on:nextAnwser={nextAnwser}/>  
    {/if}
</div>

<style>

    :global(html) {
        margin: 0;
    }
    :global(body) {
        margin: 0;
    }

    .container {
        background: rgb(64,176,249);
        background: linear-gradient(121deg, rgba(64,176,249,1) 0%, rgba(181,158,233,1) 35%, rgba(0,56,69,1) 100%);
        width: 100%;
        height: 100%;
        position: absolute;
    }
</style>