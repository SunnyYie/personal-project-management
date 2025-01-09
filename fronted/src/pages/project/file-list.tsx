import FileList from "@/components/file-components/list";
import { FileItem } from "@/components/file-components/type";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import FileUploadDialog from "./file-components/add-modal";

export default function FileListManage() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFileDelete = (id: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  const handleFileUpload = (newFiles: FileItem[]) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">文件管理</h1>
      <Button onClick={() => setIsDialogOpen(true)}>
        <Plus className="mr-2 h-4 w-4" /> 新增文件
      </Button>
      <FileList files={files} onDelete={handleFileDelete} />
      <FileUploadDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onUpload={handleFileUpload}
        existingFiles={files}
      />
    </div>
  );
}
