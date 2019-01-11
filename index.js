const isBrowser = typeof carlo !== 'undefined';

module.exports = class RPC {
  constructor() {
    this._remoteSetDefer = defer();
  }

  loadParams() {
    if (isBrowser) return carlo.loadParams().then(([remote]) => {
      this.setRemote(remote);
      remote.setRemote(rpc.handle(this));
    });
    else {
      let rpc;
      try { rpc = eval('require')('carlo/rpc').rpc } catch (error) { if (!isBrowser) throw error }
      return [rpc.handle(this)];
    }
  }

  setRemote(remote) {
    this.remote = remote;
    this._remoteSetDefer.resolve();
    console.log('[Carlo RPC] remote ready');
  }

  get remoteReady() { return this._remoteSetDefer.promise }
}


/* UTILS */
function defer() {
  const deferred = {};
  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred;
}
