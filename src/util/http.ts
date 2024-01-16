export async function get(url:string) {
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    const resData = response.json() as unknown;
    return resData;
}