import { cloneDeep } from 'lodash-es';

export function resetStore({ store }: any) {
    const initialState = cloneDeep(store.$state)
    store.$setup_reset = () => store.$patch(cloneDeep(initialState))
}
