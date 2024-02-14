import { classes } from '@echo/ui/helpers/classes'
import { type FunctionComponent } from 'react'

interface Props {
  title?: string
  subtitle: string
}

export const StateTextContainer: FunctionComponent<Props> = ({ title, subtitle }) => (
  <div className={classes('flex', 'flex-col', 'gap-1')}>
    <h2
      className={classes(
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
    <h1 className={classes('text-white', 'text-center', 'prose-header-lg-semi')}>{subtitle}</h1>
  </div>
)
