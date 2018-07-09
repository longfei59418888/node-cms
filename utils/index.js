
 module.exports = {
    hasScript(str){
        return new RegExp(/<script>|&lt;\/script&gt;/,'g').exec(str)
    }
 }