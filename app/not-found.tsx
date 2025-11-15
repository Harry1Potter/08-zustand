import type { Metadata } from "next";
import React from "react";
import css from "./Home.module.css";

export const metadata: Metadata = {
  title: "NoteHub — Сторінку не знайдено",
  description: "Сторінка не існує або була видалена.",

  openGraph: {
    title: "NoteHub — 404 Сторінку не знайдено",
    description: "Сторінка не існує або була видалена.",
    url: "/not-found",
    images: [
      "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
    ],
  },

  alternates: {
    canonical: "/not-found",
  },
};

const NotFound = () => {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
};

export default NotFound;

