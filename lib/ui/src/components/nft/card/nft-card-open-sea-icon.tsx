import { CardOpenSeaIcon } from '@echo/ui/components/base/card/card-open-sea-icon'
import type { NftCardProps } from '@echo/ui/components/nft/card/nft-card'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

export const NftCardOpenSeaIcon: FunctionComponent<NftCardProps> = ({ nft, options }) => {
  if (isNil(options) || isNil(options.owner) || !options.owner.hide) {
    return null
  }
  return (
    <div className={clsx('absolute', 'top-2', 'left-2', 'h-max', 'w-max')}>
      <CardOpenSeaIcon openSeaUrl={nft.openSeaUrl} />
    </div>
  )
}
