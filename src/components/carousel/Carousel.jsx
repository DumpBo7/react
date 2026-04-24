"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
    NextButton,
    PrevButton,
    usePrevNextButtons,
} from "./CarouselArrowButtons";
import { DotButton, useDotButton } from "./CarouselDotButton";

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

const EmblaCarousel = (props) => {
    const { options } = props;
    const [emblaRef, emblaApi] = useEmblaCarousel(options);

    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi);

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    } = usePrevNextButtons(emblaApi);

    return (
        <div className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {projects.map((project) => (
                        <div className="embla__slide" key={project.id}>
                            <div className="embla__slide__number">
                                <span>{project.id + 1}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="embla__controls">
                <div className="embla__buttons">
                    <PrevButton
                        onClick={onPrevButtonClick}
                        disabled={prevBtnDisabled}
                    />
                    <NextButton
                        onClick={onNextButtonClick}
                        disabled={nextBtnDisabled}
                    />
                </div>

                <div className="embla__dots">
                    {scrollSnaps.map((_, index) => (
                        <DotButton
                            key={index}
                            onClick={() => onDotButtonClick(index)}
                            className={"embla__dot".concat(
                                index === selectedIndex
                                    ? " embla__dot--selected"
                                    : ""
                            )}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EmblaCarousel;
