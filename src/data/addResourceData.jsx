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
    { label: "Frontend Development", value: "Frontend Development", tags: [
        { name: "React", val:"React" },
        { name: "Vue", val:"Vue" },
        { name: "Angular", val:"Angular" },
        { name: "HTML", val:"HTML" },
        { name: "CSS", val:"CSS" },
        { name: "JavaScript", val:"JavaScript" },
        { name: "TypeScript", val:"TypeScript" },
        { name: "Svelte", val:"Svelte" },
        { name: "Bootstrap", val:"Bootstrap" },
        { name: "Tailwind CSS", val:"Tailwind CSS" },
        { name: "Next.js", val:"Next.js" },
        { name: "Gatsby", val:"Gatsby" }
    ]},
    { label: "Backend Development", value: "Backend Development", tags: [
        { name: "Node.js", val:"Node.js" },
        { name: "Django", val:"Django" },
        { name: "Flask", val:"Flask" },
        { name: "Ruby on Rails", val:"Ruby on Rails" },
        { name: "Spring", val:"Spring" },
        { name: "Express.js", val:"Express.js" },
        { name: "ASP.NET", val:"ASP.NET" },
        { name: "Laravel", val:"Laravel" },
        { name: "PHP", val:"PHP" },
        { name: "Go", val:"Go" },
        { name: "Java", val:"Java" }
    ]},
    { label: "Full Stack Development", value: "Full-Stack Development", tags: [
        { name: "MERN", val:"MERN" },
        { name: "MEAN", val:"MEAN" },
        { name: "Django + React", val:"Django + React" },
        { name: "Flask + Vue", val:"Flask + Vue" },
        { name: "LAMP", val:"LAMP" },
        { name: "Ruby on Rails + React", val:"Ruby on Rails + React" }
    ] },
    { label: "Databases", value: "Databases", tags: [
        { name: "MySQL", val:"MySQL" },
        { name: "PostgreSQL", val:"PostgreSQL" },
        { name: "MongoDB", val:"MongoDB" },
        { name: "SQLite", val:"SQLite" },
        { name: "Redis", val:"Redis" },
        { name: "Firebase", val:"Firebase" },
        { name: "Cassandra", val:"Cassandra" },
        { name: "DynamoDB", val:"DynamoDB" }
    ]},
    { label: "Mobile Development", value: "Mobile Development", tags: [
        { name: "React Native", val:"React Native" },
        { name: "Flutter", val:"Flutter" },
        { name: "Swift", val:"Swift" },
        { name: "Kotlin", val:"Kotlin" },
        { name: "Ionic", val:"Ionic" },
        { name: "Xamarin", val:"Xamarin" }
    ]},
    { label: "Data Science & Machine Learning", value: "Data Science And Machine Learning", tags: [
        { name: "Python", val:"Python" },
        { name: "R", val:"R" },
        { name: "TensorFlow", val:"TensorFlow" },
        { name: "PyTorch", val:"PyTorch" },
        { name: "Pandas", val:"Pandas" },
        { name: "NumPy", val:"NumPy" },
        { name: "Scikit-learn", val:"Scikit-learn" },
        { name: "Keras", val:"Keras" },
        { name: "Matplotlib", val:"Matplotlib" },
        { name: "Seaborn", val:"Seaborn" },
        { name: "Jupyter", val:"Jupyter" },
        { name: "Data Visualization", val:"Data Visualization" },
        { name: "Statistics", val:"Statistics" },
        { name: "Deep Learning", val:"Deep Learning" }
    ]},
    { label: "Data Structures & Algorithms", value: "Data Strucutres and Algorithm", tags: [
        { name: "Arrays", val:"Arrays" },
        { name: "Linked Lists", val:"Linked Lists" },
        { name: "Stacks", val:"Stacks" },
        { name: "Queues", val:"Queues" },
        { name: "Trees", val:"Trees" },
        { name: "Graphs", val:"Graphs" },
        { name: "Sorting Algorithms", val:"Sorting Algorithms" },
        { name: "Searching Algorithms", val:"Searching Algorithms" },
        { name: "Dynamic Programming", val:"Dynamic Programming" },
        { name: "Recursion", val:"Recursion" },
        { name: "Hashing", val:"Hashing" },
        { name: "Greedy Algorithms", val:"Greedy Algorithms" },
        { name: "Divide and Conquer", val:"Divide and Conquer" },
        { name: "Backtracking", val:"Backtracking" },
        { name: "Bit Manipulation", val:"Bit Manipulation" },
        { name: "Complexity Analysis", val:"Complexity Analysis" }  
    ]},
    { label: "System Design", value: "System Design", tags: [
        { name: "Scalability", val:"Scalability" },
        { name: "Load Balancing", val:"Load Balancing" },
        { name: "Caching", val:"Caching" },
        { name: "Database Design", val:"Database Design" },
        { name: "Microservices", val:"Microservices" },
        { name: "APIs", val:"APIs" },
        { name: "Message Queues", val:"Message Queues" },
        { name: "CDNs", val:"CDNs" },
        { name: "Security", val:"Security" },
        { name: "Design Patterns", val:"Design Patterns" },
        { name: "Networking Basics", val:"Networking Basics" },
        { name: "Cloud Services", val:"Cloud Services" },
        { name: "Data Consistency", val:"Data Consistency" },
        { name: "Fault Tolerance", val:"Fault Tolerance" },
        { name: "Monitoring & Logging", val:"Monitoring & Logging" }
    ]},
    { label: "DevOps & CI/CD", value: "DevOps And CICD", tags: [
        { name: "Docker", val:"Docker" },
        { name: "Kubernetes", val:"Kubernetes" },
        { name: "Jenkins", val:"Jenkins" },
        { name: "GitHub Actions", val:"GitHub Actions" },
        { name: "Travis CI", val:"Travis CI" },
        { name: "CircleCI", val:"CircleCI" },
        { name: "Ansible", val:"Ansible" },
        { name: "Terraform", val:"Terraform" },
        { name: "Monitoring Tools", val:"Monitoring Tools" },
        { name: "Infrastructure as Code", val:"Infrastructure as Code" }
    ]},
    { label: "Cloud Computing", value: "Cloud Computing", tags: [
        { name: "AWS", val:"AWS" },
        { name: "Azure", val:"Azure" },
        { name: "Google Cloud", val:"Google Cloud" },
        { name: "Serverless", val:"Serverless" },
        { name: "Cloud Storage", val:"Cloud Storage" },
        { name: "Cloud Databases", val:"Cloud Databases" },
        { name: "Cloud Networking", val:"Cloud Networking" },
        { name: "Cloud Security", val:"Cloud Security" },
        { name: "Cloud Monitoring", val:"Cloud Monitoring" },
        { name: "Cloud DevOps", val:"Cloud DevOps" }
    ]},
    { label: "Interview Preparation", value: "Interview Preparation", tags: [
        { name: "Behavioral Questions", val:"Behavioral Questions" },
        { name: "Technical Questions", val:"Technical Questions" },
        { name: "Mock Interviews", val:"Mock Interviews" },
        { name: "Resume Building", val:"Resume Building" },
        { name: "Coding Challenges", val:"Coding Challenges" },
        { name: "System Design Interviews", val:"System Design Interviews" },
        { name: "Aptitude Tests", val:"Aptitude Tests" }
    ]},
    { label: "Career & Resume", value: "Career And Resume", tags: [
        { name: "Resume Writing", val:"Resume Writing" },
        { name: "Cover Letters", val:"Cover Letters" },
        { name: "Job Search Strategies", val:"Job Search Strategies" },
        { name: "Networking", val:"Networking" },
        { name: "Interview Tips", val:"Interview Tips" },
        { name: "Career Growth", val:"Career Growth" }
]}];

export { options, categories };