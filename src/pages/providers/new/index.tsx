// Core
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// UI
import Button from "@/components/Button";

// Services
import { createProvider } from "@/services/commands/provider.service";

// Form
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  specialty: Yup.string().required("Specialty is required"),
});

export default function NewProviderPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createProvider,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
      router.push("/providers");
    },
  });

  return (
    <>
      <Head>
        <title>New Provider | VIP Medwork</title>
      </Head>

      <main className="p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Add New Provider</h1>

        <Formik
          initialValues={{ fullName: "", specialty: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => mutation.mutate(values)}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div>
                <label className="block mb-1">Full Name</label>
                <Field name="fullName" className="input w-full p-2 rounded-lg border-2 border-gray-800" />
                <ErrorMessage name="fullName" component="p" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block mb-1">Specialty</label>
                <Field name="specialty" className="input w-full p-2 rounded-lg border-2 border-gray-800" />
                <ErrorMessage name="specialty" component="p" className="text-red-500 text-sm" />
              </div>

              <Button type="submit" disabled={isSubmitting || mutation.isPending}>
                {mutation.isPending ? "Creating..." : "Create Provider"}
              </Button>
            </Form>
          )}
        </Formik>
      </main>
    </>
  );
}