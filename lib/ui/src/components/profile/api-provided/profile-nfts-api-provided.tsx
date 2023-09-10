'use client'
import { NavigationItems } from '../../../constants/navigation-item'
import { NftFilterCollections, NftFilterTraits } from '../../../constants/nft-filter'
import { groupNftsByCollection } from '../../../helpers/nft/group-nfts-by-collection'
import { messages } from '../../../messages/en'
import { Group } from '../../../types/group'
import { HideIf } from '../../base/utils/hide-if'
import { ShowIf } from '../../base/utils/show-if'
import { SelectableNftGroupsAndFiltersContainer } from '../../nft/layout/container/selectable-nft-groups-and-filters-container'
import { ProfileNftsEmpty } from '../nft/empty/profile-nfts-empty'
import { ProfileNavigationLayout } from '../profile-navigation-layout'
import { NftResponse } from '@echo/api'
import { mapNft, Nft } from '@echo/ui-model'
import { NonEmptyArray } from '@echo/utils'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import { NextIntlClientProvider } from 'next-intl'
import { isEmpty, map, pipe } from 'ramda'
import { FunctionComponent, useMemo } from 'react'

dayjs.extend(timezone)

interface Props {
  responses: Array<Partial<NftResponse>>
}

export const ProfileNftsApiProvided: FunctionComponent<Props> = ({ responses }) => {
  const nftGroups = useMemo(() => pipe(map(mapNft), groupNftsByCollection)(responses), [responses])
  const dataIsEmpty = isEmpty(nftGroups)

  return (
    <NextIntlClientProvider timeZone={dayjs.tz.guess()} messages={messages} locale={'en'}>
      <ProfileNavigationLayout activeNavigationItem={NavigationItems}>
        <HideIf condition={dataIsEmpty}>
          <SelectableNftGroupsAndFiltersContainer
            groups={nftGroups as NonEmptyArray<Group<Nft>>}
            availableFilters={[NftFilterCollections, NftFilterTraits]}
          />
        </HideIf>
        <ShowIf condition={dataIsEmpty}>
          <ProfileNftsEmpty />
        </ShowIf>
      </ProfileNavigationLayout>
    </NextIntlClientProvider>
  )
}
