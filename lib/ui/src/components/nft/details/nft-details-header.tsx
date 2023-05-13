import { DiscordIconSvg } from '../../base/svg/discord-icon-svg'
import { NftDetailsLinks, NftDetailsLinksProps } from './nft-details-links'
import { User } from '@echo/model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface NftDetailsHeaderProps extends NftDetailsLinksProps {
  collectionName: string
  title: string | undefined
  tokenId: bigint
  owner: User
}

export const NftDetailsHeader: FunctionComponent<NftDetailsHeaderProps> = ({
  collectionName,
  tokenId,
  title,
  owner,
  openSeaUrl,
  blurUrl
}) => {
  return (
    <div className={clsx('flex', 'flex-col', 'grow')}>
      <h2 className={clsx('prose-label-lg', 'text-white', 'mb-4.5', 'w-max')}>{collectionName}</h2>
      <div className={clsx('flex', 'flex-row', 'grow', 'justify-between', 'items-center', 'mb-2.5')}>
        <span className={clsx('prose-display-md-bold', 'text-white')}>{`${
          title ?? collectionName
        } #${tokenId.toString()}`}</span>
        <NftDetailsLinks openSeaUrl={openSeaUrl} blurUrl={blurUrl} />
      </div>
      <div
        className={clsx(
          'flex',
          'flex-row',
          'w-max',
          'gap-2.5',
          'py-1.5',
          'px-4',
          'rounded-lg',
          'bg-purple-500',
          'text-white'
        )}
      >
        <DiscordIconSvg width={20} />
        <span className={clsx('prose-label-lg', 'text-white')}>{owner.discordUsername}</span>
      </div>
    </div>
  )
}
