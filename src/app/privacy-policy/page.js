import { BreadCrumb } from "@/components/common/BreadCrumb";
import PrivacyPolicy from "@/components/features/privacy/PrivacyPolicy";
import { fetchFromAPI } from "@/lib/api";

export default async function Page() {
  const { data, error } = await fetchFromAPI("policies/?type=privacy_policy");

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <>
      <BreadCrumb
        items={[
          { label: "HOME", href: "/" },
          { label: "Privacy Policy", isCurrent: true },
        ]}
      />
      <PrivacyPolicy policy={data?.content || ""} />
    </>
  );
}
