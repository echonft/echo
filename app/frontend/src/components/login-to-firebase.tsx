import { useSignInWithFirebase } from '@echo/firebase-react'
import { R } from '@mobily/ts-belt'
import { FunctionComponent } from 'react'

interface Props {
  firebaseToken: string
}
export const LoginToFirebase: FunctionComponent<Props> = ({ firebaseToken }) => {
  const { data, error } = useSignInWithFirebase(firebaseToken)
  if (data) {
    const response = R.getExn(data)
    return <>{JSON.stringify(response)}</>
  }
  if (error) {
    return <>Error logging in with firebase</>
  }
  return <>Login with Firebase...</>
}
