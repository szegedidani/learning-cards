<script>
    import Sidebar from "$lib/components/sidebar.svelte";

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