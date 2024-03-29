'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Loader2, Pencil } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Session } from '@prisma/client';
import { updateSession } from '@/lib/actions/program.actions';
import Editor from '@/components/shared/Editor';
import { cn } from '@/lib/utils';
import Preview from '@/components/shared/Preview';
import { toast } from 'sonner';

interface ReferencesFormProps {
  initialData: Session;
}

const formSchema = z.object({
  reference: z.string().min(1, {
    message: 'Reference is required',
  }),
});

const ReferencesForm = ({ initialData }: ReferencesFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reference: initialData.reference || '',
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const pathname = usePathname();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateSession({
        id: initialData.id,
        payload: {
          reference: values.reference,
          courseId: initialData.courseId,
        },
        pathname,
      });
      toast.success('Successfully updated session');
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className='mt-6 border bg-slate-100 rounded-md p-4'>
      <div className='font-medium flex items-center justify-between'>
        Reference
        <Button onClick={toggleEdit} variant='ghost'>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className='h-4 w-4 mr-2' />
              Edit Reference
            </>
          )}
        </Button>
      </div>
      {isEditing ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4 mt-4'
          >
            <FormField
              control={form.control}
              name='reference'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Editor {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex items-center gap-x-2'>
              <Button disabled={!isValid || isSubmitting} type='submit'>
                {isSubmitting && (
                  <Loader2 className='mr-2 w-4 h-4 animate-spin' />
                )}
                Save
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <div
          className={cn(
            'text-sm mt-2',
            !initialData.reference && 'text-slate-500 italic'
          )}
        >
          {!initialData.reference ? (
            'No reference'
          ) : (
            <Preview value={initialData.reference} />
          )}
        </div>
      )}
    </div>
  );
};

export default ReferencesForm;
