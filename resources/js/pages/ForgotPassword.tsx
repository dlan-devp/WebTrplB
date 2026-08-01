import { useState } from "react";
import { Mail, ArrowLeft, CheckCircle2, Loader2, GraduationCap } from "lucide-react";

/**
 * ForgotPassword
 * -----------------------------------------------------------------------
 * Halaman "Lupa Kata Sandi" — dibuat senada dengan halaman Masuk (Kelas TRPL-B).
 * - Frontend: React + Tailwind CSS
 * - Backend: Laravel (endpoint default: POST /api/forgot-password)
 *
 * Cara pakai:
 *   <ForgotPassword onBackToLogin={() => navigate('/login')} />
 *
 * Sesuaikan `API_URL` dengan route Laravel kamu, misalnya:
 *   Route::post('/api/forgot-password', [AuthController::class, 'sendResetLink']);
 * -----------------------------------------------------------------------
 */

const API_URL = "/api/forgotPassword";

export default function ForgotPassword({ onBackToLogin }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | sent | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email.trim()) {
      setStatus("error");
      setErrorMsg("Email kampus wajib diisi.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.message || "Email tidak ditemukan. Periksa kembali email kampusmu.");
      }

      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Terjadi kesalahan. Coba lagi beberapa saat lagi.");
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white">
      {/* ===== Panel kiri — identitas kelas (senada dengan halaman Masuk) ===== */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#0a0a12]">
        {/* Ambient gradient blobs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/40 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-80 h-80 bg-blue-600/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-black/60 to-transparent" />

        <div className="relative z-10 flex flex-col justify-between w-full px-14 py-12 text-white">
          {/* Badge */}
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500" />
            <span className="text-sm font-semibold tracking-wide text-slate-100">
              Kelas TRPL-B
            </span>
          </div>

          {/* Middle content */}
          <div>
            <h1 className="text-4xl font-bold leading-tight mb-4">
              Lupa kata sandi,
              <br />
              bukan akhir dunia.
            </h1>
            <p className="text-slate-400 text-base leading-relaxed max-w-sm">
              Masukkan email kampusmu, kami kirim link untuk atur ulang kata
              sandi supaya kamu bisa masuk lagi.
            </p>

            <div className="mt-10 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-6 py-5 max-w-sm">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <span>TRPL-B</span>
                <span className="opacity-50">·</span>
                <span>2026/2027</span>
              </div>
              <div className="text-lg font-semibold text-white">Kelas TRPL-B</div>
              <div className="text-sm text-slate-400">
                Teknik Rekayasa Perangkat Lunak · Semester 3
              </div>
            </div>
          </div>

          {/* Footer badge */}
          <div className="flex items-center gap-2 text-slate-500 text-xs">
            <GraduationCap className="w-4 h-4" />
            <span>Satu akun, untuk satu kelas.</span>
          </div>
        </div>
      </div>

      {/* ===== Panel kanan — form ===== */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-10 py-16 bg-linear-to-br from-slate-50 to-white">
        <div className="w-full max-w-md">
          <button
            type="button"
            onClick={onBackToLogin}
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke halaman masuk
          </button>

          {status === "sent" ? (
            <SuccessState email={email} onBackToLogin={onBackToLogin} onResend={() => setStatus("idle")} />
          ) : (
            <>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Lupa kata sandi?
              </h2>
              <p className="text-slate-500 mb-8 leading-relaxed">
                Masukkan email kampus yang kamu daftarkan ke admin kelas.
                Kami akan kirim link untuk atur ulang kata sandi.
              </p>

              <form onSubmit={handleSubmit} noValidate>
                <label htmlFor="email" className="sr-only">
                  Email Kampus
                </label>
                <div className="relative mb-2">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Kampus"
                    autoComplete="email"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-shadow"
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-500 mt-2 mb-2" role="alert">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full mt-6 py-3.5 rounded-xl font-semibold text-white bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 active:scale-[0.99] transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Mengirim link...
                    </>
                  ) : (
                    "Kirim Link Reset"
                  )}
                </button>
              </form>

              <p className="text-center text-sm text-slate-500 mt-8">
                Sudah ingat kata sandi?{" "}
                <button
                  type="button"
                  onClick={onBackToLogin}
                  className="text-indigo-600 font-medium hover:underline"
                >
                  Masuk di sini
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function SuccessState({ email, onBackToLogin, onResend }) {
  return (
    <div>
      <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mb-6">
        <CheckCircle2 className="w-6 h-6 text-emerald-500" />
      </div>
      <h2 className="text-3xl font-bold text-slate-900 mb-2">Cek email kamu</h2>
      <p className="text-slate-500 mb-8 leading-relaxed">
        Kami sudah kirim link atur ulang kata sandi ke{" "}
        <span className="font-medium text-slate-700">{email}</span>. Buka
        email itu untuk lanjut atur ulang kata sandi.
      </p>

      <button
        type="button"
        onClick={onBackToLogin}
        className="w-full py-3.5 rounded-xl font-semibold text-white bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 active:scale-[0.99] transition-all shadow-lg shadow-indigo-600/20"
      >
        Kembali ke halaman masuk
      </button>

      <p className="text-center text-sm text-slate-500 mt-6">
        Tidak menerima email?{" "}
        <button
          type="button"
          onClick={onResend}
          className="text-indigo-600 font-medium hover:underline"
        >
          Kirim ulang
        </button>
      </p>
    </div>
  );
}