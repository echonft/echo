export function errorMessage(error: unknown): string {
  if (typeof error === 'string') {
    return error
  }
  return (error as Error).message
}
