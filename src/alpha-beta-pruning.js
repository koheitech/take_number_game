// The main logic of game algorithm, that is, alpha-beta pruning is implemented.

/**
 * Get evaluation score of the leaf node
 *
 * @param   {Object} node - reached leaf node
 * 
 * @returns {number} the evaluation of score of either 1, 0 or -1
 */
function getScore(node) {
    const scoreForPlayer1 = node.scoreForPlayer1;
    const scoreForPlayer2 = node.scoreForPlayer2;

    if (scoreForPlayer1 >= 9) return -1;
    if (scoreForPlayer2 >= 9) return 1;
    if (scoreForPlayer1 > scoreForPlayer2) return 1;
    if (scoreForPlayer2 > scoreForPlayer1) return -1;
    return 0;
}

/**
 * generate possible child nodes from the given node
 *
 * @param {Object}  node        - the current node
 * @param {boolean} isMaximizer - indication of either current node maximizer or minimizer
 * 
 * @returns {Object[]}          - list of possible child nodes
 */
function generateChildren(node, isMaximizer) {
    return node.givenNumbers.map((number, index) => {
        // one of the element is popped and defined as newNumbers
        const newNumbers = node.givenNumbers.slice(0, index).concat(node.givenNumbers.slice(index + 1));
        // score added depends on whether the given node is MAX turn or MIN turn
        const newScoreForPlayer1 = isMaximizer ? node.scoreForPlayer1 + number : node.scoreForPlayer1;
        const newScoreForPlayer2 = isMaximizer ? node.scoreForPlayer2 : node.scoreForPlayer2 + number;

        // new node or child node is generated
        return {
            givenNumbers: newNumbers,
            scoreForPlayer1: newScoreForPlayer1,
            scoreForPlayer2: newScoreForPlayer2,
        };
    });
}

/**
 * find out the best move with alpha-beta pruning in a recursive approach
 *
 * @param {Object} node         - current node
 * @param {number} depth        - depth of the current node
 * @param {number} alpha        - current alpha value
 * @param {number} beta         - current beta value
 * @param {boolean} isMaximizer - indication of either current node maximizer or minimizer
 * 
 * @returns {Object} evaluation score and move
 */
export function alphaBeta(node, depth, alpha, beta, isMaximizer) {
    // base condition is reached if depth is zero,
    // we can get the evaluation score of either 1, 0 or -1 is obtained
    if (depth === 0) {
        return { score: getScore(node), move: null };
    }

    const children = generateChildren(node, isMaximizer);
    let bestMove;

    if (isMaximizer) {
        let bestScore = -Infinity;

        for (const child of children) {
            const evaluation = alphaBeta(child, depth - 1, alpha, beta, false).score;

            // intermediate value and node associated are set here
            if (evaluation > bestScore) {
                bestScore = evaluation;
                bestMove = child;
            }

            // Since this is Maximizer, the highest evaluated node is chosen from child nodes
            alpha = Math.max(alpha, bestScore);

            // alpha cut-off
            if (beta <= alpha) break;
        }

        return { score: bestScore, move: bestMove };

    } else {
        let bestScore = Infinity;

        for (const child of children) {
            const evaluation = alphaBeta(child, depth - 1, alpha, beta, true).score;

            // intermediate value and node associated are set here
            if (evaluation < bestScore) {
                bestScore = evaluation;
                bestMove = child;
            }

            // Since this is minimizer, the lowest evaluated node is chosen from child nodes
            beta = Math.min(beta, bestScore);

            // beta cut-off
            if (beta <= alpha) break;
        }

        return { score: bestScore, move: bestMove };

    }
}

/**
 * find out the number taken out by player
 *
 * @param {number[]} previousNumbers - the list of numbers before player choose
 * @param {number[]} currentNumbers  - the list of numbers after player choose
 * 
 * @returns {number} the number chosen by player
 */
export function findTakenNumber(previousNumbers, currentNumbers) {

    // Basic logic is subtraction of previous array from the current array.
    // As the result, only one number is left, which is the number chosen by player
    for (let i = 0; i < currentNumbers.length; i++) {
        const index = previousNumbers.indexOf(currentNumbers[i]);
        if (index !== -1) {
            previousNumbers.splice(index, 1);
        }
    }

    return previousNumbers.pop();
}
