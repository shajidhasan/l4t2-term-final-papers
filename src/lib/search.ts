import MiniSearch from 'minisearch';

import type { Question } from '$lib/types';

import { papersCollection } from '$lib/papers';

const questions: (Question & { courseCode: string })[] = [];

Object.entries(papersCollection).forEach((entry) => {
	entry[1].forEach((coursePaper) => {
		coursePaper.paper.sections.forEach((section) => {
			section.sets.forEach((set) => {
				set.questions.forEach((question) => {
					questions.push({ ...question, courseCode: entry[0] });
				});
			});
		});
	});
});

const miniSearch = new MiniSearch({
	fields: ['text'],
	storeFields: ['text', 'courseCode', 'solution', 'marks', 'id']
});

miniSearch.addAll(questions);

export { miniSearch };
