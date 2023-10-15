'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { Chip, Select, SelectItem, SelectedItems } from '@nextui-org/react';
import { Skill } from '@prisma/client';
import { Loader2 } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import { usePathname, useRouter } from 'next/navigation';
import { registerInstructor } from '../_actions';
import { toast } from 'sonner';
import { Card, CardContent, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Nama wajib diisi',
  }),
  dateOfBirth: z.coerce.date({
    required_error: 'Tanggal lahir wajib diisi',
  }),
  lastEducation: z.enum(['SMA', 'S1', 'S2', 'S3'], {
    required_error: 'Pendidikan terakhir wajib dipilih',
  }),
  educationInstitution: z.string().min(1, {
    message: 'Institusi pendidikan wajib diisi',
  }),
  email: z.string().email({
    message: 'Masukkan email yang valid',
  }),
  phoneNumber: z.coerce.string().min(1, {
    message: 'No. HP wajib diisi',
  }),
  address: z.string().min(1, {
    message: 'Alamat wajib diisi',
  }),
  skills: z.any(),
});

const InstructorRegistrationForm = ({ skills }: { skills: Skill[] }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      address: '',
      dateOfBirth: new Date(),
      educationInstitution: '',
      lastEducation: undefined,
      phoneNumber: '',
      skills: [],
    },
  });
  const pathname = usePathname();
  const router = useRouter();

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await registerInstructor({
        payload: {
          data: {
            address: values.address,
            dateOfBirth: values.dateOfBirth,
            educationInstitution: values.educationInstitution,
            email: values.email,
            lastEducation: values.lastEducation,
            name: values.name,
            phoneNumber: values.phoneNumber,
          },
          skills: Array.from(values.skills),
        },
        pathname,
      });

      form.reset();

      router.push('/');

      toast.success(
        'Pendaftaran berhasil. Mohon menunggu info lebih lanjut dari admin.'
      );
    } catch (error: any) {
      toast.error('Failed to register');
    }
  };

  const lastEducations = [
    {
      label: 'SMA',
      value: 'SMA',
    },
    {
      label: 'S1',
      value: 'S1',
    },
    {
      label: 'S2',
      value: 'S2',
    },
    {
      label: 'S3',
      value: 'S3',
    },
  ];

  return (
    <div className='container max-w-2xl py-28'>
      <Card className='p-5 pt-14 shadow-xl'>
        <CardTitle className='text-center font-bold text-3xl font-josefin mb-20'>
          Daftar sebagai Instruktur
        </CardTitle>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormDescription>Nama lengkap sesuai KTP</FormDescription>
                    <FormControl>
                      <Input disabled={isSubmitting} autoFocus {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phoneNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No. HP</FormLabel>
                    <FormControl>
                      <Input type='number' disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='dateOfBirth'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal Lahir</FormLabel>
                    <FormControl>
                      <Input
                        type='date'
                        value={field.value.toString()}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='address'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat</FormLabel>
                    <FormControl>
                      <Textarea disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='lastEducation'
                render={({ field }) => (
                  <FormItem className='bg-white'>
                    <FormControl>
                      <Select
                        label='Pendidikan Terakhir'
                        labelPlacement='outside'
                        placeholder='Pilih'
                        {...field}
                      >
                        {lastEducations.map(({ label, value }) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='educationInstitution'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Institusi Pendidikan</FormLabel>
                    <FormControl>
                      <Input disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Controller
                control={form.control}
                name='skills'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        label='Skills'
                        selectionMode='multiple'
                        placeholder='Pilih minimal 1'
                        selectedKeys={field.value ?? []}
                        onSelectionChange={field.onChange}
                        ref={field.ref}
                        name={field.name}
                        onBlur={field.onBlur}
                        classNames={{
                          base: 'w-full',
                          trigger: 'min-h-unit-12 py-2',
                        }}
                        labelPlacement='outside'
                        renderValue={(items: SelectedItems<string>) => {
                          return (
                            <div className='flex gap-2 overflow-hidden'>
                              {items.map((item) => (
                                <Chip key={item.key}>
                                  {item.textValue ?? ''}
                                </Chip>
                              ))}
                            </div>
                          );
                        }}
                      >
                        {skills.map(({ id, name }) => (
                          <SelectItem key={id} value={id}>
                            {name}
                          </SelectItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='!mt-10'>
                <Button type='submit'>
                  {isSubmitting && (
                    <Loader2 className='animate-spin mr-2 h-4 w-4' />
                  )}
                  Daftar
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructorRegistrationForm;
