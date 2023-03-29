window.addEventListener("DOMContentLoaded", (event) => {
    for (let id in posts) {
        let postTypeBox = document.querySelector('#type-' + id)
        let postBox = document.querySelector('#postID-' + id)
        let postBody = postBox.querySelector('.postBody')
        let npf = posts[id]
        let type = ''
        let postBodyNodes
        console.log(npf)
        try {
            let sendNPF = npf
            if (npf.trail.length > 0) {
                sendNPF = npf.trail[0]
                postBox.classList.add('reblog')
            }
            postBodyNodes = postBody.childNodes
            console.log(postBodyNodes[0].innerHTML)
            if (postBodyNodes[0].tagName != 'P' || postBodyNodes[0].innerHTML == '') {
                for (let i = 0; i < postBodyNodes.length; i++) {
                    type = getType(postBodyNodes[i], sendNPF)

                    if (type != '') {
                        break
                    }
                }
            }

        } catch {// do nothing
        }
        if (type == 'answer') {
        } else if (type != '') {
            postBox.classList.remove('textPost')
            try {
                let photoNodes = postBodyNodes[0].childNodes
                if (photoNodes.length > 1) {
                    type = 'photoset'
                }
            }
            catch { // do nothing
            }
            try {
                postBox.classList.add(type + 'Post')
            } catch { // do nothing
            }

            try {
                postTypeBox.innerHTML = type
            } catch {
                // do nothing
            }
        }
    }
})
function getType(node, npf) {
    let type = ''
    console.log(node)
    if (node.tagName == 'FIGURE') {
        let figureNode = node.firstChild
        switch (node.tagName) {
            case 'AUDIO':
                type = 'audio'
                break
            case 'VIDEO':
                type = 'audio'
                break
        }
        if (figureNode.classList.contains('spotify_audio_player')) {
            type = 'audio'
        }
        else {
            type = 'photo'
        }
    }
    if (node.classList.contains('npf_row')) {
        type = 'photo'
    } else if (node.classList.contains('npf_quote')) {
        type = 'quote'
    } else if (node.classList.contains('poll-post')) {
        type = 'poll'
    }
    if (npf.content[0].type == 'audio') {
        type = 'audio'
    } else if (npf.content[0].type == 'video') {
        type = 'video'
    }
    try {
        if (npf.layout[0].type == 'ask') {
            type = 'answer'
        }
    } catch { // do nothing
    }
    return type
}
