import type { CSSProperties, ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  onClick?: () => void
  className?: string
  variant?: 'blue' | 'pink' | 'ghost'
  size?: 'md' | 'lg'
}

const VARIANT_STYLE: Record<NonNullable<ButtonProps['variant']>, CSSProperties> = {
  blue: {
    backgroundColor: '#407BFF',
    color: '#FFFFFF',
    boxShadow: '0 0 20px rgba(64, 123, 255, 0.35)',
  },
  pink: {
    backgroundColor: '#EA526F',
    color: '#FFFFFF',
    boxShadow: '0 0 20px rgba(234, 82, 111, 0.35)',
  },
  ghost: {
    backgroundColor: 'rgba(23, 30, 46, 0.9)',
    color: '#EFF1ED',
    border: '1px solid rgba(255, 255, 255, 0.12)',
  },
}

export function Button({
  children,
  onClick,
  className = '',
  variant = 'blue',
  size = 'lg',
}: ButtonProps) {
  const sizing = size === 'lg' ? 'min-h-14 rounded-[20px] text-lg' : 'min-h-11 rounded-2xl text-base'

  return (
    <button
      type="button"
      onClick={onClick}
      style={VARIANT_STYLE[variant]}
      className={`clay-press font-display flex w-full items-center justify-center px-4 font-semibold ${sizing} ${className}`}
    >
      {children}
    </button>
  )
}
