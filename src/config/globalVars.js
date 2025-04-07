export const envs = {
  apiServer: {
    url: "http://127.0.0.1",
    // url: "http://10.220.10.129",
    port: 8881,
    get serverUrl() {
      return `${this.url}:${this.port}/api`;
    },
  },
};
