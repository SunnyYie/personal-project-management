import { FileItem } from "@/components/file-components/type";
import FileUpload from "@/components/file-components/upload";
import FileList from "@/components/file-components/list";
import { useState } from "react";

interface FileProps {
  projectId: string;
}

export default function File({ projectId }: FileProps) {
  const [files, setFiles] = useState<FileItem[]>([]);

  const fetchFiles = async () => {
    // const { data } = await axios.get(`/api/projects/${projectId}/files`);
    // setFiles(data);
  };

  const handleFileUpload = (newFiles: FileItem[]) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleFileDelete = (id: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">文件管理</h1>
      <div className="space-y-6">
        <FileUpload onUpload={handleFileUpload} />
        <FileList files={files} onDelete={handleFileDelete} />
      </div>
    </div>
  );
}
