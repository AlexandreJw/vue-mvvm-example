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
    //节点类型为元素
    if (child.nodeType === 1) {
      var attr = child.attributes;
      // 解析属性
      for (var i = 0; i < attr.length; i++) {
        if (attr[i].nodeName == 'v-model') {
          var name = attr[i].nodeValue; // 获取v-model绑定的属性名
          child.addEventListener('input', function (e) {
            // 给相应的data属性赋值，进而触发该属性的set方法
            //再批处理 渲染元素
            vm[name] = e.target.value;
          });
          // node.value = vm[name]; // 将data的值赋给该node
          new Watcher(vm, child, name, 'value');
        }
      };
    }
    if(child.nodeType == 3) {
      if(reg.test(child.nodeValue) || reg.test(child.innerHTML)){
        var name = RegExp.$1
        new Watcher(vm, child, name, 'nodeValue')
      }
    }
    return child
  }
}