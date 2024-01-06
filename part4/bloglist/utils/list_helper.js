const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, item) => sum + item.likes, 0)
}

const favouriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }
    const reducer = (sum, item) => {
        if (item.likes>sum.likes){
            return item
        }
        return sum
    }
    const favourite = blogs.reduce(reducer, blogs[0])
    return {
        author: favourite.author,
        likes: favourite.likes,
        title: favourite.title
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }
    const authors = []
    const nb = []
    blogs.forEach(element => {
        const indeksi = authors.indexOf(element.author)
        if (indeksi === -1) {
            authors.push(element.author)
            nb.push(1)
        }else{
            nb[indeksi] += 1
        }
    })
    let suurin = 0
    nb.forEach((arvo, i) => {
        if (arvo>nb[suurin]){
            suurin = i
        }
    })
    return {
        author: authors[suurin],
        blogs: nb[suurin]
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }
    const authors = []
    const nl = []
    blogs.forEach(element => {
        const indeksi = authors.indexOf(element.author)
        if (indeksi === -1) {
            authors.push(element.author)
            nl.push(element.likes)
        }else{
            nl[indeksi] += element.likes
        }
    })
    let suurin = 0
    nl.forEach((arvo, i) => {
        if (arvo>nl[suurin]){
            suurin = i
        }
    })
    return {
        author: authors[suurin],
        likes: nl[suurin]
    }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}