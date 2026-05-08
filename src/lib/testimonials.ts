import { collection, addDoc, getDocs, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';

export interface Testimonial {
	id: string;
	message: string;
	studentId: string;
	showId: boolean;
	createdAt: Date;
}

export async function submitTestimonial(data: {
	message: string;
	studentId: string;
	showId: boolean;
}) {
	await addDoc(collection(db, 'testimonials'), {
		message: data.message,
		studentId: data.studentId,
		showId: data.showId,
		createdAt: serverTimestamp()
	});
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
	const q = query(collection(db, 'testimonials'), orderBy('createdAt', 'asc'));
	const snapshot = await getDocs(q);
	return snapshot.docs.map((doc) => ({
		id: doc.id,
		message: doc.data().message as string,
		studentId: doc.data().studentId as string,
		showId: doc.data().showId as boolean,
		createdAt: doc.data().createdAt?.toDate() ?? new Date()
	}));
}
