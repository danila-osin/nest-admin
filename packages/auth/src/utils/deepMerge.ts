import { ObjLiteral } from 'interfaces';

type DeepValue = string | number | DeepObject | DeepValue[] | null | undefined;

type DeepObject = {
  [key: string]: DeepValue;
};

const isDeepObject = (value: DeepValue): value is DeepObject => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};

const mergeValues = (a: DeepValue, b: DeepValue): DeepValue => {
  if (isDeepObject(a) && isDeepObject(b)) return deepMerge(a, b);

  if (Array.isArray(a) && Array.isArray(b)) return [...a, ...b];

  if (!Array.isArray(a) && Array.isArray(b)) return [a, ...b];

  if (Array.isArray(a) && !Array.isArray(b)) return [...a, b];

  return !b ? a : b;
};

export const deepMerge = <S extends ObjLiteral, T extends ObjLiteral>(
  source: S,
  target: T
): S & T => {
  const result: any = {};
  const objectKeys = new Set<string>();

  Object.keys(source).forEach(objectKeys.add, objectKeys);
  Object.keys(target).forEach(objectKeys.add, objectKeys);

  objectKeys.forEach((key) => (result[key] = mergeValues(source[key], target[key])));

  return result;
};
