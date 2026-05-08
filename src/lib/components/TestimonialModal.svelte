<script lang="ts">
	import { submitTestimonial } from '$lib/testimonials';

	let { open = $bindable(false), onsubmitted }: { open: boolean; onsubmitted?: () => void } =
		$props();

	let step = $state<'invite' | 'form'>('invite');
	let message = $state('');
	let studentId = $state('');
	let showId = $state(true);
	let submitting = $state(false);
	let error = $state('');

	async function submit() {
		error = '';
		if (!message.trim()) {
			error = 'Please write a message.';
			return;
		}
		if (message.trim().length > 400) {
			error = 'Message is too long (max 400 characters).';
			return;
		}
		if (showId && studentId.trim() && !/^\d{7}$/.test(studentId.trim())) {
			error = 'Student ID must be 7 digits (e.g. 2003042).';
			return;
		}
		submitting = true;
		try {
			await submitTestimonial({
				message: message.trim(),
				studentId: showId ? studentId.trim() : '',
				showId
			});
			localStorage.setItem('testimonial_submitted', '1');
			onsubmitted?.();
			open = false;
		} catch {
			error = 'Something went wrong. Please try again.';
		} finally {
			submitting = false;
		}
	}

	function close() {
		open = false;
		step = 'invite';
	}

	function dontShowAgain() {
		localStorage.setItem('testimonial_dismissed', '1');
		close();
	}
</script>

{#if open}
	<div
		class="fixed inset-0 z-50 flex items-end justify-center p-3 sm:items-center sm:p-4"
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-title"
	>
		<!-- Backdrop -->
		<button
			class="absolute inset-0 bg-black/60 backdrop-blur-sm"
			onclick={close}
			aria-label="Close"
		></button>

		<!-- Card -->
		<div class="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#1a1a1e] shadow-2xl">
			{#if step === 'invite'}
				<div class="p-5 sm:p-6">
					<h2 id="modal-title" class="text-text-primary text-lg font-semibold leading-snug">
						Are you finding this helpful?
					</h2>

					<div class="text-text-secondary mt-3 space-y-2 text-sm leading-relaxed">
						<p>
							Our time here in CUET is drawing to a close. If this archive made your exam
							prep even a little easier, I'd love it if you left a few words.
						</p>
						<p>
							Long after these years are behind us, this is something I'll want to look back on.
						</p>
					</div>
					<p class="text-text-muted mt-3 text-sm">- sh4jid</p>

					<div class="mt-5 flex flex-col gap-2">
						<button class="ui-button ui-button-primary w-full" onclick={() => (step = 'form')}>
							Leave a message
						</button>
						<button class="ui-button ui-button-secondary w-full" onclick={dontShowAgain}>
							Maybe later
						</button>
					</div>
				</div>
			{:else}
				<div class="p-5 sm:p-6">
					<button
						class="text-text-muted hover:text-text-primary mb-3 flex items-center gap-1 text-xs transition-colors"
						onclick={() => (step = 'invite')}
					>
						← Back
					</button>
					<h2 id="modal-title" class="text-text-primary text-lg font-semibold">Your message</h2>

					<div class="mt-4 space-y-4">
						<div>
							<label
								class="text-text-secondary mb-1.5 block text-xs font-medium"
								for="t-student-id"
							>
								Student ID <span class="text-text-muted font-normal">(optional)</span>
							</label>
							<input
								id="t-student-id"
								type="text"
								inputmode="numeric"
								maxlength="7"
								placeholder="2003001"
								bind:value={studentId}
								class="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/25 outline-none transition-colors focus:border-white/25 focus:bg-white/8"
							/>
						</div>

						<div>
							<label class="text-text-secondary mb-1 block text-xs font-medium" for="t-message">
								Message <span class="text-text-muted font-normal">(max 400 chars)</span>
							</label>
							<p class="text-text-muted mb-1.5 text-xs italic">
								e.g. "This was very helpful!" · "The search functionality was great." etc.
							</p>
							<textarea
								id="t-message"
								rows="4"
								maxlength="400"
								placeholder="Write your thoughts here..."
								bind:value={message}
								class="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/25 outline-none transition-colors focus:border-white/25 focus:bg-white/8"
							></textarea>
							<p class="text-text-muted mt-1 text-right text-xs">{message.length}/400</p>
						</div>

						<!-- Show ID toggle -->
						<div class="flex items-start gap-3">
							<button
								role="switch"
								aria-checked={showId}
								aria-label="Show my ID on the testimonials page"
								onclick={() => (showId = !showId)}
								class="mt-0.5 flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors duration-200 {showId
									? 'bg-white/80'
									: 'bg-white/15'}"
							>
								<span
									class="h-4 w-4 rounded-full bg-[#1a1a1e] shadow transition-transform duration-200 {showId
										? 'translate-x-4'
										: 'translate-x-0'}"
								></span>
							</button>
							<div>
								<p class="text-text-secondary text-xs font-medium">
									Show my ID on the testimonials page
								</p>
								<p class="text-text-muted mt-0.5 text-xs">
									If off, your ID will appear as <code
										class="rounded bg-white/8 px-1 text-violet-300">2003xxx</code
									>
								</p>
							</div>
						</div>

						{#if error}
							<p class="rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-400">{error}</p>
						{/if}

						<button
							class="ui-button ui-button-primary w-full disabled:opacity-50"
							onclick={submit}
							disabled={submitting}
						>
							{submitting ? 'Submitting…' : 'Submit'}
						</button>
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}
