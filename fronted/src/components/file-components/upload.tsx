import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";
import { FileItem } from "./type";

type FileUploadProps = {
  onUpload: (files: FileItem[]) => void;
};

export default function FileUpload({ onUpload }: FileUploadProps) {
  const [uploadingFiles, setUploadingFiles] = useState<{
    [key: string]: number;
  }>({});

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) => ({
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        size: file.size,
        uploadTime: new Date(),
      }));

      // 模拟上传过程
      newFiles.forEach((file) => {
        setUploadingFiles((prev) => ({ ...prev, [file.id]: 0 }));
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setUploadingFiles((prev) => ({ ...prev, [file.id]: progress }));
          if (progress >= 100) {
            clearInterval(interval);
            setUploadingFiles((prev) => {
              const newState = { ...prev };
              delete newState[file.id];
              return newState;
            });
            onUpload([file]);
          }
        }, 300);
      });
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${
          isDragActive ? "border-primary" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">拖拽文件到此处或点击上传</p>
      </div>
      {Object.entries(uploadingFiles).map(([id, progress]) => (
        <div key={id} className="mt-4 flex items-center space-x-4">
          <div className="flex-grow">
            <div className="text-sm font-medium">{id}</div>
            <Progress value={progress} className="w-full" />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setUploadingFiles((prev) => {
                const newState = { ...prev };
                delete newState[id];
                return newState;
              });
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
