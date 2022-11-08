import { cloneDeep } from 'lodash-es';
import { Store } from 'pinia';

export interface CustomStore extends Store {
    /** script setup custom reset */
    $custom_reset: () => void
}

export function resetStore({ store }: any) {
    const initialState = cloneDeep(store.$state)
    store.$custom_reset = () => store.$patch(cloneDeep(initialState))
}
