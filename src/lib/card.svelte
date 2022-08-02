<script lang="ts">
    import { selectedExercise, words } from "$lib/stores/game.store";
    import { get } from "svelte/store";
    import type { IExercise } from "./models/exercise";
    import { goto } from '$app/navigation'

    export let exercises: IExercise[];
    let exercise = exercises[get(selectedExercise).index];
    console.log(exercise);
    
    words.update(() => {
        return [...get(words), exercise];
    }) 
    console.log(get(words));

    const nextQuestion = () => {
        const nextIndex = get(selectedExercise).index + 1;
        if (nextIndex < exercises.length ) {
            selectedExercise.set({ index: nextIndex });
            exercise = exercises[get(selectedExercise).index];
            isCorrect = false;
            anwsered = false;
        } else {
            goto('.');
        }
    };

    const updateTrackers = () => {
        const body = JSON.stringify({correct: isCorrect});
        fetch(`http://localhost:3000/api/games/trackers/${exercise.id}.ts`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            cache: 'no-store',
            body,
        })
    };

    const updateExercise = () => {
        if (!confirm('Are you sure?')) return;
        const body = JSON.stringify({...exercise, answer: [...exercise.answer, input]});
        fetch(`http://localhost:3000/api/games/${exercise.id}.ts`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body, 
        });
    };

    let anwsered = false;
    let isCorrect = false;

    // const updateAll = () => {
    //         fetch('scripts/update-all');
    // }

    function submitAnwser() {
        console.log(exercise);
        isCorrect = exercise.answer.map((anwser: string) => anwser.trim().toLowerCase()).includes(input.trim().toLowerCase());
        anwsered = true;
        // updateTrackers();
    }

    let input = '';
</script>

<div class="card">
    <!-- <button class="card-button" type="button" on:click={updateAll}>Update all</button> -->

    {#if !anwsered}
        <div class="card-side question-side">
            <span>{get(selectedExercise).index + 1}.</span>
            <p class="question">{ exercise.question }</p>
            <input class="text-input" type="text" bind:value={ input }>
            <button class="card-button" type="button" on:click={submitAnwser}>Submit</button>
        </div>
        {:else}
        <div class="card-side anwser-side" class:correct={isCorrect}>
            <span>{get(selectedExercise).index + 1}.</span>
            <p>User input: { input }</p>
            <p>Correct anwser: { exercise.answer.join(',') }</p>
            {#if !isCorrect}
            <button class="card-button" type="button" on:click={updateExercise}>My anwser is right</button>
            {/if}
            <button class="card-button" type="button" on:click={nextQuestion}>Next</button>
        </div>
    {/if}
</div>

<style>
    .question {
        margin-bottom: 2rem;
    }
    .card {
        width: 20rem;
        height: 25rem;
        position: absolute;
        top: 50%; right: 50%;
        transform: translate(50%,-50%);
        font-size: 1.6rem;
        font-weight: bold;
    }

    .text-input {
        font-size: 1.2rem;
        margin-bottom: 2rem;
        border-radius: 0.4rem;
    }

    .card-button {
        background-color: #0056c7;
        border: 0.15rem solid #0056c7;
        color: white;
        font-size: 1.2rem;
        border-radius: 0.4rem;
        cursor: pointer;
        transition: 0.2s;
    }

    .card-button:hover {
        background-color: transparent;
        color: #0056c7;
    }
    
    .card-side {
        padding: 2rem;
        font-weight: bold;
        width: 100%;
        height: 100%;
        border-radius: 1rem;
        box-sizing: border-box;
        border: 0.1rem solid black;
        border-radius: 1rem;
        box-shadow: 3px 3px 15px 3px #000000;
    }

    .card-side.question-side {
        background-color: rgb(255, 201, 102);
    }
    .card-side.anwser-side {
        background-color: #ff8888;
    }
    .card-side.anwser-side.correct {
        background-color: #7dff7d;
    }
</style>