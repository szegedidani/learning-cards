<script lang="ts">
import type { IExercise } from "$lib/models/exercise";

import { anwsers } from "$lib/stores/game.store";
import { get } from "svelte/store";

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

    
    const results = [...get(anwsers)];
    console.log(results);
    
    results.forEach((anwser) => {
        if (anwser) {
            updateTrackers(anwser)
        }
    });

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

    anwsers.set([]);

</script>

<h1>Result</h1>
{#if results?.length > 0}
    <div class="results">
        <p>Eredmény: {getPercent()}%</p>
        <p>Elért pontszám: {getPoints()}</p>
        <p>Max pontszám: {results.length}</p>
    </div>
{/if}