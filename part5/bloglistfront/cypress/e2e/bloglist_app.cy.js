describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    const user2 = {
      name: 'Matti Luukkainen2',
      username: 'mluukkai2',
      password: 'salainen2'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.get('#loginform')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#loginbutton').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#loginbutton').click()

      cy.contains('wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'mluukkai', password: 'salainen'
      }).then(response => {
        localStorage.setItem('loggedBloglistappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:5173')
      })
    })


    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('cypress title')
      cy.get('#author').type('cypress author')
      cy.get('#url').type('cypress url')
      cy.get('#blogsubmitbutton').click()
      cy.contains('a new blog')
      cy.contains('cypress title')
    })

    describe('blog exists', function() {
      beforeEach(function(){
        cy.request({
          url: 'http://localhost:3003/api/blogs',
          method: 'POST',
          body: {
            title: 'otsikko',
            author: 'kirjoittaja',
            url: 'blaa.com'
          },
          headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBloglistappUser')).token}`
          }
        })
        cy.visit('http://localhost:5173')
      })
      it('can like a blog', function() {
        cy.contains('view').click()
        cy.contains('likes 0')
        cy.get('#likebutton').click()
        cy.contains('likes 1')
      })
      it('creator can delete blog', function() {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.contains('view').should('not.exist')
      })
      it('noncreator cant delete blog', function() {
        cy.contains('log out').click()
        cy.get('#username').type('mluukkai2')
        cy.get('#password').type('salainen2')
        cy.get('#loginbutton').click()
        cy.contains('Matti Luukkainen2 logged in')
        cy.contains('view').click()
        cy.contains('remove').should('not.visible')
      })
      it.only('blogs in correct order', function() {
        cy.request({
          url: 'http://localhost:3003/api/blogs',
          method: 'POST',
          body: {
            title: 'otsikko2',
            author: 'kirjoittaja2',
            url: 'blaa.com2'
          },
          headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBloglistappUser')).token}`
          }
        })
        cy.request({
          url: 'http://localhost:3003/api/blogs',
          method: 'POST',
          body: {
            title: 'otsikko3',
            author: 'kirjoittaja3',
            url: 'blaa.com3'
          },
          headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBloglistappUser')).token}`
          }
        })
        cy.request({
          url: 'http://localhost:3003/api/blogs',
          method: 'POST',
          body: {
            title: 'otsikko4',
            author: 'kirjoittaja4',
            url: 'blaa.com4'
          },
          headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBloglistappUser')).token}`
          }
        })
        cy.visit('http://localhost:5173')
        cy.get('.view').each(x => x.click())
        cy.contains('otsikko3').parent().parent().find('#likebutton').click()
        cy.contains('otsikko4').parent().parent().find('#likebutton').click()
        cy.contains('otsikko2').parent().parent().find('#likebutton').click()
        cy.contains('otsikko2').parent().parent().find('#likebutton').click()
        cy.contains('otsikko3').parent().parent().find('#likebutton').click()
        cy.contains('otsikko3').parent().parent().find('#likebutton').click()

        cy.get('.blog').should('have.length', 4)
        cy.get('.blog').eq(0).contains('otsikko3')
        cy.get('.blog').eq(1).contains('otsikko2')
        cy.get('.blog').eq(2).contains('otsikko4')
      })
    })
  })
})