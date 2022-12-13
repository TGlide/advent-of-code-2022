export function at<T>(array: T[], index: number) {
  const len = array.length;
  if (!len) return undefined;

  if (index < 0) index += len;

  return array[index];
}

export function sum(arr: number[]) {
  return arr.reduce((acc, curr) => acc + curr, 0);
}

export function multiply(arr: number[]) {
  return arr.reduce((acc, curr) => acc * curr, 1);
}

export function unique<T>(arr: T[]) {
  return [...new Set(arr)];
}

export function invertMatrix<T>(matrix: T[][]): T[][] {
  const res: T[][] = [];

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (!res[j]) res[j] = [];
      res[j][i] = matrix[i][j];
    }
  }

  return res;
}

// function that receives a matrix, and transforms the arrays inside so that they
// are all the same length (excluding nulls), adding nulls to the start of the arrays
// that are shorter than the longest array
export function normalizeMatrix<T>(matrix: T[][]): T[][] {
  const maxLength = Math.max(
    ...matrix.map((row) => row.filter(Boolean).length)
  );

  return matrix.map((row) => {
    const diff = maxLength - row.filter(Boolean).length;
    return [...Array(diff).fill(null), ...row.filter(Boolean)];
  });
}

export function range(start: number, stop: number, step = 1) {
  const res = [];
  for (let i = start; i < stop; i += step) {
    res.push(i);
  }
  return res;
}

export function splitInChunks<T>(arr: T[], chunkSize: number) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    res.push(arr.slice(i, i + chunkSize));
  }
  return res;
}

export function remove<T>(arr: T[], index: number) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}
