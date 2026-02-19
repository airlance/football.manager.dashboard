import { Helmet } from '@packages/react-helmet-async';

export function TermsPage() {
    return (
        <>
            <Helmet>
                <title>Terms of Service</title>
            </Helmet>

            <div className="p-6 lg:p-8">
                <div className="mx-auto max-w-4xl rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <h1 className="text-2xl font-semibold text-foreground">Terms of Service</h1>
                    <p className="mt-4 text-sm leading-6 text-muted-foreground">
                        These Terms of Service govern your access to and use of the dashboard and related services.
                    </p>
                    <h2 className="mt-6 text-lg font-medium text-foreground">Acceptable Use</h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        You agree to use the platform lawfully, keep your account credentials secure, and avoid unauthorized access attempts.
                    </p>
                    <h2 className="mt-6 text-lg font-medium text-foreground">Limitation of Liability</h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        The service is provided as-is, and liability is limited to the extent permitted by applicable law.
                    </p>
                </div>
            </div>
        </>
    );
}
