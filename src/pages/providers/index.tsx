// Core
import Head from "next/head";

// UI
import Button from "@/components/Button";

// Hooks
import { useProviders } from "@/hooks/useProviders";

export default function ProvidersPage() {
  const { data, isLoading, error } = useProviders();

  return (
    <>
      <Head>
        <title>Providers | VIP Medwork</title>
      </Head>

      <main className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Providers</h1>
          <Button as="link" href="/providers/new">
            Add Provider
          </Button>
        </div>

        {isLoading && <p>Loading providers...</p>}
        {error && <p className="text-red-500">Error loading providers</p>}

        <ul className="space-y-4">
          {data?.map((provider) => (
            <li
              key={provider.id}
              className="p-4 border rounded-xl bg-gray-900/10 border-gray-800"
            >
              <p className="font-semibold">{provider.fullName}</p>
              <p className="text-sm text-gray-400">{provider.specialty}</p>
              <p className="text-sm text-gray-400">{new Date(provider.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}