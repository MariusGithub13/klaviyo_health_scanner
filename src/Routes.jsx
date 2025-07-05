import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import StoreUrlInputTestSelection from "pages/store-url-input-test-selection";
import DiagnosticScanProgress from "pages/diagnostic-scan-progress";
import DiagnosticResultsDashboard from "pages/diagnostic-results-dashboard";
import TechnicalFixInstructions from "pages/technical-fix-instructions";
import PdfReportGenerationLeadCapture from "pages/pdf-report-generation-lead-capture";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<StoreUrlInputTestSelection />} />
        <Route path="/store-url-input-test-selection" element={<StoreUrlInputTestSelection />} />
        <Route path="/diagnostic-scan-progress" element={<DiagnosticScanProgress />} />
        <Route path="/diagnostic-results-dashboard" element={<DiagnosticResultsDashboard />} />
        <Route path="/technical-fix-instructions" element={<TechnicalFixInstructions />} />
        <Route path="/pdf-report-generation-lead-capture" element={<PdfReportGenerationLeadCapture />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;