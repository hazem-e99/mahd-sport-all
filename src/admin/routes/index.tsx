import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import type { RouteObject } from "react-router-dom";

// Lazy load admin pages
const Home = lazy(() => import("@admin/pages/home/home"));
const CardControl = lazy(() => import("@admin/pages/cardControl/card-control"));
const GeneralSettings = lazy(() => import("@admin/components/common/GeneralSettings/GeneralSettings.component"));
const ManageUsers = lazy(() => import("@admin/pages/manageUsers/ManageUsers"));
const SoundControl = lazy(() => import("@admin/pages/soundControl/SoundControl"));

const Loading = () => (
    <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
    </div>
);

/**
 * Admin area child routes.
 * These are children of the /admin route (AdminApp layout).
 * Portal routes live in @portal/routes.
 */
const adminChildren: RouteObject[] = [
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
        path: ":lng/manage-users",
        element: (
            <Suspense fallback={<Loading />}>
                <ManageUsers />
            </Suspense>
        ),
    },
    {
        path: ":lng/sound-control",
        element: (
            <Suspense fallback={<Loading />}>
                <SoundControl />
            </Suspense>
        ),
    },
    {
        path: "*",
        element: <Navigate to="/admin/en" replace />,
    },
];

export default adminChildren;
