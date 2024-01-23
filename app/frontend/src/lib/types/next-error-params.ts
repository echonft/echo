export interface NextErrorParams {
  error: Error & Partial<Record<'digest', string>>
  reset: VoidFunction
}
