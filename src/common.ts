export function getExtension(url: string): string {
    try {
        return url.substr(url.lastIndexOf('.') + 1)
    } catch (err) {
        return ''
    }

}