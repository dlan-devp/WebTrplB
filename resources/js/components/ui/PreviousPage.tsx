import { ArrowLeft } from 'lucide-react';
import '../../../css/components/PreviousPage.css'

export default function PreviousPage() {
    return (
        <div className="previous-page">
            <button onClick={history.back} className="previous-page__link">
                <ArrowLeft size={16} />
            </button>
        </div>
    );
}
