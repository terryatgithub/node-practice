const {promisify} = require('util')

module.exports.clone = async function(repo, desc) {
    //repo: code github link
    //desc: dir which store the downloaded code
    const download = promisify(require('download-git-repo'))
    const ora = require('ora') //download progress tip
    const progress = ora(`download....${repo}`)
    progress.start() //start ora progressbar
    await download(repo, desc)
    progress.succeed()
}