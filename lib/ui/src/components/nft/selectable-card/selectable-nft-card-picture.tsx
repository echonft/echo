import { CardImage } from '@echo/ui/components/base/card/card-image'
import { CardOpenSeaIcon } from '@echo/ui/components/base/card/card-open-sea-icon'
import { CardPictureLayout } from '@echo/ui/components/base/card/layout/card-picture-layout'
import { SelectableNftCardDiscordTag } from '@echo/ui/components/nft/selectable-card/selectable-nft-card-discord-tag'
import { SelectableNftCardSelector } from '@echo/ui/components/nft/selectable-card/selectable-nft-card-selector'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { neither } from '@echo/utils/helpers/neither'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  nft: SelectableNft
  hideOwner?: boolean
  onToggleSelection?: (nft: SelectableNft, selected: boolean) => unknown
}

export const SelectableNftCardPicture: FunctionComponent<Props> = ({ nft, hideOwner, onToggleSelection }) => {
  const { disabled, selected } = nft
  return (
    <CardPictureLayout>
      <CardImage
        src={nft.pictureUrl}
        alt={nft.tokenId.toString()}
        scaleDisabled={Boolean(disabled) || Boolean(selected)}
      />
      <SelectableNftCardSelector nft={nft} onToggleSelection={onToggleSelection} />
      <div className={clsx('absolute', 'top-2', 'left-2', 'h-max', 'w-max')}>
        <CardOpenSeaIcon openSeaUrl={nft.openSeaUrl} />
      </div>
      <SelectableNftCardDiscordTag nft={nft} hideOwner={hideOwner} asLink={neither(disabled, selected)} />
    </CardPictureLayout>
  )
}
