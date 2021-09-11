const { get } = require("axios").default;

class Instagram {
    constructor() {
        this.postsInstagram = []
    }
    async getPostsFromInstagram(longToken) {
        return new Promise((resolve, reject) => {
            try {
                const rst = get("https://graph.instagram.com/me/media", {
                    params: {
                        fields:
                            "id,caption,media_url,media_type,permalink,thumbmail_url,timestamp,username",
                        access_token: longToken
                    },
                    headers: {
                        host: "graph.instagram.com",
                    },
                });
                resolve(rst)
            } catch (error) {
                reject(error)
                return
            }
        })
    }
    async getPostsNextPageFromInstagram(url) {
        return new Promise((resolve, reject) => {
            try {
                const rst = get(url);
                resolve(rst)
            } catch (error) {
                reject(error)
                return
            }
        })
    }
    checkChildrens(tokenData, id) {
        return new Promise((resolve, reject) => {
            get("https://graph.instagram.com/" + id + "/children", {
                params: {
                    access_token: tokenData.longToken,
                    fields: "id,media_url",
                },
                method: 'get',
                headers: {
                    host: "graph.instagram.com",
                },
            }).then((rs) => {
                resolve(rs['data']['data'])
            }).catch(err => {
                reject(err)
                return
            });

        })
    }
    async updateStorePosts(storeData, tokenData) {
        //  new Promise(async (resolve, reject) => {
        const responseMediaData = await this.getPostsFromInstagram(tokenData.longToken)
        let postsInstagram = responseMediaData['data']['data']
        let paging = responseMediaData['data'].paging
        async function checkNext(url) {
            console.log('checar next')
            let nextPage = await new Promise(async (resolve, reject) => {
                try {
                    const rst = get(url);
                    resolve(rst)
                } catch (error) {
                    reject(error)
                    return
                }
            })
            let pageData = nextPage['data']['data']
            pageData.map(item => {
                postsInstagram.push(item)
            })
            if (nextPage['data'].paging.next) {
                await checkNext(nextPage['data'].paging.next)
            }
        }
        if (paging.next) {
            await checkNext(paging.next)
        }
        this.postsInstagram = postsInstagram
    }
}

module.exports = Instagram