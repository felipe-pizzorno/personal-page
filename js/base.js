// Generate a random number between 97 (ASCII for 'a') and 122 (ASCII for 'z') for lowercase letters,
// or between 65 (ASCII for 'A') and 90 (ASCII for 'Z') for uppercase letters
const randomNumber = (max) => Math.floor(Math.random() * max) // Generating a number between 0 and 25
const randomLetter = () => {
    const randomNum = randomNumber(30)
    return randomNum >= 26 ? ' ' : String.fromCharCode(65 + randomNum)
}

document.addEventListener('load', function() {
    const randomizeEffectElements = Array.from(document.getElementsByClassName('hacker-randomize-effect'))
    let stopers = randomizeEffectElements.map(el => {
        const startingValues = Array.from(el.textContent)
        const indices = Array.from({ length: startingValues.length }, (_, index) => index)

        let changeIntervalId = 0
        let removeIntervalId = 0
        let endCallback

        const randomizeString = () => {
            if (indices.length === 0) {
                clearInterval(changeIntervalId)
                clearInterval(removeIntervalId)
                endCallback()
            }

            let final = [...startingValues].map(a => `<span>${a}</span>`)
            indices.forEach(index => final[index] = `<span class="hacker-style">${randomLetter()}</span>`)
            el.innerHTML = final.join('')
        }

        const removeIndex = () => {
            indices.splice(randomNumber(indices.length), 1) // Random
            // indices.splice(0, 1) // Random
        }

        changeIntervalId = setInterval(randomizeString, 75)
        
        
        return {
            startDecipheringPhrase: (callback) => {
                removeIntervalId = setInterval(removeIndex, 100)
                endCallback = callback
            }
        }
    })

    const callback = () => {
        if(stopers.length === 0) {
            return
        }

        const removedElement = stopers.shift()
        removedElement.startDecipheringPhrase(callback)
    }
    setTimeout(callback, 1000)
})