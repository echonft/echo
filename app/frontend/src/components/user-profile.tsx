import { AddWalletButton } from '@components/add-wallet-button'
import { Redirect } from '@components/redirect'
import { useUser } from '@lib/hooks/use-user'
import { isNil } from 'ramda'
import React from 'react'

export const UserProfile: React.FunctionComponent = () => {
  const user = useUser()
  if (isNil(user)) {
    // TODO Add callback?
    return <Redirect to={'/login'} />
  }
  return <AddWalletButton user={user} />
}
