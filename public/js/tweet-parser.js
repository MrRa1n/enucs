window.onload = () => {

    let tweets = document.getElementsByClassName('tweetBody');

    for (let i = 0; i < tweets.length; i++) {
        let x = tweets[i].innerHTML;
        x = x.replace(/\n/g, '<br>');
        tweets[i].innerHTML = x;
        console.log(tweets[i]);
    }
    
}