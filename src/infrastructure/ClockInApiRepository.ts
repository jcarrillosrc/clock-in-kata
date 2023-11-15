import {ClockInRepository} from "@/domain/ClockInRepository";
import {GpsPosition} from "@/domain/GpsPosition";

export class ClockInApiRepository implements ClockInRepository{
    invoke(gpsPosition?: GpsPosition): Promise<void> {
        return new Promise((resolve) => {
            resolve()
        })
    }
}