import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'

export function getWalletConnectProjectId() {
  const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
  if (isNilOrEmpty(projectId)) {
    throw Error('.env should contain NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID')
  }
  return projectId
}
