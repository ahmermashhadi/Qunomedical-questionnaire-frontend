# Dynamic Questionnaire Frontend

A React-based frontend application for rendering and managing dynamic questionnaires based on schema-driven flow.

# Desclaimer

This frontend is built solely for the purpose of Qunomedical's technical testcase, there is no intention to use it in production.

## Features

- Dynamic question rendering
- Multiple question types support
- Conditional logic handling
- Real-time validation
- Progress saving
- Mobile-responsive design with Tailwind CSS

## Tech Stack

- React
- TypeScript
- Tailwind CSS


## Prerequisites

- Node.js >= 16.x
- npm >= 8.x

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd questionnaire-frontend
```

2. Install dependencies
```bash
npm install
```

3. Create environment file
```bash
cp .env.development.local .env
```

4. Configure environment variables
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
```

5. Start development server
```bash
npm run dev 
```


## Styling

### Tailwind CSS Configuration
The project uses Tailwind CSS for styling. Configuration can be found in `tailwind.config.ts`:

```typescript
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
```

## Development

### Running Tests
```bash
npm run test
```

### Building for Production
```bash
npm run build
```

### Code Quality
```bash
npm run lint
npm run format
```

## Error Handling

- Error boundaries for component errors
- API error handling
- Form validation errors
- Loading states


## License

This project is licensed under the MIT License - see the LICENSE file for details.
