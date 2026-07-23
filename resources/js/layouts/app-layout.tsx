import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';


export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="min-h-screen w-full lg:w-350 m-auto">
            <Navbar />
            {children}
            <Footer />
        </main>
    );
}