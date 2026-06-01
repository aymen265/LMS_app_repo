import React, { useState, useEffect } from 'react'
import Layout from '../../common/Layout'
import Accordion from 'react-bootstrap/Accordion';
import { MdSlowMotionVideo } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaCheckCircle } from 'react-icons/fa';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useParams, useNavigate } from 'react-router-dom';
import { apiUrl, fileUrl } from '../../common/config';
import { toast } from 'react-toastify';
import CourseReview from './CourseReview';

/* ─── Fake data generator ─────────────────────────────────────── */
const getFakeCourseData = (id) => {
    const courseNames = {
        1: 'React JS & Redux - Complete Masterclass',
        2: 'UI/UX Design Masterclass: From Beginner to Pro',
        3: 'Node.js REST APIs & Microservices',
        4: 'Digital Marketing & SEO Strategies 2024',
        5: 'Python for Data Science & Machine Learning',
        6: 'AWS Cloud Practitioner & Solutions Architect',
        7: 'Figma for Beginners: Design Like a Pro',
        8: 'Full-Stack TypeScript with Next.js 14',
        9: 'Content Marketing & Brand Storytelling'
    };

    const courseVideos = {
        1: ['w7ejDZ8SWv8', 'SqcY0GlETPk', 'Ke90Tje7VS0', 'm7OWXtbiXX8', 'O6P86uwfdR0'], // React
        2: ['c9Wg6Cb_YlU', 'c9Wg6Cb_YlU', 'c9Wg6Cb_YlU', 'c9Wg6Cb_YlU', 'c9Wg6Cb_YlU'], // UI UX
        3: ['TlB_eWDSMt4', 'Oe421EPjeBE', 'fBNz5xF-Kx4', 'TlB_eWDSMt4', 'Oe421EPjeBE']  // Node.js
    };

    const vids = courseVideos[id] || courseVideos[1];

    return {
        id: Number(id) || 1,
        title: courseNames[id] || 'Modern Web Development Course',
        description: 'Comprehensive course covering everything you need to master this topic.',
        chapters: [
            {
                id: 101,
                title: 'Section 1: Introduction',
                lessons: [
                    { id: 1001, title: 'What is this course about?', youtube_id: vids[0], description: 'Introduction to the course concepts and outline.' },
                    { id: 1002, title: 'Setting up the Environment', youtube_id: vids[1], description: 'Installing necessary tools.' },
                    { id: 1003, title: 'Your First Project', youtube_id: vids[2], description: 'Getting your hands dirty with the first project.' }
                ]
            },
            {
                id: 102,
                title: 'Section 2: Core Concepts',
                lessons: [
                    { id: 1004, title: 'Understanding the Basics', youtube_id: vids[3], description: 'Deep dive into fundamental concepts.' },
                    { id: 1005, title: 'Advanced Techniques', youtube_id: vids[4], description: 'Mastering the topic with advanced techniques.' }
                ]
            }
        ]
    };
};
/* ───────────────────────────────────────────────────── */

