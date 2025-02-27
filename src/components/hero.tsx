"use client";
import Image from "next/image";
import React from "react";
import { Divider } from "./divider";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export const Hero = () => {
  const { theme } = useTheme();
  return (
    <div className="flex flex-col gap-8">
      <Image
        alt="me"
        src="/me.jpg"
        width={120}
        className="rounded-full"
        height={120}
      />
      <motion.h1
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
      >
        Francisco Veiras
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
          delay: 0.1,
        }}
      >
        Developer. Creator of experiences and web interfaces. Nerd. Passionate
        about software. Constantly learning.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
          delay: 0.1,
        }}
      >
        <Divider color={theme === "dark" ? "#B7B7B7" : "#464646"} />
      </motion.div>
    </div>
  );
};
