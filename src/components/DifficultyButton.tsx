type DifficultyButtonProps = {
  label: string
  selected?: boolean
  onClick?: () => void
  dir?: 'ltr' | 'rtl' | 'auto'
}

export function DifficultyButton({ label, selected, onClick, dir }: DifficultyButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      dir={dir}
      className="clay-press font-display flex min-h-[76px] w-full items-center justify-center rounded-[22px] px-4 text-center text-[17px] font-semibold leading-snug"
      style={
        selected
          ? {
              backgroundColor: '#407BFF',
              color: '#FFFFFF',
              boxShadow: '0 0 22px rgba(64, 123, 255, 0.4)',
              border: '1px solid rgba(64, 123, 255, 0.8)',
            }
          : {
              backgroundColor: 'rgba(23, 30, 46, 0.95)',
              color: '#EFF1ED',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.35)',
            }
      }
    >
      {label}
    </button>
  )
}
