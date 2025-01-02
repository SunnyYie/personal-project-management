import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Domain } from "../project.type";

interface DomainManagementProps {
  domains: Domain[];
  onAdd: (domain: Domain) => void;
  onDelete: (name: string) => void;
}

export function DomainManagement({
  domains,
  onAdd,
  onDelete,
}: DomainManagementProps) {
  const [newDomain, setNewDomain] = useState("");

  const handleAdd = () => {
    if (newDomain) {
      onAdd({ name: newDomain, status: "Pending" });
      setNewDomain("");
    }
  };

  const getStatusColor = (status: Domain["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-500";
      case "Pending":
        return "bg-yellow-500";
      case "Error":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Domains</h3>
      {domains.map((domain) => (
        <div key={domain.name} className="flex items-center justify-between">
          <span>{domain.name}</span>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(domain.status)}>
              {domain.status}
            </Badge>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(domain.name)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
      <div className="flex space-x-2">
        <Input
          placeholder="New domain"
          value={newDomain}
          onChange={(e) => setNewDomain(e.target.value)}
        />
        <Button onClick={handleAdd}>Add</Button>
      </div>
    </div>
  );
}
