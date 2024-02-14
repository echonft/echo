import { CardOpenSeaIcon } from '@echo/ui/components/base/card/card-open-sea-icon'
import type { NftCardProps } from '@echo/ui/components/nft/card/nft-card'
import { classes } from '@echo/ui/helpers/classes'
import { type FunctionComponent } from 'react'

export const NftCardOpenSeaIcon: FunctionComponent<NftCardProps> = ({ nft, options }) => {
  if (options?.style?.hideOpenSeaLink) {
    return null
  }
  return (
    <div className={classes('absolute', 'top-2', 'left-2', 'h-max', 'w-max')}>
      <CardOpenSeaIcon openSeaUrl={nft.openSeaUrl} />
    </div>
  )
}
