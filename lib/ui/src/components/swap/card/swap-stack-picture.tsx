import type { Swap } from '@echo/model/types/offer/swap'
import { CardChainIcon } from '@echo/ui/components/base/card/card-chain-icon'
import { CardStatus } from '@echo/ui/components/base/card/card-status'
import { StackPictureLayout } from '@echo/ui/components/base/stack/layout/stack-picture-layout'
import { StackImage } from '@echo/ui/components/base/stack/stack-image'
import { COLOR_GREEN } from '@echo/ui/constants/color'
import type { NftStack } from '@echo/ui/types/nft-stack'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

interface Props {
  stack: NftStack
  swap: Swap
  scaleDisabled?: boolean
}

export const SwapStackPicture: FunctionComponent<Props> = ({ stack, swap, scaleDisabled }) => {
  const t = useTranslations('offer.state')
  return (
    <StackPictureLayout>
      <StackImage src={stack.pictureUrl} alt={stack.tokenId.toString()} scaleDisabled={scaleDisabled} />
      <CardChainIcon chain={stack.collection.contract.chain} />
      <div className={clsx('absolute', 'bottom-2', 'left-2', 'h-max', 'w-max')}>
        <CardStatus label={t(swap.state)} color={COLOR_GREEN} />
      </div>
    </StackPictureLayout>
  )
}
