import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CourseStore {
  subscribedCourses: Record<string, string[]>;
  paidCourses: Record<string, string[]>;
  subscribeCourse: (courseId: string, username: string) => void;
  payCourse: (courseId: string, username: string) => void;
  unsubscribeCourse: (courseId: string, username: string) => void;
  unpayCourse: (courseId: string, username: string) => void;
  isSubscribed: (courseId: string, username: string) => boolean;
  isPaid: (courseId: string, username: string) => boolean;
}

export const useCourseStore = create<CourseStore>()(
  persist(
    (set, get) => ({
      subscribedCourses: {},
      paidCourses: {},
      subscribeCourse: (courseId, username) => 
        set((state) => ({
          subscribedCourses: {
            ...state.subscribedCourses,
            [username]: [
              ...(state.subscribedCourses[username] || []),
              courseId
            ]
          }
        })),
      payCourse: (courseId, username) =>
        set((state) => ({
          paidCourses: {
            ...state.paidCourses,
            [username]: [
              ...(state.paidCourses[username] || []),
              courseId
            ]
          }
        })),
      unsubscribeCourse: (courseId, username) =>
        set((state) => ({
          subscribedCourses: {
            ...state.subscribedCourses,
            [username]: (state.subscribedCourses[username] || [])
              .filter(id => id !== courseId)
          }
        })),
      unpayCourse: (courseId, username) =>
        set((state) => ({
          paidCourses: {
            ...state.paidCourses,
            [username]: (state.paidCourses[username] || [])
              .filter(id => id !== courseId)
          }
        })),
      isSubscribed: (courseId, username) => 
        (get().subscribedCourses[username] || []).includes(courseId),
      isPaid: (courseId, username) => 
        (get().paidCourses[username] || []).includes(courseId),
    }),
    {
      name: 'course-storage',
    }
  )
); 