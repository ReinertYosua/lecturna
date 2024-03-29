'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useUploadThing } from '@/lib/uploadthing';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckIcon, Input, Radio, Group } from '@mantine/core';
import { modals } from '@mantine/modals';
import { File, Loader2, Pencil, Save, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';
import ResourceFileDropzone from './AttachmentFileDropzone';
import { isBase64DataURL } from '@/lib/utils';
import FileSaver from 'file-saver';
import { toast } from 'sonner';
import {
  AddNewAttachmentPayload,
  addNewAttachment,
  editAttachment,
} from './_actions';
import { usePathname } from 'next/navigation';
import { OtherAttachment } from '@prisma/client';

const formSchema = z.object({
  name: z
    .string({
      required_error: 'Filename is required',
    })
    .min(1, {
      message: 'Filename is required',
    }),
  type: z
    .string({
      required_error: 'File type is required',
    })
    .min(1, {
      message: 'File type is required',
    }),
  fileUrl: z
    .string({
      required_error: 'File is required',
    })
    .min(1, {
      message: 'File is required',
    }),
});

export type FileType = 'image' | 'pdf' | 'text' | 'audio' | 'video';

interface AttachmentFormProps {
  type: 'ADD' | 'EDIT';
  initialData?: OtherAttachment;
  scheduleId: string;
}

const AttachmentForm = ({
  type,
  initialData,
  scheduleId,
}: AttachmentFormProps) => {
  const { startUpload } = useUploadThing('courseAttachment');

  const [files, setFiles] = useState<File[]>([]);
  const [isEditingFile, setIsEditingFile] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      fileUrl: initialData?.fileUrl || '',
      type: initialData?.type || '',
    },
  });

  const { isSubmitting } = form.formState;

  const pathname = usePathname();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const fileUrl: string = values.fileUrl;
      const payload: AddNewAttachmentPayload = {
        fileUrl: values.fileUrl,
        name: values.name,
        type: values.type,
      };
      if (isBase64DataURL(fileUrl)) {
        const res = await startUpload(files);

        if (!res || res.length === 0) {
          throw new Error('No files uploaded');
        }

        const { key, url } = res[0];

        payload['fileKey'] = key;
        payload['fileUrl'] = url;
      } else {
        if (type === 'EDIT' && values.fileUrl !== initialData?.fileUrl) {
          payload['fileKey'] = null;
        }
      }
      if (type === 'ADD')
        await addNewAttachment({ scheduleId, pathname, payload });
      else
        await editAttachment({
          prevData: initialData!,
          newData: payload,
          pathname,
        });
      toast.success(
        `Successfully ${type === 'ADD' ? 'added' : 'updated'} resource`
      );
      modals.closeAll();
    } catch (error: any) {
      toast.error(`Failed to ${type === 'ADD' ? 'add' : 'update'} resource`);
    }
  };

  const handleDeleteFile = () => {
    setFiles([]);
    form.setValue('fileUrl', '');
    setIsEditingFile(true);
  };

  const handlePreview = () => {
    const fileUrl = form.getValues('fileUrl');
    if (!isBase64DataURL(fileUrl)) return window.open(fileUrl);

    FileSaver.saveAs(files[0], files[0].name);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Filename</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem>
              <FormLabel>File Type</FormLabel>
              <FormControl>
                <Radio.Group {...field}>
                  <Group mt='xs'>
                    <Radio icon={CheckIcon} value='image' label='Image' />
                    <Radio icon={CheckIcon} value='pdf' label='PDF' />
                    <Radio icon={CheckIcon} value='text' label='Text' />
                    <Radio icon={CheckIcon} value='video' label='Video' />
                    <Radio icon={CheckIcon} value='audio' label='Audio' />
                  </Group>
                </Radio.Group>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!!form.watch('type') && (
          <FormField
            control={form.control}
            name='fileUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel>File</FormLabel>
                <FormControl>
                  {isEditingFile ? (
                    <ResourceFileDropzone
                      type={form.getValues('type') as FileType}
                      setIsEditingFile={setIsEditingFile}
                      onFileChange={field.onChange}
                      setFiles={setFiles}
                      value={field.value}
                    />
                  ) : (
                    <div className='flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md'>
                      <File className='h-4 w-4 mr-2 flex-shrink-0' />
                      <span
                        onClick={handlePreview}
                        className='text-xs line-clamp-1 cursor-pointer hover:underline'
                      >
                        {files.length > 0 ? files[0].name : field.value}
                      </span>
                      <div className='ml-auto flex gap-3 items-center'>
                        <Pencil
                          onClick={() => setIsEditingFile(true)}
                          className='h-4 w-4 hover:opacity-75 transition cursor-pointer'
                        />
                        <Trash2
                          onClick={handleDeleteFile}
                          className='h-4 w-4 hover:opacity-75 transition cursor-pointer'
                        />
                      </div>
                    </div>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className='w-full flex justify-end gap-2'>
          <Button
            type='button'
            variant='outline'
            size='sm'
            onClick={() => modals.closeAll()}
          >
            Close
          </Button>
          <Button type='submit' size='sm'>
            {isSubmitting ? (
              <Loader2 className='h-4 w-4 animate-spin' />
            ) : (
              <Save className='h-4 w-4' />
            )}
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AttachmentForm;
