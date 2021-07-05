class filtering {
    constructor(object) {
        this.title = object.title,
            this.thumbnail = object.thumbnail.lqip,
            this.artist_display = object.artist_display,
            this.description=object.credit_line
    }
}

module.exports = filtering;