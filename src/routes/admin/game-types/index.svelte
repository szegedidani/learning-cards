<script lang="ts">
import type { IGamesType } from "$lib/models/game-type.model";


    const addGameType = async () => {
    const body = JSON.stringify({
        name,
        options,
    });

    const res = await fetch(`http://localhost:3000/api/game-types/admin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body, 
    });

    getAll();

    res.json().finally(() => {
        name = '';
        options.count = 0;
    })
}

    const getAll = async () => {
        const res = await fetch(`http://localhost:3000/api/game-types/public`)

        const data = await res.json();
        allGameTypes = data.gameTypes;
    }

    let allGameTypes: IGamesType[];
    let name: string;
    let options: { count: number } = { count: 0 };

    getAll();
</script>

<section class="container">
    <h1>Game types</h1>
    
    <div class="game-types">
        {#if allGameTypes?.length}
        {#each allGameTypes as gameType}
            <div class="game-type">
                <p>Name: { gameType.name }</p>
                <p>Count: { gameType.options.count }</p>
            </div>
        {/each}
        {/if}
    </div>

    <div class="inputs">
        <button on:click={addGameType}>Add new word</button>
        
        <div>
            <label for="name">Name:</label>
            <input type="text" id="name" bind:value={name} >
        </div>
    
        <div>
            <label for="count">Count:</label>
            <input type="number" id="count" bind:value={options.count} >
        </div>
    </div>

</section>


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
</style>