const { test, expect, beforeEach, describe } = require('@playwright/test')
const axios = require('axios')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await axios.post('http://localhost:3003/api/testing/reset')

    await axios.post('http://localhost:3003/api/users', {
      username: 'testuser',
      name: 'Test User',
      password: 'password123'
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const username = page.getByLabel('username')

    await expect(username).toBeVisible()
  })

  describe('login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByLabel('username').fill('testuser')
      await page.getByLabel('password').fill('password123')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Test User logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('username').fill('testuser')
      await page.getByLabel('password').fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()

      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('wrong username or password')

      await expect(page.getByText('Test User logged in')).not.toBeVisible()
    })



  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByLabel('username').fill('testuser')
      await page.getByLabel('password').fill('password123')
      await page.getByRole('button', { name: 'login' }).click()

    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByLabel('title').fill('testing playwright')
      await page.getByLabel('author').fill('test')
      await page.getByLabel('url').fill('https://www.google.com')
      await page.getByRole('button', { name: 'create' }).click()

      await expect(page.locator('.success')).toContainText('a new blog')
      await expect(page.locator('.blog')).toHaveCount(1)
    })

    test('a blog can be liked', async ({ page }) => {

      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByLabel('title').fill('testing playwright')
      await page.getByLabel('author').fill('test')
      await page.getByLabel('url').fill('https://www.google.com')
      await page.getByRole('button', { name: 'create' }).click()

      const blog = page.locator('.blog').filter({ hasText: 'testing playwright' })

      await blog.getByRole('button', { name: 'show' }).click()

      await blog.getByRole('button', { name: 'like' }).click()

      await expect(blog).toContainText(/likes 1/)
    })

    test('a blog can be deleted by the user who created', async ({ page }) => {

      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByLabel('title').fill('testing playwright')
      await page.getByLabel('author').fill('test')
      await page.getByLabel('url').fill('https://www.google.com')
      await page.getByRole('button', { name: 'create' }).click()

      const blog = page.locator('.blog').filter({ hasText: 'testing playwright' })

      await blog.getByRole('button', { name: 'show' }).click()

      page.on('dialog', async dialog => {
        await dialog.accept()
      })

      await blog.getByRole('button', { name: 'remove' }).click()

      await expect(blog).not.toBeVisible()
    })

    test('a blog remove button is visible to its creator', async ({ page }) => {

      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByLabel('title').fill('testing playwright')
      await page.getByLabel('author').fill('test')
      await page.getByLabel('url').fill('https://www.google.com')
      await page.getByRole('button', { name: 'create' }).click()

      const blog = page.locator('.blog').filter({ hasText: 'testing playwright' })

      await blog.getByRole('button', { name: 'show' }).click()

      await expect(blog.getByRole('button', { name: 'remove' })).toBeVisible()
    })

    test('blogs are ordered according to likes', async ({ page }) => {
      const blogTitles = ['First blog', 'Second blog', 'Third blog']
      for (const title of blogTitles) {
        await page.getByRole('button', { name: 'create new blog' }).click()
        await page.getByLabel('title').fill(title)
        await page.getByLabel('author').fill('Test Author')
        await page.getByLabel('url').fill('http://test.com')
        await page.getByRole('button', { name: 'create' }).click()
        await page.locator('.success').waitFor({ state: 'hidden' })
      }

      const secondBlog = page.locator('.blog').filter({ hasText: 'Second blog' })
      await secondBlog.getByRole('button', { name: 'show' }).click()
      const likeButton = secondBlog.getByRole('button', { name: 'like' })

      await likeButton.click()
      await secondBlog.getByText('likes 1').waitFor()
      await likeButton.click()
      await secondBlog.getByText('likes 2').waitFor()

      const thirdBlog = page.locator('.blog').filter({ hasText: 'Third blog' })
      await thirdBlog.getByRole('button', { name: 'show' }).click()
      await thirdBlog.getByRole('button', { name: 'like' }).click()
      await thirdBlog.getByText('likes 1').waitFor()

      const allBlogs = page.locator('.blog')

      await expect(allBlogs.nth(0)).toContainText('Second blog')
      await expect(allBlogs.nth(1)).toContainText('Third blog')
      await expect(allBlogs.nth(2)).toContainText('First blog')
    })
  })
})