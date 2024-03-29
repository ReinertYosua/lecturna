'use client';

import { ConfirmModal } from '@/components/modals/ConfirmModal';
import { Badge, BadgeProps } from '@/components/ui/badge';
import { InstructorRegistration, RegistrationStatus } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, ThumbsDown, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';
import {
  createAccountForInstructor,
  updateInstructorRegistrationStatus,
} from '../_actions';
import InstructorRegistrationDetail from './InstructorRegistrationDetail';

export const columns: ColumnDef<InstructorRegistration>[] = [
  {
    header: 'No',
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='whitespace-nowrap'
        >
          Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className='font-bold text-primary'>{row.getValue('name')}</span>
      );
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='whitespace-nowrap'
        >
          Email
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'phoneNumber',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='whitespace-nowrap'
        >
          Phone Number
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='whitespace-nowrap'
        >
          Status
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status: RegistrationStatus = row.getValue('status') || 'PENDING';

      const statusVariant = (
        row.getValue('status') as string
      ).toLocaleLowerCase() as BadgeProps['variant'];
      return (
        <Badge variant={statusVariant}>
          {status[0] + status.substring(1).toLocaleLowerCase()}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const { id } = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const pathname = usePathname();

      const instructorData = row.original as {
        skills: {
          id: string;
          name: string;
        }[];
      } & InstructorRegistration;

      const confirmStatus = async (status: RegistrationStatus) => {
        try {
          await updateInstructorRegistrationStatus({
            id,
            status,
            pathname,
          });

          toast.success('Successfully updated registration status');
          if (status === 'APPROVED') {
            try {
              await createAccountForInstructor(instructorData);

              toast.success(
                'Successfully created account for the instructor. Please contact the instructor for the account credentials'
              );
            } catch (error: any) {
              toast.error('Failed to create account for the instructor');
            }
          }
        } catch (error: any) {
          toast.error('Failed to update registration status');
        }
      };

      return (
        <div className='flex items-center gap-6'>
          {row.getValue('status') === 'PENDING' && (
            <>
              <ConfirmModal
                title='Approve Registration'
                description='Do you want to approve this registration'
                onConfirm={() => confirmStatus('APPROVED')}
              >
                <ThumbsUp className='text-green-500 cursor-pointer' />
              </ConfirmModal>
              <ConfirmModal
                title='Reject Registration'
                description='Do you want to reject this registration'
                onConfirm={() => confirmStatus('REJECTED')}
              >
                <ThumbsDown className='text-red-500 cursor-pointer' />
              </ConfirmModal>
            </>
          )}

          <InstructorRegistrationDetail data={instructorData} />
        </div>
      );
    },
  },
];
