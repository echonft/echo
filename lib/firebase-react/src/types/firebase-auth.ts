import { Auth, UserCredential } from 'firebase/auth'

export interface FirebaseAuth {
  auth: Auth
  signIn: (auth: Auth, customToken: string) => Promise<UserCredential>
}
