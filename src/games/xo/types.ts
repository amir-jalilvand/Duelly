export type Cell = 'X' | 'O' | null
export type Board = Cell[]
export type Difficulty = 'easy' | 'medium' | 'hard'
export type Starter = 'you' | 'robot'
export type Winner = 'X' | 'O' | 'draw' | null

export type Score = {
  you: number
  draws: number
  robot: number
}

export const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
] as const

export function emptyBoard(): Board {
  return Array(9).fill(null)
}
