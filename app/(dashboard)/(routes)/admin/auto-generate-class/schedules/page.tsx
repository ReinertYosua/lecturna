import { getNextPeriod } from '@/lib/actions/period.actions';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';
import { convertToTitleCase } from '@/lib/utils';

interface PageProps {
  searchParams: {
    course?: string;
    day?: string;
    shift?: string;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  const nextPeriod = await getNextPeriod();

  if (!nextPeriod) return notFound();
  const data = await db.instructorSchedule.findMany({
    where: {
      class: null,
      periodId: nextPeriod?.id,
      dayId: searchParams.day,
      shiftId: searchParams.shift,
      instructor: {
        instructorCourses: {
          some: {
            courseId: searchParams.course,
          },
        },
      },
    },
    include: {
      day: true,
      shift: true,
      instructor: {
        include: {
          account: true,
          instructorCourses: {
            include: {
              course: true,
            },
          },
        },
      },
    },
  });

  const courses = await db.course.findMany({
    where: {
      isPublished: true,
      program: {
        isPublished: true,
      },
    },
    select: {
      id: true,
      name: true,
    },
  });

  const courseOptions = courses.map(({ id, name }) => ({
    text: name,
    value: id,
  }));

  const days = await db.masterDay.findMany({
    where: {
      isActive: true,
    },
  });

  const dayOptions = days.map(({ id, day }) => ({
    text: convertToTitleCase(day),
    value: id,
  }));

  const shifts = await db.masterShift.findMany({
    where: {
      isActive: true,
    },
  });

  const shiftOptions = shifts.map(({ id, startTime, endTime }) => ({
    text: `${startTime} - ${endTime}`,
    value: id,
  }));

  return (
    <div className='container mx-auto py-10'>
      <DataTable
        columns={columns}
        data={data}
        courseOptions={courseOptions}
        dayOptions={dayOptions}
        shiftOptions={shiftOptions}
      />
    </div>
  );
};

export default Page;
