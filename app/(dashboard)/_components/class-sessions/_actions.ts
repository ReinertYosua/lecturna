'use server';

import { SessionReportItem } from '@/app/(dashboard)/_components/class-sessions/AddSessionReportForm';
import { utapi } from '@/app/api/uploadthing/core';
import { db } from '@/lib/db';
import { OtherAttachment } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export type AddNewAttachmentPayload = {
  name: string;
  fileKey?: string | null;
  type: string;
  fileUrl: string;
};

type AddNewAttachmentParams = {
  scheduleId: string;
  payload: AddNewAttachmentPayload;
  pathname: string;
};

export const addNewAttachment = async ({
  scheduleId,
  payload,
  pathname,
}: AddNewAttachmentParams) => {
  try {
    const attachment = await db.otherAttachment.create({
      data: {
        ...payload,
        schedule: {
          connect: { id: scheduleId },
        },
      },
    });

    revalidatePath(pathname);
    return attachment;
  } catch (error: any) {
    throw new Error(`Failed to add new resource: ${error.message}`);
  }
};

type DeleteAttachmentParams = {
  id: string;
  fileKey: string | null;
  pathname: string;
};

export const deleteAttachment = async ({
  id,
  pathname,
  fileKey,
}: DeleteAttachmentParams) => {
  try {
    if (fileKey) {
      await utapi.deleteFiles(fileKey);
    }

    const attachment = await db.otherAttachment.delete({
      where: { id },
    });
    revalidatePath(pathname);
    return attachment;
  } catch (error: any) {
    throw new Error(`Failed to delete attachment: ${error.message}`);
  }
};

type EditAttachmentParams = {
  prevData: OtherAttachment;
  newData: {
    name: string;
    fileKey?: string | null;
    type: string;
    fileUrl: string;
  };
  pathname: string;
};

export const editAttachment = async ({
  prevData,
  newData,
  pathname,
}: EditAttachmentParams) => {
  try {
    if (prevData.fileUrl !== newData.fileUrl && prevData.fileKey) {
      await utapi.deleteFiles(prevData.fileKey);
    }

    const attachment = await db.otherAttachment.update({
      where: { id: prevData.id },
      data: newData,
    });

    revalidatePath(pathname);
    return attachment;
  } catch (error: any) {
    throw new Error(`Failed to update attachment: ${error.message}`);
  }
};

export const fetchStudents = async (classId: string) => {
  try {
    const students = await db.student.findMany({
      where: {
        studentCourses: {
          some: {
            classId,
          },
        },
      },
      include: {
        account: true,
      },
      orderBy: {
        account: {
          name: 'asc',
        },
      },
    });

    return students;
  } catch (error: any) {
    throw new Error(`Failed to fetch students: ${error.message}`);
  }
};

interface AddSessionReportsParams {
  sessionReports: SessionReportItem[];
  pathname: string;
}

export const addSessionReports = async ({
  sessionReports,
  pathname,
}: AddSessionReportsParams) => {
  if (!sessionReports.length) throw new Error('Data should not be empty');

  try {
    await db.sessionReport.deleteMany({
      where: {
        scheduleId: sessionReports[0].scheduleId,
      },
    });
    const evaluation = await db.masterEvaluation.findUnique({
      where: {
        name: 'Session Report',
      },
    });

    if (!evaluation)
      throw new Error('Could not find evaluation for this report');

    const res = await db.sessionReport.createMany({
      data: sessionReports.map(
        ({ attendanceStatus, feedback, scheduleId, score, studentId }) => ({
          attendanceStatus,
          evaluationId: evaluation.id,
          feedback,
          scheduleId,
          score,
          studentId,
        })
      ),
    });

    revalidatePath(pathname);
    return res;
  } catch (error: any) {
    throw new Error(`Failed to add session reports: ${error.message}`);
  }
};
