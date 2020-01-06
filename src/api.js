const host = "localhost";
const port = 8080;
const url = endpoint => `http://${host}:${port}/${endpoint}`;

export default {
    fetch: (opt, action) => {
        return fetch(opt.path, {
            method: opt.method,
            body: opt.body,
            headers: opt.headers,
        })
            .then(res => res.json())
            .then(response => {
                action(response);
            })
            .catch((error) => {
                console.error(error);
            })
    },
    endpoints: {
        getAllNodes: () => ({
            path: url(`nodes`),
            method: "GET"
        })
    }
}