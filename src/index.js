document.addEventListener('DOMContentLoaded', () => {
    const dogBar = document.getElementById('dog-bar')
    const dogInfo = document.getElementById('dog-info')
    const dogFilter = document.getElementById('good-dog-filter')
    
    fetch('http://localhost:3000/pups/')
    .then(response => response.json())
    .then(dogs => {
        dogs.forEach(dogObj => {
            renderDogs(dogObj)
        });
    })

    const patchDog = (dog) => {
        fetch(`http://localhost:3000/pups/${dog.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(dog)
                        })
                        .then(res => res.json())
                        .then(dog => console.log(dog))
    }

    const renderDogs = (dog) => {
        let span = document.createElement('span')
        let buttonText = dog.isGoodDog ? 'Good Dog!' : 'Bad Dog!'
        span.textContent = dog.name
        span.addEventListener('click', () => {
            dogInfo.innerHTML = ''
            const img = document.createElement('img')
            img.src = dog.image
            const h2 = document.createElement('h2')
            h2.textContent = dog.name
            const button = document.createElement('button')
            button.textContent = buttonText
            button.addEventListener('click', (e) => {
                if (dog.isGoodDog === true) {
                    dog.isGoodDog = false
                    e.target.textContent = 'Bad Dog!'
                    patchDog(dog)
                } else {
                    dog.isGoodDog = true
                    e.target.textContent = 'Good Dog!'
                    patchDog(dog)
                }
            })
            dogInfo.appendChild(img)
            dogInfo.appendChild(h2)
            dogInfo.appendChild(button)
        })
        dogBar.appendChild(span)
    }

    const filterGoodDogs = () => {
        if (dogFilter.textContent === 'Filter good dogs: OFF') {
            dogBar.innerHTML = ''
            dogInfo.innerHTML = ''
            dogFilter.textContent = 'Filter good dogs: On'
            fetch('http://localhost:3000/pups/')
            .then(response => response.json())
            .then(dogs => {
                dogs.forEach(dogObj => {
                    if (dogObj.isGoodDog === true) {
                        renderDogs(dogObj)
                    } else {}
                });
            })
        } else {
            dogBar.innerHTML = ''
            dogInfo.innerHTML = ''
            dogFilter.textContent = 'Filter good dogs: OFF'
                fetch('http://localhost:3000/pups/')
                .then(response => response.json())
                .then(dogs => {
                    dogs.forEach(dogObj => {
                        renderDogs(dogObj)
            })
        })
    }
}

    dogFilter.addEventListener('click', filterGoodDogs)
})