function obsever (data, vm) {
  Object.keys(data).forEach(function (item) {
    defineReactive(vm, item, data[item])
  })
}

function defineReactive (vm, key, value) {
  var dep = new Dep()
  Object.defineProperty(vm, key, {
    get: function () {
      console.log('get'+ key)
      if (Dep.target) {
        dep.addSub(Dep.target)
        console.log(dep.$dep)
      }
      return value
    },
    set: function (newValue) {
      if (newValue === value) return
      value = newValue
      dep.notify()
    }
  })
}