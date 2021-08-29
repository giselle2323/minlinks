export   const fetcher = (url) => {
    fetch(url)
    .then((res) => {
        console.log(res, url)
        res.json();
    })
};