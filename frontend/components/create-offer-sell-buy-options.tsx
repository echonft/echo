import { Autocomplete } from '@echo/frontend/components/autocomplete'
import { CollectionNftsFetcher } from '@echo/frontend/components/collection-nfts-fetcher'
import { TagManager } from '@echo/frontend/components/tag-manager'
import { mapCollectionSearchableObject } from '@echo/frontend/lib/mappers/map-collection-searchable-object'
import { addIfNotThere, toggle } from '@echo/frontend/lib/utils/array'
import { Erc721 } from '@echo/model/src/erc721'
import { Combobox } from '@headlessui/react'
import { mapCollectionSearchableObject } from '@lib/mappers/map-collection-searchable-object'
import { addIfNotThere, toggle } from '@lib/utils/array'
import { SearchableObject } from '@lib/view-models/object'
import { shortenAddress } from '@usedapp/core'
import clsx from 'clsx'
import { getAddress, isAddress } from 'ethers/lib/utils'
import { isEmpty, isNil } from 'ramda'
import React, { useCallback, useState } from 'react'
import { useTranslations } from 'use-intl'

interface Props {
  contractAddresses: string[]
  selectedContracts: string[]
  selectedNfts: Erc721[]
  onSelectContracts?: (contractAddresses: string[]) => void
  onSelectNfts?: (nfts: Erc721[]) => void
}

export const CreateOfferSellBuyOptions: React.FunctionComponent<Props> = ({
  contractAddresses,
  selectedContracts,
  selectedNfts,
  onSelectContracts,
  onSelectNfts
}) => {
  const t = useTranslations('CreateOffer.sell')
  const [searchQuery, setSearchQuery] = useState<string>()
  const [selectSpecificNfts, setSelectSpecificNfts] = useState<boolean>(false)
  const searchableContracts = mapCollectionSearchableObject(contractAddresses)
  const autocompleteOptions = useCallback(() => {
    if (isNil(searchQuery) || isEmpty(searchQuery)) {
      return searchableContracts
    }
    return searchableContracts.filter(
      (searchableContract) => searchableContract.value.indexOf(searchQuery.toLowerCase()) > -1
    )
  }, [searchQuery, searchableContracts])

  const updateSearchQuery = useCallback(
    (query: string) => {
      setSearchQuery(query)
    },
    [setSearchQuery]
  )

  return (
    <div className={clsx('flex', 'flex-col', 'gap-2')}>
      <Autocomplete
        placeholder={t('autocomplete.placeholder')}
        name={'contract-selector'}
        searchQuery={searchQuery}
        options={autocompleteOptions()}
        onSearch={updateSearchQuery}
        onSelected={(selected) => onSelectContracts?.(addIfNotThere(selectedContracts, selected.value))}
        renderNewOption={(query) =>
          isAddress(query) ? (
            <Combobox.Option
              value={{ id: getAddress(query), label: shortenAddress(query), value: getAddress(query) }}
              className={'option'}
            >
              {t('autocomplete.new-option', { collection: shortenAddress(query) })}
            </Combobox.Option>
          ) : (
            <li className={'option cursor-none bg-transparent hover:bg-transparent focus:ring-0'}>
              {t('autocomplete.invalid-option')}
            </li>
          )
        }
      />
      <TagManager
        tags={mapCollectionSearchableObject(selectedContracts)}
        onRemoveTag={(removedTag) => onSelectContracts?.(toggle(selectedContracts, removedTag.value))}
      />
      {!isEmpty(selectedContracts) && (
        <button
          className={clsx('rounded', 'text-white', 'p-2', 'bg-green-500')}
          onClick={() => setSelectSpecificNfts((prevState) => !prevState)}
        >
          {t('show-nft-button')}
        </button>
      )}
      {/*  TODO We should probably exclude the owners NFTs here */}
      {selectSpecificNfts && (
        <CollectionNftsFetcher
          contractAddresses={selectedContracts}
          selected={selectedNfts}
          onSelect={(nft) => onSelectNfts?.(toggle(selectedNfts, nft))}
        />
      )}
    </div>
  )
}
