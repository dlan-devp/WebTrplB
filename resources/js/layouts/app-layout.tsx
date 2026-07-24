import { usePage } from '@inertiajs/react';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
import useMomentumScroll from '@/animation/MomentumScroll';

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    useMomentumScroll();

    const page = usePage();
    const isAuthPage = page.component === 'AuthPage'
        || page.component.startsWith('auth/')
        || /^(\/login|\/register|\/forgot-password|\/reset-password|\/verify-email|\/two-factor|\/auth)(\/|$)/.test(page.url);

    return (
        <>
            <Navbar />
            <main className="container pt-16 min-h-full w-full relative">
                {children}
            </main>
            {!isAuthPage && <Footer />}
        </>
    );
}