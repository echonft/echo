import { CardOpenSeaIcon } from '@echo/ui/components/base/card/card-open-sea-icon'
import { classes } from '@echo/ui/helpers/classes'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { type FunctionComponent } from 'react'

interface Props {
  nft: SelectableNft
  hideLink?: boolean
}

export const SelectableNftCardPictureOpenSeaIcon: FunctionComponent<Props> = ({ nft, hideLink }) => {
  if (hideLink) {
    return null
  }
  return (
    <div className={classes('absolute', 'top-2', 'left-2', 'h-max', 'w-max')}>
      <CardOpenSeaIcon openSeaUrl={nft.openSeaUrl} />
    </div>
  )
}
