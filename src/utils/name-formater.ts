export function nameFormater(link: string): string {
  if (link.includes('www.')) {
    return link.split('.')[1]
  }
  return link.slice(link.indexOf('//') + 2).split('.')[0]
}
