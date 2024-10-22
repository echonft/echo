import { CardChainIcon } from '@echo/ui/components/base/card/card-chain-icon'
import { StackPictureLayout } from '@echo/ui/components/base/stack/layout/stack-picture-layout'
import { StackImage } from '@echo/ui/components/base/stack/stack-image'
import type { Chain } from '@echo/utils/constants/chain'
import type { Nullable } from '@echo/utils/types/nullable'
import { type FunctionComponent } from 'react'

interface Props {
  chain: Chain
  pictureUrl: Nullable<string>
  tokenIdLabel: string
  scaleDisabled?: boolean
}

export const SwapStackPicture: FunctionComponent<Props> = ({ chain, pictureUrl, tokenIdLabel, scaleDisabled }) => {
  return (
    <StackPictureLayout>
      <StackImage src={pictureUrl} alt={tokenIdLabel} scaleDisabled={scaleDisabled} />
      <CardChainIcon chain={chain} />
    </StackPictureLayout>
  )
}
