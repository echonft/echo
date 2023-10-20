import { type AuthUser } from '@echo/model/types/auth-user'
import { Home, type HomeProps } from '@echo/ui/components/home/home'
import { Header } from '@echo/ui/components/layout/header/header'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props extends HomeProps {
  user: AuthUser | undefined
}

export const HomePage: FunctionComponent<Props> = ({ user, collections, offers }) => {
  return (
    <div className={clsx('w-full', 'h-full', 'overflow-y-auto', 'relative')}>
      <Header user={user} absolute={true} />
      <main className={clsx('w-full', 'pb-14')}>
        <Home collections={collections} offers={offers} />
      </main>
    </div>
  )
}
