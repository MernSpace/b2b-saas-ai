import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            {children}
        </div>
    );
};

export default Layout;
