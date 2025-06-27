const logger = require("./logger")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (!blogs.length) return 0

  const reducer = (sum, blog) => {
    logger.info(sum)
    return sum + blog.likes
  }

  return blogs.reduce(reducer, 0)
}

// The function returns the blog with the most likes.
// If there are multiple favorites, it is sufficient for the function to return any one of them.
const favoriteBlog = (blogs) => {
  if (!blogs.length) return undefined

  const reducer = (prev, current) =>
    prev && prev.likes > current.likes ? prev : current

  return blogs.reduce(reducer, blogs[0].likes)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
