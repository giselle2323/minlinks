import React from "react";
import { supabase } from "../../utils/supabase";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Modal } from "react-responsive-modal";
import { Formik, Field, Form, ErrorMessage } from "formik";
export default withPageAuthRequired(function EditPostModal({
  open,
  onCloseModal,
  id,
  author,
  title,
  body,
  tag,
  links,
}) {
  const submitEditPost = async (values) => {
    const { error } = await supabase
      .from("posts")
      .update([values])
      .match({ id: id });

    if (error) {
      toast.error("An error occured, kindly try again");
    }
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };
  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      classNames={{
        modal:
          "custom-modal dark:bg-dark-700 bg-white text-dark-700 dark:text-white",
      }}
    >
      <div className="flex items-center  bg-gray-5">
        <div className="max-w-md mx-auto my-10 p-5 rounded-md shadow-sm">
          <div className="text-center">
            <h1 className="my-3 text-3xl font-semibold">Edit Idea</h1>
          </div>
          <div className="m-7">
            <Formik
              initialValues={{
                title: title,
                body: body,
                tag: tag,
                links: links,
                authorId: author[0].id,
              }}
              validate={(values) => {
                const errors = {};
                if (!values.title) {
                  errors.title = "Required";
                } else if (!values.body) {
                  errors.body = "Required";
                } else if (!values.tag) {
                  errors.tag = "Required";
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                await submitEditPost(values);
                setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form className="px-5">
                  <div className="mb-6">
                    <label htmlFor="title" className="block mb-2 text-sm">
                      Title
                    </label>
                    <Field
                      id="title"
                      name="title"
                      placeholder="Supabase Tutorial"
                      className="w-full px-3 py-4  bg-transparent placeholder-gray-500 border border-gray-800 rounded-md"
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="body" className="block mb-2 text-sm">
                      Description
                    </label>

                    <Field
                      as="textarea"
                      id="body"
                      name="body"
                      placeholder="A post that tell if if a ball is red or yellow"
                      className="w-full overscroll-y-auto px-3 py-4 h-48 bg-transparent placeholder-gray-500 border border-gray-800 rounded-md"
                    />
                    <ErrorMessage
                      name="body"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="tag" className="block mb-2 text-sm">
                      Tag
                    </label>

                    <Field
                      id="tag"
                      name="tag"
                      as="select"
                      className="py-4 px-2 bg-transparent border border-gray-800 w-full max-w-xs rounded-md"
                    >
                      <option>Choose article tag</option>
                      <option value="frontend">Frontend</option>
                      <option value="backend">Backend</option>
                      <option value="serverless">Serverless</option>
                      <option value="other">Other</option>
                    </Field>
                    <ErrorMessage
                      name="tag"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="links" className="block mb-2 text-sm">
                      Links (optional)
                    </label>
                    <Field
                      id="links"
                      name="links"
                      placeholder="http://love.com"
                      className="w-full px-3 py-4 bg-transparent placeholder-gray-500 border border-gray-800 rounded-md"
                    />
                  </div>
                  <div className="mb-6">
                    <Field type="hidden" id="authorId" name="authorId" />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-3 py-4 text-white bg-green-transparent rounded-md focus:bg-green-700 focus:outline-none"
                    >
                      {isSubmitting ? "Submitting Post" : "Edit Post"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </Modal>
  );
});
