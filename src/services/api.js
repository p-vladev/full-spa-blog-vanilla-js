class ApiServices {
    constructor (url) {
        this.url = url;
    }

    async Request (endpoint, method = 'GET', body = null) {
        const config = {
            method: method,
            headers: {
                "Content-Type": "application/json"
            }
        }

        if (body) config.body = JSON.stringify(body);

        try {
            const response = await fetch(`${this.url}${endpoint}`, config);

            // console.log(`The response of ${endpoint} is: `, await fetch(`${this.url}`, config));
        
            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    async GetData (endpoint) {
        return await this.Request(endpoint);
    }

    async PostData(endpoint, body){
        return await this.Request(endpoint, 'POST', body);
    }
    
    async PatchData (endpoint, body) {
        return await this.Request(endpoint, 'PATCH', body);
    }
    
    async DeleteData (endpoint) {
        return await this.Request(endpoint, 'DELETE');
    }

    async GetDataSortedByDate (endpoint, order, limit) {
        if(order === null || order === undefined) return;
        if(endpoint === null || endpoint === undefined) return;

        const data = await this.GetData(endpoint);

        if (order === "desc") {
            data.sort((a, b) => {
                return new Date(b.postedAt) - new Date(a.postedAt);
            });
        }

        if (order === "asc") {
            data.sort((a, b) => {
                return new Date(a.postedAt) - new Date(b.postedAt);
            });
        }

        if (limit) {
            data.length = limit;
        }

        return data;
    }
}

export const api = new ApiServices("http://localhost:3000");