const WatchCourse = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeLesson, setActiveLesson] = useState(null);
    const userInfo = JSON.parse(localStorage.getItem('userInfoLms') || '{}');
    const storageKey = `courseProgress_${userInfo.id || 'guest'}_${id}`;
    
    // Initialize from localStorage
    const savedData = JSON.parse(localStorage.getItem(storageKey) || '{"completed":[], "progress":0}');
    const [completedLessons, setCompletedLessons] = useState(savedData.completed);
    const [progress, setProgress] = useState(savedData.progress);

    useEffect(() => {
        // Simulating API call
        setTimeout(() => {
            const data = getFakeCourseData(id);
            setCourse(data);
            if (data.chapters[0].lessons.length > 0) {
                // Find first uncompleted lesson, or just default to first
                const firstUncompleted = data.chapters.flatMap(ch => ch.lessons).find(l => !savedData.completed.includes(l.id));
                setActiveLesson(firstUncompleted || data.chapters[0].lessons[0]);
            }
            setLoading(false);
        }, 500);
    }, [id]);

    const handleMarkComplete = async () => {
        if (!activeLesson || !course) return;
        if (!completedLessons.includes(activeLesson.id)) {
            const newCompleted = [...completedLessons, activeLesson.id];
            
            // Calculate actual progress based on total lessons in course
            let totalLessons = 0;
            course.chapters.forEach(ch => totalLessons += ch.lessons.length);
            const newProgress = Math.round((newCompleted.length / totalLessons) * 100);
            
            setCompletedLessons(newCompleted);
            setProgress(newProgress);
            
            // Save to localStorage
            localStorage.setItem(storageKey, JSON.stringify({
                completed: newCompleted,
                progress: newProgress
            }));
            
            toast.success('Progress saved');
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className='container py-5 text-center'>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </Layout>
        );
    }

    if (!course) return null;

    return (
        <Layout>
            <section className='section-5 my-5'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-8'>
                            {/* Video Player */}
                            <div className='video mb-4 shadow-sm bg-dark' style={{ borderRadius: '16px', overflow: 'hidden' }}>
                                {activeLesson?.youtube_id ? (
                                    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                                        <iframe 
                                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                            src={`https://www.youtube.com/embed/${activeLesson.youtube_id}`} 
                                            title={activeLesson.title}
                                            frameBorder="0" 
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                ) : activeLesson?.video ? (
                                    <video
                                        key={activeLesson.id}
                                        width="100%"
                                        height="450"
                                        controls
                                        autoPlay
                                        style={{ backgroundColor: '#000' }}
                                    >
                                        <source src={`${fileUrl}/storage/${activeLesson.video}`} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                ) : (
                                    <div
                                        className="d-flex align-items-center justify-content-center text-white"
                                        style={{ height: '450px' }}
                                    >
                                        <div className="text-center">
                                            <MdSlowMotionVideo size={60} className="mb-3 opacity-50" />
                                            <p className="mb-0">No video available for this lesson</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Mark as Complete & Meta */}
                            <div className='meta-content p-4 bg-white shadow-sm' style={{ borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)' }}>
                                <div className='d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 gap-3'>
                                    <h3 className='mb-0 fw-bold fs-4 text-dark'>{activeLesson?.title || 'Select a lesson'}</h3>
                                    {activeLesson && (
                                        <button 
                                            className={`btn rounded-pill px-4 fw-bold ${completedLessons.includes(activeLesson.id) ? 'btn-success' : 'btn-primary'}`}
                                            onClick={handleMarkComplete}
                                            disabled={completedLessons.includes(activeLesson.id)}
                                        >
                                            {completedLessons.includes(activeLesson.id) ? (
                                                <><FaCheckCircle className="me-2" /> Completed</>
                                            ) : (
                                                'Mark as Complete'
                                            )}
                                        </button>
                                    )}
                                </div>
                                {activeLesson?.description && (
                                    <div className="text-muted" dangerouslySetInnerHTML={{ __html: activeLesson.description }} />
                                )}
                            </div>

                            {/* Course Review Section */}
                            <div className="mt-4">
                                <CourseReview courseId={id} />
                            </div>
                        </div>

                        {/* Sidebar - Course Structure */}
                        <div className='col-md-4'>
                            <div className='card shadow-sm border-0' style={{ borderRadius: '16px' }}>
                                <div className='card-body p-4'>
                                    <div className='h5 fw-bold mb-3 text-primary'>
                                        {course.title}
                                    </div>
                                    <div className='mb-4 bg-light p-3 rounded'>
                                        <div className="d-flex justify-content-between mb-2">
                                            <small className="text-muted fw-semibold">Course Progress</small>
                                            <small className="fw-bold text-success">{progress}%</small>
                                        </div>
                                        <ProgressBar now={progress} variant="success" style={{ height: '8px', borderRadius: '4px' }} />
                                    </div>

                                    <Accordion defaultActiveKey="0" flush id="courseWatchAccordion" className="course-accordion">
                                        {course.chapters?.map((chapter, idx) => (
                                            <Accordion.Item key={chapter.id} eventKey={String(idx)} style={{ border: 'none', borderBottom: '1px solid #F1F5F9' }}>
                                                <Accordion.Header className="fw-bold">{chapter.title}</Accordion.Header>
                                                <Accordion.Body className='p-0'>
                                                    <ul className='lessons mb-0 list-unstyled'>
                                                        {chapter.lessons?.map(lesson => {
                                                            const isCompleted = completedLessons.includes(lesson.id);
                                                            const isActive = activeLesson?.id === lesson.id;
                                                            return (
                                                                <li
                                                                    key={lesson.id}
                                                                    className={`px-3 py-3 d-flex align-items-center justify-content-between border-bottom lesson-item ${isActive ? 'bg-primary bg-opacity-10' : ''}`}
                                                                    style={{ cursor: 'pointer', transition: 'background 0.2s' }}
                                                                    onClick={() => setActiveLesson(lesson)}
                                                                >
                                                                    <div className="d-flex align-items-center pe-3">
                                                                        <MdSlowMotionVideo 
                                                                            size={20} 
                                                                            className={`me-3 ${isActive ? 'text-primary' : 'text-muted'}`} 
                                                                        />
                                                                        <span className={`${isActive ? 'text-primary fw-bold' : 'text-dark fw-medium'}`} style={{ fontSize: '0.95rem' }}>{lesson.title}</span>
                                                                    </div>
                                                                    {isCompleted && (
                                                                        <IoMdCheckmarkCircleOutline className="text-success" size={24} />
                                                                    )}
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        ))}
                                    </Accordion>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default WatchCourse
