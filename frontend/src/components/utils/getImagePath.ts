export const getImagePath = (path: string | undefined) => {
    return path?.replace("./public", "http://localhost:4000");
}