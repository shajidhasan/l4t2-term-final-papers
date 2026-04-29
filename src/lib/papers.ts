import type { PaperCollection } from '$lib/types';

import ME463 from '$lib/data/me463.json';
import ME421 from '$lib/data/me421.json';
import ME411 from '$lib/data/me411.json';

export const papersCollection: PaperCollection = {
	ME463,
	ME421,
	ME411
};

export function getCourseData(courseId: string) {
	return papersCollection[courseId as keyof typeof papersCollection] || [];
}

export function getAvailableBatches(courseId: string): string[] {
	const courseData = getCourseData(courseId);
	return courseData.map((paper) => paper.batch).sort((a, b) => parseInt(b) - parseInt(a));
}
