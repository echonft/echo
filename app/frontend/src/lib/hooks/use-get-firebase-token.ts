import { FirebaseTokenResponse } from '@echo/api/dist/types/models/responses/firebase-token-response'
import { ApiRoutes } from '@echo/api/dist/types/routes'
import { getUrl } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { useSession } from 'next-auth/react'
import { isNil } from 'ramda'
import useSWR from 'swr'

export function useGetFirebaseToken() {
  const { data: session } = useSession()
  const { data } = useSWR<R.Result<FirebaseTokenResponse, Error>, Error>(
    !isNil(session) ? ApiRoutes.GET_FIREBASE_TOKEN : undefined,
    (url: string) => getUrl<FirebaseTokenResponse>(url)
  )
  return data
}
