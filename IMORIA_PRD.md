# Product Requirements Document (PRD) - IMORIA Portfolio

## 1. Project Overview
**Project Name:** IMORIA Portfolio
**Brand Name:** IMORIA
**Author/Developer:** Freeway.jr
**Concept:** A highly interactive 3D "Book Flip" personal portfolio. Users navigate by turning pages like a physical book.
**Vibe:** Professional, Modern, Interactive, Clean, "Wow Effect".

## 2. Tech Stack
* **Framework:** React (Vite) - for performance and component modularity.
* **Styling:** Tailwind CSS - for rapid UI development and clean styling.
* **Animation/Interactivity:** * `react-pageflip` (or similar library) for the realistic page-turning physics.
    * Framer Motion (for micro-interactions within pages).
* **Icons:** Lucide React or React Icons (FontAwesome/Heroicons).
* **Deployment:** Vercel / Netlify.

## 3. Brand Identity
* **Logo:** IMORIA (Image file provided later).
* **Primary Color:** Cyan/Electric Blue (Accent) - `#00A3FF` (To be adjusted based on preference).
* **Background:** Clean White/Off-White paper texture for pages; Dark or Blurred background for the app container to make the book pop.
* **Typography:** Modern Sans-Serif (e.g., Poppins for headers, Inter for text).

## 4. Site Structure (Book Pages)
The book consists of 3 sheets (6 pages total including covers) or similar structure.

* **Cover / Page 1 (Right): Intro & Profile**
    * Photo: Circular headshot of Freeway.jr.
    * Text: "Freeway.jr", "Web Developer".
    * Actions: "Download CV", "Contact Me".
    * Socials: LinkedIn, GitHub, etc.

* **Page 2 (Left): Experience**
    * Vertical Timeline with blue dots.
    * Role, Company, Date, Description.
* **Page 3 (Right): Education**
    * Vertical Timeline (mirroring Page 2).
    * Degree, University, Date.

* **Page 4 (Left): Skills & Services**
    * Top: Skills Grid (Icons with borders).
    * Bottom: Services Cards (Icon + Title + "Read More").
* **Page 5 (Right): Projects & Contact**
    * Top: Featured Project (iMac mockup image + Tech stack + Buttons).
    * Bottom: Embedded Contact Form.

## 5. Mobile Responsiveness Strategy
* **Desktop:** 3D Open Book view (Two pages visible).
* **Mobile:** Since book flips are hard on mobile, fallback to a vertical scroll or a single-page flip stack card design. *Priority is Desktop functionality first.*

## 6. Implementation Steps
1.  Setup React + Vite + Tailwind.
2.  Install `react-pageflip`.
3.  Create the `Book` container layout.
4.  Develop reusable components (`Timeline`, `SkillBox`, `ProjectCard`).
5.  Implement individual pages (1 through 5).
6.  Add polish (shadows, paper texture, animations).