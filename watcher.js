var uid = 0

function Watcher (vm, node, name, type) {
  //new Watcher(vm, node, 'test', 'nodeValue');
  Dep.target = this
  this.name = name //text
  this.node = node //当前的节点
  this.id = ++uid
  this.vm = vm //vm
  this.type = type //nodeValue
  this.update()
  Dep.target = null
}
Watcher.prototype = {
  update: function () {
    this.get()
    batcher = new Batcher()
    batcher.push(this)
  },
  cb: function () {
    this.node[this.type] = this.value // 订阅者执行相应操作
  },
  // 获取data的属性值
  get: function () {
    this.value = this.vm[this.name] //触发相应属性的get
  }
}