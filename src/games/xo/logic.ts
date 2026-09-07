import { WIN_LINES, type Board, type Cell, type Difficulty, type Winner } from './types'

export function getWinner(board: Board): Winner {
  for (const [a, b, c] of WIN_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]
    }
  }
  if (board.every(Boolean)) return 'draw'
  return null
}

export function availableMoves(board: Board): number[] {
  return board.reduce<number[]>((acc, cell, index) => {
    if (!cell) acc.push(index)
    return acc
  }, [])
}

function randomMove(board: Board): number {
  const moves = availableMoves(board)
  return moves[Math.floor(Math.random() * moves.length)]!
}

function findWinningMove(board: Board, mark: Cell): number | null {
  for (const index of availableMoves(board)) {
    const next = [...board]
    next[index] = mark
    if (getWinner(next) === mark) return index
  }
  return null
}

function minimax(board: Board, isMaximizing: boolean): number {
  const winner = getWinner(board)
  if (winner === 'O') return 10
  if (winner === 'X') return -10
  if (winner === 'draw') return 0

  if (isMaximizing) {
    let best = -Infinity
    for (const index of availableMoves(board)) {
      const next = [...board]
      next[index] = 'O'
      best = Math.max(best, minimax(next, false))
    }
    return best
  }

  let best = Infinity
  for (const index of availableMoves(board)) {
    const next = [...board]
    next[index] = 'X'
    best = Math.min(best, minimax(next, true))
  }
  return best
}

function bestMove(board: Board): number {
  let bestScore = -Infinity
  let move = availableMoves(board)[0]!
  for (const index of availableMoves(board)) {
    const next = [...board]
    next[index] = 'O'
    const score = minimax(next, false)
    if (score > bestScore) {
      bestScore = score
      move = index
    }
  }
  return move
}

export function getRobotMove(board: Board, difficulty: Difficulty): number {
  if (difficulty === 'easy') return randomMove(board)

  if (difficulty === 'medium') {
    const win = findWinningMove(board, 'O')
    if (win !== null) return win
    if (Math.random() < 0.55) {
      const block = findWinningMove(board, 'X')
      if (block !== null) return block
    }
    return randomMove(board)
  }

  return bestMove(board)
}
