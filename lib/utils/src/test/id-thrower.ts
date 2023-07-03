export const idThrower = (id: string) => {
  if (id === 'throw') {
    throw new Error('Error')
  }
  return
}
