"use client";

import React from "react";
import RecaptchaProvider from "@/components/layout/RecaptchaProvider";
import CustomerrequirementForm from "./CustomerrequirementForm";

function CustomerReqSection({ title }) {
  return (
    <RecaptchaProvider>
      <CustomerrequirementForm title={title} type="fabrication" />
    </RecaptchaProvider>
  );
}

export default CustomerReqSection;
