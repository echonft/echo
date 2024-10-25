import type { Chain } from '@echo/model/constants/chain'
import type { OfferState } from '@echo/model/constants/offer-state'
import { CardChainIcon } from '@echo/ui/components/base/card/card-chain-icon'
import { CardImage } from '@echo/ui/components/base/card/card-image'
import { CardPictureLayout } from '@echo/ui/components/base/card/layout/card-picture-layout'
import { OfferCardStatus } from '@echo/ui/components/offer/card/offer-card-status'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  chain: Chain
  pictureUrl: Nullable<string>
  label: string
  state: OfferState
  scaleDisabled?: boolean
}

export const OfferCardPicture: FunctionComponent<Props> = ({ chain, pictureUrl, label, state, scaleDisabled }) => {
  return (
    <CardPictureLayout>
      <CardImage src={pictureUrl} alt={label} scaleDisabled={scaleDisabled} />
      <CardChainIcon chain={chain} />
      <div className={clsx('absolute', 'bottom-2', 'left-2', 'h-max', 'w-max')}>
        <OfferCardStatus state={state} />
      </div>
    </CardPictureLayout>
  )
}
