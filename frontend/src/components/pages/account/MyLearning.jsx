import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../common/DashboardLayout';
import CourseEnrolled from '../../common/CourseEnrolled';
import { BookOpen } from 'lucide-react';

/* ─── Fake data ─────────────────────────────────────── */
const FAKE_COURSES = {
    1: { id: 1, title: 'React JS & Redux - Complete Masterclass', progress_percentage: 0, level: { name: 'Intermediate' }, image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', _fakeImg: true },
    2: { id: 2, title: 'UI/UX Design Masterclass: From Beginner to Pro', progress_percentage: 0, level: { name: 'Beginner' }, image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', _fakeImg: true },
    3: { id: 3, title: 'Node.js REST APIs & Microservices', progress_percentage: 0, level: { name: 'Advanced' }, image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', _fakeImg: true },
    4: { id: 4, title: 'Digital Marketing & SEO Strategies 2024', progress_percentage: 0, level: { name: 'Beginner' }, image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80', _fakeImg: true },
    5: { id: 5, title: 'Python for Data Science & Machine Learning', progress_percentage: 0, level: { name: 'Intermediate' }, image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80', _fakeImg: true },
    6: { id: 6, title: 'AWS Cloud Practitioner & Solutions Architect', progress_percentage: 0, level: { name: 'Advanced' }, image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80', _fakeImg: true },
    7: { id: 7, title: 'Figma for Beginners: Design Like a Pro', progress_percentage: 0, level: { name: 'Beginner' }, image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?auto=format&fit=crop&w=800&q=80', _fakeImg: true },
    8: { id: 8, title: 'Full-Stack TypeScript with Next.js 14', progress_percentage: 0, level: { name: 'Advanced' }, image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&w=800&q=80', _fakeImg: true },
    9: { id: 9, title: 'Content Marketing & Brand Storytelling', progress_percentage: 0, level: { name: 'Intermediate' }, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', _fakeImg: true },
};
/* ───────────────────────────────────────────────────── */

const MyLearning = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load enrollments specifically for this user
        const userInfo = JSON.parse(localStorage.getItem('userInfoLms') || '{}');
        const storageKey = `enrolledCourses_${userInfo.id || 'guest'}`;
        const enrolledIds = JSON.parse(localStorage.getItem(storageKey) || '[]');
        
        // Map enrolled IDs to the fake course data
        const userCourses = enrolledIds.map(id => {
            const course = FAKE_COURSES[id];
            if (!course) return null;
            const savedData = JSON.parse(localStorage.getItem(`courseProgress_${userInfo.id || 'guest'}_${id}`) || '{"progress":0}');
            return { ...course, progress_percentage: savedData.progress };
        }).filter(Boolean);

        setTimeout(() => {
            setCourses(userCourses);
            setLoading(false);
        }, 500);
    }, []);

    return (
        <DashboardLayout 
            title={<><BookOpen size={28} style={{ color: '#6366F1', marginRight: 10 }} /> My Learning</>}
            subtitle="Pick up exactly where you left off and complete your courses."
        >
            <div className='row gy-4 mt-2'>
                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : courses.length === 0 ? (
                    <div style={emptyStateStyle}>
                        <BookOpen size={48} color="#94A3B8" style={{ marginBottom: 16 }} />
                        <h4 style={{ fontWeight: 700, color: '#0F172A' }}>No courses yet</h4>
                        <p style={{ color: '#64748B' }}>You haven't enrolled in any courses yet.</p>
                    </div>
                ) : (
                    courses.map(course => (
                        <CourseEnrolled key={course.id} course={course} />
                    ))
                )}
            </div>
        </DashboardLayout>
    )
}

const emptyStateStyle = {
    background: 'white',
    borderRadius: 24,
    padding: '4rem 2rem',
    textAlign: 'center',
    boxShadow: '0 4px 25px rgba(0,0,0,0.03)',
    border: '1px solid rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
};

export default MyLearning
