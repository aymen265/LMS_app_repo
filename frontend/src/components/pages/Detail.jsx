import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Accordion, ListGroup } from "react-bootstrap";
import Layout from '../common/Layout';
import { toast } from 'react-toastify';
import { 
    Star, BookOpen, Users, Award, Tv, Infinity, Check, Play, 
    Lock, Globe, Layers, ChevronRight, Calendar, UserCheck, Clock
} from 'lucide-react';

/* ─── Fake Course Catalog (same IDs as courses.jsx) ──────────────── */
const FAKE_COURSES = {
    1: {
        id: 1,
        title: 'React JS & Redux - Complete Masterclass',
        description: 'Master React JS from the ground up. Learn JSX, Hooks, Redux Toolkit, React Router, and build 5 real-world projects that you can add to your portfolio. This course is designed for developers who want to become proficient in the most popular front-end framework.',
        price: '49.99', cross_price: '99.99',
        category: { name: 'Development' },
        level: { name: 'Intermediate' },
        language: { name: 'English' },
        enrollments_count: 3241,
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80',
        _fakeImg: true,
        user: { name: 'Ahmed Bouzid', designation: 'Senior React Developer' },
        outcomes: [
            { id: 1, text: 'Build modern React apps with Hooks' },
            { id: 2, text: 'Manage state with Redux Toolkit' },
            { id: 3, text: 'Implement React Router for SPA navigation' },
            { id: 4, text: 'Fetch and display API data dynamically' },
            { id: 5, text: 'Deploy your React apps to production' },
            { id: 6, text: 'Write clean, reusable component code' },
        ],
        requirements: [
            { id: 1, text: 'Basic knowledge of HTML, CSS, and JavaScript' },
            { id: 2, text: 'A computer with Node.js installed' },
        ],
        chapters: [
            { id: 101, title: 'Introduction to React', lessons: [{ id: 1001, title: 'What is React?', is_free_preview: 'yes', duration: 8 }, { id: 1002, title: 'Setting up the Environment', is_free_preview: 'yes', duration: 12 }, { id: 1003, title: 'Your First Component', is_free_preview: 'no', duration: 15 }] },
            { id: 102, title: 'React State & Props', lessons: [{ id: 1004, title: 'useState Hook', is_free_preview: 'no', duration: 20 }, { id: 1005, title: 'Props & Data Flow', is_free_preview: 'no', duration: 18 }] },
            { id: 103, title: 'Redux Toolkit', lessons: [{ id: 1006, title: 'createSlice & configureStore', is_free_preview: 'no', duration: 25 }, { id: 1007, title: 'Async Thunks', is_free_preview: 'no', duration: 22 }] },
        ],
    },
    2: {
        id: 2,
        title: 'UI/UX Design Masterclass: From Beginner to Pro',
        description: 'Learn UI/UX design from scratch using Figma, the world\'s most popular design tool. You will learn design theory, user research, wireframing, prototyping, and how to build a strong portfolio that lands you a design job.',
        price: '39.99', cross_price: '89.99',
        category: { name: 'Design' },
        level: { name: 'Beginner' },
        language: { name: 'English' },
        enrollments_count: 5120,
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80',
        _fakeImg: true,
        user: { name: 'Sara Khalid', designation: 'Lead UI/UX Designer' },
        outcomes: [
            { id: 1, text: 'Master Figma for professional UI design' },
            { id: 2, text: 'Create wireframes and interactive prototypes' },
            { id: 3, text: 'Apply color theory and typography principles' },
            { id: 4, text: 'Conduct user research and usability tests' },
            { id: 5, text: 'Build a portfolio ready for job applications' },
            { id: 6, text: 'Design for mobile-first and responsive layouts' },
        ],
        requirements: [
            { id: 1, text: 'No design experience needed — start from scratch' },
            { id: 2, text: 'A computer with internet access (Figma is free)' },
        ],
        chapters: [
            { id: 201, title: 'Design Fundamentals', lessons: [{ id: 2001, title: 'Color Theory', is_free_preview: 'yes', duration: 14 }, { id: 2002, title: 'Typography Basics', is_free_preview: 'yes', duration: 10 }] },
            { id: 202, title: 'Figma Essentials', lessons: [{ id: 2003, title: 'Interface Overview', is_free_preview: 'no', duration: 18 }, { id: 2004, title: 'Frames & Components', is_free_preview: 'no', duration: 22 }] },
        ],
    },
    3: {
        id: 3,
        title: 'Node.js REST APIs & Microservices',
        description: 'Go deep into backend development with Node.js and Express. You will build production-grade REST APIs, work with MongoDB, handle authentication with JWT, and architect scalable microservices. Perfect for developers ready to tackle real-world backend challenges.',
        price: '59.99', cross_price: '119.99',
        category: { name: 'Backend' },
        level: { name: 'Advanced' },
        language: { name: 'English' },
        enrollments_count: 1890,
        image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=1200&q=80',
        _fakeImg: true,
        user: { name: 'Youssef Amrani', designation: 'Backend Engineer @ Google' },
        outcomes: [
            { id: 1, text: 'Build RESTful APIs with Node.js & Express' },
            { id: 2, text: 'Connect to MongoDB with Mongoose' },
            { id: 3, text: 'Implement JWT-based authentication' },
            { id: 4, text: 'Design and architect microservices' },
            { id: 5, text: 'Deploy to cloud with Docker & Kubernetes' },
            { id: 6, text: 'Write comprehensive API tests with Jest' },
        ],
        requirements: [
            { id: 1, text: 'Solid understanding of JavaScript (ES6+)' },
            { id: 2, text: 'Basic understanding of HTTP and REST principles' },
        ],
        chapters: [
            { id: 301, title: 'Node.js Fundamentals', lessons: [{ id: 3001, title: 'Event Loop & Async', is_free_preview: 'yes', duration: 16 }, { id: 3002, title: 'Modules & npm', is_free_preview: 'yes', duration: 11 }] },
            { id: 302, title: 'Express Framework', lessons: [{ id: 3003, title: 'Routing & Middleware', is_free_preview: 'no', duration: 24 }, { id: 3004, title: 'Error Handling', is_free_preview: 'no', duration: 19 }] },
            { id: 303, title: 'Authentication & Security', lessons: [{ id: 3005, title: 'JWT Tokens', is_free_preview: 'no', duration: 27 }, { id: 3006, title: 'bcrypt & Password Hashing', is_free_preview: 'no', duration: 15 }] },
        ],
    },
    4: {
        id: 4, title: 'Digital Marketing & SEO Strategies 2024',
        description: 'Learn the full digital marketing stack: SEO, social media marketing, Google Ads, email campaigns, and content strategy. Practical, data-driven techniques used by top marketers at leading brands worldwide.',
        price: '29.99', cross_price: '69.99',
        category: { name: 'Marketing' }, level: { name: 'Beginner' }, language: { name: 'English' },
        enrollments_count: 8430, image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1200&q=80', _fakeImg: true,
        user: { name: 'Nadia Benali', designation: 'Digital Marketing Consultant' },
        outcomes: [{ id: 1, text: 'Master SEO on-page and off-page techniques' }, { id: 2, text: 'Run profitable Google Ads campaigns' }, { id: 3, text: 'Build and grow social media presence' }, { id: 4, text: 'Create high-converting email sequences' }],
        requirements: [{ id: 1, text: 'No prior marketing experience needed' }],
        chapters: [{ id: 401, title: 'SEO Fundamentals', lessons: [{ id: 4001, title: 'Keyword Research', is_free_preview: 'yes', duration: 15 }, { id: 4002, title: 'On-Page SEO', is_free_preview: 'no', duration: 20 }] }],
    },
    5: {
        id: 5, title: 'Python for Data Science & Machine Learning',
        description: 'Dive into Python, NumPy, Pandas, Matplotlib, Seaborn, Scikit-Learn, and TensorFlow. Build end-to-end machine learning pipelines and deploy models to production. Gain the skills to land a data science role.',
        price: '54.99', cross_price: '109.99',
        category: { name: 'Data Science' }, level: { name: 'Intermediate' }, language: { name: 'English' },
        enrollments_count: 6710, image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80', _fakeImg: true,
        user: { name: 'Omar El Fassi', designation: 'Data Scientist @ Meta' },
        outcomes: [{ id: 1, text: 'Use Pandas and NumPy for data manipulation' }, { id: 2, text: 'Visualize data with Matplotlib and Seaborn' }, { id: 3, text: 'Build ML models with Scikit-Learn' }, { id: 4, text: 'Create neural networks with TensorFlow' }],
        requirements: [{ id: 1, text: 'Basic Python programming knowledge' }, { id: 2, text: 'High school level math' }],
        chapters: [{ id: 501, title: 'Python & NumPy', lessons: [{ id: 5001, title: 'NumPy Arrays', is_free_preview: 'yes', duration: 18 }, { id: 5002, title: 'Pandas DataFrames', is_free_preview: 'no', duration: 22 }] }],
    },
    6: { id: 6, title: 'AWS Cloud Practitioner & Solutions Architect', description: 'Get AWS certified and master cloud architecture. Learn EC2, S3, RDS, Lambda, CloudFormation and more. This course prepares you for the AWS Cloud Practitioner and Solutions Architect Associate certifications.', price: '64.99', cross_price: '129.99', category: { name: 'Development' }, level: { name: 'Advanced' }, language: { name: 'English' }, enrollments_count: 2350, image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80', _fakeImg: true, user: { name: 'Hamza Tazi', designation: 'AWS Solutions Architect' }, outcomes: [{ id: 1, text: 'Pass the AWS Cloud Practitioner exam' }, { id: 2, text: 'Design scalable cloud architectures' }], requirements: [{ id: 1, text: 'Basic understanding of web services' }], chapters: [{ id: 601, title: 'AWS Core Services', lessons: [{ id: 6001, title: 'EC2 Deep Dive', is_free_preview: 'yes', duration: 20 }, { id: 6002, title: 'S3 & Storage', is_free_preview: 'no', duration: 15 }] }] },
    7: { id: 7, title: 'Figma for Beginners: Design Like a Pro', description: 'Start designing beautiful apps and websites from day one with Figma. Covers all the essential tools, auto-layout, components, variables, and how to present work to clients professionally.', price: '24.99', cross_price: '59.99', category: { name: 'Design' }, level: { name: 'Beginner' }, language: { name: 'English' }, enrollments_count: 4210, image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?auto=format&fit=crop&w=1200&q=80', _fakeImg: true, user: { name: 'Ines Mouti', designation: 'Product Designer @ Airbnb' }, outcomes: [{ id: 1, text: 'Navigate Figma like a professional' }, { id: 2, text: 'Create reusable components and design systems' }], requirements: [{ id: 1, text: 'No prior design experience needed' }], chapters: [{ id: 701, title: 'Figma Basics', lessons: [{ id: 7001, title: 'Shapes & Frames', is_free_preview: 'yes', duration: 10 }, { id: 7002, title: 'Auto Layout', is_free_preview: 'no', duration: 18 }] }] },
    8: { id: 8, title: 'Full-Stack TypeScript with Next.js 14', description: 'Build production-ready full-stack web applications using Next.js 14, TypeScript, Prisma, and PostgreSQL. Master the App Router, Server Components, Server Actions, and deploy to Vercel.', price: '69.99', cross_price: '139.99', category: { name: 'Development' }, level: { name: 'Advanced' }, language: { name: 'English' }, enrollments_count: 1540, image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&w=1200&q=80', _fakeImg: true, user: { name: 'Karim Drissi', designation: 'Full-Stack Engineer' }, outcomes: [{ id: 1, text: 'Build apps with Next.js 14 App Router' }, { id: 2, text: 'Write type-safe code with TypeScript' }], requirements: [{ id: 1, text: 'Good knowledge of React and JavaScript' }], chapters: [{ id: 801, title: 'Next.js 14 Fundamentals', lessons: [{ id: 8001, title: 'App Router & Layouts', is_free_preview: 'yes', duration: 20 }, { id: 8002, title: 'Server Components', is_free_preview: 'no', duration: 25 }] }] },
    9: { id: 9, title: 'Content Marketing & Brand Storytelling', description: 'Learn how to create compelling content strategies, write copy that converts, and build a brand narrative that resonates with your audience. Perfect for marketers, entrepreneurs, and content creators.', price: '34.99', cross_price: '74.99', category: { name: 'Marketing' }, level: { name: 'Intermediate' }, language: { name: 'English' }, enrollments_count: 3670, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80', _fakeImg: true, user: { name: 'Salma Idrissi', designation: 'Brand Strategist' }, outcomes: [{ id: 1, text: 'Develop a winning content marketing strategy' }, { id: 2, text: 'Write copy that converts visitors to customers' }], requirements: [{ id: 1, text: 'Basic writing skills in English' }], chapters: [{ id: 901, title: 'Content Strategy', lessons: [{ id: 9001, title: 'Audience Research', is_free_preview: 'yes', duration: 12 }, { id: 9002, title: 'Content Calendar', is_free_preview: 'no', duration: 16 }] }] },
};
/* ─────────────────────────────────────────────────────────────────── */

const Detail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [enrolled, setEnrolled] = useState(false);
    const [enrolling, setEnrolling] = useState(false);

    useEffect(() => {
        // Use fake data if ID matches, otherwise try API
        const fakeCourse = FAKE_COURSES[Number(id)];
        if (fakeCourse) {
            setCourse(fakeCourse);
            setLoading(false);
            checkEnrollment();
        } else {
            fetchCourse();
        }
    }, [id]);

    const checkEnrollment = () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfoLms') || '{}');
        if (!userInfo?.token) return;
        
        const storageKey = `enrolledCourses_${userInfo.id || 'guest'}`;
        const enrolledIds = JSON.parse(localStorage.getItem(storageKey) || '[]');
        if (enrolledIds.includes(Number(id))) {
            setEnrolled(true);
        }
    };

    const fetchCourse = async () => {
        try {
            const res = await fetch(`http://localhost:8000/api/public/courses/${id}`);
            const result = await res.json();
            if (res.ok) {
                setCourse(result.data);
                checkEnrollment();
            } else {
                toast.error('Course not found');
                navigate('/courses');
            }
        } catch (error) {
            toast.error('Error loading course');
            navigate('/courses');
        } finally {
            setLoading(false);
        }
    };

    const handleEnroll = () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfoLms') || '{}');
        if (!userInfo?.token) {
            toast.info('Please login to enroll');
            navigate('/account/login');
            return;
        }
        
        setEnrolling(true);
        setTimeout(() => {
            const storageKey = `enrolledCourses_${userInfo.id || 'guest'}`;
            const enrolledIds = JSON.parse(localStorage.getItem(storageKey) || '[]');
            if (!enrolledIds.includes(Number(id))) {
                enrolledIds.push(Number(id));
                localStorage.setItem(storageKey, JSON.stringify(enrolledIds));
            }
            setEnrolled(true);
            setEnrolling(false);
            toast.success('🎉 Enrolled successfully! Go to My Learning to start.');
        }, 800);
    };

    if (loading) {
        return (
            <Layout>
                <div className='container py-5 min-vh-100 d-flex align-items-center justify-content-center'>
                    <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </Layout>
        );
    }

    if (!course) return null;

    const totalLessons = course.chapters ? course.chapters.reduce((sum, ch) => sum + (ch.lessons ? ch.lessons.length : 0), 0) : 0;
    const totalDuration = course.chapters ? course.chapters.reduce((sum, ch) => sum + (ch.lessons ? ch.lessons.reduce((s, l) => s + (l.duration || 0), 0) : 0), 0) : 0;

    return (
        <Layout>
            {/* Breadcrumb */}
            <div style={{ background: 'var(--bg-main)', borderBottom: '1px solid var(--border-light)', padding: '1rem 0' }}>
                <div className="container">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 align-items-center small fw-semibold">
                            <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-muted">Home</Link></li>
                            <li className="breadcrumb-item"><Link to="/courses" className="text-decoration-none text-muted">Courses</Link></li>
                            <li className="breadcrumb-item active text-primary" aria-current="page">{course.title}</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className='container pb-5 pt-5'>
                <div className='row g-5'>
                    {/* ── Left Content ── */}
                    <div className='col-lg-8'>

                        {/* Category Badge */}
                        {course.category && (
                            <span style={{ background: 'rgba(99,102,241,0.1)', color: '#6366F1', padding: '6px 14px', borderRadius: 50, fontSize: '0.82rem', fontWeight: 700, display: 'inline-block', marginBottom: 16 }}>
                                {course.category.name}
                            </span>
                        )}

                        {/* Title */}
                        <h1 style={{ fontWeight: 900, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: 'var(--text-main)', lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
                            {course.title}
                        </h1>

                        {/* Rating & Date Row */}
                        <div className='d-flex flex-wrap align-items-center gap-4 mb-4 pb-4' style={{ borderBottom: '1px solid var(--border-light)' }}>
                            <div className='d-flex align-items-center gap-2'>
                                <span style={{ fontWeight: 800, color: '#F59E0B', fontSize: '1.1rem' }}>5.0</span>
                                <div className="d-flex" style={{ color: '#F59E0B' }}>
                                    {[...Array(5)].map((_, i) => <Star key={i} size={16} style={{ fill: 'currentColor' }} />)}
                                </div>
                                <span className="text-muted small">({(course.enrollments_count / 26).toFixed(0)} reviews)</span>
                            </div>
                            <div className="text-muted small d-flex align-items-center gap-1">
                                <Calendar size={15} style={{ color: '#6366F1' }} />
                                <span>Last updated {new Date().toLocaleDateString()}</span>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="row g-3 mb-5">
                            {[
                                { icon: <Layers size={22} />, label: 'Level', value: course.level?.name || 'All Levels', color: '#6366F1' },
                                { icon: <Users size={22} />, label: 'Students', value: `${course.enrollments_count?.toLocaleString()} enrolled`, color: '#A855F7' },
                                { icon: <Globe size={22} />, label: 'Language', value: course.language?.name || 'English', color: '#10B981' },
                                { icon: <Clock size={22} />, label: 'Duration', value: `${Math.floor(totalDuration / 60)}h ${totalDuration % 60}min`, color: '#F59E0B' },
                            ].map((stat, i) => (
                                <div key={i} className="col-6 col-sm-3">
                                    <div style={{ background: 'var(--bg-white)', border: '1px solid var(--border-light)', borderRadius: 16, padding: '1rem', textAlign: 'center', transition: 'all 0.2s' }}>
                                        <span style={{ color: stat.color }}>{stat.icon}</span>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
                                        <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.9rem', marginTop: 2 }}>{stat.value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Description */}
                        <div className='mb-4' style={{ background: 'var(--bg-white)', borderRadius: 20, padding: '1.8rem', border: '1px solid var(--border-light)' }}>
                            <h3 style={{ fontWeight: 800, color: '#6366F1', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.8rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 8, fontSize: '1.2rem' }}>
                                <BookOpen size={20} /> Overview
                            </h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, margin: 0 }}>{course.description}</p>
                        </div>

                        {/* What You'll Learn */}
                        {course.outcomes && course.outcomes.length > 0 && (
                            <div className='mb-4' style={{ background: 'var(--bg-white)', borderRadius: 20, padding: '1.8rem', border: '1px solid var(--border-light)' }}>
                                <h3 style={{ fontWeight: 800, color: '#6366F1', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.8rem', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: 8, fontSize: '1.2rem' }}>
                                    <Award size={20} /> What You'll Learn
                                </h3>
                                <div className="row g-3">
                                    {course.outcomes.map(outcome => (
                                        <div key={outcome.id} className="col-md-6 d-flex align-items-start gap-2">
                                            <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(34,197,94,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                                                <Check size={13} style={{ color: '#22C55E' }} strokeWidth={3} />
                                            </div>
                                            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>{outcome.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Requirements */}
                        {course.requirements && course.requirements.length > 0 && (
                            <div className='mb-4' style={{ background: 'var(--bg-white)', borderRadius: 20, padding: '1.8rem', border: '1px solid var(--border-light)' }}>
                                <h3 style={{ fontWeight: 800, color: '#6366F1', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.8rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 8, fontSize: '1.2rem' }}>
                                    <UserCheck size={20} /> Requirements
                                </h3>
                                <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
                                    {course.requirements.map(req => (
                                        <li key={req.id} className="d-flex align-items-center gap-2" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>
                                            <span style={{ color: '#6366F1', fontWeight: 800, fontSize: '1.3rem', lineHeight: 1 }}>•</span>
                                            {req.text}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Course Structure */}
                        {course.chapters && course.chapters.length > 0 && (
                            <div className='mb-4' style={{ background: 'var(--bg-white)', borderRadius: 20, padding: '1.8rem', border: '1px solid var(--border-light)' }}>
                                <h3 style={{ fontWeight: 800, color: '#6366F1', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.8rem', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: 8, fontSize: '1.2rem' }}>
                                    <Layers size={20} /> Course Structure
                                </h3>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', fontWeight: 600 }}>
                                    {course.chapters.length} sections • {totalLessons} lessons • {Math.floor(totalDuration / 60)}h {totalDuration % 60}min total
                                </div>
                                <Accordion defaultActiveKey="0" id="courseAccordion" className="accordion-modern">
                                    {course.chapters.map((chapter, index) => (
                                        <Accordion.Item key={chapter.id} eventKey={String(index)}>
                                            <Accordion.Header>
                                                <div className="d-flex align-items-center justify-content-between w-100 pe-3">
                                                    <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{chapter.title}</span>
                                                    <span style={{ background: 'rgba(99,102,241,0.1)', color: '#6366F1', padding: '3px 10px', borderRadius: 50, fontSize: '0.78rem', fontWeight: 700 }}>
                                                        {chapter.lessons?.length || 0} lessons
                                                    </span>
                                                </div>
                                            </Accordion.Header>
                                            <Accordion.Body className="p-0">
                                                <ListGroup variant="flush">
                                                    {chapter.lessons?.map(lesson => (
                                                        <ListGroup.Item key={lesson.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.9rem 1.2rem', background: 'transparent', borderColor: 'var(--border-light)', color: 'var(--text-main)' }}>
                                                            <div className="d-flex align-items-center gap-3">
                                                                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(99,102,241,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                    <Play size={14} style={{ color: '#6366F1' }} />
                                                                </div>
                                                                <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-main)' }}>{lesson.title}</span>
                                                            </div>
                                                            <div className="d-flex align-items-center gap-2">
                                                                {lesson.is_free_preview === 'yes' ? (
                                                                    <span style={{ background: 'rgba(34,197,94,0.1)', color: '#22C55E', padding: '3px 10px', borderRadius: 50, fontSize: '0.75rem', fontWeight: 700 }}>Preview</span>
                                                                ) : (
                                                                    <Lock size={14} style={{ color: '#94A3B8' }} />
                                                                )}
                                                                {lesson.duration && (
                                                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>{lesson.duration} min</span>
                                                                )}
                                                            </div>
                                                        </ListGroup.Item>
                                                    ))}
                                                </ListGroup>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    ))}
                                </Accordion>
                            </div>
                        )}
                    </div>

                    {/* ── Sticky Price Card Sidebar ── */}
                    <div className='col-lg-4'>
                        <div className="position-sticky" style={{ top: '90px' }}>
                            <div style={{ background: 'var(--bg-white)', borderRadius: 24, border: '1px solid var(--border-light)', boxShadow: '0 20px 50px -10px rgba(99,102,241,0.15)', overflow: 'hidden' }}>
                                {/* Course Image */}
                                <div style={{ height: 220, overflow: 'hidden', position: 'relative' }}>
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }} />
                                </div>

                                <div style={{ padding: '1.8rem' }}>
                                    {/* Price */}
                                    <div className="d-flex align-items-baseline gap-2 mb-4">
                                        <span style={{ fontSize: '2.2rem', fontWeight: 900, color: '#6366F1' }}>${course.price}</span>
                                        {course.cross_price && (
                                            <span style={{ color: 'var(--text-muted)', textDecoration: 'line-through', fontWeight: 600 }}>${course.cross_price}</span>
                                        )}
                                        {course.cross_price && (
                                            <span style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444', padding: '3px 10px', borderRadius: 50, fontSize: '0.8rem', fontWeight: 700 }}>
                                                {Math.round((1 - course.price / course.cross_price) * 100)}% OFF
                                            </span>
                                        )}
                                    </div>

                                    {/* Enroll Button */}
                                    <div className="mb-4">
                                        {enrolled ? (
                                            <button style={enrolledBtnStyle} disabled>
                                                <Check size={18} strokeWidth={3} /> Enrolled — Go to Learning
                                            </button>
                                        ) : (
                                            <button style={enrollBtnStyle} onClick={handleEnroll} disabled={enrolling}>
                                                {enrolling ? 'Enrolling...' : 'Enroll Now'} <ChevronRight size={18} />
                                            </button>
                                        )}
                                    </div>

                                    {/* Includes */}
                                    <h6 style={{ fontWeight: 800, color: 'var(--text-main)', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.7rem', marginBottom: '0.9rem' }}>This course includes:</h6>
                                    <div className="d-flex flex-column gap-3">
                                        {[
                                            { icon: <Infinity size={16} />, text: 'Full lifetime access' },
                                            { icon: <Tv size={16} />, text: 'Access on mobile and TV' },
                                            { icon: <Award size={16} />, text: 'Certificate of completion' },
                                            { icon: <BookOpen size={16} />, text: `${totalLessons} lessons included` },
                                        ].map((item, i) => (
                                            <div key={i} className="d-flex align-items-center gap-2" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>
                                                <span style={{ color: '#6366F1' }}>{item.icon}</span>
                                                {item.text}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Instructor */}
                                    {course.user && (
                                        <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)' }}>
                                            <h6 style={{ fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.8rem' }}>Instructor</h6>
                                            <div className="d-flex align-items-center gap-3">
                                                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #6366F1 0%, #A855F7 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '1.1rem', flexShrink: 0 }}>
                                                    {course.user.name?.charAt(0)}
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.9rem' }}>{course.user.name}</div>
                                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{course.user.designation}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

const enrollBtnStyle = {
    width: '100%', padding: '14px 0', borderRadius: 14, border: 'none', cursor: 'pointer',
    background: 'linear-gradient(135deg, #6366F1 0%, #A855F7 100%)',
    color: 'white', fontWeight: 800, fontSize: '1rem',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    boxShadow: '0 10px 25px -5px rgba(99,102,241,0.4)',
    transition: 'all 0.3s',
};

const enrolledBtnStyle = {
    width: '100%', padding: '14px 0', borderRadius: 14, border: 'none', cursor: 'default',
    background: 'rgba(34,197,94,0.12)', color: '#22C55E',
    fontWeight: 800, fontSize: '1rem',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
};

export default Detail
