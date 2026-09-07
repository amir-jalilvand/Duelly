import type { RpsChoice, RpsRoundResult } from './types'

export const RPS_CHOICES: RpsChoice[] = ['rock', 'paper', 'scissors']

export function beats(a: RpsChoice, b: RpsChoice) {
  return (
    (a === 'rock' && b === 'scissors') ||
    (a === 'paper' && b === 'rock') ||
    (a === 'scissors' && b === 'paper')
  )
}

export function roundResult(you: RpsChoice, them: RpsChoice): RpsRoundResult {
  if (you === them) return 'draw'
  return beats(you, them) ? 'win' : 'lose'
}

export const RPS_ROUND_OPTIONS = [1, 3, 5, 7] as const

export function normalizeRounds(value: number) {
  if ((RPS_ROUND_OPTIONS as readonly number[]).includes(value)) return value
  return 7
}
