export const storage = {
    get<T>(key: string, defaultValue: T): T {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        } catch {
            return defaultValue;
        }
    },

    set<T>(key: string, value: T) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            alert("Storage limit exceeded. Please remove some images.");
        }
    }
    ,

    remove(key: string) {
        localStorage.removeItem(key);
    }
};
