import { BreadCrumb } from "@/components/common/BreadCrumb";
import PrivacyPolicy from "@/components/features/Privacy/PrivacyPolicy";

export default function Page() {
    return (
        <>
            <BreadCrumb
                items={[
                    { label: "HOME", href: "/" },
                    { label: "Privacy Policy", isCurrent: true }
                ]}
            />
            <PrivacyPolicy />
        </>
    );
}