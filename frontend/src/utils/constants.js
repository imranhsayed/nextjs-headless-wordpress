export const isCustomPageUri = (uri) => {
    const pagesToExclude = [
        '/',
    ]

    return pagesToExclude.includes(uri)
}
