'use client'

import { Github, ExternalLink, Wrench } from "lucide-react";

type ProjectCardProps = {
  title: string;
  category: 'Web' | 'Infra' | 'Mobile';
  description: string;
  inspiration?: string;
  inspirationLink?: string;
  image: string;
  technologies: string[];
  githubLink?: string;         // Frontend
  backendGithubLink?: string; // Backend
  externalLink?: string;
  technicalLink?: string; // <- nouveau lien
  reverse?: boolean;
};

export default function ProjectCard({
  title,
  category,
  description,
  inspiration,
  inspirationLink,
  image,
  technologies,
  githubLink,
  backendGithubLink,
  externalLink,
  technicalLink,
  reverse = false,
}: ProjectCardProps) {
  return (
    <div
      className={`flex flex-col ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      } items-center gap-8 mb-20`}
    >
      <div className="w-full md:w-1/2 relative">
        <img src={image} alt={title} className="rounded shadow-lg" />
      </div>

      <div className="w-full md:w-1/2 space-y-4 relative">
        <p className="text-[var(--highlight)] text-sm">{category}</p>
        <h3 className="text-2xl font-bold text-[var(--text-main)]">
          {title}
        </h3>

        <div className="bg-[var(--card-bg)] p-4 rounded-md shadow text-[var(--text-main)] transition-colors duration-1000">
          <p>{description}</p>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-2">
          <p className="text-sm text-[var(--highlight)]">
            {technologies.map((tech, index) => (
              <span key={index} className="mr-2">
                {tech}
              </span>
            ))}
          </p>

          <div className="flex gap-4">
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--highlight)] text-[var(--icon-color)]"
              >
                <Github />
              </a>
            )}
            {backendGithubLink && (
              <a
                href={backendGithubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--highlight)] text-[var(--icon-color)]"
              >
                <Github />
              </a>
            )}
            {externalLink && (
              <a
                href={externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--highlight)] text-[var(--icon-color)]"
              >
                <ExternalLink />
              </a>
            )}
            {technicalLink && (
              <a
                href={technicalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--highlight)] text-[var(--icon-color)]"
              >
                <Wrench />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
