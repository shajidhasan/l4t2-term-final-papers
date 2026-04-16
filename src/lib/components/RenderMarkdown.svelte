<script lang="ts">
	import 'katex/dist/katex.min.css';

	import katex from 'katex';
	import MarkdownIt from 'markdown-it';

	const { markdown, figureFilter = false } = $props();

	const md = new MarkdownIt({ breaks: true, html: true });

	const renderMarkdown = (text: string, figureFilter: boolean) => {
		if (figureFilter) {
			const regex = /^>.*(\r?\n)?/gm;

			let removed = false;
			text = text.replace(regex, () => {
				removed = true;
				return '';
			});

			if (removed) {
				text +=
					'<div style="margin-top:0.5rem"><span style="display:inline-flex;align-items:center;border-radius:6px;border:1px solid rgba(255,255,255,0.12);background:rgba(255,255,255,0.07);padding:0.18rem 0.6rem;font-size:0.7rem;font-weight:500;letter-spacing:0.06em;text-transform:uppercase;color:#a1a1aa;">Includes Figure</span></div>';
			}
		}

		return md.render(text);
	};

	const stripHtmlTags = (str: string): string => {
		return str.replace(/<[^>]*>/g, '');
	};

	const renderEquations = (markdown: string): string => {
		// More specific regex patterns with non-greedy matching
		const dollarBlockRegex = /(?<!\\)\$\$((?:\\.|[\s\S])*?)(?<!\\)\$\$/g;
		const dollarInlineRegex = /(?<!\\)\$((?:\\.|[^$\n])+?)(?<!\\)\$/g;
		const latexBlockRegex = /\\\[([\s\S]*?)\\\]/g;
		const latexInlineRegex = /\\\(([\s\S]*?)\\\)/g;

		let html = markdown;

		html = html.replace(latexBlockRegex, (match, equation) => {
			try {
				const cleanEquation = stripHtmlTags(equation.trim());
				return katex.renderToString(cleanEquation, { displayMode: true, strict: false });
			} catch (error) {
				console.error('LaTeX block equation error:', error);
				return match;
			}
		});

		html = html.replace(dollarBlockRegex, (match, equation) => {
			try {
				const cleanEquation = stripHtmlTags(equation.trim());
				return katex.renderToString(cleanEquation, { displayMode: true, strict: false });
			} catch (error) {
				console.error('Dollar block equation error:', error);
				return match;
			}
		});

		html = html.replace(latexInlineRegex, (match, equation) => {
			try {
				const cleanEquation = stripHtmlTags(equation.trim());
				return katex.renderToString(cleanEquation, { displayMode: false, strict: false });
			} catch (error) {
				console.error('LaTeX inline equation error:', error);
				return match;
			}
		});

		html = html.replace(dollarInlineRegex, (match, equation) => {
			try {
				const cleanEquation = stripHtmlTags(equation.trim());
				return katex.renderToString(cleanEquation, { displayMode: false, strict: false });
			} catch (error) {
				console.error('Dollar inline equation error:', error);
				return match;
			}
		});

		return html;
	};

	let html = $derived(renderMarkdown(renderEquations(markdown), figureFilter));
</script>

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
{@html html}
