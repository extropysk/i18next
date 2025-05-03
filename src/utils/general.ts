export const runsOnServerSide = () => {
  return typeof globalThis === 'undefined'
}
