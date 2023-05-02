const API_KEY = "";

const submitIcon = document.querySelector("#submit-icon")
const input = document.querySelector("input")
const imageSection = document.querySelector(".images-section")
const spinner = document.createElement("div")
spinner.classList.add("loader")


const getImages = async () => {
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "prompt": input.value,
            "n": 4,
            "size": "1024x1024"
        })

    }
    imageSection.innerHTML = ''
    imageSection.style.backgroundColor = "white"
    imageSection.append(spinner)

    try {
        const response = await fetch("https://api.openai.com/v1/images/generations", options)
        const data = await response.json()
        imageSection.innerHTML = ''
        data?.data.forEach(imageObject => {
            const imageContainer = document.createElement("div")
            imageContainer.classList.add("image-container")
            const imageElement = document.createElement("img")
            imageElement.setAttribute("src", imageObject.url)
            imageContainer.append(imageElement)
            imageSection.append(imageContainer)
        })

    } catch (error) {
        console.error(error)
        imageSection.innerHTML = ''
        imageSection.append(spinner)
    }
}

submitIcon.addEventListener("click", getImages)