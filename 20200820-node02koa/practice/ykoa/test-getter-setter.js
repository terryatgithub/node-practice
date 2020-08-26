const kkb = {
    info: {name: '开课吧'},
    get name() {
        return this.info.name
    },
    set name(val) {
        this.info.name = val
    }
}

console.log(kkb.name);
kkb.name = '开课吧setter'
console.log(kkb.name);