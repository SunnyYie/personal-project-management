import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, X } from "lucide-react";
import { FileItem } from "@/components/file-components/type";
import FileList from "@/components/file-components/list";

type FileUploadDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: FileItem[]) => void;
  existingFiles: FileItem[];
};

export default function FileUploadDialog({
  isOpen,
  onClose,
  onUpload,
  existingFiles,
}: FileUploadDialogProps) {
  const [uploadingFiles, setUploadingFiles] = useState<{
    [key: string]: number;
  }>({});
  const [localFiles, setLocalFiles] = useState<FileItem[]>([]);
  const [allFiles, setAllFiles] = useState<FileItem[]>(existingFiles);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      uploadTime: new Date(),
    }));

    setLocalFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleLocalDelete = (id: string) => {
    setLocalFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  const handleUpload = () => {
    // 模拟上传过程
    localFiles.forEach((file) => {
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
          setAllFiles((prev) => [...prev, file]);
        }
      }, 300);
    });

    // 将新文件添加到已有文件列表中
    onUpload(localFiles);

    // 清空本地文件列表
    setLocalFiles([]);
  };

  const handleClose = () => {
    setLocalFiles([]);
    setUploadingFiles({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>上传文件</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${
              isDragActive ? "border-primary" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              拖拽文件到此处或点击上传
            </p>
          </div>
          {Object.entries(uploadingFiles).map(([id, progress]) => (
            <div key={id} className="flex items-center space-x-4">
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
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">待上传文件</h3>
            <FileList files={localFiles} onDelete={handleLocalDelete} />
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">已上传文件</h3>
            <FileList files={allFiles} onDelete={() => {}} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            关闭
          </Button>
          <Button onClick={handleUpload} disabled={localFiles.length === 0}>
            上传
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
