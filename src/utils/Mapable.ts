export default interface Mapable<T> {
    map(action: (route:  T & Mapable<T>) => T & Mapable<T>): T & Mapable<T>;
}