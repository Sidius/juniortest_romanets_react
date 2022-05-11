import Setting from "./Settings";

export default class ProductServiceAPI {

    constructor() {
        this._apiBase = Setting.API_SETTINGS.url;
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }

        return await res.json();
    }

    addResource = async (url, body) => {
        let formBody = [];
        for (let property in body) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(body[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        const res = await fetch(`${this._apiBase}${url}`, {
            method: 'POST',
            body: formBody,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                // 'Content-Type': 'multipart/form-data;',
            },
        });

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }

        return await res.json();
    }

    getAllProducts = async () => {
        const res = await this.getResource(`/`);
        return this._transformResponse(res, this._transformProduct);
    }

    getAllProductUnits = async () => {
        const units = await this.getResource(`/getProductUnits`);
        return this._transformResponse(units, this._transformProductUnit);
    }

    getProductUnitsOnTypeID = async (type_id) => {
        const units = await this.getResource(`/getProductUnits?type_id=${type_id}`);
        return this._transformResponse(units, this._transformProductUnit);
    }

    getAllProductTypes = async () => {
        const types = await this.getResource(`/getAllTypes`);
        return this._transformResponse(types, this._transformProductType);
    }

    addProduct = async ({sku, name, price, productTypeID}, attributeBody) => {
        const response = await this.addResource(`/addProduct`, {
            sku: sku,
            name: name,
            price: price,
            productTypeID: productTypeID,
        });

        const units = await this.getProductUnitsOnTypeID(productTypeID);

        await Promise.all(units.response.map(async (unit, index) => {
            await this.addProductAttribute({
                productSku: sku,
                productTypeUnitId: unit.id,
                value: attributeBody[index],
            });
        }));

        return this._transformResponseBool(response);
    }

    addProductAttribute = async (body) => {
        const response = await this.addResource(`/addProductAttribute`,  body);
        return this._transformResponseBool(response);
    }

    deleteProduct = async (sku) => {
        const result = await this.getResource(`/delete?sku=${sku}`);
        return this._transformResponseBool(result);
    }

    isSet(data) {
        if (data) {
            return data;
        } else {
            return '-';
        }
    }

    _transformResponse(response, method) {
        return {
            count: response.count,
            response: response.response.map(method)
        };
    }

    _transformResponseBool(response) {
        return {
            response: response.response
        };
    }

    _transformProduct(product) {
        return {
            sku: product.sku,
            name: product.name,
            price: product.price,
            productType: product.productType,
            unit: product.unit,
            attributes: product.attributes
        };
    }

    _transformProductUnit(productUnit) {
        return {
            id: productUnit.id,
            productType: productUnit.productType,
            title: productUnit.title
        };
    }

    _transformProductType(productType) {
        return {
            id: productType.id,
            title: productType.title,
            unit: productType.unit
        };
    }
}