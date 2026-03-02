import { type ReactNode } from "react"
import { UserProvider } from '@admin/context/UserContext'

export const AppMsalProvider = ({ children }: { children: ReactNode }) => {
    return (
        <UserProvider>
            {children}
        </UserProvider>
    )
}
