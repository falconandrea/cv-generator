"use client";

/**
 * Certifications Form Component
 *
 * Form for editing certifications entries.
 * Supports add, remove, and update certifications.
 */

import { useCVStore } from "@/state/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2 } from "lucide-react";
import type { Certification } from "@/state/types";

const emptyCertification: Certification = {
  title: "",
  issuer: "",
  year: "",
};

export function CertificationsForm() {
  const {
    certifications,
    addCertification,
    updateCertification,
    removeCertification,
  } = useCVStore();

  const handleAddCertification = () => {
    addCertification({ ...emptyCertification });
  };

  const handleUpdateCertification = (
    index: number,
    field: keyof Certification,
    value: string,
  ) => {
    const cert = certifications[index];
    updateCertification(index, { ...cert, [field]: value });
  };

  const handleRemoveCertification = (index: number) => {
    removeCertification(index);
  };

  return (
    <div className="space-y-4">
      <Button
        type="button"
        variant="outline"
        onClick={handleAddCertification}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Certification
      </Button>

      <div className="space-y-4">
        {certifications.map((cert, index) => (
          <Card key={index} className="p-4">
            <div className="space-y-3">
              <div>
                <Label htmlFor={`cert-title-${index}`}>Title</Label>
                <Input
                  id={`cert-title-${index}`}
                  value={cert.title}
                  onChange={(e) =>
                    handleUpdateCertification(index, "title", e.target.value)
                  }
                  placeholder="AWS Certified Solutions Architect"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor={`cert-issuer-${index}`}>Issuer</Label>
                <Input
                  id={`cert-issuer-${index}`}
                  value={cert.issuer}
                  onChange={(e) =>
                    handleUpdateCertification(index, "issuer", e.target.value)
                  }
                  placeholder="Amazon Web Services"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor={`cert-year-${index}`}>Year</Label>
                <Input
                  id={`cert-year-${index}`}
                  value={cert.year || ""}
                  onChange={(e) =>
                    handleUpdateCertification(index, "year", e.target.value)
                  }
                  placeholder="2023"
                  className="mt-1"
                />
              </div>

              <Separator />

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveCertification(index)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove Entry
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
