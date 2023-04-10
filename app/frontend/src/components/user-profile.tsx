import { useDiscordGuild } from '@echo/firebase-react'
import { useUser } from '@lib/hooks/use-user'
import { R } from '@mobily/ts-belt'
import { isNil } from 'ramda'
import { FunctionComponent } from 'react'

export const UserProfile: FunctionComponent = () => {
  const user = useUser()
  const { isLoading, data: result } = useDiscordGuild('Y8GBFtPZKElp44z0k10D')
  console.log(`user result is ${JSON.stringify(user)} discord guild is ${JSON.stringify(result)}`)
  if (isNil(user)) {
    return <>Loading user...</>
  }
  if (R.isError(user)) {
    R.tapError((error) => console.log(`error from useUser ${error}`))(user)
    return <>Error on user</>
    // TODO Add callback?
    // return <Redirect to={'/login'} />
  }
  console.log(`will display user`)
  return <>Got data</>
}
