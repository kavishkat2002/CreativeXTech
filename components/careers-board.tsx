"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Bot,
  Briefcase,
  Cpu,
  Layers,
  MapPin,
  Search,
} from "lucide-react";

import type { JobPost } from "@/lib/careers";
import { staticJobs } from "@/lib/careers";
import { getSupabaseClient } from "@/lib/supabase-client";

const DEPARTMENT_ICONS: Record<string, typeof Cpu> = {
  "AI & Agents": Bot,
  "Product Engineering": Cpu,
  "Design & UX": Layers,
};

export function CareersBoard({ initialJobs }: { initialJobs: JobPost[] }) {
  const [jobs, setJobs] = useState<JobPost[]>(
    initialJobs.length > 0 ? initialJobs : staticJobs
  );
  const [activeDepartment, setActiveDepartment] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    async function loadLiveJobs() {
      try {
        const client = await getSupabaseClient();
        const { data, error } = await client
          .from("jobs")
          .select("*")
          .order("number", { ascending: true });
        if (!error && Array.isArray(data) && data.length > 0) {
          const published = data.filter((j: JobPost) => j.published !== false);
          if (published.length > 0) {
            setJobs(published);
          }
        }
      } catch {
        // Keep initialJobs fallback
      }
    }
    loadLiveJobs();
  }, []);

  const departments = useMemo(() => {
    const unique = Array.from(new Set(jobs.map((j) => j.department).filter(Boolean)));
    return ["All", ...unique];
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return jobs.filter((job) => {
      if (activeDepartment !== "All" && job.department !== activeDepartment) {
        return false;
      }
      if (query) {
        const haystack = [
          job.title,
          job.department,
          job.location,
          job.summary,
          job.description,
          ...(job.required_skills ?? []),
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });
  }, [jobs, activeDepartment, searchQuery]);

  return (
    <section
      id="open-roles"
      className="careers-board-section"
      aria-labelledby="careers-board-title"
    >
      <div className="site-width">
        <div className="careers-board-head">
          <div>
            <p className="section-index">
              Open positions / {String(filteredJobs.length).padStart(2, "0")}
            </p>
            <h2 id="careers-board-title">Build systems that ship.</h2>
          </div>

          <div className="careers-controls">
            <div className="careers-search-box">
              <Search size={15} aria-hidden="true" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search roles, skills, or stack..."
                aria-label="Search open positions"
              />
            </div>
          </div>
        </div>

        {/* Department filter pills */}
        <div className="careers-filters" role="group" aria-label="Filter by department">
          {departments.map((dept) => (
            <button
              key={dept}
              type="button"
              aria-pressed={activeDepartment === dept}
              className={activeDepartment === dept ? "active" : ""}
              onClick={() => setActiveDepartment(dept)}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length === 0 ? (
          <div className="careers-empty">
            <Briefcase size={28} />
            <h3>No matching roles found.</h3>
            <p>
              Try clearing your search or department filter, or reach out via our contact page for speculative AI &amp; engineering introductions.
            </p>
            <div className="careers-empty-actions">
              <button
                type="button"
                onClick={() => {
                  setActiveDepartment("All");
                  setSearchQuery("");
                }}
              >
                Reset filters
              </button>
              <Link href="/contact">
                Send open application <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        ) : (
          <div className="careers-card-grid">
            {filteredJobs.map((job, index) => {
              const Icon = DEPARTMENT_ICONS[job.department] ?? Briefcase;
              const isFeatured = index === 0 && activeDepartment === "All" && !searchQuery;

              return (
                <Link
                  key={job.slug}
                  href={`/careers/${job.slug}`}
                  className={`career-card ${isFeatured ? "career-card-featured" : ""}`}
                >
                  <div className="career-card-visual" aria-hidden="true">
                    {job.media_url ? (
                      <>
                        <img
                          src={job.media_url}
                          alt={job.title}
                          className="career-card-cover-img"
                        />
                        <div className="career-card-img-scrim" />
                      </>
                    ) : (
                      <>
                        <Icon />
                        <span className="career-card-orbit" />
                      </>
                    )}
                    <span className="career-card-number">{job.number}</span>
                    <span className="career-card-dept-tag">{job.department}</span>
                  </div>

                  <div className="career-card-body">
                    <div className="career-card-meta-row">
                      <span className="career-card-location">
                        <MapPin size={12} /> {job.location}
                      </span>
                      <span className="career-card-type">
                        {job.type} · {job.level}
                      </span>
                    </div>

                    <h3>{job.title}</h3>
                    <p>{job.summary}</p>

                    <div className="career-card-skills">
                      {(job.required_skills ?? []).slice(0, 6).map((skill) => (
                        <span key={skill}>{skill}</span>
                      ))}
                    </div>

                    <div className="career-card-footer">
                      <span>
                        {job.salary_range ? job.salary_range : job.department}
                      </span>
                      <strong>
                        View JD &amp; Apply <ArrowUpRight size={15} />
                      </strong>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
