<div class="container">
    <h1>Games</h1>
    <div class="games">
        <div class="game-card">
            <p>Short game</p>
            <div class="buttons">
                <a href="/games/short-game">Start game</a>
                <a href="/games/configure">Configure</a>
            </div>
        </div>
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
