export type MarkColor = 'green' | 'yellow' | 'red' | 'blue' | 'purple';

export const MARK_ORDER: MarkColor[] = ['green', 'yellow', 'red', 'blue', 'purple'];

type MarkMeta = {
	label: string;
	dotClass: string;
	badgeClass: string;
	badgeStrongClass: string;
};

export const MARK_META: Record<MarkColor, MarkMeta> = {
	green: {
		label: 'Solved',
		dotClass: 'bg-emerald-400 hover:bg-emerald-300',
		badgeClass:
			'bg-gradient-to-br from-emerald-400 to-emerald-600 border-emerald-300 text-white font-bold shadow-sm shadow-emerald-500/50 [text-shadow:_0_1px_2px_rgba(0,0,0,0.5)]',
		badgeStrongClass:
			'bg-gradient-to-br from-emerald-400 to-emerald-600 border-emerald-300 text-white font-bold shadow-sm shadow-emerald-500/50 [text-shadow:_0_1px_2px_rgba(0,0,0,0.5)]'
	},
	yellow: {
		label: 'Revisit',
		dotClass: 'bg-amber-400 hover:bg-amber-300',
		badgeClass:
			'bg-gradient-to-br from-amber-400 to-amber-600 border-amber-300 text-white font-bold shadow-sm shadow-amber-500/50 [text-shadow:_0_1px_2px_rgba(0,0,0,0.6)]',
		badgeStrongClass:
			'bg-gradient-to-br from-amber-400 to-amber-600 border-amber-300 text-white font-bold shadow-sm shadow-amber-500/50 [text-shadow:_0_1px_2px_rgba(0,0,0,0.6)]'
	},
	red: {
		label: 'Difficult',
		dotClass: 'bg-red-400 hover:bg-red-300',
		badgeClass:
			'bg-gradient-to-br from-red-400 to-red-600 border-red-300 text-white font-bold shadow-sm shadow-red-500/50 [text-shadow:_0_1px_2px_rgba(0,0,0,0.5)]',
		badgeStrongClass:
			'bg-gradient-to-br from-red-400 to-red-600 border-red-300 text-white font-bold shadow-sm shadow-red-500/50 [text-shadow:_0_1px_2px_rgba(0,0,0,0.5)]'
	},
	blue: {
		label: 'Bookmark',
		dotClass: 'bg-blue-400 hover:bg-blue-300',
		badgeClass:
			'bg-gradient-to-br from-blue-400 to-blue-600 border-blue-300 text-white font-bold shadow-sm shadow-blue-500/50 [text-shadow:_0_1px_2px_rgba(0,0,0,0.5)]',
		badgeStrongClass:
			'bg-gradient-to-br from-blue-400 to-blue-600 border-blue-300 text-white font-bold shadow-sm shadow-blue-500/50 [text-shadow:_0_1px_2px_rgba(0,0,0,0.5)]'
	},
	purple: {
		label: 'Review later',
		dotClass: 'bg-purple-400 hover:bg-purple-300',
		badgeClass:
			'bg-gradient-to-br from-purple-400 to-purple-600 border-purple-300 text-white font-bold shadow-sm shadow-purple-500/50 [text-shadow:_0_1px_2px_rgba(0,0,0,0.5)]',
		badgeStrongClass:
			'bg-gradient-to-br from-purple-400 to-purple-600 border-purple-300 text-white font-bold shadow-sm shadow-purple-500/50 [text-shadow:_0_1px_2px_rgba(0,0,0,0.5)]'
	}
};

export const UNMARKED_BADGE = 'text-text-muted border-white/9 bg-white/4';
export const UNMARKED_BADGE_STRONG = 'text-text-muted border-white/10 bg-white/5';
