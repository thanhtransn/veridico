import { BrowserRouter, Route, Routes } from "react-router-dom";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import { LogIn } from "./page/signIn/login";
import { SignUp } from "./page/signUp/signUp";
import DashboardAnalytics from "./page/home/homePage";
import { CreateOrganisationForm, EditOrganisationForm, OrganisationDetail } from "./page/organization";
import { ProtectedHeader } from "./component/wrapper";

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/signIn" element={<LogIn />} />
          <Route path="/signUp" element={<SignUp />} />

          {/* Protected routes */}
          <Route path="/" element={<ProtectedHeader />}>
            <Route index element={<DashboardAnalytics />} />
            <Route path="organisation/new" element={<CreateOrganisationForm />} />
            <Route path="/organisation/:organisationId" element={<OrganisationDetail />}/>
            <Route path="/organisation/edit/:organisationId" element={<EditOrganisationForm />}/>
          </Route>
        </Routes>
      </BrowserRouter>
  );
};

export default App;
