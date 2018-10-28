function Compile (node, vm) {
  if (node) {
    this.$frag = this.nodeToFragment(node, vm)
    return this.$frag
  }
}

Compile.prototype = {
  nodeToFragment: function (node, vm) {
    var frag = document.createDocumentFragment()
    while (child = node.firstChild) {
      var a = this.compileElement(child, vm)
      frag.append(a)
    }
    return frag
  },
  compileElement:function (child, vm) {
    var reg = /\{\{(.*)\}\}/;
    ///获取{{}}
    if(child.nodeType == 3) {
      if(reg.test(child.nodeValue) || reg.test(child.innerHTML)){
        var name = RegExp.$1
        new watcher(vm, child, name, 'nodeValue')
      }
    }
    return child
  }
}