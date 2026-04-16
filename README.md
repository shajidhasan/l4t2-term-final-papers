# CUET ME L4T2 - Term Final Papers Archive

**It's Live Here:** [https://l4t2.sh4jid.me](https://l4t2.sh4jid.me)

---

## About

As a mechanical engineering student, preparing for term finals often meant digging through scattered question papers from previous batches. I needed a better way to browse, search, and study from past exam questions efficiently. This project solves that problem by creating a centralized, searchable archive of previous term final papers.

Built by [sh4jid](https://sh4jid.me) for CUET ME students and anyone who might find it useful.

## Features

- Full-text search across questions and solutions with course filtering
- Browse questions by engineering topics and course codes
- Comprehensive solutions with KaTeX-rendered mathematical formulas
- Mark questions as studied with persistent state
- Responsive design for mobile and desktop use
- Built with SvelteKit, TypeScript, and Tailwind CSS
- Client-side search powered by MiniSearch

## Courses Included

| Course Code | Course Title          | Credits | Instructors                                      |
| ----------- | --------------------- | ------- | ------------------------------------------------ |
| **ME463**   | Industrial Management | 4       | Dr. M. S. Rabbi, Dr. A. S. M. Sayem, A. A. Mamun |

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/shajidhasan/l4t2-term-final-papers.git
   cd l4t2-term-final-papers
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start the development server**

   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
pnpm build
pnpm preview
```

## Fork for Your Own Course

Want to create a similar archive for your own course or university? Here's how:

### 1. Fork the Repository

Click the "Fork" button on GitHub to create your own copy.

### 2. Update Course Information

- Edit [`src/lib/courses.ts`](src/lib/courses.ts) with your course details
- Update the course codes, titles, and instructor information

### 3. Prepare Your Data

You'll need to convert your question papers into the required JSON format. Each course should have a JSON file in [`src/lib/data/`](src/lib/data/) with this structure:

```json
[
	{
		"batch": "19",
		"paper": {
			"sections": [
				{
					"name": "A",
					"sets": [
						{
							"number": 1,
							"questions": [
								{
									"text": "Your question text here",
									"marks": 10,
									"id": "COURSE-BATCH-SET-QUESTION",
									"topic": "Topic Name",
									"solution": "Detailed solution in markdown format"
								}
							]
						}
					]
				}
			]
		}
	}
]
```

### 4. Use an LLM for Data Conversion

**Important:** You'll need to use a Large Language Model (like ChatGPT, Claude, or Gemini) to parse your existing question papers and convert them into the required JSON format. The LLM can help you:

- Extract questions from PDF or image files
- Structure the data according to the schema
- Generate the unique IDs for each question
- Format solutions in markdown with proper mathematical notation

### 5. Update Imports

- Add your new course data files to [`src/lib/papers.ts`](src/lib/papers.ts)
- Update the imports and exports accordingly

### 6. Customize Branding

- Update the title and metadata in [`src/routes/+page.svelte`](src/routes/+page.svelte)
- Modify the footer and any university-specific information
- Update the favicon and other static assets in the [`static/`](static/) directory

### 7. Deploy

Deploy your customized version to platforms like Vercel, Netlify, or GitHub Pages.

## Project Structure

```
src/
├── lib/
│   ├── components/          # Reusable Svelte components
│   ├── data/               # Course question papers (JSON)
│   ├── assets/             # Fonts and static assets
│   ├── courses.ts          # Course definitions
│   ├── papers.ts           # Paper data management
│   ├── search.ts           # Search functionality
│   ├── types.ts            # TypeScript type definitions
│   └── utilities.ts        # Helper functions
├── routes/
│   ├── +page.svelte        # Home page
│   ├── [courseCode]/       # Course-specific pages
│   └── debug/              # Debug utilities
└── app.html                # Main HTML template
```

## Technologies Used

- **Framework:** SvelteKit 2.x with TypeScript
- **UI Library:** Skeleton UI + Tailwind CSS
- **Search:** MiniSearch for client-side full-text search
- **Math Rendering:** KaTeX for mathematical formulas
- **Markdown:** markdown-it for rich text rendering
- **Icons:** Lucide
- **State Management:** Svelte 5 runes + persisted state

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- CUET Mechanical Engineering Department
- Previous batch seniors who shared their question papers
- The open-source community for the amazing tools and libraries
