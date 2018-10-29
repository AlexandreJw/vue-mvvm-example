/**
 * 批处理构造函数
 * @constructor
 */
function Batcher() {
  this.reset();
}

/**
 * 批处理重置
 */
Batcher.prototype.reset = function () {
  this.has = {};
  this.queue = [];
  this.waiting = false;
};

/**
 * 将事件添加到队列中
 * @param job {Watcher} watcher事件
 */
Batcher.prototype.push = function (job) {
  var id = job.id;
  if (!this.has[id]) {
    this.queue.push(job);
    //设置元素的ID
    this.has[id] = true;
    if (!this.waiting) {
      this.waiting = true;
      /// 微队列和宏队列  微队列先执行 故优先先使用promise
      if ("Promise" in window) {
        Promise.resolve().then( ()=> {
          this.flush();
      })
      } else {
        setTimeout(() => {
          this.flush();
      }, 0);
      }
    }
  }
};

/**
 * 执行并清空事件队列
 */
Batcher.prototype.flush = function () {
  this.queue.forEach((job) => {
    job.cb();
});
  this.reset();
};