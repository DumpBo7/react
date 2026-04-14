"use client";

import { useState } from "react";
import styles from "@/assets/styles/carousel/Carousel.module.css";

const projects = [
    {
        id: 0,
        name: "PulseFlow",
        description:
            "AI-native scraping engine that monitors web signals and triggers LLM-summarized alerts.",
        stack: [
            "Next.js",
            "TypeScript",
            "TailwindCSS",
            "ShadcnUI",
            "Supabase",
            "Prisma",
            "Inngest",
            "Google Gemini",
        ],
        image_url: "../public/portfolio/pulseflow_thumbnail.png",
        links: [
            {
                id: 0,
                label: "Live",
                href: "https://pulseflow-sigma.vercel.app/login",
            },
            {
                id: 1,
                label: "GitHub Repository",
                href: "https://github.com/ricocatford/pulseflow",
            },
        ],
    },
    {
        id: 1,
        name: "Coinmaster",
        description:
            "A dynamic cryptocurrency dashboard with real-time data, interactive graphs, asset tracking, and SSR for performance.",
        stack: ["Next.js", "TypeScript", "Zustand", "REST API"],
        image_url: "../public/portfolio/coinmaster_thumbnail.png",
        links: [
            {
                id: 0,
                label: "Live",
                href: "https://coinmaster-delta.vercel.app",
            },
            {
                id: 1,
                label: "GitHub Repository",
                href: "https://github.com/ricocatford/coinmaster",
            },
        ],
    },
    {
        id: 2,
        name: "Blackdog Shop",
        description:
            "An eCommerce platform with image uploads, secure payment integration, and an admin panel for inventory control.",
        stack: ["Django", "MongoDB", "AWS S3", "Stripe API"],
        image_url: "../public/portfolio/blackdog_thumbnail.png",
        links: [
            {
                id: 0,
                label: "GitHub Repository",
                href: "https://github.com/ricocatford/black-dog-shop",
            },
        ],
    },
    {
        id: 3,
        name: "PizzaHub",
        description:
            "RESTful API using hexagonal architecture and JWT-based authentication. Includes complete order management.",
        stack: ["Nest.js", "TypeScript", "MySQL", "Docker"],
        image_url: "../public/portfolio/pizzahub_thumbnail.png",
        links: [
            {
                id: 0,
                label: "GitHub Repository",
                href: "https://github.com/ricocatford/shop-backend",
            },
        ],
    },
    {
        id: 4,
        name: "PizzaHub",
        description:
            "RESTful API using hexagonal architecture and JWT-based authentication. Includes complete order management.",
        stack: ["Nest.js", "TypeScript", "MySQL", "Docker"],
        image_url: "../public/portfolio/pizzahub_thumbnail.png",
        links: [
            {
                id: 0,
                label: "GitHub Repository",
                href: "https://github.com/ricocatford/shop-backend",
            },
        ],
    },
];

export default function Carousel() {
    const [activeIndex, setActiveIndex] = useState(0);

    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            setActiveIndex((prev) =>
                prev === projects.length - 1 ? 0 : prev + 1
            );
        } else if (isRightSwipe) {
            setActiveIndex((prev) =>
                prev === 0 ? projects.length - 1 : prev - 1
            );
        }
    };

    return (
        <div
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            style={{ touchAction: "none" }}
        >
            <div>
                {projects.map(
                    (project, index) =>
                        index === activeIndex && (
                            <span key={project.id}>{project.name}</span>
                        )
                )}
            </div>
            <div className={styles.container}>
                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        className={`${styles.circle} ${activeIndex === index ? styles.active : ""}`}
                        onClick={() => setActiveIndex(index)}
                    ></div>
                ))}
            </div>
        </div>
    );
}
