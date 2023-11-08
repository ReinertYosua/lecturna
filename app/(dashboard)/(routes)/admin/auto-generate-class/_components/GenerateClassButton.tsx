'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2, MinusCircle, PlusCircle } from 'lucide-react';
import {
  InstructorSchedules,
  MappedClass,
  StudentCourses,
  useCreateClassStore,
} from '../_stores/use-create-class-store';
import { useState } from 'react';
import { toast } from 'sonner';
import { modals } from '@mantine/modals';
import { useRouter } from 'next/navigation';

const GenerateClassForm = () => {
  const [classSize, setClassSize] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const studentCourses = useCreateClassStore((state) => state.studentCourses);
  const instructorSchedules = useCreateClassStore(
    (state) => state.instructorSchedules
  );

  const courses = useCreateClassStore((state) => state.courses);
  const mappedClassesCount = useCreateClassStore(
    (state) => state.mappedClassesCount
  );
  const setMappedClasses = useCreateClassStore(
    (state) => state.setMappedClasses
  );

  const router = useRouter();

  const coursesToCode = courses.reduce((curr, { id, code }) => {
    curr[id] = code
      ?.toLocaleUpperCase()
      .replace(/[^a-zA-Z0-9]/g, '')
      .slice(0, 3)!;
    return curr;
  }, {} as Record<string, string>);

  const generateClasses = () => {
    setIsLoading(true);
    try {
      if (!studentCourses || !instructorSchedules) return;

      const mappedStudentCourses = structuredClone(studentCourses).reduce(
        (curr, { courseId, id }) => {
          if (!curr[courseId]) curr[courseId] = [id];
          else curr[courseId].push(id);
          return curr;
        },
        {} as Record<string, string[]>
      );

      const mappedInstructorSchedules = structuredClone(
        instructorSchedules
      ).reduce((curr, { id, instructor: { instructorCourses } }) => {
        curr[id] = instructorCourses.map(({ courseId }) => courseId);
        return curr;
      }, {} as Record<string, string[]>);

      const classes: {
        instructorScheduleId: string;
        studentCourseIds: string[];
        courseId: string;
      }[] = [];

      for (const [instructorScheduleId, courses] of Object.entries(
        mappedInstructorSchedules
      )) {
        for (const courseId of courses) {
          if (
            mappedStudentCourses.hasOwnProperty(courseId) &&
            mappedStudentCourses[courseId].length > 0
          ) {
            const count = Math.min(
              classSize,
              mappedStudentCourses[courseId].length
            );
            classes.push({
              instructorScheduleId,
              studentCourseIds: mappedStudentCourses[courseId].slice(0, count),
              courseId,
            });
            mappedStudentCourses[courseId] =
              mappedStudentCourses[courseId].slice(count);

            break;
          }
        }
      }

      const mappedClasses = classes.reduce(
        (curr, { instructorScheduleId, studentCourseIds, courseId }) => {
          if (!mappedClassesCount.hasOwnProperty(courseId))
            mappedClassesCount[courseId] = 0;

          const course = courses.find(({ id }) => courseId === id);
          curr.push({
            name:
              coursesToCode[courseId] +
              `${mappedClassesCount[courseId] + 1}`.padStart(3, '0'),
            courseId,
            course: course!,
            studentCourses: studentCourseIds.map((studentCourseId) =>
              structuredClone(studentCourses).find(
                ({ id }) => id === studentCourseId
              )
            ) as StudentCourses,
            instructorScheduleId,
            instructorSchedule: structuredClone(instructorSchedules).find(
              ({ id }) => instructorScheduleId === id
            ) as InstructorSchedules[number],
          });
          mappedClassesCount[courseId]++;
          return curr;
        },
        [] as MappedClass[]
      );

      setMappedClasses(mappedClasses);

      modals.closeAll();
      router.push('/admin/auto-generate-class/results');
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-1'>
          <p className='text-primary font-semibold text-base'>Class Size</p>
          <p className='text-muted-foreground text-sm'>
            Maximum students per class
          </p>
        </div>

        <div className='flex items-center gap-5'>
          <MinusCircle
            onClick={() => setClassSize(classSize - 1)}
            className='cursor-pointer text-muted-foreground hover:text-primary h-6 w-6'
          />
          <span className='text-primary text-lg'>{classSize}</span>
          <PlusCircle
            onClick={() => setClassSize(classSize + 1)}
            className='cursor-pointer text-muted-foreground hover:text-primary h-6 w-6'
          />
        </div>
      </div>
      <div className='flex justify-end items-center w-full'>
        <Button onClick={generateClasses} disabled={isLoading} size='sm'>
          {!isLoading ? (
            <ArrowRight className='h-4 w-4' />
          ) : (
            <Loader2 className='h-4 w-4 animate-spin' />
          )}
          Continue
        </Button>
      </div>
    </div>
  );
};

const GenerateClassButton = () => {
  const openGenerateClassModal = () => {
    modals.open({
      title: (
        <h1 className='text-primary text-lg font-bold'>Generate Classes</h1>
      ),
      children: <GenerateClassForm />,
    });
  };

  return (
    <Button
      onClick={openGenerateClassModal}
      size='sm'
      className='flex items-center mb-3'
    >
      <PlusCircle className='h-4 w-4' />
      Generate
    </Button>
  );
};

export default GenerateClassButton;
