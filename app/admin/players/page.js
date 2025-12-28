"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Plus, User, Edit } from "lucide-react";

export default function PlayersAdmin() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/modules/players/get");
        const data = await res.json();
        setPlayers(data.players || []);
      } catch (e) {
        console.error("Failed to load players", e);
      }
    }
    load();
  }, []);

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Players Management</h1>
        <Link href="/admin/players/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" /> Add Player
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          {players.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No players found.
            </div>
          ) : (
            <div className="divide-y divide-border">
              {players.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="bg-muted p-2 rounded-full">
                      <User className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{p.full_name}</p>
                      <p className="text-sm text-muted-foreground">#{p.number} — {p.position}</p>
                    </div>
                  </div>
                  <Link href={`/admin/players/${p.id}/edit`}>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Edit className="w-4 h-4" /> Edit
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
