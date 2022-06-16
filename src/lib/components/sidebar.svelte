<div class="sidebar-container">
    <div class="profile"></div>
    <div class="menu">
        <ul class="menu">
            <li>
                <a class="menu-link" href="/games">New Game</a>
            </li>
            <li>
                <a class="menu-link" href="/statistics">Statistics</a>
            </li>
        </ul>
    </div>
    <div class="recents"></div>
</div>

<style lang="scss">
    .sidebar-container {
        position: fixed;
        top: 0;
        left: 0;
        background-color: white;
        width: 15%;
        height: calc(100vh - 2rem);
        padding: 3rem;
        box-sizing: border-box;
        margin: 1rem;
        border: 0.1rem solid black;
        border-radius: 1.5rem;
    }
    .menu {
        list-style-type: none;
        padding: 0;
    }

    li {
        margin: 1.5rem;
    }

    .menu-link {
        padding: 0.5rem 1rem;
        border: 1px solid black;
        border-radius: 0.5rem;
        color: black;
        text-decoration: none;
        &:hover {
            background-color: black;
            color: white;
        }

    }

</style>