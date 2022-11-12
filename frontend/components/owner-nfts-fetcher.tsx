import { NftList } from '@components/nft-list'
import { Erc721 } from '@echo/model/src/erc721'
import { useGetCollectionNftsForOwner } from '@lib/services/alchemy/hooks/use-get-collection-nfts-for-owner'
import { isNil } from 'ramda'
import React from 'react'
import { useTranslations } from 'use-intl'

interface Props {
  contractAddresses: string[] | undefined
  selected?: Erc721[]
  onSelect?: (nft: Erc721) => void
}

export const OwnerNftsFetcher: React.FunctionComponent<Props> = ({ contractAddresses, selected, onSelect }) => {
  const t = useTranslations('Nfts')
  const nfts = useGetCollectionNftsForOwner(contractAddresses)
  if (isNil(nfts)) {
    return <span>{t('loading')}</span>
  }
  if (nfts.successful && nfts.data) {
    return <NftList nfts={nfts.data} selected={selected} onSelect={onSelect} />
  }
  return <span>{t('error')}</span>
}
