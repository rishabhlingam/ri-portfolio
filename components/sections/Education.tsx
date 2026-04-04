"use client";

import { motion } from "framer-motion";
import Section from "@/components/layout/Section";
import HeadingDivider from "@/components/ui/HeadingDivider";
import { formatYear } from "@/lib/utils";

const fallbackEducation = [
  {
    institution: "Massachusetts Institute of Technology",
    degree: "M.S.",
    field: "Computer Science",
    graduationDate: "2020-05-01",
    gpa: "4.9/5.0",
    description: "Focus on machine learning and distributed systems.",
  },
  {
    institution: "University of California, Berkeley",
    degree: "B.S.",
    field: "Electrical Engineering & Computer Science",
    graduationDate: "2018-05-01",
    gpa: "3.9/4.0",
    description: "Graduated with High Distinction. CS Division honor roll.",
  },
];

interface EducationProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any[];
}

export default function Education({ data }: EducationProps) {
  const education = data || fallbackEducation;

  return (
    <Section id="education">
      <div className="max-w-5xl mx-auto px-10 md:px-20">
        <div className="mb-12">
          <p className="text-xs text-white tracking-[0.4em] uppercase mb-3">05</p>
          <h2 className="text-3xl md:text-4xl font-light text-white">Education</h2>
        </div>
        <HeadingDivider className="mb-12" />
        <div>
          {education.map((edu, i) => (
            <motion.div
              key={`${edu.institution}-${i}`}
              className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4 md:gap-12 py-10 border-b border-white/5 last:border-0"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div>
                <p className="text-xs text-white tracking-wide">{formatYear(edu.graduationDate)}</p>
                {edu.gpa && <p className="text-xs text-white mt-1">GPA: {edu.gpa}</p>}
              </div>
              <div>
                <h3 className="text-lg font-light text-white">{edu.degree} · {edu.field}</h3>
                <p className="text-sm text-white mt-0.5">{edu.institution}</p>
                {edu.description && <p className="text-sm text-white mt-3">{edu.description}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
