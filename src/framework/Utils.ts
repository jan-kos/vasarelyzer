
export const MapUtils = <K, V>(map : Map<K, V>) => ({
    hasValue: function(predicate : (value : V) => boolean) : boolean {
        for (const value of map.values()) {
            if (predicate(value)) {
                return true;
            }
        }

        return false;
    },

    getValue: function(predicate : (value : V) => boolean) : V | undefined {
        for (const value of map.values()) {
            if (predicate(value)) {
                return value;
            }
        }

        return void 0;
    },
});

export type MapKeyType<M extends Map<any, any>>   = M extends Map<infer K, infer V> ? K : any;
export type MapValueType<M extends Map<any, any>> = M extends Map<infer K, infer V> ? V : any;
