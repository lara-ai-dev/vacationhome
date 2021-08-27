import imagesData from 'utils/imagesData'

/**
 * Attach fake images for every apartment record in data coming from API
 *  this shouldn't be needed in future if apartment images are saved with in backend
 */
export function attachImagesToApartments(data) {
    return data.map((apart) => {
        const foundRecord = imagesData.find(
            (record) => record.apartmentId === apart.apartmentId
        )
        const images = foundRecord ? foundRecord.images : []
        return {
            ...apart,
            images,
        }
    })
}

/**
 * Given apartments array and filters object and it returns filtered apartments
 * @param {array} apartments
 * @param {{capacity: number, maxPrice: number, minPrice: number, type: string }} filters
 * @returns {array}
 */
export function filterApartments(apartments, filters) {
    if (!apartments.length) return []

    let { capacity, maxPrice, minPrice, type = 'all' } = filters
    let filtered = [...apartments]

    //filter by type
    if (type !== 'all') {
        filtered = filtered.filter((apart) => apart.type === type)
    }

    //filter by capacity
    if (capacity > 0) {
        filtered = filtered.filter((apart) => apart.capacity === capacity)
    }

    //filter by maximum price
    filtered = filtered.filter(
        (apart) => apart.price <= maxPrice && apart.price > minPrice
    )

    // change state
    return filtered
}

/** get all unique values in an array of objects */
export function getUnique(items, value) {
    return [...new Set(items.map((item) => item[value]))]
}
