'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import TanstackTable from '@/components/shared/TanstackTable';
import { Input } from '@mantine/core';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex flex-col items-start md:flex-row md:items-center justify-between py-4 gap-y-3'>
        <Input
          placeholder='Search programs...'
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className='w-full md:w-96'
        />
        <Button size='sm' variant='primary-blue' asChild>
          <Link href='/admin/programs/create'>
            <Plus className='h-4 w-4' />
            Add
          </Link>
        </Button>
      </div>
      <TanstackTable
        columns={columns}
        data={data}
        table={table}
        withPagination={true}
      />
    </div>
  );
}
