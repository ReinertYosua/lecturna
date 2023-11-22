import Preview from '@/components/shared/Preview';
import { db } from '@/lib/db';
import { cn } from '@/lib/utils';
import { modals } from '@mantine/modals';
import {
  CalendarPlus,
  File,
  Pencil,
  PlusSquareIcon,
  Presentation,
  Trash2,
  Video,
} from 'lucide-react';
import moment from 'moment';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AddAttachmentModal from './_components/AddAttachmentModal';
import AttachmentActions from './_components/AttachmentActions';
import SessionReportModal from './_components/SessionReportModal';

interface PageProps {
  params: {
    classId: string;
    sessionId: string;
  };
}

const Page = async ({ params: { classId, sessionId } }: PageProps) => {
  const classData = await db.class.findUnique({
    where: {
      id: classId,
    },
    include: {
      course: true,
      schedules: true,
    },
  });
  const scheduleData = await db.schedule.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      otherAttachments: true,
      sessionReports: {
        include: {
          student: {
            include: {
              account: true,
            },
          },
        },
        orderBy: {
          student: {
            account: {
              name: 'asc',
            },
          },
        },
      },
    },
  });

  if (!classData || !scheduleData) return notFound();

  const sessionData = await db.session.findFirst({
    where: {
      sessionNumber: scheduleData.sessionNumber,
      courseId: classData.courseId,
    },
    include: {
      attachments: true,
    },
  });

  if (!sessionData) return notFound();

  return (
    <div className='flex flex-col gap-0'>
      <div className='w-full'>
        <div className='overflow-x-auto flex gap-1 no-scrollbar'>
          {classData.schedules.map((schedule) => (
            <Link
              key={schedule.id}
              href={`/instructor/my-classes/${classId}/sessions/${schedule.id}`}
              className={cn(
                'text-muted-foreground whitespace-nowrap cursor-pointer p-3 rounded-t-md',
                sessionId === schedule.id
                  ? 'border border-b-0 bg-primary-blue text-white font-semibold'
                  : 'bg-[#E4EEFC]'
              )}
            >
              Session {schedule.sessionNumber}
            </Link>
          ))}
        </div>
      </div>
      <div className='w-full bg-white shadow-lg rounded-b-md p-4'>
        <div className='flex flex-col gap-4'>
          <div className='grid grid-cols-12 p-5 gap-5'>
            <div className='col-span-12 md:col-span-7'>
              <div className='flex flex-col gap-5 border-b-secondary border-b-2'>
                <h3 className='text-xl text-primary'>{sessionData.main}</h3>
                <div className='flex flex-col'>
                  <p className='font-bold'>Description</p>
                  <Preview
                    value={sessionData.description || ''}
                    className='[&_.ql-editor]:px-0 [&_.ql-editor_ul]:pl-0'
                  />
                </div>
              </div>
              <div className='flex flex-col gap-5 pt-5'>
                <div className='flex flex-col gap-1'>
                  <p className='text-base text-muted-foreground'>Start</p>
                  <p className='text-lg text-primary'>
                    {moment(scheduleData.scheduleDate).format('DD MMMM YYYY')},
                    {scheduleData.scheduleTime.split(' - ')[0]}
                  </p>
                </div>
                <div className='flex flex-col gap-1'>
                  <p className='text-base text-muted-foreground'>End</p>
                  <p className='text-lg text-primary'>
                    {moment(scheduleData.scheduleDate).format('DD MMMM YYYY')},
                    {scheduleData.scheduleTime.split(' - ')[1]}
                  </p>
                </div>
              </div>
            </div>
            <div className='col-span-12 md:col-span-5'>
              <div className='p-5 bg-gradient-to-t from-[#273575] to-[#004AAD] rounded-md text-white'>
                <div className='flex flex-col gap-1'>
                  <SessionReportModal
                    scheduleId={sessionId}
                    classId={classId}
                    initialData={scheduleData.sessionReports}
                  />
                  <div className='flex flex-col gap-1 w-full py-3 border-y-[1px] border-white'>
                    <h4 className='text-base font-normal px-3'>Resources</h4>
                    <a
                      href={scheduleData.meetingUrl || ''}
                      target='_blank'
                      className='flex items-center gap-3 p-3 rounded-md hover:bg-sky-200/20'
                    >
                      <Presentation className='h-4 w-4' />
                      <span>Meeting URL</span>
                    </a>
                    <a
                      href={scheduleData.recordingUrl || ''}
                      target='_blank'
                      className='flex items-center gap-3 p-3 rounded-md hover:bg-sky-200/20'
                    >
                      <Video className='h-4 w-4' />
                      <span>Recording URL</span>
                    </a>
                    {sessionData.attachments.map(
                      ({ id, filename, fileUrl }) => (
                        <div
                          key={id}
                          className='flex items-center gap-3 p-3 rounded-md hover:bg-sky-200/20'
                        >
                          <File className='h-4 w-4' />
                          <a href={fileUrl} target='_blank'>
                            {filename}
                          </a>
                        </div>
                      )
                    )}
                    {scheduleData.otherAttachments.map((attachment) => (
                      <div
                        key={attachment.id}
                        className='flex items-center justify-between gap-3 p-3 rounded-md hover:bg-sky-200/20'
                      >
                        <div className='flex items-center gap-3'>
                          <File className='h-4 w-4' />
                          <a href={attachment.fileUrl} target='_blank'>
                            {attachment.name}
                          </a>
                        </div>
                        <AttachmentActions attachment={attachment} />
                      </div>
                    ))}
                  </div>
                  <AddAttachmentModal scheduleId={sessionId} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;