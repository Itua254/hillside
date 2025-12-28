"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPlayer() {
  const router = useRouter();
  const [form, setForm] = useState({
    full_name: "",
    number: "",
    position: "",
    photo_url: ""
  });

  function update(field, value) {
    setForm((old) => ({ ...old, [field]: value }));
  }

  async function submit() {
    const res = await fetch("/api/modules/players/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      router.push("/admin/players");
    } else {
      alert("Error creating player");
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Add New Player</h1>

      <input
        placeholder="Full Name"
        value={form.full_name}
        onChange={(e) => update("full_name", e.target.value)}
      /><br /><br />

      <input
        placeholder="Number"
        type="number"
        value={form.number}
        onChange={(e) => update("number", e.target.value)}
      /><br /><br />

      <input
        placeholder="Position"
        value={form.position}
        onChange={(e) => update("position", e.target.value)}
      /><br /><br />

      <input
        placeholder="Photo URL"
        value={form.photo_url}
        onChange={(e) => update("photo_url", e.target.value)}
      /><br /><br />

      <button onClick={submit}>Save Player</button>
    </div>
  );
}
