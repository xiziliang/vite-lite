/* eslint-disable no-shadow */
interface Array<T> {
  // https://github.com/tc39/proposal-array-find-from-last
  findLast<S extends T>(predicate: (this: void, value: T, index: number, obj: T[]) => value is S, thisArg?: any): S | undefined;
  findLast(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): T | undefined;
  findLastIndex(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): number;

  // https://github.com/tc39/proposal-array-grouping
  group<K extends PropertyKey>(callbackfn: (this: void, value: T, index: number, obj: T[]) => S): Record<K, T[]>;
  groupToMap<K>(callbackfn: (this: void, value: T, index: number, obj: T[]) => K): Map<K, T[]>;
}

interface Window {
  // https://html.spec.whatwg.org/multipage/structured-data.html#dom-structuredclone
  structuredClone<T>(value: T, transfer?: Transferable[]): T;
}

interface ObjectConstructor {
  hasOwn(o: any, key: PropertyKey): boolean;
}

interface Map<K, V> {
  // https://github.com/tc39/proposal-upsert
  emplace(key: K, entry: {
    insert?(key: K, map: Map<K, V>): V;
    update?(existing: V, key: K, map: Map<K, V>): V;
  });
}

// https://github.com/tc39/proposal-iterator-helpers
// eg. new Set([1, 2, 3, 4, 5, 6]).values().drop(2).filter(x => x % 2 === 0).map(x => x / 2).toArray() // => [2, 3]
interface Iterator<T, TReturn = any, TNext = undefined> {
  asIndexedPairs(): Iterator<[number, T]>;
  drop(limit: number): Iterator<T>;
  every(callbackfn: (value: T) => boolean): boolean;
  filter(callbackfn: (value: T) => boolean): Iterator<T, TReturn, TNext>;
  find(callbackfn: (value: T) => boolean): any;
  flatMap(callbackfn: (value: T) => Iterable<T>): Iterator<T, TReturn, TNext>;
  forEach(callbackfn: (value: T) => void): void;
  map<R>(callbackfn: (value: T) => R): Iterator<R, TReturn, TNext>;
  reduce<R>(callbackfn: (memo: R, value: T) => any, initialValue: R): R;
  some(callbackfn: (value: T) => boolean): boolean;
  take(limit: number): Iterator<T, TReturn, TNext>;
  toArray(): T[];
  [Symbol.toStringTag]: 'Iterator';
}

interface IteratorConstructor {
  static from<T>(iterable: Iterable<T>): Iterator<T, TReturn, TNext>;
}
declare const Iterator: IteratorConstructor;

interface AsyncIterator<T, TReturn = any, TNext = undefined> {
  static from(iterable: Iterable<T>): AsyncIterator<T, TReturn, TNext>;
  asIndexedPairs(): AsyncIterator<[number, T], TReturn, TNext>;
  drop(limit: number): AsyncIterator<T>;
  every(callbackfn: (value: T) => boolean | PromiseLike<boolean>): Promise<boolean>;
  filter(callbackfn: (value: T) => boolean | PromiseLike<boolean>): AsyncIterator<T, TReturn, TNext>;
  find(callbackfn: (value: T) => boolean | PromiseLike<boolean>): Promise<T>;
  flatMap(callbackfn: (value: T) => Iterable<T> | PromiseLike<T>): AsyncIterator<T, TReturn, TNext>;
  forEach(callbackfn: (value: T) => void | PromiseLike<void>): Promise<void>;
  map<R>(callbackfn: (value: T) => R | PromiseLike<R>): AsyncIterator<R, TReturn, TNext>;
  reduce<R>(callbackfn: (memo: R, value: any) => R | PromiseLike<R>, initialValue: R): Promise<R>;
  some(callbackfn: (value: T) => boolean | PromiseLike<boolean>): Promise<boolean>;
  take(limit: number): AsyncIterator<any, TReturn, TNext>;
  toArray(): Promise<T[]>;
}

interface AsyncIteratorConstructor {
  static from<T>(iterable: Iterable<T>): Iterator<T, TReturn, TNext>;
}
declare const AsyncIterator: AsyncIteratorConstructor;

interface Jquery {
  [key: string]: any;
}

declare const jquery: Jquery;
