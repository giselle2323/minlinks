import React from "react";
import { useRouter } from "next/router";
import { supabase } from "../../utils/supabase";
import { Modal } from "react-responsive-modal";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Loader from "../Loader/loader";

export default withPageAuthRequired(function CommentPostModal({
  open,
  onCloseModal,
  author,
  postId,
}) {
  const router = useRouter();
  const submitCommentPost = async (values) => {
    const { error } = await supabase.from("comments").insert([values]);
    if (error) {
      toast.error("An error occured, kindly try again");
    }
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
      <div className="flex items-center bg-gray-5">
        <div className="max-w-md mx-auto my-10 p-5 rounded-md shadow-sm">
          <div className="text-center">
            <h1 className="my-3 text-3xl font-semibold">Add a Comment</h1>
          </div>
          <div className="m-7">
            <Formik
              initialValues={{
                body: "",
                userId: author[0].id,
                postId: postId,
              }}
              validate={(values) => {
                const errors = {};
                if (!values.body) {
                  errors.body = "Required";
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                await submitCommentPost(values);
                setSubmitting(false);
                setTimeout(() => {
                  window.location.reload();
                }, 1500);
              }}
            >
              {({ isSubmitting }) => (
                <Form className="px-5">
                  <div className="mb-6">
                    <label htmlFor="body" className="block mb-2 text-sm">
                      Comment
                    </label>

                    <Field
                      as="textarea"
                      id="body"
                      name="body"
                      placeholder=" Nice article"
                      className="px-3 py-4 h-48 w-48 bg-transparent placeholder-gray-500 border border-gray-800 rounded-md"
                    />
                    <ErrorMessage
                      name="body"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div className="mb-6">
                    <Field type="hidden" id="userId" name="userId" />
                    <Field type="hidden" id="postId" name="postId" />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-3 py-4 text-white bg-green-transparent rounded-md focus:bg-green-700 focus:outline-none"
                    >
                      {isSubmitting ? "Submitting Comment" : " Comment"}
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
