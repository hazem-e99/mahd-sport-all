import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

// Lazy load the layouts
const AdminApp = lazy(() => import("@admin/AdminApp"));
const PortalApp = lazy(() => import("@portal/PortalApp"));
const LoginPage = lazy(() => import("@shared/pages/login/LoginPage"));

// Lazy load admin pages
const Home = lazy(() => import("@admin/pages/home/home"));
const CardControl = lazy(() => import("@admin/pages/cardControl/card-control"));
const GeneralSettings = lazy(() => import("@admin/components/common/GeneralSettings/GeneralSettings.component"));

const Loading = () => (
    <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
    </div>
);

const Router = createBrowserRouter([
    // Login route
    {
        path: "/login",
        element: (
            <Suspense fallback={<Loading />}>
                <LoginPage />
            </Suspense>
        ),
    },
    // Admin routes
    {
        path: "/admin",
        element: (
            <Suspense fallback={<Loading />}>
                <AdminApp />
            </Suspense>
        ),
        children: [
            { index: true, element: <Navigate to="/admin/en" replace /> },
            {
                path: ":lng",
                element: (
                    <Suspense fallback={<Loading />}>
                        <Home />
                    </Suspense>
                ),
            },
            {
                path: ":lng/card-control",
                element: (
                    <Suspense fallback={<Loading />}>
                        <CardControl />
                    </Suspense>
                ),
            },
            {
                path: ":lng/GeneralSettings",
                element: (
                    <Suspense fallback={<Loading />}>
                        <GeneralSettings />
                    </Suspense>
                ),
            },
            {
                path: "*",
                element: <Navigate to="/admin/en" replace />,
            },
        ],
    },
    // Portal route
    {
        path: "/portal",
        element: (
            <Suspense fallback={<Loading />}>
                <PortalApp />
            </Suspense>
        ),
    },
    // Default redirect to login
    {
        path: "/",
        element: <Navigate to="/login" replace />,
    },
    {
        path: "*",
        element: <Navigate to="/login" replace />,
    },
]);

export default Router;
