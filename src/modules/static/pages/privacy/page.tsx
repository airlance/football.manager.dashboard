import { Helmet } from '@packages/react-helmet-async';

export function PrivacyPage() {
    return (
        <>
            <Helmet>
                <title>Privacy Policy</title>
            </Helmet>

            <div className="p-6 lg:p-8">
                <div className="mx-auto max-w-4xl rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <h1 className="text-2xl font-semibold text-foreground">Privacy Policy</h1>
                    <p className="mt-4 text-sm leading-6 text-muted-foreground">
                        This Privacy Policy describes how we collect, use, and protect your personal information when you use the dashboard.
                    </p>
                    <h2 className="mt-6 text-lg font-medium text-foreground">Information We Collect</h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        We may collect account details, usage analytics, and technical data required to provide and improve the service.
                    </p>
                    <h2 className="mt-6 text-lg font-medium text-foreground">How We Use Information</h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        Data is used for authentication, service functionality, security monitoring, and support operations.
                    </p>
                </div>
            </div>
        </>
    );
}
