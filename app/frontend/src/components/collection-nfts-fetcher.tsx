import { useNftsForContracts } from '@echo/alchemy-react'
import { Nft } from '@echo/model'
import { R } from '@mobily/ts-belt'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { FunctionComponent } from 'react'

interface Props {
  contractAddresses: string[] | undefined
  selected?: Nft[]
  onSelect?: (nft: Nft) => void
}

export const CollectionNftsFetcher: FunctionComponent<Props> = ({ contractAddresses }) => {
  const t = useTranslations('Nfts')
  const { isLoading, data: result } = useNftsForContracts(contractAddresses)
  if (isNil(result) || isLoading) {
    return <span>{t('loading')}</span>
  }
  // FIXME we would probably have to fetch the colletion from firestore here
  if (R.isOk(result)) {
    return null
    // return <NftList nfts={flatten(R.getExn(result)} selected={selected} onSelect={onSelect} />
  }
  return <span>{t('error')}</span>
}
