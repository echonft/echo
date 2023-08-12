/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NftDetailsTokenDetailsPanelRow } from './nft-details-token-details-panel-row'
import { TokenType } from '../../../../../ui-model'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

export interface NftDetailsTokenDetailsPanelProps {
  chainId: number
  tokenId: number
  tokenType: TokenType
}

export const NftDetailsTokenDetailsPanel: FunctionComponent<NftDetailsTokenDetailsPanelProps> = ({
  chainId,
  tokenType,
  tokenId
}) => {
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
          // @ts-ignore
          value={t(`chain.name.id${chainId}`)}
        />
        <NftDetailsTokenDetailsPanelRow name={t('nft.details.tokenDetails.tokenType')} value={tokenType} />
      </div>
    </div>
  )
}
