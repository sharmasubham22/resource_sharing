const options = [
  { label: "Select Type", value: "" },
  { label: "Document", value: "document" },
  { label: "Link", value: "link" },
  { label: "Code Snippet", value: "codeSnippet" },
  { label: "Video", value: "video" },
  { label: "Tools", value: "tools" },
  { label: "Template", value: "template" },
  { label: "Collection File", value: "collectionFile" },
];

const categories = [
    { label: "Frontend Development", value: "frontend", tags: [
        { name: "React", val:"react" },
        { name: "Vue", val:"vue" },
        { name: "Angular", val:"angular" },
        { name: "HTML", val:"html" },
        { name: "CSS", val:"css" },
        { name: "JavaScript", val:"javascript" },
        { name: "TypeScript", val:"typescript" },
        { name: "Svelte", val:"svelte" },
        { name: "Bootstrap", val:"bootstrap" },
        { name: "Tailwind CSS", val:"tailwindCss" },
        { name: "Next.js", val:"nextjs" },
        { name: "Gatsby", val:"gatsby" }
    ]},
    { label: "Backend Development", value: "backend", tags: [
        { name: "Node.js", val:"nodejs" },
        { name: "Django", val:"django" },
        { name: "Flask", val:"flask" },
        { name: "Ruby on Rails", val:"rubyOnRails" },
        { name: "Spring", val:"spring" },
        { name: "Express.js", val:"expressjs" },
        { name: "ASP.NET", val:"aspDotNet" },
        { name: "Laravel", val:"laravel" },
        { name: "PHP", val:"php" },
        { name: "Go", val:"go" },
        { name: "Java", val:"java" }
    ]},
    { label: "Full Stack Development", value: "fullStack", tags: [
        { name: "MERN", val:"mern" },
        { name: "MEAN", val:"mean" },
        { name: "Django + React", val:"djangoReact" },
        { name: "Flask + Vue", val:"flaskVue" },
        { name: "LAMP", val:"lamp" },
        { name: "Ruby on Rails + React", val:"rubyOnRailsReact" }
    ] },
    { label: "Databases", value: "databases", tags: [
        { name: "MySQL", val:"mysql" },
        { name: "PostgreSQL", val:"postgresql" },
        { name: "MongoDB", val:"mongodb" },
        { name: "SQLite", val:"sqlite" },
        { name: "Redis", val:"redis" },
        { name: "Firebase", val:"firebase" },
        { name: "Cassandra", val:"cassandra" },
        { name: "DynamoDB", val:"dynamodb" }
    ]},
    { label: "Mobile Development", value: "mobileDevelopment", tags: [
        { name: "React Native", val:"reactNative" },
        { name: "Flutter", val:"flutter" },
        { name: "Swift", val:"swift" },
        { name: "Kotlin", val:"kotlin" },
        { name: "Ionic", val:"ionic" },
        { name: "Xamarin", val:"xamarin" }
    ]},
    { label: "Data Science & Machine Learning", value: "dataScienceAndMachineLearning", tags: [
        { name: "Python", val:"python" },
        { name: "R", val:"r" },
        { name: "TensorFlow", val:"tensorflow" },
        { name: "PyTorch", val:"pytorch" },
        { name: "Pandas", val:"pandas" },
        { name: "NumPy", val:"numpy" },
        { name: "Scikit-learn", val:"scikitLearn" },
        { name: "Keras", val:"keras" },
        { name: "Matplotlib", val:"matplotlib" },
        { name: "Seaborn", val:"seaborn" },
        { name: "Jupyter", val:"jupyter" },
        { name: "Data Visualization", val:"dataVisualization" },
        { name: "Statistics", val:"statistics" },
        { name: "Deep Learning", val:"deepLearning" }
    ]},
    { label: "Data Structures & Algorithms", value: "dsa", tags: [
        { name: "Arrays", val:"arrays" },
        { name: "Linked Lists", val:"linkedLists" },
        { name: "Stacks", val:"stacks" },
        { name: "Queues", val:"queues" },
        { name: "Trees", val:"trees" },
        { name: "Graphs", val:"graphs" },
        { name: "Sorting Algorithms", val:"sortingAlgorithms" },
        { name: "Searching Algorithms", val:"searchingAlgorithms" },
        { name: "Dynamic Programming", val:"dynamicProgramming" },
        { name: "Recursion", val:"recursion" },
        { name: "Hashing", val:"hashing" },
        { name: "Greedy Algorithms", val:"greedyAlgorithms" },
        { name: "Divide and Conquer", val:"divideAndConquer" },
        { name: "Backtracking", val:"backtracking" },
        { name: "Bit Manipulation", val:"bitManipulation" },
        { name: "Complexity Analysis", val:"complexityAnalysis" }  
    ]},
    { label: "System Design", value: "systemDesign", tags: [
        { name: "Scalability", val:"scalability" },
        { name: "Load Balancing", val:"loadBalancing" },
        { name: "Caching", val:"caching" },
        { name: "Database Design", val:"databaseDesign" },
        { name: "Microservices", val:"microservices" },
        { name: "APIs", val:"apis" },
        { name: "Message Queues", val:"messageQueues" },
        { name: "CDNs", val:"cdns" },
        { name: "Security", val:"security" },
        { name: "Design Patterns", val:"designPatterns" },
        { name: "Networking Basics", val:"networkingBasics" },
        { name: "Cloud Services", val:"cloudServices" },
        { name: "Data Consistency", val:"dataConsistency" },
        { name: "Fault Tolerance", val:"faultTolerance" },
        { name: "Monitoring & Logging", val:"monitoringAndLogging" }
    ]},
    { label: "DevOps & CI/CD", value: "devOpsAndCICD", tags: [
        { name: "Docker", val:"docker" },
        { name: "Kubernetes", val:"kubernetes" },
        { name: "Jenkins", val:"jenkins" },
        { name: "GitHub Actions", val:"githubActions" },
        { name: "Travis CI", val:"travisCI" },
        { name: "CircleCI", val:"circleCI" },
        { name: "Ansible", val:"ansible" },
        { name: "Terraform", val:"terraform" },
        { name: "Monitoring Tools", val:"monitoringTools" },
        { name: "Infrastructure as Code", val:"infrastructureAsCode" }
    ]},
    { label: "Cloud Computing", value: "cloudComputing", tags: [
        { name: "AWS", val:"aws" },
        { name: "Azure", val:"azure" },
        { name: "Google Cloud", val:"googleCloud" },
        { name: "Serverless", val:"serverless" },
        { name: "Cloud Storage", val:"cloudStorage" },
        { name: "Cloud Databases", val:"cloudDatabases" },
        { name: "Cloud Networking", val:"cloudNetworking" },
        { name: "Cloud Security", val:"cloudSecurity" },
        { name: "Cloud Monitoring", val:"cloudMonitoring" },
        { name: "Cloud DevOps", val:"cloudDevOps" }
    ]},
    { label: "Interview Preparation", value: "interviewPreparation", tags: [
        { name: "Behavioral Questions", val:"behavioralQuestions" },
        { name: "Technical Questions", val:"technicalQuestions" },
        { name: "Mock Interviews", val:"mockInterviews" },
        { name: "Resume Building", val:"resumeBuilding" },
        { name: "Coding Challenges", val:"codingChallenges" },
        { name: "System Design Interviews", val:"systemDesignInterviews" },
        { name: "Aptitude Tests", val:"aptitudeTests" }
    ]},
    { label: "Career & Resume", value: "careerAndResume", tags: [
        { name: "Resume Writing", val:"resumeWriting" },
        { name: "Cover Letters", val:"coverLetters" },
        { name: "Job Search Strategies", val:"jobSearchStrategies" },
        { name: "Networking", val:"networking" },
        { name: "Interview Tips", val:"interviewTips" },
        { name: "Career Growth", val:"careerGrowth" }
]}];

export { options, categories };