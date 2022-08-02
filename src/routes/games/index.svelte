<script lang="ts" context="module">
    export async function load({ fetch }) {
        
        const res = await fetch('http://localhost:3000/api/game-types/public/get-all');
        const { gameTypes } = await res.json();

        return {
            props: {
                gameTypes
            }
        }
    }
</script>

<script lang="ts">
    import type { IGamesType } from "$lib/models/game-type.model";

    export let gameTypes: IGamesType[];
</script>

<div class="container">
    <h1>Games</h1>
    <div class="games">
        {#each gameTypes as gameType}
            <div class="game-card">
                <p>{ gameType.name }</p>
                <p>Count: { gameType.options.count }</p>
                <div class="buttons">
                    <a href="/games/{gameType.slug}">Start game</a>
                    <a href="/games/configure">Configure</a>
                </div>
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
    h1 {
        text-align: center;
    }
    .games {
        width: 100%;
        display: flex;
        justify-content: space-evenly;
    }

    .game-card {
        height: 20rem;
        width: 15rem;
        border: 0.1rem solid black;
        border-radius: 1.5rem;
    }

    .buttons {
        margin: 0 1rem;
        display: flex;
        justify-content: space-between;
        a {
            padding: 0.5rem 0.8rem;
            border: 0.1rem solid black;
            border-radius: 0.4rem;
            color: black;
            text-decoration: none;
            &:hover {
                background-color: black;
                color: white;
            }
        }
    }

</style>
