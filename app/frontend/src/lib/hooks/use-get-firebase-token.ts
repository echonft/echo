import { ApiRoutes, FirebaseTokenResponse } from '@echo/api'
import { getUrl } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import useSWR from 'swr'

export function useGetFirebaseToken(isLogged: boolean) {
  const { data } = useSWR<R.Result<FirebaseTokenResponse, Error>, Error>(
    isLogged ? ApiRoutes.GET_FIREBASE_TOKEN : undefined,
    (url: string) => getUrl<FirebaseTokenResponse>(url)
  )
  return data
}
