import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loader from "./common/components/loader";
import MainLayout from "./layout/MainLayout";
import "./App.css";
import "./i18n/i18n";
import { ErrorBoundary } from "react-error-boundary";
import { AuthProvider } from "./common/components/context/AuthContex";
import LoginPage2 from "./modules/Auth/features/Login/LoginLogic";
import FirstEmployeePassword from "./modules/Auth/features/FirstTimeLogin/FirstTimeLogin";
import ProtectedRoute from "./common/components/ProtectedRoute";

// Lazy-loaded modules
const Admin = lazy(() => import("./modules/admin"));
const HomeModule = lazy(() => import("./modules/home"));
const EmployeeModule = lazy(() => import("./modules/employee"));
const CenterDocumentModule = lazy(() => import("./modules/centerDocument"));
const LeaveModule = lazy(() => import("./modules/leave"));
const RetirementModule = lazy(() => import("./modules/retirement"));
const AppraisalModule = lazy(() => import("./modules/appraisal"));
const AttendanceModule = lazy(() => import("./modules/attendance"));
const ComplaintModule = lazy(() => import("./modules/complaint"));
const RewardModule = lazy(() => import("./modules/reward"));

// Error boundary fallback component
const ErrorFallback = ({ error }) => {
  return (
    <div>
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
    </div>
  );
};

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AuthProvider>
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage2 />} />
            <Route path="/createPassword" element={<FirstEmployeePassword />} />

            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute
                  roles={[
                    "hrManager",
                    "hrStaff",
                    "hq-admin",
                    "admin",
                    "employee",
                    "documentStaff",
                  ]}
                >
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/home/dashboard" />} />
              <Route path="home/*" element={<HomeModule />} />
              <Route
                path="employee/*"
                element={
                  <ProtectedRoute
                    roles={[
                      "hrManager",
                      "hrStaff",
                      "hq-admin",
                      "documentStaff",
                    ]}
                  >
                    <EmployeeModule />
                  </ProtectedRoute>
                }
              />
              <Route
                path="organization/*"
                element={
                  <ProtectedRoute
                    roles={[
                      "hrManager",
                      "hq-admin",
                      "admin",
                    ]}
                  >
                    <Admin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="centerDocument/*"
                element={<CenterDocumentModule />}
              />
              <Route
                path="leave/*"
                element={
                  <ProtectedRoute
                    roles={[
                      "hrStaff",
                      "hq-admin",
                    ]}
                  >
                    <LeaveModule />
                  </ProtectedRoute>
                }
              />
              <Route
                path="retirement/*"
                element={
                  <ProtectedRoute
                    roles={[
                      "hrStaff",
                      "hq-admin",
                    ]}
                  >
                    <RetirementModule />
                  </ProtectedRoute>
                }
              />
              <Route
                path="appraisal/*"
                element={
                  <ProtectedRoute
                    roles={[
                      "hrManager",
                      "hq-admin",
                    ]}
                  >
                    <AppraisalModule />
                  </ProtectedRoute>
                }
              />
              <Route
                path="attendance/*"
                element={
                  <ProtectedRoute
                    roles={[
                      "hrManager",
                      "hrStaff",
                      "hq-admin",
                      "employee",
                    ]}
                  >
                    <AttendanceModule />
                  </ProtectedRoute>
                }
              />
              <Route
                path="complaint/*"
                element={
                  <ProtectedRoute
                    roles={[
                      "hrManager",
                      "hq-admin",
                    ]}
                  >
                    <ComplaintModule />
                  </ProtectedRoute>
                }
              />
              <Route
                path="reward/*"
                element={
                  <ProtectedRoute
                    roles={[
                      "hrManager",
                      "hq-admin",
                    ]}
                  >
                    <RewardModule />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Fallback route for unmatched paths */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
