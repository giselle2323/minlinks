import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../utils/supabase";
import { Modal } from "react-responsive-modal";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Formik, Field, Form } from "formik";
import Loader from "../Loader/loader";

export default withPageAuthRequired(function CommenPostModal({
  open,
  onCloseModal,
  author,
  postId,
}) {
  const router = useRouter();

  const [isLoading, setLoading] = useState(false);

  const submitCommentPost = async (values) => {
    setLoading(true);
    const { error } = await supabase.from("comments").insert([values]);

    if (error) {
      toast.error("An error occured, kindly try again");
    }
    setLoading(false);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Modal
          open={open}
          onClose={onCloseModal}
          classNames={{
            modal: "custom-modal dark:bg-dark-700 bg-white text-dark-700 dark:text-white",
          }}
        >
          <div className="flex items-center bg-gray-5">
            <div className="max-w-md mx-auto my-10 p-5 rounded-md shadow-sm">
              <div className="text-center">
                <h1 className="my-3 text-3xl font-semibold">
                  Add a Comment
                </h1>
              </div>
              <div className="m-7">
                <Formik
                  initialValues={{
                    body: "",
                    userId: author[0].id,
                    postId: postId,
                  }}
                  onSubmit={async (values) => {
                    submitCommentPost(values);
                    setLoading(false);
                    setTimeout(() => router.push("/dashboard"), 3000);
                  }}
                >
                  <Form className="px-5">
                    <div className="mb-6">
                      <label
                        htmlFor="body"
                        className="block mb-2 text-sm"
                      >
                        Comment
                      </label>

                      <Field
                        as="textarea"
                        id="body"
                        name="body"
                        placeholder="A post that tell if if a ball is red or yellow"
                        className="w-full px-3 py-4 h-48 bg-transparent placeholder-gray-500 border border-gray-800 rounded-md"
                      />
                    </div>

                    <div className="mb-6">
                      <Field type="hidden" id="userId" name="userId" />
                      <Field type="hidden" id="postId" name="postId" />
                      <button
                        type="submit"
                        className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
                      >
                        {isLoading ? "Submitting" : "Comment"}
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
});
