import '../../css/app.css';
import Navbar from '../../js/components/Navbar';
import Hero from '../../js/components/Hero';
import JadwalKelas from '../../js/components/JadwalKelas';
import Pengumuman from '../../js/components/Pengumuman';
import AnggotaKelas from '../../js/components/AnggotaKelas';
import Galeri from '../../js/components/Galeri';
import LinkGrup from '../../js/components/LinkGrup';
import ForumDiskusi from '../../js/components/ForumDiskusi';
import Footer from '../../js/components/Footer';

interface Mahasiswa{
    kodeMahasiswa: number;
    nama: string;
    umur: number;
    fakultas: string;
    jurusan: string;
    prodi: string;
    hobi: string
}

interface Props{
    mahasiswa: Mahasiswa[];
}

export default function Welcome({mahasiswa}: Props) {
  return (
    <>
    {/* testing ambil data db */}
    <div className='flex'>
        {mahasiswa.map((mhs) => (
            <div key={mhs.kodeMahasiswa}>
                <h1>{mhs.nama}</h1>
                <p>{mhs.umur}</p>
            </div>
        ))}
    </div>

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <JadwalKelas />
        <Pengumuman />
        <AnggotaKelas />
        <Galeri />
        <LinkGrup />
        <ForumDiskusi />
      </main>
      <Footer />
    </>
  );
}
