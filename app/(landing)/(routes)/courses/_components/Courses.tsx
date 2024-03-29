import { db } from '@/lib/db';
import CourseCard from './CourseCard';
import CoursesPagination from './CoursesPagination';
import { Level } from '@prisma/client';
import { generateTrialClassData } from '@/lib/actions/generate.actions';

interface CoursesProps {
  searchParams: {
    search?: string;
    category?: string;
    level?: string;
    program?: string;
    page?: string;
  };
}

const Courses = async ({ searchParams }: CoursesProps) => {
  const levels = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];
  const courses = await db.course.findMany({
    where: {
      isPublished: true,
      program: {
        isPublished: true,
      },
      name: {
        contains: searchParams.search,
      },
      level: levels.includes(searchParams.level?.toLocaleUpperCase() || '')
        ? (searchParams.level?.toLocaleUpperCase() as Level)
        : undefined,
      categoryId: searchParams.category,
      programId: searchParams.program,
    },
    include: {
      category: {
        select: {
          ageDescription: true,
        },
      },
      _count: {
        select: {
          sessions: {
            where: {
              isPublished: true,
            },
          },
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
    take: 12,
    skip: ((Number(searchParams.page) || 1) - 1) * 12,
  });

  const count = await db.course.count({
    where: {
      isPublished: true,
      program: {
        isPublished: true,
      },
      name: {
        contains: searchParams.search,
      },
      level: levels.includes(searchParams.level?.toLocaleUpperCase() || '')
        ? (searchParams.level?.toLocaleUpperCase() as Level)
        : undefined,
      categoryId: searchParams.category,
      programId: searchParams.program,
    },
  });

  const hasNextPage = (Number(searchParams.page) || 1) * 12 < count;
  return (
    <>
      {!courses.length && (
        <p className='font-semibold text-xl text-center'>
          Kursus tidak dapat ditemukan
        </p>
      )}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
      <CoursesPagination hasNextPage={hasNextPage} />
    </>
  );
};

export default Courses;
