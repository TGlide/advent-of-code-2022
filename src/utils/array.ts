export function at<T>(array: T[], index: number) {
  const len = array.length;
  if (!len) return undefined;

  if (index < 0) index += len;

  return array[index];
}

export function sum(arr: number[]) {
  return arr.reduce((acc, curr) => acc + curr, 0);
}

export function unique<T>(arr: T[]) {
  return [...new Set(arr)];
}
