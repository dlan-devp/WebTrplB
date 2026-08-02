// Components
import { Form, Head } from '@inertiajs/react';
import { MailCheck, GraduationCap } from 'lucide-react';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/ui/Navbar';
import { Spinner } from '@/components/ui/spinner';
import { logout } from '@/routes';
import { send } from '@/routes/verification';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <>
            <Head title="Email verification" />
            <Navbar />

            <div className="min-h-screen w-full flex bg-white">
                {/* ===== Panel kiri — identitas kelas ===== */}
                <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#0a0a12]">
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/40 rounded-full blur-3xl" />
                    <div className="absolute top-1/3 -right-24 w-80 h-80 bg-blue-600/30 rounded-full blur-3xl" />

                    <div className="relative z-10 flex flex-col justify-between w-full px-14 py-12 text-white">
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500" />
                            <span className="text-sm font-semibold text-slate-100">Kelas TRPL-B</span>
                        </div>

                        <div>
                            <h1 className="text-4xl font-bold leading-tight mb-4">
                                Satu langkah lagi,
                                <br />
                                verifikasi emailmu.
                            </h1>
                            <p className="text-slate-400 text-base leading-relaxed max-w-sm">
                                Cek inbox kamu dan klik link verifikasi supaya akun kamu bisa
                                langsung dipakai.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 text-slate-500 text-xs">
                            <GraduationCap className="w-4 h-4" />
                            <span>Satu akun, untuk satu kelas.</span>
                        </div>
                    </div>
                </div>

                {/* ===== Panel kanan — form ===== */}
                <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-10 py-16">
                    <div className="w-full max-w-md text-center">
                        <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-6">
                            <MailCheck className="w-7 h-7 text-indigo-600" />
                        </div>

                        <h2 className="text-3xl font-bold text-slate-900 mb-2">
                            Verifikasi email kamu
                        </h2>
                        <p className="text-slate-500 mb-8 leading-relaxed">
                            Kami sudah kirim link verifikasi ke email yang kamu daftarkan.
                            Buka email itu dan klik linknya untuk lanjut.
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mb-6 text-sm font-medium text-emerald-600">
                                Link verifikasi baru sudah dikirim ke email yang kamu
                                daftarkan saat registrasi.
                            </div>
                        )}

                        <Form {...send.form()} className="space-y-6">
                            {({ processing }) => (
                                <>
                                    <Button
                                        disabled={processing}
                                        variant="secondary"
                                        className="w-full py-3.5 rounded-xl font-semibold"
                                    >
                                        {processing && <Spinner className="mr-2" />}
                                        Kirim Ulang Email Verifikasi
                                    </Button>

                                    <TextLink
                                        href={logout()}
                                        className="mx-auto block text-sm text-slate-500 hover:text-slate-800"
                                    >
                                        Keluar
                                    </TextLink>
                                </>
                            )}
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}

VerifyEmail.layout = {
    title: 'Email verification',
    description:
        'Please verify your email address by clicking on the link we just emailed to you.',
};