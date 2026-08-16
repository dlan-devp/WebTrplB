import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import type { Pengumuman } from '../../types/Pengumuman-Comp.props';
import SectionHeading from './HomePage-SectionHeading';
import GeneralCompPagination from '@/components/ui/GeneralComp-Pagination';
import '../../../css/components/Pengumuman.css';
import type { Pengumumans } from '@/types/Pengumuman-Comp.props';

interface PengumumansProps{
  pengumuman: Pengumumans[];
}

const ITEMS_PER_PAGE = 5;

const URGENSI_LABEL: Record<Pengumuman['urgensi'], string> = {
  Info: 'Info',
  Penting: 'Penting',
  Deadline: 'Deadline',
};

export default function Pengumuman({pengumuman}: PengumumansProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(pengumuman.length / ITEMS_PER_PAGE));

  const items = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return pengumuman.slice(start, start + ITEMS_PER_PAGE);
  }, [pengumuman, currentPage]);

  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, totalPages));
  }, [totalPages]);

  return (
    <section id="pengumuman" className="section section--tint">
      <SectionHeading
        eyebrow="Update Terbaru"
        title="Pengumuman"
        subtitle="Diurutkan dari yang paling baru, jangan sampai kelewat deadline ya."
      />

      <div className="timeline">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            className="timeline-item"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <div className="timeline-item__marker">
              <span className={`timeline-item__dot timeline-item__dot--${item.urgensi.toLowerCase()}`} />
              {i < items.length - 1 && <span className="timeline-item__line" />}
            </div>
            <div className="timeline-item__body">
              <div className="timeline-item__head">
                <span className={`timeline-item__badge timeline-item__badge--${item.urgensi.toLowerCase()}`}>
                  {URGENSI_LABEL[item.urgensi as keyof typeof URGENSI_LABEL]}
                </span>
                <span className="mono timeline-item__date">{item.tanggal}</span>
              </div>
              <h3 className="timeline-item__title">{item.judul}</h3>
              <p className="timeline-item__desc">{item.isi}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <GeneralCompPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        className="mt-6"
      />
    </section>
  );
}