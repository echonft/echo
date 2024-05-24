import type { Nft } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'
import { CreateOfferExpirationSelector } from '@echo/ui/components/offer/create/create-offer-expiration-selector'
import { ONE_DAY } from '@echo/ui/constants/expiration'
import type { Expiration } from '@echo/ui/types/expiration'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, useState } from 'react'

interface Props {
  receiver: User
  receiverItems: Nft[]
  senderNfts: SelectableNft[]
  onCancel?: VoidFunction
  onComplete?: (senderSelection: SelectableNft[]) => void
}

export const CreateOfferExpiration: FunctionComponent<Props> = () => {
  const t = useTranslations('offer.create.expiration')
  const [expiration, setExpiration] = useState<Expiration>(ONE_DAY)
  // const firstNft = head(receiverItems)
  return (
    <div className={clsx('flex', 'flex-row', 'gap-16')}>
      <>TODO IMAGE</>
      <div className={clsx('flex', 'flex-col', 'gap-12')}>
        <span>{t('title')}</span>
        <div className={clsx('flex', 'flex-col', 'gap-10')}>
          <span>{t('subtitle')}</span>
          <CreateOfferExpirationSelector selectedExpiration={expiration} onSelect={setExpiration} />
          <button className={'btn'}>{t('btn')}</button>
        </div>
      </div>
    </div>
  )
}
