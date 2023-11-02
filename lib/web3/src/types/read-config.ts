import type { Abi } from 'viem'
import type { UseContractReadConfig } from 'wagmi'

export interface ReadConfig<T extends Abi | readonly unknown[] = Abi, U extends string = string> {
  abi: T
  functionName: U
  config: UseContractReadConfig<T, U>
}
