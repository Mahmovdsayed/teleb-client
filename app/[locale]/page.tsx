import HomePage from "@/components/pages/Home/HomePage";
import { Button } from "@/components/ui/button";

const page = () => {
  return <>
    <main className="min-h-dvh flex flex-col bg-linear-to-b from-amber-50/50 to-bg-muted/20 dark:from-background dark:to-bg-muted/20">
      <HomePage />
    </main>
  </>;
};

export default page;