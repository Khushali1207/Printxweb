import { Routes, Route } from 'react-router-dom';
import PrintXLandingPage from '../PrintXLandingPage';
import HelpPage from '../HelpPage';
import PrintPage from '../PrintPage';
import LoginPage from '../LoginPage';
import AboutPage from '../AboutPage';
import ContactPage from '../ContactPage';
import InstallationPage from '../InstallationPage';
import TermsPage from '../TermsPage';
import PrivacyPage from '../PrivacyPage';
import RefundPage from '../RefundPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PrintXLandingPage />} />
      <Route path="/help" element={<HelpPage />} />
      <Route path="/print" element={<PrintPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/installation" element={<InstallationPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/refund" element={<RefundPage />} />
    </Routes>
  );
}
