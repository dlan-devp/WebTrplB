import type { InertiaLinkProps } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toUrl } from '@/lib/utils';

function resolvePathname(url?: string | null): string {
    if (!url) {
        return '/';
    }

    try {
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return new URL(url).pathname;
        }

        return new URL(
            url,
            typeof window !== 'undefined' ? window.location.origin : 'http://localhost',
        ).pathname;
    } catch {
        return url.startsWith('/') ? url : `/${url}`;
    }
}

export type IsCurrentUrlFn = (
    urlToCheck: NonNullable<InertiaLinkProps['href']>,
    currentUrl?: string,
    startsWith?: boolean,
) => boolean;

export type IsCurrentOrParentUrlFn = (
    urlToCheck: NonNullable<InertiaLinkProps['href']>,
    currentUrl?: string,
) => boolean;

export type WhenCurrentUrlFn = <TIfTrue, TIfFalse = null>(
    urlToCheck: NonNullable<InertiaLinkProps['href']>,
    ifTrue: TIfTrue,
    ifFalse?: TIfFalse,
) => TIfTrue | TIfFalse;

export type UseCurrentUrlReturn = {
    currentUrl: string;
    isCurrentUrl: IsCurrentUrlFn;
    isCurrentOrParentUrl: IsCurrentOrParentUrlFn;
    whenCurrentUrl: WhenCurrentUrlFn;
};

export function useCurrentUrl(): UseCurrentUrlReturn {
    const page = usePage();
    const [currentUrlPath, setCurrentUrlPath] = useState(() => resolvePathname(page.url));

    useEffect(() => {
        const syncCurrentUrlPath = () => {
            const pathname =
                typeof window !== 'undefined' ? window.location.pathname : page.url;

            setCurrentUrlPath(resolvePathname(pathname));
        };

        syncCurrentUrlPath();

        if (typeof window === 'undefined') {
            return;
        }

        window.addEventListener('popstate', syncCurrentUrlPath);
        window.addEventListener('pageshow', syncCurrentUrlPath);

        return () => {
            window.removeEventListener('popstate', syncCurrentUrlPath);
            window.removeEventListener('pageshow', syncCurrentUrlPath);
        };
    }, [page.url]);

    const isCurrentUrl: IsCurrentUrlFn = (
        urlToCheck: NonNullable<InertiaLinkProps['href']>,
        currentUrl?: string,
        startsWith: boolean = false,
    ) => {
        const urlToCompare = currentUrl ?? currentUrlPath;
        const urlString = toUrl(urlToCheck);

        const comparePath = (path: string): boolean =>
            startsWith ? urlToCompare.startsWith(path) : path === urlToCompare;

        if (!urlString.startsWith('http')) {
            return comparePath(urlString);
        }

        try {
            const absoluteUrl = new URL(urlString);

            return comparePath(absoluteUrl.pathname);
        } catch {
            return false;
        }
    };

    const isCurrentOrParentUrl: IsCurrentOrParentUrlFn = (
        urlToCheck: NonNullable<InertiaLinkProps['href']>,
        currentUrl?: string,
    ) => {
        return isCurrentUrl(urlToCheck, currentUrl, true);
    };

    const whenCurrentUrl: WhenCurrentUrlFn = <TIfTrue, TIfFalse = null>(
        urlToCheck: NonNullable<InertiaLinkProps['href']>,
        ifTrue: TIfTrue,
        ifFalse: TIfFalse = null as TIfFalse,
    ): TIfTrue | TIfFalse => {
        return isCurrentUrl(urlToCheck) ? ifTrue : ifFalse;
    };

    return {
        currentUrl: currentUrlPath,
        isCurrentUrl,
        isCurrentOrParentUrl,
        whenCurrentUrl,
    };
}
