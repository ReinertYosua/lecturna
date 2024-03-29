'use client';

import { ConfirmModal } from '@/components/modals/ConfirmModal';
import { Badge, BadgeProps } from '@/components/ui/badge';
import { Account, Role, Status } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Ban, UnlockKeyhole } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';
import { updateAccountStatus } from '../_actions';
import Link from 'next/link';
import moment from 'moment';

export const columns: ColumnDef<Account>[] = [
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
    accessorKey: 'role',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='whitespace-nowrap'
        >
          Role
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const role: Role = row.getValue('role') || 'STUDENT';

      const statusVariant = (
        row.getValue('role') as string
      ).toLocaleLowerCase() as BadgeProps['variant'];
      return (
        <Badge variant={statusVariant}>
          {role[0] + role.substring(1).toLocaleLowerCase()}
        </Badge>
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
      const status: Status = row.getValue('status') || 'ACTIVE';

      const statusVariant = status === 'ACTIVE' ? 'default' : 'destructive';
      return (
        <Badge variant={statusVariant}>
          {status[0] + status.substring(1).toLocaleLowerCase()}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='whitespace-nowrap'
        >
          Created At
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <>{moment(row.getValue('createdAt')).format('DD-MM-YYYY')}</>;
    },
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='whitespace-nowrap'
        >
          Updated At
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <>{moment(row.getValue('updatedAt')).format('DD-MM-YYYY')}</>;
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const { id } = row.original;

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const pathname = usePathname();

      const confirmStatus = async (status: Status) => {
        try {
          await updateAccountStatus({
            id,
            status,
            pathname,
          });
          toast.success(
            `Successfully ${status === 'ACTIVE' ? 'unban' : 'ban'} this account`
          );
        } catch (error: any) {
          toast.error(
            `Failed to ${status === 'ACTIVE' ? 'unban' : 'ban'} this account`
          );
        }
      };

      return (
        <div className='flex items-center gap-6'>
          {row.getValue('status') === 'ACTIVE' ? (
            <ConfirmModal
              title='Ban Account'
              description='Do you want to ban this account?'
              onConfirm={() => confirmStatus('BANNED')}
            >
              <Ban className='text-red-500 cursor-pointer' />
            </ConfirmModal>
          ) : (
            <ConfirmModal
              title='Unban Account'
              description='Do you want to unban this account?'
              onConfirm={() => confirmStatus('ACTIVE')}
            >
              <UnlockKeyhole className='text-green-600 cursor-pointer' />
            </ConfirmModal>
          )}
          <Link
            href={`/profile/${row.original.id}`}
            className='hover:underline cursor-pointer text-primary-blue'
          >
            Details
          </Link>
        </div>
      );
    },
  },
];
