import {ClockInRecord} from "@/domain/ClockInRecord";

export class RegisterClockInResponse {
    constructor(
        public readonly status: boolean = false,
        public readonly warns: string[] = [],
    ) {
    }

    static fomClockInRecord(record: ClockInRecord): RegisterClockInResponse {
        const warns  = []
        if( undefined === record.gpsPosition ){
            warns.push("GPS position is not available")
        }

        return new RegisterClockInResponse(
            true,
            warns
        )
    }
}