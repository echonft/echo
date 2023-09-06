import { NewItemsContainer } from '../../item/new-items-container'
import { NewItemsEmptyContainer } from '../../item/new-items-empty-container'
import { NewListingSliderSearchBoxManager } from './new-listing-slider-search-box-manager'
import { NewListingSliderTargetsContainer } from './new-listing-slider-targets-container'
import { ListingItem, ListingTarget, NftCollection } from '@echo/ui-model'
import { isNilOrEmpty } from '@echo/utils'
import { Disclosure } from '@headlessui/react'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent, useRef } from 'react'

const testCollections: NftCollection[] = [
  {
    id: 'Rc8pLQXxgyQGIRL0fr13',
    bannerUrl: new URL(
      'https://i.seadn.io/gae/OwmR2aAFXTNxnPAiKrOhbsfZSSQqoaGMFQvedFileV6Vv-9TPs7TFI8RTXdIkoqfc9AZhFI4XcTHREnPc3mc-MDKFC4qapJbOyhcQQ?auto=format&dpr=1&w=3840'
    ),
    blurUrl: undefined,
    contract: {
      tokenType: 'ERC721',
      address: '0x12c63bbD266dB84e117356e664f3604055166CEc',
      chainId: 1
    },
    description: 'pxMythics is an 1,077 piece NFT collection based on the greatest mythologies throughout history.',
    discordUrl: new URL('https://discord.gg/pxmythics'),
    floorPrice: 0.025,
    name: 'pxMythics Genesis',
    openSeaUrl: new URL('https://opensea.io/collection/pxmythics-genesis'),
    slug: 'pxmythics-genesis',
    profilePictureUrl: new URL(
      'https://i.seadn.io/gae/R3b_Ju-BF7Ae45pp1f7UxCS5wF06dfFG7ydux_v9S8lJ7CL3j4kgv7a0nM4yVw-GhOH21ZigeaNluK-nuo6Dclq9LdQYH2Cvj8PfMQ?w=500&auto=format'
    ),
    totalSupply: 1077,
    twitterUsername: undefined,
    websiteUrl: new URL('https://pxmythics.io')
  },
  {
    id: '1aomCtnoesD7WVll6Yi1',
    bannerUrl: new URL(
      'https://i.seadn.io/gae/ujBmfCu4_m30X3zkmyEA6wYPFubX0qkQJ5CEm5D9Eo2M1jHkDx1K4hUQQitd912A6-M8nyvOsuCuIv8RZokw83runTcR_kTs45xF?auto=format&dpr=1&w=3840'
    ),
    blurUrl: new URL('https://blur.io/collection/spiral-frequencies'),
    contract: {
      tokenType: 'ERC721',
      address: '0x320e2fa93A4010ba47edcdE762802374bac8d3F7',
      chainId: 1
    },
    description: 'A Genetic Chain Project.',
    discordUrl: new URL('https://discord.gg/genetic-chain'),
    floorPrice: 0.037,
    name: 'Spiral Frequencies',
    openSeaUrl: new URL('https://opensea.io/collection/spiral-frequencies'),
    slug: 'spiral-frequencies',
    profilePictureUrl: new URL(
      'https://i.seadn.io/gae/dPCp-lwVmhNgEqZCIsTVos7mDu7qY5A_LARb8PMULBrIfTIlRSlX58fphv8AQm8axjszuT-LOwbBlIbXRwZuA6Ua9Btp3aJWpMCMWu8?w=500&auto=format'
    ),
    totalSupply: 6315,
    twitterUsername: 'GeneticChain',
    websiteUrl: new URL('https://geneticchain.io/project/1')
  }
]

interface Props {
  items: ListingItem[]
  targets: ListingTarget[]
  onTargetsSelected?: (newTargets: ListingTarget[]) => unknown
  onEditTarget?: (target: ListingTarget) => unknown
  onRemoveTarget?: (target: ListingTarget) => unknown
  onRemoveItem?: (item: ListingItem) => unknown
  onAddMoreItem?: () => unknown
}

export const NewListingSliderInnerContainer: FunctionComponent<Props> = ({
  items,
  targets,
  onTargetsSelected,
  onEditTarget,
  onRemoveTarget,
  onRemoveItem,
  onAddMoreItem
}) => {
  const t = useTranslations('listing.new.bottomSlider')
  const searchBarRef = useRef<HTMLButtonElement | null>(null)

  // On add more target, we simply focus the user on the search box
  const onAddMoreTarget = () => {
    searchBarRef?.current?.click()
  }
  return (
    <div className={clsx('flex', 'flex-col', 'gap-6', 'py-3', 'pb-32')}>
      <NewListingSliderSearchBoxManager
        placeholder={t('searchPlaceholder')}
        ref={searchBarRef}
        selectedOptions={targets}
        options={testCollections.map((collection) => ({ collection, amount: 1 }))}
        onTargetsSelected={onTargetsSelected}
      />
      <NewListingSliderTargetsContainer
        targets={targets}
        onAddMore={onAddMoreTarget}
        onRemove={onRemoveTarget}
        onEdit={onEditTarget}
      />
      <NewItemsContainer
        items={items}
        onRemove={onRemoveItem}
        onAddMore={onAddMoreItem}
        isReceiving={false}
        renderEmpty={() => <NewItemsEmptyContainer onAddMore={onAddMoreItem} />}
      />
      <div className={clsx('flex', 'items-center', 'justify-center', 'py-6')}>
        <Disclosure.Button
          className={clsx('btn-gradient', 'group', 'rounded-lg', 'w-40', 'py-1.5', '!h-10')}
          disabled={isNilOrEmpty(items) || isNilOrEmpty(targets)}
          // onClick={() => setModalState('TO CONFIRM')}
        >
          <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('finalizeBtn')}</span>
        </Disclosure.Button>
      </div>
    </div>
  )
}
