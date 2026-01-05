// app/page.tsx
import HomePage from "./home/page";

// Revalidate this page every 60 seconds (ISR)
export const revalidate = 900; // 15 minutes

export const dynamic = 'force-static';

export default function Page() {
  return <HomePage />;
}
