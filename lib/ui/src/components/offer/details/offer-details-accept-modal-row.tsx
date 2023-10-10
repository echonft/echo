import { OfferDetailsAcceptModalIcon } from '@echo/ui/components/offer/details/offer-details-accept-modal-icon'
import { ContractLoadingStatus } from '@echo/ui/types/model/contract-loading-status'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
  status: ContractLoadingStatus
  title: string
}

export const OfferDetailsAcceptModalRow: FunctionComponent<Props> = ({ status, title }) => {
  return (
    <div className={clsx('flex', 'flex-row', 'gap-2', 'items-center')}>
      <OfferDetailsAcceptModalIcon status={status} />
      <div className={clsx('h-1', 'w-16', 'bg-white/50', 'rounded-md')} />
      <span className={clsx('prose-label-lg', 'text-white/50')}>{title}</span>
    </div>
  )
}
