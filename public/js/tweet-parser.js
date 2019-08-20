window.onload = () => {
    replaceNewlineChars();
}

const replaceNewlineChars = () => {
    let tweets = document.getElementsByClassName('tweetBody');
    for (let i = 0; i < tweets.length; i++) {
        let x = tweets[i].innerHTML;
        x = x.replace(/\n/g, '<br>');
        x = makeUrlClickable(x);
        tweets[i].innerHTML = x;
    }
}

const makeUrlClickable = (tweet) => {
    var regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g;
    var foundLink = tweet.match(regex);
    var replaced =  "<a href='" + foundLink + "' target='_blank' class='tweet-link'>" + foundLink + "</a>";
    return tweet.replace(regex, replaced);
}