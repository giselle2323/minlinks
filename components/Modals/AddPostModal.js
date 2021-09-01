import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Modal } from "react-responsive-modal";
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Formik, Field, Form } from "formik";

export default  withPageAuthRequired( function AddPost({ open, onCloseModal, author, submitPost }) {

    const router = useRouter()
  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      classNames={{
        modal: "custom-modal",

      }}
    >
      <div className="flex items-center w-full  bg-gray-5">
        <div className=" my-10 mx-auto rounded-md shadow-sm">
          <div className="text-center">
            <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
              <h2 className="text-dark-700 mb-2">Post An Idea</h2>
            </h1>
          </div>
          <div>
            <Formik
              initialValues={{
                title: "",
                body: "",
                tag: "",
                links: "",
                authorId: author[0].id,
              }}
              onSubmit={async (values) => {
                submitPost(values);
                router.push('/dashboard');
              }}
            >
              <Form className="px-5">
                <div className="mb-6">
                  <label
                    htmlFor="title"
                    className="block mb-3 text-sm text-dark-700 text-lg font-medium "
                  >
                    Title
                  </label>
                  <Field
                    id="title"
                    name="title"
                    placeholder="Supabase Tutorial"
                    className="w-full px-3 mb-3 py-4 text-dark-700 placeholder-gray-300 border text-lg font-normal border-gray-800 rounded-md focus:outline-none focus:ring focus:ring-dark-700 bg-transparent"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="body"
                    className="block mb-3 text-sm text-dark-700 text-lg font-medium "
                  >
                    Description
                  </label>

                  <Field
                    as="textarea"
                    id="body"
                    name="body"
                    placeholder="A post that tell if if a ball is red or yellow"
                    className="w-full mb-3 text-dark-700 px-3 py-4 h-48 bg-transparent placeholder-gray-300 border border-gray-800 rounded-md focus:outline-none focus:ring focus:ring-dark-700  overscroll-y-auto"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="tag"
                    className="block mb-3  text-sm text-dark-700 text-lg font-medium"
                  >
                    Tag
                  </label>

                  <Field
                    id="tag"
                    name="tag"
                    as="select"
                    className="py-4 mb-3 px-2 bg-transparent text-dark-700 border border-gray-800 w-full max-w-xs rounded-md focus:outline-none focus:ring focus:ring-dark-700 "
                  >
                    <option>
                      Choose article tag
                    </option>
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="serverless">Serverless</option>
                    <option value="other">Other</option>
                  </Field>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="links"
                    className="block mb-3 text-sm text-dark-700 text-lg font-medium"
                  >
                    Links (optional)
                  </label>
                  <Field
                    id="links"
                    name="links"
                    placeholder="https://dribbble.com"
                    className="w-full px-3 mb-3 text-dark-700 py-2 bg-transparent placeholder-gray-300 border border-gray-800 rounded-md focus:outline-none focus:ring focus:ring-dark-700 "
                  />
                </div>
                <div className="mb-6">
                  <Field type="hidden" id="authorId" name="authorId" />
                  <button
                    type="submit"
                    className="w-full px-3 py-4 text-white bg-green-transparent rounded-md focus:bg-indigo-600 focus:outline-none"
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
  );
})
