import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EnvironmentVariable } from "../types/project.type";

interface EnvironmentVariablesProps {
  variables?: EnvironmentVariable[];
}

export function EnvironmentVariables({ variables }: EnvironmentVariablesProps) {
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">环境变量</h3>
      {variables?.map((variable) => (
        <div
          key={variable.id}
          className="flex items-center justify-between space-x-2"
        >
          <Input placeholder="Key" value={variable.key} disabled />
          <Input placeholder="Value" value={variable.value} disabled />
          <Button variant="destructive" size="sm" disabled>
            删除
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
        <Button disabled>添加</Button>
      </div>
    </div>
  );
}
