<script context="module" lang="ts">
    export async function load({ fetch }: {fetch: any}) {
        const res = await fetch('http://localhost:3000/api/admin/words');
        
        let isConnected = true;
        if (res.status === 400) isConnected = false;

        return {
            props: {
                isConnected
            }
        }
    }
</script>

<script>
    import Sidebar from "$lib/components/sidebar.svelte";

    export let isConnected;
</script>
<div class="container">
    <h1 class="title">Card Game</h1>
    <Sidebar/>
</div>
<style>
    :global(html) {
        margin: 0;
        font-family: 'Roboto', sans-serif;
    }
    :global(body) {
        margin: 0;
    }

    .container {
        background-color: aquamarine;
        height: 100%;
        min-height: 100vh;
    }
    .title {
        margin: 0;
        text-align: center;
    }

</style>