import type { ListingState } from '@echo/model/constants/listing-state'
import { CardChainIcon } from '@echo/ui/components/base/card/card-chain-icon'
import { CardImage } from '@echo/ui/components/base/card/card-image'
import { CardPictureLayout } from '@echo/ui/components/base/card/layout/card-picture-layout'
import { ListingCardStatus } from '@echo/ui/components/listing/card/listing-card-status'
import type { Chain } from '@echo/utils/constants/chain'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  chain: Chain
  pictureUrl: Nullable<string>
  tokenIdLabel: string
  state: ListingState
  scaleDisabled?: boolean
}

export const ListingCardPicture: FunctionComponent<Props> = ({
  chain,
  pictureUrl,
  tokenIdLabel,
  state,
  scaleDisabled
}) => {
  return (
    <CardPictureLayout>
      <CardImage src={pictureUrl} alt={tokenIdLabel} scaleDisabled={scaleDisabled} />
      <CardChainIcon chain={chain} />
      <div className={clsx('absolute', 'bottom-2', 'left-2', 'h-max', 'w-max')}>
        <ListingCardStatus state={state} />
      </div>
    </CardPictureLayout>
  )
}
