import {GpsPosition} from "@/domain/GpsPosition";
import { v4 as uuidv4 } from 'uuid';

export class ClockInRecord {
    private constructor(
        public readonly id: string,
        public readonly gpsPosition?: GpsPosition,
    ) {
    }

    static create(gpsPosition?: GpsPosition): ClockInRecord {
        return new ClockInRecord(
            uuidv4(),
            gpsPosition
        )
    }
}