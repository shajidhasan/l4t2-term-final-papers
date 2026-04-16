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
	'from-green-500 to-teal-600',
	'from-blue-600 to-purple-700',
	'from-red-500 to-pink-600',
	'from-green-500 to-teal-600',
	'from-orange-500 to-red-600',
	'from-purple-600 to-indigo-700',
	'from-teal-500 to-cyan-600',
	'from-yellow-500 via-orange-500 to-red-600',
	'from-indigo-600 to-blue-700',
	'from-pink-500 to-rose-600',
	'from-emerald-500 to-green-600',
	'from-violet-400 to-purple-800',
	'from-cyan-500 to-blue-600',
	'from-rose-500 to-pink-600',
	'from-amber-500 to-orange-600',
	'from-lime-500 to-green-600',
	'from-fuchsia-600 to-pink-700',
	'from-sky-500 to-indigo-600',
	'from-slate-600 to-gray-700',
	'from-red-600 via-pink-600 to-purple-700',
	'from-green-600 via-teal-600 to-blue-700',
	'from-orange-600 via-red-600 to-pink-700',
	'from-purple-500 via-indigo-500 to-blue-600'
];

const hashString = (str: string): number => {
	let hash = 0;
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
