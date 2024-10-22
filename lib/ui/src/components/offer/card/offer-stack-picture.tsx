import type { OfferState } from '@echo/model/constants/offer-state'
import { CardChainIcon } from '@echo/ui/components/base/card/card-chain-icon'
import { StackPictureLayout } from '@echo/ui/components/base/stack/layout/stack-picture-layout'
import { StackImage } from '@echo/ui/components/base/stack/stack-image'
import { OfferCardStatus } from '@echo/ui/components/offer/card/offer-card-status'
import type { Chain } from '@echo/utils/constants/chain'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  chain: Chain
  pictureUrl: Nullable<string>
  tokenIdLabel: string
  state: OfferState
  scaleDisabled?: boolean
}

export const OfferStackPicture: FunctionComponent<Props> = ({
  chain,
  pictureUrl,
  tokenIdLabel,
  state,
  scaleDisabled
}) => {
  return (
    <StackPictureLayout>
      <StackImage src={pictureUrl} alt={tokenIdLabel} scaleDisabled={scaleDisabled} />
      <CardChainIcon chain={chain} />
      <div className={clsx('absolute', 'bottom-2', 'left-2', 'h-max', 'w-max')}>
        <OfferCardStatus state={state} />
      </div>
    </StackPictureLayout>
  )
}
