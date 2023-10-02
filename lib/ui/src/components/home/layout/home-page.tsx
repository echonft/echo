import { Home, HomeProps } from '@echo/ui/components/home/home'
import { Header } from '@echo/ui/components/layout/header/header'
import { AuthUser } from '@echo/ui/types/model/auth-user'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

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
