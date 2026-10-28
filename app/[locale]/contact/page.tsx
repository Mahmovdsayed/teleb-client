import ContactPage from "@/components/pages/Contact/ContactPage";
import { PageTransition } from "@/components/ui/PageTransition";

const page = () => {
    return <>
        <PageTransition>
            <ContactPage />
        </PageTransition>
    </>;
};

export default page;