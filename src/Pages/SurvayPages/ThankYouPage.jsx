
import React from "react";
import { Trans } from "react-i18next";
// import { useTranslation } from "react-i18next";

export default function ThankYouPage() {
    // const { t } = useTranslation();
    return (
        <div className="bg-[#fdfdfd] container mx-auto mt-60">
            <Trans i18nKey="welcomeMessage">
                <h1 className="text-center font-semibold text-[#ecb206] text-4xl">
                    Thank you
                </h1>
                <p className="text-center my-5">For Participation On the Survey.</p>
            </Trans>
        </div>
    );
}
