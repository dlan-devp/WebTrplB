import { ArrowLeft } from 'lucide-react';
import '../../../css/components/PreviousPage.css';
import { useCurrentUrl } from '@/hooks/use-current-url';

export default function PreviousPageButton() {
    const { currentUrl } = useCurrentUrl();

    if (currentUrl === '/' || currentUrl === '') {
        return null;
    }

    return (
            <button onClick={() => history.back()} className="previous-page__link">
                <ArrowLeft size={18} />
            </button>
    );
}
