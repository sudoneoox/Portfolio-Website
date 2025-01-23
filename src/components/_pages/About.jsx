import React from "react";
import { PERSONAL_INFO } from "../_utils/constants.ts";

const About = () => {
  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-[280px_1fr] gap-12">
          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 rounded-full overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 p-1">
                <img
                  src="/api/placeholder/200/200"
                  alt="Profile"
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
              <div className="mt-6 text-center">
                <h1 className="text-2xl font-bold text-zinc-900">
                  {PERSONAL_INFO.name}
                </h1>
                <p className="text-lg text-zinc-600 mt-1">
                  {PERSONAL_INFO.title}
                </p>
                <p className="text-zinc-500">{PERSONAL_INFO.university}</p>
              </div>
            </div>

            <div className="space-y-4 bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-zinc-900">Contact</h2>
              <div className="space-y-3 text-sm text-zinc-600">
                <p className="flex items-center space-x-2">
                  <span>📍</span>
                  <span>{PERSONAL_INFO.location}</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span>📧</span>
                  <span>{PERSONAL_INFO.email}</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span>🎓</span>
                  <span>{PERSONAL_INFO.department}</span>
                </p>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="space-y-8">
            <section className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                About Me
              </h2>
              <p className="text-zinc-600 leading-relaxed">
                {PERSONAL_INFO.bio}
              </p>
            </section>

            <section className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                Research Interests
              </h2>
              <ul className="space-y-2">
                {PERSONAL_INFO.interests.map((interest, index) => (
                  <li
                    key={index}
                    className="text-zinc-600 flex items-center space-x-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                    <span>{interest}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                Education
              </h2>
              <div>
                <h3 className="text-lg font-semibold text-zinc-900">
                  {PERSONAL_INFO.education.degree}
                </h3>
                <p className="text-zinc-600 mt-1">
                  {PERSONAL_INFO.education.institution} |{" "}
                  {PERSONAL_INFO.education.period}
                </p>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default About;
