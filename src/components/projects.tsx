"use client";
import { Link2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { type Post } from "~/lib/notion";
import { motion } from "framer-motion";

export const Projects = ({ projects }: { projects: Post[] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
        delay: 0.3,
      }}
    >
      <h2 className="mb-4 text-sm dark:text-grey-lab">Side projects</h2>
      <div className="flex flex-col justify-start gap-4 md:flex-row">
        {projects?.map((project) => {
          const projectDescription =
            project?.properties?.Description?.rich_text?.[0]?.text?.content ??
            "";

          return (
            <Link
              href={project?.properties?.URL?.url ?? ""}
              target="_blank"
              key={project.id}
              className="flex cursor-pointer flex-row items-center gap-4 rounded-lg border bg-gray-50 p-4 transition-all hover:bg-gray-100 dark:border-grey-border dark:bg-grey-subtle hover:dark:bg-grey-hover/60"
            >
              <div>
                <h2>
                  {project?.properties?.Name?.title?.[0]?.text?.content ?? ""}
                </h2>

                <p className="text-sm">
                  {projectDescription?.length > 60
                    ? projectDescription?.slice(0, 60) + "..."
                    : projectDescription}
                </p>
              </div>
              <Link2 className="-rotate-45" />
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
};
