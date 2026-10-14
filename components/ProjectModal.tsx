"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa6";
import { ExternalLink, X } from "lucide-react";
import { useLang } from "@/lib/language";
import type { Project } from "@/types";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const { t } = useLang();
  const overview =
    project.overview && project.overview.trim()
      ? project.overview
      : project.description;
  const features = project.features ?? [];
  const highlights = project.highlights ?? [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-slate-900/60 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        className="my-8 w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
      >
        {project.image_url && (
          <div className="relative aspect-[16/9] w-full bg-slate-100">
            <Image
              src={project.image_url}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 672px"
              className="object-cover"
            />
          </div>
        )}

        <button
          onClick={onClose}
          aria-label={t("projects.close")}
          className="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-slate-600 shadow-md transition-colors hover:text-slate-900"
        >
          <X size={20} />
        </button>

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-bold text-slate-900">{project.title}</h2>
            {project.featured && (
              <span className="rounded-full bg-indigo-600 px-2.5 py-1 text-xs font-semibold text-white">
                {t("projects.featured")}
              </span>
            )}
            {project.period && (
              <span className="text-sm font-medium text-slate-400">{project.period}</span>
            )}
          </div>

          {project.role && (
            <p className="mt-1 text-sm font-semibold text-indigo-600">{project.role}</p>
          )}

          <p className="mt-2 text-sm leading-relaxed text-slate-500">{project.description}</p>

          <div className="mt-6">
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">
              {t("projects.aboutProject")}
            </h3>
            <p className="mt-2 leading-relaxed text-slate-600">{overview}</p>
          </div>

          {features.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                {t("projects.mainFeatures")}
              </h3>
              <ul className="mt-2 space-y-1.5">
                {features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-indigo-500" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {highlights.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                {t("projects.impact")}
              </h3>
              <ul className="mt-2 space-y-1.5">
                {highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.tags.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">
                {t("projects.techStack")}
              </h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-600"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {(project.link || project.repo) && (
            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-6">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
                >
                  <ExternalLink size={16} /> {t("projects.liveDemo")}
                </a>
              )}
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-indigo-600"
                >
                  <FaGithub size={16} /> {t("projects.viewCode")}
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
