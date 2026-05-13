export const slugify = (topic: string | undefined): string =>
	(topic ?? '').replaceAll(' ', '_').toLowerCase();

export const debounce = <T extends (...args: never[]) => void>(
	func: T,
	delay: number
): ((...args: Parameters<T>) => void) => {
	let timer: ReturnType<typeof setTimeout> | null = null;

	return (...args: Parameters<T>) => {
		if (timer) clearTimeout(timer);

		timer = setTimeout(() => {
			func(...args);
		}, delay);
	};
};

export const GRADIENTS = [
	'from-emerald-600 to-teal-700',
	'from-blue-600 to-purple-700',
	'from-red-500 to-pink-600',
	'from-orange-500 to-red-600',
	'from-green-600 to-emerald-700',
	'from-purple-600 to-indigo-700',
	'from-teal-600 to-cyan-700',
	'from-amber-600 via-orange-600 to-red-700',
	'from-indigo-600 to-blue-700',
	'from-pink-500 to-rose-600',
	'from-emerald-600 to-green-700',
	'from-violet-500 to-purple-800',
	'from-cyan-600 to-blue-700',
	'from-rose-500 to-pink-600',
	'from-amber-600 to-orange-700',
	'from-fuchsia-600 to-pink-700',
	'from-lime-600 to-green-700',
	'from-sky-600 to-indigo-700',
	'from-slate-600 to-gray-700',
	'from-green-600 via-teal-600 to-blue-700',
	'from-red-600 via-pink-600 to-purple-700',
	'from-orange-600 via-red-600 to-pink-700',
	'from-purple-500 via-indigo-500 to-blue-600'
];

const hashString = (str: string): number => {
	let hash = 58;
	if (str.length === 0) return hash;

	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash = hash & hash;
	}

	return Math.abs(hash);
};

export const getGradientForString = (input: string): string => {
	if (!input || typeof input !== 'string') {
		return GRADIENTS[0]; // Default fallback
	}

	const hash = hashString(input);
	const index = hash % GRADIENTS.length;

	return `bg-gradient-to-br ${GRADIENTS[index]} text-white`;
};
