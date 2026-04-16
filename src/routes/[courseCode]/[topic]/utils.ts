import type { Question, QuestionSet } from '$lib/types';

import { papersCollection } from '$lib/papers';

export const deslugified = (s: string): string => {
	if (s === 'cnc_programming_&_technology') return 'CNC Programming & Technology';
	if (s === 'cpm') return 'CPM';
	if (s === 'ppc') return 'PPC';
	if (s === 'scm') return 'SCM';
	if (s === 'mrp') return 'MRP';
	if (s === 'pert') return 'PERT';
	if (s === 'mps') return 'MPS';
	const result = s
		.split('_')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');

	return result;
};

export const getGroupsByTopic = (topic: string, courseCode: string) => {
	const questions: Question[] = [];
	const papers = papersCollection[courseCode];

	if (!papers) return [];

	papers.forEach((paper) => {
		paper.paper.sections.forEach((section) => {
			section.sets.forEach((set) => {
				set.questions.forEach((question) => {
					if (question.topic === topic) {
						questions.push(question);
					}
				});
			});
		});
	});

	const groups: { batch: string; questions: Question[] }[] = [];

	questions.forEach((question) => {
		const batch = question.id.split('-')[1];

		const group = groups.find((group) => group.batch === batch);
		if (group) {
			group.questions.push(question);
		} else {
			const newGroup = {
				batch,
				questions: [question]
			};
			groups.push(newGroup);
		}
	});

	groups.sort((a, b) => b.batch.localeCompare(a.batch));

	return groups;
};

export const getSetsByTopic = (topic: string, courseCode: string) => {
	const setList: string[] = [];
	const papers = papersCollection[courseCode];

	if (!papers) return [];

	papers.forEach((paper) => {
		paper.paper.sections.forEach((section) => {
			section.sets.forEach((set) => {
				set.questions.forEach((question) => {
					if (question.topic === topic) {
						const setId = question.id.substring(0, 10);
						if (!setList.includes(setId)) {
							setList.push(setId);
						}
					}
				});
			});
		});
	});

	const loaded: string[] = [];
	const sets: (QuestionSet & { batch: string })[] = [];

	papers.forEach((paper) => {
		paper.paper.sections.forEach((section) => {
			section.sets.forEach((set) => {
				const setId = set.questions[0].id.substring(0, 10);

				if (setList.includes(setId) && !loaded.includes(setId)) {
					const s = { ...set, batch: set.questions[0].id.split('-')[1] };
					sets.push(s);
					loaded.push(setId);
				}
			});
		});
	});

	sets.sort((a, b) => b.batch.localeCompare(a.batch));

	return sets;
};
