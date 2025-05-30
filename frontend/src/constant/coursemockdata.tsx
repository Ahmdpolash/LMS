export const courseData = {
  id: 1,
  title: "Complete Web Development Bootcamp: From Zero to Hero",
  subtitle:
    "Learn HTML, CSS, JavaScript, React, Node.js, MongoDB and more! Build real-world projects and become a full-stack developer.",
  rating: 4.8,
  reviewCount: 2547,
  studentsCount: 15420,
  instructor: {
    name: "Sarah Johnson",
    title: "Senior Web Developer & Instructor",
    bio: "Sarah is a senior web developer with over 10 years of experience in the industry. She has worked with companies like Google, Facebook, and Amazon, and has taught over 100,000 students online. Her teaching style is practical, project-based, and focused on real-world applications.",

    coursesCount: 12,
    studentsCount: 145000,
    reviewsAverage: 4.9,
  },
  lastUpdated: "April 2025",
  language: "English",
  price: 99.99,
  discountPrice: 84.99,
  discountEnds: "May 15, 2025",

  level: "All Levels",
  duration: "42 hours",
  lectures: 142,
  articles: 15,
  downloadableResources: 24,
  hasCertificate: true,
  description: `
      <p>This comprehensive web development bootcamp covers everything you need to know to become a full-stack web developer. Whether you're a complete beginner or have some experience, this course will take you from the basics to advanced concepts.</p>
      <p>You'll learn HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, and more. By the end of this course, you'll have built multiple real-world projects that you can add to your portfolio.</p>
      <p>The course is constantly updated with new content, projects, and modules. You'll have lifetime access to all course materials, including future updates.</p>
    `,
  whatYouWillLearn: [
    "Build responsive, accessible, and beautiful websites using HTML5 and CSS3",
    "Master JavaScript including ES6+ features and learn how to build interactive web applications",
    "Create full-stack applications using React for the frontend and Node.js for the backend",
    "Work with databases like MongoDB and learn how to integrate them into your applications",
    "Implement authentication and authorization in your web applications",
    "Deploy your applications to the web using various hosting platforms",
    "Optimize your websites for performance and search engines",
    "Build a portfolio of real-world projects to showcase to potential employers",
  ],
  requirements: [
    "A computer (Windows, Mac, or Linux) with internet access",
    "No prior programming experience required - we'll start from the very basics",
    "Basic computer skills and familiarity with using the internet",
    "Willingness to learn and practice regularly",
  ],
  targetAudience: [
    "Complete beginners with no prior programming experience",
    "People who know basic HTML and CSS but want to expand their skills",
    "Programmers from other languages who want to learn web development",
    "Anyone who wants to become a full-stack web developer",
  ],
  curriculum: [
    {
      title: "Introduction to Web Development",
      lectures: 8,
      duration: "2h 15m",
      content: [
        {
          title: "Welcome to the Course",
          duration: "5:20",
          type: "video",
          isPreview: true,
        },
        {
          title: "How the Internet Works",
          duration: "12:45",
          type: "video",
          isPreview: true,
        },
        {
          title: "Setting Up Your Development Environment",
          duration: "18:30",
          type: "video",
          isPreview: false,
        },
        {
          title: "Web Development Overview",
          duration: "15:10",
          type: "video",
          isPreview: false,
        },
        {
          title: "Frontend vs Backend Development",
          duration: "14:25",
          type: "video",
          isPreview: false,
        },
        {
          title: "Introduction to Version Control with Git",
          duration: "22:15",
          type: "video",
          isPreview: false,
        },
        {
          title: "Web Development Tools and Resources",
          duration: "16:40",
          type: "article",
          isPreview: false,
        },
        {
          title: "Section Quiz",
          duration: "30:00",
          type: "quiz",
          isPreview: false,
        },
      ],
    },
    {
      title: "HTML Fundamentals",
      lectures: 12,
      duration: "3h 45m",
      content: [
        {
          title: "Introduction to HTML",
          duration: "10:15",
          type: "video",
          isPreview: true,
        },
        {
          title: "HTML Document Structure",
          duration: "14:30",
          type: "video",
          isPreview: false,
        },
        {
          title: "Working with Text Elements",
          duration: "18:20",
          type: "video",
          isPreview: false,
        },
        {
          title: "HTML Lists and Tables",
          duration: "22:10",
          type: "video",
          isPreview: false,
        },
        {
          title: "HTML Forms and Input Elements",
          duration: "25:45",
          type: "video",
          isPreview: false,
        },
        {
          title: "HTML5 Semantic Elements",
          duration: "16:30",
          type: "video",
          isPreview: false,
        },
        {
          title: "HTML Multimedia Elements",
          duration: "19:15",
          type: "video",
          isPreview: false,
        },
        {
          title: "HTML Best Practices",
          duration: "12:40",
          type: "article",
          isPreview: false,
        },
        {
          title: "HTML Accessibility",
          duration: "20:30",
          type: "video",
          isPreview: false,
        },
        {
          title: "HTML Project: Building a Personal Website",
          duration: "35:20",
          type: "project",
          isPreview: false,
        },
        {
          title: "HTML Resources and References",
          duration: "10:15",
          type: "article",
          isPreview: false,
        },
        {
          title: "Section Quiz",
          duration: "30:00",
          type: "quiz",
          isPreview: false,
        },
      ],
    },
    {
      title: "CSS Fundamentals",
      lectures: 15,
      duration: "4h 30m",
      content: [
        {
          title: "Introduction to CSS",
          duration: "12:30",
          type: "video",
          isPreview: false,
        },
        {
          title: "CSS Selectors and Properties",
          duration: "18:45",
          type: "video",
          isPreview: false,
        },
        {
          title: "CSS Box Model",
          duration: "15:20",
          type: "video",
          isPreview: false,
        },
        {
          title: "CSS Layout with Flexbox",
          duration: "28:15",
          type: "video",
          isPreview: false,
        },
        {
          title: "CSS Grid Layout",
          duration: "32:10",
          type: "video",
          isPreview: false,
        },
        {
          title: "CSS Responsive Design",
          duration: "24:30",
          type: "video",
          isPreview: false,
        },
        {
          title: "CSS Animations and Transitions",
          duration: "22:15",
          type: "video",
          isPreview: false,
        },
        {
          title: "CSS Variables and Custom Properties",
          duration: "16:40",
          type: "video",
          isPreview: false,
        },
        {
          title: "CSS Frameworks Overview",
          duration: "14:25",
          type: "video",
          isPreview: false,
        },
        {
          title: "Introduction to Tailwind CSS",
          duration: "26:30",
          type: "video",
          isPreview: false,
        },
        {
          title: "CSS Best Practices",
          duration: "15:10",
          type: "article",
          isPreview: false,
        },
        {
          title: "CSS Project: Styling Your Personal Website",
          duration: "40:20",
          type: "project",
          isPreview: false,
        },
        {
          title: "CSS Resources and References",
          duration: "12:15",
          type: "article",
          isPreview: false,
        },
        {
          title: "CSS Challenges",
          duration: "25:30",
          type: "exercise",
          isPreview: false,
        },
        {
          title: "Section Quiz",
          duration: "30:00",
          type: "quiz",
          isPreview: false,
        },
      ],
    },
    {
      title: "JavaScript Basics",
      lectures: 18,
      duration: "5h 15m",
      content: [
        {
          title: "Introduction to JavaScript",
          duration: "15:20",
          type: "video",
          isPreview: false,
        },
        {
          title: "JavaScript Variables and Data Types",
          duration: "18:45",
          type: "video",
          isPreview: false,
        },
        {
          title: "JavaScript Operators",
          duration: "14:30",
          type: "video",
          isPreview: false,
        },
        {
          title: "JavaScript Control Flow",
          duration: "22:10",
          type: "video",
          isPreview: false,
        },
        {
          title: "JavaScript Functions",
          duration: "25:30",
          type: "video",
          isPreview: false,
        },
        {
          title: "JavaScript Arrays",
          duration: "20:15",
          type: "video",
          isPreview: false,
        },
        {
          title: "JavaScript Objects",
          duration: "24:40",
          type: "video",
          isPreview: false,
        },
        {
          title: "JavaScript DOM Manipulation",
          duration: "28:20",
          type: "video",
          isPreview: false,
        },
        {
          title: "JavaScript Events",
          duration: "22:15",
          type: "video",
          isPreview: false,
        },
        {
          title: "JavaScript Scope and Closures",
          duration: "26:30",
          type: "video",
          isPreview: false,
        },
        {
          title: "JavaScript Error Handling",
          duration: "18:45",
          type: "video",
          isPreview: false,
        },
        {
          title: "JavaScript Asynchronous Programming",
          duration: "32:10",
          type: "video",
          isPreview: false,
        },
        {
          title: "JavaScript Promises",
          duration: "24:30",
          type: "video",
          isPreview: false,
        },
        {
          title: "JavaScript ES6+ Features",
          duration: "28:15",
          type: "video",
          isPreview: false,
        },
        {
          title: "JavaScript Best Practices",
          duration: "16:40",
          type: "article",
          isPreview: false,
        },
        {
          title: "JavaScript Project: Interactive Website",
          duration: "45:20",
          type: "project",
          isPreview: false,
        },
        {
          title: "JavaScript Resources and References",
          duration: "12:15",
          type: "article",
          isPreview: false,
        },
        {
          title: "Section Quiz",
          duration: "30:00",
          type: "quiz",
          isPreview: false,
        },
      ],
    },
    {
      title: "Advanced Topics and Final Projects",
      lectures: 14,
      duration: "6h 30m",
      content: [
        {
          title: "Introduction to React",
          duration: "30:20",
          type: "video",
          isPreview: false,
        },
        {
          title: "Building Components with React",
          duration: "35:45",
          type: "video",
          isPreview: false,
        },
        {
          title: "React State and Props",
          duration: "28:30",
          type: "video",
          isPreview: false,
        },
        {
          title: "React Hooks",
          duration: "32:15",
          type: "video",
          isPreview: false,
        },
        {
          title: "Introduction to Node.js",
          duration: "25:10",
          type: "video",
          isPreview: false,
        },
        {
          title: "Building APIs with Express",
          duration: "38:30",
          type: "video",
          isPreview: false,
        },
        {
          title: "Working with MongoDB",
          duration: "34:20",
          type: "video",
          isPreview: false,
        },
        {
          title: "Authentication and Authorization",
          duration: "42:15",
          type: "video",
          isPreview: false,
        },
        {
          title: "Deploying Your Applications",
          duration: "28:40",
          type: "video",
          isPreview: false,
        },
        {
          title: "Final Project: Full-Stack Web Application",
          duration: "1:15:00",
          type: "project",
          isPreview: false,
        },
        {
          title: "Career Advice for Web Developers",
          duration: "22:30",
          type: "video",
          isPreview: false,
        },
        {
          title: "Building Your Portfolio",
          duration: "18:45",
          type: "video",
          isPreview: false,
        },
        {
          title: "Next Steps and Continued Learning",
          duration: "15:20",
          type: "video",
          isPreview: false,
        },
        {
          title: "Course Conclusion",
          duration: "10:15",
          type: "video",
          isPreview: false,
        },
      ],
    },
  ],
  reviews: [
    {
      id: 1,
      name: "Michael P.",

      rating: 5,
      date: "April 2, 2025",
      comment:
        "This course is absolutely amazing! I started with zero knowledge of web development, and now I'm building full-stack applications. Sarah is an excellent instructor who explains complex concepts in a simple way. The projects are practical and helped me build a strong portfolio. Highly recommended!",
    },
    {
      id: 2,
      name: "Jennifer L.",

      rating: 5,
      date: "March 28, 2025",
      comment:
        "Best web development course I've taken! The curriculum is well-structured, and the projects are challenging but doable. Sarah's teaching style is clear and engaging. I landed a junior developer job after completing this course. Worth every penny!",
    },
    {
      id: 3,
      name: "David K.",

      rating: 4,
      date: "March 15, 2025",
      comment:
        "Great course with comprehensive content. The only reason I'm giving 4 stars instead of 5 is that some sections could use more exercises. Otherwise, the explanations are clear, and the projects are excellent for building a portfolio.",
    },
    {
      id: 4,
      name: "Sophia R.",

      rating: 5,
      date: "March 10, 2025",
      comment:
        "I've tried several web development courses, and this is by far the best one. Sarah explains everything in detail and provides real-world examples. The course is constantly updated with new content, which is a huge plus. I feel confident in my skills after completing this bootcamp.",
    },
    {
      id: 5,
      name: "James T.",

      rating: 5,
      date: "February 28, 2025",
      comment:
        "This course exceeded my expectations! The content is up-to-date and relevant to the current job market. Sarah is an excellent instructor who responds quickly to questions. The projects are challenging and helped me understand how everything fits together. Highly recommended for anyone looking to become a web developer.",
    },
  ],
  relatedCourses: [
    {
      id: "advanced-javascript",
      title: "Advanced JavaScript: From Fundamentals to Mastery",
      instructor: "David Wilson",
      rating: 4.9,
      reviewCount: 2103,
      price: 109.99,

      level: "Advanced",
    },
    {
      id: "react-native",
      title: "Mobile App Development with React Native",
      instructor: "James Taylor",
      rating: 4.8,
      reviewCount: 1456,
      price: 119.99,
      discountPrice: 94.99,

      level: "Intermediate",
    },
    {
      id: "ui-ux-design",
      title: "UI/UX Design Masterclass",
      instructor: "Emma Rodriguez",
      rating: 4.7,
      reviewCount: 1245,
      price: 89.99,
      discountPrice: 69.99,

      level: "Beginner",
    },
  ],
};
