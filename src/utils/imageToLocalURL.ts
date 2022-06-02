export const imageToLocalURL = async (url: string) => {
    return fetch(url)
        .then((res) => res.blob())
        .then((blob) => URL.createObjectURL(blob));
};
