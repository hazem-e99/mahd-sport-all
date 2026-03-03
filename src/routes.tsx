import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

// Area-specific route trees — each app owns its routing
import adminRoutes from "@admin/routes";
import portalRoute from "@portal/routes";

// Shared layouts and pages
const AdminApp = lazy(() => import("@admin/AdminApp"));
const LoginPage = lazy(() => import("@shared/pages/login/LoginPage"));
const CreateNewPasswordPage = lazy(() => import("@shared/pages/createPassword/CreateNewPasswordPage"));

const Loading = () => (
    <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
    </div>
);

const Router = createBrowserRouter([
    // Shared auth pages
    {
        path: "/login",
        element: (
            <Suspense fallback={<Loading />}>
                <LoginPage />
            </Suspense>
        ),
    },
    {
        path: "/create-password",
        element: (
            <Suspense fallback={<Loading />}>
                <CreateNewPasswordPage />
            </Suspense>
        ),
    },

    // Admin area — independent routing tree (children owned by @admin/routes)
    {
        path: "/admin",
        element: (
            <Suspense fallback={<Loading />}>
                <AdminApp />
            </Suspense>
        ),
        children: adminRoutes,
    },

    // Portal area — independent routing tree (owned by @portal/routes)
    portalRoute,

    // Fallback redirects
    { path: "/", element: <Navigate to="/login" replace /> },
    { path: "*", element: <Navigate to="/login" replace /> },
]);

export default Router;
