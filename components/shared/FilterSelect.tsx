'use client';

import { convertToTitleCase } from '@/lib/utils';
import { MantineSelectOption } from '@/types';
import { Select } from '@mantine/core';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface FilterSelectProps {
  options: MantineSelectOption[];
  withSearchParams: boolean;
  searchParamsKey?: string;
  defaultValue?: string;
}

const FilterSelect = ({
  options,
  withSearchParams,
  searchParamsKey,
  defaultValue,
}: FilterSelectProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [selected, setSelected] = useState(
    withSearchParams
      ? searchParams.get('') || defaultValue || null
      : defaultValue || null
  );

  const handleFilter = (newSelected: string | null) => {
    setSelected(newSelected);

    if (withSearchParams) {
      const params = new URLSearchParams(searchParams);
      !newSelected
        ? params.delete(searchParamsKey!)
        : params.set(searchParamsKey!, newSelected);
      router.push(pathname + '?' + params.toString(), {
        scroll: false,
      });
    }
  };

  return (
    <Select
      checkIconPosition='right'
      placeholder={convertToTitleCase(searchParamsKey || 'choose')}
      data={options}
      value={selected}
      onChange={handleFilter}
    />
  );
};

export default FilterSelect;
