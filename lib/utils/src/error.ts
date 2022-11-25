export function errorMessage(error: unknown): string {
  return (error as Error).message
}
