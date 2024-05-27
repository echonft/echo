import { formatEther as viemFormatEther } from 'viem'

export function formatEther(value: bigint): string {
  return viemFormatEther(value)
}
