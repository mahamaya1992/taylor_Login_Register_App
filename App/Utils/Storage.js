import AsyncStorage from '@react-native-async-storage/async-storage';

async function get(key, defaultValue = null) {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(key)
            .then((value) => {
                try {
                    if (value !== null) {
                        resolve(JSON.parse(value));
                    } else {
                        resolve(null);
                    }
                } catch (error) {
                    reject(error);
                }
            })
            .catch((err) => {
                reject(err);
            })

    })

}
async function set(key, value) {
    try {
        return await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
    }
}


const Storage = {
    get,
    set,
};

export default Storage;

export const getAccount = async () => {
    return Storage.get('account');
}

export const setAccount = async (data) => {
    return Storage.set('account', data);
}