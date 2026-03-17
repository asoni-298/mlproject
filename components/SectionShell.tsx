'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

type SectionShellProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

export default function SectionShell({
  id,
  eyebrow,
  title,
  description,
  children,
  className = '',
}: SectionShellProps) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-120px' }}
      variants={fadeInUp}
      className={`section-shell relative py-20 md:py-28 ${className}`}
    >
      <div className="mb-10 md:mb-14">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-cyan-300/80">
          {eyebrow}
        </p>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="section-title max-w-3xl">{title}</h2>
          {description ? <p className="section-copy">{description}</p> : null}
        </div>
      </div>
      {children}
    </motion.section>
  );
}
