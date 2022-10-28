// File Reader API; Ne marche pas...
export const dataUrl = (url) =>
    fetch(url)
    .then((response) => response.blob())
    .then(
        (blob) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result)
            reader.onerror = reject
            reader.readAsDataURL(blob)
        })
    )
    .catch((error) => {
        console.log(error)
    })
    .then((dataUrl) => {
        return dataUrl
    })