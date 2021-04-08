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
    };

export default ModelAPI;
