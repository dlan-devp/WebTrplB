import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
import useMomentumScroll from '@/animation/MomentumScroll';


export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    useMomentumScroll();
    return (
        <>
            <Navbar />
            <main className="container min-h-full w-full relative">
                {children}
            </main>
            <Footer />
        </>
    );
}