import type { GetAccountReturnType } from 'wagmi/actions'

export type AccountStatus = Exclude<GetAccountReturnType['status'], 'reconnecting'>
