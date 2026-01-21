# Mega Office Supplies - Shopify Theme

A custom Shopify theme for the Mega Office Supplies store.

## Prerequisites

- Node.js (see .nvmrc for version)
- Shopify CLI
- AWS CLI (for environment setup)

## Setup

1. Clone the repository
2. Use the correct Node.js version (check .nvmrc file):
   ```
   # Using nvm (Node Version Manager)
   nvm use
   # Or check the version in .nvmrc and install it manually
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Get environment configuration:
   ```
   npm run get_env
   ```
5. Configure the shopify.theme.toml file:
   - Review the downloaded TOML configuration file
   - Adjust any settings if necessary for your development environment
   - Make sure your store credentials and theme IDs are correct

## Development

Start the development server and webpack in watch mode:
```
npm start
```

This will:
- Run the Shopify theme development server
- Watch for changes in JS files and rebuild with webpack
- Run linting in watch mode

## Deployment

Deployment should be done using one of the following methods:

### 1. Using Release Branches

Create and push a `release/` branch to trigger automatic deployment through the pipeline.

### 2. Bitbucket Pipeline

Trigger deployment directly from the Bitbucket pipeline interface.

## Project Structure

- `assets/`: Theme assets (CSS, JS, images)
- `blocks/`: Theme blocks
- `sections/`: Theme sections
- `snippets/`: Theme snippets
- `templates/`: Theme templates
- `src/`: Source files for development
  - `js/`: JavaScript source files
  - `scss/`: SCSS style files

## Development Guidelines

### SCSS Best Practices
- Try to utilize pre-defined variables from the SCSS folder for:
  - Breakpoints
  - Colours
  - Typography/Fonts
  - Other global variables
- This ensures consistency across the theme and makes future updates easier

### Theme Customization
- Try to utilize the Shopify theme customizer as much as possible
- Create theme settings for any elements that merchants may need to customize

### Performance Optimization
- Ensure custom scripts and styles are loaded ONLY on pages where they're used
- Use the distribution system in `snippets/page-map-js.liquid` and `snippets/page-map-style.liquid` to manage page-specific assets
- This reduces page load time and improves overall performance

## Built With

- Shopify Liquid
- Webpack
- SASS
- ESLint & Prettier
