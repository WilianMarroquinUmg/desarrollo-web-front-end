export const useSanctumRequest = () => {
    const client = useSanctumClient();

    const request = async (url: string, method: string, body: any = null) => {

        try {

            const {data, error} = await useAsyncData(url, () => {
                return client(url, {
                    method,
                    body: body ? body : null,
                });
            });

            if (error && error.value instanceof Error) {

                throw error.value?.data;

            }

            return data.value.data;

        } catch (e) {

            throw e;

        }

    };

    return {
        get: (url: string) => request(url, 'GET'),
        post: (url: string, body: any) => request(url, 'POST', body),
        put: (url: string, body: any) => request(url, 'PUT', body),
        delete: (url: string) => request(url, 'DELETE'),
    };
};
