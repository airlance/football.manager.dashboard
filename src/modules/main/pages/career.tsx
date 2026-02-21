import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from '@packages/react-helmet-async';
import { toast } from 'sonner';
import { useAuth } from '@/providers/auth-context';

export function CareerIndexPage() {
    const navigate = useNavigate();
    const { careers, activeCareerId, createCareer, selectCareer, logout } = useAuth();
    const [manualSelectedCareerId, setManualSelectedCareerId] = useState<number | null>(null);
    const [name, setName] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    const hasCareers = careers.length > 0;
    const selectedCareerId = manualSelectedCareerId ?? activeCareerId ?? (careers.length === 1 ? careers[0].id : null);
    const selectedCareer = useMemo(
        () => careers.find((career) => career.id === selectedCareerId) ?? null,
        [careers, selectedCareerId],
    );

    const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const nextName = name.trim();

        if (!nextName) {
            toast.error('Career name is required');
            return;
        }

        setIsCreating(true);
        const result = await createCareer(nextName);
        setIsCreating(false);

        if (!result.success) {
            toast.error(result.error || 'Could not create career');
            return;
        }

        toast.success(result.message || 'Career created');
        setName('');
        navigate('/home', { replace: true });
    };

    const handleContinue = () => {
        if (!selectedCareerId) {
            toast.error('Choose a career first');
            return;
        }

        selectCareer(selectedCareerId);
        navigate('/home', { replace: true });
    };

    return (
        <>
            <Helmet>
                <title>Career Selection</title>
            </Helmet>

            <div className="relative min-h-screen overflow-hidden bg-[#1f1f22] text-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_30%,rgba(240,216,184,0.35)_0%,rgba(54,48,45,0.85)_35%,rgba(24,25,30,1)_72%)]" />
                <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-black/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-black/45 to-transparent" />

                <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1400px] items-center justify-end px-4 py-10 md:px-8 lg:px-12">
                    <div className="w-full max-w-[560px] rounded-2xl border border-cyan-500/20 bg-[linear-gradient(145deg,rgba(16,26,58,0.96)_0%,rgba(12,16,32,0.97)_48%,rgba(18,29,58,0.97)_100%)] p-5 shadow-[0_35px_70px_-25px_rgba(0,0,0,0.85)] md:p-7">
                        <h1 className="text-[42px] font-black uppercase leading-[0.92] tracking-tight md:text-[56px]">
                            Career
                            <span className="block">Manager 26</span>
                        </h1>

                        <p className="mt-3 text-sm text-zinc-200/85">
                            {hasCareers
                                ? 'Choose an existing career or create a new one to continue.'
                                : 'Create your first career to enter the game world.'}
                        </p>

                        {hasCareers && (
                            <div className="mt-5 space-y-2.5">
                                {careers.map((career) => {
                                    const isActive = selectedCareerId === career.id;
                                    return (
                                        <button
                                            key={career.id}
                                            type="button"
                                            onClick={() => setManualSelectedCareerId(career.id)}
                                            className={`w-full rounded-lg border px-4 py-3 text-left text-2xl font-black uppercase leading-none tracking-tight transition md:text-3xl ${
                                                isActive
                                                    ? 'border-cyan-300/70 bg-cyan-300/20'
                                                    : 'border-white/5 bg-white/14 hover:bg-white/22'
                                            }`}
                                        >
                                            {career.name}
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        {selectedCareer && (
                            <p className="mt-3 text-xs uppercase tracking-[0.18em] text-cyan-200/90">
                                Selected: {selectedCareer.name}
                            </p>
                        )}

                        <div className="mt-5 flex gap-2">
                            <button
                                type="button"
                                onClick={handleContinue}
                                disabled={!selectedCareerId}
                                className="flex-1 rounded-lg border border-white/5 bg-white/16 px-4 py-3 text-left text-lg font-black uppercase tracking-tight transition hover:bg-white/24 disabled:cursor-not-allowed disabled:opacity-45"
                            >
                                Continue
                            </button>
                            <button
                                type="button"
                                onClick={() => void logout()}
                                className="rounded-lg border border-white/10 bg-white/8 px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-200 transition hover:bg-white/18"
                            >
                                Logout
                            </button>
                        </div>

                        <div className="mt-6 rounded-xl border border-white/10 bg-white/8 p-4">
                            <p className="text-xs uppercase tracking-[0.18em] text-zinc-300">Create New Career</p>
                            <form onSubmit={handleCreate} className="mt-3 flex flex-col gap-3 sm:flex-row">
                                <input
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    placeholder="Career name"
                                    className="h-11 flex-1 rounded-md border border-white/15 bg-black/25 px-3 text-sm text-white outline-none ring-0 placeholder:text-zinc-400 focus:border-cyan-300/70"
                                />
                                <button
                                    type="submit"
                                    disabled={isCreating}
                                    className="h-11 rounded-md border border-cyan-300/50 bg-cyan-300/20 px-4 text-sm font-bold uppercase tracking-[0.13em] transition hover:bg-cyan-300/30 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {isCreating ? 'Creating...' : 'Create'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
