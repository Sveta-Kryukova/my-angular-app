# My Angular App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 20.2.1.

## Description

A modern Angular application for browsing spaceflight news with search functionality and infinite scroll. The app demonstrates best practices in Angular development using standalone components, reactive programming with RxJS, and responsive design.

## Features

- 🔍 **Article Search** - Real-time filtering by keywords
- ♾️ **Infinite Scroll** - Automatic loading of new articles on scroll
- 📱 **Responsive Design** - Mobile-first approach with support for all devices
- 🎨 **Modern UI** - Clean and intuitive interface
- ⚡ **High Performance** - Optimized loading and caching
- 🖼️ **Image Handling** - Automatic fallback to default images on errors
- 🎯 **State Management** - Reactive state management with RxJS

## Technologies

- Angular 20.2.0
- Angular Material 20.2.1
- TypeScript 5.9.2
- RxJS 7.8.0
- SCSS - CSS preprocessor with variables and mixins
- Spaceflight News API - Data source

## Installation and Setup

### Prerequisites

Make sure you have installed:

- Node.js (version 18 or higher)
- npm

### Install Dependencies

```bash
npm install
```

### Run the Application

```bash
npm start
```

The application will be available at `http://localhost:4200/`. It will automatically reload when you change any of the source files.

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Available Scripts

| Command         | Description                                       |
| --------------- | ------------------------------------------------- |
| `npm start`     | Start development server on http://localhost:4200 |
| `npm run build` | Build project for production                      |
| `npm run watch` | Build in watch mode                               |
| `npm test`      | Run unit tests                                    |

## Project Structure

```
src/
├── app/
│   ├── components/           # Application components
│   │   ├── article-page/     # Article detail page
│   │   ├── button/           # Reusable button component
│   │   ├── card/             # Article card component
│   │   ├── homepage/         # Home page
│   │   └── search/           # Search component
│   ├── constants/            # Application constants
│   ├── guards/               # Route guards
│   ├── helpers/              # Helper functions
│   ├── interfaces/           # TypeScript interfaces
│   └── services/             # Services
├── assets/                   # Static resources
│   ├── icons/               # Icons
│   └── images/              # Images
└── scss/                    # SCSS styles
    ├── _variables.scss      # Variables
    ├── _mixins.scss         # Mixins
    └── _base.scss           # Base styles
```

## Key Components

### HomepageComponent

- Displays article list with infinite scroll
- Integrated search functionality
- Responsive card grid layout

### ArticlePageComponent

- Detailed article view
- Back navigation
- Error handling for failed loads

### CardComponent

- Reusable article card
- Search result highlighting
- Image error handling

### SearchComponent

- Real-time search functionality
- Keyword filtering

## Configuration

### API Settings

```typescript
// src/app/constants/app.constants.ts
export const API_CONFIG = {
  BASE_URL: 'https://api.spaceflightnewsapi.net/v4',
  LIMIT: 20,
  // ...
};
```

### UI Settings

```typescript
export const UI_CONFIG = {
  INFINITE_SCROLL_THRESHOLD: 100,
  SCROLL_THRESHOLD: 100,
  // ...
};
```

## Styling

The project uses SCSS with modular architecture:

- **Variables** - Centralized color and size management
- **Mixins** - Reusable styles (breakpoints, flexbox)
- **Mobile-first** - Responsive design with progressive enhancement

### Breakpoints

```scss
$breakpoint-mobile: 0;
$breakpoint-tablet: 768px;
$breakpoint-desktop: 1024px;
```

## Performance Optimizations

- **OnPush Change Detection** - Optimized change detection
- **Lazy Loading** - Lazy loading for images
- **Caching** - Article and search query caching
- **Tree Shaking** - Dead code elimination
- **Bundle Optimization** - Optimized build output

## Search Functionality

Search works on the following criteria:

- Article title
- Article content
- Multiple keyword support
- Automatic loading of additional results

## Responsive Design

- **Mobile** (0-767px) - Single column grid
- **Tablet** (768-1023px) - Two column grid
- **Desktop** (1024px+) - Three column grid

## Error Handling

- **Network Errors** - Graceful fallback
- **Image Errors** - Default image fallback
- **API Errors** - User-friendly error messages
- **Navigation Errors** - Redirect to home page

## Development

To run the application in development mode with automatic reloading:

```bash
npm run watch
```

## Testing

To run tests:

```bash
npm test
```

## Code Quality

The project follows Angular best practices:

- Standalone components
- Reactive programming with RxJS
- TypeScript strict mode
- SCSS modular architecture
- Mobile-first responsive design

## Deployment

### Production Build

```bash
npm run build
```

## Author

Svitlana Kryukova - [GitHub](https://github.com/Sveta-Kryukova)

## Live Demo

🚀 [View Live Demo](https://YOUR_USERNAME.github.io/my-angular-app/)

## Deployment

This project is automatically deployed to GitHub Pages on every push to the main branch.
