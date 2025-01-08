import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Trash2 } from "lucide-react";
import { FileItem } from "./type";

type FileListProps = {
  files: FileItem[];
  onDelete: (id: string) => void;
};

export default function FileList({ files, onDelete }: FileListProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>文件名</TableHead>
          <TableHead>大小</TableHead>
          <TableHead>上传时间</TableHead>
          <TableHead>操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.map((file) => (
          <TableRow key={file.id}>
            <TableCell>{file.name}</TableCell>
            <TableCell>{formatFileSize(file.size)}</TableCell>
            <TableCell>{file.uploadTime.toLocaleString()}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onDelete(file.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
