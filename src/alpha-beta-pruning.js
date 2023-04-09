function getScore(node) {
    const scoreForPlayer1 = node.scoreForPlayer1;
    const scoreForPlayer2 = node.scoreForPlayer2;

    if (scoreForPlayer1 === 7) return -1;
    if (scoreForPlayer2 === 7) return 1;
    if (scoreForPlayer1 > scoreForPlayer2) return 1;
    if (scoreForPlayer2 > scoreForPlayer1) return -1;
    return 0;
}

function generateChildren(node, isMaximizer) {
    return node.givenNumbers.map((number, index) => {
        const newNumbers = node.givenNumbers.slice(0, index).concat(node.givenNumbers.slice(index + 1));
        const newScoreForPlayer1 = isMaximizer ? node.scoreForPlayer1 + number : node.scoreForPlayer1;
        const newScoreForPlayer2 = isMaximizer ? node.scoreForPlayer2 : node.scoreForPlayer2 + number;

        return {
            givenNumbers: newNumbers,
            scoreForPlayer1: newScoreForPlayer1,
            scoreForPlayer2: newScoreForPlayer2,
        };
    });
}

export function alphaBeta(node, depth, alpha, beta, isMaximizer) {
    if (depth === 0) {
        return { score: getScore(node), move: null };
    }

    const children = generateChildren(node, isMaximizer);
    let bestMove;

    if (isMaximizer) {
        let bestScore = -Infinity;
        for (const child of children) {
            const evaluation = alphaBeta(child, depth - 1, alpha, beta, false).score;
            if (evaluation > bestScore) {
                bestScore = evaluation;
                bestMove = child;
            }
            alpha = Math.max(alpha, bestScore);
            if (beta <= alpha) break;
        }
        return { score: bestScore, move: bestMove };
    } else {
        let bestScore = Infinity;
        for (const child of children) {
            const evaluation = alphaBeta(child, depth - 1, alpha, beta, true).score;
            if (evaluation < bestScore) {
                bestScore = evaluation;
                bestMove = child;
            }
            beta = Math.min(beta, bestScore);
            if (beta <= alpha) break;
        }
        return { score: bestScore, move: bestMove };
    }
}

export function findTakenNumber(originalNode, bestMoveNode) {
    const originalNumbers = new Set(originalNode.givenNumbers);
    const bestMoveNumbers = new Set(bestMoveNode.givenNumbers);

    for (const number of originalNumbers) {
        if (!bestMoveNumbers.has(number)) {
            return number;
        }
    }
}
