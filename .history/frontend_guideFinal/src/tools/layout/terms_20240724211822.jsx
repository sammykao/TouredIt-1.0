import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

export function TermsAndConditions() {
  const pdfUrl = "./../../../public/tem"
  return (
    <>
      <div className="relative isolate px-6 pt-14 lg:px-8 min-h-screen pb-24 bg-gray-100">
        <Typography variant="h2" className="font-bold mb-4 text-center">Terms and Conditions</Typography>
        <div className="pdf-viewer-container h-[80vh]">
        <object data={pdfUrl} type="application/pdf" width="100%" height="100%">
            <p>Your browser does not support PDFs. <a href={pdfUrl}>Download the PDF</a>.</p>
        </object>
        </div>
      </div>
    </>
  );
}

export default TermsAndConditions;
