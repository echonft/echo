import { CardOpenSeaIcon } from '@echo/ui/components/base/card/card-open-sea-icon'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  nft: SelectableNft
}

export const SelectableNftCardPictureOpenSeaIcon: FunctionComponent<Props> = ({ nft }) => {
  return (
    <div className={clsx('absolute', 'top-2', 'left-2', 'h-max', 'w-max')}>
      <CardOpenSeaIcon openSeaUrl={nft.openSeaUrl} />
    </div>
  )
}
