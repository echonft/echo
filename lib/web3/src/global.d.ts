import type {
  Abi,
  ContractEventName,
  Transport,
  WatchContractEventOnLogsParameter,
  WatchContractEventParameters as viemWatchContractEventParameters
} from 'viem'

declare module 'viem' {
  export interface WatchContractEventParameters<
    abi extends Abi | readonly unknown[] = Abi,
    eventName extends ContractEventName<abi> | undefined = ContractEventName<abi>,
    strict extends boolean | undefined = undefined,
    transport extends Transport = Transport
  > extends viemWatchContractEventParameters<abi, eventName, strict, transport> {
    onLogs: (logs: WatchContractEventOnLogsParameter<abi, eventName, strict>) => void | Promise<void>
  }
}

export {}
