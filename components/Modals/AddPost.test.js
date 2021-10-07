import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Modal } from "react-responsive-modal";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Formik, Field, Form, ErrorMessage } from "formik";
import AddPost from "./AddPost";

describe("AddPost", () => {
  let open, onCloseModal, author, submitPost;

  beforeEach(() => {
    open = true;
    onCloseModal = jest.fn();
    author = { id: "abc" };
    submitPost = jest.fn();
  });

  it("should render successfully", () => {
    const { baseElement } = render(
      <AddPost
        open={open}
        onCloseModal={onCloseModal}
        author={author}
        submitPost={submitPost}
      />
    );
    expect(baseElement).toBeDefined();
  });

  it("should have correct elements and value when rendered", () => {
    const { getByLabelText } = render(
      <AddPost
        open={open}
        onCloseModal={onCloseModal}
        author={author}
        submitPost={submitPost}
      />
    );
    const titleField = getByLabelText("Title");
    expect(titleField.value).toEqual("");
    const descField = getByLabelText("Description");
    expect(descField.value).toEqual("");
    const tagField = getByLabelText("Tag");
    expect(tagField).toBeDefined();
    const linkField = getByLabelText("Links (optional)");
    expect(linkField).toBeDefined();
  });

  it("should call submitPost function after form submit", () => {
    const { getByText, getByLabelText } = render(
      <AddPost
        open={open}
        onCloseModal={onCloseModal}
        author={author}
        submitPost={submitPost}
      />
    );

    const titleField = getByLabelText("Title");
    fireEvent.change(titleField, { target: { value: "Test title" } });
    const descField = getByLabelText("Description");
    fireEvent.change(descField, { target: { value: "Test description" } });
    const tagField = getByLabelText("Tag");
    fireEvent.change(tagField, { target: { value: "frontend" } });

    fireEvent.click(getByText("Submit Post"));
    expect(submitPost).toHaveBeenCalled();
  });
});
