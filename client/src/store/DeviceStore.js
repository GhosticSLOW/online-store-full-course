import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = []
        this._brands = []
        this._devices = []
        this._selectedType = {}
        this._selectedBrand = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 3
        this._basket = []
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }
    setBrands(brands) {
        this._brands = brands
    }
    setDevices(devices) {
        this._devices = devices
    }

    setSelectedType(type) {
        this.setPage(1)
        this._selectedType = type
    }
    setSelectedBrand(brand) {
        this.setPage(1)
        this._selectedBrand = brand
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get types() {
        return this._types
    }
    get brands() {
        return this._brands
    }
    get devices() {
        return this._devices
    }
    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }

    addToBasket(device) {
        const existingItem = this._basket.find(item => item.id === device.id)
        if (existingItem) {
            existingItem.quantity += 1
        } else {
            this._basket.push({...device, quantity: 1})
        }
    }

    removeFromBasket(deviceId) {
        this._basket = this._basket.filter(item => item.id !== deviceId)
    }

    updateBasketQuantity(deviceId, quantity) {
        const item = this._basket.find(item => item.id === deviceId)
        if (item && quantity > 0) {
            item.quantity = quantity
        }
    }

    clearBasket() {
        this._basket = []
    }

    get basket() {
        return this._basket
    }

    get basketTotal() {
        return this._basket.reduce((total, item) => total + (item.price * item.quantity), 0)
    }

    get basketCount() {
        return this._basket.length
    }
}
