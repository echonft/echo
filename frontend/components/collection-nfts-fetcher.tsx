import { NftList } from '@components/nft-list'
import { Erc721 } from '@echo/model/erc721'
import { useGetCollectionNfts } from '@lib/services/alchemy/hooks/use-get-collection-nfts'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import React from 'react'

interface Props {
  contractAddresses: string[] | undefined
  selected?: Erc721[]
  onSelect?: (nft: Erc721) => void
}

export const CollectionNftsFetcher: React.FunctionComponent<Props> = ({ contractAddresses, selected, onSelect }) => {
  const t = useTranslations('Nfts')
  const nfts = useGetCollectionNfts(contractAddresses)
  if (isNil(nfts)) {
    return <span>{t('loading')}</span>
  }
  if (nfts.successful && nfts.data) {
    return <NftList nfts={nfts.data} selected={selected} onSelect={onSelect} />
  }
  return <span>{t('error')}</span>
}
