import {ClockInRepository} from "@/domain/ClockInRepository";
import {GpsPosition} from "@/domain/GpsPosition";
import {ClockInRecord} from "@/domain/ClockInRecord";

export class ClockInApiRepository implements ClockInRepository {
    async invoke(gpsPosition?: GpsPosition): Promise<ClockInRecord> {
        return ClockInRecord.create(gpsPosition)
    }
}