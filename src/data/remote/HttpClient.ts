interface HttpClientInit {
    baseURL?: string;
    headers?: HeadersInit_;
}

class HttpClient {
    private baseURL: string;
    private headers: HeadersInit_;

    constructor(options: HttpClientInit = {}) {
        this.baseURL = options.baseURL || '';
        this.headers = options.headers || {};
    }

    private async fetchJSON<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const controller = new AbortController();

        try {
            const res = await fetch(`${this.baseURL}${endpoint}`, {
                ...options,
                headers: this.headers,
                signal: controller.signal,
            });

            if (!res.ok) {
                // TODO: handle API-Level Error
                throw new Error(`${res.status} Error`);
            }

            // TODO: handle json parse Error
            // console.log(response.headers.get('content-type')?.includes('application/json'));

            // TODO: handle Syntax Error
            return res.json();
        } catch (err) {
            // TODO: handle Network-Level Error
            return Promise.reject(err);
        } finally {
            controller.abort();
        }
    }

    get<T>(endpoint: string, options: RequestInit = {}) {
        return this.fetchJSON<T>(endpoint, {
            ...options,
            method: 'GET',
        });
    }
}

export default HttpClient;