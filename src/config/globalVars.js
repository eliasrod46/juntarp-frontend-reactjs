export const envs = {
  apiServer: {
    // url: "",
    url: "http://10.220.10.78",
    // url: "http://localhost",
    port: 8881,
    get serverUrl() {
      return `${this.url}:${this.port}/api`;
    },
  },
};
