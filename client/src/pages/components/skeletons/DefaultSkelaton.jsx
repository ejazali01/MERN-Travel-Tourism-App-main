import { Typography } from "@material-tailwind/react";
 
export function DefaultSkeleton() {
  return (
    <div className="max-w-11/12 mb-4 animate-pulse">
      <Typography
        as="div"
        variant="h1"
        className="mb-2 h-2 w-3/4 rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
      <Typography
        as="div"
        variant="paragraph"
        className="mb-2 h-2 w-3/5 rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
    </div>
  );
}