import { persistedState } from 'svelte-persisted-state';

type Marked = { [key: string]: 'G' | 'Y' | undefined };

export const marked = persistedState<Marked>('marked', {});
