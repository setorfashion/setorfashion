const PRD = '/api'
const DEV = ''
const host = window.location.host
module.exports = {
    AMBIENTE: (host==='localhost:3000')?DEV:PRD,
    INSTACONFIG: new URLSearchParams({
        app_id: 261340495802382,
        redirect_uri: 'https://sf.fortaldelivery.com.br/token',
        scope: 'user_profile,user_media',
        response_type: 'code'
    })
}
