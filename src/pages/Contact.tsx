import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ContactSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  type: Yup.string().required("Please select a feedback type"),

  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .required("Message is required"),
});

const Contact = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#4b0000] via-[#7a0000] to-[#2a0000] text-white">
      {/* Back Button */}
      <div className="px-8 pt-6">
        <button
          onClick={() => window.history.back()}
          className="text-yellow-400 hover:text-yellow-300 transition font-medium"
        >
          ← Back to Home
        </button>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
          Contact Us
        </h1>

        <p className="text-center text-gray-200 max-w-2xl mx-auto mb-12 text-lg">
          Share your suggestions, complaints, or feedback to help us improve the
          IMDB Clone experience.
        </p>

        <div className="bg-black/60 rounded-2xl shadow-xl p-8 md:p-10">
          <Formik
            initialValues={{
              name: "",
              email: "",
              type: "suggestion",
              message: "",
            }}
            validationSchema={ContactSchema}
            onSubmit={(values, { resetForm }) => {
              console.log("Form Data:", values);
              // TODO: send to backend API
              resetForm();
            }}
          >
            {({ touched, errors }) => (
              <Form className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm mb-2 text-gray-300">
                    Your Name
                  </label>
                  <Field
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    className={`w-full rounded-lg bg-black/50 border px-4 py-3 focus:outline-none focus:ring-2
                      ${
                        touched.name && errors.name
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-600 focus:ring-yellow-400"
                      }`}
                  />
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="text-red-400 text-sm mt-1"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm mb-2 text-gray-300">
                    Email Address
                  </label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className={`w-full rounded-lg bg-black/50 border px-4 py-3 focus:outline-none focus:ring-2
                      ${
                        touched.email && errors.email
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-600 focus:ring-yellow-400"
                      }`}
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-400 text-sm mt-1"
                  />
                </div>

                {/* Feedback Type */}
                <div>
                  <label className="block text-sm mb-2 text-gray-300">
                    Feedback Type
                  </label>
                  <Field
                    as="select"
                    name="type"
                    className="w-full rounded-lg bg-black/50 border border-gray-600 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    <option value="suggestion">Suggestion</option>
                    <option value="complaint">Complaint</option>
                    <option value="bug">Bug Report</option>
                    <option value="other">Other</option>
                  </Field>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm mb-2 text-gray-300">
                    Your Message
                  </label>
                  <Field
                    as="textarea"
                    name="message"
                    rows={5}
                    placeholder="Write your suggestion or complaint here..."
                    className={`w-full rounded-lg bg-black/50 border px-4 py-3 resize-none focus:outline-none focus:ring-2
                      ${
                        touched.message && errors.message
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-600 focus:ring-yellow-400"
                      }`}
                  />
                  <ErrorMessage
                    name="message"
                    component="p"
                    className="text-red-400 text-sm mt-1"
                  />
                </div>

                {/* Submit */}
                <div className="text-center pt-4">
                  <button
                    type="submit"
                    className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-8 py-3 rounded-lg transition shadow-lg"
                  >
                    Submit Feedback
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <p className="text-center text-gray-400 text-sm mt-10">
          Your feedback helps us improve the IMDB Clone 🎬
        </p>
      </div>
    </div>
  );
};

export default Contact;
