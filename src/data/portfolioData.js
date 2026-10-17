/**
 * CENTRALIZED PORTFOLIO DATA CONFIGURATION
 * 
 * Configured specifically for Yashwant Bisht
 * Third-Year B.Tech. Computer Science & Engineering Student (2024–2028)
 * ABES Engineering College, Ghaziabad | Dr. A.P.J. Abdul Kalam Technical University (AKTU)
 * 
 * Strict Ownership & Verification Standards:
 * 1. Featured project strictly limited to personally implemented flagship: Heavenly.
 *    - Live Demo: https://heavenly-ljf4.onrender.com/
 *    - GitHub Repository: https://github.com/YashwantBisht45/Heavenly-Major-Project-
 * 2. Authenticated academic records:
 *    - Confirmed Official Cumulative CGPA: 7.86 / 10.00 (Through Semester 4)
 *    - Semester 1 (7.59), Sem 2 (8.59 - Peak), Sem 3 (7.28), Sem 4 (8.09)
 *    - Arithmetic SGPA Average: 7.89 / 10.00
 *    - Academic Duration: 2024–2028
 * 3. Verified contact email: yashwantbisht196@gmail.com
 * 4. Verified resume: /Yashwant_Bisht_Resume.pdf
 */

export const portfolioData = {
  // Personal & Academic Identity
  developerInfo: {
    name: "Yashwant Singh",
    initials: "YS",
    role: "Aspiring Software Development Engineer",
    academicStatus: "Third-Year B.Tech. CSE Student (2024–2028)",
    institution: "ABES Engineering College, Ghaziabad",
    university: "Dr. A.P.J. Abdul Kalam Technical University (AKTU)",
    headline: "Building robust full-stack web applications & solving complex algorithmic problems.",
    heroBio: "Third-year Computer Science & Engineering student at ABES Engineering College (AKTU), Ghaziabad (2024–2028). Passionate about full-stack web engineering, Data Structures & Algorithms, and scalable backend architectures. Sole creator of Heavenly, a full-stack accommodation booking web platform.",
    location: "Ghaziabad / Delhi NCR, India",
    
    // Real Verified Email
    email: "yashwantbisht196@gmail.com",
    isEmailConfigured: true,
    
    availableForHire: true,
    availabilityText: "Open to Software Development Engineer Internships",
    
    // Verified Profile & Social Links
    socialLinks: {
      github: "https://github.com/YashwantBisht45",
      leetcode: "https://leetcode.com/u/YashwantBisht196/",
      codechef: "https://www.codechef.com/users/cse_29_1307",
      linkedin: "https://www.linkedin.com/in/yashwant-bisht/",
      resumeUrl: "/Yashwant_Bisht_Resume.pdf",
      resumeStatus: "Available for Download",
    },

    // Handles for Activity Heatmaps & Contest Graphs
    handles: {
      github: "YashwantBisht45",
      leetcode: "YashwantBisht196",
      codechef: "cse_29_1307",
    }
  },

  // Core Technical Focus Areas
  focusAreas: [
    { title: "Full-Stack Web Engineering", description: "Production-ready web systems using Node.js, Express, MongoDB, RESTful APIs, and responsive UIs." },
    { title: "Data Structures & Algorithms", description: "Rigorous problem solving across LeetCode and CodeChef in C++ and Python." },
    { title: "Database & Backend Architecture", description: "Mongoose schema design, session management, cookie authentication, and validation pipelines." },
    { title: "Cloud Integration & REST APIs", description: "Cloudinary image asset streaming, Multer multi-part forms, and secure route middlewares." }
  ],

  // Featured Projects — Strict Ownership (Heavenly Only)
  projects: [
    {
      id: "heavenly-booking-platform",
      title: "Heavenly: Accommodation Booking Web Platform",
      badge: "Flagship Full-Stack Project",
      category: "Full-Stack Web Engineering",
      status: "Completed Project",
      statusType: "completed",
      year: "2024",
      description: "A full-stack accommodation and property rental booking web platform inspired by Airbnb, engineered with Node.js, Express.js, MongoDB Atlas, and Cloudinary. Features secure user authentication, property listing management, review systems, and image cloud storage.",
      problemStatement: "Constructing a secure multi-user marketplace that enables property hosts to create and edit listings with image uploads, while allowing travelers to discover, explore, and review accommodations with strict authorization controls.",
      architecture: "Express.js 5 MVC Backend → MongoDB / Mongoose Data Layer → Cloudinary Asset Pipeline with Multer → Passport.js Session Authentication → Joi Request Validation Schemas → EJS-Mate Templating with Method-Override.",
      features: [
        "User registration and session-based authentication using Passport.js and passport-local-mongoose",
        "Complete CRUD lifecycle for accommodation listings (title, description, price, location, country)",
        "Interactive review and rating system tied to authenticated traveler accounts",
        "Direct multi-part image uploads streamed securely to Cloudinary storage via Multer",
        "Server-side request and schema validation powered by Joi middleware",
        "Session persistence in MongoDB with connect-mongo and connect-flash notification alerts"
      ],
      verifiedMetrics: "Production CRUD architecture with 100% verified route authorization, hashed credentials, and cloud database integration.",
      validationStatus: "Live deployment on Render & source repository verified on GitHub.",
      techStack: ["Node.js", "Express.js", "MongoDB", "Mongoose", "Passport.js", "Cloudinary", "Multer", "Joi", "EJS", "REST API"],
      githubUrl: "https://github.com/YashwantBisht45/Heavenly-Major-Project-",
      liveUrl: "https://heavenly-ljf4.onrender.com/",
    }
  ],

  // Categorized Technical Skills
  skillCategories: [
    {
      category: "Programming Languages",
      skills: ["C++", "JavaScript (ES6+)", "Python", "SQL", "HTML5 / CSS3"]
    },
    {
      category: "Full-Stack Web Development",
      skills: ["Node.js", "Express.js", "MongoDB", "Mongoose", "React", "REST APIs", "Tailwind CSS", "EJS"]
    },
    {
      category: "Backend & Cloud Tools",
      skills: ["Passport.js", "Cloudinary", "Multer", "Joi Validation", "Session Management", "Postman"]
    },
    {
      category: "CS Fundamentals & Practices",
      skills: ["Data Structures & Algorithms (DSA)", "Object-Oriented Programming (OOP)", "Database Management (DBMS)", "Theory Of Computation (TOC)","Operating System (OS)", "Git & GitHub"]
    }
  ],

  // Academic Education — ABES Engineering College / AKTU
  education: [
    {
      degree: "Bachelor of Technology (B.Tech.)",
      branch: "Computer Science and Engineering",
      institution: "ABES Engineering College, Ghaziabad",
      university: "Dr. A.P.J. Abdul Kalam Technical University (AKTU)",
      period: "2024 – 2028",
      academicStatus: "Third-Year Student",
      
      // Confirmed Official Cumulative CGPA
      officialCgpa: 7.86,
      officialCgpaMax: 10.00,
      officialCgpaStatus: "Confirmed Cumulative Record (Semesters 1–4)",
      officialCgpaNote: "Official credit-weighted cumulative CGPA evaluated through Semester 4 as per AKTU university grading.",
      
      // Verified SGPAs
      semesters: [
        { semester: "Sem 1", sgpa: 7.59, label: "Semester 1" },
        { semester: "Sem 2", sgpa: 8.59, label: "Semester 2 (Peak)" },
        { semester: "Sem 3", sgpa: 7.28, label: "Semester 3" },
        { semester: "Sem 4", sgpa: 8.09, label: "Semester 4" },
      ],
      
      // Calculation & Estimation Details
      estimatedSgpaAverage: 7.89,
      estimatedSgpaAverageNote: "Arithmetic average of reported semester SGPAs (7.59, 8.59, 7.28, 8.09); distinct from credit-weighted official CGPA.",
      
      coursework: [
        "Data Structures & Algorithms",
        "Operating Systems",
        "Database Management Systems",
        "Theory Of Computation (TOC)",
        "Object-Oriented Programming",
        "Design & Analysis of Algorithms"
      ]
    }
  ],

  // Verified platform activity snapshot data (Preserved intact)
  platformSnapshots: {
  "leetcode": {
    "streak": 57,
    "totalActiveDays": 115,
    "totalSolved": 132,
    "easySolved": 85,
    "mediumSolved": 46,
    "hardSolved": 1,
    "submissionCalendar": {
        "1762473600": 1,
        "1764288000": 2,
        "1769731200": 1,
        "1771372800": 1,
        "1773792000": 1,
        "1774569600": 2,
        "1780790400": 3,
        "1780876800": 2,
        "1780963200": 2,
        "1781049600": 1,
        "1781136000": 2,
        "1781222400": 3,
        "1781308800": 3,
        "1781395200": 3,
        "1781481600": 4,
        "1781568000": 1,
        "1781654400": 1,
        "1781740800": 1,
        "1781827200": 1,
        "1781913600": 1,
        "1782000000": 1,
        "1782172800": 2,
        "1784160000": 4,
        "1784246400": 1,
        "1784332800": 1,
        "1784419200": 1,
        "1784505600": 2,
        "1784592000": 1,
        "1784678400": 1,
        "1784764800": 3,
        "1784851200": 2,
        "1784937600": 1,
        "1785024000": 2,
        "1785110400": 2,
        "1785196800": 1,
        "1785283200": 3,
        "1785369600": 2,
        "1785456000": 1,
        "1785542400": 1,
        "1785628800": 2,
        "1785715200": 2,
        "1785801600": 1,
        "1785888000": 2,
        "1785974400": 5,
        "1786060800": 1,
        "1786147200": 2,
        "1786233600": 5,
        "1786320000": 10,
        "1786406400": 2,
        "1786492800": 1,
        "1786579200": 2,
        "1786665600": 1,
        "1786752000": 1,
        "1786838400": 3,
        "1786924800": 2,
        "1787011200": 1,
        "1787097600": 1,
        "1787184000": 2,
        "1787270400": 1,
        "1787356800": 1,
        "1787443200": 1,
        "1787529600": 1,
        "1787616000": 1,
        "1787702400": 2,
        "1787788800": 1,
        "1787875200": 1,
        "1787961600": 2,
        "1788048000": 4,
        "1788134400": 1,
        "1788220800": 2,
        "1788307200": 1,
        "1788393600": 1,
        "1788480000": 1,
        "1788566400": 2,
        "1788652800": 5,
        "1788739200": 1,
        "1788825600": 1,
        "1788912000": 1,
        "1788998400": 1,
        "1789171200": 1,
        "1789257600": 1,
        "1789344000": 1,
        "1789430400": 3,
        "1789516800": 1,
        "1789603200": 1,
        "1789689600": 1,
        "1789776000": 1,
        "1789862400": 5,
        "1789948800": 1,
        "1790035200": 2,
        "1790121600": 1,
        "1790208000": 1,
        "1790294400": 3,
        "1790380800": 2,
        "1790467200": 1,
        "1790553600": 1,
        "1790640000": 3,
        "1790726400": 3,
        "1790812800": 2,
        "1790899200": 3,
        "1790985600": 1,
        "1791072000": 1,
        "1791158400": 1,
        "1791244800": 1,
        "1791331200": 1,
        "1791417600": 1,
        "1791504000": 1,
        "1791590400": 4,
        "1791676800": 2,
        "1791763200": 2
    }
},
  "codechef": {
    "rating": 1138,
    "stars": "Div 4",
    "contests": 22,
    "peakRating": 1138,
    "submissions": [
        {
            "date": "2025-4-3",
            "value": 19
        },
        {
            "date": "2025-4-10",
            "value": 16
        },
        {
            "date": "2025-4-11",
            "value": 8
        },
        {
            "date": "2025-4-17",
            "value": 2
        },
        {
            "date": "2025-4-24",
            "value": 9
        },
        {
            "date": "2025-8-27",
            "value": 11
        },
        {
            "date": "2025-8-28",
            "value": 2
        },
        {
            "date": "2025-8-29",
            "value": 14
        },
        {
            "date": "2025-8-30",
            "value": 3
        },
        {
            "date": "2025-8-31",
            "value": 3
        },
        {
            "date": "2025-9-1",
            "value": 10
        },
        {
            "date": "2025-9-2",
            "value": 2
        },
        {
            "date": "2025-9-3",
            "value": 3
        },
        {
            "date": "2025-9-4",
            "value": 3
        },
        {
            "date": "2025-9-5",
            "value": 5
        },
        {
            "date": "2025-9-6",
            "value": 4
        },
        {
            "date": "2025-9-7",
            "value": 3
        },
        {
            "date": "2025-9-8",
            "value": 1
        },
        {
            "date": "2025-9-9",
            "value": 1
        },
        {
            "date": "2025-9-10",
            "value": 2
        },
        {
            "date": "2025-9-11",
            "value": 4
        },
        {
            "date": "2025-9-12",
            "value": 0
        },
        {
            "date": "2025-9-13",
            "value": 0
        },
        {
            "date": "2025-9-14",
            "value": 1
        },
        {
            "date": "2025-9-15",
            "value": 2
        },
        {
            "date": "2025-9-16",
            "value": 0
        },
        {
            "date": "2025-9-17",
            "value": 4
        },
        {
            "date": "2025-9-24",
            "value": 2
        },
        {
            "date": "2025-10-1",
            "value": 2
        },
        {
            "date": "2025-10-22",
            "value": 2
        },
        {
            "date": "2025-10-29",
            "value": 3
        },
        {
            "date": "2025-11-12",
            "value": 2
        },
        {
            "date": "2026-2-1",
            "value": 5
        },
        {
            "date": "2026-2-2",
            "value": 4
        },
        {
            "date": "2026-2-3",
            "value": 2
        },
        {
            "date": "2026-2-4",
            "value": 4
        },
        {
            "date": "2026-2-5",
            "value": 2
        },
        {
            "date": "2026-2-6",
            "value": 0
        },
        {
            "date": "2026-2-7",
            "value": 4
        },
        {
            "date": "2026-2-8",
            "value": 5
        },
        {
            "date": "2026-2-12",
            "value": 3
        },
        {
            "date": "2026-2-13",
            "value": 1
        },
        {
            "date": "2026-2-18",
            "value": 3
        },
        {
            "date": "2026-7-16",
            "value": 3
        },
        {
            "date": "2026-7-22",
            "value": 4
        },
        {
            "date": "2026-7-23",
            "value": 4
        },
        {
            "date": "2026-7-29",
            "value": 7
        },
        {
            "date": "2026-8-5",
            "value": 5
        },
        {
            "date": "2026-8-12",
            "value": 5
        },
        {
            "date": "2026-8-19",
            "value": 7
        },
        {
            "date": "2026-8-26",
            "value": 4
        },
        {
            "date": "2026-9-2",
            "value": 5
        },
        {
            "date": "2026-9-9",
            "value": 4
        },
        {
            "date": "2026-9-16",
            "value": 6
        },
        {
            "date": "2026-9-23",
            "value": 2
        },
        {
            "date": "2026-9-28",
            "value": 4
        },
        {
            "date": "2026-9-30",
            "value": 11
        },
        {
            "date": "2026-10-7",
            "value": 8
        },
        {
            "date": "2026-10-13",
            "value": 1
        }
    ]
},
  "contestHistories": {
    "lastUpdated": "2026-10-17",
    "leetcode": {
      "platform": "LeetCode",
      "handle": "YashwantBisht196",
      "profileUrl": "https://leetcode.com/u/YashwantBisht196/",
      "attendedCount": 15,
      "currentRating": 1287,
      "peakRating": 1414,
      "globalRanking": 871265,
      "history": [
        {
          "contestName": "Weekly Contest 467",
          "date": "2025-09-14",
          "displayDate": "Sep 14, 2025",
          "rating": 1414,
          "rawRating": 1414.352,
          "rank": 30046,
          "problemsSolved": 0,
          "totalProblems": 4
        },
        {
          "contestName": "Weekly Contest 505",
          "date": "2026-06-07",
          "displayDate": "Jun 7, 2026",
          "rating": 1367,
          "rawRating": 1367.24,
          "rank": 19679,
          "problemsSolved": 1,
          "totalProblems": 4
        },
        {
          "contestName": "Biweekly Contest 185",
          "date": "2026-06-20",
          "displayDate": "Jun 20, 2026",
          "rating": 1335,
          "rawRating": 1335.457,
          "rank": 18391,
          "problemsSolved": 1,
          "totalProblems": 4
        },
        {
          "contestName": "Weekly Contest 512",
          "date": "2026-07-26",
          "displayDate": "Jul 26, 2026",
          "rating": 1315,
          "rawRating": 1314.961,
          "rank": 19031,
          "problemsSolved": 1,
          "totalProblems": 4
        },
        {
          "contestName": "Weekly Contest 514",
          "date": "2026-08-09",
          "displayDate": "Aug 9, 2026",
          "rating": 1303,
          "rawRating": 1302.971,
          "rank": 18307,
          "problemsSolved": 1,
          "totalProblems": 4
        },
        {
          "contestName": "Biweekly Contest 189",
          "date": "2026-08-15",
          "displayDate": "Aug 15, 2026",
          "rating": 1297,
          "rawRating": 1296.755,
          "rank": 17809,
          "problemsSolved": 1,
          "totalProblems": 4
        },
        {
          "contestName": "Weekly Contest 515",
          "date": "2026-08-16",
          "displayDate": "Aug 16, 2026",
          "rating": 1283,
          "rawRating": 1283.314,
          "rank": 18552,
          "problemsSolved": 1,
          "totalProblems": 4
        },
        {
          "contestName": "Biweekly Contest 190",
          "date": "2026-08-29",
          "displayDate": "Aug 29, 2026",
          "rating": 1275,
          "rawRating": 1274.897,
          "rank": 13799,
          "problemsSolved": 1,
          "totalProblems": 4
        },
        {
          "contestName": "Weekly Contest 517",
          "date": "2026-08-30",
          "displayDate": "Aug 30, 2026",
          "rating": 1266,
          "rawRating": 1266.242,
          "rank": 16090,
          "problemsSolved": 1,
          "totalProblems": 4
        },
        {
          "contestName": "Weekly Contest 518",
          "date": "2026-09-06",
          "displayDate": "Sep 6, 2026",
          "rating": 1259,
          "rawRating": 1259.049,
          "rank": 16515,
          "problemsSolved": 1,
          "totalProblems": 4
        },
        {
          "contestName": "Weekly Contest 519",
          "date": "2026-09-13",
          "displayDate": "Sep 13, 2026",
          "rating": 1261,
          "rawRating": 1261.472,
          "rank": 14533,
          "problemsSolved": 1,
          "totalProblems": 4
        },
        {
          "contestName": "Weekly Contest 520",
          "date": "2026-09-20",
          "displayDate": "Sep 20, 2026",
          "rating": 1283,
          "rawRating": 1282.841,
          "rank": 11587,
          "problemsSolved": 2,
          "totalProblems": 4
        },
        {
          "contestName": "Weekly Contest 521",
          "date": "2026-09-27",
          "displayDate": "Sep 27, 2026",
          "rating": 1271,
          "rawRating": 1270.93,
          "rank": 16641,
          "problemsSolved": 1,
          "totalProblems": 4
        },
        {
          "contestName": "Weekly Contest 522",
          "date": "2026-10-04",
          "displayDate": "Oct 4, 2026",
          "rating": 1265,
          "rawRating": 1264.726,
          "rank": 16115,
          "problemsSolved": 1,
          "totalProblems": 4
        },
        {
          "contestName": "Biweekly Contest 193",
          "date": "2026-10-11",
          "displayDate": "Oct 11, 2026",
          "rating": 1287,
          "rawRating": 1286.93,
          "rank": 9203,
          "problemsSolved": 1,
          "totalProblems": 4
        }
      ]
    },
    "codechef": {
      "platform": "CodeChef",
      "handle": "cse_29_1307",
      "profileUrl": "https://www.codechef.com/users/cse_29_1307",
      "attendedCount": 22,
      "currentRating": 1138,
      "peakRating": 1138,
      "division": "Div 4",
      "history": [
        {
          "contestName": "Starters 201 (Rated)",
          "contestCode": "START201D",
          "date": "2025-08-27",
          "displayDate": "Aug 27, 2025",
          "rating": 673,
          "rank": 21643
        },
        {
          "contestName": "Starters 202 (Rated)",
          "contestCode": "START202D",
          "date": "2025-09-03",
          "displayDate": "Sep 3, 2025",
          "rating": 796,
          "rank": 18771
        },
        {
          "contestName": "Starters 203 (Rated)",
          "contestCode": "START203D",
          "date": "2025-09-10",
          "displayDate": "Sep 10, 2025",
          "rating": 730,
          "rank": 29697
        },
        {
          "contestName": "Starters 204 (Rated)",
          "contestCode": "START204D",
          "date": "2025-09-17",
          "displayDate": "Sep 17, 2025",
          "rating": 835,
          "rank": 17998
        },
        {
          "contestName": "Starters 205 (Rated)",
          "contestCode": "START205D",
          "date": "2025-09-24",
          "displayDate": "Sep 24, 2025",
          "rating": 862,
          "rank": 20604
        },
        {
          "contestName": "Starters 206 (Rated)",
          "contestCode": "START206D",
          "date": "2025-10-01",
          "displayDate": "Oct 1, 2025",
          "rating": 806,
          "rank": 19122
        },
        {
          "contestName": "Starters 209 (Rated)",
          "contestCode": "START209D",
          "date": "2025-10-22",
          "displayDate": "Oct 22, 2025",
          "rating": 812,
          "rank": 21813
        },
        {
          "contestName": "Starters 210 (Rated)",
          "contestCode": "START210D",
          "date": "2025-10-29",
          "displayDate": "Oct 29, 2025",
          "rating": 866,
          "rank": 14577
        },
        {
          "contestName": "Starters 212 (Rated)",
          "contestCode": "START212D",
          "date": "2025-11-12",
          "displayDate": "Nov 12, 2025",
          "rating": 875,
          "rank": 19692
        },
        {
          "contestName": "Starters 224 (Rated)",
          "contestCode": "START224D",
          "date": "2026-02-04",
          "displayDate": "Feb 4, 2026",
          "rating": 889,
          "rank": 25020
        },
        {
          "contestName": "Starters 226",
          "contestCode": "START226D",
          "date": "2026-02-18",
          "displayDate": "Feb 18, 2026",
          "rating": 888,
          "rank": 30016
        },
        {
          "contestName": "Starters 249 (Rated)",
          "contestCode": "START249D",
          "date": "2026-07-29",
          "displayDate": "Jul 29, 2026",
          "rating": 930,
          "rank": 13076
        },
        {
          "contestName": "Starters 250 (Rated)",
          "contestCode": "START250D",
          "date": "2026-08-05",
          "displayDate": "Aug 5, 2026",
          "rating": 967,
          "rank": 13110
        },
        {
          "contestName": "Starters 251 (Rated)",
          "contestCode": "START251D",
          "date": "2026-08-12",
          "displayDate": "Aug 12, 2026",
          "rating": 1005,
          "rank": 12816
        },
        {
          "contestName": "Starters 252 (Rated)",
          "contestCode": "START252D",
          "date": "2026-08-19",
          "displayDate": "Aug 19, 2026",
          "rating": 1016,
          "rank": 15890
        },
        {
          "contestName": "Starters 253 (Rated)",
          "contestCode": "START253D",
          "date": "2026-08-26",
          "displayDate": "Aug 26, 2026",
          "rating": 1011,
          "rank": 14965
        },
        {
          "contestName": "Starters 254 (Rated)",
          "contestCode": "START254D",
          "date": "2026-09-02",
          "displayDate": "Sep 2, 2026",
          "rating": 1032,
          "rank": 12831
        },
        {
          "contestName": "Starters 255",
          "contestCode": "START255D",
          "date": "2026-09-09",
          "displayDate": "Sep 9, 2026",
          "rating": 1029,
          "rank": 18375
        },
        {
          "contestName": "Starters 256",
          "contestCode": "START256D",
          "date": "2026-09-16",
          "displayDate": "Sep 16, 2026",
          "rating": 1065,
          "rank": 5300
        },
        {
          "contestName": "Starters 257 (Rated)",
          "contestCode": "START257D",
          "date": "2026-09-23",
          "displayDate": "Sep 23, 2026",
          "rating": 1073,
          "rank": 17115
        },
        {
          "contestName": "Starters 258 (Rated)",
          "contestCode": "START258D",
          "date": "2026-09-30",
          "displayDate": "Sep 30, 2026",
          "rating": 1103,
          "rank": 9497
        },
        {
          "contestName": "Starters 259 (Rated)",
          "contestCode": "START259D",
          "date": "2026-10-07",
          "displayDate": "Oct 7, 2026",
          "rating": 1138,
          "rank": 7496
        }
      ]
    }
  }
}
};
