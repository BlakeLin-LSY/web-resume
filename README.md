# Personal Resume Website - SSU-YUAN LIN (Blake)

This repository contains the source code for Blake Lin's personal resume website. It's a modern, responsive portfolio built with Next.js, React, and Tailwind CSS, designed to showcase professional experience, skills, and education.

**Live Site:** [https://blakelin-lsy.github.io/web-resume/](https://blakelin-lsy.github.io/web-resume/)

## Features

-   **Responsive Design:** Adapts seamlessly to all device sizes (desktops, tablets, and mobiles).
-   **Dark/Light Mode:** Toggle between dark and light themes, with system preference detection.
-   **Smooth Animations & Transitions:** Engaging user experience with animations powered by Framer Motion.
-   **Interactive UI Elements:** Modern and clean user interface.
-   **Contact Integration:** Contact form opens the user's default email client.
-   **Section-based Navigation:** Easy navigation through different parts of the resume.
-   **Built with Modern Technologies:** Leverages Next.js for server-side rendering and static site generation, React for building UI components, and Tailwind CSS for styling.

## Resume Sections Overview

The website is structured into the following main sections:

1.  **Hero:** Personal introduction and contact details.
2.  **About:** A concise professional summary.
3.  **Skills:** A categorized list of technical skills and proficiencies.
4.  **Experience:** Detailed descriptions of work history and projects.
5.  **Education:** Information on academic background and qualifications.
6.  **Contact:** Contact information and a form to initiate email communication.

## Technical Stack

-   **Framework:** Next.js 14
-   **Library:** React 18
-   **Styling:** Tailwind CSS
-   **Animations:** Framer Motion
-   **Icons:** Lucide React
-   **Theme Management:** next-themes

## Local Development

To run this website locally for development or testing:

1.  **Clone the repository (if you haven't already):**
    ```bash
    git clone https://github.com/blakelin-lsy/web-resume.git
    cd web-resume
    ```

2.  **Navigate to the application directory and install dependencies:**
    ```bash
    cd app
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  Open your browser and visit [http://localhost:3000](http://localhost:3000) to see the site.

## Deployment

This site is automatically deployed to GitHub Pages using GitHub Actions whenever changes are pushed to the `main` branch.

-   **Workflow Configuration:** The deployment process is defined in `.github/workflows/deploy.yml`.
-   **Next.js Configuration for GitHub Pages:**
    The `app/next.config.js` file is configured for static export suitable for GitHub Pages. Key settings include `output: 'export'`, and potentially `basePath` and `assetPrefix` if the site is hosted in a subdirectory of a domain (e.g., `your-username.github.io/repository-name`). For this project, `basePath: "/web-resume"` and `assetPrefix: "/web-resume"` are used.
-   The `.nojekyll` file in the root of the repository ensures GitHub Pages serves the Next.js static export correctly without trying to process it with Jekyll.

You can monitor deployment progress in the "Actions" tab of the GitHub repository.

## Making Changes

To make changes to your resume website:

1.  Edit the files locally within the `app` directory.
2.  Commit your changes:
    ```bash
    git add .
    git commit -m "Your descriptive commit message"
    ```
3.  Push your changes to the `main` branch on GitHub:
    ```bash
    git push origin main
    ```
The GitHub Actions workflow will automatically build and deploy your changes to the live site.

## License

This project is open source and available under the terms of the [MIT License](LICENSE).
