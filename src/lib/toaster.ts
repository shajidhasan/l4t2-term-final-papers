import { writable } from 'svelte/store';

export type ToastTone = 'success' | 'info' | 'error';

type Toast = {
	id: number;
	title: string;
	tone: ToastTone;
	duration: number;
};

const createToastStore = () => {
	const { subscribe, update } = writable<Toast[]>([]);
	let nextId = 1;

	const dismiss = (id: number) => {
		update((toasts) => toasts.filter((toast) => toast.id !== id));
	};

	const push = ({
		title,
		tone = 'info',
		duration = 2200
	}: {
		title: string;
		tone?: ToastTone;
		duration?: number;
	}) => {
		const id = nextId++;
		const toast = { id, title, tone, duration };

		update((toasts) => [...toasts, toast]);

		if (typeof window !== 'undefined') {
			window.setTimeout(() => dismiss(id), duration);
		}
	};

	return {
		subscribe,
		dismiss,
		success: ({ title, duration }: { title: string; duration?: number }) =>
			push({ title, tone: 'success', duration }),
		info: ({ title, duration }: { title: string; duration?: number }) =>
			push({ title, tone: 'info', duration }),
		error: ({ title, duration }: { title: string; duration?: number }) =>
			push({ title, tone: 'error', duration })
	};
};

export const toaster = createToastStore();
