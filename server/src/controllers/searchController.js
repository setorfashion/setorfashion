const mongoose = require('mongoose')
const Store = mongoose.model('Store')
const Post = mongoose.model('Post')
const Setor = mongoose.model("Setor")

module.exports = {
    async autocomplete(req, res) {
        const infor = req.body.value
        console.log(infor)
        //buscar primeiro setor com o nome
        let results = {}
        await Setor.find(
            {
                "description": {
                    $regex: '.*' + infor + '.*', $options: 'i'
                }
            }).sort({ description: 1 })
            .then((rs) => {
                if (rs.length > 0) {
                    rs.map(item => {
                        let v = item.description
                        results[`${v}`] = null
                    })
                }
            })
        await Store.find(
            {
                "setoreName": {
                    $regex: '.*' + infor + '.*', $options: 'i'
                }
            }).sort({ setoreName: 1 })
            .then((rs) => {
                if (rs.length > 0) {
                    rs.map(item => {
                        let v = item.setoreName
                        results[`${v}`] = null
                    })
                }
            })
        await Post.find(
            {
                "caption": {
                    $regex: '.*' + infor + '.*', $options: 'i'
                }
            }).sort({ caption: 1 })
            .then((rs) => {
                if (rs.length > 0) {
                    rs.map(item => {
                        let v = item.caption
                        results[`${v}`] = null
                    })
                }
            })
            console.log(results)
        return res.status(200).json(results)
    }
}