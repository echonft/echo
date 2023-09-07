import { HideIfNil } from '../../base/hide-if-nil'
import { InternalLink } from '../../base/internal-link'
import { ShowIfNil } from '../../base/show-if-nil'
import { EchoLogoSvg } from '../../base/svg/echo-logo-svg'
import { PaddedContainer } from '../padded-container'
import { ConnectButton } from './connect-button'
import { UserTag } from './user-tag'
import { AuthUser } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
  user?: AuthUser
  onConnectClick?: () => unknown
}

export const Header: FunctionComponent<Props> = ({ user, onConnectClick }) => {
  return (
    <header
      className={clsx('bg-dark-500', 'border', 'border-b-2', 'border-solid', 'border-black/[0.09]', 'w-full', 'h-max')}
    >
      <PaddedContainer>
        <div className={clsx('flex', 'flex-row', 'justify-between', 'items-center', 'gap-12')}>
          <InternalLink path={'/'}>
            <EchoLogoSvg width={144} />
          </InternalLink>
          <HideIfNil checks={user} render={(user) => <UserTag user={user} />} />
          <ShowIfNil checks={user}>
            <ConnectButton onConnectClick={onConnectClick} />
          </ShowIfNil>
        </div>
      </PaddedContainer>
    </header>
  )
}
