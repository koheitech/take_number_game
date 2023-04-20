# README - Taking Number
This is a zero-sum two-person game with perfect information,
solved with alpha-beta pruning algorithm.

# Description of the game
At the beginning of the game, the numerical string "4 3 3 2 2 1 -1" is given and each player has a score of 0.
The players make moves sequentially by removing one number from the numerical string and adding it to the player's current score.
The game ends when one number is left in the numerical string.
The player with a score of 9 or higher loses the game. If the score is equal, the game is a draw.
In all other cases, the player with the highest score wins the game.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
