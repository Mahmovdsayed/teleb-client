import HomePage from "@/components/pages/Home/HomePage";
import { PageTransition } from "@/components/ui/PageTransition";

const page = () => {
  return (
    <PageTransition>
      <HomePage />
    </PageTransition>
  );
};

export default page;