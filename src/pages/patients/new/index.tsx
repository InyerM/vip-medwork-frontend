// Core
import Head from "next/head";
import { useRouter } from "next/navigation";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// UI
import Button from "@/components/Button";

// Services
import { createPatient } from "@/services/commands/patient.service";

const validationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone is required"),
});

export default function NewPatientPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      router.push("/patients");
    },
  });

  return (
    <>
      <Head>
        <title>New Patient | VIP Medwork</title>
      </Head>
      <main className="p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Add New Patient</h1>

        <Formik
          initialValues={{ fullName: "", email: "", phone: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => mutation.mutate(values)}
          validateOnBlur
          validateOnChange
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="space-y-6">
              <div>
                <label className="block mb-1">Full Name</label>
                <Field
                  name="fullName"
                  className="input w-full rounded-lg border-2 border-gray-800 p-2"
                />
                {errors.fullName && touched.fullName && (
                  <p className="text-red-500 text-sm">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block mb-1">Email</label>
                <Field
                  name="email"
                  type="email"
                  className="input w-full rounded-lg border-2 border-gray-800 p-2"
                />
                {errors.email && touched.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block mb-1">Phone</label>
                <Field
                  name="phone"
                  type="tel"
                  className="input w-full rounded-lg border-2 border-gray-800 p-2"
                />
                {errors.phone && touched.phone && (
                  <p className="text-red-500 text-sm">{errors.phone}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || mutation.isPending}
                className="mt-8"
              >
                {mutation.isPending ? "Creating..." : "Create Patient"}
              </Button>
            </Form>
          )}
        </Formik>
      </main>
    </>
  );
}
