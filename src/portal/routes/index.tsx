import { lazy, Suspense } from "react";
import { Spinner } from "react-bootstrap";
import type { RouteObject } from "react-router-dom";

const PortalApp = lazy(() => import("@portal/PortalApp"));

const Loading = () => (
    <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
    </div>
);

/**
 * Portal area route.
 * Self-contained route tree for the end-user facing experience.
 * Admin routes live in @admin/routes.
 */
const portalRoute: RouteObject = {
    path: "/portal",
    element: (
        <Suspense fallback={<Loading />}>
            <PortalApp />
        </Suspense>
    ),
};

export default portalRoute;
