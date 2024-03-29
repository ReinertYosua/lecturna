import { rem } from '@mantine/core';
import { MasterShift } from '@prisma/client';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { TimeInput } from '@mantine/dates';
import { toast } from 'sonner';
import { addNewShift, updateShift } from '../_actions';
import { usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { modals } from '@mantine/modals';
import { IconClock } from '@tabler/icons-react';

interface ShiftFormProps {
  type: 'ADD' | 'EDIT';
  initialData?: MasterShift;
}

const formSchema = z.object({
  startTime: z.string().min(1, {
    message: 'Start time is required',
  }),
  endTime: z.string().min(1, {
    message: 'End time is required',
  }),
});

const ShiftForm = ({ type, initialData }: ShiftFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startTime: initialData?.startTime || '',
      endTime: initialData?.endTime || '',
    },
  });

  const { isSubmitting } = form.formState;

  const pathname = usePathname();

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (type === 'ADD') {
        await addNewShift({
          payload: values,
          pathname,
        });
      } else {
        await updateShift({
          id: initialData?.id!,
          payload: values,
          pathname,
        });
      }

      toast.success(
        `Successfully ${type === 'ADD' ? 'added' : 'updated'} shift`
      );

      modals.closeAll();
    } catch (error: any) {
      toast.error(`Failed to ${type === 'ADD' ? 'add' : 'update'} shift`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-3'>
        <FormField
          control={form.control}
          name='startTime'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Time</FormLabel>
              <FormControl>
                <TimeInput
                  leftSection={
                    <IconClock
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='endTime'
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Time</FormLabel>
              <FormControl>
                <TimeInput
                  leftSection={
                    <IconClock
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='pt-3 w-full flex justify-end'>
          <Button disabled={isSubmitting} type='submit' size='sm'>
            {isSubmitting && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}{' '}
            {type === 'ADD' ? 'Add' : 'Edit'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ShiftForm;
