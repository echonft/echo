import { StackLayout } from '@echo/ui/components/base/stack/layout/stack-layout'
import { StackFooter } from '@echo/ui/components/base/stack/stack-footer'
import { NftStackPicture } from '@echo/ui/components/nft/stack/nft-stack-picture'
import type { NftStack as NftStackModel } from '@echo/ui/types/nft-stack'
import { type FunctionComponent } from 'react'

interface Props {
  stack: NftStackModel
  hideOwner?: boolean
  scaleDisabled?: boolean
}

export const NftStack: FunctionComponent<Props> = ({ stack, hideOwner, scaleDisabled }) => {
  return (
    <StackLayout>
      <NftStackPicture stack={stack} hideOwner={hideOwner} scaleDisabled={scaleDisabled} />
      <StackFooter title={stack.collection.name} subtitle={stack.tokenId} />
    </StackLayout>
  )
}
