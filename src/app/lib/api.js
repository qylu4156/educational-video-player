const API_URL = "https://take-home-assessment-423502.uc.r.appspot.com"
const headers = new Headers();
headers.append("Content-Type", "application/json");

function validateRequiredProps({ params, functionName, requiredProps }) {
    requiredProps.forEach(prop => {
        if (!(prop in params)) {
            throw new Error(`${functionName} request is missing required parameter ${prop}.`);
        }
        if (!params[prop]) {
            throw new Error(`${functionName} request must have a non-null value for required parameter ${prop}.`)
        }
    })
}

export async function postVideo(params) {
    validateRequiredProps({ params: params, functionName: "postVideo", requiredProps: ["user_id", "video_url"]});
    try {
        const response = await fetch(API_URL + "/videos", {
            method: "POST",
            body: JSON.stringify(params),
            headers: headers,
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        } else {
            console.log(`Successfully posted video.`)
        }
    } catch (error) {
        console.error(error.message);
    }
}

export async function getVideos(userID) {
    try {
        const urlParams = new URLSearchParams();
        urlParams.append("user_id", userID);
        const response = await fetch(`${API_URL}/videos?${urlParams}`);

        if (!response.ok) {
            console.log(await response.text());
            throw new Error(`Response status: ${response.status}`);
        } else {
            let responseJSON = await response.json();
            return responseJSON;
        }
    } catch (error) {
        console.error(error.message);
    }
}

export async function getSingleVideo(videoID) {
    try {
        const urlParams = new URLSearchParams();
        urlParams.append("video_id", videoID);
        const response = await fetch(`${API_URL}/videos/single?${urlParams}`);

        if (!response.ok) {
            console.log(await response.text());
            throw new Error(`Response status: ${response.status}`);
        } else {
            let responseJSON = await response.json();
            return responseJSON;
        }
    } catch (error) {
        console.error(error.message);
    }
}

export async function postComment(params) {
    validateRequiredProps({ params: params, functionName: "postComment", requiredProps: ["user_id", "video_id", "content"]});
    try {
        const response = await fetch(API_URL + "/videos/comments", {
            method: "POST",
            body: JSON.stringify(params),
            headers: headers,
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        } else {
            console.log(`Successfully posted comment.`)
        }
    } catch (error) {
        console.error(error.message);
    }
}

export async function getComments(videoID) {
    try {
        const urlParams = new URLSearchParams();
        urlParams.append("video_id", videoID);
        const response = await fetch(`${API_URL}/videos/comments?${urlParams}`);

        if (!response.ok) {
            console.log(await response.text());
            throw new Error(`Response status: ${response.status}`);
        } else {
            let responseJSON = await response.json();
            return responseJSON;
        }
    } catch (error) {
        console.error(error.message);
    }
}
