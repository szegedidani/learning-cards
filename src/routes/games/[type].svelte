<script context="module">
    export async function load({ params, fetch }) {

        console.log(params.type);
        const res = await fetch(`http://localhost:3000/api/game-types/public/get-one/${params.type}`);
        const { gameType } = await res.json();
        return {
            props: {
                gameType
            }
        }
    }
</script>

<script>
    // @ts-nocheck
    import Card from "$lib/card.svelte";
    
    export let gameType;

    let exercises;
    (async () => {
        const res = await fetch(`http://localhost:3000/api/games/get-game/${gameType.options.count}`);
        let data = await res.json();
        exercises = data?.exercises;
        console.log(exercises);
    })();

</script>

<div class="container">
    <h1>Card</h1>
    {#if exercises}
        <Card {exercises}/>  
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