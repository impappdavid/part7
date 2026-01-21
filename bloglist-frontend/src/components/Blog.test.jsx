import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import CreateBlogForm from "./createBlogForm";
import { test, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";

test("renders content", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Full Stack Open Student",
    url: "https://fullstackopen.com/",
    likes: 20,
  };

  render(<Blog blog={blog} />);

  const element = screen.queryByRole("blog");
  const authorElement = screen.getByText("Full Stack Open Student", {
    exact: false,
  });
  expect(element).toBeDefined();
  expect(authorElement).toBeDefined();

  const urlElement = screen.queryByText("https://fullstackopen.com/");
  const likesElement = screen.queryByText("likes 20");

  expect(urlElement).toBeNull();
  expect(likesElement).toBeNull();
});

test("renders all content and its visible", async () => {
  const blog = {
    title: "Testing user interactions",
    author: "Full Stack Developer",
    url: "https://test.com",
    likes: 10,
    user: { name: "Admin" },
  };

  const { container } = render(<Blog blog={blog} />);

  const user = userEvent.setup();

  const button = screen.getByText("view");
  await user.click(button);

  const detailsDiv = container.querySelector(".blog-details");
  expect(detailsDiv).not.toBeNull();

  expect(screen.getByText("https://test.com")).toBeDefined();
  expect(screen.getByText("likes 10", { exact: false })).toBeDefined();
});

test("clicking the like button twice calls event handler twice", async () => {
  const blog = {
    title: "Testing user interactions",
    author: "Full Stack Developer",
    url: "https://test.com",
    likes: 10,
    user: { name: "Admin" },
  };

  const mockHandler = vi.fn();
  const user = userEvent.setup();

  render(<Blog blog={blog} handleLike={mockHandler} />);

  const viewButton = screen.getByText("view");
  await user.click(viewButton);

  const likeButton = screen.getByText("like");
  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});

test("<CreateBlogForm /> updates parent state and calls onSubmit", async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  render(<CreateBlogForm createBlog={createBlog} />);

  const titleInput = screen.getByPlaceholderText("write title here");
  const authorInput = screen.getByPlaceholderText("write author here");
  const urlInput = screen.getByPlaceholderText("write url here");
  const sendButton = screen.getByText("create");

  await user.type(titleInput, "testing title...");
  await user.type(authorInput, "testing author...");
  await user.type(urlInput, "testing url...");

  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);

  const submittedData = createBlog.mock.calls[0][0];

  expect(submittedData.title).toBe("testing title...");
  expect(submittedData.author).toBe("testing author...");
  expect(submittedData.url).toBe("testing url...");
});
