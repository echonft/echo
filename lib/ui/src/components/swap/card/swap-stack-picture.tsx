import type { Chain } from '@echo/model/constants/chain'
import { CardChainIcon } from '@echo/ui/components/base/card/card-chain-icon'
import { StackPictureLayout } from '@echo/ui/components/base/stack/layout/stack-picture-layout'
import { StackImage } from '@echo/ui/components/base/stack/stack-image'
import type { Nullable } from '@echo/utils/types/nullable'
import { type FunctionComponent } from 'react'

interface Props {
  chain: Chain
  pictureUrl: Nullable<string>
  label: string
  scaleDisabled?: boolean
}

export const SwapStackPicture: FunctionComponent<Props> = ({ chain, pictureUrl, label, scaleDisabled }) => {
  return (
    <StackPictureLayout>
      <StackImage src={pictureUrl} alt={label} scaleDisabled={scaleDisabled} />
      <CardChainIcon chain={chain} />
    </StackPictureLayout>
  )
}
