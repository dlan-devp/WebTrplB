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
        <main className="container min-h-screen w-full relative">
            <Navbar />
            {children}
            <Footer />
        </main>
    );
}