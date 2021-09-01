import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../utils/supabase";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Modal } from "react-responsive-modal";
import { Formik, Field, Form } from "formik";
import Loader from "../Loader/loader";

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
  const router = useRouter();

  const [isLoading, setLoading] = useState(false);

  const submitEditPost = async (values) => {
    setLoading(true);
    const { error } = await supabase
      .from("posts")
      .update([values])
      .match({ id: id });

    if (error) {
      toast.error("An error occured, kindly try again");
    }
    setLoading(false);
    window.location.reload();
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
            modal: "custom-modal",
          }}
        >
          <div className="flex items-center  bg-gray-5">
            <div className="max-w-md mx-auto my-10 p-5 rounded-md shadow-sm">
              <div className="text-center">
                <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
                  <h2>Edit</h2>
                </h1>
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
                  onSubmit={async (values) => {
                    submitEditPost(values);
                    router.push("/my-ideas");
                  }}
                >
                  <Form className="px-5">
                    <div className="mb-6">
                      <label
                        htmlFor="title"
                        className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                      >
                        Title
                      </label>
                      <Field
                        id="title"
                        name="title"
                        placeholder="Supabase Tutorial"
                        className="w-full px-3 py-4 placeholder-gray-300 border border-gray-800 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 bg-transparent dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="body"
                        className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                      >
                        Description
                      </label>

                      <Field
                        as="textarea"
                        id="body"
                        name="body"
                        placeholder="A post that tell if if a ball is red or yellow"
                        className="w-full px-3 py-4 h-48 bg-transparent placeholder-gray-300 border border-gray-800 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="tag"
                        className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                      >
                        Tag
                      </label>

                      <Field
                        id="tag"
                        name="tag"
                        as="select"
                        className="py-4 px-2 bg-transparent border border-gray-800 w-full max-w-xs rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                      >
                        <option>Choose article tag</option>
                        <option value="frontend">Frontend</option>
                        <option value="backend">Backend</option>
                        <option value="serverless">Serverless</option>
                        <option value="other">Other</option>
                      </Field>
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="links"
                        className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                      >
                        Links (optional)
                      </label>
                      <Field
                        id="links"
                        name="links"
                        placeholder="http://love.com"
                        className="w-full px-3 py-4 placeholder-gray-300 border border-gray-800 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 bg-transparent dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                      />
                    </div>
                    <div className="mb-6">
                      <Field type="hidden" id="authorId" name="authorId" />
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
