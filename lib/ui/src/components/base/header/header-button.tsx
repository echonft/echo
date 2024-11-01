'use client'
import type { User } from '@echo/model/types/user'
import { HeaderDiscord } from '@echo/ui/components/base/header/header-discord'
import { HeaderWalletButton } from '@echo/ui/components/base/header/header-wallet-button'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  user: Nullable<User>
}

export const HeaderButton: FunctionComponent<Props> = ({ user }) => {
  return (
    <div className={clsx('flex', 'flex-row', 'gap-4', 'h-max', 'w-max')}>
      <HeaderWalletButton user={user} />
      <HeaderDiscord user={user} />
    </div>
  )
}
