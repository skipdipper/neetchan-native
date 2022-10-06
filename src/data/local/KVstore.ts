import { MMKV } from 'react-native-mmkv'

class KVstore {
    private storage = new MMKV();

    storeDataObject(value: object, key: string): void {
        try {
            const jsonObject = JSON.stringify(value);
            this.storage.set(key, jsonObject);
        } catch (e) {
            console.log(e);
        }
    }

    retrieveDataObject(key: string) {
        try {
            const jsonObject = this.storage.getString(key);
            if (jsonObject === undefined) {
                throw new Error('String value for given Key does not exist');
            }
            const dataObject = JSON.parse(jsonObject);
            return dataObject;
        } catch (e) {
            console.log(e);
            return undefined;
        }
    }

    contains(key: string): boolean {
        return this.storage.contains(key);
    }
}

export default new KVstore();