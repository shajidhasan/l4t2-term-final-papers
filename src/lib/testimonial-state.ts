export function getTestimonialStatus() {
	if (typeof localStorage === 'undefined') return { submitted: false, dismissed: false };
	return {
		submitted: localStorage.getItem('testimonial_submitted') === '1',
		dismissed: localStorage.getItem('testimonial_dismissed') === '1'
	};
}
