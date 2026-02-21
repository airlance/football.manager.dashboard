import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/button';
import { Input, Label } from '@/components/input';
import { useAuth } from '@/providers/auth-context';

export function OnboardPage() {
    const navigate = useNavigate();
    const { user, completeOnboarding, logout } = useAuth();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!firstName.trim() || !lastName.trim() || !birthday.trim()) {
            toast.error('Please fill in all fields');
            return;
        }

        setLoading(true);
        const result = await completeOnboarding(firstName.trim(), lastName.trim(), birthday.trim());
        setLoading(false);

        if (!result.success) {
            toast.error(result.error || 'Could not save manager profile');
            return;
        }

        toast.success(result.message || 'Onboarding completed');
        navigate('/career', { replace: true });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-emerald-950 text-white">
            <div className="mx-auto flex min-h-screen max-w-3xl items-center px-4 py-10">
                <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
                    <p className="text-sm uppercase tracking-[0.18em] text-emerald-300/80">Onboarding</p>
                    <h1 className="mt-3 text-3xl font-bold">Create manager profile</h1>
                    <p className="mt-2 text-sm text-white/60">
                        {user?.email ? `Account: ${user.email}` : 'Complete your profile to continue to dashboard'}
                    </p>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="first-name" className="text-white/70">
                                First name
                            </Label>
                            <Input
                                id="first-name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="Alex"
                                className="border-white/10 bg-white/[0.06] text-white placeholder:text-white/25 focus-visible:border-emerald-500/50 focus-visible:ring-emerald-500/20"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="last-name" className="text-white/70">
                                Last name
                            </Label>
                            <Input
                                id="last-name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Ferguson"
                                className="border-white/10 bg-white/[0.06] text-white placeholder:text-white/25 focus-visible:border-emerald-500/50 focus-visible:ring-emerald-500/20"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="birthday" className="text-white/70">
                                Birthday
                            </Label>
                            <Input
                                id="birthday"
                                type="date"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                                className="border-white/10 bg-white/[0.06] text-white placeholder:text-white/25 focus-visible:border-emerald-500/50 focus-visible:ring-emerald-500/20"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-500/20 hover:from-emerald-500 hover:to-emerald-400 disabled:opacity-50"
                            size="lg"
                        >
                            {loading ? 'Saving...' : 'Complete onboarding'}
                        </Button>
                    </form>

                    <div className="mt-6 flex justify-end">
                        <Button type="button" variant="ghost" className="text-white/70 hover:text-white" onClick={() => void logout()}>
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
