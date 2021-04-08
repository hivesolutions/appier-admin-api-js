import { OAuth2API, mix, load, conf } from "yonius";
import { ModelAPI } from "./model.js";

const ADMIN_BASE_URL = "http://localhost:8080/";
const ADMIN_ID = null;
const ADMIN_SECRET = null;

export class API extends mix(OAuth2API).with(ModelAPI) {
    constructor(kwargs = {}) {
        super(kwargs);
        this.baseUrl = conf("ADMIN_BASE_URL", ADMIN_BASE_URL);
        this.clientId = conf("ADMIN_ID", ADMIN_ID);
        this.clientSecret = conf("ADMIN_SECRET", ADMIN_SECRET);
        this.baseUrl = kwargs.baseUrl === undefined ? this.baseUrl : kwargs.baseUrl;
        this.clientId = kwargs.clientId === undefined ? this.clientId : kwargs.clientId;
        this.clientSecret =
            kwargs.clientSecret === undefined ? this.clientSecret : kwargs.clientSecret;
        this.accessToken = kwargs.accessToken === undefined ? null : kwargs.accessToken;
        this.refreshToken = kwargs.refreshToken === undefined ? null : kwargs.refreshToken;
        this.sessionId = kwargs.sessionId === undefined ? null : kwargs.sessionId;
    }

    static async load() {
        await load();
    }

    async build(method, url, options = {}) {
        await super.build(method, url, options);
        options.params = options.params !== undefined ? options.params : {};
        options.kwargs = options.kwargs !== undefined ? options.kwargs : {};
        const auth = options.kwargs.auth === undefined ? true : options.kwargs.auth;
        delete options.kwargs.auth;
        if (auth) options.params.sid = await this.getSessionId();
    }

    async getSessionId() {
        if (this.sessionId) return this.sessionId;
        return await this.oauthLogin();
    }

    async oauthLogin() {
        const url = `${this.baseUrl}admin/oauth/login`;
        const response = await this.get(url, { auth: false, token: true });
        this.username = response.username || null;
        this.sessionId = response.sessionId || null;
        this.tokens = response.tokens || null;
        this.trigger("auth", response);
        return this.sessionId;
    }

    async ping() {
        const url = `${this.baseUrl}api/admin/ping`;
        const response = await this.get(url, { auth: false });
        return response;
    }

    get oauthTypes() {
        return ["param"];
    }

    get tokenDefault() {
        return false;
    }
}

export default API;
