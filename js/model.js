export const ModelAPI = superclass =>
    class extends superclass {
        async listModels() {
            const url = `${this.baseUrl}api/admin/models`;
            const response = await this.get(url);
            return response;
        }

        async getModel(model) {
            const url = `${this.baseUrl}api/admin/models/${model}`;
            const response = await this.get(url);
            return response;
        }

        async createEntity(model, payload) {
            const url = `${this.baseUrl}api/admin/models/${model}`;
            const response = await this.post(url, { dataJ: payload });
            return response;
        }

        async getEntity(model, _id) {
            const url = `${this.baseUrl}api/admin/models/${model}/${_id}`;
            const response = await this.get(url);
            return response;
        }

        async updateEntity(model, _id, payload) {
            const url = `${this.baseUrl}api/admin/models/${model}/${_id}`;
            const response = await this.put(url, { dataJ: payload });
            return response;
        }

        async deleteEntity(model, _id) {
            const url = `${this.baseUrl}api/admin/models/${model}/${_id}`;
            const response = await this.delete(url);
            return response;
        }
    };

export default ModelAPI;
