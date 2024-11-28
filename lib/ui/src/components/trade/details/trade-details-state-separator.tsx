import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  locked: boolean
}

export const TradeDetailsStateSeparator: FunctionComponent<Props> = ({ locked }) => {
  if (locked) {
    return null
  }

  return <div className={clsx('h-full', 'w-[0.1875rem]', 'py-4', 'bg-clip-content', 'bg-white/70', 'flex-none')} />
}
