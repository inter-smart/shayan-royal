import { BreadCrumb } from "@/components/common/BreadCrumb";
import TermsandConditions from "@/components/features/terms-conditions/TermsandConditions";
import { fetchFromAPI } from "@/lib/api";

export default async function Page() {
  const { data, error } = await fetchFromAPI("policies/?type=terms_and_conditions");

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
          { label: "Terms & Conditions", isCurrent: true },
        ]}
      />
      <TermsandConditions policy={data?.content || ""} />
    </>
  );
}
