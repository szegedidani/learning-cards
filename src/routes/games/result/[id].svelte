<script lang="ts" context="module">
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
	import type { IGame } from "$lib/models/game.model";
    
    export let game: IGame;
    // export let id: string;

    let results: { id: number; correct: boolean }[] = [];

    $: {
        results = game.anwsers.map((anwser, index) => {
            return {
                id: game.exercises[index].id,
                correct: anwser
            }
        })
    }

    // const results = [...get(anwsers)];
    
    results.forEach((anwser: any) => {
        if (anwser) {
            updateTrackers(anwser)
        }
    });

    const updateTrackers = (anwser: { id: number; correct: boolean }) => {
        const body = JSON.stringify({correct: anwser.correct});
        fetch(`http://localhost:3000/api/exercises/public/update-trackers/${anwser.id}.ts`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            cache: 'no-store',
            body,
        })
    }

    function getPoints () {
        let accumulated = 0;
        results.forEach((exercise: { id: number, correct: boolean }) => {
            if (exercise.correct) accumulated++;
        })
        return accumulated;
    }

    function getPercent () {
        return (getPoints() / results.length) * 100;
    }

</script>

<h1>Result</h1>
{#if results?.length > 0}
    <div class="results">
        <p>Eredmény: {getPercent()}%</p>
        <p>Elért pontszám: {getPoints()}</p>
        <p>Max pontszám: {results.length}</p>
    </div>
{/if}