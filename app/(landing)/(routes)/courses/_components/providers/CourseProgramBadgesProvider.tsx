import { db } from '@/lib/db';
import CourseProgramBadges from '../CourseProgramBadges';

const CourseProgramBadgesProvider = async () => {
  const programs = await db.program.findMany({
    where: {
      isPublished: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
  return <CourseProgramBadges programs={programs} />;
};

export default CourseProgramBadgesProvider;
