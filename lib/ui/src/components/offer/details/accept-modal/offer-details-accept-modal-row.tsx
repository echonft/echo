import { OfferDetailsAcceptModalIcon } from '@echo/ui/components/offer/details/accept-modal/offer-details-accept-modal-icon'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
  title: string
  loading: boolean
  success: boolean
}

export const OfferDetailsAcceptModalRow: FunctionComponent<Props> = ({ title, loading, success }) => {
  return (
    <div className={clsx('flex', 'flex-row', 'gap-2', 'items-center')}>
      <OfferDetailsAcceptModalIcon loading={loading} success={success} />
      <div className={clsx('h-1', 'w-16', 'bg-white/50', 'rounded-md')} />
      <span className={clsx('prose-label-lg', 'text-white/50')}>{title}</span>
    </div>
  )
}
