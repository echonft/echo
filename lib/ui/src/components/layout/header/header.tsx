'use client'
import { InternalLink } from '@echo/ui/components/base/link/internal-link'
import { EchoLogoSvg } from '@echo/ui/components/base/svg/echo-logo-svg'
import { HideIfNil } from '@echo/ui/components/base/utils/hide-if-nil'
import { ShowIfNil } from '@echo/ui/components/base/utils/show-if-nil'
import { ConnectButton } from '@echo/ui/components/layout/header/connect-button'
import { DisconnectButton } from '@echo/ui/components/layout/header/disconnect-button'
import { PaddedContainer } from '@echo/ui/components/layout/padded-container'
import { clsx } from 'clsx'
import { useSession } from 'next-auth/react'
import type { FunctionComponent } from 'react'

export const Header: FunctionComponent = () => {
  const { data: session } = useSession()

  return (
    <header
      className={clsx('bg-dark-500', 'border', 'border-b-2', 'border-solid', 'border-black/[0.09]', 'w-full', 'h-max')}
    >
      <PaddedContainer>
        <div className={clsx('flex', 'flex-row', 'justify-between', 'items-center', 'gap-12')}>
          <InternalLink path={'/'}>
            <EchoLogoSvg width={144} />
          </InternalLink>
          <HideIfNil checks={session} render={(session) => <DisconnectButton user={session.user} />} />
          <ShowIfNil checks={session}>
            <ConnectButton />
          </ShowIfNil>
        </div>
      </PaddedContainer>
    </header>
  )
}
