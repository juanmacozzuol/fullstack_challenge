export const getImagePath =(path) =>{
    const index = path.indexof('img')
    let relative_path = path.substring(index)
    relative_path.replaceAll('\\','/')
    relative_path.trim()
    return relative_path


}