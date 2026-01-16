class ApiServices {
    constructor (url) {
        this.url = url;
    }

    async Request (endpoint) {
        const res = await fetch(`${this.url}${endpoint}`);

        return await res.json();
    }

    async GetData () {
        return await this.Request("/blogs");
    }

    async GetDataById (id) {
        return await this.Request(`/blogs/${id}`)
    }

    async GetDataSortedByDate (order, limit) {
        if(order === null || order === undefined) return;

        const data = await this.GetData();

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