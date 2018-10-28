function watcher(vm, node, name, nodeType) {
  Dep.target = this
  this.vm = vm
  this.node  = node
  this.name = name
  this.nodeType = nodeType
  this.update()
  Dep.target = null
}
watcher.prototype = {
  update:function () {
    this.node[this.nodeType] = this.vm[this.name]
  }
}