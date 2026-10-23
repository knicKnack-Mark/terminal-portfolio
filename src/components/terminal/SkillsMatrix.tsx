"use client";

import { useMemo, useState } from "react";
import {
  SKILL_CATEGORIES,
  SKILLS,
  type SkillCategory,
} from "./skillsData";

type SkillsMatrixProps = {
  initialCategory?: SkillCategory;
  onClose?: () => void;
};

export default function SkillsMatrix({
  initialCategory = "all",
  onClose,
}: SkillsMatrixProps) {
  const [activeCategory, setActiveCategory] =
    useState<SkillCategory>(initialCategory);

  const [selectedSkill, setSelectedSkill] =
    useState<string>("");

  const visibleSkills = useMemo(() => {
    if (activeCategory === "all") {
      return SKILLS;
    }

    return SKILLS.filter(
      (skill) => skill.category === activeCategory,
    );
  }, [activeCategory]);

  const selected = SKILLS.find(
    (skill) => skill.name === selectedSkill,
  );

  const currentCategory = SKILL_CATEGORIES.find(
    (category) => category.id === activeCategory,
  );

  return (
    <section className="skills-matrix" aria-label="Skills matrix">
      <header className="skills-matrix__header">
        <div>
          <p className="skills-matrix__eyebrow">
            <span className="skills-matrix__status" />
            SYSTEM MODULE / 02
          </p>

          <h2>TECHNOLOGY MATRIX</h2>

          <p className="skills-matrix__subtitle">
            A categorized overview of tools and technical experience.
          </p>
        </div>

        {onClose && (
          <button
            type="button"
            className="skills-matrix__close"
            onClick={onClose}
            aria-label="Close skills matrix"
          >
            [ CLOSE ]
          </button>
        )}
      </header>

      <div className="skills-matrix__stats">
        <div className="skills-matrix__stat">
          <span>TECHNOLOGIES</span>
          <strong>{SKILLS.length.toString().padStart(2, "0")}</strong>
        </div>

        <div className="skills-matrix__stat">
          <span>CATEGORIES</span>
          <strong>
            {String(SKILL_CATEGORIES.length - 1).padStart(2, "0")}
          </strong>
        </div>

        <div className="skills-matrix__stat">
          <span>STATUS</span>
          <strong className="skills-matrix__online">AVAILABLE</strong>
        </div>
      </div>

      <nav
        className="skills-matrix__filters"
        aria-label="Filter skills by category"
      >
        {SKILL_CATEGORIES.map((category) => (
          <button
            type="button"
            key={category.id}
            className={
              activeCategory === category.id
                ? "skills-matrix__filter is-active"
                : "skills-matrix__filter"
            }
            onClick={() => {
              setActiveCategory(category.id);
              setSelectedSkill("");
            }}
            aria-pressed={activeCategory === category.id}
          >
            {category.label}
          </button>
        ))}
      </nav>

      <div className="skills-matrix__section-heading">
        <div>
          <span className="skills-matrix__index">/ 01</span>
          <h3>{currentCategory?.label ?? "ALL SYSTEMS"}</h3>
        </div>

        <p>{currentCategory?.description}</p>
      </div>

      <div className="skills-matrix__grid">
        {visibleSkills.map((skill, index) => (
          <button
            type="button"
            key={skill.name}
            className={
              selectedSkill === skill.name
                ? "skills-matrix__card is-selected"
                : "skills-matrix__card"
            }
            onClick={() =>
              setSelectedSkill((current) =>
                current === skill.name ? "" : skill.name,
              )
            }
            aria-expanded={selectedSkill === skill.name}
          >
            <span className="skills-matrix__card-top">
              <span>
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="skills-matrix__card-indicator">
                {selectedSkill === skill.name ? "−" : "+"}
              </span>
            </span>

            <strong>{skill.name}</strong>

            <span className="skills-matrix__card-category">
              {skill.category.replace("-", " ").toUpperCase()}
            </span>

            <span className="skills-matrix__card-hint">
              {selectedSkill === skill.name
                ? "HIDE DETAILS"
                : "VIEW DETAILS"}
            </span>
          </button>
        ))}
      </div>

      {selected && (
        <article className="skills-matrix__detail">
          <div className="skills-matrix__detail-heading">
            <div>
              <span className="skills-matrix__index">
                SELECTED TECHNOLOGY
              </span>
              <h3>{selected.name}</h3>
            </div>

            <span className="skills-matrix__detail-status">
              MODULE ACTIVE
            </span>
          </div>

          <p>{selected.description}</p>

          <div className="skills-matrix__tags">
            {selected.technologies.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
        </article>
      )}

      <footer className="skills-matrix__footer">
        <span>NEIL@PORTFOLIO</span>
        <span>
          {visibleSkills.length.toString().padStart(2, "0")} RECORDS FOUND
        </span>
      </footer>
    </section>
  );
}