import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  title?: string
  subtitle: string
}

export const StateLabel: FunctionComponent<Props> = ({ title, subtitle }) => (
  <div className={clsx('flex', 'flex-col', 'gap-1')}>
    <h2
      className={clsx(
        'text-white/70',
        'text-[0.875rem]',
        'font-semibold',
        'leading-[1.28125rem]',
        'tracking-[0.0175rem]',
        'font-inter',
        'text-center',
        !title && 'hidden'
      )}
    >
      {title}
    </h2>
    <h1 className={clsx('text-white', 'text-center', 'prose-header-lg-semi')}>{subtitle}</h1>
  </div>
)
