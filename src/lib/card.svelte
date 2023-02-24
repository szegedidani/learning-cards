<script lang="ts">
    import type { IExercise } from "./models/exercise";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let exercises: IExercise[];
    export let selectedIndex: number;

    let exercise: IExercise;
    $: {
        exercise = exercises[selectedIndex - 1];
    }

    const nextQuestion = () => {
        input = ''
        isCorrect = false;
        anwsered = false;

        dispatch('nextAnwser');
    };

    const updateExercise = () => {
        if (!confirm('Are you sure?')) return;
        const body = JSON.stringify({...exercise, answer: [...exercise.answer, input]});
        fetch(`http://localhost:3000/api/exercise/public/update-anwser/${exercise.id}.ts`, {
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

    function submitAnwser() {
        isCorrect = exercise.answer.map((anwser: string) => anwser.trim().toLowerCase()).includes(input.trim().toLowerCase());
        anwsered = true;
        dispatch('anwser', {
            isCorrect
        })
    }

    let input = '';
</script>

<div class="card">
    <!-- <button class="card-button" type="button" on:click={updateAll}>Update all</button> -->

    {#if !anwsered}
        <div class="card-side question-side">
            <span>{selectedIndex}.</span>
            <p class="question">{ exercise.question }</p>
            <input class="text-input" type="text" bind:value={ input }>
            <button class="card-button" type="button" on:click={submitAnwser}>Submit</button>
        </div>
        {:else}
        <div class="card-side anwser-side" class:correct={isCorrect}>
            <span>{selectedIndex}.</span>
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