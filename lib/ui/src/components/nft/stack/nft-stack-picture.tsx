import { CardChainIcon } from '@echo/ui/components/base/card/card-chain-icon'
import { StackPictureLayout } from '@echo/ui/components/base/stack/layout/stack-picture-layout'
import { StackImage } from '@echo/ui/components/base/stack/stack-image'
import { NftStackDiscordTag } from '@echo/ui/components/nft/stack/nft-stack-discord-tag'
import type { NftStack } from '@echo/ui/types/nft-stack'
import { type FunctionComponent } from 'react'

interface Props {
  stack: NftStack
  hideOwner?: boolean
  scaleDisabled?: boolean
}

export const NftStackPicture: FunctionComponent<Props> = ({ stack, hideOwner, scaleDisabled }) => {
  return (
    <StackPictureLayout>
      <StackImage src={stack.pictureUrl} alt={stack.label} scaleDisabled={scaleDisabled} />
      <CardChainIcon chain={stack.collection.contract.chain} />
      <NftStackDiscordTag username={stack.owner.discord.username} hideOwner={hideOwner} />
    </StackPictureLayout>
  )
}
