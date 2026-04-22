import { persistedState } from 'svelte-persisted-state';

import type { MarkColor } from '$lib/marks';

type Marked = { [key: string]: MarkColor | undefined };

if (typeof localStorage !== 'undefined') {
	try {
		const raw = localStorage.getItem('marked');
		if (raw) {
			const parsed = JSON.parse(raw) as Record<string, string | undefined>;
			let migrated = false;
			for (const key of Object.keys(parsed)) {
				if (parsed[key] === 'G') {
					parsed[key] = 'green';
					migrated = true;
				} else if (parsed[key] === 'Y') {
					parsed[key] = 'yellow';
					migrated = true;
				}
			}
			if (migrated) localStorage.setItem('marked', JSON.stringify(parsed));
		}
	} catch {
		// ignore: corrupt localStorage entries shouldn't break the app
	}
}

export const marked = persistedState<Marked>('marked', {});
