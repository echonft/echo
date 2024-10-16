import type { Offer } from '@echo/model/types/offer/offer'
import { CardChainIcon } from '@echo/ui/components/base/card/card-chain-icon'
import { StackPictureLayout } from '@echo/ui/components/base/stack/layout/stack-picture-layout'
import { StackImage } from '@echo/ui/components/base/stack/stack-image'
import { OfferCardStatus } from '@echo/ui/components/offer/card/offer-card-status'
import type { NftStack } from '@echo/ui/types/nft-stack'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  stack: NftStack
  offer: Offer
  scaleDisabled?: boolean
}

export const OfferStackPicture: FunctionComponent<Props> = ({ stack, offer, scaleDisabled }) => {
  return (
    <StackPictureLayout>
      <StackImage src={stack.pictureUrl} alt={stack.tokenId.toString()} scaleDisabled={scaleDisabled} />
      <CardChainIcon chain={stack.collection.contract.chain} />
      <div className={clsx('absolute', 'bottom-2', 'left-2', 'h-max', 'w-max')}>
        <OfferCardStatus offer={offer} />
      </div>
    </StackPictureLayout>
  )
}
