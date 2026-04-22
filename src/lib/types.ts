export type Question = {
	text: string;
	marks: number;
	id: string;
	topic: string;
	solution: string;
	svg?: string;
};

export type QuestionSet = {
	number: number;
	questions: Question[];
};

export type Section = {
	name: string;
	sets: QuestionSet[];
};

export type Paper = {
	sections: Section[];
};

export type CoursePaper = {
	batch: string;
	paper: Paper;
};

export type PaperCollection = {
	[courseCode: string]: CoursePaper[];
};

export interface Course {
	title: string;
	code: string;
	instructors: string;
	credits: number;
}
