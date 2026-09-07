import type { Board, Cell } from '../games/xo/types'

type XoBoardProps = {
  board: Board
  disabled?: boolean
  onCellClick: (index: number) => void
}

function Mark({ value }: { value: Cell }) {
  if (value === 'X') {
    return (
      <svg
        width="54"
        height="54"
        viewBox="0 0 54 54"
        fill="none"
        aria-hidden
        className="size-[46px] drop-shadow-[0_0_10px_rgba(64,123,255,0.65)]"
      >
        <path d="M13 13L41 41M41 13L13 41" stroke="#407BFF" strokeWidth="10" strokeLinecap="round" />
      </svg>
    )
  }
  if (value === 'O') {
    return (
      <svg
        width="54"
        height="54"
        viewBox="0 0 54 54"
        fill="none"
        aria-hidden
        className="size-[46px] drop-shadow-[0_0_10px_rgba(234,82,111,0.65)]"
      >
        <circle cx="27" cy="27" r="16" stroke="#EA526F" strokeWidth="10" />
      </svg>
    )
  }
  return null
}

export function XoBoard({ board, disabled, onCellClick }: XoBoardProps) {
  return (
    <div className="mx-auto grid w-[min(300px,calc(100%-24px))] grid-cols-3 gap-2">
      {board.map((cell, index) => (
        <button
          key={index}
          type="button"
          disabled={disabled || Boolean(cell)}
          onClick={() => onCellClick(index)}
          className="clay-press clay-card aspect-square w-full rounded-[20px] disabled:cursor-default disabled:active:transform-none"
        >
          <span className="flex size-full items-center justify-center">
            <Mark value={cell} />
          </span>
        </button>
      ))}
    </div>
  )
}
