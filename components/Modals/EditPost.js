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
    setTimeout(() => window.location.reload(), 3000);
    
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
          <div className="flex items-center  bg-gray-5">
            <div className="max-w-md mx-auto my-10 p-5 rounded-md shadow-sm">
              <div className="text-center">
                <h1 className="my-3 text-3xl font-semibold text-gray-700">
                  Edit Idea
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
                  }}
                >
                  <Form className="px-5">
                    <div className="mb-6">
                      <label
                        htmlFor="title"
                        className="block mb-2 text-sm"
                      >
                        Title
                      </label>
                      <Field
                        id="title"
                        name="title"
                        placeholder="Supabase Tutorial"
                        className="w-full px-3 py-4 placeholder-gray-500 border border-gray-800 rounded-md"
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="body"
                        className="block mb-2 text-sm"
                      >
                        Description
                      </label>

                      <Field
                        as="textarea"
                        id="body"
                        name="body"
                        placeholder="A post that tell if if a ball is red or yellow"
                        className="w-full overscroll-y-auto px-3 py-4 h-48 bg-transparent placeholder-gray-500 border border-gray-800 rounded-md"
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="tag"
                        className="block mb-2 text-sm"
                      >
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
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="links"
                        className="block mb-2 text-sm"
                      >
                        Links (optional)
                      </label>
                      <Field
                        id="links"
                        name="links"
                        placeholder="http://love.com"
                        className="w-full px-3 py-4 placeholder-gray-500 border border-gray-800 rounded-md"
                      />
                    </div>
                    <div className="mb-6">
                      <Field type="hidden" id="authorId" name="authorId" />
                      <button
                        type="submit"
                        className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
                      >
                      {isLoading ? "Editing" : "Edit Post"}
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
