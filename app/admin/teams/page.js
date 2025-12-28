"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Plus, Edit } from "lucide-react";

export default function TeamsAdmin() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/modules/teams/get");
        const data = await res.json();
        setTeams(data.teams || []);
      } catch (e) {
        console.error("Failed to load teams", e);
      }
    }
    load();
  }, []);

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Teams Management</h1>
        <Link href="/admin/teams/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" /> Add Team
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {teams.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted-foreground bg-muted/20 rounded-lg border border-border border-dashed">
            No teams found. create one to get started.
          </div>
        ) : (
          teams.map((t) => (
            <Card key={t.id} className="overflow-hidden">
              <CardHeader className="bg-muted/30 pb-4">
                <CardTitle className="flex justify-between items-start">
                  <span>{t.name}</span>
                  <span className="text-xs font-normal px-2 py-1 bg-background border border-border rounded-full text-muted-foreground">
                    {t.category || "Uncategorized"}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex justify-end">
                  <Link href={`/admin/teams/${t.id}/edit`}>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Edit className="w-3 h-3" /> Edit
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
