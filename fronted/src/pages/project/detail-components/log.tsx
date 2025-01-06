import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface LogsProps {
  projectId: string;
}

interface LogEvent {
  id: string;
  type: "deployment" | "error" | "info" | "warning";
  createdAt: number;
  message: string;
}

const LOG_TYPES = [
  { id: "deployment", label: "Deployment" },
  { id: "error", label: "Error" },
  { id: "info", label: "Info" },
  { id: "warning", label: "Warning" },
];

export function Logs({ projectId }: LogsProps) {
  const [startDate, setStartDate] = useState<Date>(
    new Date(Date.now() - 24 * 60 * 60 * 1000)
  );
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [logs, setLogs] = useState<LogEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    LOG_TYPES.map((type) => type.id)
  );

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const types = selectedTypes.join(",");
      const response = await fetch(
        `/api/vercel/logs?projectId=${projectId}&since=${startDate.getTime()}&until=${endDate.getTime()}&types=${types}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch logs");
      }
      const data = await response.json();
      setLogs(data.events);
    } catch (error) {
      console.error("Error fetching logs:", error);
      toast.error("Failed to fetch logs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  //   useEffect(() => {
  //     fetchLogs();
  //   }, [projectId]);

  const handleTypeToggle = (typeId: string) => {
    setSelectedTypes((prev) =>
      prev.includes(typeId)
        ? prev.filter((id) => id !== typeId)
        : [...prev, typeId]
    );
  };

  const getLogTypeColor = (type: LogEvent["type"]) => {
    switch (type) {
      case "deployment":
        return "bg-blue-500";
      case "error":
        return "bg-red-500";
      case "info":
        return "bg-green-500";
      case "warning":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Logs</h2>
        <div className="flex space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? (
                  format(startDate, "PPP")
                ) : (
                  <span>Pick a start date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={(data) => setStartDate(data!)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? (
                  format(endDate, "PPP")
                ) : (
                  <span>Pick an end date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={(data) => setEndDate(data!)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button onClick={fetchLogs} disabled={loading}>
            {loading ? "Loading..." : "Fetch Logs"}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter by Log Type</CardTitle>
          <CardDescription>
            Select the types of logs you want to see
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            {LOG_TYPES.map((type) => (
              <div key={type.id} className="flex items-center space-x-2">
                <Checkbox
                  id={type.id}
                  checked={selectedTypes.includes(type.id)}
                  onCheckedChange={() => handleTypeToggle(type.id)}
                />
                <label htmlFor={type.id}>{type.label}</label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Log Events</CardTitle>
          <CardDescription>Recent log events for your project</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {logs.map((log) => (
              <div
                key={log.id}
                className="flex items-start space-x-2 p-2 rounded-md bg-muted"
              >
                <Badge className={cn("capitalize", getLogTypeColor(log.type))}>
                  {log.type}
                </Badge>
                <div>
                  <p className="text-sm font-medium">{log.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(log.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
