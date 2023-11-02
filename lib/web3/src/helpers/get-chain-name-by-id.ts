export function getChainNameById(chainId: number) {
  switch (chainId) {
    case 1:
      return 'Ethereum'
    case 11155111:
      return 'Sepolia'
    default:
      throw Error(`chain ${chainId} not supported`)
  }
}
