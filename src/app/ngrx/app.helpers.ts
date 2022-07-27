

export function findResult<T>(items: T[], key: keyof T, value: any) {
  return items.find((item: any) => item[key].toLowerCase().includes(value.toLowerCase()));
}

