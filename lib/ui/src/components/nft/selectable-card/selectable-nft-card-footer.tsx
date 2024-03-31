import { CardSubtitle } from '@echo/ui/components/base/card/card-subtitle'
import { CardTitle } from '@echo/ui/components/base/card/card-title'
import { SelectableNftCardFooterLayout } from '@echo/ui/components/nft/selectable-card/layout/selectable-nft-card-footer-layout'
import { getTokenIdString } from '@echo/ui/helpers/nft/get-token-id-string'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  nft: SelectableNft
}

export const SelectableNftCardFooter: FunctionComponent<Props> = ({ nft }) => {
  const { action, actionDisabled } = nft
  return (
    <SelectableNftCardFooterLayout>
      <div
        className={clsx(
          'translate-y-3.75',
          !actionDisabled && !isNil(action) && ['group-hover:translate-y-0', 'transition-transform ease-in-out'],
          isNil(action) && ['pt-3.75', 'pb-5']
        )}
      >
        <CardTitle label={nft.collection.name} />
        <CardSubtitle label={getTokenIdString(nft.tokenId, nft.collection.totalSupply)} />
      </div>
    </SelectableNftCardFooterLayout>
  )
}
