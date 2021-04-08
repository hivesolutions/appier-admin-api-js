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

    get oauthTypes() {
        return ["param"];
    }

    get tokenDefault() {
        return false;
    }
}

export default API;
