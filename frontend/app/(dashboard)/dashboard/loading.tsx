export default function Loading() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-6 w-1/3 rounded-md bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-2/3 rounded-md bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Content blocks */}
      <div className="space-y-4">
        <div className="h-4 w-full rounded-md bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-full rounded-md bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-5/6 rounded-md bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Card / section */}
      <div className="space-y-3">
        <div className="h-40 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-1/2 rounded-md bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
}
