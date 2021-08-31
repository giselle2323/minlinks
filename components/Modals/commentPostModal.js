import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../utils/supabase";
import { Modal } from "react-responsive-modal";
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Formik, Field, Form } from "formik";
import Loader from "../Loader/loader";

export default withPageAuthRequired(function CommenPostModal({ open, onCloseModal, author, postId }) {
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
            overlay: "customOverlay",
            modal: "custom-modal",
          }}
        >
          <div className="flex items-center  bg-gray-5">
            <div className="max-w-md mx-auto my-10 p-5 rounded-md shadow-sm">
              <div className="text-center">
                <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
                  <h2>Add a Comment</h2>
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
                    router.push("/dashboard");
                  }}
                >
                  <Form>
                    <div className="mb-6">
                      <label
                        htmlFor="body"
                        className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                      >
                        Comment
                      </label>

                      <Field
                        as="textarea"
                        id="body"
                        name="body"
                        placeholder="A post that tell if if a ball is red or yellow"
                        className="w-full px-3 py-2 bg-transparent placeholder-gray-300 border border-gray-800 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                      />
                    </div>

                    <div className="mb-6">
                      <Field type="hidden" id="userId" name="userId" />
                      <Field type="hidden" id="postId" name="postId" />
                      <button
                        type="submit"
                        className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
                      >
                        Submit Post
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
