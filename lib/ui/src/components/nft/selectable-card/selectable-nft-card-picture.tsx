import { Img } from '@echo/ui/components/base/img'
import { HideIf } from '@echo/ui/components/base/utils/hide-if'
import { NftCardPictureLayout } from '@echo/ui/components/nft/card/layout/nft-card-picture-layout'
import { NftCardDiscordTag } from '@echo/ui/components/nft/card/nft-card-discord-tag'
import { NftCardOpenSeaIcon } from '@echo/ui/components/nft/card/nft-card-open-sea-icon'
import { SelectableNftCardSelector } from '@echo/ui/components/nft/selectable-card/selectable-nft-card-selector'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  nft: SelectableNft
  hideOwner?: boolean
  onToggleSelection?: (nft: SelectableNft, selected: boolean) => unknown
}

export const SelectableNftCardPicture: FunctionComponent<Props> = ({ nft, hideOwner, onToggleSelection }) => {
  return (
    <NftCardPictureLayout>
      <Img className={clsx('select-none')} src={nft.pictureUrl} alt={nft.tokenId.toString()} width={208} height={208} />
      <SelectableNftCardSelector nft={nft} onToggleSelection={onToggleSelection} />
      <div className={clsx('absolute', 'top-2', 'left-2', 'h-max', 'w-max')}>
        <NftCardOpenSeaIcon nft={nft} />
      </div>
      <HideIf condition={Boolean(hideOwner)}>
        <div className={clsx('absolute', 'bottom-2', 'left-2', 'h-max', 'w-max')}>
          <NftCardDiscordTag nft={nft} />
        </div>
      </HideIf>
    </NftCardPictureLayout>
  )
}
