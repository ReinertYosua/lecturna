'use client';

import { UploadDropzone } from '@/lib/uploadthing';
import type { fileRouter } from '@/app/api/uploadthing/core';
import { toast } from 'sonner';

interface FileUploadProps {
  endpoint: keyof fileRouter;
  onChange: (url?: string) => void;
}

const FileUpload = ({ endpoint, onChange }: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => onChange(res?.[0].url)}
      onUploadError={(error: Error) => {
        toast.error(error.message);
      }}
    />
  );
};

export default FileUpload;
