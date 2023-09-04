export function getChainNameById(chainId: number) {
  switch (chainId) {
    case 1:
      return 'Ethereum'
    default:
      throw Error(`chain ${chainId} not supported`)
  }
}
