// "use client";

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { useState, ReactNode } from "react";

// interface ProvidersProps {
//   children: ReactNode;
// }

// export function Providers({ children }: ProvidersProps) {
//   const [queryClient] = useState(() => new QueryClient());

//   return (
//     <QueryClientProvider client={queryClient}>
//       <TooltipProvider>{children}</TooltipProvider>
//     </QueryClientProvider>
//   );
// }
