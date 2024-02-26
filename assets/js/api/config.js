export var uri;
if (location.hostname === "localhost") {
        uri = "https://lmcflask.stu.nighthawkcodingsociety.com";
} else if (location.hostname === "127.0.0.1") {
        uri = "https://lmcflask.stu.nighthawkcodingsociety.com";
} else {
        uri = "https://lmcflask.stu.nighthawkcodingsociety.com";
}

export const options = {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'include', // include, same-origin, omit
    headers: {
        'Content-Type': 'application/json',
    },
};