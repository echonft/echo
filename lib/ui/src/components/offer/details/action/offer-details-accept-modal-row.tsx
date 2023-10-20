import { OfferDetailsAcceptModalIcon } from '@echo/ui/components/offer/details/action/offer-details-accept-modal-icon'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  title: string
  status: 'error' | 'loading' | 'success'
}

export const OfferDetailsAcceptModalRow: FunctionComponent<Props> = ({ title, status }) => {
  return (
    <div className={clsx('flex', 'flex-row', 'gap-2', 'items-center')}>
      <OfferDetailsAcceptModalIcon status={status} />
      <div className={clsx('h-1', 'w-16', 'bg-white/50', 'rounded-md')} />
      <span className={clsx('prose-label-lg', 'text-white/50')}>{title}</span>
    </div>
  )
}
