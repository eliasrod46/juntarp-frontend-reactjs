export const envs = {
  apiServer: {
    url: "http://10.220.10.89",
    // url: "http://localhost",
    port: 8881,
    get serverUrl() {
      return `${this.url}:${this.port}/api`;
    },
  },
};
