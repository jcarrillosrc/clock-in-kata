import {GpsPosition} from "@/domain/GpsPosition";
import {ClockInRecord} from "@/domain/ClockInRecord";

export interface ClockInRepository {
    invoke(gpsPosition?: GpsPosition): Promise<ClockInRecord>
}