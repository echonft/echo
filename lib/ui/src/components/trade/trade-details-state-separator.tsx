import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  locked: boolean
}

export const OfferDetailsStateSeparator: FunctionComponent<Props> = ({ locked }) => {
  if (locked) {
    return null
  }

  return <div className={clsx('h-[5.3125rem]', 'w-0.5', 'bg-white/70', 'flex-none')} />
}
