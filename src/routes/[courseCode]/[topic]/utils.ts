import type { Question, QuestionSet } from '$lib/types';

import { papersCollection } from '$lib/papers';
import { slugify } from '$lib/utilities';

export const getTopicNameFromSlug = (slug: string, courseCode: string): string | undefined => {
	const papers = papersCollection[courseCode];
	if (!papers) return undefined;

	for (const paper of papers) {
		for (const section of paper.paper.sections) {
			for (const set of section.sets) {
				for (const question of set.questions) {
					if (slugify(question.topic) === slug) return question.topic;
				}
			}
		}
	}

	return undefined;
};

export const getGroupsByTopic = (slug: string, courseCode: string) => {
	const questions: Question[] = [];
	const papers = papersCollection[courseCode];

	if (!papers) return [];

	papers.forEach((paper) => {
		paper.paper.sections.forEach((section) => {
			section.sets.forEach((set) => {
				set.questions.forEach((question) => {
					if (slugify(question.topic) === slug) {
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

export const getSetsByTopic = (slug: string, courseCode: string) => {
	const setList: string[] = [];
	const papers = papersCollection[courseCode];

	if (!papers) return [];

	papers.forEach((paper) => {
		paper.paper.sections.forEach((section) => {
			section.sets.forEach((set) => {
				set.questions.forEach((question) => {
					if (slugify(question.topic) === slug) {
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
