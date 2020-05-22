import Report from './Report.js';

class Factory {
    constructor() {

    }

    getReport(report_type) {
        if (report_type == "BURNDOWN") {
            return Report;
        }
    }
}

export default Factory
