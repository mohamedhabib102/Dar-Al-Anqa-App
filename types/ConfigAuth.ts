import { InternalAxiosRequestConfig } from "axios";

export interface AuthConfig extends InternalAxiosRequestConfig {
    skipAuth?: boolean;
}