import { type NftTokenType } from '@echo/model/types/nft-token-type'
import { NftDetailsTokenDetailsPanelRow } from '@echo/ui/components/nft/details/nft-details-token-details-panel-row'
import { getChainNameById } from '@echo/web3/helpers/get-chain-name-by-id'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

interface Props {
  chainId: number
  tokenId: number
  tokenType: NftTokenType
}

export const NftDetailsTokenDetailsPanel: FunctionComponent<Props> = ({ chainId, tokenType, tokenId }) => {
  const t = useTranslations()
  return (
    <div className={clsx('flex', 'flex-col', 'flex-none', 'w-[33rem]', 'rounded-2xl', 'bg-white/[0.09]')}>
      <h1
        className={clsx(
          'prose-header-sm-semi',
          'text-white/50',
          'p-5',
          'rounded-t-2xl',
          'border-b-2',
          'border-solid',
          'border-white/[0.09]'
        )}
      >
        {t('nft.details.tokenDetails.title')}
      </h1>
      <div className={clsx('flex', 'flex-col', 'w-full', 'rounded-b-2xl', 'gap-5', 'p-5')}>
        <NftDetailsTokenDetailsPanelRow name={t('nft.details.tokenDetails.tokenId')} value={tokenId.toString()} />
        <NftDetailsTokenDetailsPanelRow
          name={t('nft.details.tokenDetails.blockchain')}
          value={getChainNameById(chainId)}
        />
        <NftDetailsTokenDetailsPanelRow name={t('nft.details.tokenDetails.tokenType')} value={tokenType} />
      </div>
    </div>
  )
}
