const PRD = '/api'
const DEV = ''
module.exports = {
    AMBIENTE: PRD,
    INSTACONFIG: new URLSearchParams({
        app_id: 261340495802382,
        redirect_uri: 'https://sf.fortaldelivery.com.br/token',
        scope: 'user_profile,user_media',
        response_type: 'code'
    })
}
