/**
 * Build Key-Value(s) Maps with custom config
 * @author xzl <934887857@qq.com>
 */

const toRawType = (val: unknown) => Object.prototype.toString.call(val).slice(8, -1)

const isPropertyKey = (val: unknown): val is PropertyKey => ['String', 'Number', 'Symbol'].includes(toRawType(val))

// Use lodash.pick instead
const pick = <T extends object>(target: T, keys: (keyof T)[]) => {
    return keys.reduce((dict, key) => ({ ...dict, [key]: target[key] }), {})
}

type ValidKeys<T, K extends keyof T = keyof T> = K extends K ? T[K] extends PropertyKey ? K : never : never

export function defineMap<T extends object, K extends keyof T>(defs: T[], key: K): T[K][]
export function defineMap<T extends object, K extends ValidKeys<T>, V extends keyof T>(defs: T[], key: K, values: V): Record<T[K] extends PropertyKey ? T[K] : never, T[V]>
export function defineMap<T extends object, K extends ValidKeys<T>, V extends keyof T>(defs: T[], key: K, values: V[]): Record<T[K] extends PropertyKey ? T[K] : never, Pick<T, V>>
export function defineMap<T extends object, K extends keyof T, V extends keyof T>(defs: T[], key: K, values?: V | V[]) {

    if (typeof values === 'undefined') {
        return defs.map(def => def[key])
    }

    return defs.reduce((map, def) => {
        const _key = def[key]
        if (!isPropertyKey(_key)) return map

        const _val = Array.isArray(values) ? pick(def, values) : def[values]

        return { ...map, [_key]: _val }
    }, {})
}

// example 
const enum MusicType {
    POP = "pop",
    RAP = 'rap',
    ROCK = 'rock',
}

interface MusicTypeDef {
    key: MusicType
    value: number
    name: string
    icon: string
    style: { width: number; height: number; color?: string }
}

const MusicTypeDefs: MusicTypeDef[] = [
    {
        key: MusicType.POP,
        value: 1,
        name: '流行音乐',
        icon: 'pop.svg',
        style: { width: 100, height: 100, color: 'red' }
    },
    {
        key: MusicType.RAP,
        value: 2,
        name: '说唱音乐',
        icon: 'rap.svg',
        style: { width: 100, height: 100 }
    },
    {
        key: MusicType.ROCK,
        value: 3,
        name: '摇滚音乐',
        icon: 'rock.svg',
        style: { width: 100, height: 100 }
    },
]

// list
const MusicTypeKeys = defineMap(MusicTypeDefs, 'key')
const MusicTypeValues = defineMap(MusicTypeDefs, 'value')
const MusicTypeNames = defineMap(MusicTypeDefs, 'name')
const MusicTypeIcons = defineMap(MusicTypeDefs, 'icon')

// map: key to value
const MusicTypeNameMaps = defineMap(MusicTypeDefs, 'key', 'name')
const MusicTypeIconMaps = defineMap(MusicTypeDefs, 'key', 'icon')
const MusicTypeName2IconMaps = defineMap(MusicTypeDefs, 'name', 'icon')
const MusicTypeValue2IconMaps = defineMap(MusicTypeDefs, 'value', 'icon')
const MusicTypeValue2NameMaps = defineMap(MusicTypeDefs, 'value', 'name')

// map: key to values
const MusicTypeMaps = defineMap(MusicTypeDefs, 'key', ['value', 'name', 'icon', 'style'])

export {
  MusicTypeKeys,
  MusicTypeValues,
  MusicTypeNames,
  MusicTypeIcons,
  MusicTypeNameMaps,
  MusicTypeIconMaps,
  MusicTypeName2IconMaps,
  MusicTypeValue2IconMaps,
  MusicTypeValue2NameMaps,
  MusicTypeMaps,
}


