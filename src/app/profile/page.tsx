"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/contexts/AppContext';
import { ProfileDashboard } from '@/components/user/ProfileDashboard';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfilePage() {
    const { user } = useAppContext();
    const router = useRouter();

    useEffect(() => {
        // A short delay to prevent flashing content if user is quickly loaded from localStorage
        const timer = setTimeout(() => {
            if (user === null) {
                router.push('/login');
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [user, router]);

    if (!user) {
        return (
            <div className="space-y-8">
                <div>
                    <Skeleton className="h-10 w-1/2" />
                    <Skeleton className="h-4 w-3/4 mt-2" />
                </div>
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-48 w-full" />
            </div>
        )
    }

    return <ProfileDashboard />;
}
