import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EnvironmentVariable } from "../project.type";

interface EnvironmentVariablesProps {
  variables: EnvironmentVariable[];
  onAdd: (variable: EnvironmentVariable) => void;
  onDelete: (key: string) => void;
}

export function EnvironmentVariables({
  variables,
  onAdd,
  onDelete,
}: EnvironmentVariablesProps) {
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  const handleAdd = () => {
    if (newKey && newValue) {
      onAdd({ key: newKey, value: newValue });
      setNewKey("");
      setNewValue("");
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Environment Variables</h3>
      {variables.map((variable) => (
        <div key={variable.key} className="flex items-center justify-between">
          <span>{variable.key}</span>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(variable.key)}
          >
            Delete
          </Button>
        </div>
      ))}
      <div className="flex space-x-2">
        <Input
          placeholder="Key"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
        />
        <Input
          placeholder="Value"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
        <Button onClick={handleAdd}>Add</Button>
      </div>
    </div>
  );
}
