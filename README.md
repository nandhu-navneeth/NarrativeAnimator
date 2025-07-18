# Narrative Animator

This is an AI-powered application that transforms your stories into visual and narrated scenes. Simply enter your narrative, and the app will generate images and voiceovers for each sentence, creating a dynamic storyboard that you can play like a movie.

## ✨ Features

-   **AI-Powered Storytelling:** Automatically converts text into visual scenes with corresponding narration.
-   **Sentence-by-Sentence Scene Generation:** Each sentence in your story becomes a unique scene.
-   **Customizable AI Prompts:** Fine-tune the style of generated images and narration through advanced settings.
-   **Background Music:** Choose from a selection of background music tracks to set the mood.
-   **Full Story Playback:** Combine all generated scenes into a seamless movie with subtitles and music.
-   **Interactive Storyboard:** View and manage each scene individually.

## 🚀 Getting Started

To get this project running on your local machine, follow these steps.

### Prerequisites

-   Node.js (v18 or later)
-   An API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up your environment variables:**
    Create a new file named `.env` in the root of your project and add your Google AI API key:
    ```
    GOOGLE_API_KEY=YOUR_API_KEY_HERE
    ```

4.  **Run the Genkit development server:**
    Open a terminal and run the following command to start the Genkit AI flows:
    ```bash
    npm run genkit:watch
    ```

5.  **Run the Next.js development server:**
    In a second terminal, run this command to start the application:
    ```bash
    npm run dev
    ```

The application should now be running on [http://localhost:9002](http://localhost:9002).

## 🛠️ Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/)
-   **AI:** [Google AI & Genkit](https://firebase.google.com/docs/genkit)
-   **UI:** [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/), [ShadCN UI](https://ui.shadcn.com/)
