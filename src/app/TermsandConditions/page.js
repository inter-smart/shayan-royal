import { BreadCrumb } from "@/components/common/BreadCrumb";
import TermsandConditions from "@/components/features/TermsandConditions/TermsandConditions";

export default function Page() {
    return (
        <>
            <BreadCrumb
                items={[
                    { label: "HOME", href: "/" },
                    { label: "Terms & Conditions", isCurrent: true }
                ]}
            />
            <TermsandConditions />
        </>
    );
}