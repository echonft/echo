import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  locked: boolean
}

export const TradeDetailsStateSeparator: FunctionComponent<Props> = ({ locked }) => {
  if (locked) {
    return null
  }

  return <div className={clsx('w-[0.1875rem]', 'flex', 'flex-col', 'self-stretch', 'bg-white/70', 'mx-8')} />
}
