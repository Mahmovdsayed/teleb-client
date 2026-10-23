import { Button } from "@/components/ui/button";

const page = () => {
  return <>
    <main className="flex flex-col items-center justify-center min-h-dvh text-center">
      <h1 className="text-4xl font-semibold tracking-tight text-balance">Mahmoud Sayed</h1>
      <p className="text-sm max-w-lg mt-4 tracking-tight font-me text-muted-foreground text-balance"></p>
      <Button>Button</Button>
    </main>
  </>;
};

export default page;