
<script lang="ts">

    const addWord = async () => {
        const body = JSON.stringify({
            question,
            answer: [answer],
        });

        const res = await fetch(`http://localhost:3000/api/exercises/admin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body, 
        });

        res.json().finally(() => {
            question = '';
            answer = '';
        })
    }

    const getAll = async () => {
        const res = await fetch(`http://localhost:3000/api/exercises/public/get-all`)

        const data = await res.json();
        allExercises = data.exercises;
    }

    let allExercises: any;
    let question: string;
    let answer: string;
</script>

<h1>Admin</h1>
<div class="inputs">
    <button on:click={addWord}>Add new word</button>
    
    <div>
        <label for="question">Question:</label>
        <input type="text" id="question" bind:value={question} >
    </div>

    <div>
        <label for="answer">Answer:</label>
        <input type="text" id="answer" bind:value={answer} >
    </div>
</div>

<button class="text-center" on:click={getAll}>Get all exercises</button>

{#if allExercises}
    <div class="exercises">
        {#each allExercises as exercise}
            <div class="exercise">
                <span>Id: { exercise?.id }</span>
                <span>Question: { exercise?.question }</span>
                <span>Answer: {#each exercise?.answer as answer}{ answer }{/each}</span>
            </div>
        {/each}
    </div>
{/if}

<style>
    .inputs {
        border:  1px solid black;
        padding: 3rem;
        width: 600px;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
    }

    .inputs div {
        width: 100%;
        margin: 1rem;
    }

    .text-center {
        text-align: center;
    }

    .exercises {
        width: 960px;
        display: flex;
        flex-wrap: wrap;
        margin: 0 auto;
    }
    
    .exercise {
        width: 50%;
        margin: 0 auto;
        border: 0.1rem solid black;
        border-radius: 1.5rem;
        display: flex;
        flex-wrap: wrap;
    }
    .exercise span {
        width: 100%;
        text-align: center;
    }
</style>