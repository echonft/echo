export function chain(state: 'connected' | 'connecting' | 'disconnected') {
  return function (): number | undefined {
    if (state === 'connected') {
      return 11155111
    }
    return undefined
  }
}
