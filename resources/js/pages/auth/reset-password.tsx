import { Form, Head } from '@inertiajs/react';
import { Lock, GraduationCap } from 'lucide-react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { update } from '@/routes/password';

type Props = {
    token: string;
    email: string;
    passwordRules: string;
};

export default function ResetPassword({ token, email, passwordRules }: Props) {
    return (
        <>
            <Head title="Reset password" />

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
                                Hampir selesai,
                                <br />
                                atur ulang sandimu.
                            </h1>
                            <p className="text-slate-400 text-base leading-relaxed max-w-sm">
                                Buat kata sandi baru buat akun kamu. Pastikan mudah diingat
                                tapi tetap aman ya.
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
                        <div className="flex items-center gap-2 text-indigo-600 mb-4">
                            <Lock className="w-5 h-5" />
                        </div>

                        <h2 className="text-3xl font-bold text-slate-900 mb-2">
                            Buat kata sandi baru
                        </h2>
                        <p className="text-slate-500 mb-8 leading-relaxed">
                            Masukkan kata sandi baru untuk akun{' '}
                            <span className="font-medium text-slate-700">{email}</span>.
                        </p>

                        <Form
                            {...update.form()}
                            transform={(data) => ({ ...data, token, email })}
                            resetOnSuccess={['password', 'password_confirmation']}
                        >
                            {({ processing, errors }) => (
                                <div className="grid gap-5">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            autoComplete="email"
                                            value={email}
                                            className="rounded-xl py-3.5 bg-slate-50"
                                            readOnly
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="password">Kata Sandi Baru</Label>
                                        <PasswordInput
                                            id="password"
                                            name="password"
                                            autoComplete="new-password"
                                            className="rounded-xl py-3.5"
                                            autoFocus
                                            placeholder="Kata Sandi Baru"
                                            passwordrules={passwordRules}
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="password_confirmation">
                                            Konfirmasi Kata Sandi
                                        </Label>
                                        <PasswordInput
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            autoComplete="new-password"
                                            className="rounded-xl py-3.5"
                                            placeholder="Konfirmasi Kata Sandi"
                                            passwordrules={passwordRules}
                                        />
                                        <InputError message={errors.password_confirmation} />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="mt-2 w-full py-3.5 rounded-xl font-semibold text-white bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
                                        disabled={processing}
                                        data-test="reset-password-button"
                                    >
                                        {processing && <Spinner className="mr-2" />}
                                        Atur Ulang Kata Sandi
                                    </Button>
                                </div>
                            )}
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}

ResetPassword.layout = {
    title: 'Reset password',
    description: 'Please enter your new password below',
};