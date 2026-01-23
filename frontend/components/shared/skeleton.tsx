import clsx from "clsx";

type SkeletonProps = {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: boolean;
};

export default function Skeleton({
  className,
  width = "100%",
  height = "1rem",
  rounded = true,
}: SkeletonProps) {
  return (
    <div
      className={clsx(
        "animate-pulse bg-gray-200 dark:bg-gray-700",
        rounded && "rounded-md",
        className
      )}
      style={{
        width,
        height,
      }}
    />
  );
}
