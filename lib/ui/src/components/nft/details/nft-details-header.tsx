import { links } from '../../../helpers/links'
import { InternalLink } from '../../base/internal-link'
import { DiscordIconSvg } from '../../base/svg/discord-icon-svg'
import { NftDetailsLinks, NftDetailsLinksProps } from './nft-details-links'
import { User } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

interface Props extends NftDetailsLinksProps {
  collectionName: string
  title: string | undefined
  tokenId: number
  owner: User
}

export const NftDetailsHeader: FunctionComponent<Props> = ({
  collectionName,
  tokenId,
  title,
  owner,
  openSeaUrl,
  blurUrl
}) => {
  return (
    <div className={clsx('flex', 'flex-col')}>
      <h2 className={clsx('prose-label-lg', 'text-white', 'mb-4.5', 'w-max')}>{collectionName}</h2>
      <div className={clsx('flex', 'flex-row', 'grow', 'justify-between', 'items-center', 'mb-2.5')}>
        <span className={clsx('prose-display-md-bold', 'text-white')}>{`${
          title ?? collectionName
        } #${tokenId.toString()}`}</span>
        <NftDetailsLinks openSeaUrl={openSeaUrl} blurUrl={blurUrl} />
      </div>
      <InternalLink link={links.userLink(owner.id)}>
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
            'text-white',
            'items-center'
          )}
        >
          <DiscordIconSvg width={20} />
          <span className={clsx('prose-label-lg', 'text-white')}>{owner.discordUsername}</span>
        </div>
      </InternalLink>
    </div>
  )
}
