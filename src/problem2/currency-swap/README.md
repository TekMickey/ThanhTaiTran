# Currency Swap Application

This is a Currency Swap application built with React, TypeScript, Tailwind CSS, and React Select. The application allows users to swap between different currencies using the latest exchange rates fetched from a remote API.

## Features

- Swap between various currencies using real-time exchange rates
- Dynamic dropdowns with currency icons
- Input validation to ensure proper data entry
- Responsive design using Tailwind CSS
- Clean and user-friendly interface

## Installation

1. Clone the repository:

   git clone https://github.com/TekMickey/ThanhTaiTran.git
   cd ./ThanhTaiTran/src/problem2/currency-swap/

2. Install dependencies:

   npm install

3. Start the development server:

   npm start

This will run the app in development mode. Open http://localhost:3000 to view it in the browser.

## Dependencies

    React
    TypeScript
    Tailwind CSS
    React Select
    Axios

## Project Structure

    src/
    components/
        FormField.tsx
        SwapForm.tsx
    hooks/
        useTokenData.ts
    styles/
        index.css
    App.tsx
    index.tsx
    App.css
    tailwind.config.js

## Components

- FormField.tsx: A reusable form field component that handles both text input and select input with currency icons.
- SwapForm.tsx: The main component that handles the logic and UI for the currency swap form.

## Hooks

- useTokenData.ts: Custom hook for fetching and managing token price data from a remote API.

## Styles

- index.css: Contains Tailwind CSS imports and custom styles.
- ReactSelect.css: Custom styles for React Select components.

## Usage

1. Select the currencies you want to swap from the dropdown menus.
2. Enter the amount you want to swap.
3. Click the "Swap" button to see the conversion result.

## Customization

- To add more currencies or change the API endpoint, update the useTokenData.ts hook.
- To customize the styles, update the corresponding CSS files or Tailwind classes in the components.

## Troubleshooting

If you encounter any issues related to dependency conflicts, you can try removing the node_modules directory and package-lock.json file, and then reinstalling the dependencies:

    Remove-Item -Recurse -Force node_modules
    Remove-Item package-lock.json
    npm install --legacy-peer-deps
