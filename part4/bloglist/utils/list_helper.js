const logger = require("./logger")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (!blogs.length) return 0

  const reducer = (sum, blog) => {
    logger.info(sum)
    return sum + blog
  }

  return blogs.map((blog) => blog.likes).reduce(reducer, 0)
}

module.exports = {
  dummy,
  totalLikes,
}
