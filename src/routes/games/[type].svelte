

<script>
    // @ts-nocheck
    import Card from "$lib/card.svelte";
    import { idTable } from "$lib/stores/id-table.store";
    
    let exercise;
    (async () => {
        const response = await fetch('http://localhost:3000/api/probability');
        const body = await response.json();

        idTable.set(body.idTable);

        const res = await fetch('http://localhost:3000/api/games');
        let data = await res.json();
        exercise = data.exercise[0];
    })();

</script>

<div class="container">
    <h1>Card</h1>
    {#if exercise}
        <Card {exercise}/>  
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