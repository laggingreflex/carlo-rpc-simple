module.exports = class RPC {
  constructor({ id = 'carlo-rpc-simple' } = {}) {
    this.id = id;
    this._remoteSetDefer = defer();
    this.isBrowser = typeof carlo !== 'undefined';
  }

  loadParams(...params) {
    if (this.isBrowser) return carlo.loadParams().then(async (params) => {
      let remote;
      for (const param of params) {
        if (typeof param.id !== 'function') continue;
        const id = await param.id();
        if (id === this.id) {
          if (remote) throw new Error("Multiple remotes using `{id: '${this.id}'}` found. Please set a unique `id`");
          remote = param;
        }
      }
      if (!remote) throw new Error("Couldn't find a valid remote object in arguments passed to `loadParams`. Please make sure to call `loadParams` on remote");
      this.setRemote(remote);
      remote.setRemote(rpc.handle(this));
      return params.filter(p => p !== remote);
    });
    else {
      let rpc;
      try { rpc = eval('require')('carlo/rpc').rpc } catch (error) { if (!this.isBrowser) throw error }
      return [rpc.handle(this), ...params];
    }
  }

  setRemote(remote) {
    this.remote = remote;
    this._remoteSetDefer.resolve();
    console.log(`[Carlo RPC](${this.id}) remote ready`);
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
