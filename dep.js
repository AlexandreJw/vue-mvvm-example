function Dep () {
  this.$dep = []
}

Dep.prototype = {
  addSub: function (sub) {
    this.$dep.push(sub)
  },
  notify: function () {
    this.$dep.forEach(function (item) {
      item.update()
    })
  }
}
