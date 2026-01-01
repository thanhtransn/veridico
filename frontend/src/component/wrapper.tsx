import type { FC } from "react";
import { AuthProvider } from "../hoc/authContext";
import { Outlet } from "react-router-dom";
import { withAuthRequired } from "../hoc/withAuthRequired";
import { Header } from "./header";

export const Wrapper: FC = () => {
    return (
        <AuthProvider>
            <>
                <Header />
                <Outlet />
            </>
        </AuthProvider>
    )
}

export const ProtectedHeader = withAuthRequired(
    Wrapper
)
