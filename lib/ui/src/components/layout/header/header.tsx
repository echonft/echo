import { User } from '../../../types/user'
import { EchoLogoSvg } from '../../base/svg/echo-logo-svg'
import { PaddedContainer } from '../padded-container'
import { HeaderSearchInput } from './header-search-input'
import { UserTag } from './user-tag'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface HeaderProps {
  user?: User
  onSearchQueryChange?: (query: string) => never
}

// TODO connect button if user is nil
export const Header: FunctionComponent<HeaderProps> = ({ user, onSearchQueryChange }) => {
  return (
    <header className={clsx('bg-dark-500', 'border', 'border-b-2', 'border-solid', 'border-black/[0.09]')}>
      <PaddedContainer>
        <div className={clsx('flex', 'flex-row', 'justify-between', 'items-center', 'gap-12')}>
          <EchoLogoSvg width={144} />
          <div
            className={clsx(
              'flex',
              'flex-row',
              'grow',
              'justify-center',
              'max-w-[20rem]',
              'lg:max-w-[32rem]',
              'xl:max-w-[38rem]'
            )}
          >
            <HeaderSearchInput onChange={onSearchQueryChange} />
          </div>
          <UserTag user={user!} />
        </div>
      </PaddedContainer>
    </header>
  )
}
