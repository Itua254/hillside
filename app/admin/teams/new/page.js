"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewTeam() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "first-team",
    logo_url: ""
  });
  const [loading, setLoading] = useState(false);

  function update(field, value) {
    setForm((old) => ({ ...old, [field]: value }));
  }

  async function submit() {
    setLoading(true);
    try {
      const res = await fetch("/api/modules/teams/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        router.push("/admin/teams");
      } else {
        alert("Error creating team");
      }
    } catch (e) {
      console.error(e);
      alert("Error creating team");
    } finally {
      setLoading(false);
    }
  }

  const inputClass = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div className="container mx-auto py-10 px-4 max-w-2xl">
      <Link href="/admin/teams">
        <Button variant="ghost" className="mb-4 pl-0 gap-2 hover:bg-transparent hover:text-primary">
          <ArrowLeft className="w-4 h-4" /> Back to Teams
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Add New Team</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Team Name</label>
            <input
              className={inputClass}
              placeholder="e.g. Hillside FC"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Description</label>
            <textarea
              className={`${inputClass} min-h-[100px] py-3`}
              placeholder="Team bio..."
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Category</label>
            <select
              className={inputClass}
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
            >
              <option value="first-team">First Team</option>
              <option value="academy">Academy</option>
              <option value="women">Women</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Logo URL</label>
            <input
              className={inputClass}
              placeholder="https://..."
              value={form.logo_url}
              onChange={(e) => update("logo_url", e.target.value)}
            />
          </div>

          <Button onClick={submit} className="w-full mt-6" disabled={loading}>
            {loading ? "Saving..." : "Save Team"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
