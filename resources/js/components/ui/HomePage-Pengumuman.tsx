import { motion } from 'motion/react';
import { pengumuman } from '../../../../database/dummyData';
import type { Pengumuman } from '../../types/Pengumuman-Comp.props';
import SectionHeading from './SectionHeading';
import '../../../css/components/Pengumuman.css';

const URGENSI_LABEL: Record<Pengumuman['urgensi'], string> = {
  info: 'Info',
  penting: 'Penting',
  deadline: 'Deadline',
};

export default function Pengumuman() {
  return (
    <section id="pengumuman" className="section section--tint">
      <SectionHeading
        eyebrow="Update Terbaru"
        title="Pengumuman"
        subtitle="Diurutkan dari yang paling baru, jangan sampai kelewat deadline ya."
      />

      <div className="timeline">
        {pengumuman.map((item, i) => (
          <motion.div
            key={item.id}
            className="timeline-item"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <div className="timeline-item__marker">
              <span className={`timeline-item__dot timeline-item__dot--${item.urgensi}`} />
              {i < pengumuman.length - 1 && <span className="timeline-item__line" />}
            </div>
            <div className="timeline-item__body">
              <div className="timeline-item__head">
                <span className={`timeline-item__badge timeline-item__badge--${item.urgensi}`}>
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
    </section>
  );
}
