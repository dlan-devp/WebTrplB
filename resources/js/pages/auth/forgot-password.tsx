// Components
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle, Mail, ArrowLeft, GraduationCap } from 'lucide-react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/routes';
import { email } from '@/routes/password';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <>
            <Head title="Forgot password" />

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
                                Lupa kata sandi,
                                <br />
                                bukan akhir dunia.
                            </h1>
                            <p className="text-slate-400 text-base leading-relaxed max-w-sm">
                                Masukkan email kampusmu, kami kirim link untuk atur ulang kata sandi
                                supaya kamu bisa masuk lagi.
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
                    <div className="w-full max-w-md">
                        <TextLink
                            href="/user-auth"
                            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-8"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Kembali ke halaman masuk
                        </TextLink>

                        <h2 className="text-3xl font-bold text-slate-900 mb-2">Lupa kata sandi?</h2>
                        <p className="text-slate-500 mb-8 leading-relaxed">
                            Masukkan email kampus yang kamu daftarkan ke admin kelas. Kami akan
                            kirim link untuk atur ulang kata sandi.
                        </p>

                        {status && (
                            <div className="mb-4 text-sm font-medium text-emerald-600">
                                {status}
                            </div>
                        )}

                        <Form {...email.form()}>
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email Kampus</Label>
                                        <div className="relative">
                                            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                autoComplete="off"
                                                autoFocus
                                                placeholder="email@kampus.ac.id"
                                                className="pl-10 py-3.5 rounded-xl"
                                            />
                                        </div>
                                        <InputError message={errors.email} />
                                    </div>

                                    <Button
                                        className="w-full mt-6 py-3.5 rounded-xl font-semibold text-white bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
                                        disabled={processing}
                                        data-test="email-password-reset-link-button"
                                    >
                                        {processing && (
                                            <LoaderCircle className="h-4 w-4 animate-spin mr-2" />
                                        )}
                                        Kirim Link Reset
                                    </Button>
                                </>
                            )}
                        </Form>

                        <p className="text-center text-sm text-muted-foreground mt-8">
                            Sudah ingat kata sandi?{' '}
                            <TextLink href={login()} className="text-indigo-600 font-medium">
                                Masuk di sini
                            </TextLink>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

ForgotPassword.layout = {
    title: 'Forgot password',
    description: 'Enter your email to receive a password reset link',
};