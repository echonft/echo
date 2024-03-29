import { SelectableNftsWithFilters } from '@echo/ui/components/nft/selection/selectable-nfts-with-filters'
import { ProfileNftsEmpty } from '@echo/ui/pages/profile/nfts/profile-nfts-empty'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { isEmpty } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  nfts: SelectableNft[]
}

export const ProfileNfts: FunctionComponent<Props> = ({ nfts }) => {
  if (isEmpty(nfts)) {
    return <ProfileNftsEmpty />
  }
  // TODO onSelectionAction={}
  return <SelectableNftsWithFilters nfts={nfts} />
}
