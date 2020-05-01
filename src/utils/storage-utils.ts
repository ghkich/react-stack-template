export const getLocalItem = (item: string) =>
  localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item) || '{}') : ''
export const setLocalItem = (item: string, data: Record<string, any> | string) =>
  localStorage.setItem(item, JSON.stringify(data))
export const removeLocalItem = (item: string) => localStorage.removeItem(item)
