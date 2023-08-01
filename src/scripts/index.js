import { posts, suggestUsers } from "./database.js"

function createAndRenderSuggestUsersCards(array) {
    const list = document.querySelector('.aside__list')
    list.innerHTML = ''

    for (let i = 0; i < array.length; i++) {
        const items = document.createElement('li')
        const containerMain = document.createElement('div')
        const containerUserData = document.createElement('div')
        const containerButton = document.createElement('div')
        const figure = document.createElement('figure')
        const image = document.createElement('img')
        const name = document.createElement('h2')
        const stack = document.createElement('span')
        const button = document.createElement('button')

        items.classList.add('aside__list--items')
        containerMain.classList.add('aside__container--users')
        containerUserData.classList.add('aside__container--data')
        containerButton.classList.add('aside__container--button')
        button.classList.add('aside__button--follow')
        button.setAttribute('type', 'button')
        button.innerText = 'Seguir' 

        image.src = array[i].img 
        image.alt = array[i].user 
        name.innerText = array[i].user 
        stack.innerText = array[i].stack

        button.addEventListener('click', function() {
            const change = button.classList.toggle('change__color')
            if (change) {
                button.innerText = 'Seguindo'
                button.style.color = '#FFFFFF'
                button.style.background = '#4263EB'
                button.style.borderColor = '#4263EB'
            } else {
                button.innerText = 'Seguir'
                button.style.color = '#212529'
                button.style.borderColor = '#212529'
                button.style.background = 'transparent'
            }
        })
        containerButton.appendChild(button)
        containerUserData.append(name, stack)
        figure.appendChild(image)
        containerMain.append(figure, containerUserData)
        items.append(containerMain, containerButton)
        list.appendChild(items)
    }
    return list
}

function createAndRenderPostsCards(array) {
    const list = document.querySelector('.posts__list')
    list.innerHTML = ''

    for (let i = 0; i < array.length; i++) {
        const items = document.createElement('li')
        const containerMain = document.createElement('div')
        const containerUserData = document.createElement('div')
        const containerPosts = document.createElement('div')
        const containerButton = document.createElement('div')
        const figure = document.createElement('figure')
        const image = document.createElement('img')
        const like = document.createElement('img')
        const title = document.createElement('h1')
        const name = document.createElement('h2')
        const text = document.createElement('p')
        const stack = document.createElement('span')
        const count = document.createElement('span')
        const button = document.createElement('button')

        items.classList.add('posts__list--items')
        containerMain.classList.add('user__container')
        containerUserData.classList.add('user__container--data')
        containerPosts.classList.add('posts__container--content')
        containerButton.classList.add('posts__container--buttons')
        like.classList.add('posts__button--like')
        button.classList.add('posts__button--modalOpen')
        button.setAttribute('type', 'button')

        image.src = array[i].img 
        image.alt = array[i].user  
        name.innerText = array[i].user  
        stack.innerText = array[i].stack  
        title.innerText = array[i].title  
        text.innerText = array[i].text. slice(0, 180) + '...'
        count.innerText = array[i].likes 

        button.innerText = 'Abrir Post'
        like.src = './src/assets/like-grey.svg'

        button.addEventListener('click', function() {
            const modal = document.querySelector('.modal__controller')
            modal.innerHTML = ''
            modal.showModal()

            const close = document.createElement('button')
            const container = document.createElement('div')
            const header = document.createElement('div')
            const user = document.createElement('div')
            const figure = document.createElement('figure')
            const img = document.createElement('img')
            const data = document.createElement('div')
            const name = document.createElement('h2')
            const stack = document.createElement('span')
            const post = document.createElement('div')
            const title = document.createElement('h1')
            const text = document.createElement('p')
            
            close.classList.add('modal__button--close')
            container.classList.add('modal__container')
            header.classList.add('modal__container--header')
            user.classList.add('user__container')
            data.classList.add('user__container--data')
            post.classList.add('posts__container--content')
            
            close.innerHTML = 'X'
            img.src = array[i].img 
            img.alt = array[i].user
            name.innerText = array[i].user 
            stack.innerText = array[i].stack
            title.innerText = array[i].title 
            text.innerText = array[i].text 
            
            close.addEventListener('click', function() {
                modal.close()
            })
            post.append(title, text)
            data.append(name, stack)
            figure.appendChild(img)
            user.append(figure, data)
            header.appendChild(user)
            container.append(header, post)
            modal.append(close, container)
        })
        like.addEventListener('click', function() {
            if (like.src.includes('like-grey')) {
                like.src = './src/assets/like-red.svg'
                array[i].likes ++
                count.innerText = array[i].likes 
            } else {
                like.src = './src/assets/like-grey.svg'
                array[i].likes --
                count.innerText = array[i].likes 
            }
        })
        containerButton.append(button, like, count)
        containerPosts.append(title, text)
        containerUserData.append(name, stack)
        figure.appendChild(image)
        containerMain.append(figure, containerUserData)
        items.append(containerMain, containerPosts, containerButton)
        list.appendChild(items)
    }
    return list
}

function changeColorButton() {
    const input = document.querySelector('#title')
    const textarea = document.querySelector('#description')
    const button = document.querySelector('.form__button')
    
    input.addEventListener('input', function() {
        if (input.value && textarea.value) {
            button.style.color = '#FFFFFF'
            button.style.background = '#4263EB'
            button.style.borderColor = '#4263EB'
        } else {
            button.style.color = '#868E96'
            button.style.background = '#DEE2E6'
            button.style.borderColor = '#DEE2E6'
        }
    })
    textarea.addEventListener('input', function() {
        if (input.value && textarea.value) {
            button.style.color = '#FFFFFF'
            button.style.background = '#4263EB'
            button.style.borderColor = '#4263EB'
        } else {
            button.style.color = '#868E96'
            button.style.background = '#DEE2E6'
            button.style.borderColor = '#DEE2E6'
        }
    })
}

function renderNewPost() {
    const form = document.querySelector('.form__container--content')
    const image = document.querySelector('.user__container > figure > img')
    const name = document.querySelector('.user__container--data > h2')
    const work = document.querySelector('.user__container--data > span')

    form.addEventListener('submit', function(event) {
        event.preventDefault()

        const img = image.src
        const user = name.innerHTML
        const stack = work.innerHTML
        const title = document.querySelector('#title').value
        const text = document.querySelector('#description').value

        const newPost = {
            title,
            text,
            user,
            stack,
            img,
            likes: 0
        }
        posts.unshift(newPost)
        createAndRenderPostsCards(posts)
    })
}

createAndRenderSuggestUsersCards(suggestUsers)
createAndRenderPostsCards(posts)
changeColorButton()
renderNewPost()