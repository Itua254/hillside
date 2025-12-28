"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditPlayer() {
  const router = useRouter();
  const params = useParams();
  const playerId = params.id;

  const [form, setForm] = useState(null);

  function update(field, value) {
    setForm((old) => ({ ...old, [field]: value }));
  }

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/modules/players/get-one", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: playerId })
      });

      const data = await res.json();
      setForm(data.player);
    }
    load();
  }, [playerId]);

  async function save() {
    const res = await fetch("/api/modules/players/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      router.push("/admin/players");
    } else {
      alert("Error updating player");
    }
  }

  if (!form) return <div style={{ padding: 24 }}>Loading...</div>;

  return (
    <div style={{ padding: 24 }}>
      <h1>Edit Player</h1>

      <input
        value={form.full_name}
        onChange={(e) => update("full_name", e.target.value)}
      /><br /><br />

      <input
        type="number"
        value={form.number || ""}
        onChange={(e) => update("number", e.target.value)}
      /><br /><br />

      <input
        value={form.position || ""}
        onChange={(e) => update("position", e.target.value)}
      /><br /><br />

      <input
        value={form.photo_url || ""}
        onChange={(e) => update("photo_url", e.target.value)}
      /><br /><br />

      <button onClick={save}>Save Changes</button>
    </div>
  );
}
