<script context="module" lang="ts">
    export async function load({ params, fetch }: { params: any, fetch: any }) {

        const res = await fetch(`http://localhost:3000/api/game-types/public/get-one/${params.type}`);

        if (res.ok) {
            const { gameType } = await res.json();
            return {
                props: {
                    gameType
                }
            }
        }

        return {
            props: {
                gameType: null
            }
        }
    }
</script>

<script lang="ts">
import { goto } from "$app/navigation";

    import type { IGamesType } from "$lib/models/game-type.model";
    
    export let gameType: IGamesType | null;

    let gameId: Promise<number> = (async() => {
        if (gameType) {
            const res = await fetch(`http://localhost:3000/api/games/create-game/${gameType.options.count}`);
            let data = await res.json();
            let gameId = data?.gameId;
            return gameId;
        } else {
            goto('http://localhost:3000');
            throw new Error('Game type not found');
        }
    })();

</script>

<div class="container">
    {#await gameId}
        <p>Loading...</p>
    {:then gameId} 
        <a href="http://localhost:3000/games/{gameType?.slug}/{gameId}">Start game</a>
        
    {/await}
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