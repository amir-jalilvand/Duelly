export type RpsChoice = 'rock' | 'paper' | 'scissors'
export type RpsRoundResult = 'win' | 'lose' | 'draw'

export type RpsSession = {
  rounds: number
}

export type RpsScore = {
  you: number
  draws: number
  them: number
}

export const RPS_WAIT_SECONDS = 5
