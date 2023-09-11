'use client'
import { InternalLink } from '../../base/link/internal-link'
import { EchoLogoSvg } from '../../base/svg/echo-logo-svg'
import { HideIfNil } from '../../base/utils/hide-if-nil'
import { ShowIfNil } from '../../base/utils/show-if-nil'
import { PaddedContainer } from '../padded-container'
import { ConnectButton } from './connect-button'
import { UserTag } from './user-tag'
import type { AuthUser } from '@echo/ui-model'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  user?: AuthUser
}

export const Header: FunctionComponent<Props> = ({ user }) => {
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
            <ConnectButton />
          </ShowIfNil>
        </div>
      </PaddedContainer>
    </header>
  )
}
