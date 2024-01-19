import type { Nft } from '@echo/model/types/nft'
import { CardDiscordTag } from '@echo/ui/components/base/card/card-discord-tag'
import { CardImage } from '@echo/ui/components/base/card/card-image'
import { CardOpenSeaIcon } from '@echo/ui/components/base/card/card-open-sea-icon'
import { CardPictureLayout } from '@echo/ui/components/base/card/layout/card-picture-layout'
import { HideIf } from '@echo/ui/components/base/utils/hide-if'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  nft: Nft
  hideOwner?: boolean
  hideLink?: boolean
  scaleDisabled?: boolean
}

export const NftCardPicture: FunctionComponent<Props> = ({ nft, hideOwner, hideLink, scaleDisabled }) => {
  return (
    <CardPictureLayout>
      <CardImage src={nft.pictureUrl} alt={nft.tokenId.toString()} scaleDisabled={scaleDisabled} />
      <HideIf condition={Boolean(hideLink)}>
        <div className={clsx('absolute', 'top-2', 'left-2', 'h-max', 'w-max')}>
          <CardOpenSeaIcon openSeaUrl={nft.openSeaUrl} />
        </div>
      </HideIf>
      <HideIf condition={Boolean(hideOwner)}>
        <div className={clsx('absolute', 'bottom-2', 'left-2', 'h-max', 'w-max')}>
          <CardDiscordTag username={nft.owner.discord.username} />
        </div>
      </HideIf>
    </CardPictureLayout>
  )
}
