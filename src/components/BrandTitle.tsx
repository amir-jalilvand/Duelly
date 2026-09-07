type BrandTitleProps = {
  welcome: string
}

export function BrandTitle({ welcome }: BrandTitleProps) {
  return (
    <h2 className="font-display text-center text-[32px] font-semibold leading-[1.15] tracking-tight text-ink">
      <span className="block text-[18px] font-medium text-muted">{welcome}</span>
      <span className="mt-1 inline-block drop-shadow-[0_0_18px_rgba(255,255,255,0.12)]">
        DUE
        <span className="text-blue drop-shadow-[0_0_12px_rgba(64,123,255,0.7)]">L</span>
        <span className="text-pink drop-shadow-[0_0_12px_rgba(234,82,111,0.7)]">L</span>Y
      </span>
    </h2>
  )
}
