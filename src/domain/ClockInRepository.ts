import {GpsPosition} from "@/domain/GpsPosition";

export interface ClockInRepository {
    invoke(gpsPosition?: GpsPosition): Promise<void>
}