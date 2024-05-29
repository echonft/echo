import type { Nft } from '@echo/model/types/nft'
import { CardSubtitle } from '@echo/ui/components/base/card/card-subtitle'
import { CardTitle } from '@echo/ui/components/base/card/card-title'
import { SelectableNftCardFooterLayout } from '@echo/ui/components/nft/selectable-card/layout/selectable-nft-card-footer-layout'
import { getTokenIdString } from '@echo/ui/helpers/nft/get-token-id-string'
import type { NftAction } from '@echo/ui/types/nft-action'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  nft: Nft
  action?: Nullable<NftAction>
}

export const SelectableNftCardFooter: FunctionComponent<Props> = ({ nft, action }) => {
  return (
    <SelectableNftCardFooterLayout>
      <div
        className={clsx(
          'translate-y-3.75',
          !isNil(action) && ['group-hover:translate-y-0', 'transition-transform ease-in-out']
        )}
      >
        <CardTitle label={nft.collection.name} />
        <CardSubtitle label={getTokenIdString(nft.tokenId, nft.collection.totalSupply)} />
      </div>
    </SelectableNftCardFooterLayout>
  )
}
