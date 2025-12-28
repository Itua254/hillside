export default function PlayerCard({ player }) {
  if (!player) return null;

  return (
    <div style={{
      padding: 16,
      border: "1px solid #ddd",
      borderRadius: 8,
      width: 200,
      textAlign: "center"
    }}>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={player.photo_url || "/default-player.png"}
        alt={player.full_name}
        style={{
          width: 120,
          height: 120,
          objectFit: "cover",
          borderRadius: "50%",
          marginBottom: 12
        }}
      />

      <h3 style={{ margin: "6px 0" }}>{player.full_name}</h3>
      <p style={{ margin: 0 }}>#{player.number}</p>
      <p style={{ margin: 0 }}>{player.position}</p>
    </div>
  );
}
