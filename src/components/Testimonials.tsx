"use client";

"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    title: "Dental Clinic Owner",
    company: "Bright Smiles Dental",
    avatar: "/avatars/sarah-chen.jpg",
    content: "Hansen transformed our paper-based system into a streamlined digital workflow. Patient wait times decreased by 40% and staff efficiency increased dramatically. The system handles everything from appointments to billing seamlessly.",
    rating: 5,
    project: "Hospital Management System"
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    title: "E-commerce Store Owner",
    company: "TechGear Online",
    avatar: "/avatars/marcus-rodriguez.jpg",
    content: "The escrow platform Hansen built gave our customers the confidence to make higher-value transactions. We've seen a 35% increase in average order value since implementing the secure payment system.",
    rating: 5,
    project: "Escrow Marketplace Platform"
  },
  {
    id: 3,
    name: "Jennifer Wu",
    title: "Content Creator",
    company: "EduTech Channel",
    avatar: "/avatars/jennifer-wu.jpg",
    content: "The AI automation pipeline Hansen created saved me over 15 hours per week. What used to take a full day of manual work now happens automatically while I focus on creating better content for my audience.",
    rating: 5,
    project: "AI Content Automation Pipeline"
  }
];

export default function Testimonials() {
  return (
      <section className="py-20 bg-white">
      <div className="px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
           <h2 className="text-[1.78125rem] sm:text-[2.1375rem] font-cinzel font-bold text-primary-start mb-6 font-beyonders">
            What Clients Say
          </h2>
           <p className="text-xl text-gray-700 max-w-3xl mx-auto">
             Real results from real projects that drove measurable business impact
           </p>
          <div className="w-24 h-1 bg-gold mx-auto mt-6"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: testimonial.id * 0.1 }}
              viewport={{ once: true }}
               className="bg-gradient-to-br from-primary-start/25 to-primary-end/25 rounded-xl shadow-lg p-8 border border-primary-start/20 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start space-x-4 mb-6">
                {/* Avatar placeholder */}
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">{testimonial.name.charAt(0)}</span>
                </div>
                <div>
                   <h3 className="text-lg font-cinzel font-semibold text-primary-start mb-1">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {testimonial.title} at {testimonial.company}
                  </p>
                  <div className="flex mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className="text-gold"
                        aria-hidden="true"
                      >
                        {star <= testimonial.rating ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
               <p className="text-gray-700 italic mb-4 leading-relaxed">
                 "{testimonial.content}"
               </p>
               
               <div className="text-sm text-gray-600">
                 <span className="font-medium">Project: </span>
                  <span className="text-primary-start">{testimonial.project}</span>
               </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}