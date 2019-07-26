// Replacing the not-very-random default with https://github.com/davidbau/seedrandom .
import seedrandom from "seedrandom";
let randomGenerator = seedrandom();


function weightedRandom(weights) {
    var totalWeight = 0,
        i, random;

    for (i = 0; i < weights.length; i++) {
        totalWeight += weights[i];
    }

    random = randomGenerator() * totalWeight;

    for (i = 0; i < weights.length; i++) {
        if (random < weights[i]) {
            return i;
        }

        random -= weights[i];
    }

    return -1;
}


export function redirectToPage(url, manualRedirectionDiv) {
    if (manualRedirectionDiv) {
        manualRedirectionDiv.innerHTML = `Redirecting <a href='${url}'>here</a>`;
    }
    if (url) {
        window.location.replace(url);
    }
}


export function redirectToRandomPage(weightingFn, manualRedirectionDiv) {
    const urls = Array.from(pageUrlToParams.keys());
    const weights = urls.map(weightingFn);
    let randomUrl = baseURL + urls[weightedRandom(weights)];
    console.log(randomUrl);
    redirectToPage(randomUrl, manualRedirectionDiv);
}
