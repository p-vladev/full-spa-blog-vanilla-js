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

            console.log("The response is: ", response);
        
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

    async GetDataById (endpoint, id) {
        return await this.Request(`${endpoint}/${id}`)
    }

    async IsDataIn (endpoint) {
        const d = await this.GetData(endpoint);

        if (d.length === 0) return;

        console.log("How it is on api side: ", d);

        console.log("Data on API side is: ", isValid);
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