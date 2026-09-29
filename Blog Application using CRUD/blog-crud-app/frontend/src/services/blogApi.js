const STORAGE_KEY = 'business_blogs_data_v3';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const initialData = [
  {
    id: "1",
    title: "The Future of Enterprise Architecture",
    author: "Jane Doe",
    content: "Enterprise architecture is rapidly evolving with the advent of cloud-native technologies and microservices. Businesses must adapt their technological foundations to remain competitive in an increasingly digital landscape. The integration of AI and machine learning into core business processes is no longer a luxury, but a necessity for sustainable growth. Companies that fail to modernize their legacy systems will find themselves outpaced by more agile competitors. Furthermore, the rise of edge computing is pushing processing power closer to the source of data generation, minimizing latency and enabling real-time decision-making on an unprecedented scale.",
    date: new Date(Date.now() - 100000000).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "2",
    title: "Strategies for Sustainable Business Growth",
    author: "John Smith",
    content: "Sustainable growth requires a delicate balance between aggressive expansion and robust risk management. Focusing on core competencies while exploring tangential markets allows for diversified revenue streams without overextending resources. Leadership must cultivate a culture of innovation and resilience to navigate economic uncertainties. It's imperative to construct business models that prioritize long-term ecological and societal value over short-term quarterly gains. By integrating ESG (Environmental, Social, and Governance) criteria into every facet of operations, organizations can attract top-tier talent and forge deeper connections with conscientious consumers.",
    date: new Date(Date.now() - 200000000).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "3",
    title: "Data-Driven Decision Making in 2024",
    author: "Alice Johnson",
    content: "In today's fast-paced corporate environment, relying on intuition is no longer sufficient. Organizations must harness the power of big data to drive strategic initiatives. By implementing advanced analytics platforms, companies can uncover hidden patterns, predict market trends, and optimize operational efficiencies across all departments. The transition from reactive reporting to predictive and prescriptive analytics marks a significant maturity in corporate strategy. Leaders must champion data literacy programs to ensure that every employee, regardless of their role, can leverage insights to perform their duties more effectively.",
    date: new Date(Date.now() - 300000000).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "4",
    title: "Navigating Global Supply Chain Disruptions",
    author: "Robert Chen",
    content: "The global supply chain has faced unprecedented volatility in recent years. To build resilience, enterprises are shifting from 'just-in-time' inventory models to 'just-in-case' strategies. Diversifying supplier networks, leveraging blockchain for traceability, and employing predictive AI models to forecast bottlenecks are critical steps in mitigating risk. Nearshoring and reshoring initiatives are gaining traction as companies seek to reduce dependency on distant manufacturing hubs and shorten lead times.",
    date: new Date(Date.now() - 400000000).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "5",
    title: "The Rise of the Chief AI Officer",
    author: "Sarah Williams",
    content: "As artificial intelligence transitions from an experimental technology to a core business driver, the need for specialized executive leadership has emerged. The Chief AI Officer (CAIO) is responsible for aligning AI initiatives with overall corporate strategy, ensuring ethical deployment, and managing the cultural shift associated with automation. This role bridges the gap between technical teams and the C-suite, translating complex algorithms into measurable business value.",
    date: new Date(Date.now() - 500000000).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "6",
    title: "Reimagining the Remote Workspace",
    author: "David Lee",
    content: "The abrupt shift to remote work has permanently altered the corporate landscape. While productivity has remained high for many, maintaining company culture and fostering spontaneous collaboration present ongoing challenges. Forward-thinking companies are investing in immersive virtual environments and asynchronous communication tools to bridge the physical divide. Furthermore, reimagining the physical office as a hub for deep collaboration rather than daily desk work is transforming corporate real estate strategies.",
    date: new Date(Date.now() - 600000000).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "7",
    title: "Cybersecurity in a Zero-Trust World",
    author: "Emily Davis",
    content: "With the proliferation of cloud computing and remote work, traditional perimeter-based security is obsolete. The Zero-Trust model, which operates on the principle of 'never trust, always verify,' has become the new standard. Implementing micro-segmentation, continuous authentication, and least-privilege access protocols is vital to protecting sensitive corporate assets from increasingly sophisticated cyber threats.",
    date: new Date(Date.now() - 700000000).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "8",
    title: "Optimizing Customer Experience (CX) through Omnichannel Integration",
    author: "Michael Brown",
    content: "Today's consumers expect seamless interactions across all touchpoints, whether physical or digital. Achieving true omnichannel integration requires breaking down data silos and implementing unified customer profiles. By leveraging AI-driven personalization and real-time behavioral analytics, businesses can deliver hyper-relevant experiences that drive loyalty and increase customer lifetime value.",
    date: new Date(Date.now() - 800000000).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "9",
    title: "Quantum Computing: The Next Frontier",
    author: "Elena Rodriguez",
    content: "Quantum computing promises to solve complex problems that are currently intractable for classical computers. Industries ranging from pharmaceuticals to financial services are investing heavily in quantum research. While widespread commercial application may still be years away, forward-thinking organizations are already exploring quantum algorithms and developing quantum-safe cryptography to protect their data against future threats.",
    date: new Date(Date.now() - 900000000).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "10",
    title: "Building Resilient Corporate Cultures",
    author: "William Taylor",
    content: "A resilient corporate culture is one that can adapt to rapid change, overcome adversity, and continuously innovate. This requires a foundation of psychological safety, where employees feel comfortable taking calculated risks and sharing dissenting opinions. Leadership must prioritize transparent communication, continuous learning, and recognizing employee contributions to foster a highly engaged and resilient workforce.",
    date: new Date(Date.now() - 1000000000).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "11",
    title: "The Evolution of Fintech and Decentralized Finance",
    author: "Sophia Martinez",
    content: "Decentralized Finance (DeFi) is challenging traditional financial institutions by offering borderless, permissionless, and transparent financial services via blockchain technology. Smart contracts are automating complex financial transactions, reducing the need for intermediaries. As regulatory frameworks adapt, the integration of traditional banking with DeFi protocols will likely create a more inclusive and efficient global financial system.",
    date: new Date(Date.now() - 1100000000).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "12",
    title: "Sustainable Packaging and the Circular Economy",
    author: "Thomas Anderson",
    content: "Consumer demand and stringent environmental regulations are driving a shift towards sustainable packaging. The transition from a linear 'take-make-dispose' model to a circular economy focuses on reducing waste and maximizing resource efficiency. Innovations in biodegradable materials and reusable packaging systems are not only minimizing environmental impact but also unlocking new avenues for brand differentiation and operational cost savings.",
    date: new Date(Date.now() - 1200000000).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1000&auto=format&fit=crop"
  }
];

const getStoredBlogs = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }
  return JSON.parse(stored);
};

export const getBlogs = async () => {
  await delay(600); // Simulate network latency
  return getStoredBlogs();
};

export const getBlogById = async (id) => {
  await delay(400);
  const blogs = getStoredBlogs();
  const blog = blogs.find(b => b.id === String(id));
  if (!blog) throw new Error("Blog not found");
  return blog;
};

export const createBlog = async (blog) => {
  await delay(600);
  const blogs = getStoredBlogs();
  const newBlog = {
    ...blog,
    id: Date.now().toString(),
    date: new Date().toISOString()
  };
  blogs.push(newBlog);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
  return newBlog;
};

export const updateBlog = async (id, updatedBlog) => {
  await delay(600);
  let blogs = getStoredBlogs();
  const index = blogs.findIndex(b => b.id === String(id));
  if (index === -1) throw new Error("Blog not found");
  
  blogs[index] = { ...blogs[index], ...updatedBlog };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
  return blogs[index];
};

export const deleteBlog = async (id) => {
  await delay(600);
  let blogs = getStoredBlogs();
  blogs = blogs.filter(b => b.id !== String(id));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
  return { success: true };
};
