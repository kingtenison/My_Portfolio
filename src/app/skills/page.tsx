"use client";

import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React.js", level: 95 },
      { name: "JavaScript (ES6+)", level: 90 },
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 90 },
      { name: "Responsive & Mobile-First Design", level: 95 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 85 },
      { name: "RESTful API Design", level: 90 },
      { name: "Authentication & Authorisation", level: 80 },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "MongoDB", level: 85 },
      { name: "Database Architecture", level: 80 },
      { name: "Schema Design", level: 85 },
      { name: "Query Optimisation", level: 80 },
    ],
  },
  {
    title: "AI & Automation",
    skills: [
      { name: "OpenAI API", level: 85 },
      { name: "LLM Integration", level: 80 },
      { name: "Workflow Automation", level: 90 },
      { name: "YouTube Data API", level: 75 },
      { name: "Business Process Automation", level: 85 },
    ],
  },
  {
    title: "Design",
    skills: [
      { name: "UI/UX Design", level: 80 },
      { name: "Figma", level: 75 },
      { name: "Graphic Design", level: 70 },
      { name: "Digital Illustration", level: 65 },
      { name: "Conversion Optimisation", level: 75 },
    ],
  },
  {
    title: "Tools & Others",
    skills: [
      { name: "Git & GitHub", level: 90 },
      { name: "Postman", level: 85 },
      { name: "npm", level: 85 },
      { name: "VS Code", level: 95 },
      { name: "IT Systems & Networking", level: 75 },
      { name: "Python", level: 70 },
      { name: "C#", level: 60 },
      { name: "C++", level: 60 },
      { name: "Flutter (foundational)", level: 50 },
      { name: "Unity", level: 50 },
    ],
  },
];

export default function Skills() {
  return (
      <div className="min-h-screen bg-white">
      <div className="px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
           <h1 className="text-4xl sm:text-5xl font-cinzel font-bold text-primary-start mb-6">
            Technical Skills
          </h1>
           <p className="text-xl text-gray-700 max-w-3xl mx-auto">
             A comprehensive toolkit spanning fullstack development, AI automation, and system engineering
           </p>
          <div className="w-24 h-1 bg-gold mx-auto mt-6"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="bg-card-bg rounded-lg shadow-lg p-6 border border-gray-100"
            >
               <h3 className="text-xl font-cinzel font-semibold text-primary-start mb-6 text-center">
                {category.title}
              </h3>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                      <span className="text-sm text-gold font-semibold">{skill.level}%</span>
                    </div>
                     <div className="w-full bg-gray-600 rounded-full h-2">
                       <motion.div
                         className="bg-gradient-to-r from-primary-start to-gold h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.2 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
           <h2 className="text-3xl font-cinzel font-semibold text-primary-start mb-8">
            Certifications
          </h2>
           <div className="flex flex-wrap justify-center gap-6">
             <div className="bg-gradient-to-br from-primary-start/10 to-primary-end/10 rounded-lg shadow-md p-6 border border-primary-start/20 min-w-[200px]">
                <h3 className="font-semibold text-primary-start mb-2">Google Junior Developer Certificate</h3>
               <p className="text-gray-400 text-sm">2022</p>
             </div>
           </div>
        </motion.div>
      </div>
    </div>
  );
}