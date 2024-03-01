export default function StatusBadge({ status }: { status: string }) {
  let color = "bg-yellow-300";

  if (status == "PENDING") {
    color = "bg-yellow-300";
  }

  if (status == "ACTIVE") {
    color = "bg-blue-500";
  }

  if (status == "COMPLETED") {
    color = "bg-green-500";
  }

  if (status == "FAILED") {
    color = "bg-orange-500";
  }

  if (status == "CANCELED") {
    color = "bg-red-500";
  }

  return (
    <div
      className={`${color} px-3 py-1 rounded-full text-white text-xs font-semibold`}
    >
      {status}
    </div>
  );
}
