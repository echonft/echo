import type { Expiration } from '@echo/model/types/expiration'
import type { Nft } from '@echo/model/types/nft'
import type { Offer } from '@echo/model/types/offer'
import { CreateOfferModalSwitch } from '@echo/ui/components/offer/create/create-offer-modal-switch'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, useState } from 'react'

interface Props {
  senderItems: Nft[]
  receiverItems: Nft[]
  expiration: Expiration
  onComplete?: (offer: Offer) => unknown
}

export const CreateOfferExpirationCreateButton: FunctionComponent<Props> = ({
  senderItems,
  receiverItems,
  expiration,
  onComplete
}) => {
  const t = useTranslations('offer.create.expiration')
  const [modalShown, setModalShown] = useState(false)
  return (
    <>
      <button
        className={clsx('btn-gradient', 'h-max', 'w-full', 'py-2.5', 'group')}
        onClick={() => {
          setModalShown(true)
        }}
      >
        <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('finalizeBtn')}</span>
      </button>
      <CreateOfferModalSwitch
        open={modalShown}
        senderItems={senderItems}
        receiverItems={receiverItems}
        expiration={expiration}
        onClose={() => {
          setModalShown(false)
        }}
        onSuccess={onComplete}
      />
    </>
  )
}
