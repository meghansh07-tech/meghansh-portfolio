export const profile = {
  name: 'Meghansh Singh',
  role: 'Aspiring AI Engineer',
  email: 'meghansh062@gmail.com',
  collegeEmail: 'ms25ceb0a50@student.nitw.ac.in',
  location: 'India',
  links: {
    github: 'https://github.com/meghansh07-tech',
    linkedin: 'https://www.linkedin.com/in/meghansh-singh-14232536b/',
    codolio: 'https://codolio.com/profile/meghansh07-tech',
  },
}

export type Project = {
  index: string
  title: string
  tagline: string
  description: string
  image: string
  tags: string[]
  metrics: string[]
  github: string
  demo?: string
  media?: ProjectDemo
}

export type ProjectDemo =
  | { type: 'video'; src: string }
  | { type: 'gallery'; images: { src: string; alt: string; caption: string }[] }

export const projects: Project[] = [
  {
    index: '01',
    title: 'GenAI Customer Service Chatbot',
    tagline: 'RAG · Open-source LLMs',
    description:
      'End-to-end RAG-based customer service bot with context-aware answers over retrieved documents, multi-turn conversation, multilingual support, sentiment analysis, and fully local LLM inference.',
    image: '/projects/genai-chatbot.png',
    tags: ['Python', 'LangChain', 'Streamlit', 'ChromaDB', 'Ollama', 'Embeddings'],
    metrics: ['Multi-turn', 'Multilingual', 'Local inference'],
    github: 'https://github.com/meghansh07-tech/GenAI-Internship',
    media: { type: 'video', src: '/demos/chatbot-demo.mp4' },
  },
  {
    index: '02',
    title: 'Task Manager',
    tagline: 'Productivity · CRUD',
    description:
      'A task management application for creating, organizing, and tracking tasks through their lifecycle, focused on a clean workflow and simple, fast interactions.',
    image: '/projects/task-manager.png',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'Git'],
    metrics: ['Create · Track · Complete'],
    github: 'https://github.com/meghansh07-tech',
  },
  {
    index: '03',
    title: '911 Calls Data Analysis',
    tagline: 'Exploratory data analysis',
    description:
      'EDA on the 911 Emergency Calls dataset to surface trends, peak hours, and emergency categories across thousands of records, presented through visual dashboards.',
    image: '/projects/911-analysis.png',
    tags: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Jupyter'],
    metrics: ['1000s of records', 'Visual dashboards'],
    github: 'https://github.com/meghansh07-tech/Data-Science-And-ML',
    media: {
      type: 'gallery',
      images: [
        {
          src: '/demos/911-overview.png',
          alt: 'Bar charts of 911 calls by month and by day of week split by EMS, Fire and Traffic, plus a total monthly call trend line',
          caption: 'Calls by month and weekday split by reason (EMS, Fire, Traffic), plus the monthly total trend.',
        },
        {
          src: '/demos/911-regression.png',
          alt: 'Seaborn lmplot showing a downward linear regression of monthly 911 call volume',
          caption: 'Linear regression fit (lmplot) of call volume per month, showing a declining trend.',
        },
        {
          src: '/demos/911-heatmap.png',
          alt: 'Heatmap of 911 call volume by day of week and hour of day',
          caption: 'Day-of-week × hour heatmap: calls peak on weekday afternoons around 4–5 PM.',
        },
      ],
    },
  },
  {
    index: '04',
    title: 'Customer Spending Prediction',
    tagline: 'Machine learning · Web app',
    description:
      'Linear Regression model predicting yearly customer spend from behavioural and demographic features, deployed as an interactive Streamlit web application.',
    image: '/projects/spending-prediction.png',
    tags: ['Python', 'Scikit-learn', 'Pandas', 'Streamlit', 'Seaborn'],
    metrics: ['Linear Regression', 'Deployed app'],
    github: 'https://github.com/meghansh07-tech/Data-Science-And-ML',
    media: {
      type: 'gallery',
      images: [
        {
          src: '/demos/spending-inputs.png',
          alt: 'Streamlit Ecommerce Customer Spending Predictor app with input fields for session length, time on app, time on website and membership length',
          caption: 'Live Streamlit app: enter session length, app/website time and membership length. The sidebar shows model details.',
        },
        {
          src: '/demos/spending-result.png',
          alt: 'Streamlit app showing a predicted yearly spending of $4,475.95 after clicking Predict Spending',
          caption: 'The Linear Regression model returns the predicted yearly spend, $4,475.95 in this example.',
        },
      ],
    },
  },
]

export const skillGroups = [
  { title: 'Languages', items: ['Python', 'SQL', 'C++', 'JavaScript'] },
  {
    title: 'GenAI / LLM',
    items: ['RAG', 'LangChain', 'Prompt Engineering', 'Embeddings', 'ChromaDB', 'Vector Databases', 'Ollama', 'Open-Source LLMs'],
  },
  {
    title: 'Frameworks & Libraries',
    items: ['Scikit-learn', 'Streamlit', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
  },
  { title: 'Developer Tools', items: ['Git', 'GitHub', 'VS Code', 'Jupyter Notebook'] },
  { title: 'Web', items: ['HTML5', 'CSS3'] },
  { title: 'Databases', items: ['MySQL'] },
]

export const coursework = [
  'Data Structures & Algorithms',
  'Object-Oriented Programming',
  'Machine Learning',
  'Data Analysis',
  'SQL',
]

export const experience = {
  role: 'Generative AI Intern',
  company: 'Elevance Skills',
  mode: 'Remote',
  period: '2026 · 2 months',
  points: [
    'Built and extended an end-to-end Generative AI application using Python, LangChain, Streamlit, ChromaDB, Ollama, and open-source LLMs.',
    'Implemented retrieval-based QA, document processing, and vector database workflows for medical Q&A and research-paper retrieval.',
    'Integrated chatbot capabilities including contextual responses, conversation handling, and domain-specific question answering.',
  ],
}
