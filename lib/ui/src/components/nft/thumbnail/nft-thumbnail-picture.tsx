import type { Nft } from '@echo/model/types/nft'
import { Img } from '@echo/ui/components/base/img'
import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { NftThumbnailPictureLayout } from '@echo/ui/components/nft/thumbnail/layout/nft-thumbnail-picture-layout'
import { NftThumbnailRemoveButton } from '@echo/ui/components/nft/thumbnail/nft-thumbnail-remove-button'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  nft: Nft
  removable?: boolean
  onRemove?: (nft: Nft) => unknown
}

export const NftThumbnailPicture: FunctionComponent<Props> = ({ nft, removable, onRemove }) => {
  return (
    <NftThumbnailPictureLayout>
      <Img className={clsx('select-none')} src={nft.pictureUrl} alt={nft.tokenId.toString()} width={128} height={128} />
      <ShowIf condition={Boolean(removable)}>
        <div className={clsx('absolute', 'top-1', 'right-1', 'h-max', 'w-max')}>
          <NftThumbnailRemoveButton
            onRemove={() => {
              onRemove?.(nft)
            }}
          />
        </div>
      </ShowIf>
    </NftThumbnailPictureLayout>
  )
}
