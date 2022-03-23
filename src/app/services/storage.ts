
import { Storage } from '@capacitor/storage';

export const TOKEN_KEY = 'creditwallet-customer-Token';
export const USER_KEY = 'creditwallet-customer';
export async function addToStorage(key: string, value: any): Promise<void> {
    await Storage.set({
        key: key,
        value: JSON.stringify(value),
    });
}
export async function getFromStorage(key: string): Promise<any> {
    const item = await Storage.get({ key: key });
    return JSON.parse(item.value);
}
export async function removeFromStorage(key: string): Promise<void> {
    await Storage.remove({
        key: key,
    });
}

export async function clearStorage(): Promise<void> {
    await Storage.clear();
}