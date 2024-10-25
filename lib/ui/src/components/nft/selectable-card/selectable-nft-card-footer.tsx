import type { OwnedNft } from '@echo/model/types/owned-nft'
import { CardSubtitle } from '@echo/ui/components/base/card/card-subtitle'
import { CardTitle } from '@echo/ui/components/base/card/card-title'
import { SelectableNftCardFooterLayout } from '@echo/ui/components/nft/selectable-card/layout/selectable-nft-card-footer-layout'
import type { NftAction } from '@echo/ui/constants/nft-actions'
import { nftLabel } from '@echo/ui/helpers/nft/nft-label'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  nft: OwnedNft
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
        <CardSubtitle label={nftLabel(nft)} />
      </div>
    </SelectableNftCardFooterLayout>
  )
}
