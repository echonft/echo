import { EchoLogoSvg } from '../../base/svg/echo-logo-svg'
import { PaddedContainer } from '../padded-container'
import { UserTag } from './user-tag'
import { User } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface HeaderProps {
  user?: User
}

// TODO connect button if user is nil
export const Header: FunctionComponent<HeaderProps> = ({ user }) => {
  return (
    <header className={clsx('bg-dark-500', 'border', 'border-b-2', 'border-solid', 'border-black/[0.09]')}>
      <PaddedContainer>
        <div className={clsx('flex', 'flex-row', 'justify-between', 'items-center', 'gap-12')}>
          <EchoLogoSvg width={144} />
          <UserTag user={user!} />
        </div>
      </PaddedContainer>
    </header>
  )
}
