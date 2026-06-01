require('dotenv').config();
const mongoose = require('mongoose');
const Blog = require('./models/Blog');

mongoose.connect('mongodb+srv://Vaalmiki:9ZPbcaXp7EQTGr9Z@vaalmiki.kupkv7b.mongodb.net/shecan?appName=Vaalmiki');

const blogs = [
  {
    title: 'How Digital Skills Are Changing Lives for Young Women in India',
    slug: 'digital-skills-changing-lives',
    excerpt: 'Across India, young women are breaking barriers using digital tools. Here is how She Can Foundation is supporting this transformation.',
    content: '<p>Technology has become the great equalizer of our time. For young women across India — especially in tier-2 and tier-3 cities — access to digital skills is opening doors that were once firmly shut.</p><p>At She Can Foundation, we have seen firsthand how a single skill — whether it is learning to build a website, manage social media, or use spreadsheets — can completely change a young woman\'s trajectory.</p><h2>The Digital Divide is Real</h2><p>Despite India\'s rapid digital growth, the gender gap in technology remains significant. Women make up less than 30% of the tech workforce. Many young women graduate without basic digital literacy, putting them at a severe disadvantage in today\'s job market.</p><h2>What We Are Doing About It</h2><p>Our Digital Literacy Program runs monthly workshops covering everything from basic computing to web development. Participants leave with practical skills they can immediately apply — whether launching a freelance career, improving their employability, or starting their own business.</p><p>The results speak for themselves: 78% of our program graduates reported finding better employment opportunities within 3 months of completing the course.</p>',
    category: 'Technology',
    image: 'https://picsum.photos/seed/blog1tech/800/400',
    author: 'She Can Team',
    published: true
  },
  {
    title: 'Dear Fresher: You Are More Ready Than You Think',
    slug: 'dear-fresher-you-are-ready',
    excerpt: 'Starting your career journey can feel overwhelming. Here is a letter from our team to every first-timer stepping into the professional world.',
    content: '<p>Dear Fresher,</p><p>We know how you feel. That mix of excitement and absolute terror when you look at a job posting that asks for "3 years of experience" for an entry-level role. The imposter syndrome that whispers you are not qualified enough, experienced enough, or good enough.</p><p>We are here to tell you: you are more ready than you think.</p><h2>Experience is Overrated (Sometimes)</h2><p>The most important qualities employers are actually looking for — curiosity, willingness to learn, reliability, and enthusiasm — are things you already have. Skills can be taught. Attitude cannot.</p><h2>Start Small, Dream Big</h2><p>Your first internship does not have to be at a Fortune 500 company. Starting at a small NGO, a local startup, or a community project is where the REAL learning happens. You get exposure, responsibility, and mentorship that big companies rarely offer juniors.</p><p>That is exactly why we created our internship program at She Can Foundation. We want to be your first step — a safe, supportive space where you can learn, make mistakes, and grow.</p><p>So take that step. Apply. Show up. Give your best. The rest will follow.</p><p>With belief in you,<br>The She Can Team</p>',
    category: 'Empowerment',
    image: 'https://picsum.photos/seed/blog2emp/800/400',
    author: 'Priya Sharma',
    published: true
  },
  {
    title: '5 Free Tools Every Aspiring Web Developer Should Know',
    slug: '5-free-tools-web-developer',
    excerpt: 'You do not need expensive software to learn web development. These 5 completely free tools will get you started today.',
    content: '<p>One of the biggest myths about learning web development is that you need expensive software or courses. The truth? You can get started with nothing but a laptop and an internet connection.</p><p>Here are 5 completely free tools we recommend to all our interns:</p><h2>1. VS Code (Code Editor)</h2><p>Visual Studio Code by Microsoft is the industry-standard code editor used by millions of developers worldwide. It is free, fast, and packed with extensions. Download it at code.visualstudio.com.</p><h2>2. GitHub (Version Control + Portfolio)</h2><p>GitHub is where developers store their code, collaborate, and showcase their work. As a student, it is also your portfolio. Start pushing your projects here from day one.</p><h2>3. Figma (Design)</h2><p>Even if you are a developer, understanding design is invaluable. Figma is a free, browser-based design tool used by professional UI/UX designers. The free plan is more than enough to get started.</p><h2>4. MDN Web Docs (Learning Resource)</h2><p>Mozilla\'s documentation is the bible of web development. Any question about HTML, CSS, or JavaScript — MDN has the answer. Bookmark it immediately.</p><h2>5. Chrome DevTools (Debugging)</h2><p>Built right into your Chrome browser, DevTools lets you inspect any website\'s code, debug problems, and test your own sites. Press F12 to open it and start exploring.</p><p>At She Can Foundation, our interns use all of these tools during their internship. They are industry-standard, completely free, and will serve you throughout your career.</p>',
    category: 'Technology',
    image: 'https://picsum.photos/seed/blog3tools/800/400',
    author: 'Tech Team',
    published: true
  }
];

async function seed() {
  try {
    await Blog.deleteMany({});
    await Blog.insertMany(blogs);
    console.log('✅ Sample blog posts created successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
}

seed();
